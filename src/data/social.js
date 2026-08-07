// Curated social content — a hand-picked static grid, not a live API feed.
// Confirmed with the client 2026-08-07: no Instagram/TikTok embed, no access
// tokens, no token-refresh backend, no rate limits, no moderation surface.
//
// Turning this page on is adding objects to the two arrays below. No component
// changes are required.

/**
 * Hand-picked posts.
 *
 * EMPTY ON PURPOSE. There is no live social presence yet. SocialGrid renders
 * a plain empty state rather than stock photography dressed as posts —
 * fabricated social proof is ruled out by name in 02_brand_guidelines.md §10.
 *
 * Record shape deliberately mirrors an Instagram media response, so a live
 * fetch can be dropped in later without reshaping the component:
 *
 *   { id, permalink, image, alt, caption, platform, postedAt }
 */
export const SOCIAL_POSTS = [];

/**
 * Platforms we intend to use.
 *
 * `href` is null until an account actually exists. A link to a nonexistent
 * account is a broken link — and if somebody registers that handle in the
 * meantime, it becomes a link to a stranger. Both the footer icons and the
 * /social/ page read this, so filling in a URL here turns it on in both
 * places at once.
 */
export const SOCIAL_PLATFORMS = [
  { name: "Instagram", href: null },
  { name: "TikTok", href: null },
  { name: "Facebook", href: null },
  { name: "YouTube", href: null },
  { name: "LINE", href: null },
];

/** What the accounts will be for. Shown while there is nothing to show. */
export const CONTENT_PILLARS = [
  {
    title: "The season",
    body: "The milking season runs June to October. Most of what we have to show happens in those five months, on the grassland, and it is the part of this business that is genuinely interesting to look at.",
  },
  {
    title: "How it is made",
    body: "Fermenting, drying, packing. The unglamorous middle of the process, which almost nobody in this category shows.",
  },
  {
    title: "What we are asked",
    body: "The questions that come in by email, answered in public, including the ones where the answer is that we do not know yet.",
  },
  {
    title: "What we get wrong",
    body: "When we correct something on this site — a figure, a claim, a piece of wording — we would rather say so than quietly edit it.",
  },
];
