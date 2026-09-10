// Site-wide navigation and company details. Single source of truth - the nav,
// the mobile menu, the footer and the contact page all read from here, so an
// address or a route changes in one place.
import { PRODUCT_BY_SLUG } from "./products";

// Five items. "Ingredients & Sourcing" was split into two routes - "Our
// Story" (provenance, production, who makes it) and "Gut Health" (the
// ingredient declaration, allergens, nutrition) - and "FAQ" and "Buy Steppe
// Gut" were added as their own top-level destinations. The mega-menu,
// three-level submenu and search overlay specified in
// `website_blueprint/01_navigation.md` were written for a 56-route site and
// are deliberately not built.
// Sub-navigation for the two sectioned areas. The first item ("All") is the
// existing overview page; the rest are the scaffolded sub-pages. The header
// dropdowns, the mobile menu and the in-page SectionSubNav all read from
// these, so a route changes in one place.
export const OUR_STORY_LINKS = [
  { label: "All", to: "/our-story/" },
  { label: "Our Mission", to: "/our-story/mission/" },
  { label: "Our Science Mission", to: "/our-story/science-mission/" },
  { label: "Manufacturing Process", to: "/our-story/manufacturing/" },
];

export const GUT_HEALTH_LINKS = [
  { label: "All", to: "/gut-health/" },
  { label: "Gut and Diet", to: "/gut-health/diet/" },
  { label: "Gut and Mood", to: "/gut-health/mood/" },
  { label: "Gut and Exercise", to: "/gut-health/exercise/" },
  { label: "Gut and Routine", to: "/gut-health/routine/" },
  { label: "Gut and Sleep", to: "/gut-health/sleep/" },
];

// The three products, in the order the desktop mega-menu shows them (Bag,
// Box, Jar). Only the mobile drawer reads this - on desktop, Products opens
// the picture mega-menu instead, so NAV_LINKS deliberately leaves the entry
// without a `menu`.
export const PRODUCT_LINKS = [
  { label: "All", to: "/products/" },
  ...["sachet-bag", "sachet-box", "pill-bottle"].map((slug) => ({
    label: PRODUCT_BY_SLUG[slug].name,
    to: `/products/${slug}/`,
  })),
];

export const NAV_LINKS = [
  { label: "Products", to: "/products/" },
  { label: "Our Story", to: "/our-story/", menu: OUR_STORY_LINKS },
  { label: "Gut Health", to: "/gut-health/", menu: GUT_HEALTH_LINKS },
  { label: "FAQ", to: "/faq/" },
  { label: "Buy Steppe Gut", to: "/buy/" },
];

export const FOOTER_LINKS = [
  { label: "All products", to: "/products/" },
  { label: "Our Story", to: "/our-story/" },
  { label: "Gut Health", to: "/gut-health/" },
  { label: "FAQ", to: "/faq/" },
];

// From BRAND_GUIDELINES.md §1 and §8. These are the named-entity trust signals
// listed in 02_brand_guidelines.md §10 - manufacturer, importer and brand
// owner are all stated, with a real address and a real phone number.
export const COMPANY = {
  brandOwner: {
    name: "S72 Strategic Co., Ltd.",
    email: "info@s72strategic.com",
    phone: "+66 97 251 5911",
    // tel: links strip the formatting the visible text keeps.
    phoneHref: "+6697251591",
  },
  manufacturer: {
    name: "Monsubi Foods LLC",
    country: "Mongolia",
  },
  importer: {
    name: "YFamily Co., Ltd.",
    // Registered name on the Thai company certificate is "Y Family Co., Ltd."
    // (บริษัท วาย แฟมิลี่ จำกัด); the legal pages use that exact form. Juristic
    // person registration number, from the same certificate.
    registeredName: "Y Family Co., Ltd.",
    regNo: "0105565114721",
    address: [
      "45/1 Silom, 19 Building, 4th Floor, Room 415",
      "Trok Weth, Silom Road, Silom Subdistrict",
      "Bang Rak District, Bangkok 10500",
    ],
  },
  origin: "Product of Mongolia",
  sourcing: {
    province: "Töv Province, Mongolia",
    season: "June to October",
  },
};

// Mandatory on every page - 01_navigation.md §7.5 and 02_brand_guidelines.md
// §6. The Thai FDA sentence states the status honestly; it must not be
// softened into implying registration is issued, and must not be removed.
export const REGULATORY_DISCLOSURE =
  "This product is a dietary supplement and is not intended to diagnose, treat, cure or prevent any disease. It should not be used as a substitute for a varied and balanced diet. Contains milk. Thai FDA registration is in progress; registration details will be published here on completion";
