# 01 — Navigation

> **Rescoped 2026-08-07.** The site is now 7 pages, not 56. The mega-menu, three-level submenu and dedicated search overlay specified below were built for a much deeper site and are **over-built for the current scope** — do not implement them as-is.
>
> **Simplified nav for the 7-page site:**
> `Products` · `Ingredients & Sourcing` · `Social` · `Contact` — plus a cart icon. No dropdown/mega-menu needed; every item is a single top-level link. Logo links home. Keep the sticky-pin header behaviour, the skip link, and the footer structure from the sections below — those still apply. Ignore §3 (mega-menu), the "All" submenu convention in §1, and any reference to Our Story / Science / Wellbeing / FAQ nav items.
>
> The rest of this document (header structure, mobile menu mechanics, footer, sticky behaviour) is kept as reference for those still-relevant mechanics — read it with the simplified 4-item nav in mind, not the 6-item mega-menu it was written for.

Global chrome: header, mobile menu, footer. Present on every route except `/checkout/` (which uses a reduced header — see §8).

---

## 1. Why the navigation is shaped this way (legacy rationale — original 6-item nav)

The reference analysis showed a consistent and deliberate pattern in mature category-education brands: **commerce gets one nav slot, education gets four.** Products, Our Story, Science, Lifestyle, FAQ, Buy. Six items. The buy link sits last and is visually differentiated, so it reads as the destination rather than the starting point.

That ordering is not cosmetic. A visitor who has never heard of fermented mare's milk cannot be sold to on arrival, and a nav that leads with "Shop" tells them they have already missed the explanation. Leading with Products (what it *is*) and then Our Story (where it comes from) lets the nav itself perform the first two steps of the seven-question journey in `SG-PROJECT_CONTEXT.md`.

Three further behaviours were adopted because they solve real problems for a deep site:

- **A three-level submenu** — needed because `/the-science/womens-guide/` has its own children. Without a third level, the life-stage pages are two clicks deep from anywhere and effectively invisible.
- **An "All" first item in every submenu** — the parent link is also the menu trigger, which on touch devices is ambiguous. An explicit "All" resolves it.
- **A persistent search** — a 100-URL site with 34 FAQ answers is unnavigable without it.

---

## 2. Header

### 2.1 Structure

```
<header>                                     role=banner, sticky top-0, z-60
  <a class="skip-link">                      visually hidden until focused → #main
  <div class="container flex h-[72px] items-center">
    ├── Logo (left)                          → /
    ├── <nav aria-label="Primary">           centred on ≥1280px
    │     └── 6 top-level items
    └── Utilities (right)                    search · account · cart
  </div>
</header>
```

### 2.2 Specification

| Property | Value |
|---|---|
| Position | `sticky top-0` — simple pin. No shrink-on-scroll, no hide-on-scroll-down |
| Height | 64px `<1024px` · 72px `≥1024px` |
| Background | `cream` (`#F5F1E9`) at scroll position 0; on scroll > 8px add `bg-cream/92 backdrop-blur-sm` and a 1px `forest/10` bottom border |
| Container | `max-w-[1280px]`, `px-5 md:px-8 lg:px-12` |
| Logo | Landscape lockup, Forest. Height 28px mobile / 34px desktop. `<a>` wraps it, `aria-label="Steppe Gut — home"` |
| Nav visibility | Full nav `≥1280px`. Below that, hamburger + mobile menu |
| Z-index | Header `z-60`; open mega-menu panel `z-70`; mobile menu overlay `z-[9999]` |

**Rationale for the plain pin:** `SG-PROJECT_SPEC.md` §9 already recommends it and flags shrink-on-scroll as an open decision. The reference site also uses a plain pin. Two independent signals agree; build the pin.

### 2.3 Primary nav items

| Order | Label (EN) | Label (TH) | Href | Has submenu |
|---|---|---|---|---|
| 1 | Products | ผลิตภัณฑ์ | `/products/` | yes |
| 2 | Our Story | เรื่องราวของเรา | `/our-story/` | yes |
| 3 | The Science | งานวิจัย | `/the-science/` | yes (3 levels) |
| 4 | Wellbeing | สุขภาวะ | `/wellbeing/` | yes |
| 5 | FAQ | คำถามที่พบบ่อย | `/faq/` | no |
| 6 | Buy | สั่งซื้อ | `/where-to-buy/` | no |

**Typography:** Inter 600, 14px, `letter-spacing: 0.02em`, `color: forest`. Gap between items: 32px.

**States:**
- Rest — `forest`
- Hover — `forest`, plus a 2px `gold` underline that animates in from the centre (`scaleX` 0→1, 180 ms, `ease-out`)
- Active route — `forest` with the 2px `gold` underline permanently shown, `aria-current="page"`
- Focus — 2px `forest` outline, 2px offset. Never `outline: none`

