# 05 — Component Library

> **Rescoped 2026-08-07.** The site is now 7 pages (Home, Products, Product Detail, Ingredients & Sourcing, Social, Cart/Checkout, Contact), not 56. Most primitives, page furniture, content and product components below are still needed. **Not needed for the current scope:** `Breadcrumbs` (the site is flat, no 3-level hierarchy), `FilterTabs` (was for FAQ/journal filtering), `TabbedPanel` (was for ritual ingredient/method switcher), `CardRail` (was for cross-hub article rails — may still be useful for Social). `FeaturedStoryCard`, `ProcessSteps`, `StatBand`, `HonestLimits` and `Figure` are still useful on the Ingredients & Sourcing page (process steps, honest-limits framing) — keep them. Skip anything else below that only makes sense in service of a deleted page (FAQ accordion patterns tied to 34-question sets, journal/press-specific patterns, etc.) — use judgement per component, the descriptions below still apply where relevant.

Every page in `pages/` is assembled from the components below. **Nothing else is invented per page.** If a page appears to need something new, first check whether an existing component with a new prop would do — it almost always will.

The structural analysis of the reference site found that 168 URLs were built from roughly 20 layout primitives, and that a single alternating image⇄text row carried the majority of all content sections. That is the ratio to aim for.

---

## Index

**Primitives** — 1 Section · 2 Container · 3 Prose · 4 Button · 5 Reveal · 6 Eyebrow
**Page furniture** — 7 PageHeader · 8 Breadcrumbs · 9 ClosingCTA
**Content** — 10 MediaTextRow · 11 FeaturedStoryCard · 12 PullQuote · 13 ProcessSteps · 14 TipList · 15 StatBand · 16 Figure · 17 HonestLimits
**Collections** — 18 CardRail · 19 CardGrid · 20 ContentCard · 21 ProductCard
**Product** — 22 BuyBox · 23 BadgeRow · 24 NutritionPanel · 25 ComparisonTable · 26 CrossSellPair · 27 StickyBuyBar
**Interactive** — 28 Accordion · 29 FilterTabs · 30 TabbedPanel · 31 Drawer
**Forms** — 32 Field · 33 NewsletterSignup · 34 ContactPanel

---

# Primitives

## 1. `Section`

Owns all vertical rhythm. **No page section sets its own top margin.**

```jsx
<Section size="default|lg|sm" bg="cream|forest|sage-tint|none" bleed={false} id?>
```

| Prop | Effect |
|---|---|
| `size` | Applies `section-gap` / `section-gap-lg` / `section-gap-sm` from `03_design_system.md` §3.2 as top padding |
| `bg` | Background colour; when not `cream`, also applies matching text colours |
| `bleed` | When true, the section spans `100vw` and places its own inner `Container` |
| `id` | Anchor target for in-page nav |

Renders `<section>`. If the section has a heading, that heading is the section's accessible name via `aria-labelledby`.

## 2. `Container`

```jsx
<Container width="default|wide|content|prose|narrow">
```

Max-widths per `03_design_system.md` §4, `mx-auto`, responsive horizontal padding per §3.3.

## 3. `Prose`

Wraps rich text (CMS or MDX body copy) and applies the typographic scale to bare HTML.

- `body-lg` base, `68ch` measure (`72ch` when `long`)
- `h2` → `h2` token with `section-gap-sm` above, `block-gap` below
- `h3` → `h3` token
- `p + p` → 20px gap
- `ul`/`ol` → 24px indent, 10px item gap, custom marker: a 4px `gold` square for `ul`, `forest` numerals for `ol`
- `a` → `forest`, 1px `gold` underline at 40% opacity, full opacity on hover
- `strong` → Inter 600, not 700 (700 is too loud in this palette)
- `blockquote` → renders as `PullQuote`
- `table` → `border-subtle` rows, `cream-sunk` header, horizontally scrollable inside `overflow-x-auto`

## 4. `Button`

```jsx
<Button variant="solid-forest|outline-forest|ghost|link-arrow|solid-cream"
        size="default|lg" as="button|a" href? disabled? loading? iconRight?>
```

