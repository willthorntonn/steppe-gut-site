# Steppe Gut — Implementation Specification

This is the primary reference for how the rest of the Steppe Gut website gets built. It does not restate brand, tokens, scope, motion, or image-prompt detail that already lives in other project files — it explains how to use those files, in what order, and the process to follow page by page. Read this once per session; consult the source documents it points to for the actual values.

---

## 1. How to use this document

**Document map — what lives where:**

| Question | Authoritative source |
|---|---|
| What colour/hex/font/spacing? | `design-tokens.js` → `tailwind.config.js` |
| What does the brand mean, and why these choices? | `BRAND_GUIDELINES.md` |
| What pages/sections exist, in what phases, with what Claude Code prompts? | `docs/STEPPE_GUT_BUILD_PLAN.md` |
| Why does this site exist, who is it for, what's the user journey? | `SG-PROJECT_CONTEXT.md` |
| How should things move? | `docs/ANIMATION_REQUIREMENTS.md` |
| What image/video should I generate for X? | `docs/STEPPE_GUT_HIGGSFIELD_PROMPTS.md` |
| What's already built, what stack, what conventions? | `PROJECT_SPEC.md` (internal build-state reference) |
| **How do I sequence and execute the build?** | **This document** |

This project doesn't have separate `SECTION_REFERENCE.md`, `IMAGE_BRIEFS.md`, or `LOGO_PLACEMENT.md` files — their roles are covered by, respectively, `STEPPE_GUT_BUILD_PLAN.md`, `STEPPE_GUT_HIGGSFIELD_PROMPTS.md`, and `BRAND_GUIDELINES.md` §4 (Logo system). Don't go looking for files that aren't there.

**Conflict priority.** If two sources ever disagree, resolve in this order:

1. `BRAND_GUIDELINES.md` — brand truth
2. **The existing homepage** (`src/App.jsx` as it stands today) — never redesigned, only extended
3. `design-tokens.js` / `tailwind.config.js` — implementation of brand truth
4. This document — sequencing and process
5. `docs/STEPPE_GUT_BUILD_PLAN.md`, `SG-PROJECT_CONTEXT.md`, `docs/ANIMATION_REQUIREMENTS.md` — scope, rationale, motion detail
6. `docs/STEPPE_GUT_HIGGSFIELD_PROMPTS.md` — asset detail
7. seed.com — structural inspiration only, lowest priority, and never a source of visual truth

---

## 2. Project objectives

Restated briefly from `SG-PROJECT_CONTEXT.md` because it should shape every implementation decision below, not just live in a separate file:

Steppe Gut is launching in Thailand before its product category is understood there, and before regulatory approval (import permit, Thai FDA) is finalised. The website therefore has to do two jobs at once that most DTC supplement sites don't have to balance: **educate** a market that has never heard of fermented mare's milk, and **build trust** for a brand with no local track record yet — while still driving toward a purchase.

Every page should serve at least one of: education, trust, brand storytelling, product understanding, conversion. When a section's purpose is unclear, ask which of these five it serves — if none, cut it or fold it into education/trust.

**The seven-question user journey from `SG-PROJECT_CONTEXT.md`** (what is this? why does it exist? why trust it? why Mongolia? how does it work? why different? why buy?) is the throughline for section ordering on every page, not just Home. Section 6 below maps each question to where it gets answered.

---

## 3. Implementation philosophy

- **The existing homepage is the foundation, not a draft.** Its layout, spacing, typography, animation timing, and visual language are the baseline every new page is measured against. Refactor internally (componentise) where needed for reuse; never restyle.
- **Structure from seed.com, substance from Steppe Gut.** Section 5 below analyses seed.com's information architecture and UX patterns. None of its branding, colour, type, copy, imagery, or visual styling transfers — only the shape of the experience.
- **One page at a time, assets just-in-time.** Don't generate the whole image library up front. Generate what a page needs immediately before building that page — except shared "master" assets (the three product renders), which are generated once, early, and reused everywhere they appear. Section 8 covers this in detail.
- **Premium, not decorative.** Every animation, image, and layout choice should reinforce "Functional Luxury" positioning and the trust/education objectives above — not exist because it's possible.
- **Feels professionally designed, not AI-generated.** Consistency across pages (spacing rhythm, motion timing, component reuse) is what signals quality more than any individual flourish.

---

## 4. Website architecture

Site map (from `STEPPE_GUT_BUILD_PLAN.md` scope, structured as the actual route tree):

