// The set of languages the site ships copy for, and the rules for picking one
// from an incoming request.
//
// The site is English and Thai only. Every other browser language falls
// through to English.
//
// Adding a language means three things: an entry in LOCALES here, a dictionary
// at src/i18n/messages/<code>.js, and (for a non-Latin script) a webfont in
// SCRIPT_FONTS. Nothing else in the app hardcodes a locale list.

export const DEFAULT_LOCALE = "en";

// `code`   - what goes in <html lang> and in the NEXT_LOCALE cookie.
// `label`  - endonym, for the language switcher when it lands.
// `dir`    - writing direction. Both are ltr; the field exists so an rtl
//            language can be added later without a second pass over the app.
// `script` - which webfont bundle the layout must load for this locale.
export const LOCALES = [
  { code: "en", label: "English", dir: "ltr", script: "latin" },
  { code: "th", label: "ไทย",     dir: "ltr", script: "thai" },
];

export const LOCALE_CODES = LOCALES.map((l) => l.code);

export function isSupported(code) {
  return LOCALE_CODES.includes(code);
}

export function localeMeta(code) {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0];
}

/**
 * Parse an Accept-Language header into tags ordered by declared preference.
 * "de-AT,de;q=0.9,en;q=0.5" becomes ["de-at", "de", "en"].
 */
function parseAcceptLanguage(header) {
  if (!header) return [];

  return header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params
        .map((p) => p.trim())
        .find((p) => p.startsWith("q="));
      return {
        tag: tag.trim().toLowerCase(),
        // A tag with no q is q=1, which is what the spec says and what every
        // browser relies on to put its primary language first.
        q: q ? Number.parseFloat(q.slice(2)) : 1,
      };
    })
    .filter((entry) => entry.tag && !Number.isNaN(entry.q) && entry.q > 0)
    .sort((a, b) => b.q - a.q)
    .map((entry) => entry.tag);
}

/** Resolve one browser tag ("th-TH", "en-GB") to a supported locale, or null. */
function matchTag(tag) {
  if (tag === "*") return null;
  if (isSupported(tag)) return tag;

  const base = tag.split("-")[0];
  if (isSupported(base)) return base;

  return null;
}

/**
 * The whole decision, in priority order:
 *
 *   1. NEXT_LOCALE cookie   - a language the visitor chose by hand. Always wins,
 *                             so the switcher cannot be argued with by a header.
 *   2. Accept-Language      - what the browser is set to, most preferred first.
 *   3. DEFAULT_LOCALE       - English.
 *
 * Location is deliberately not a signal. A visitor in Thailand with an English
 * browser gets English, and a Thai browser abroad gets Thai.
 *
 * @param {{ cookie?: string|null, acceptLanguage?: string|null }} input
 */
export function resolveLocale({ cookie, acceptLanguage } = {}) {
  if (cookie && isSupported(cookie)) return cookie;

  for (const tag of parseAcceptLanguage(acceptLanguage)) {
    const match = matchTag(tag);
    if (match) return match;
  }

  return DEFAULT_LOCALE;
}

// One year, so a hand-picked language survives a browser restart.
export const LOCALE_COOKIE = "NEXT_LOCALE";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

// The header the middleware writes the resolved locale onto, and the root
// layout reads back. Internal to the app.
export const LOCALE_HEADER = "x-steppe-locale";