Full spec in `03_design_system.md` §14. Renders `<a>` when `href` is given, never a `<div>` with a click handler. `loading` shows a spinner, sets `aria-busy`, and keeps the label visible (never a label swap — the width shift is a layout bug).

## 5. `Reveal`

The **only** scroll-animation primitive on the site.

```jsx
<Reveal delay={0} stagger={false} as="div">
```

Framer Motion `whileInView`, `once: true`, `viewport={{ margin: "-80px" }}`, opacity 0→1 + `y: 24→0`, 600 ms, `[0.22,1,0.36,1]`. With `stagger`, children animate at `staggerChildren: 0.08`.

**Under `prefers-reduced-motion`, content renders immediately at full opacity with no transform.** Content must never be hidden behind a reveal that doesn't fire.

## 6. `Eyebrow`

Small uppercase label above a heading. Inter 600, `eyebrow` token, `sage` on light / `gold` on `forest`, 0.1em tracking, 12px below.

Renders a `<p>`, never a heading element — it is not part of the document outline.

**Never uppercase-transformed in Thai** (`03_design_system.md` §9).

---

# Page furniture

## 7. `PageHeader`

The standard top of every page except Home and PDP.

```jsx
<PageHeader eyebrow? title lead? align="left|center" breadcrumbs? />
```

| Element | Spec |
|---|---|
| Container | `Container width="content"`, `pt-12 lg:pt-20` |
| Breadcrumbs | Above title, per `01_navigation.md` §9 |
| Eyebrow | Optional |
| Title | `<h1>`, `h1` token, `text-wrap: balance`, `tabindex="-1"` (route-change focus target) |
| Lead | `body-lg`, `text-secondary`, `max-w-prose-measure`, 20px below title |
| Alignment | `center` for hubs and utility pages; `left` for articles |

## 8. `Breadcrumbs`

```jsx
<Breadcrumbs items={[{label, href}, …]} />
```

`<nav aria-label="Breadcrumb"><ol>`, last item `aria-current="page"` and not a link. Emits `BreadcrumbList` JSON-LD. Separator `/` is `aria-hidden`.

## 9. `ClosingCTA`

The bookend that ends most pages. Full-bleed image, one line, one button.

```jsx
<ClosingCTA image heading body? primary={{label, href}} secondary?/>
```

| Property | Value |
|---|---|
| Layout | `Section size="lg" bleed`, min-height `520px` mobile / `640px` desktop |
| Image | Full-bleed `object-cover`, `forest` gradient overlay per `03_design_system.md` §12 |
| Content | Centred, `max-w-[620px]`, upper-third vertical position |
| Heading | `display-2`, `cream` |
| Body | `body-lg`, `text-on-dark-muted`, max 2 lines |
| Primary | `Button solid-cream` |
| Secondary | `Button` `link-arrow` in `cream` |

**Reuses one shared image sitewide** (the steppe rider bookend) rather than a new asset per page. This is deliberate — a repeated closing image is a signature, not a shortcut.

---

# Content

## 10. `MediaTextRow`

**The workhorse.** The single most-used component on the site. Half of all content sections are this.

```jsx
<MediaTextRow image reverse={false} eyebrow? heading body cta? imageRatio="3:2"/>
```

| Property | Value |
|---|---|
| Container | `Container` (default 1280px) |
| Layout < 768px | Stacked: image first, then text, 32px gap |
| Layout ≥ 768px | `flex items-center`, each half `w-1/2`, 48px gap (`lg:` 64px) |
| `reverse` | Swaps order via `order-1`/`order-2` — **do not swap the DOM order**, so reading order stays image→text at every width |
| Image | `radius-lg`, `object-cover`, ratio per prop |
| Heading | `<h2>`, `h2` token |
| Body | `Prose`, `body-lg`, max `52ch` (narrower than full prose measure, because it sits in a half-column) |
| CTA | `Button link-arrow`, 24px below body |

**Alternate `reverse` down the page.** Three consecutive rows in the same orientation read as a template; alternating reads as a rhythm. This alternation is the single cheapest thing that makes a long page feel designed.

## 11. `FeaturedStoryCard`