```
/                      Home            — hero (done), trust panel (done), product carousel,
                                          technology explainer, closing CTA bookend
/products              Shop            — shop hero, product grid (3 SKUs)
/products/:slug        Product detail  — buy box, benefits, delivery science, ingredients,
                                          comparison table
/about                 About           — origin hero (Mongolia), sourcing story, research
                                          cards, sustainability & values, closing CTA
/cart                  Cart/Checkout   — cart drawer, checkout form, payment placeholder,
                                          confirmation (frontend shell only, no backend)
```

Global, present on every route: Nav (sticky), Mobile menu, Newsletter signup, Footer.

**Navigation labels are already decided** — About · Products · Promotions · Contact, plus search/cart/account icons (visible in the current hero nav). Don't replace these with seed.com's Shop/Science/Learn pattern; only borrow seed.com's *behavioural* patterns (see §5 and §9) for how that nav behaves.

---

## 5. Structural reference analysis — seed.com

Live inspection (text-level structural fetch, not visual) of seed.com's homepage, Shop, a Product detail page (DS-01®), the Science/Approach page, and the Sustainability page. This is what to borrow and explicitly what not to.

### 5.1 Information architecture

Seed groups its site into four nav clusters: **Shop** (product grid), **Science** (methodology/credibility, called "Approach"), **Learn** (education/content), plus a persistent **About** family in the footer (Science, Sustainability, SeedLabs) that doesn't appear in the primary nav at all — it's reached via footer and in-page cross-links instead. Trust and education content is deliberately kept *out* of primary nav and distributed through the experience instead — reinforcing `SG-PROJECT_CONTEXT.md`'s instruction that education and trust should be "integrated naturally throughout the user journey rather than isolated on a single page."

**Adaptation for Steppe Gut:** the single `/about` page (Sustainability + SeedLabs merged, Mongolia-forward, already scoped in the Build Plan) is Steppe Gut's answer to seed's Science + Sustainability + SeedLabs cluster, compressed into one page because Steppe Gut has one product line, not seven. Education/trust content should still be distributed into Home and the Product detail page, not siloed only on `/about`.

### 5.2 Homepage section ordering

Seed's homepage, top to bottom:

1. Sticky nav + persistent top announcement strip
2. Hero — headline, subhead, dual CTA (quiz / shop), product image
3. "Whole body health starts in the gut" intro line + shop-all link
4. Product carousel — video-first cards, name/price/CTA per product
5. Bundle cross-sell block (image gallery + bundle CTA)
6. Technology/differentiation block — video + mechanism explainer (ViaCap outer/inner capsule breakdown) + a stat callout
7. Brand mission teaser ("you are more than human") linking out to Science
8. Social proof — video testimonial carousel + press quote cards + UGC scroller
9. SeedLabs teaser (planetary mission) — one line + "Read More"
10. Closing CTA bookend — full-bleed image, single line, single CTA
11. Newsletter signup
12. Footer

**Mapped to Steppe Gut's already-scoped Home sections:** Hero (done) → trust panel/card carousel (done, functions like step 3/8 combined at small scale) → **Product carousel** (maps to step 4) → **Technology explainer** (maps to step 6 — fermentation/mechanism instead of ViaCap) → **Closing CTA bookend** (maps to step 10). Steppe Gut's Build Plan already omits seed's standalone social-proof scroller and bundle cross-sell (single SKU-tier product line, no bundles) — don't add them back in; the existing "+14K" stat panel already covers lightweight social proof.

### 5.3 Product detail page structure

Seed's DS-01® page order: hero (gallery + name + price + subscription cadence + primary CTA + risk-reversal microcopy) → benefits bullets → "feel the difference" feature grid → technology deep-dive (video-led) → strain/ingredient breakdown + allergen-tested badge row → comparison table (us vs. others) → sustainability/delivery-cadence section → regulatory/testing trust badges → FAQ accordion → sticky mini-CTA bar.

