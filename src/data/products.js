import boxAvif from "../assets/products/box.avif";
import boxWebp from "../assets/products/box.webp";
import boxThumbAvif from "../assets/products/box-thumb.avif";
import boxThumbWebp from "../assets/products/box-thumb.webp";
import jarAvif from "../assets/products/jar.avif";
import jarWebp from "../assets/products/jar.webp";
import jarThumbAvif from "../assets/products/jar-thumb.avif";
import jarThumbWebp from "../assets/products/jar-thumb.webp";
import bagAvif from "../assets/products/bag.avif";
import bagWebp from "../assets/products/bag.webp";
import bagThumbAvif from "../assets/products/bag-thumb.avif";
import bagThumbWebp from "../assets/products/bag-thumb.webp";


// The single source of truth for the three SKUs. The products page, all three
// product pages, the home rail, the cart and the checkout summary all read
// from here - no product string is hard-coded in a component.
//
// Names and formats come from BRAND_GUIDELINES.md §7 and the format naming
// fixed in 02_brand_guidelines.md §4.3 (Daily Sachets, Capsules, Refill
// Pouch - never "SKU" or "variant" in user-facing copy).
//
// ─────────────────────────────────────────────────────────────────────────
// PRICE IS DELIBERATELY NULL.
// Pricing was not locked at build time. products-collection.md §2 is explicit
// that placeholder prices must not ship, so every price-rendering surface
// checks for null and omits the element rather than printing "฿-". Setting a
// real number here is the only change needed to turn prices on sitewide.
// ─────────────────────────────────────────────────────────────────────────

export const CURRENCY = "THB";

// No pouch photograph exists yet. Rather than reuse a sachet render and
// mislabel it, the card falls back to the written photography brief that the
// rest of this codebase already uses for unshot frames (ui/Placeholder).
const POUCH_BRIEF =
  "Stand-up 250 g pouch upright on the shared sandstone plinth, centred, deep forest-green backdrop, single warm golden side light. Roughly 12% breathing room on all sides so the 4:5 crop is safe. Matches the sachet and capsule renders for surface, light and camera distance - the three must read as one catalogue set.";

export const PRODUCTS = [
  {
    slug: "sachet-box",
    name: "Steppe Gut Sachet Box",
    format: "25 × 10 g sachets",
    formatLong: "25 × 10 g sachets · 25 days",
    servings: 25,
    servingSize: "10 g",
    price: null,
    descriptor:
      "Twenty-five individual sachets of fermented mare's milk powder, one for each day of the month. Tear, mix with water, drink",
    railDescriptor: "25 daily sachets. Tear, mix with water, drink",
    paragraph:
      "Twenty-five sachets of 10 g fermented mare's milk powder from Mongolia. One sachet daily, stirred into 100 ml of water. Pre-portioned, so no measuring required",
    bullets: [
      "10 g of fermented mare's milk powder per sachet",
      "Naturally occurring vitamin C, omega-3, lactoferrin and B vitamins",
      "Nothing added after fermentation",
      "Product of Mongolia",
    ],
    reassurance:
      "Delivered in 2–4 working days across Thailand. Unopened boxes can be returned within 14 days",
    allergen: "Contains milk",
    image: { avif: boxAvif, webp: boxWebp },
    thumb: { avif: boxThumbAvif, webp: boxThumbWebp },
    alt: "The Steppe Gut Sachet Box, twenty-five daily sachets",
    howToTake: [
      {
        title: "Tear the sachet",
        body: "Along the notch at the top. The powder is fine and settles quickly",
      },
      {
        title: "Add 100 ml of cool water",
        body: "Cool or room temperature. Hot water is not harmful, but it changes the taste for the worse",
      },
      {
        title: "Stir and drink",
        body: "Within a minute or two, before it settles. Most people take it before breakfast, though the time of day matters less than doing it at the same time each day",
      },
    ],
  },
  {
    slug: "pill-bottle",
    name: "Steppe Gut Pill Bottle",
    format: "90 capsules",
    formatLong: "90 capsules · 30 days",
    servings: 30,
    servingSize: "3 capsules",
    price: null,
    descriptor:
      "Ninety capsules of fermented mare's milk powder in an amber glass bottle. Three capsules once a day, the same dose as the sachet, but without the taste, for travel or everyday convenience",
    railDescriptor: "90 capsules. Take three daily, no taste to manage",
    paragraph:
      "Ninety capsules of fermented mare's milk powder from Mongolia. Three capsules daily with water. Each capsule contains the same amount as one sachet, without mixing or preparation",
    bullets: [
      "Three capsules match one 10 g sachet",
      "Naturally occurring vitamin C, omega-3, lactoferrin and B vitamins",
      "Nothing added after fermentation",
      "Product of Mongolia",
    ],
    reassurance:
      "Delivered in 2–4 working days across Thailand. Unopened bottles can be returned within 14 days",
    allergen: "Contains milk. The capsule shell is the only addition",
    image: { avif: jarAvif, webp: jarWebp },
    thumb: { avif: jarThumbAvif, webp: jarThumbWebp },
    alt: "The Steppe Gut Pill Bottle, ninety capsules",
    howToTake: [
      {
        title: "Take three capsules",
        body: "Three capsules match the powder in one 10 g sachet",
      },
      {
        title: "With water",
        body: "Any temperature. There is nothing to mix and nothing to wait for",
      },
      {
        title: "Once a day",
        body: "At the same time each day. Most people take them before breakfast, though the hour matters less than the consistency",
      },
    ],
  },
  {
    slug: "sachet-bag",
    name: "Steppe Gut Sachet Bag",
    format: "250 g pouch",
    formatLong: "250 g pouch · 25 servings",
    servings: 25,
    servingSize: "10 g (one level scoop)",
    price: null,
    descriptor:
      "A 250 g pouch of loose fermented mare's milk powder with a measuring scoop. For people in the daily habit who prefer less packaging and lower cost per serving",
    railDescriptor: "250 g loose powder with scoop. Less packaging, better value",
    paragraph:
      "250 g of loose fermented mare's milk powder from Mongolia with a measuring scoop. One scoop daily equals 10 g. Same formula as the sachets with less packaging per serving",
    bullets: [
      "One level scoop equals one 10 g sachet",
      "Naturally occurring vitamin C, omega-3, lactoferrin and B vitamins",
      "Nothing added after fermentation",
      "Product of Mongolia",
    ],
    reassurance:
      "Delivered in 2–4 working days across Thailand. Unopened pouches can be returned within 14 days",
    allergen: "Contains milk. Reseal after each use and keep dry",
    image: { avif: bagAvif, webp: bagWebp },
    thumb: { avif: bagThumbAvif, webp: bagThumbWebp },
    alt: "The Steppe Gut Sachet Bag, 250 g refill pouch",
    howToTake: [
      {
        title: "One level scoop",
        body: "The scoop in the pouch holds 10 g, the same as one sachet",
      },
      {
        title: "Add 100 ml of cool water",
        body: "Cool or room temperature. Hot water is not harmful, but it changes the taste for the worse",
      },
      {
        title: "Stir and drink",
        body: "Then reseal the pouch and keep it dry. Loose powder takes up moisture faster than a sealed sachet does",
      },
    ],
  },
];