A full-width image card that promotes one destination more loudly than a `MediaTextRow`.

```jsx
<FeaturedStoryCard image badge? eyebrow title href />
```

| Property | Value |
|---|---|
| Container | `Container width="content"`, `position: relative` |
| Image | 16:9, `radius-lg` |
| Badge | Optional circular label overlapping the top-left corner: 64px mobile / 112px desktop, `gold-tint` fill, `forest` text, positioned `top-[-45px] left-6` / `md:top-[-70px] md:left-28`, `z-30` |
| Eyebrow | Centred below image, `sage` |
| Title | Centred, `h3` token, `max-w-[60%] mx-auto` |
| Whole card | One `<a>` wrapping everything; image scales `1.03` on hover over 400 ms |

Use at most **one per page**. Its value is that it is the loudest thing on the page.

## 12. `PullQuote`

```jsx
<PullQuote>text</PullQuote>
```

`Container width="content"`, centred, `max-w-[840px]`, `display-2` in EB Garamond 400, `forest`, `section-gap-sm` above and below. No quotation marks, no attribution glyphs, no decorative marks. A thin 1px `gold` rule 32px above, `w-16 mx-auto`.

Used to break long reading stretches. **Maximum two per page.**

## 13. `ProcessSteps`

Numbered narrative for "how it's made" and mechanism explanations.

```jsx
<ProcessSteps steps={[{n, title, body, image}, …]} />
```

| Property | Value |
|---|---|
| Layout | Each step is a `MediaTextRow` with an added numeral |
| Numeral | EB Garamond 400 at `display-1` size in `gold`, sitting above the eyebrow at 30% opacity — decorative scale, `aria-hidden`, because the real number is in the heading text |
| Heading | `<h3>`, prefixed in text: "One — Milking" |
| Connector | A 1px `gold/30` vertical rule between steps on `≥1024px`, in the gutter |
| Semantics | Renders an `<ol>` |

## 14. `TipList`

Short, scannable practical advice. The main body component of `/wellbeing/*`.

```jsx
<TipList items={[{title, body, icon?}, …]} columns={1|2} />
```

Each item: `cream-raised` card, `radius-md`, `p-6`, `border-subtle`. Icon 24px `sage` top-left. Title `h4`. Body `body`, `text-secondary`. `gap-4`.

## 15. `StatBand`

```jsx
<StatBand stats={[{value, label, note?}, …]} bg="forest|sage-tint" countUp={true} />
```

2 columns mobile, 3–4 desktop. Value: `display-2` EB Garamond in `gold` (on `forest`) or `forest` (on `sage-tint`). Label: `body-sm` below. Optional footnote in `caption`.

Count-up animation via Framer `useMotionValue`, triggered by `Reveal`, ~1.2 s. **Disabled under `prefers-reduced-motion` — the final value renders immediately.**

> **Claim discipline:** stats here are compositional or provenance facts only (grams, days of fermentation, months of the milking season, number of herding families). Never an efficacy percentage. See `02_brand_guidelines.md` §6.

## 16. `Figure`

Image plus caption inside prose.

```jsx
<Figure image alt caption? credit? width="prose|content|wide" />
```

`<figure>` + `<figcaption>`. Caption `caption` token, `text-tertiary`, 12px below, left-aligned to the image. `radius-md`.

## 17. `HonestLimits`

**Required at the foot of every science page.** See `02_brand_guidelines.md` §6.3.

```jsx
<HonestLimits>{children}</HonestLimits>
```

| Property | Value |
|---|---|
| Container | `Container width="prose"` |
| Panel | `sage-tint` background, `radius-lg`, `p-8 lg:p-10` |
| Heading | `<h2>` — "What we don't know yet", `h3` token |
| Body | `body`, `text-secondary`, 2–4 short sentences |
| Icon | None. No warning triangle — this is confidence, not a caveat |

Identical styling on every page it appears. Consistency is what makes it read as a principle rather than a disclaimer.

---

# Collections

## 18. `CardRail`

Horizontally scrolling card row that bleeds past the container edge, so a partially visible card signals scrollability without needing arrows.

```jsx
<CardRail heading? viewAll? items renderItem />
```

