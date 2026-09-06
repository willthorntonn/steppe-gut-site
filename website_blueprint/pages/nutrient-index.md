# Page — Nutrients `/wellbeing/nutrients/`

## Summary

An index of six short nutrient explainers. Low-effort to build, disproportionately valuable for search, and structurally important: it is where the site converts "our product contains vitamin C" into something a reader can actually check.

The reference site maintains a set of single-nutrient pages of exactly this kind, and they are among its highest-traffic educational URLs. The pattern works because nutrient queries are high-volume, evergreen and easy to answer honestly.

## Purpose

- **Goals:** education, trust
- **Journey questions:** 1, 5
- **Audience:** search arrivals, and readers checking a claim made elsewhere on the site
- **Intent:** "What is this thing and what does it do?"
- **Primary CTA:** an individual nutrient page
- **Secondary CTA:** *What's inside* → `/products/whats-inside/`

## Layout

| Property | Value |
|---|---|
| Header | `PageHeader align="center"` |
| Body | `container-content` 940px |
| Rhythm | `section-gap` |
| Page length | Short. This is an index, not an article |

## Section order

| # | Section | Component |
|---|---|---|
| 1 | Header | `PageHeader` |
| 2 | How to read these pages | `Prose`, 2 short paragraphs |
| 3 | The six nutrients | `CardGrid columns={3}` of `ContentCard` |
| 4 | Where they come from in Steppe Gut | `MediaTextRow` |
| 5 | Honest limits | `HonestLimits` |
| 6 | Closing CTA | `ClosingCTA` |

---

# Copy

## 1. Page header

> **Eyebrow:** Wellbeing
> **Title (h1):** Nutrients
> **Lead:** Six of the nutrients naturally present in mare's milk, each explained in a page you can read in two minutes. What it is, what it is generally understood to contribute to, and where else you can get it.

## 2. How to read these pages

> **Body:**
> Everything on these pages is a statement about the **nutrient**, not about Steppe Gut. "Vitamin C contributes to normal collagen formation" is a well-established statement about vitamin C, and it remains true whether you get it from an orange, a tablet or a sachet of fermented mare's milk.
>
> We keep that distinction visible because the most common trick in supplement marketing is to state a nutrient fact and let the reader attach it to the product. We would rather write it down than perform it. The full explanation is on [Our Research](/our-story/our-research/).

## 3. The six nutrients

**Component:** `CardGrid columns={3}` of `ContentCard`, **no images** — use a text-led card variant with a large `display-2` initial letter or symbol in `gold-tint` instead. Six stock nutrient photographs would add 600 KB and no information.

| Eyebrow | Title | Excerpt | Href |
|---|---|---|---|
| Nutrient | Vitamin C | Mare's milk is unusually high in it for a dairy. What it contributes to, and why it is the most fragile thing in the powder. | `/wellbeing/nutrients/vitamin-c/` |
| Nutrient | Omega-3 | A fatty acid the body cannot make for itself. Where it comes from and what it is for. | `/wellbeing/nutrients/omega-3/` |
| Nutrient | Lactoferrin | An iron-binding milk protein, and one of the reasons mare's milk attracts research interest. | `/wellbeing/nutrients/lactoferrin/` |
| Nutrient | Vitamin A | Contributes to the maintenance of normal skin and vision. Also the one most easily overdone. | `/wellbeing/nutrients/vitamin-a/` |
| Nutrient | B vitamins | B1, B2 and B12 — what each does, and why B12 is the one worth paying attention to. | `/wellbeing/nutrients/b-vitamins/` |
| Nutrient | Calcium & iron | The two minerals that most often compete with each other, and what that means practically. | `/wellbeing/nutrients/calcium-and-iron/` |

## 4. Where they come from in Steppe Gut

**Component:** `MediaTextRow`, image left (reuse `src/assets/products/powder-detail.*`, P-2)

> **Eyebrow:** In the pack
> **Heading:** None of these are added
> **Body:**
> Every nutrient listed above occurs naturally in mare's milk. There is no vitamin premix in Steppe Gut and no isolate blended in after fermentation. That is partly a decision and partly simply what the milk is.
>
> Quantities per serving, and per 100 g, are published in full.
>
> **CTA:** See the figures → `/products/whats-inside/`

## 5. Honest limits

**Component:** `HonestLimits`

> **Heading:** What we don't know yet
>
> Knowing that a nutrient has an established function is not the same as knowing that consuming more of it changes anything for a person who is not deficient. For most nutrients in most well-fed adults, it does not.
>
> These pages describe what the nutrients are for. They are not an argument that you need more of them, and they are not an argument for buying our product.

## 6. Closing CTA

**Component:** `ClosingCTA`, shared bookend

> **Heading:** The figures, not the adjectives
> **Body:** Quantities per serving for all three formats, in one table.
> **Primary:** See what's inside → `/products/whats-inside/`
> **Secondary:** Back to wellbeing → `/wellbeing/`

---

## Responsive behaviour

1 column < 640px · 2 at `sm` · 3 at `lg`. Text-led cards have no image so they need a `min-h` to stay even — set `min-h-[180px]`.

## Accessibility notes

- One `<h1>`. Card titles `<h3>`
- The decorative large initial on each card is `aria-hidden` — the card title carries the name
- Grid is `<ul>`/`<li>`, one `<a>` per card

## SEO notes

| Element | Value |
|---|---|
| `<title>` | Nutrients in Mare's Milk — Explained · Steppe Gut |
| Meta description | Vitamin C, omega-3, lactoferrin, vitamin A, B vitamins, calcium and iron — what each is, what it contributes to, and where else to find it. |
| `<h1>` | Nutrients |
| JSON-LD | `CollectionPage` + `ItemList` |
| Internal links | 6 nutrient pages, `/products/whats-inside/`, `/our-story/our-research/`, `/wellbeing/` |

## Developer notes

- Route `/wellbeing/nutrients/`, lazy-loaded
- **Zero new images.** §4 reuses P-2; the cards are text-led by design
- Nutrient list in `src/data/nutrients.js`, shared with the individual pages and with the `/products/whats-inside/` glossary so a definition exists once
- `ContentCard` needs a `variant="text"` prop (no image, large decorative initial). Build it here; it is a small addition, not a new component
- Reuses everything else. This page is a half-day of work and should be scheduled with the wellbeing stage
