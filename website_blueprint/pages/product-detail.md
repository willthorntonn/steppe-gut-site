# Template — Product Detail `/products/:slug/`

Covers all three SKUs: `daily-sachets`, `capsules`, `pouch`. **One template, three data records.** Nothing SKU-specific is hard-coded in a component; everything varies through `src/data/products.js`.

## Summary

The highest-value page on the site and the only one that has to convert. Its structure is taken from a pattern that recurs across every mature site in this category and which the reference analysis confirmed in detail: **a compact buy box at the top, then a long descending sequence of reasons to believe, ending in objection handling.** The visitor who is already convinced buys in the first screen. The visitor who is not gets eleven sections to become convinced, in roughly the order their doubts arrive.

## Purpose

- **Website goals served:** conversion, product understanding, trust, education
- **Journey questions:** 1, 3, 5, 6, 7 — this page answers five of the seven
- **Audience:** high-intent. Either ready to buy, or one unanswered question away from it
- **User intent:** "Convince me, and then let me buy it without friction"
- **Primary CTA:** Add to basket (buy box, then sticky bar)
- **Secondary CTA:** *How it works* → `/how-it-works/`

## Layout specification

| Property | Value |
|---|---|
| Background | `cream` |
| Buy box container | `container` 1280px, `pt-8 lg:pt-12` |
| Section rhythm | `section-gap` throughout; `section-gap-lg` before the closing CTA |
| Sticky bar | Appears once the buy box leaves the viewport |
| Breadcrumbs | Home / Products / *product name* |

## Section order and rationale

| # | Section | Component | Doubt it answers |
|---|---|---|---|
| 1 | Buy box | `BuyBox` | "What is it, what's in it, what does it cost, how do I get it" |
| 2 | Badge row | `BadgeRow` | "Is it what it says it is?" |
| 3 | What it is | `MediaTextRow` | "I still don't really know what fermented mare's milk *is*" |
| 4 | How it works | `MediaTextRow` reversed | "Why would this do anything?" |
| 5 | What's inside | `NutritionPanel` | "Show me the actual numbers" |
| 6 | Where it comes from | Full-bleed chapter | "Who made this and can I trust them?" |
| 7 | How to take it | `ProcessSteps` | "What do I actually do with it?" |
| 8 | Why it's different | `ComparisonTable` | "How is this different from a probiotic capsule?" |
| 9 | Honest limits | `HonestLimits` | "Are you overselling this?" |
| 10 | Common questions | `Accordion` | Everything remaining |
| 11 | The other formats | `CrossSellPair` | "Is a different pack better for me?" |
| 12 | Closing CTA | `ClosingCTA` | The final ask |

The ordering is not arbitrary. Sections 3–5 are rational, 6 is emotional, 7 is practical, 8–10 are defensive. A visitor who bounces at any point has still received a complete argument up to that point.

---

# Sections

## 1. Buy box

**Component:** `BuyBox`. Full spec in `05_component_library.md` §22.

| Property | Value |
|---|---|
| < 1024px | Image full-width, card below overlapping by −40px |
| ≥ 1024px | Image left ~56%, card right ~44%, vertically centred, overlapping the image edge by 48px |
| Card | `cream-raised`, `radius-lg`, `p-8 lg:p-10`, `shadow-lg` |

**Content order inside the card:** format eyebrow → `<h1>` → price → 2-sentence paragraph → 4 bullets → quantity stepper → Add to basket → reassurance line → allergen line.

### Copy — Daily Sachets

> **Eyebrow:** 25 × 10 g sachets · 25 days
> **H1:** Daily Sachets
> **Paragraph:** Fermented mare's milk from the Mongolian steppe, dried into a fine powder and portioned into single sachets. One a day, stirred into a glass of water.
> **Bullets:**
> - 10 g of fermented mare's milk powder per sachet
> - Naturally occurring vitamin C, omega-3, lactoferrin and B vitamins
> - Nothing added after fermentation
> - Product of Mongolia
>
> **CTA:** Add to basket
> **Reassurance:** Delivered in 2–4 working days across Thailand. Unopened boxes can be returned within 14 days.
> **Allergen:** Contains milk.

