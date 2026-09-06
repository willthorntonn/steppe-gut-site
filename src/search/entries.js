import { ORIGIN, PROCESS, READS } from "../content/home";
import { FAQ_GROUPS } from "../data/faq";
import {
  INGREDIENT_GLOSSARY,
  SUITABILITY,
  NOT_IN_IT,
  PRODUCTION_STEPS,
} from "../data/ingredients";
import { PRODUCTS, INGREDIENTS_DECLARATION } from "../data/products";
import { CONTENT_PILLARS } from "../data/social";
import { COMPANY } from "../data/site";

// One flat, in-memory index of everything the site actually renders. It is
// assembled from the same content modules the pages read from (content/home,
// data/faq, data/ingredients, data/products, data/social) so it cannot drift
// out of step with the copy on the page, plus a handful of hand-written
// entries for page headers and leads that only live in JSX.
//
// Every entry resolves to a real place:
//   path  - the route (trailing slash, matching App.jsx)
//   hash  - an element id that exists in that page's DOM, or "" for page top
//           (see the ids on <Section> / <section> across src/pages and
//           src/components/home). SearchOverlay navigates to `path + hash`
//           and RouteChange scrolls the anchor into view.
//
// Result rendering uses:
//   page    - group heading in the results list, also the page-ordering key
//   section - the section the match sits in (second line of a result)
//   label   - the result's own title (first line)
//   body    - prose the query is matched against and the snippet is cut from
//   terms   - extra keywords that should find this entry but aren't in `body`

// Order results groups appear in, roughly the site's own nav order.
export const PAGE_ORDER = [
  "Home",
  "Products",
  "Our Story",
  "Gut Health",
  "FAQ",
  "Buy Steppe Gut",
  "Social",
  "Contact",
];

const HOME = [
  {
    page: "Home",
    path: "/",
    hash: "",
    section: "Introduction",
    label: "Fermented mare's milk from Mongolia",
    body: "A daily fermented mare's milk supplement from the Mongolian steppe. What it is, how it is made, and what the research does and does not show",
    terms: "homepage overview supplement daily powder",
  },
  {
    page: "Home",
    path: "/",
    hash: "#origin",
    section: "Old tradition, made new",
    label: ORIGIN.title,
    body: ORIGIN.body,
    terms: "origin provenance mongolia steppe fermentation vitamin c omega-3 b vitamins gut",
  },
  ...PROCESS.items.map((item) => ({
    page: "Home",
    path: "/",
    hash: "#process",
    section: "How it is made",
    label: `${item.title}`,
    body: item.body,
    terms: `step ${item.step} process milking fermenting culturing sealing`,
  })),
  {
    page: "Home",
    path: "/",
    hash: "#steppe-army",
    section: "The Steppe Army",
    label: "Ten thousand Steppe Soldiers",
    body: "Everyone who drinks Steppe Gut is a Steppe Soldier. The Steppe Army is tracked against a goal of ten thousand. Will you join them?",
    terms: "steppe army soldiers supporters counter community join goal",
  },
  {
    page: "Home",
    path: "/",
    hash: "#reads",
    section: "What makes us different",
    label: READS.title,
    body: `${READS.items
      .map((item) => item.category)
      .join(", ")}. Fermentation, provenance, the herd, quality, and the product itself`,
    terms: "difference why different reads articles fermentation provenance herd quality",
  },
];

const PRODUCTS_ENTRIES = [
  {
    page: "Products",
    path: "/products/",
    hash: "",
    section: "All formats",
    label: "Products: three formats, one formula",
    body: "Fermented mare's milk powder from Mongolia, in three formats: sachets, capsules, and a refill pouch. The same powder in every pack",
    terms: "shop catalogue range formats buy sachet capsule pouch",
  },
  ...PRODUCTS.map((product) => ({
    page: "Products",
    path: `/products/${product.slug}/`,
    hash: "",
    section: product.format,
    label: product.name,
    body: `${product.descriptor} ${product.paragraph}`,
    terms: `${product.formatLong} ${product.bullets.join(" ")} ${product.allergen}`,
  })),
  ...PRODUCTS.map((product) => ({
    page: "Products",
    path: `/products/${product.slug}/`,
    hash: "",
    section: `${product.name}: how to take it`,
    label: "How to take it",
    body: product.howToTake
      .map((step) => `${step.title}. ${step.body}`)
      .join(" "),
    terms: `dose dosage how to use directions ${product.servingSize} ${product.name}`,
  })),
];