| Property | Value |
|---|---|
| Heading | Inside `Container`, `h2` |
| Track | Breaks the container to the right edge; first card aligns to the container's left padding |
| Card width | 280px mobile · 320px desktop, 16px gap |
| Scroll | Native `overflow-x-auto` + `scroll-snap-type: x mandatory`, snap-align start. Scrollbar hidden |
| Arrows | Shown `≥1024px` only, 40px circular `outline-forest`, disabled at each end with `aria-disabled` |
| A11y | The track is `tabindex="0"` with `role="region" aria-label="<heading>, scrollable"`; arrow keys scroll by one card |
| "View all" | `link-arrow` right-aligned beside the heading |

Preferred over a carousel library wherever autoplay isn't needed. If drag-with-momentum is wanted, use Embla with `dragFree: false` — but native scroll is the default because it is free, accessible and keyboard-native.

## 19. `CardGrid`

```jsx
<CardGrid columns={2|3|4} items renderItem />
```

1 column < 640px · 2 at `sm` · specified count at `lg`. `gap-6 lg:gap-8`. Renders `<ul>`/`<li>`.

## 20. `ContentCard`

The generic card used in rails and grids for articles, science pages, wellbeing pillars, rituals.

```jsx
<ContentCard image alt eyebrow title excerpt? href meta? />
```

| Element | Spec |
|---|---|
| Wrapper | `<a>` covering the whole card, `radius-md`, `overflow-hidden`, `cream-raised`, `border-subtle` |
| Image | 3:2, `object-cover`; scales `1.04` on hover, 500 ms |
| Body | `p-5` |
| Eyebrow | `sage` |
| Title | `<h3>`, `h4` token, 2-line clamp |
| Excerpt | `body-sm`, `text-secondary`, 2-line clamp |
| Meta | `caption`, `text-tertiary` (e.g. "5 min read", "2 minutes to make") |
| Hover | `shadow-md`, title gains a 1px `gold` underline |
| Focus | Ring on the card, not the inner image |

## 21. `ProductCard`

```jsx
<ProductCard product variant="grid|rail" />
```

| Element | Spec |
|---|---|
| Image | 4:5, product on the shared sandstone-and-green set |
| Format label | `Eyebrow`, e.g. "25 × 10 g sachets" |
| Name | `<h3>`, `h3` token |
| One-line descriptor | `body-sm`, `text-secondary` |
| Price | `body-lg` Inter 600 |
| CTA | `Button outline-forest` full width — "Read the details", **not** "Add to basket". The card links to the PDP; adding to basket from a grid skips the education step this brand depends on |

---

# Product

## 22. `BuyBox`

The PDP hero. A raised card overlapping the product photograph.

```jsx
<BuyBox product />
```

| Element | Spec |
|---|---|
| Layout < 1024px | Image full-width, card below overlapping it by −40px |
| Layout ≥ 1024px | Two columns: image left ~56%, card right ~44%, card vertically centred and overlapping the image's right edge by 48px |
| Card | `cream-raised`, `radius-lg`, `p-8 lg:p-10`, `shadow-lg` |
| Order | Eyebrow (format) → `<h1>` → price → short paragraph → 4-bullet fact list → quantity stepper → primary CTA → reassurance line → allergen line |
| Bullets | 4 maximum. Compositional facts only. 4px `gold` square markers |
| Quantity | −/+ stepper, 44px targets, `aria-label="Quantity"`, live region announces changes |
| Primary CTA | `Button solid-forest`, **full width**, "Add to basket" |
| Reassurance | `caption`, `text-tertiary`, below the CTA: delivery timing and returns. Not a badge row — one quiet line |
| Allergen | `body-sm`, `text-secondary`: "Contains milk." Always visible, never inside an accordion |

## 23. `BadgeRow`

Row of 3–4 attribute badges below the buy box.

```jsx
<BadgeRow items={[{icon, label}, …]} />
```

`Container width="content"`, `grid grid-cols-2 md:grid-cols-4`, `gap-4`. Each: 48px `sage-tint` circle with a 24px `forest` Lucide icon, label below in `body-sm` centred.

