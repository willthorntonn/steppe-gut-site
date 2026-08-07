// Site-wide navigation and company details. Single source of truth — the nav,
// the mobile menu, the footer and the contact page all read from here, so an
// address or a route changes in one place.

// Four items, per the rescope banner at the top of
// `website_blueprint/01_navigation.md`. The mega-menu, three-level submenu and
// search overlay specified below that banner were written for a 56-route site
// and are deliberately not built.
export const NAV_LINKS = [
  { label: "Products", to: "/products/" },
  { label: "Ingredients & Sourcing", to: "/ingredients-sourcing/" },
  { label: "Social", to: "/social/" },
  { label: "Contact", to: "/contact/" },
];

export const FOOTER_LINKS = [
  { label: "All products", to: "/products/" },
  { label: "Daily Sachets", to: "/products/daily-sachets/" },
  { label: "Capsules", to: "/products/capsules/" },
  { label: "Refill Pouch", to: "/products/pouch/" },
  { label: "Ingredients & Sourcing", to: "/ingredients-sourcing/" },
  { label: "Social", to: "/social/" },
  { label: "Contact", to: "/contact/" },
];

// From BRAND_GUIDELINES.md §1 and §8. These are the named-entity trust signals
// listed in 02_brand_guidelines.md §10 — manufacturer, importer and brand
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

// Mandatory on every page — 01_navigation.md §7.5 and 02_brand_guidelines.md
// §6. The Thai FDA sentence states the status honestly; it must not be
// softened into implying registration is issued, and must not be removed.
export const REGULATORY_DISCLOSURE =
  "This product is a dietary supplement and is not intended to diagnose, treat, cure or prevent any disease. It should not be used as a substitute for a varied and balanced diet. Contains milk. Thai FDA registration is in progress; registration details will be published here on completion.";
