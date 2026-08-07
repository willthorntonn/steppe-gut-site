import sachetsAvif from "../assets/home/product-sachets.avif";
import sachetsWebp from "../assets/home/product-sachets.webp";
import capsulesAvif from "../assets/home/product-capsules.avif";
import capsulesWebp from "../assets/home/product-capsules.webp";
import boxAvif from "../assets/home/product-box.avif";
import boxWebp from "../assets/home/product-box.webp";

// The single source of truth for the three SKUs. The products page, all three
// product pages, the home rail, the cart and the checkout summary all read
// from here — no product string is hard-coded in a component.
//
// Names and formats come from BRAND_GUIDELINES.md §7 and the format naming
// fixed in 02_brand_guidelines.md §4.3 (Daily Sachets, Capsules, Refill
// Pouch — never "SKU" or "variant" in user-facing copy).
//
// ─────────────────────────────────────────────────────────────────────────
// PRICE IS DELIBERATELY NULL.
// Pricing was not locked at build time. products-collection.md §2 is explicit
// that placeholder prices must not ship, so every price-rendering surface
// checks for null and omits the element rather than printing "฿—". Setting a
// real number here is the only change needed to turn prices on sitewide.
// ─────────────────────────────────────────────────────────────────────────

export const CURRENCY = "THB";

// No pouch photograph exists yet. Rather than reuse a sachet render and
// mislabel it, the card falls back to the written photography brief that the
// rest of this codebase already uses for unshot frames (ui/Placeholder).
const POUCH_BRIEF =
  "Stand-up 250 g pouch upright on the shared sandstone plinth, centred, deep forest-green backdrop, single warm golden side light. Roughly 12% breathing room on all sides so the 4:5 crop is safe. Matches the sachet and capsule renders for surface, light and camera distance — the three must read as one catalogue set.";

export const PRODUCTS = [
  {
    slug: "daily-sachets",
    name: "Daily Sachets",
    format: "25 × 10 g sachets",
    formatLong: "25 × 10 g sachets · 25 days",
    servings: 25,
    servingSize: "10 g",
    price: null,
    descriptor:
      "The standard format. One sachet stirred into 100 ml of water, once a day.",
    railDescriptor: "The standard format. One sachet in 100 ml of water.",
    paragraph:
      "Fermented mare's milk from the Mongolian steppe, dried into a fine powder and portioned into single sachets. One a day, stirred into a glass of water.",
    // Tier A compositional facts only — no outcome is stated or implied
    // (02_brand_guidelines.md §6).
    bullets: [
      "10 g of fermented mare's milk powder per sachet",
      "Naturally occurring vitamin C, omega-3, lactoferrin and B vitamins",
      "Nothing added after fermentation",
      "Product of Mongolia",
    ],
    reassurance:
      "Delivered in 2–4 working days across Thailand. Unopened boxes can be returned within 14 days.",
    allergen: "Contains milk.",
    image: { avif: sachetsAvif, webp: sachetsWebp },
    alt: "A box of twenty-five Steppe Gut daily sachets on a pale surface.",
    howToTake: [
      {
        title: "Tear the sachet",
        body: "Along the notch at the top. The powder is fine and settles quickly.",
      },
      {
        title: "Add 100 ml of cool water",
        body: "Cool or room temperature. Hot water is not harmful, but it changes the taste for the worse.",
      },
      {
        title: "Stir and drink",
        body: "Within a minute or two, before it settles. Most people take it before breakfast, though the time of day matters less than doing it at the same time each day.",
      },
    ],
  },
  {
    slug: "capsules",
    name: "Capsules",
    format: "90 capsules",
    formatLong: "90 capsules · 30 days",
    servings: 30,
    servingSize: "3 capsules",
    price: null,
    descriptor:
      "The same powder in capsule form, for travel or if you would rather not taste it.",
    railDescriptor: "For travel, or if you would rather not taste it.",
    paragraph:
      "The same fermented mare's milk powder, encapsulated. Three capsules once a day, with water. For travel, or for anyone who would rather skip the taste.",
    bullets: [
      "Three capsules match one 10 g sachet",
      "Naturally occurring vitamin C, omega-3, lactoferrin and B vitamins",
      "Nothing added after fermentation",
      "Product of Mongolia",
    ],
    reassurance:
      "Delivered in 2–4 working days across Thailand. Unopened bottles can be returned within 14 days.",
    allergen: "Contains milk. The capsule shell is the only addition.",
    image: { avif: capsulesAvif, webp: capsulesWebp },
    alt: "A bottle of Steppe Gut capsules on a pale surface.",
    howToTake: [
      {
        title: "Take three capsules",
        body: "Three capsules match the powder in one 10 g sachet.",
      },
      {
        title: "With water",
        body: "Any temperature. There is nothing to mix and nothing to wait for.",
      },
      {
        title: "Once a day",
        body: "At the same time each day. Most people take them before breakfast, though the hour matters less than the consistency.",
      },
    ],
  },
  {
    slug: "pouch",
    name: "Refill Pouch",
    format: "250 g pouch",
    formatLong: "250 g pouch · 25 servings",
    servings: 25,
    servingSize: "10 g (one level scoop)",
    price: null,
    descriptor:
      "Loose powder with a scoop. For people already in the habit and using less packaging.",
    railDescriptor: "The same powder, loose, for people already in the habit.",
    paragraph:
      "Loose powder with a measuring scoop, in a resealable pouch. The same formula as the sachets with less packaging per serving.",
    bullets: [
      "One level scoop equals one 10 g sachet",
      "Naturally occurring vitamin C, omega-3, lactoferrin and B vitamins",
      "Nothing added after fermentation",
      "Product of Mongolia",
    ],
    reassurance:
      "Delivered in 2–4 working days across Thailand. Unopened pouches can be returned within 14 days.",
    allergen: "Contains milk. Reseal after each use and keep dry.",
    image: null,
    imageBrief: POUCH_BRIEF,
    alt: "A 250 g Steppe Gut refill pouch standing on a sandstone surface.",
    howToTake: [
      {
        title: "One level scoop",
        body: "The scoop in the pouch holds 10 g — the same as one sachet.",
      },
      {
        title: "Add 100 ml of cool water",
        body: "Cool or room temperature. Hot water is not harmful, but it changes the taste for the worse.",
      },
      {
        title: "Stir and drink",
        body: "Then reseal the pouch and keep it dry. Loose powder takes up moisture faster than a sealed sachet does.",
      },
    ],
  },
];

export const PRODUCT_BY_SLUG = Object.fromEntries(
  PRODUCTS.map((product) => [product.slug, product])
);

/**
 * Attribute badges shown under the buy box and on the products page.
 * Defined once here so the two pages cannot drift apart.
 * "No added sugar" is true for all three formats — the sugars declared are
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
  "Fermented mare's milk powder, lactose, whey protein, casein protein, milk fat, omega-3 fatty acids, omega-6 fatty acids, vitamin C (ascorbic acid), vitamin A (retinol), vitamin B1 (thiamine), vitamin B2 (riboflavin), vitamin B12 (cyanocobalamin), calcium, phosphorus, sodium, iron, lactoferrin, lysozyme.";

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
