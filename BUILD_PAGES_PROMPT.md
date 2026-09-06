# Build prompt — Steppe Gut website pages

Paste everything below into a fresh Claude Code session in this repo.

---

Build out the Steppe Gut website. Read `SG-PROJECT_SPEC.md` first — it's the master spec and explains conflict priority between documents (brand guidelines win, then the existing homepage in `src/App.jsx`, then design tokens, then that spec, then everything else).

**Scope — 7 pages only, confirmed with the client on 2026-08-07:**

1. Homepage (`/`) — extend the existing `src/App.jsx`, don't rebuild it
2. Shop / Product Catalog (`/products/`)
3. Individual Product Pages (`/products/:slug`) — one template, three SKUs
4. Cart & Checkout (`/cart/`, `/checkout/`, `/checkout/confirmation/`) — frontend shell only, no backend/payment processing
5. Contact Us (`/contact/`)
6. Ingredients & Sourcing Deep-Dive (`/ingredients-sourcing/`) — one consolidated page
7. Social Hub / Social Feed Integration (`/social/`)

Do not build anything outside this list (no `/how-it-works/`, `/our-story/`, `/the-science/`, `/wellbeing/`, `/faq/`, `/journal/`, `/press/`, `/careers/`, `/legal/`, `/stockists/`, `/quiz/` — these were in an earlier, larger draft of the blueprint and were deliberately cut).

**Reference docs, in the order you'll need them:**

- `website_blueprint/README.md` — index of the blueprint
- `website_blueprint/00_sitemap.md` — the current 7-route scope (already rescoped, read Part B)
- `website_blueprint/01_navigation.md` — **read the rescope banner at the top first.** The detailed mega-menu/3-level submenu spec below it is for the old 56-route site and is over-built for 7 pages. Use the simplified 4-item nav (`Products` · `Ingredients & Sourcing` · `Social` · `Contact` + cart icon) it describes instead. Header structure, mobile menu mechanics and footer are still valid reference.
- `website_blueprint/02_brand_guidelines.md` — voice, vocabulary, and the claim-discipline tiers (§6). This is the one section that must never be violated: Tier A (compositional fact) and Tier B (general nutrient mechanism) are fine; Tier C (product-efficacy claims like "improves your skin") is forbidden until Thai FDA registration is issued.
- `website_blueprint/03_design_system.md` — colour, type, spacing, breakpoints, all component tokens
- `website_blueprint/04_image_prompt_guidelines.md` — house art direction and the two Higgsfield pipelines, if any new imagery is needed
- `website_blueprint/05_component_library.md` — **read the rescope banner at the top first**, then the component specs. Skip `Breadcrumbs`, `FilterTabs`, `TabbedPanel` — not needed at this scope.
- `website_blueprint/pages/home.md` — full spec for the homepage's remaining sections
- `website_blueprint/pages/products-collection.md` — full spec for `/products/`
- `website_blueprint/pages/product-detail.md` — full spec for `/products/:slug`
- `website_blueprint/pages/cart-and-checkout.md` — full spec for cart/checkout/confirmation
- `website_blueprint/pages/contact.md` — full spec for `/contact/`
- `website_blueprint/pages/not-found.md` — 404 page, build this in Stage 1 alongside routing, not last

**Two pages have no written spec yet — write them before building, following the same format as the docs above (Summary / Purpose / Layout / Section order / Copy / Responsive / Accessibility / SEO / Developer notes):**

**`/ingredients-sourcing/`** — consolidate content from `website_blueprint/pages/whats-inside.md` (full ingredient list, allergens, nutrition comparison across all 3 SKUs) with a condensed version of the sourcing/production narrative: where the milk comes from (Töv Province, Mongolia, seasonal — June to October), how it's fermented and dried, who manufactures it (name the companies — this is a trust page, anonymity undermines it). Keep it to one scrollable page, not a hub with children. Apply the same claim-discipline rules as everywhere else, and include an honest-limits section (what isn't tested/certified yet) — that's the single highest-trust device in the whole blueprint and shouldn't be dropped just because the page count shrank.

**`/social/`** — before writing this one, **ask me two things**: (1) is this a live embedded feed (Instagram/TikTok API) or a curated static grid of hand-picked posts, and (2) is there actually a live social presence to pull from yet, or does this page need to work as a placeholder/waitlist-style page pre-launch. Don't assume — a live feed embed and a static curated grid are different builds with different dependencies (API keys, rate limits, moderation) and I haven't decided.

**Build order** (from `SG-PROJECT_SPEC.md` §7 and `00_sitemap.md` Part D, reconciled):

0. Confirm tokens/primitives are in place (`Button`, `Reveal` already exist in `src/components/`)
1. Nav + Footer for the 4-item scope, routing skeleton with all 7 routes stubbed, 404 page
2. Home — remaining sections per `home.md`
3. Products + Product Detail — lock `src/data/products.js` (3 SKUs, names/formats/prices) before building either page
4. Ingredients & Sourcing
5. Social (after the two questions above are answered)
6. Cart/Checkout/Confirmation — frontend shell, no payment integration, visible "not yet enabled" notice on the payment step per the pattern in `cart-and-checkout.md`
7. Contact
8. Cross-page pass: responsive (360px/tablet/laptop/1395/large), keyboard nav + focus states, `prefers-reduced-motion`, alt text, gold-on-cream contrast check

**Hard constraints, repeated because they're easy to lose under deadline pressure:**

- No health-outcome claims anywhere ("improves skin", "boosts energy") — only compositional facts and general nutrient-function statements, always about the nutrient, never phrased as being about the product's effect on a person
- Thai FDA registration is not yet issued — don't state or imply it is, anywhere, including in footer/legal microcopy
- No backend exists yet — checkout and contact forms must not transmit real data anywhere; show a visible "not connected yet" state rather than silently failing or collecting data into a void
- The existing homepage (`src/App.jsx`) is the foundation, not a draft — extend it, don't restyle or rebuild what's already there

Work through the build order one stage at a time. Confirm the two `/social/` questions with me before starting that page. Flag anything in the blueprint docs that seems to contradict `BRAND_GUIDELINES.md` or the existing homepage — those two win on any conflict.