This maps almost one-to-one onto the Product detail scope already in `STEPPE_GUT_BUILD_PLAN.md` Phase 5 (buy box → benefit/lifestyle → delivery science → ingredients → comparison table). Two seed.com patterns worth adopting that aren't yet explicit in the Build Plan:
- **A tested/allergen badge row** (seed shows gluten/dairy/nut/soy/shellfish/sesame-tested icons) — Steppe Gut's equivalent is the "Contains Milk" allergen flag plus whatever regulatory/testing claims are confirmed (Thai FDA status, sourcing/manufacturing credentials). Build this as a reusable `TrustBadgeRow` component (see §7) rather than one-off markup — it belongs on the Product page, the About page, and possibly the Home trust panel.
- **A short FAQ accordion** near the bottom of the buy box — not currently scoped, low-cost, high trust value given how unfamiliar the product category is. Flagged as a recommended addition in §12 (Open decisions).

### 5.4 Science/Approach + Sustainability pages → Steppe Gut's merged About

Seed's Approach page is a numbered process narrative (Strains → Biofermentation → Validation → SHIME simulator → Testing), each step paired with an image and a plain-English explanation, ending in an advisory-board credibility grid. Its Sustainability page opens with a mission statement, has a sticky in-page sub-nav (Overview/Biomaterials/Environment/Internal Ecosystem/Impact), a materials catalogue grid (image + short description per packaging material, each expandable), then narrative blocks on culture/mission/R&D spotlights.

**Adaptation for Steppe Gut's `/about`:** use the same *shape* — numbered/anchored process narrative for credibility (fermentation science, sourcing, production), plus a materials/values grid for sustainability — but replace seed's lab-science credibility engine (advisory board, clinical trials, strain taxonomy) with Steppe Gut's actual credibility engine: **Mongolian provenance, traditional production method, and manufacturing/regulatory transparency.** Section 8 goes into this in detail. A sticky in-page sub-nav (Origin / Sourcing / Science / Sustainability) is worth adopting structurally — it's a low-cost pattern that makes a long, education-heavy page feel navigable rather than like a scroll wall.

### 5.5 UX patterns worth adopting (behaviour only)

- **Sticky header, simple pin** — seed uses `position: sticky` with no shrink-on-scroll. Simpler than the "shrink/gain background" behaviour currently scoped in Build Plan Phase 2. See §9.
- **JS-driven interaction states, not blanket CSS transitions** — seed's hover/press states are handled by one animation system, not scattered `transition-*` utilities. Decide this explicitly per §9 rather than mixing approaches.
- **Full-bleed decorative video inside content sections**, not just the hero — always muted/looped/degradable to a poster image.
- **Sticky in-page sub-nav** on long single-scroll pages (Approach, Sustainability) — adopt for `/about`.
- **Sticky mini-CTA bar** on Product detail once the user scrolls past the main buy box — worth adopting given the buy box is the primary conversion moment.

### 5.6 What is explicitly not being copied

Branding, colour, typography, copy, imagery, logos, icons, and all visual styling are seed.com's own and carry zero weight here. Where this document references a seed.com pattern, it is describing **arrangement and behaviour**, never appearance. If a described pattern can't be dissociated from seed's visual identity, don't build it.

---

## 6. User journey → page/section map

From `SG-PROJECT_CONTEXT.md`'s seven questions, mapped to where each is answered. Use this to check that new sections earn their place.

| Question | Primarily answered | Reinforced |
|---|---|---|
| What is this product? | Hero (done), Shop grid | Product carousel |
| Why does it exist? | Home technology explainer | About science narrative |
| Why should I trust it? | Home trust panel (done) | PDP trust-badge row, About credibility narrative |
| Why is Mongolia important? | About origin hero + sourcing story | Home closing CTA bookend, footer, PDP provenance mention |
| How does it work? | Home technology explainer | PDP delivery science |
| Why is it different? | PDP comparison table | About (traditional vs. industrial framing) |
| Why should I buy it? | PDP buy box | Shop, Cart, CTAs throughout |

---

## 7. Recommended build order

Sequenced to minimise rework: shared primitives and shared image assets are built once, early, at their first point of need, then reused rather than regenerated or rebuilt.

**Stage 0 — Foundation (no new page).** Complete `design-tokens.js` (spacing/radius/shadow/heading scale — Build Plan Phase 0.1), install the motion/routing stack, componentise the existing homepage into `Nav`, `Hero`, `PanelStrip` (copied verbatim), and build the primitives every later page depends on: `Button`, `Reveal`, `Section`. No image generation needed.

**Stage 1 — Global shell.** Final `Nav` (sticky pin, see §9), `MobileMenu`, `Footer`, `NewsletterSignup`, and a routing skeleton with all five routes stubbed. No new image generation — reuses the existing horse-mark logo.