> The reference site staggers these badges vertically (`top-[40px]`, `top-[-20px]`) for a hand-placed feel. **Do not copy that.** It is charming in a playful brand and reads as misalignment in a restrained one. Steppe Gut aligns them on a baseline.

Standard set: Product of Mongolia · Naturally fermented · Contains milk · No added sugar *(only where true for the SKU)*.

## 24. `NutritionPanel`

```jsx
<NutritionPanel rows units={["per serving","per 100 g"]} servingNote />
```

| Property | Value |
|---|---|
| Container | `Container width="narrow"` (520px) |
| Panel | `cream-sunk`, `radius-xl`, `p-6 lg:p-8` |
| ≥ 768px | Both unit columns shown side by side |
| < 768px | A 2-option segmented toggle switches which column is displayed. `role="tablist"`, panels `role="tabpanel"` |
| Rows | Label left, values right-aligned in fixed 120px columns. 24px row gap. "of which…" rows indent 16px and drop to `text-secondary` |
| Header | Unit labels in `eyebrow`, `text-tertiary` |
| Below panel | Serving-size note in `caption`, then the full ingredient list in `body-sm` |
| Markup | A real `<table>` with `<caption>`, `scope="col"`/`scope="row"`. The mobile toggle hides a column visually; it does not remove it from the accessibility tree in a way that breaks the table |

## 25. `ComparisonTable`

Steppe Gut vs. conventional alternatives.

| Property | Value |
|---|---|
| Container | `Container width="content"` |
| Markup | Real `<table>`, `overflow-x-auto` wrapper so it never causes page-level horizontal scroll |
| Header row | `forest` background, `cream` text, sticky on scroll within the wrapper |
| First column | Sticky left on mobile |
| Cells | `body-sm`, 16px padding, `border-subtle` between rows |
| Marks | `check` / `minus` Lucide icons, each with visually-hidden text ("Yes" / "No") so the table is not icon-only |
| Steppe Gut column | 1px `gold` left and right border and a `gold-tint` header cell — never a full gold fill |

> Comparison content is factual and category-level ("fermented dairy" vs "non-fermented"), never competitor-named and never framed as superiority. See `02_brand_guidelines.md` §6.

## 26. `CrossSellPair`

Two sibling-product cards at the foot of a PDP.

`Container width="content"`, `flex-col lg:flex-row gap-4`. Each card: `min-h-[240px]`, `radius-md`, `cream-raised`, `border-subtle`, product image right, name + one-line descriptor left, whole card an `<a>`.

## 27. `StickyBuyBar`

Appears on PDP once the `BuyBox` scrolls out of view.

| Property | Value |
|---|---|
| Position | `fixed bottom-0 inset-x-0 z-50`, `cream-raised`, `shadow-lg`, `border-t border-subtle`, `py-3` |
| Contents | 40px product thumbnail · name · price · `Button solid-forest` "Add to basket" |
| Mobile | Thumbnail and name hidden; price + button only |
| Entrance | Slide up 220 ms; instant under reduced motion |
| Trigger | IntersectionObserver on the `BuyBox`, not a scroll-position threshold |
| A11y | `aria-hidden="true"` while off-screen so it is not double-announced |

---

# Interactive

## 28. `Accordion`

```jsx
<Accordion items={[{id, question, answer, href?}, …]} allowMultiple={false} />
```

| Property | Value |
|---|---|
| Container | `Container width="content"` |
| Item | 1px `gold` top border on the first, bottom border on each. No card, no fill |
| Trigger | Full-width `<button>`, `py-5`, `text-left`, `aria-expanded`, `aria-controls`. Question in `h4` token. `plus`/`minus` Lucide icon right, 20px, rotates 90° on open |
| Panel | `role="region" aria-labelledby="<trigger id>"`, `pb-8 px-0 lg:px-4`, `Prose` at `body` |
| Animation | 240 ms height + opacity; instant under reduced motion |
| Deep link | Each item's `id` is a URL fragment target; a matching hash opens that item and scrolls to it on load |
| "Read full answer" | Optional `link-arrow` at the foot of a panel → `/faq/:slug/` |
| Structured data | The FAQ hub emits `FAQPage` JSON-LD from the same data |