const OUR_STORY = [
  {
    page: "Our Story",
    path: "/our-story/",
    hash: "",
    section: "Our Story",
    label: "Where it came from, and who makes it",
    body: "Where the milk is collected, who ferments it and who makes the finished pack, with the manufacturer, importer and brand owner named",
    terms: "story provenance transparency company origin",
  },
  {
    page: "Our Story",
    path: "/our-story/",
    hash: "#sourcing",
    section: "Töv Province, Mongolia",
    label: "Milked between June and October",
    body: "The milk is collected in Töv Province, on open grassland, by herding families who are paid directly for it. Mares are milked by hand, several times a day, and only during the months they are in milk, roughly June to October. Fresh mare's milk spoils in hours, so fermenting it and then drying it is how a summer's milk becomes something you can take in February",
    terms: "sourcing seasonality herders mares grassland season milking",
  },
  {
    page: "Our Story",
    path: "/our-story/",
    hash: "#fermentation",
    section: "How it is made",
    label: "How it is made",
    body: PRODUCTION_STEPS.map((step) => `${step.title}. ${step.body}`).join(" "),
    terms: "process milking fermenting drying packing low temperature powder",
  },
  {
    page: "Our Story",
    path: "/our-story/",
    hash: "#who-makes-it",
    section: "Who makes it",
    label: "Who makes it",
    body: `Three companies are involved and all three are named. Manufactured by ${COMPANY.manufacturer.name} in ${COMPANY.manufacturer.country}. Imported and distributed by ${COMPANY.importer.name}, ${COMPANY.importer.address.join(", ")}. Brand owner ${COMPANY.brandOwner.name}, ${COMPANY.brandOwner.email}`,
    terms: "manufacturer importer brand owner monsubi yfamily s72 strategic bangkok address transparency",
  },
  {
    page: "Our Story",
    path: "/our-story/",
    hash: "#honest-limits",
    section: "Honest limits",
    label: "What the research does and does not show",
    body: "Research into fermented mare's milk is limited. Most published studies are small. Batch-to-batch variation in a seasonal, naturally fermented product is real. We do not hold gluten-free or organic certification. Thai FDA registration is in progress; until it is issued we describe this product as a dietary supplement and make no health claims for it",
    terms: "honest limits research evidence studies thai fda registration certification claims",
  },
];

const GUT_HEALTH = [
  {
    page: "Gut Health",
    path: "/gut-health/",
    hash: "",
    section: "Gut Health",
    label: "Everything that is in it",
    body: "The full ingredient declaration, what each thing is, and the nutrition behind it. Where we do not have a figure yet, this page says so",
    terms: "what's inside ingredients allergens nutrition glossary",
  },
  {
    page: "Gut Health",
    path: "/gut-health/",
    hash: "#ingredients",
    section: "Ingredients",
    label: "Ingredient declaration",
    body: INGREDIENTS_DECLARATION,
    terms: "ingredients declaration list identical all formats capsule shell",
  },
  ...SUITABILITY.map((item) => ({
    page: "Gut Health",
    path: "/gut-health/",
    hash: "#allergens",
    section: "Allergens and suitability",
    label: item.title,
    body: item.body,
    terms: "allergen suitability milk lactose gluten vegan vegetarian nuts pregnancy",
  })),
  ...INGREDIENT_GLOSSARY.map((entry) => ({
    page: "Gut Health",
    path: "/gut-health/",
    hash: "#glossary",
    section: "What each thing is",
    label: entry.name,
    body: entry.explanation,
    terms: "glossary ingredient nutrient explanation",
  })),
  {
    page: "Gut Health",
    path: "/gut-health/",
    hash: "#nutrition",
    section: "Nutrition",
    label: "Nutrition",
    body: "Nutrition figures are not published yet. This is deliberate: the panel's arithmetic has to reconcile before it ships. Surfaces that would show a nutrition panel render an honest not-published-yet state instead",
    terms: "nutrition panel figures serving size calories protein not published",
  },
  ...NOT_IN_IT.map((item) => ({
    page: "Gut Health",
    path: "/gut-health/",
    hash: "#not-in-it",
    section: "What is not in it",
    label: item.title,
    body: item.body,
    terms: "not in it free from no added sugar sweeteners flavourings colourings preservatives fillers",
  })),
];

const FAQ = FAQ_GROUPS.flatMap((group) =>
  group.items.map((item) => ({
    page: "FAQ",
    path: "/faq/",
    hash: `#${group.id}`,
    section: group.heading,
    label: item.question,
    body: item.answer
      ? item.answer
      : (item.steps || []).map((step, i) => `${i + 1}. ${step}`).join(" "),
    terms: `faq question ${group.heading}`,
  }))
);

const BUY = [
  {
    page: "Buy Steppe Gut",
    path: "/buy/",
    hash: "",
    section: "Buy Steppe Gut",
    label: "Buy Steppe Gut today",
    body: "Explore the full Steppe Gut range of fermented mare's milk supplements and find the right format for your daily routine. Rooted in Mongolian tradition and crafted for modern everyday life",
    terms: "buy shop order purchase range formats price contact",
  },
];

const SOCIAL = [
  {
    page: "Social",
    path: "/social/",
    hash: "",
    section: "Social",
    label: "We have not started posting yet",
    body: "The accounts are not open. Rather than fill the page with pictures that are not ours and numbers that are not real, here is what we intend to post, and how to find out when it starts",
    terms: "social instagram tiktok facebook youtube line accounts",
  },
  ...CONTENT_PILLARS.map((pillar) => ({
    page: "Social",
    path: "/social/",
    hash: "",
    section: "What will be on them",
    label: pillar.title,
    body: pillar.body,
    terms: "social content pillars plan season how it is made questions corrections",
  })),
];

const CONTACT = [
  {
    page: "Contact",
    path: "/contact/",
    hash: "",
    section: "Contact",
    label: "Contact us",
    body: `Send Steppe Gut a message about a product, an order, trade or press. ${COMPANY.brandOwner.email}, ${COMPANY.brandOwner.phone}`,
    terms: "contact email phone message support enquiry get in touch",
  },
];

export const SEARCH_ENTRIES = [
  ...HOME,
  ...PRODUCTS_ENTRIES,
  ...OUR_STORY,
  ...GUT_HEALTH,
  ...FAQ,
  ...BUY,
  ...SOCIAL,
  ...CONTACT,
].map((entry, index) => ({ id: `sg-search-${index}`, ...entry }));
