// Names that stay in Latin script in every language.
//
// These are proper nouns, not words. A Japanese or Burmese reader should see
// the same wordmark a French one does, because that string is the thing they
// will search for, see on the box, and recognise on a shelf. Translating or
// transliterating it would give the brand a different name in every language.
//
// Ordered longest first so a check for "Steppe Gut" is not satisfied by the
// "Steppe" inside "Steppe Soldier".
export const BRAND_TERMS = [
  "Steppe Gut",
  "Steppe Soldier",
  "Steppe Army",
  "ViaCap",
];

// Instruction appended to the brief every dictionary is written against, and
// the sentence to quote at anyone (or anything) producing new translations.
export const BRAND_TERM_RULE =
  "Leave the strings " +
  BRAND_TERMS.map((t) => `"${t}"`).join(", ") +
  " exactly as written, in Latin script, wherever they appear. " +
  "Inflect the surrounding sentence around them rather than the name itself";