**Semantics matter here:** the trigger is a `<button>` inside an `<h3>`, not a clickable `<div>`. This is the single most commonly broken accessibility pattern on marketing sites.

## 29. `FilterTabs`

Category filter above a long accordion or grid.

```jsx
<FilterTabs categories active onChange />
```

Horizontal pill row, `overflow-x-auto` on mobile. Rest: `outline-forest`. Active: `solid-forest`. `role="tablist"` with `aria-selected`. Filtering is client-side, instant, and updates a `?category=` query param so a filtered view is linkable. An `aria-live="polite"` region announces the result count.

## 30. `TabbedPanel`

Two-panel switcher used for Ingredients / Method on ritual pages.

`h-12` container, `radius-md`, `cream-sunk`. Two equal halves; active half `solid-forest` with `radius-md`. `role="tablist"`, arrow-key navigation, `aria-controls`/`aria-labelledby` wired both ways.

**On `≥1024px` both panels display side by side and the tabs are hidden entirely** — tabs exist to save vertical space on small screens, and hiding half the content on a desktop where both fit is a needless interaction.

## 31. `Drawer`

Base for `MobileMenu` and `CartDrawer`.

`fixed inset-y-0` right (cart) or full-screen (menu), `z-[9999]`, `cream` background, `shadow-lg`. Backdrop `forest/40` with `backdrop-blur-sm`. Slide 260 ms `brand` easing. Focus trapped; `Escape` closes; focus returns to the trigger; body scroll locked; `role="dialog" aria-modal="true"` with an `aria-label`.

---

# Forms

## 32. `Field`

```jsx
<Field label name type required? help? error? autoComplete />
```

Full spec in `03_design_system.md` §13. Always renders a real `<label for>`. `aria-describedby` links help and error text. `aria-invalid` on error. Never a placeholder-as-label.

## 33. `NewsletterSignup`

Footer Band A. Spec and copy in `01_navigation.md` §7.2. Also embeddable at the foot of `/journal/` articles with `variant="inline"` (no background band, tighter padding).

## 34. `ContactPanel`

Two-column contact block: region/department name, phone, email, postal address.

`Container`, `lg:grid lg:grid-cols-2`, a 1px `border-subtle` vertical divider between columns on `≥1024px` and a horizontal one between stacked columns below. Heading `h3`. Details in `Prose` at `body`. Phone and email are real `tel:` and `mailto:` links, never plain text.

---

## Component reuse map

The components below must be built once and reused. Rebuilding any of them per page is a defect.

| Component | First built in stage | Reused on |
|---|---|---|
| `Section`, `Container`, `Prose`, `Button`, `Reveal`, `Eyebrow` | 0 | Everything |
| `Header`, `Footer`, `MobileMenu`, `SearchOverlay`, `NewsletterSignup`, `Breadcrumbs` | 1 | Every page |
| `MediaTextRow` | 2 (Home) | Home, all science, all wellbeing, our story, PDP, hubs |
| `CardRail`, `ContentCard` | 2 (Home) | Home, all hubs, all article feet, rituals |
| `ClosingCTA` | 2 (Home) | Home, our story, science hub, wellbeing hub, PDP |
| `PullQuote`, `StatBand` | 2 (Home) | Story, science, wellbeing |
| `ProductCard` | 3 (Products) | Products grid, Home rail, cross-sell |
| `BuyBox`, `BadgeRow`, `NutritionPanel`, `StickyBuyBar` | 3 (PDP) | All 3 PDPs, What's Inside |
| `Accordion` | 3 (PDP) | PDP, FAQ hub, Contact, Delivery |
| `ProcessSteps` | 4 (How It Works) | How It Works, How It's Made |
| `HonestLimits` | 4 (Science) | Every science page, Our Research |
| `TrustBadgeRow` (= `BadgeRow`) | 3 | PDP, Our Story, Home |
| `TipList` | 6 (Wellbeing) | All wellbeing pillars, rituals, FAQ |
| `FilterTabs` | 7 (FAQ) | FAQ hub, Journal index, Rituals |
