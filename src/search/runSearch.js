import { PAGE_ORDER, SEARCH_ENTRIES } from "./entries";

// Plain-text search over the static index in entries.js. No dependency, no
// index build step - the site's total copy is a few kilobytes, so a linear
// scan per keystroke is imperceptible and not worth a library.

const MIN_QUERY = 2;
const SNIPPET_RADIUS = 90;
const DEFAULT_LIMIT = 24;

export function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function tokenize(query) {
  return query
    .toLowerCase()
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);
}

// Score one entry against the query tokens. Returns 0 when any token is
// missing entirely (every token must match somewhere - an AND search).
function scoreEntry(entry, tokens, phrase) {
  const label = entry.label.toLowerCase();
  const section = entry.section.toLowerCase();
  const terms = (entry.terms || "").toLowerCase();
  const body = entry.body.toLowerCase();
  const haystack = `${label} \n ${section} \n ${terms} \n ${body}`;

  let score = 0;
  for (const token of tokens) {
    if (!haystack.includes(token)) return 0;

    const wordStart = new RegExp(`\\b${escapeRegExp(token)}`);
    if (label.includes(token)) score += 10;
    if (wordStart.test(label)) score += 6;
    if (label.startsWith(token)) score += 4;
    if (section.includes(token)) score += 4;
    if (terms.includes(token)) score += 3;
    if (wordStart.test(body)) score += 2;
    else if (body.includes(token)) score += 1;
  }

  // Whole-phrase hit (multi-word queries) - a strong signal the entry is
  // about exactly this.
  if (tokens.length > 1 && haystack.includes(phrase)) score += 12;

  return score;
}

// Build a short excerpt of `body` centred on the first token match, with the
// matched runs marked up by the caller (parts: {text, match}).
function buildSnippet(body, tokens) {
  const lower = body.toLowerCase();
  let first = -1;
  for (const token of tokens) {
    const at = lower.indexOf(token);
    if (at !== -1 && (first === -1 || at < first)) first = at;
  }
  if (first === -1) first = 0;

  let start = Math.max(0, first - SNIPPET_RADIUS);
  let end = Math.min(body.length, first + SNIPPET_RADIUS);
  if (start > 0) {
    const space = body.indexOf(" ", start);
    if (space !== -1 && space < first) start = space + 1;
  }
  if (end < body.length) {
    const space = body.lastIndexOf(" ", end);
    if (space > first) end = space;
  }

  const text = body.slice(start, end).trim();
  return (start > 0 ? "… " : "") + text + (end < body.length ? " …" : "");
}

// Split `text` into { text, match } parts so a match can be marked without
// dangerouslySetInnerHTML.
export function highlightParts(text, tokens) {
  if (!tokens.length) return [{ text, match: false }];
  const sorted = [...tokens].sort((a, b) => b.length - a.length).map(escapeRegExp);
  const pattern = new RegExp(`(${sorted.join("|")})`, "gi");
  // String.split with a capturing group keeps the delimiters as their own
  // array items, and each is exactly the matched token text - so a piece is
  // a highlight iff it equals one of the tokens (case-insensitively).
  const lowerTokens = new Set(tokens.map((token) => token.toLowerCase()));
  return text
    .split(pattern)
    .filter((piece) => piece !== "" && piece != null)
    .map((piece) => ({ text: piece, match: lowerTokens.has(piece.toLowerCase()) }));
}

/**
 * @returns {{ query: string, tokens: string[], total: number, groups: Array<{
 *   page: string, results: Array<{ id, path, hash, section, label, snippet }>
 * }> }}
 */
export function runSearch(rawQuery, { limit = DEFAULT_LIMIT } = {}) {
  const query = (rawQuery || "").trim();
  const tokens = tokenize(query);

  if (query.length < MIN_QUERY || tokens.length === 0) {
    return { query, tokens, total: 0, groups: [] };
  }

  const phrase = query.toLowerCase();
  const hits = [];
  for (const entry of SEARCH_ENTRIES) {
    const score = scoreEntry(entry, tokens, phrase);
    if (score > 0) hits.push({ entry, score });
  }

  hits.sort((a, b) => b.score - a.score);
  const top = hits.slice(0, limit);

  const byPage = new Map();
  for (const { entry } of top) {
    if (!byPage.has(entry.page)) byPage.set(entry.page, []);
    byPage.get(entry.page).push({
      id: entry.id,
      path: entry.path,
      hash: entry.hash,
      section: entry.section,
      label: entry.label,
      snippet: buildSnippet(entry.body, tokens),
    });
  }

  const groups = [...byPage.entries()]
    .sort((a, b) => {
      const ai = PAGE_ORDER.indexOf(a[0]);
      const bi = PAGE_ORDER.indexOf(b[0]);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    })
    .map(([page, results]) => ({ page, results }));

  return { query, tokens, total: top.length, groups };
}