**"Buy" differentiation:** rendered as a `Button` variant `outline-forest`: 1px forest border, `rounded-full`, `px-5 py-2`, no underline behaviour. On hover it fills `forest` with `cream` text. This is the only nav item that looks like a control, which is what makes the other five read as navigation.

### 2.4 Utilities (right cluster)

| Item | Icon (Lucide) | Behaviour |
|---|---|---|
| Search | `search` | Opens `SearchOverlay` (§5) |
| Account | `user` | Links `/account/` — render only when auth exists; omit at launch rather than shipping a dead icon |
| Cart | `shopping-bag` | Opens `CartDrawer`. Badge with item count when > 0 |

Each is a 44 × 44px button (touch-target minimum) with an `aria-label`. Icon stroke 1.5px, 20px box, `forest`. Cart badge: 16px circle, `gold` background, `forest` text, Inter 700 at 10px, positioned top-right with `-translate-y-1 translate-x-1`.

> **Accessibility note carried from the reference audit:** the reference site ships its search and hamburger as buttons with no accessible name, and its social links as anchors with no text and no `aria-label` — 12 unnamed links on every page. Do not repeat this. Every icon-only control in Steppe Gut carries an `aria-label`.

---

## 3. Mega-menu (≥1280px)

### 3.1 Behaviour

- Opens on **hover** after a 120 ms intent delay, and on **focus** via keyboard, and on **click** (click toggles and pins it open).
- Closes on mouse-leave after 200 ms, on `Escape`, on click outside, and on route change.
- The panel is `position: absolute` anchored to its trigger's left edge minus 20px.
- Transition: opacity 0→1 and `translateY(-6px)→0` over 180 ms `ease-out`. Respect `prefers-reduced-motion` by dropping the translate and shortening to 80 ms.
- The whole submenu is inside the trigger's `<li>` so the hover region is continuous — no dead gap between trigger and panel.

### 3.2 Panel styling

| Property | Value |
|---|---|
| Width | 260px (level 2) · 260px (level 3) |
| Background | `#FFFDF9` (a half-step lighter than `cream`, so the panel separates from the header without a border) |
| Radius | 20px |
| Shadow | `0 18px 48px -12px rgba(47,62,47,0.18)` |
| Padding | `20px` |
| Item spacing | `space-y-2` |
| Item type | Inter 400, 15px, `forest`; hover → `sage`, plus 4px left-shift over 150 ms |

### 3.3 Contents

**Products**
| Label | Href |
|---|---|
| All Products | `/products/` |
| Daily Sachets | `/products/daily-sachets/` |
| Capsules | `/products/capsules/` |
| Refill Pouch | `/products/pouch/` |
| What's Inside | `/products/whats-inside/` |

**Our Story**
| Label | Href |
|---|---|
| All | `/our-story/` |
| The Steppe | `/our-story/the-steppe/` |
| How It's Made | `/our-story/how-its-made/` |
| Land & Herders | `/our-story/land-and-herders/` |
| Our Research | `/our-story/our-research/` |

**The Science** *(third level under "A Woman's Guide")*
| Label | Href | Level |
|---|---|---|
| All | `/the-science/` | 2 |
| Fermentation | `/the-science/fermentation/` | 2 |
| The Microbiome | `/the-science/the-microbiome/` | 2 |
| Digestion & Absorption | `/the-science/digestion-and-absorption/` | 2 |
| The Gut–Skin Axis | `/the-science/the-gut-skin-axis/` | 2 |
| A Woman's Guide ▸ | `/the-science/womens-guide/` | 2, has children |
| — Your Monthly Cycle | `/the-science/womens-guide/monthly-cycle/` | 3 |
| — Perimenopause | `/the-science/womens-guide/perimenopause/` | 3 |
| — Menopause | `/the-science/womens-guide/menopause/` | 3 |

Level-3 panel: `absolute left-[250px] top-[-20px]`, same styling as level 2, opens on hover/focus of its parent item, with a `chevron-right` affordance at 16px in `sage`.

**Wellbeing**
| Label | Href |
|---|---|
| All | `/wellbeing/` |
| Nourish | `/wellbeing/nourish/` |
| Rest | `/wellbeing/rest/` |
| Movement | `/wellbeing/movement/` |
| Calm | `/wellbeing/calm/` |
| Ritual | `/wellbeing/ritual/` |
| Ways to Take It | `/rituals/` |
| Nutrients | `/wellbeing/nutrients/` |

### 3.4 Keyboard model

