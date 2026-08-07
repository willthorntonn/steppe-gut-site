# 00 — Sitemap

> **Rescoped 2026-08-07.** This blueprint originally documented 56 routes derived from a full structural analysis of Yakult UK. The client selected a smaller scope: 5 core pages + 2 add-ons. 28 page docs covering education-depth and utility routes (Our Story, The Science, Wellbeing, FAQ, Journal, Press, Careers, Legal, Rituals, Quiz, Stockists, Where to Buy) were deleted. What remains below is the current, correct scope. The discovery methodology and structural findings from the original analysis are preserved in Part A because they still inform how the 7 remaining pages are built — reuse patterns, claim discipline, the `MediaTextRow` primitive, etc. all came from that analysis.

## Part A — What was analysed (unchanged, for context)

The reference site (Yakult UK) was crawled to exhaustion before any of this was written.

**Discovery method and completeness proof:**

1. `robots.txt` → `sitemap.xml` yielded **167 URLs**.
2. An independent recursive link crawl from the homepage, following every internal `<a href>` to fixed point, yielded **98 URLs**.
3. A second, identical recursive crawl was run. **Crawl A and crawl B produced byte-identical URL sets** — the stop condition required by the brief was met.
4. Union of sitemap + crawl = **168 unique URLs**, all returning HTTP 200.

**Structural findings that still shape this blueprint:**

| Finding | Consequence for Steppe Gut |
|---|---|
| One layout primitive (alternating image ⇄ text row) accounts for the majority of all content sections sitewide | This is `MediaTextRow` — the most-reused component in `05_component_library.md` |
| Three sibling product pages, each with the same section template | Steppe Gut has three SKUs and uses one template — `product-detail.md` |
| Claim discipline (Tier A compositional fact / Tier B general nutrient mechanism / Tier C forbidden product-efficacy claim) | Applies to every page below, most acutely `home.md` and `product-detail.md` |

---

## Part B — Steppe Gut sitemap (current scope)

**7 pages.** 5 core + 2 add-ons, per client direction 2026-08-07.

| # | URL | Title | Purpose | Doc |
|---|---|---|---|---|
| 1 | `/` | Home | Orient a stranger; answer "what is this?" and route to shop, sourcing, and social proof | [home.md](pages/home.md) |
| 2 | `/products/` | Products | Present the three formats; help the visitor self-select | [products-collection.md](pages/products-collection.md) |
| 3 | `/products/:slug` | Product detail | Convert. One template, three SKUs (Daily Sachets, Capsules, Refill Pouch) | [product-detail.md](pages/product-detail.md) |
| 4 | `/ingredients-sourcing/` | Ingredients & Sourcing | Full transparency: what's in it, where it comes from, how it's made — consolidated single page | **to be written**, see build prompt below |
| 5 | `/social/` | Social | Curated social feed / UGC hub | **to be written**, see build prompt below |
| 6 | `/cart/`, `/checkout/`, `/checkout/confirmation/` | Cart & Checkout | Purchase flow (frontend shell only, no backend) | [cart-and-checkout.md](pages/cart-and-checkout.md) |
| 7 | `/contact/` | Contact | Route enquiries | [contact.md](pages/contact.md) |
| — | `/404` | Not Found | Error recovery | [not-found.md](pages/not-found.md) |

`whats-inside.md` (kept in `pages/`) is a source of content for `/ingredients-sourcing/` — its nutrition-panel and allergen-table structure should be folded into that page rather than built as a separate route.

## Part C — Relationship to `SG-PROJECT_SPEC.md`

`SG-PROJECT_SPEC.md` §4 scopes `/`, `/products`, `/products/:slug`, `/about`, `/cart`. Reconciled against the client's 7-page selection:

- `/about` in the spec is replaced by two more specific pages: `/ingredients-sourcing/` (the "Ingredients & Sourcing Deep-Dive" add-on) and the social hub. If a shorter brand-story page is still wanted separately from the sourcing deep-dive, that's an open question — see the build prompt.
- `/contact` was implied by the nav labels in spec §4 ("About · Products · Promotions · Contact") but never templated until this blueprint pass.
- Nothing else in the spec's 5-route scope changes.

## Part D — Build order

| Stage | Build | Notes |
|---|---|---|
| 0 | Tokens, primitives, routing skeleton | Already partially done — `Button`, `Reveal` exist in `src/components/` |
| 1 | Global shell: Nav, Footer, MobileMenu | Nav/Footer exist; extend for the 7-route nav (not 30+) |
| 2 | `/` Home remaining sections | Product rail, closing CTA — see `home.md` |
| 3 | `/products/`, `/products/:slug` | Lock `src/data/products.js` first |
| 4 | `/ingredients-sourcing/` | New page — build using `whats-inside.md` content plus condensed sourcing/production narrative |
| 5 | `/social/` | New page — needs a decision on live feed vs. curated static grid before building |
| 6 | `/cart/`, `/checkout/`, `/checkout/confirmation/` | Frontend shell only |
| 7 | `/contact/` | |
| 8 | Cross-page passes: responsive, motion, a11y, performance | |