### Copy — Capsules

> **Eyebrow:** 90 capsules · 30 days
> **H1:** Capsules
> **Paragraph:** The same fermented mare's milk powder, encapsulated. Three capsules once a day, with water. For travel, or for anyone who would rather skip the taste.
> **Bullets:**
> - Three capsules match one 10 g sachet
> - Naturally occurring vitamin C, omega-3, lactoferrin and B vitamins
> - Nothing added after fermentation
> - Product of Mongolia
>
> **CTA:** Add to basket
> **Reassurance:** Delivered in 2–4 working days across Thailand. Unopened bottles can be returned within 14 days.
> **Allergen:** Contains milk.

### Copy — Refill Pouch

> **Eyebrow:** 250 g pouch · 25 servings
> **H1:** Refill Pouch
> **Paragraph:** Loose powder with a measuring scoop, in a resealable pouch. The same formula as the sachets with less packaging per serving.
> **Bullets:**
> - One level scoop equals one 10 g sachet
> - Naturally occurring vitamin C, omega-3, lactoferrin and B vitamins
> - Nothing added after fermentation
> - Product of Mongolia
>
> **CTA:** Add to basket
> **Reassurance:** Delivered in 2–4 working days across Thailand. Unopened pouches can be returned within 14 days.
> **Allergen:** Contains milk. Reseal after each use and keep dry.

### IMAGE PLACEHOLDER — P-3 (one per SKU)

**Purpose:** The single most important commercial image on the site. Must show the actual pack, accurately, at a size where the label is legible.
**Aspect ratio:** 4:5 (generate 3:4, crop in CSS) · **Display size:** 900 × 1125 · **Loading:** **eager**, `fetchpriority="high"` — this is the LCP element
**Save to:** `src/assets/products/<slug>-hero.{avif,webp}`
**Suggested composition:** Pack at three-quarter angle on the shared sandstone plinth, deep forest-green backdrop, single warm side light. Pack weighted **left of centre**, right 40% clean, because the buy box overlaps from the right on desktop.
**Alt text:** `A box of twenty-five Steppe Gut daily sachets standing on a sandstone surface.` *(varied per SKU)*

> **Mandatory:** pass the real pack cutout as `--image`. Generated packaging invents its own label microcopy — net weights, counts and claims that do not match the real pack. On a PDP where the label is legible, that is a regulatory problem, not a cosmetic one. See `04_image_prompt_guidelines.md` §9.

**Higgsfield prompt (Daily Sachets):**
```
higgsfield product-photoshoot create --mode product_shot \
  --prompt "premium fermented mare's milk supplement sachet box at a three-quarter angle on a rough sandstone plinth, positioned left of centre with clean empty space to the right, deep forest-green seamless backdrop, single warm golden side light from the left, calm luxury editorial catalog shot, subtle film grain" \
  --image src/hero-product-box.png --aspect_ratio 3:4
```

**Higgsfield prompt (Capsules):**
```
higgsfield product-photoshoot create --mode product_shot \
  --prompt "dark forest-green glass supplement jar with brushed gold lid and minimal cream label, a few ivory capsules resting beside it on rough sandstone, jar positioned left of centre with clean empty space to the right, deep forest-green backdrop, single warm golden side light from the left, premium editorial catalog shot, subtle film grain" \
  --aspect_ratio 3:4
```

**Higgsfield prompt (Refill Pouch):**
```
higgsfield product-photoshoot create --mode product_shot \
  --prompt "premium cream stand-up supplement pouch standing upright on a rough sandstone plinth with a small steel measuring scoop resting beside it, pouch positioned left of centre with clean empty space to the right, deep forest-green seamless backdrop, single warm golden side light from the left, calm luxury editorial catalog shot, subtle film grain" \
  --image src/hero-product-box.png --aspect_ratio 3:4
```

