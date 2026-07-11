/**
 * Steppe Gut — Design Tokens
 * Source: Steppe Gut Corporate Identity (S72 Strategic Co., LTD.) — Final Revision 27 May 2026
 *
 * Single source of truth for brand colour and type.
 * Written as CommonJS so it can be `require`d by tailwind.config.js AND
 * imported in RN/Expo (Metro) or web app code without an interop shim.
 *
 *   import tokens from './design-tokens';          // ESM (Metro/Babel)
 *   const tokens = require('./design-tokens');     // CJS (Tailwind config)
 */

const brand = {
  product: 'Steppe Gut',
  category: "Fermented Mare's Milk supplement",
  positioning: 'Functional Luxury',
  tagline: 'Natural Radiance from within',
  descriptor:
    "A premium daily ingestible formula with fermented mare's milk to nourish your natural radiance from within.",
  keyActives: ['Vitamin C', 'Omega-3', "Fermented Mare's Milk"],
  company: 'S72 Strategic Co., LTD.',
  contact: { email: 'info@s72strategic.com', phone: '+66-97-251-5911' },
};

/**
 * Core palette — exact hex / RGB / CMYK from the identity document.
 * Role names (primary … quarternary) are the document's own labels.
 */
const palette = {
  forest: { hex: '#2F3E2F', rgb: [47, 62, 47],    cmyk: [71, 53, 75, 55], role: 'primary',     name: 'Deep forest green' },
  cream:  { hex: '#F5F1E9', rgb: [245, 241, 233], cmyk: [2, 4, 7, 0],     role: 'secondary',   name: 'Warm ivory' },
  gold:   { hex: '#D4AF37', rgb: [212, 175, 55],  cmyk: [18, 29, 96, 0],  role: 'tertiary',    name: 'Metallic gold' },
  sage:   { hex: '#7D9D75', rgb: [125, 157, 117], cmyk: [54, 24, 64, 3],  role: 'quarternary', name: 'Soft sage green' },
  earth:  { hex: '#442D1C', rgb: [68, 45, 28],    cmyk: [49, 68, 82, 63], role: 'tertiary (muted variation)', name: 'Deep earth brown' },
};

/** Flat hex map — the shape most tooling expects. */
const colors = {
  forest: palette.forest.hex,
  cream:  palette.cream.hex,
  gold:   palette.gold.hex,
  sage:   palette.sage.hex,
  earth:  palette.earth.hex,
};

/**
 * The three documented palette variations.
 * NB: `vibrant` and `gold` are numerically identical in the source
 * (same four hex values). `muted` swaps the gold tertiary for earth brown.
 */
const palettes = {
  vibrant: { mood: 'Optimism, warmth, high contrast', primary: colors.forest, secondary: colors.cream, tertiary: colors.gold,  quarternary: colors.sage },
  gold:    { mood: 'Gold-forward emphasis',           primary: colors.forest, secondary: colors.cream, tertiary: colors.gold,  quarternary: colors.sage },
  muted:   { mood: 'Stability, organic, rooted',      primary: colors.forest, secondary: colors.cream, tertiary: colors.earth, quarternary: colors.sage },
};

/**
 * Chosen palette for the website (see BRAND_GUIDELINES.md §5 for reasoning).
 * `vibrant` and `gold` are numerically identical in the source, so this flag
 * just documents intent — it does not change any hex values.
 * `muted` is retained as valid brand data but is NOT used on the website.
 */
const activePalette = 'vibrant';

/** Convenience flat export of the website's live colour set. */
const websiteColors = palettes[activePalette];

/**
 * Logo decision for the website (see BRAND_GUIDELINES.md §4 for reasoning).
 * No vector logo files were included in the source PDF (raster mockups
 * only) — these are placeholder asset paths. Export the circular (primary)
 * and landscape (secondary) lockups from the source design file as SVG and
 * drop them in an `assets/logo/` folder matching the paths below, or update
 * the paths to wherever the exported files actually live.
 */
const logo = {
  primary: {
    lockup: 'circular',
    colorway: 'green',
    description: 'Default logo — nav bars, favicon, headers. Horse-head mark in a circular lockup, Forest green on Cream.',
    asset: 'assets/logo/steppe-gut-circular-green.svg',
  },
  secondary: {
    lockup: 'landscape',
    colorway: 'green',
    description: 'Horizontal wordmark lockup for wide headers, footers, email signatures.',
    asset: 'assets/logo/steppe-gut-landscape-green.svg',
  },
  accent: {
    lockup: 'circular',
    colorway: 'gold',
    description: 'Reserved accent/premium variant — limited editions, hover states, gifting contexts. Not the default.',
    asset: 'assets/logo/steppe-gut-circular-gold.svg',
  },
};

const typography = {
  families: {
    serif: 'EB Garamond',   // Primary (English) — display, headings, wordmark
    sans:  'Inter',         // Secondary (English) — body, UI
    thai:  'Noto Sans Thai',// Primary (Thai)
  },
  weights: {
    light: 300,    // Noto Sans Thai only
    regular: 400,
    semibold: 600, // EB Garamond, Inter
    bold: 700,
  },
  // Only body sizes are specified in the source; heading sizes were not.
  sizes: {
    'body-lg': '16px',
    'body-sm': '12px',
  },
};

module.exports = { brand, palette, palettes, colors, typography, activePalette, websiteColors, logo };
