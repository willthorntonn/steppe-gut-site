# Steppe Gut — Website Blueprint

A complete, self-contained implementation blueprint for the Steppe Gut website.

This blueprint was produced by analysing the **information architecture, UX patterns, layout systems and page hierarchy** of a large, mature UK consumer-probiotic website (Yakult UK, 168 URLs, crawled and analysed in full). Nothing of that site's branding, wording, imagery or creative assets appears anywhere in this blueprint. What was taken is *structural knowledge only* — which pages a category-education-led wellness brand needs, in what order sections should appear to move a stranger toward purchase, and which layout primitives carry the whole site.

**Every word of copy in this blueprint is original and written for Steppe Gut.**

---

## How to use this blueprint

Read in this order:

| # | Document | What it gives you |
|---|---|---|
| 1 | [`00_sitemap.md`](00_sitemap.md) | Every route, its parent, nav location, purpose, and the reference-site page it structurally derives from |
| 2 | [`01_navigation.md`](01_navigation.md) | Header, mega-menu, mobile menu, search, footer, sticky rails — behaviour and markup |
| 3 | [`02_brand_guidelines.md`](02_brand_guidelines.md) | Voice, tone, vocabulary, claim discipline, what Steppe Gut never says |
| 4 | [`03_design_system.md`](03_design_system.md) | Colour, type scale, spacing rhythm, radii, containers, breakpoints, motion |
| 5 | [`05_component_library.md`](05_component_library.md) | The 22 components every page is assembled from |
| 6 | [`04_image_prompt_guidelines.md`](04_image_prompt_guidelines.md) | House art direction + how to read the image placeholders |
| 7 | [`pages/`](pages/) | One document per page or page template, with section-by-section build instructions and finished copy |

**Build order** is given at the end of `00_sitemap.md`.

---

## Relationship to the existing repo documents

This blueprint is **additive and subordinate** to the brand truth already established in the repository. Where anything here disagrees with the following, those win:

1. `BRAND_GUIDELINES.md` — brand truth (colour, logo, type, product facts, regulatory)
2. The existing homepage (`src/App.jsx`) — never redesigned, only extended
3. `design-tokens.js` / `tailwind.config.js` — implementation of brand truth
4. `SG-PROJECT_SPEC.md` — sequencing and process

This blueprint supplies what those documents do not: the **full page inventory and per-page implementation detail** for a site much larger than the five routes currently scoped in `SG-PROJECT_SPEC.md` §4.

> **Note on scope.** `SG-PROJECT_SPEC.md` currently scopes a 5-route site (`/`, `/products`, `/products/:slug`, `/about`, `/cart`). This blueprint describes a ~55-route site. That is a deliberate expansion, because the reference analysis showed that the education-and-trust job described in `SG-PROJECT_CONTEXT.md` is carried almost entirely by the *editorial and science depth* of the site, not by the commerce pages. The five original routes all survive inside this larger map — see the "Relationship to the 5-route scope" table in `00_sitemap.md`. If the smaller scope is preferred, build Tier 1 only (marked in the sitemap) and treat the rest as a roadmap.

---

## Non-negotiables carried through every page

- **Educate before selling.** Every commercial page must answer "what is this?" before it asks for money.
- **Mongolia is present, never costumed.** Provenance is stated plainly and repeatedly; it is never exoticised, and never rendered as decoration.
- **No health claims beyond what is substantiated.** See `02_brand_guidelines.md` §6 (Claim discipline) — this is the single highest-risk area on the whole site, given Thai FDA registration is still in progress.
- **Understated.** No urgency banners, no countdowns, no exclamation marks, no "revolutionary", no before/after.
- **Thai-first bilingual.** Every page ships EN + TH. See `03_design_system.md` §9.
