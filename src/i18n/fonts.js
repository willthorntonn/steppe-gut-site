// Script coverage for English and Thai.
//
// The brand faces do not cover Thai. EB Garamond (display) and Inter (body)
// are Latin-Greek-Cyrillic with not a single Thai glyph, so left alone a Thai
// page would fall through to whatever the browser has installed.
//
// So Thai names its own pair of families, shipped as a webfont. They are
// appended after the brand faces rather than replacing them, because font
// fallback is per glyph: "Steppe Gut" inside a Thai sentence still renders in
// EB Garamond, which is exactly what the brand-term rule is protecting.

const LATIN = {
  link: null,
  serif: "Georgia, serif",
  sans: "system-ui, sans-serif",
};

export const SCRIPT_FONTS = {
  latin: LATIN,

  // The webfont asks for a weight *range* (`wght@300..700`) rather than a
  // list of weights. That is what makes Google Fonts serve the variable font -
  // one file covering every weight - instead of a separate static file per
  // weight per unicode range: 201 KB over 7 files down to 58 KB over 2.
  //
  // Do not "tidy" this back into `wght@400;600;700`. It looks equivalent and
  // quadruples the download.
  thai: {
    link: "https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300..700&family=Noto+Serif+Thai:wght@400..700&display=swap",
    serif: '"Noto Serif Thai", "Noto Sans Thai", Georgia, serif',
    sans: '"Noto Sans Thai", system-ui, sans-serif',
  },
};

export function scriptFonts(script) {
  return SCRIPT_FONTS[script] ?? LATIN;
}

/**
 * The CSS custom properties the tailwind font stacks resolve through.
 * Set as an inline style on <html> so the correct script font is in place on
 * the very first paint, with no flash of fallback type.
 */
export function fontVars(script) {
  const fonts = scriptFonts(script);
  return {
    "--sg-script-serif": fonts.serif,
    "--sg-script-sans": fonts.sans,
  };
}
