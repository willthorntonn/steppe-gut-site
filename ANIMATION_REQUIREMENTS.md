# Animation Requirements

Combines the animation patterns already scoped for Steppe Gut with patterns observed live on seed.com (a comparable DTC supplement/wellness brand), for reference when building out motion beyond the hero.

---

## 1. Steppe Gut — already scoped (from PROJECT_SPEC.md / BUILD_PLAN.md)

**Shipped today (hero, no library yet):**
- Staggered word-reveal headline animation
- Fade / slide / scale-in keyframes, hand-rolled CSS (predates the Framer Motion install)

**Planned stack:** Framer Motion (installed, not yet wired in) · Lenis (smooth scroll) · Embla (carousel) · GSAP ScrollTrigger (optional, pinned scroll explainer only)

**Reusable pattern table (target state):**

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

`components/ui/Reveal.jsx` is the intended single wrapper: Framer Motion `whileInView`, fade + ~24px slide-up, with a stagger option — every new section should be wrapped in it rather than hand-rolling per-section keyframes.

---

## 2. Observed on seed.com

Live inspection of seed.com (Next.js/React, styled-components) surfaced these patterns:

- **Sticky header, no visible shrink on scroll** — `position: sticky; top: 8px; z-index: 10`. Simpler than our planned "shrink/gain background" nav — just stays pinned near the top rather than resizing.
- **JS-driven motion, not CSS transitions** — computed styles on nav links, CTA buttons, and cards showed `transition: none` at rest. Hover/interaction motion is handled by direct style manipulation (an animation library tweening via rAF) rather than declarative CSS transitions — worth deciding intentionally rather than defaulting to Tailwind's `transition-*` utilities everywhere.
- **Full-bleed video backgrounds inside content sections** (e.g. behind the product carousel), not just the hero — motion/ambience continues past the top fold.
- **Product card grid/carousel** (`ProductCarousel` → `ProductGridContainer` → `Card`) — cards as link elements, structured for hover-state elevation/interaction (consistent with our "hover lift" row in the table above).
- **Promo modal on load** — a "Claim your %off" modal slides/fades in shortly after first paint, dismissible, layered above a cookie-consent banner. If Steppe Gut adds a similar incentive modal, sequence it so it doesn't stack awkwardly with cookie/consent UI.
- **Anchor/CTA banner strip** above the header ("Find the right products for you →") — persistent top strip, separate from the sticky nav below it.

---

## 3. Combined recommendations

- Keep `Reveal.jsx` (Framer Motion, `whileInView`, fade + 24px slide-up, stagger) as the one scroll-reveal primitive — seed.com's sections don't show CSS-transition scroll reveals either, so a JS-driven `whileInView` approach is consistent with the reference site's actual behavior.
- For hover states (cards, buttons), decide explicitly between Tailwind CSS transitions (simpler, matches current codebase) vs. Framer Motion `whileHover` (matches seed.com's JS-driven approach) — don't mix both on the same element.
- Sticky nav: a plain `position: sticky` pin (seed.com's approach) is simpler than the shrink-on-scroll behavior currently scoped in BUILD_PLAN.md Phase 2 — worth confirming shrink is still wanted before building it.
- If a background video is added to any non-hero section later, treat it like seed.com does: muted, looping, decorative only, never load-bearing for content (must degrade to a static image/poster).
- Count-up stat, drawer slide-in, and carousel drag remain as scoped — no conflicting pattern observed on seed.com that would change those.
