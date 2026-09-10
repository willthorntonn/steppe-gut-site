// Turns an English content module into a localised one.
//
// The content modules under src/content and src/data stay exactly as they are:
// they remain the English source of truth AND the structural skeleton, images,
// hrefs, ids and all. A dictionary holds only the translated strings, keyed by
// the path to the string inside the module. At read time this walks the module
// and swaps in whatever the dictionary has, leaving everything else untouched.
//
// Two things fall out of that shape and both matter:
//
//   - Nothing is duplicated. The image imports, ratios and hrefs exist once,
//     not once per language, so a layout change is still a one-file change.
//   - English is the automatic fallback. A key a translator has not reached
//     yet simply keeps its English string, so a half-finished language renders
//     a mixed page rather than a broken one.

import { BRAND_TERMS } from "./brand";

// Keys whose values are never shown to a reader: identifiers, routes, asset
// references, layout hints, and `brief` (the art-direction prompt the
// photography was generated from). Translating any of these breaks the page.
const NON_TRANSLATABLE_KEYS = new Set([
  "id",
  "key",
  "slug",
  "href",
  "to",
  "path",
  "src",
  "image",
  "img",
  "icon",
  "video",
  "poster",
  "ratio",
  "brief",
  "color",
  "colour",
  "bg",
  "className",
  "class",
  "variant",
  "tone",
  "align",
  "type",
  "code",
  "sku",
  "currency",
  "email",
  "tel",
  "url",
  // Sequence markers that are rendered as-is: "01", "02", "I", "II". Passing
  // them to a translator is how "01" comes back as "٠١".
  "step",
  "numeral",
  // Contact details, and the legal names of the three companies in
  // src/data/site.js. A registered company name is the name on the paperwork
  // in every language; translating it would be a false statement.
  "phone",
  "phoneHref",
  "legalName",
  "registration",
  // Image-format keys. A responsive picture is written `{ avif, webp }`, and
  // the value is a bundler asset reference, not prose - translating one swaps
  // the photograph for a sentence.
  "avif",
  "webp",
  "png",
  "jpg",
  "jpeg",
]);

// A string with no letters in it (a number, a date, a measurement) has nothing
// to translate and everything to lose.
const NO_LETTERS = /^[^\p{L}]+$/u;

// A string that is really a value rather than prose. Belt and braces alongside
// the key list above, for objects that name a route `link` or an asset `photo`.
const VALUE_LIKE = /^(?:[#/]|https?:|mailto:|tel:|data:|[a-z0-9-]+\.(?:png|jpe?g|webp|avif|svg|mp4|webm)$)/i;

function isTranslatableString(key, value) {
  if (typeof value !== "string") return false;
  if (!value.trim()) return false;
  // Compared case-insensitively so a module-level export written in the
  // SCREAMING_CASE this codebase uses (`CURRENCY`) is caught by the same list
  // as a nested `currency` field.
  if (NON_TRANSLATABLE_KEYS.has(key) || NON_TRANSLATABLE_KEYS.has(key.toLowerCase())) return false;
  if (VALUE_LIKE.test(value.trim())) return false;
  if (NO_LETTERS.test(value.trim())) return false;
  return true;
}

/**
 * Walk a value, replacing translatable strings with dictionary entries.
 *
 * @param {unknown} node    The English value.
 * @param {Record<string,string>} dict  Flat path to translation map.
 * @param {string} path     Dotted path of `node` within its namespace.
 */
function walk(node, dict, path) {
  if (Array.isArray(node)) {
    return node.map((item, i) => walk(item, dict, `${path}.${i}`));
  }

  if (node && typeof node === "object") {
    // Only plain objects are content. Anything else (a Date, a React element,
    // a class instance) is passed through untouched.
    if (Object.getPrototypeOf(node) !== Object.prototype) return node;

    const out = {};
    for (const [key, value] of Object.entries(node)) {
      const childPath = path ? `${path}.${key}` : key;

      if (isTranslatableString(key, value)) {
        out[key] = dict[childPath] ?? value;
      } else if (value && typeof value === "object") {
        out[key] = walk(value, dict, childPath);
      } else {
        out[key] = value;
      }
    }
    return out;
  }

  return node;
}

/**
 * Localise a whole content module.
 *
 * @param {string} namespace  Module name, e.g. "home". Prefixes every key.
 * @param {object} module     The English module (a namespace import object).
 * @param {Record<string,string>} dict
 */
export function localizeModule(namespace, module, dict) {
  if (!dict || Object.keys(dict).length === 0) return module;

  const out = {};
  for (const [exportName, value] of Object.entries(module)) {
    out[exportName] = walk(value, dict, `${namespace}.${exportName}`);
  }
  return out;
}

/**
 * Does `text` still spell every brand term correctly?
 *
 * Called by scripts/check-i18n.mjs across every dictionary. The brand name is
 * a proper noun and stays in Latin script in all eight languages, including
 * the ones that would otherwise transliterate it. This is the automated half
 * of that rule; the other half is simply not translating it in the first
 * place.
 */
export function violatesBrandTerms(english, translated) {
  return BRAND_TERMS.some(
    (term) =>
      english.includes(term) &&
      !translated.includes(term)
  );
}