`Tab` moves between top-level items. `Enter`/`Space` on a trigger opens its panel and moves focus to the first item. `ArrowDown`/`ArrowUp` move within a panel. `ArrowRight` on an item with children opens the level-3 panel; `ArrowLeft` closes it and returns focus. `Escape` closes all panels and returns focus to the trigger. Triggers carry `aria-expanded` and `aria-haspopup="true"`; panels are `role="menu"` with `role="menuitem"` children.

---

## 4. Mobile menu (<1280px)

Full-screen overlay, not a partial drawer — the menu has 30+ destinations and a partial drawer forces scrolling inside a scroll.

| Property | Value |
|---|---|
| Trigger | Hamburger, left of logo, 44 × 44px, `aria-label="Open menu"` / `"Close menu"`, `aria-expanded` |
| Overlay | `fixed inset-0 z-[9999] overflow-y-auto bg-cream` |
| Entrance | Slide in from the left, 260 ms `cubic-bezier(0.22,1,0.36,1)`; reduced-motion → fade only, 120 ms |
| Header inside overlay | Same 64px bar: close button (`x`) left, logo centre |
| Nav type | Inter 600, 20px, `forest`, `space-y-4`, `px-5 py-12` |
| Submenu pattern | **Push-panel, not accordion.** Tapping a parent slides the child list in from the right and slides the parent list out to the left. A "← Back" row returns |
| Why push-panel | With three menu levels, nested accordions produce indentation the width of a phone cannot carry, and lose the user's place. A push stack keeps every level full-width and legible |
| Focus trap | Focus is trapped inside the overlay while open; `Escape` closes; body scroll locked (`overflow: hidden` on `<html>`) |
| Bottom of overlay | Search field, then social icon row, then the Buy button, full-width |

---

## 5. Search overlay

| Property | Value |
|---|---|
| Trigger | Header search icon, or `/` key when no input is focused |
| Layout | Full-width sheet dropping from beneath the header, `fixed inset-x-0 top-[72px] bottom-0 z-[1000] bg-cream/98 backdrop-blur` |
| Input | Centred, `max-w-[560px]`, 20px Inter 400, bottom-bordered 1px `forest/25`, no box. Placeholder: `Search Steppe Gut` / `ค้นหา` |
| Behaviour | Debounced 200 ms, client-side index over page title + intro + FAQ question text |
| Results | Grouped by section (Products · Science · Wellbeing · FAQ · Story). Each result: eyebrow (section, Inter 600 11px `sage` uppercase, 0.08em), title (EB Garamond 20px `forest`), one-line excerpt (Inter 15px `forest/70`) |
| Empty state | "No results for '<query>'. Try *fermentation*, *sachet*, or *how to take it*." Plus links to `/faq/` and `/products/` |
| A11y | `role="dialog" aria-modal="true" aria-label="Search"`. Focus moves to the input on open, returns to the trigger on close. Results list is `role="listbox"`, live-region announces result count |

---

## 6. Social rail

A fixed vertical strip of social links pinned to the left edge at `top-[35vh]`, shown `≥768px` only.

| Property | Value |
|---|---|
| Container | `fixed left-0 top-[35vh] z-40 rounded-r-2xl bg-[#FFFDF9] p-3 space-y-3 shadow-[0_8px_28px_-10px_rgba(47,62,47,0.22)]` |
| Icons | 20px Lucide, `forest`; hover → `gold`, 150 ms |
| Links | Instagram, Facebook, LINE, YouTube |
| Each link | `aria-label="Steppe Gut on Instagram"` etc., `target="_blank" rel="noopener noreferrer"` |

**Judgement call:** the reference site duplicates this rail into the footer as well. Do the same — the rail is hidden on mobile, so the footer copy is the only social access on phones. It is not redundant.

---

## 7. Footer

### 7.1 Structure

```
<footer role="contentinfo">
  ├── Band A — Newsletter          bg cream, forest text
  ├── Band B — Link columns        bg forest, cream text
  └── Band C — Legal strip         bg forest, cream/70 text, 1px cream/15 top border
```

### 7.2 Band A — Newsletter

| Property | Value |
|---|---|
| Background | `cream` |
| Padding | `py-16 lg:py-24` |
| Layout | Centred, `max-w-[560px] mx-auto text-center` |
| Heading | EB Garamond 400, 32px / 40px `forest` |
| Body | Inter 400, 16px / 26px `forest/75` |
| Form | Single email input + submit, inline `≥640px`, stacked below |
| Input | `h-12`, 1px `forest/25` border, `rounded-full`, `px-5`, Inter 16px. Focus → `forest` border + 2px `gold/40` ring |
| Button | `Button` variant `solid-forest`, `rounded-full`, `px-7 h-12` |
| Consent | 12px Inter `forest/60` below, linking `/legal/privacy/` |

