# Steppe Gut Website — Project Spec

Internal build reference. Read this once per session (alongside `docs/STEPPE_GUT_BUILD_PLAN.md` for phase-by-phase steps) to stay aligned on brand, stack, and scope. Source of truth for design values is `design-tokens.js`, not this file — this file describes structure and state.

---

## 1. Project

**Product:** Steppe Gut — fermented mare's milk supplement, positioned as "Functional Luxury." Tagline: *Natural Radiance from within*. Target: professional women, 28–45, Thai/ASEAN market.

**Structure:** Steppe Gut (brand owner, funds the build) + S72 Strategic Co., LTD (strategy/marketing, run by Alan). Will builds and will maintain the site (hosting/retainer model post-launch). S72 owns marketing and client relationship; Will's scope is the website only.

**Goal:** Direct e-commerce sales (primary conversion), email capture for cold traffic (secondary). Bilingual EN/Thai eventually.

---

## 2. Stack

**Confirmed:** React 19 · Vite · Tailwind CSS 4 · Lucide (icons)

**To be added** (per `docs/STEPPE_GUT_BUILD_PLAN.md` Phase 0):
```
npm i react-router-dom framer-motion @studio-freight/lenis embla-carousel-react
```
- `react-router-dom` — routing (Vite has no built-in router)
- `framer-motion` — scroll reveals, drawer, hover states
- `lenis` — smooth scroll
- `embla-carousel-react` — product carousel / swipe rows
- `gsap` (optional, later) — pinned/scrubbed technology explainer only

**Open decision:** Vite (stay) vs. Next.js (migrate). Next.js buys SEO + built-in image optimization + cleaner EN/TH i18n, at the cost of a migration before further build-out. Not yet decided — build plan and workflow docs assume Vite until this is resolved.

**Deploy:** GitHub (`willthorntonn/steppe-gut-site`) → Vercel (Vite preset, build `npm run build`, output `dist`). Vercel project already linked (`.vercel/`).

---

## 3. Design system

Single source of truth: `design-tokens.js` → consumed by `tailwind.config.js`. `BRAND_GUIDELINES.md` is a human-readable reference derived from the brand identity doc — it documents decisions, it isn't read by the build.

**Palette (active — "Vibrant"):**

| Token | Hex | Role |
|---|---|---|
| Forest | `#2F3E2F` | Primary |
| Cream | `#F5F1E9` | Secondary |
| Gold | `#D4AF37` | Accent — use sparingly, not as fills |
| Sage | `#7D9D75` | Quaternary |
| Earth | `#442D1C` | Muted-palette only, not used on web |

**Type:** EB Garamond (serif — display/headings/wordmark) · Inter (sans — body/UI) · Noto Sans Thai (later, Thai copy). Fonts already loaded via Google Fonts in `index.html`. Weights: 400/600/700 (300 for Thai only).

**Still missing from tokens (Build Plan Phase 0.1):** spacing scale (4–128px), radius scale (6/12/20/999), shadow depths (3), and an EB Garamond heading scale (h1 clamp(40px,6vw,88px) → h4). Add these to `design-tokens.js` and wire into `tailwind.config.js` before building new sections.

**Golden rule:** the existing hero is final — copy verbatim into components, never restyle it. Every new section is built to match its type/color/motion language.

---

## 4. Current build state

Single-file `App.jsx` (not yet componentized). What exists and is locked:

- **Navbar** — logo (horse mark SVG + wordmark), nav links (About/Products/Promotions/Contact), search/bag/returns icons, account avatar, mobile slide-in menu
- **Hero** — staggered word-reveal headline ("The Radiance of Nature in Full Bloom"), primary CTA button, product-box-on-rock staged image (responsive positioning, painted contact shadow)
- **Panel strip** (3-panel row) — CTA panel with sachet cutout image, auto-rotating card carousel (fermentation science / sourcing / ingredients / radiance), social-proof panel ("+14K" stat with product image)
- Custom keyframe animations (word reveal, fade/slide/scale-in) — no animation library yet, this predates the Framer Motion install

**Not started:** routing, componentization, all pages beyond the home hero/panel strip (Shop, Product detail, About, Cart), global Nav upgrade (sticky/shrink), MobileMenu as its own component, NewsletterSignup, Footer, product data, cart state, any of the Phase 0 token gaps above.

