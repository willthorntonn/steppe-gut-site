# Steppe Gut — Website Build Plan

How to extend your current homepage (hero + nav + 3 panels) into the full site you ticked, in **Claude Code**, matching Seed's structure & motion but wearing Steppe Gut's brand.

**Confirmed stack:** React 19 · Vite · Tailwind 4 · Lucide. Design tokens already wired (`design-tokens.js` → `tailwind.config.js`).
**Not installed yet:** a router, an animation library, smooth scroll, a carousel.
**Golden rule:** keep the hero exactly as-is. Everything else is built to match *it*.

---

## Scope (your ticked list)

- **Global:** Header/nav · Mobile menu · Newsletter signup · Footer
- **Home `/`:** Hero (keep) · Product carousel · Technology explainer · Closing CTA bookend
- **Shop `/products`:** Shop hero · Product card component · **3 products**
- **Product detail `/products/:slug`:** Buy box · Benefit/lifestyle · Delivery science · Ingredients · Comparison table
- **About `/about`** (Sustainability + SeedLabs merged, Mongolia-forward)
- **Cart/Checkout `/cart`:** Cart drawer · Checkout (contact+shipping) · Payment · Confirmation — *frontend shell only, no backend yet*

---

## Phase 0 — Foundation (do this first, ~1 hr)

The single highest-leverage work. New sections only look "designed" if the system underneath them is complete.

**0.1 Finish the design tokens.** `design-tokens.js` nails colour + type but is missing spacing, radius, shadow, and heading sizes. Add:

- **Spacing scale:** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 (px)
- **Radius:** sm 6 · md 12 · lg 20 · pill 999
- **Shadows:** 3 depths (subtle card / raised / floating drawer)
- **Heading sizes:** the doc only specifies body (16/12). Add a display scale for EB Garamond, e.g. h1 clamp(40px,6vw,88px) down to h4 — tuned to match the hero.
- Wire all of these into `tailwind.config.js` the same way colours already are.

> **Tailwind 4 note:** v4 prefers a CSS-first `@theme` block in your `index.css`. Your JS config still works if you add `@config "../tailwind.config.js";` at the top of `index.css`. Have Claude Code confirm the tokens actually apply (e.g. `bg-forest text-gold` renders) before building anything else.

**0.2 Load the fonts.** Add EB Garamond (400/600/700) + Inter (400/600/700) via Google Fonts (`index.html` or `@import` in CSS). Noto Sans Thai can wait until the bilingual pass.

**0.3 Install the motion + routing stack:**

```
npm i react-router-dom framer-motion @studio-freight/lenis embla-carousel-react
```