## 2. Badge row

**Component:** `BadgeRow`, 4 items, baseline-aligned (never staggered — see `05_component_library.md` §23)

Product of Mongolia · Naturally fermented · Contains milk · No added sugar

Icons: `map-pin` · `flask-conical` · `milk` · `minus-circle`. Each 24px, `forest`, in a 48px `sage-tint` circle, `aria-hidden` with the label carrying the meaning.

## 3. What it is

**Component:** `MediaTextRow`, image left

> **Eyebrow:** What it is
> **Heading:** Mare's milk, changed by fermentation
> **Body:**
> Mare's milk is not like cow's milk. It has more lactose, less fat, and a protein profile closer to human milk than to dairy. On the steppe it has been fermented for centuries because fresh, it spoils in hours — and because fermented, it keeps, and it sits more easily.
>
> Left with its own cultures for four days, the milk changes. Lactose is broken down. Proteins are partly unfolded. What comes out is a thinner, faintly sour liquid, which we then dry at low temperature into the powder in this pack.
>
> **CTA:** How fermentation works → `/the-science/fermentation/`

**Image:** reuse `src/assets/home/what-it-is.*` (H-3). Do not regenerate.

## 4. How it works

**Component:** `MediaTextRow`, image right

> **Eyebrow:** How it works
> **Heading:** Fermentation does some of the work first
> **Body:**
> Digestion is a disassembly process. Fermentation carries out part of that disassembly before the food reaches you — breaking lactose down into simpler sugars and loosening the structure of the proteins.
>
> The practical consequence is that several of the nutrients naturally present in mare's milk — vitamin C, omega-3 fatty acids, lactoferrin, calcium, iron and a set of B vitamins — arrive in a form the body has less work to do with.
>
> **CTA:** Read how it works → `/how-it-works/`

**Image:** reuse `src/assets/home/how-it-works.*` (H-5). Do not regenerate.

> **Claim check:** every sentence here is Tier A (composition) or Tier B (general mechanism, attributed to fermentation and to the nutrients, not to Steppe Gut). No outcome is promised. Compliant with `02_brand_guidelines.md` §6.

## 5. What's inside

**Component:** `NutritionPanel` + full ingredient list + allergen statement

| Property | Value |
|---|---|
| Container | `container-narrow` 520px |
| Panel | `cream-sunk`, `radius-xl`, `p-6 lg:p-8` |
| ≥ 768px | Both columns shown |
| < 768px | Segmented toggle between "per serving" and "per 100 g" |

**Heading:** What's in a serving
**Sub:** Per 10 g sachet, and per 100 g of powder. *(Varied per SKU: "Per 3 capsules" / "Per level scoop".)*

**Rows (values to be populated from the finished nutrition panel — see the on-pack fields still to complete in `BRAND_GUIDELINES.md` §8):**

energy · fat *(of which saturates)* · carbohydrate *(of which sugars)* · protein · salt · calcium · phosphorus · iron · vitamin A · vitamin B1 · vitamin B2 · vitamin B12 · vitamin C

**Below the panel:**

> **Ingredients:** Fermented mare's milk powder, lactose, whey protein, casein protein, milk fat, omega-3 fatty acids, omega-6 fatty acids, vitamin C (ascorbic acid), vitamin A (retinol), vitamin B1 (thiamine), vitamin B2 (riboflavin), vitamin B12 (cyanocobalamin), calcium, phosphorus, sodium, iron, lactoferrin, lysozyme.
>
> **Allergen:** Contains milk.
>
> **Origin:** Product of Mongolia. Manufactured by Monsubi Foods LLC.
>
> **CTA:** Compare all three formats → `/products/whats-inside/`

