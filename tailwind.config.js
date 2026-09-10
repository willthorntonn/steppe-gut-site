/**
 * Steppe Gut — Tailwind config
 * Brand values are pulled from ./design-tokens.js so there's one source of truth.
 * Works with standard Tailwind and with NativeWind (Expo/React Native).
 *
 * Adjust the `content` globs to match your project layout.
 */

const { colors, typography, activePalette, logo } = require('./design-tokens');

// Sanity guard: fail loudly at build time if design-tokens.js and this file
// ever disagree about which palette is live, rather than silently drifting.
if (activePalette !== 'vibrant') {
  throw new Error(
    `tailwind.config.js expects design-tokens.activePalette to be 'vibrant' (chosen website palette), got '${activePalette}'.`
  );
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.{js,jsx,ts,tsx}',
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // brand names
        forest: colors.forest,
        cream:  colors.cream,
        gold:   colors.gold,
        sage:   colors.sage,
        earth:  colors.earth,
        // semantic aliases mapped to the document's roles
        primary:     colors.forest, // e.g. bg-primary
        secondary:   colors.cream,
        accent:      colors.gold,
        quarternary: colors.sage,
        // Logo colour reference (see design-tokens.js `logo` and
        // BRAND_GUIDELINES.md §4): default logo is Green/Forest,
        // Gold is the reserved accent/premium logo colorway.
        'logo-default': colors.forest,
        'logo-accent':  colors.gold,
      },
      fontFamily: {
        // usage: font-serif (display), font-sans (body), font-thai
        //
        // The var() slot after each brand face is the script font for the
        // active language, set on <html> by the root layout (see
        // src/i18n/fonts.js). Font fallback is per glyph, so a Latin
        // character still renders in EB Garamond or Inter and only the Thai,
        // Burmese or CJK ones fall through to the script face. That is what
        // keeps "Steppe Gut" looking like itself inside a Japanese sentence.
        // The default inside var() matters: an unset custom property would
        // otherwise make the whole font-family declaration invalid.
        serif: [typography.families.serif, 'var(--sg-script-serif, Georgia)', 'Georgia', 'serif'],
        sans:  [typography.families.sans, 'var(--sg-script-sans, system-ui)', 'system-ui', 'sans-serif'],
        thai:  [typography.families.thai, 'sans-serif'],
        // convenience aliases
        display: [typography.families.serif, 'var(--sg-script-serif, Georgia)', 'Georgia', 'serif'],
        body:    [typography.families.sans, 'var(--sg-script-sans, system-ui)', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        light:    String(typography.weights.light),    // 300 (Thai)
        normal:   String(typography.weights.regular),  // 400
        semibold: String(typography.weights.semibold), // 600
        bold:     String(typography.weights.bold),     // 700
      },
      fontSize: {
        // the two body sizes documented in the identity; add heading sizes as needed
        'body-lg': typography.sizes['body-lg'], // 16px
        'body-sm': typography.sizes['body-sm'], // 12px
      },
      screens: {
        '1395': '1395px',
      },
    },
  },
  plugins: [],
};