- `react-router-dom` — multi-page (you're on Vite, so this is your router, not Next)
- `framer-motion` — scroll reveals, drawer, hovers
- `lenis` — buttery smooth scroll (this is a big part of the Seed "feel")
- `embla-carousel-react` — the product carousel / any swipe rows
- *(optional, later)* `gsap` — only if you want the pinned/scrubbed technology explainer

---

## Phase 1 — Componentize what exists 

Break the monolithic `App.jsx` into building blocks so the rest slots in. Mirrors Claude Code's own advice:

1. `components/layout/Nav.jsx` — extract as-is
2. `components/home/Hero.jsx` — **copy verbatim, do not restyle**
3. `components/home/PanelStrip.jsx` — the 3 panels (these can later morph into the carousel / social-proof rows)
4. `components/ui/Button.jsx` — pull the "Explore Now" pill into one component that reads padding/radius/colour from tokens. Variants: `primary` (forest), `accent` (gold), `ghost`/underlined-link (the "Learn More" style).
5. `components/ui/Reveal.jsx` — a Framer Motion wrapper (`whileInView` fade+slide-up, ~24px, stagger option). Every new section gets wrapped in this → consistent scroll animation everywhere for free.
6. `components/ui/Section.jsx` — standard vertical rhythm/padding wrapper so spacing is uniform.

---

## Phase 2 — Global layout & routing

- Set up React Router with routes: `/`, `/products`, `/products/:slug`, `/about`, `/cart` (cart can also be a drawer overlay — see Phase 7).
- `Nav`: add the real menu (About · Products · Promotions · Contact from your screenshot), sticky-on-scroll behaviour (shrinks / gains background), cart icon opens the drawer, search + account icons.
- `MobileMenu`: full-screen slide-in drawer (Framer Motion), same nav links.
- `Footer`: link columns + contact (info@s72strategic.com · +66-97-251-5911) + "Product of Mongolia" + social. Use the landscape logo lockup.
- `NewsletterSignup`: email field with incentive ("10% off first order") — this is your soft-conversion list-builder while the brand is new.

---

## Phase 3 — Home (remaining sections)

Build in order, each wrapped in `<Reveal>`, each matching the hero's type/colour:

1. **Product carousel** (`ProductCarousel`) — Embla, drag/swipe, your product cards, dot indicators. Seed's "Whole body health starts in the gut" row.
2. **Technology explainer** (`TechnologyExplainer`) — Steppe Gut's version of Seed's ViaCap block: fermentation science / gut–skin story, sourced actives (Vitamin C · Omega-3 · Fermented Mare's Milk). **MVP:** a sticky-image + scrolling-copy layout with Framer. **Advanced:** GSAP ScrollTrigger pin+scrub later.
3. **Closing CTA bookend** (`ClosingCTA`) — full-bleed steppe/equine image, big EB Garamond line ("Natural Radiance from within"), single CTA to Shop.

---

## Phase 4 — Shop `/products`

- **Product data file** `src/data/products.js` — hardcoded (no backend). One object per product: `slug, name, format, price, shortBenefit, longDesc, ingredients, images[], badge`.
- Your **3 products** replace Seed's DS-01/DM-02/Duo slots. Suggested set (confirm which you want):
  1. **Fermented Mare's Milk — 25-Sachet Box (250 g)** — hero SKU
  2. **Fermented Mare's Milk — Stand-up Pouch (250 g)** — value/bulk
  3. **Capsules (90)** — convenience format
- `ShopHero` — banner over the grid ("Whole Body Health…" → your equivalent).
- `ProductCard` — image, name, one-line benefit, price, `Add To Cart` + `Learn More` (routes to detail). Hover lift. **This is the reusable card used on Home's carousel too.**
- `ProductGrid` — 3-up responsive grid.

---

## Phase 5 — Product detail `/products/:slug`

Reads from `products.js` by slug. Sections (each `<Reveal>`):

1. **Buy box / hero** — gallery (left) + name/price/actives/quantity/`Add To Cart` (right). Include a one-time vs. subscribe toggle *visually* even if not wired.
2. **Benefit / lifestyle block** — "Feel the difference…" outcome imagery + gut–skin narrative.
3. **Delivery science** — fermentation / how it works / how to take it (sachet → 100 ml water → drink).
4. **Ingredients / actives** — the full panel from your brand doc (Vitamin C, Omega-3, Lactoferrin, etc.) + "Contains milk" allergen.
5. **Comparison table** — Steppe Gut vs. ordinary supplements.

---

## Phase 6 — About `/about` (Sustainability + SeedLabs merged, Mongolia-forward)

This is where you push provenance hard.

1. **Origin hero** — the Mongolian steppe; headline on heritage; **Mongolian flag** used here (e.g. beside "Product of Mongolia" or a "Made in Mongolia" seal).
2. **Sourcing story** — locally sourced fermented mare's milk, the steppe, nomadic tradition; a map pin on Mongolia; manufactured by Monsubi Foods LLC.
3. **Our approach / science** — SeedLabs-style cards reframed to *your* research/ingredient story (fermentation, actives, gut–skin).
4. **Sustainability & values** — packaging, ethos, the "complete cycle of wellness" from the logo symbolism.
5. **Closing bookend** — brand CTA back to Shop.

---

## Phase 7 — Cart / Checkout (frontend shell only)

- **Cart state** via a React context (`CartProvider`) in browser memory — add/remove/qty, subtotal.
- **CartDrawer** — Framer Motion slide-in from right; line items, subtotal, "Checkout" CTA.
- **Checkout** — contact + shipping form (UI only, no submission).
- **Payment** — placeholder step; leave clear hooks/comments for PromptPay · bank transfer · Stripe later.
- **Order confirmation** — thank-you screen.

> Backend (real payments, order storage, email) is deliberately out of scope now. The shell lets the whole site look finished; wire payments once the frontend is signed off.

---

## Reusable animation patterns (build once, use everywhere)

| Behaviour | Tool | Where |
|---|---|---|
| Smooth scroll | Lenis (global, in App) | whole site |
| Section reveal (fade + slide-up, stagger) | Framer Motion `<Reveal>` | every section |
| Sticky header shrink | Framer / scroll listener | Nav |
| Swipe/drag carousel | Embla | Home carousel, Shop |
| Count-up stat ("+14K") | Framer + IntersectionObserver | social proof panel |
| Drawer slide-in | Framer Motion | MobileMenu, CartDrawer |
| Hover lift / underline | Tailwind + Framer | cards, buttons |
| Pinned scroll explainer | GSAP ScrollTrigger *(optional)* | Technology explainer |

---

## Suggested file structure

```
src/
  main.jsx
  App.jsx                 # Router + Lenis + CartProvider
  index.css               # @config, fonts, base
  design-tokens.js        # (extend in Phase 0)
  data/products.js
  lib/cart.jsx            # CartProvider/context
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

## Copy-paste prompts for Claude Code (run in this order)

1. *"Extend `design-tokens.js` with a spacing scale (4–128px), 3 shadow depths, radius (6/12/20/999), and an EB Garamond heading scale (h1 clamp(40px,6vw,88px) → h4). Wire them all into `tailwind.config.js`. Then confirm `bg-forest`, `text-gold`, `shadow-md`, and `text-h1` render correctly."*
2. *"Load EB Garamond (400/600/700) and Inter (400/600/700) from Google Fonts and set `font-serif`/`font-sans` defaults."*
3. *"Install and set up react-router-dom, framer-motion, lenis, and embla-carousel-react. Add Lenis smooth scroll globally in App.jsx and routes for /, /products, /products/:slug, /about, /cart."*
4. *"Refactor App.jsx: extract Nav, Hero (verbatim), and PanelStrip into components. Don't change the hero's styling."*
5. *"Create a Button component (primary/accent/ghost variants) reading padding/radius/colour from tokens, and a Reveal wrapper using Framer Motion whileInView fade + 24px slide-up with optional stagger."*
6. *"Build the sticky Nav (About/Products/Promotions/Contact + search/cart/account icons, shrink on scroll) and a full-screen MobileMenu drawer."*
7. Then one prompt per section, Home → Shop → Product → About → Cart, **pasting the matching Seed reference screenshot each time** and saying "match this layout/motion, Steppe Gut brand."

---

## Before you start — 3 things to lock

1. **Confirm the 3 shop products** (names/formats/prices) so `products.js` is right first time.
2. **CLAUDE.md:** add a short repo file stating brand, stack, tokens, and "keep the hero untouched; every section matches it" — keeps every session consistent.
3. **One section per prompt**, review in the browser after each, so styling never drifts.
