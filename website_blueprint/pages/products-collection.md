# Page — Products `/products/`

## Summary

A three-product collection page for a brand with one formula. The page's real job is not to display a catalogue — with three SKUs there is barely a catalogue to display — but to **help the visitor choose a format without feeling sold to**, and to reassure them that the choice is low-stakes because the formula is identical in all three.

The reference site's equivalent page was studied and one structural decision is worth carrying: it puts **product cards near the top and then keeps explaining underneath them**. The grid is short; the education below it is long. That ratio is right for an unfamiliar category, and it is what separates this page from a shop grid.

## Purpose

- **Website goals served:** product understanding, education, conversion
- **Journey questions:** 1 (what is this?), 6 (why is it different?), 7 (why buy?)
- **Audience:** a visitor who has decided Steppe Gut is worth considering and wants to know what buying it looks like
- **User intent:** "Which one do I get, and what's the difference?"
- **Primary CTA:** *Read the details* on each card → PDP
- **Secondary CTA:** *See what's inside* → `/products/whats-inside/`

## Layout specification

| Property | Value |
|---|---|
| Background | `cream` |
| Header | `PageHeader align="center"` inside `container-content` |
| Grid | `CardGrid columns={3}`, `gap-6 lg:gap-8` |
| Section rhythm | `section-gap` throughout |
| Below the grid | Three explanatory sections, then FAQ, then closing CTA |

## Section order and rationale

| # | Section | Why it exists |
|---|---|---|
| 1 | Page header | States plainly that the formula is one formula. Removes the fear of choosing wrong before the grid is even seen |
| 2 | Product grid | The three formats, priced, with equal visual weight. No "most popular" flag — that is a pressure device |
| 3 | Choosing guide | A short comparison for people who still aren't sure. This is the section that actually converts |
| 4 | What's in all three | Shared composition, stated once. Prevents three PDPs having to repeat it and prevents the visitor thinking the formats differ |
| 5 | How to take it | Removes the last practical unknown: *what do I actually do with this?* |
| 6 | Common questions | Objection handling, four items, at the point of decision |
| 7 | Closing CTA | Single ask |

---

# Sections

## 1. Page header

**Component:** `PageHeader align="center"` with breadcrumbs `Home / Products`

> **Eyebrow:** Products
> **Title (h1):** One formula, three formats
> **Lead:** The powder is the same in every pack we make — the same milk, from the same season, fermented the same way. What changes is how you take it, and how often you want to think about it.

## 2. Product grid

**Component:** `CardGrid columns={3}` rendering `ProductCard`

| Property | Value |
|---|---|
| Columns | 1 < 640px · 2 at `sm` · 3 at `lg` |
| Card image | 4:5, shared sandstone-and-green set |
| Order | Daily Sachets, Capsules, Refill Pouch |
| No badges | No "bestseller", no "new", no "limited" |

### Copy

| Product | Eyebrow | Descriptor | Price | CTA |
|---|---|---|---|---|
| Daily Sachets | 25 × 10 g · 25 days | The standard format. One sachet stirred into 100 ml of water, once a day. | ฿— | Read the details |
| Capsules | 90 capsules · 90 days | The same powder in capsule form, for travel or if you would rather not taste it. | ฿— | Read the details |
| Refill Pouch | 250 g pouch · 25 servings | Loose powder with a scoop. For people already in the habit and using less packaging. | ฿— | Read the details |

> **Prices are unlocked at time of writing.** `SG-PROJECT_SPEC.md` §16 flags SKU pricing as an open decision that must be resolved before this page is built. Do not invent placeholder prices in production — either the real price ships or the price element is omitted and the CTA reads "Read the details".

### IMAGE PLACEHOLDERS — P-1a, P-1b, P-1c

**Reuse:** `product-sachets` and `product-capsules` already exist in `src/assets/home/`. Reuse them here — do not regenerate. `product-pouch` was generated for the Home rail (H-4c); reuse that too.

**Save to:** `src/assets/products/` — or, better, move all three to `src/assets/shared/products/` and reference from both Home and this page. **One copy of each product image on the whole site.**

## 3. Choosing guide

**Component:** `ComparisonTable`

**Why it exists:** three near-identical options create decision paralysis. A short factual table resolves it in ten seconds and, because it compares Steppe Gut only to itself, carries no competitive-claim risk.

| | Daily Sachets | Capsules | Refill Pouch |
|---|---|---|---|
| Servings per pack | 25 | 90 | 25 |
| Serving size | 10 g | 3 capsules | 10 g (one scoop) |
| Taste | Mild, slightly sour | None | Mild, slightly sour |
| Best for | Starting out | Travel, or avoiding the taste | Established routine |
| Packaging per serving | Individual sachet | None | None |
| Needs water | Yes, 100 ml | No | Yes, 100 ml |

> **Copy above the table:** If you have not taken it before, start with the sachets. They are portioned, they travel, and twenty-five mornings is long enough to know whether it suits you. Everything else is a preference.

## 4. What's in all three

**Component:** `MediaTextRow` (image left) + `Button link-arrow`

> **Eyebrow:** Composition
> **Heading:** The same milk in every pack
> **Body:**
> Fermented mare's milk powder, with the lactose, whey and casein proteins, milk fat and fatty acids that survive fermentation. Alongside them: vitamin C, vitamin A, vitamins B1, B2 and B12, calcium, phosphorus, iron, lactoferrin and lysozyme — all of them present in the milk itself rather than added afterwards.
>
> The full list, with quantities per serving and per 100 g, is on one page.
>
> **CTA:** See what's inside → `/products/whats-inside/`