**Copy:**
> **Heading:** Letters from the steppe
> **Body:** Once a month, we write about fermentation, the herders we work with, and what the research is showing. No offers, no urgency — just what we're learning.
> **Placeholder:** Your email address
> **Button:** Subscribe
> **Consent line:** We'll only email you about Steppe Gut. Unsubscribe any time. Read our [Privacy Policy](/legal/privacy/).

**Accessibility:** the input has a real `<label>` (visually hidden), not a placeholder standing in for one. Success and error states announce via `aria-live="polite"`.

### 7.3 Band B — Link columns

Four columns `≥1024px`; two `≥640px`; one below.

| Column | Items |
|---|---|
| **Products** | Daily Sachets · Capsules · Refill Pouch · What's Inside · Where to Buy |
| **Learn** | How It Works · The Science · A Woman's Guide · Wellbeing · Ways to Take It · Journal |
| **Company** | Our Story · The Steppe · Land & Herders · Our Research · Careers · Press |
| **Support** | FAQ · Contact · Trade & Stockists · Delivery & Returns · Sitemap |

| Property | Value |
|---|---|
| Background | `forest` |
| Padding | `pt-16 pb-12 lg:pt-24` |
| Column heading | Inter 600, 12px, `letter-spacing 0.1em`, uppercase, `gold` |
| Links | Inter 400, 15px / 30px, `cream/85`; hover → `cream` + 2px `gold` underline |
| Above the columns | Landscape logo in cream, 30px tall, then the social icon row (`cream/85`, hover `gold`) |

### 7.4 Band C — Legal strip

| Property | Value |
|---|---|
| Layout | `flex flex-wrap justify-between items-center gap-4`, `py-6` |
| Left | © 2026 S72 Strategic Co., Ltd. All rights reserved. |
| Right | Terms · Privacy · Cookies · Promotion Terms |
| Type | Inter 400, 12px, `cream/65`; hover → `cream` |
| Below both | A single line, Inter 400 12px `cream/50`: "Product of Mongolia. Imported and distributed in Thailand by YFamily Co., Ltd." |

**Why the provenance line sits in the footer:** it appears on every page without ever being a marketing claim. It is the quietest possible way to keep Mongolia present sitewide, which is exactly what `SG-PROJECT_CONTEXT.md` asks for.

### 7.5 Regulatory disclosure block

Directly above Band C, full-width, `text-[11px] leading-[18px] text-cream/50 max-w-[880px]`:

> This product is a dietary supplement and is not intended to diagnose, treat, cure or prevent any disease. It should not be used as a substitute for a varied and balanced diet. Contains milk. Thai FDA registration is in progress; registration details will be published here on completion.

This block is **mandatory on every page**. It is not optional copy — see `02_brand_guidelines.md` §6.

---

## 8. Reduced header on `/checkout/`

Checkout drops the nav, search and social rail to remove exit paths. It keeps:
- The logo (linking to `/`, so the user is never trapped)
- A single line of reassurance to the right: `Secure checkout` with a `lock` icon, Inter 14px `forest/70`
- The footer reduces to Band C only

---

## 9. Breadcrumbs

Rendered on every page at depth ≥ 2 (all `/the-science/*`, `/our-story/*`, `/wellbeing/*`, `/products/:slug`, `/faq/:slug`, `/rituals/:slug`, `/journal/:slug`).

| Property | Value |
|---|---|
| Placement | Directly above the page `<h1>`, inside the page-header container |
| Markup | `<nav aria-label="Breadcrumb"><ol>` with the last item `aria-current="page"` |
| Type | Inter 400, 13px, `forest/60`; links hover → `forest` |
| Separator | `/` in `forest/30`, `aria-hidden="true"` |
| Structured data | Emit `BreadcrumbList` JSON-LD alongside |

The reference site omits breadcrumbs entirely, which is a real weakness on a site three levels deep — a visitor landing on a life-stage article from search has no way to discover the guide above it. Add them.

---

## 10. Global behaviours

| Behaviour | Rule |
|---|---|
| Skip link | First focusable element in the DOM. `Skip to main content` → `#main`. Visually hidden until focused, then pinned top-left with a `forest` background and `cream` text |
| Landmark roles | Exactly one `<header role="banner">`, one `<nav aria-label="Primary">`, one `<main id="main">`, one `<footer role="contentinfo">` per page |
| Route change | Focus moves to `<h1>` (which has `tabindex="-1"`); an `aria-live="polite"` region announces the new page title; scroll resets to top |
| Active-state source of truth | Derived from the route, not from click handlers, so a hard page load also shows the correct active item |
| Scroll lock | Applied on `<html>` when the mobile menu, search overlay or cart drawer is open |
| Reduced motion | Every transition above degrades to opacity-only at ≤ 120 ms |