> **Open item flagged for the implementer:** `BRAND_GUIDELINES.md` §8 records that the powder panel prints a serving size of 1 scoop (0.5 g) with 90 servings, which does not reconcile against a 250 g net weight or against the 10 g sachet. **This must be resolved with the client before this section ships.** Do not publish a nutrition panel with unreconciled serving figures — it is the fastest way to lose the trust the whole site is built to earn.

## 6. Where it comes from

**Component:** `Section bleed size="lg"` — full-bleed chapter, same treatment as `home.md` §6

> **Eyebrow:** Töv Province, Mongolia
> **Heading:** Milked between June and October
> **Body:** Mares only give milk for part of the year. Every pack we make comes from that window, from families we buy from directly, on open grassland.
> **CTA:** Where it comes from → `/our-story/`

**Image:** reuse `src/assets/home/steppe-chapter.*` (H-6). Do not regenerate.

## 7. How to take it

**Component:** `ProcessSteps`, 3 steps, icon-led (no images required)

Copy per SKU — see `products-collection.md` §5 for the sachet version; capsules and pouch use the variants noted there.

**Below the steps, a short note:**
> Take it at the same time each day. Consistency matters more than the hour. If you miss a day, take the next one as normal — there is nothing to catch up on.

## 8. Why it's different

**Component:** `ComparisonTable`

**Category-level only. Never competitor-named.**

| | Fermented mare's milk | Fresh dairy milk | Isolated probiotic capsule |
|---|---|---|---|
| Lactose | Largely broken down by fermentation | Present in full | Not applicable |
| Nutrients | Naturally present in the milk | Naturally present in the milk | Added, in isolation |
| Protein structure | Partly unfolded by fermentation | Intact | Not applicable |
| Origin | Single-region, seasonal | Varies | Manufactured |
| Preparation | Fermented four days, then dried | None | Manufactured |

**Caption below:** This compares categories of product, not brands. Which is right for you depends on what you are trying to do.

## 9. Honest limits

**Component:** `HonestLimits`

> **Heading:** What we don't know yet
>
> Research into fermented mare's milk is limited. Most published studies are small, many are conducted outside the countries where it is traditionally consumed, and few of them look at the specific outcomes people ask us about — skin, energy, digestion over months rather than weeks.
>
> We can tell you what is in this powder, how it was made, and what the individual nutrients in it are generally understood to do. We cannot tell you what it will do for you specifically, and we are not going to pretend otherwise.
>
> Thai FDA registration is in progress. We will publish the details here the day they are issued.

## 10. Common questions

**Component:** `Accordion`, grouped by `FilterTabs` into three categories: **Taking it** · **Suitability** · **Ingredients**. 10–12 items. Each links to its full `/faq/:slug/` answer.

Use the SKU-relevant subset from the master FAQ set in `faq-hub.md`.

## 11. The other formats

**Component:** `CrossSellPair` — the two SKUs that are not this page.

> **Heading:** The other two formats
> **Sub:** Same powder, different pack.

## 12. Closing CTA

**Component:** `ClosingCTA`, shared bookend image

> **Heading:** One sachet, tomorrow morning
> **Body:** Twenty-five days is long enough to know.
> **Primary:** Add to basket *(scrolls back to the buy box on mobile; adds directly on desktop)*
> **Secondary:** Read the research → `/the-science/`

---

## Sticky buy bar

**Component:** `StickyBuyBar`. Appears once the `BuyBox` leaves the viewport, via IntersectionObserver on the buy box itself — not a scroll-position threshold, which breaks at different viewport heights.

Contents: 40px thumbnail · product name · price · Add to basket. On mobile, price and button only. `aria-hidden="true"` while hidden.