**Stage 2 — Home, remaining sections.** Generate: the capsule bottle render (this is asset 1 in the Higgsfield doc's priority list precisely because it's the first shared "master" product asset — it unlocks the carousel here and Shop/PDP/Cart later), the technology/fermentation pour visual, the closing CTA bookend. Build `ProductCarousel`, `TechnologyExplainer`, `ClosingCTA`. The carousel can launch with provisional product copy since full `products.js` data isn't locked until Stage 3 — don't block Home on Shop.

**Stage 3 — Shop.** Lock the 3 SKUs and build `src/data/products.js` first (this is a prerequisite, not a nice-to-have — Build Plan explicitly flags it as one of three things to lock before building). Generate the shop hero lifestyle banner and the family shot (reuses the Stage 2 capsule render plus existing sachet/box crops — don't regenerate those). Build `ShopHero`, `ProductCard` (reused by the Home carousel — retrofit Stage 2's carousel cards to use this component once it exists), `ProductGrid`.

**Stage 4 — Product detail.** Generate the PDP-specific assets (gallery angle, in-use/pour, beauty/lifestyle, ingredients flat-lay, microscopy). Build `BuyBox`, `LifestyleBlock`, `DeliveryScience`, `Ingredients`, `ComparisonTable`, and the `TrustBadgeRow` primitive (§5.3) — this component will be reused on About.