---

## 5. Scope — pages & sections to build

- **Global:** Header/nav (upgrade) · Mobile menu · Newsletter signup · Footer
- **Home `/`:** Hero (keep, done) · Product carousel · Technology explainer · Closing CTA bookend
- **Shop `/products`:** Shop hero · Product card component · 3 products
- **Product detail `/products/:slug`:** Buy box · Benefit/lifestyle · Delivery science · Ingredients · Comparison table
- **About `/about`:** Sustainability + SeedLabs-style research cards merged, Mongolia-forward (origin hero + flag/seal, sourcing story, values)
- **Cart/Checkout `/cart`:** Cart drawer · Checkout (contact + shipping) · Payment placeholder (PromptPay/bank transfer/Stripe hooks, not wired) · Confirmation — **frontend shell only, no backend**

**3 products to confirm and lock in `src/data/products.js`:**
1. Fermented Mare's Milk — 25-Sachet Box (250 g) — hero SKU
2. Fermented Mare's Milk — Stand-up Pouch (250 g) — bulk
3. Capsules (90) — convenience format

Full phase-by-phase build order and copy-paste Claude Code prompts: `docs/STEPPE_GUT_BUILD_PLAN.md`.

---

## 6. File structure (target)

```
src/
  main.jsx
  App.jsx                 # Router + Lenis + CartProvider
  index.css               # @config, fonts, base
  design-tokens.js        # single source of truth (extend per Phase 0)
  data/products.js
  lib/cart.jsx             # CartProvider/context
  components/
    layout/  Nav  MobileMenu  Footer  NewsletterSignup
    ui/      Button  Reveal  Section  CountUp  Accordion  CartDrawer
    home/    Hero  PanelStrip  ProductCarousel  TechnologyExplainer  ClosingCTA
    shop/    ShopHero  ProductCard  ProductGrid
    product/ BuyBox  LifestyleBlock  DeliveryScience  Ingredients  ComparisonTable
    about/   OriginHero  SourcingStory  ResearchCards  SustainabilityValues
  pages/     Home  Shop  ProductDetail  About  Cart
```

---

## 7. Asset toolchain

Three tools only:

- **GPT Image** → every still (hero/product renders, mockups, illustrations, textures, custom icons, flag/seal, ingredient graphics, OG image)
- **Higgsfield** → every motion clip (hero bg video, product pour/mix, technology-explainer motion, About B-roll), including image-to-video from a GPT Image still so photo and video match
- **Claude Code** → all code, wiring, polish, review, optimization, QA, deploy
- **Lucide** (installed) → functional UI icons only — never generate these

Shared brand-kit prompt block (paste at the top of every GPT Image / Higgsfield prompt) and full asset manifest: `docs/STEPPE_GUT_PRODUCTION_WORKFLOW.md`. Asset prompt library: `docs/STEPPE_GUT_IMAGE_PROMPTS.md` / `docs/STEPPE_GUT_IMAGE_ASSETS.md`.

Pipeline summary (steps 5–13): generate assets → review for brand consistency → build in Claude Code → brand polish pass → self-review (score branding/UX/UI/a11y/mobile/perf/conversion/originality, target ≥8) → performance (WebP/AVIF, lazy-load, Core Web Vitals) → mobile refinement → QA → deploy.

---

## 8. Working conventions

- **Strict sequential prompting** — one change per Claude Code prompt, screenshot and verify in-browser before the next
- **One section per fresh context window** — manage token budget, avoid drift
- **Hero is frozen** — never restyle it; new sections match it, not the other way around
- **Files referenced by path**, not pasted inline
- **Revert to simpler approaches** when a suggestion overshoots
- **Session handoff** before `/clear` given the stateful, sequential build — generate a handoff doc rather than losing state
- Low-token, short, direct, casual communication preferred throughout

---

## 9. Open items

- Vite vs. Next.js — decide before Phase 0 is fully locked in
- Static vs. animated site direction — pending pitch with Alan
- Lock the 3 shop products (names/formats/prices) before building `products.js`
- Payment terms with Alan — unrelated to this build but blocking scope commitments beyond the current homepage