---

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| 360–767px | Buy box stacks: image full-bleed edge-to-edge, card below overlapping −40px with 20px side margins. Nutrition panel uses the segmented toggle. Comparison table scrolls with a sticky first column. Sticky bar shows price + button only |
| 768–1023px | Media rows go side-by-side. Badge row 4-across. Buy box still stacked — 768px is not wide enough for a card overlapping an image without one of them becoming unreadable |
| ≥ 1024px | Buy box splits into two columns with the overlap. Nutrition panel shows both columns and the toggle disappears. `CrossSellPair` goes horizontal |
| ≥ 1280px | Container caps |

## Accessibility notes

- One `<h1>`: the product name. Section headings `<h2>`, accordion questions `<h3>`
- The hero image is the LCP element and must carry explicit `width`/`height`
- The quantity stepper: two `<button>`s with `aria-label="Decrease quantity"` / `"Increase quantity"`, a `<label>`ed numeric input between them, and an `aria-live="polite"` region announcing the new value
- Add to basket announces success via `aria-live` — never rely on the cart badge alone, which is off-screen for a screen-reader user
- The nutrition table is a real `<table>` with `<caption>` and `scope`. The mobile toggle is a proper tab/tabpanel pair; the hidden column is removed with `hidden`, not `display:none` on a cell, so the table's structure stays valid
- The comparison table's icon marks (`check` / `minus`) each carry visually-hidden text — the table must not be icon-only
- The sticky bar is `aria-hidden` while off-screen so its Add-to-basket button is not announced twice
- Allergen text is never inside a collapsed accordion. It is always visible
- Focus is never trapped by the sticky bar; it appears late in the tab order, after the main content

## SEO notes

| Element | Value |
|---|---|
| `<title>` | Daily Sachets — Fermented Mare's Milk · Steppe Gut *(varied per SKU)* |
| Meta description | 25 sachets of fermented mare's milk powder from Mongolia. Full ingredients, nutrition per serving, and how to take it. *(varied)* |
| `<h1>` | The product name |
| Canonical | Self, per SKU. **No duplicate content between SKUs** — sections 3, 4 and 6 share copy across the three pages, which is acceptable, but sections 1, 5, 7, 8 and 10 must differ meaningfully or the three pages will compete |
| JSON-LD | `Product` with `name`, `image`, `description`, `sku`, `brand`, `countryOfOrigin: MN`, `nutrition` (`NutritionInformation`), and `offers` with `priceCurrency: THB`, `availability`. **Omit `aggregateRating` and `review` entirely** — there are none, and fabricating them is both dishonest and a search-policy violation |
| Breadcrumb JSON-LD | Home → Products → *product* |
| Internal links | `/how-it-works/`, `/the-science/fermentation/`, `/our-story/`, `/products/whats-inside/`, 2 sibling PDPs, 10+ FAQ answers |

## Developer notes

- Route `/products/:slug`, lazy-loaded. Slugs: `daily-sachets`, `capsules`, `pouch`. Unknown slug → 404, not a blank render
- **Everything varies through `src/data/products.js`.** The record shape:
  ```js
  { slug, name, format, servings, servingSize, price, currency,
    heroImage, alt, paragraph, bullets[], allergen, reassurance,
    nutrition: { rows[], units[], servingNote },
    ingredients, howToTake[], faqSlugs[], crossSell[] }
  ```
- Sections 3, 4 and 6 are shared content rendered from a `sharedProductContent` object, not duplicated per record
- Images reused from Home (`what-it-is`, `how-it-works`, `steppe-chapter`, `closing-bookend`) are imported from `src/assets/shared/` — move them there when this page is built, and update the Home imports in the same commit
- `BuyBox`, `BadgeRow`, `NutritionPanel`, `ComparisonTable`, `StickyBuyBar`, `CrossSellPair` and `HonestLimits` are all first built here. `Accordion` too. Budget accordingly — this is the heaviest single stage in the build
- Cart state via `CartProvider` (Stage 8). Until it exists, Add to basket is a disabled button with a visible "Coming soon" note — **not** a button that silently does nothing
- Do not ship the nutrition panel until the serving-size reconciliation flagged in §5 is resolved