**Below the row, a `BadgeRow`:** Product of Mongolia · Naturally fermented · Contains milk · No added sugar

### IMAGE PLACEHOLDER — P-2

**Purpose:** Show the powder itself as the shared substance across all three formats.
**Aspect ratio:** 3:2 · **Display size:** 1200 × 800 · **Loading:** lazy
**Save to:** `src/assets/products/powder-detail.{avif,webp}`
**Suggested composition:** An open sachet lying on its side, powder drifting out across dark green stone in a soft sculptural ridge. Subject lower-left, upper-right open.
**Alt text:** `An opened sachet with fine ivory powder spilling across a dark green stone surface.`

```
higgsfield product-photoshoot create --mode conceptual_product \
  --prompt "open cream supplement sachet lying on its side with fine ivory powder spilling in a soft sculptural drift across a deep forest-green stone surface, macro detail, warm golden side light raking across the powder texture, premium scientific editorial still life, subtle film grain" \
  --image src/sachets-cutout.png --aspect_ratio 3:2
```

## 5. How to take it

**Component:** `ProcessSteps` with 3 steps, images optional (icons are sufficient here)

> **Heading:** How to take it
> **Sub:** It takes about thirty seconds.

| Step | Title | Body |
|---|---|---|
| One | Tear the sachet | Along the notch at the top. The powder is fine and settles quickly. |
| Two | Add 100 ml of cool water | Cool or room temperature. Hot water is not harmful, but it changes the taste for the worse. |
| Three | Stir and drink | Within a minute or two, before it settles. Most people take it before breakfast, though the time of day matters less than doing it at the same time each day. |

**Note below:** For capsules: three with water, once a day. For the pouch: one level scoop, the same as one sachet.

## 6. Common questions

**Component:** `Accordion`, 4 items, each with a "Read the full answer" link to `/faq/:slug/`

| Question | Answer (short) |
|---|---|
| Does it taste like milk? | It tastes faintly sour and slightly savoury, closer to plain yoghurt than to milk. In water it is mild. Most people stop noticing it within a week. |
| Is it suitable if I am lactose intolerant? | Fermentation breaks down most of the lactose, but not all of it, and the product contains milk. If you react to yoghurt, you may react to this. Speak to your doctor first. |
| How long until I notice anything? | We are not going to give you a number. Nutritional intake works on the scale of weeks and months, and anyone promising a date is guessing. Take it daily and judge for yourself. |
| Is it registered with the Thai FDA? | Registration is in progress. We will publish the registration details on this site as soon as they are issued, and we are not going to claim it is complete before it is. |

> **Claim check:** answers 3 and 4 deliberately decline to overclaim. This is the honest-limits principle from `02_brand_guidelines.md` §6.3 applied at the point of sale, and it is the most persuasive thing on the page.

## 7. Closing CTA

**Component:** `ClosingCTA` — reuses `src/assets/shared/closing-bookend.*`

> **Heading:** Twenty-five mornings
> **Body:** Long enough to know whether it belongs in your routine.
> **Primary:** See the Daily Sachets → `/products/daily-sachets/`
> **Secondary:** Read the science first → `/the-science/`

---

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| < 640px | Grid 1 column. Comparison table scrolls horizontally inside its own wrapper with the first column sticky. `ProcessSteps` fully stacked |
| 640–1023px | Grid 2 columns — **the third card sits alone on row 2, centred.** Do not stretch it to full width |
| ≥ 1024px | Grid 3 columns. `MediaTextRow` side-by-side. Comparison table fits without scroll |
| ≥ 1280px | Container caps at 1280px |

## Accessibility notes

- `<h1>` is "One formula, three formats". Product names in the grid are `<h3>`
- The grid is `<ul>`/`<li>`; each card is a single `<a>` wrapping its content, so there is one tab stop per product, not three
- The comparison table is a real `<table>` with `<caption>` (visually hidden: "Comparison of the three Steppe Gut formats") and `scope` attributes
- The table's horizontal scroll container is `tabindex="0"` with `role="region"` and an accessible name, so keyboard users can scroll it
- `ProcessSteps` renders an `<ol>`; the step numerals are decorative and `aria-hidden`, with the real ordinal in the heading text
- Accordion triggers are `<button>` inside `<h3>`, with `aria-expanded` and `aria-controls`
- Price is never conveyed by colour or position alone

## SEO notes

| Element | Value |
|---|---|
| `<title>` | Products — Steppe Gut Fermented Mare's Milk |
| Meta description | Three formats of the same fermented mare's milk powder: 25-day sachet boxes, 90-count capsules, and a 250 g refill pouch. Full composition and how to take it. |
| `<h1>` | One formula, three formats |
| JSON-LD | `ItemList` of three `Product` entities, each with `name`, `image`, `description`, `brand`, `offers` (only once prices are real — **do not emit `offers` with a placeholder price**) |
| Breadcrumb JSON-LD | Home → Products |
| Internal links | 3 PDPs, `/products/whats-inside/`, `/the-science/`, `/faq/` ×4 |

## Developer notes

- Route `/products/`, lazy-loaded
- Data source: `src/data/products.js` — the single source of truth for name, slug, format, servings, serving size, price, descriptor, image path, and the shared composition object. **Both this page and all three PDPs read from it.** No product string is hard-coded in a component
- `ProductCard` is first built here and retrofitted into the Home rail (see `home.md` developer notes)
- `ComparisonTable` is first built here and reused on each PDP
- The `BadgeRow` set is shared with the PDPs — define it once in `products.js` as `sharedBadges`
- Omit the price element entirely rather than rendering `฿—` in production