export const PRODUCT_BY_SLUG = Object.fromEntries(
  PRODUCTS.map((product) => [product.slug, product])
);

// ─────────────────────────────────────────────────────────────────────────
// MARKETING PRICE + REVIEW PLACEHOLDERS.
// The real `price` field above stays null sitewide (see the note at the top
// of this file). These are the launch-marketing figures the storefront shows
// on the products grid and on each product page. They live here, in one
// table, so the grid card and the detail page can never disagree - the same
// reason SHARED_BADGES does. Proportioned per format (the three packs hold
// different amounts of product), not copy-pasted across slugs.
// ─────────────────────────────────────────────────────────────────────────
export const MARKETING_PRICE_BY_SLUG = {
  "sachet-bag": { price: "฿1,890", was: "฿2,490", save: "SAVE 24% OFF", amount: 1890 },
  "sachet-box": { price: "฿1,990", was: "฿2,590", save: "SAVE 23% OFF", amount: 1990 },
  "pill-bottle": { price: "฿2,490", was: "฿3,290", save: "SAVE 24% OFF", amount: 2490 },
};

// Placeholder social proof for the pre-launch build. Kept beside the price
// table so every surface that shows "★★★★★ (n)" shows the same n.
export const REVIEWS_BY_SLUG = {
  "sachet-bag": { rating: 5, count: 214 },
  "sachet-box": { rating: 5, count: 319 },
  "pill-bottle": { rating: 5, count: 176 },
};

/**
 * Attribute badges shown under the buy box and on the products page.
 * Defined once here so the two pages cannot drift apart.
 * "No added sugar" is true for all three formats - the sugars declared are
 * the lactose naturally present in the milk.
 */
export const SHARED_BADGES = [
  { icon: "map-pin", label: "Product of Mongolia" },
  { icon: "flask-conical", label: "Naturally fermented" },
  { icon: "milk", label: "Contains milk" },
  { icon: "minus-circle", label: "No added sugar" },
];

/**
 * The full declaration, identical across all three formats.
 * From BRAND_GUIDELINES.md §8.
 */
export const INGREDIENTS_DECLARATION =
  "Fermented mare's milk powder, lactose, whey protein, casein protein, milk fat, omega-3 fatty acids, omega-6 fatty acids, vitamin C (ascorbic acid), vitamin A (retinol), vitamin B1 (thiamine), vitamin B2 (riboflavin), vitamin B12 (cyanocobalamin), calcium, phosphorus, sodium, iron, lactoferrin, lysozyme";

/**
 * Nutrition figures are NOT published yet, and this is deliberate.
 *
 * BRAND_GUIDELINES.md §8 records that the powder panel prints a serving size
 * of 1 scoop (0.5 g) with 90 servings, which reconciles neither against the
 * 250 g net weight nor against the 10 g sachet. Both product-detail.md §5 and
 * whats-inside.md §4 flag this as blocking: a transparency page whose
 * arithmetic does not add up costs more trust than it earns.
 *
 * Surfaces that would show a nutrition panel render an honest "not published
 * yet" state instead. Populate this object once the figures are reconciled.
 */
export const NUTRITION = null;