**Stage 5 — About.** Generate the origin hero, sourcing (mares/milking), research-card set, sustainability still. Build `OriginHero`, `SourcingStory`, `ResearchCards`, `SustainabilityValues`, and reuse both `ClosingCTA` (Stage 2's bookend asset) and `TrustBadgeRow` (Stage 4) rather than rebuilding either.

**Stage 6 — Cart/Checkout shell.** No new image generation — reuses product thumbnails, the horse mark, and official PromptPay/bank/card marks. Build `CartProvider`, `CartDrawer`, checkout form, payment placeholder, confirmation screen.

**Stage 7 — Cross-page passes.** Responsiveness sweep, motion-consistency pass, performance pass, accessibility pass, final QA (§13) — done once across the whole site rather than per page, since these are largely about consistency between pages.

This order deliberately builds Home's remaining sections before Shop so the first shared product asset gets generated at its earliest point of need, and builds About after Product so `TrustBadgeRow` already exists rather than being invented twice.

---

## 8. Page implementation workflow

Run this same seven-step process for every page/section, in order:

1. **Purpose.** State which of the five website goals (§2) this section serves and which user-journey question (§6) it answers. If neither is clear, don't build it yet.
2. **Reuse audit.** List which existing components (§10) this section can use as-is or extend. Default to extending; only create a new component when nothing existing fits.
3. **Imagery.** Cross-check `docs/STEPPE_GUT_HIGGSFIELD_PROMPTS.md`'s manifest for this page. Generate only what's listed and not already produced by an earlier stage. Confirm reused assets (product renders, logo, closing-CTA bookend) are pulled from their existing file rather than regenerated.
4. **Motion.** Identify which pattern from §9's table applies to each element. Don't invent a new animation pattern for a single section.
5. **Responsive layout.** Implement mobile-first per §11.
6. **Brand review.** Check against `BRAND_GUIDELINES.md` and the existing homepage — type scale, colour usage (gold sparingly, as accent, not fill), spacing rhythm.
7. **QA pass.** Run the per-page checklist in §13 before moving to the next stage.

---

## 9. Motion philosophy

Synthesising `docs/ANIMATION_REQUIREMENTS.md`'s Steppe Gut plan and its seed.com observations into concrete defaults:

- **`Reveal.jsx` is the one scroll-reveal primitive.** Framer Motion `whileInView`, fade + ~24px slide-up, optional stagger. Every new section is wrapped in it. This is confirmed, not just recommended — seed.com's own sections use JS-driven `whileInView`-style reveals too, not CSS scroll-triggered transitions.
- **Hover/press states: use Tailwind CSS transitions, not Framer Motion `whileHover`, unless a specific interaction needs orchestration Tailwind can't do (e.g. a multi-element staggered hover).** This matches the current codebase's approach (see `App.jsx`'s existing `transition-colors`/`hover:` utilities) and keeps a single mental model — don't mix both approaches on the same element, per the Animation Requirements doc's explicit warning.
- **Sticky nav: adopt a plain `position: sticky` pin rather than the shrink-on-scroll behaviour sketched in `STEPPE_GUT_BUILD_PLAN.md` Phase 2.** This is a recommendation with a clear rationale (simpler, matches the one external reference point we have for this product category), not a mandate — confirm before building Phase 2's Nav if a shrink effect is still wanted.
- **Background video, if added anywhere beyond the hero:** muted, looped, `playsinline`, decorative only, must degrade gracefully to a static poster — never load-bearing for content or accessibility.
- **Every animation must serve a purpose** — direct attention, guide navigation, reinforce hierarchy, support the Mongolia/fermentation storytelling, or improve perceived quality. No motion for its own sake, no repetitive patterns across unrelated sections.
- **Respect `prefers-reduced-motion`** everywhere Framer Motion or Lenis is used — this is a hard requirement, not a nice-to-have (§12).
- Count-up stat, drawer slide-in (`MobileMenu`, `CartDrawer`), and carousel drag (Embla) proceed exactly as already scoped — no seed.com pattern contradicts them.

---

## 10. Component philosophy and reuse map

Every component: one responsibility, reusable, configurable via props, animation-ready (works inside `Reveal`), responsive by default. Prefer extending an existing component over creating a new one — check this list before writing a new file.

**Primitives (build once in Stage 0–1, used everywhere):** `Button` (primary/accent/ghost variants, reads tokens), `Reveal`, `Section` (vertical rhythm wrapper), `CountUp`, `Accordion`, `Modal`/`Drawer` base (underlies both `MobileMenu` and `CartDrawer`).

**Cross-page reuse — the components that must not be rebuilt per page:**

| Component | First built | Reused on |
|---|---|---|
| `ProductCard` | Shop (Stage 3) | Home `ProductCarousel` (retrofit) |
| `TrustBadgeRow` | Product detail (Stage 4) | About, potentially Home trust panel |
| `ClosingCTA` | Home (Stage 2) | About (reuses same bookend asset) |
| `Nav` / `Footer` / `MobileMenu` / `NewsletterSignup` | Stage 1 | Every page, unchanged |
| `Reveal` / `Section` / `Button` | Stage 0 | Every section on every page |

**Domain-grouped, page-specific:** `home/*`, `shop/*`, `product/*`, `about/*` per the file structure already defined in `PROJECT_SPEC.md` §6 — not repeated here to avoid drift between the two documents.

---

## 11. Responsive design principles

- Mobile-first implementation; the existing breakpoint set (`sm`/`md`/`lg`/`xl`, plus the custom `1395` breakpoint already in `tailwind.config.js`) is the baseline — add breakpoints only when a layout genuinely needs one, following the same custom-breakpoint pattern already established (see the `1395` precedent).
- Layouts adapt structurally at each breakpoint (column count, stacking order, image crop) rather than just scaling down — per the existing hero's own responsive behaviour (its staged product image repositions rather than just shrinking).
- Touch targets ≥ 44px on all interactive elements.
- Heavy hero/background video swaps to a lighter static poster on mobile to protect data usage, consistent with `docs/STEPPE_GUT_PRODUCTION_WORKFLOW.md`'s mobile-refinement step.
- Test at minimum: 360px (small phone), tablet, laptop, the existing `1395` breakpoint, and a large-display width.

---

## 12. Accessibility requirements

- Semantic HTML throughout (`<header> <nav> <main> <section> <article> <footer>`), matching the standard already set in the Build Plan and Production Workflow docs.
- A "skip to main content" link — seed.com has one; it's a structural, non-visual pattern worth adopting outright.
- Alt text on every generated image: descriptive where the image carries meaning (product shots, Mongolia sourcing imagery), empty `alt=""` where purely decorative (background textures) — decide per-image at implementation time, don't default to one or the other.
- Colour contrast checked explicitly for gold-on-cream combinations (already flagged as a known risk in `docs/STEPPE_GUT_PRODUCTION_WORKFLOW.md` step 12) before shipping any gold-text-on-cream treatment.
- Visible focus states on every interactive element, keyboard navigability for the mobile menu, cart drawer, accordion, and carousel.
- `prefers-reduced-motion` respected for all Framer Motion and Lenis usage — reveals should still show content (just without the animated entrance), carousels shouldn't autoplay.
- Meaningful form labels on the newsletter signup and checkout form fields (even though checkout doesn't submit to a backend yet, its markup should be accessible from day one).

---

## 13. Performance requirements

Targets already defined in `docs/STEPPE_GUT_PRODUCTION_WORKFLOW.md` step 10 (LCP < 2.5s on the hero, minimal CLS) carry forward as hard requirements for every subsequent page, not just Home. Additive to that:

- Route-based code splitting (`React.lazy`) once `react-router-dom` is in — don't ship all five pages' JS on first load.
- All generated stills converted to WebP/AVIF with responsive `srcset`; all generated clips shipped as compressed MP4 + WebM with a poster frame and `preload="none"` except the hero.
- Lazy-load everything below the fold.
- No dependency added without a clear need — GSAP in particular stays out of the bundle unless the optional pinned technology explainer is actually being built; don't install it speculatively.
- Bundle-size awareness applies per page, not just globally — a heavy PDP shouldn't regress Home's load time, since Home is Stage 2 and ships first.

---

## 14. Coding standards

- Functional components with hooks, matching the existing `App.jsx` — no class components.
- Tailwind utility classes reading from `design-tokens.js`-derived theme values; no hard-coded hex/px values where a token already exists (the existing `App.jsx` occasionally hand-tunes pixel values for the hero's staged-image math — that's acceptable for genuinely bespoke positioning, but should stay the exception, not the pattern).
- Lucide for all functional UI icons — never generate icon imagery.
- PascalCase component names, one file per component, one responsibility per component (§10).
- Comment non-obvious layout math the way the existing hero already does (its box-shadow positioning has an explanatory comment) — this is the right level of comment density to match, not more, not less.
- Folder structure exactly as defined in `PROJECT_SPEC.md` §6.
- Asset filenames follow the `save:` paths already specified in `docs/STEPPE_GUT_HIGGSFIELD_PROMPTS.md` — don't invent alternative naming.
- One logical change per commit, tied to one build stage/step — consistent with the existing commit history style (e.g. "Fix panel sachets responsive overflow and add 1395px breakpoint").

---

## 15. Quality assurance checklist

**Per page/section (run before moving to the next build stage):**

- [ ] Section's purpose (§2) and journey question (§6) are identifiable
- [ ] Existing components reused wherever possible (§10) — no duplicate implementations
- [ ] Only the imagery specified for this page was generated; shared assets were reused, not regenerated
- [ ] Wrapped in `Reveal` (or explicitly and deliberately not, with a reason)
- [ ] Matches `BRAND_GUIDELINES.md` type/colour/spacing usage; gold used sparingly as accent
- [ ] Responsive at 360px, tablet, laptop, `1395`, large display
- [ ] Keyboard-navigable, visible focus states, alt text set deliberately, contrast checked
- [ ] `prefers-reduced-motion` respected
- [ ] No new dependency added without justification

**Pre-launch, whole-site (from `docs/STEPPE_GUT_PRODUCTION_WORKFLOW.md` step 9 — score each 1–10, action anything below 8):**

- [ ] Branding consistency across all five pages
- [ ] UX / UI polish and consistency
- [ ] Accessibility
- [ ] Mobile experience
- [ ] Performance / Core Web Vitals
- [ ] Conversion clarity (is the path to purchase obvious on every page?)
- [ ] Originality (does it read as its own site, not a seed.com reskin?)
- [ ] Existing homepage remains structurally untouched
- [ ] Navigation and routing complete across all pages
- [ ] No placeholder assets remain
- [ ] Mongolia provenance is present and consistent everywhere it's referenced (About, Home bookend, footer, PDP)

---

## 16. Open decisions

Carried forward from other docs, plus new ones surfaced by this analysis — none are resolved here, all should be confirmed with Will before the relevant build stage:

- **Vite vs. Next.js** (from `PROJECT_SPEC.md` / `STEPPE_GUT_PRODUCTION_WORKFLOW.md`) — resolve before Stage 0 is fully locked in.
- **Sticky nav: pin vs. shrink-on-scroll** (§9) — this document recommends the simpler pin; confirm before Stage 1.
- **Lock the 3 shop SKUs** (names/formats/prices) — required before Stage 3, not after.
- **FAQ accordion on Product detail** (§5.3) — recommended addition, not yet in `STEPPE_GUT_BUILD_PLAN.md`'s Phase 5 scope; confirm before Stage 4.
- **Promo modal on load** (observed on seed.com, §5.5) — not currently scoped for Steppe Gut; flagged here only so it's a deliberate omission rather than an oversight.
- **Static vs. animated site direction** — pending the pitch with Alan, per `PROJECT_SPEC.md`.
