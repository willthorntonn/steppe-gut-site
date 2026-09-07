// Type scale, extracted from the values the existing homepage already sets
// inline (OriginFeature, ProcessRow, SteppeArmyProgress). It lives here so the
// pages built after the homepage inherit the same scale instead of each one
// re-guessing a clamp.
//
// This deliberately does NOT follow `website_blueprint/03_design_system.md`
// §2.2, which specifies a much smaller, Inter-bodied scale (16px body, 44px
// h1). The built homepage outranks the blueprint on any conflict
// (SG-PROJECT_SPEC.md §1), and it sets body copy in the serif at ~1.2–1.55rem
// with display headings up to 6.4rem. Matching the blueprint here would make
// every new page look like a different site.
//
// Each export is a `style` object, used the same way the homepage uses them.

/** Page title. One per page. */
export const DISPLAY = {
  fontSize: "clamp(3rem, 6vw, 6rem)",
  lineHeight: 0.99,
  letterSpacing: "-0.045em",
  textWrap: "balance",
};

/** Section heading (`<h2>`). */
export const H2 = {
  fontSize: "clamp(2.3rem, 4.6vw, 4.2rem)",
  lineHeight: 1.04,
  letterSpacing: "-0.04em",
  textWrap: "balance",
};

/** Oversized, heavy section heading. Used for the "Our Story" and "Fast
 *  forward to today" beats on /our-story/mission/, which are meant to read
 *  markedly larger and thicker than a normal H2. Pair with `font-bold`. */
export const H2_XL = {
  fontSize: "clamp(3.4rem, 7.4vw, 7rem)",
  lineHeight: 1.02,
  letterSpacing: "-0.04em",
  textWrap: "balance",
};

/** Sub-section / card heading (`<h3>`). */
export const H3 = {
  fontSize: "clamp(1.6rem, 2.3vw, 2.2rem)",
  lineHeight: 1.1,
  letterSpacing: "-0.03em",
};

/** Small heading inside dense panels and table-adjacent blocks. */
export const H4 = {
  fontSize: "clamp(1.25rem, 1.5vw, 1.5rem)",
  lineHeight: 1.25,
  letterSpacing: "-0.02em",
};

/** Lead paragraph, directly under a page title. Set in the sans (Inter) -
 *  the description/lead voice is sans, not the display serif (05_component_library.md §7). */
export const LEAD = {
  fontSize: "clamp(1.25rem, 1.6vw, 1.55rem)",
  lineHeight: 1.7,
};

/** Default body copy. Set in the serif, matching the homepage. */
export const BODY = {
  fontSize: "clamp(1.15rem, 1.4vw, 1.35rem)",
  lineHeight: 1.7,
};

/** Body copy inside cards, tables and panels, where density is wanted. */
export const BODY_SM = {
  fontSize: "clamp(1rem, 1.15vw, 1.1rem)",
  lineHeight: 1.65,
};

/** Fine print: captions, footnotes, legal. */
export const CAPTION = {
  fontSize: "0.9375rem",
  lineHeight: 1.6,
};
