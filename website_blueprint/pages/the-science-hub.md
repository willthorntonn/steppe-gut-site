# Page — The Science `/the-science/`

## Summary

The education hub for mechanism. It holds four explainer articles plus the women's guide sub-hub, and its job is routing plus enough substance that it is not merely a menu.

The reference site splits its education into two parallel hubs — one for mechanism, one for lifestyle — and that split is adopted here (`/the-science/` and `/wellbeing/`). It is worth understanding why the split works: mechanism content is written to be *believed*, lifestyle content is written to be *used*. They have different registers, different lengths and different audiences within the same person, and merging them produces a hub that is too clinical for a casual reader and too soft for a sceptical one.

## Purpose

- **Goals:** education, trust
- **Journey questions:** 2, 5, 6
- **Audience:** the reader who wants to understand rather than to buy
- **Intent:** "Teach me about this properly"
- **Primary CTA:** *How it works* → `/how-it-works/`
- **Secondary CTA:** *A woman's guide to gut health* → `/the-science/womens-guide/`

## Layout

| Property | Value |
|---|---|
| Header | `PageHeader align="center"` |
| Body | `container` for media rows; `container-content` for the featured card |
| Rhythm | `section-gap` |

## Section order

| # | Section | Component | Why |
|---|---|---|---|
| 1 | Header | `PageHeader` | States the hub's scope and its honesty policy up front |
| 2 | Start here | `MediaTextRow` | Routes to `/how-it-works/`, which is the canonical mechanism page. The hub must not compete with it |
| 3 | Featured — women's guide | `FeaturedStoryCard` | The highest-affinity content for the target audience gets the loudest slot on the page |
| 4 | The four explainers | `MediaTextRow` ×4, alternating | Substance, not a card grid — each gets a real paragraph so the hub reads as writing rather than navigation |
| 5 | How we write about evidence | `Container prose` + `TipList` | Sets the reader's expectations for every article below it. Unusual, and the reason this hub is trustworthy |
| 6 | Closing CTA | `ClosingCTA` | |

---

# Copy

## 1. Page header

> **Eyebrow:** Education
> **Title (h1):** The science
> **Lead:** Five subjects, explained as plainly as we can manage: what fermentation does, what the gut microbiome is, how nutrients are absorbed, what the gut–skin connection actually amounts to, and how all of it intersects with a woman's cycle. Where the evidence is thin, we say so in the article rather than at the bottom in small type.

## 2. Start here

**Component:** `MediaTextRow`, image left (reuse `src/assets/home/how-it-works.*`, H-5)

> **Eyebrow:** Start here
> **Heading:** If you read one page, read this one
> **Body:**
> How It Works is the full mechanism argument in one place: what mare's milk is, what four days of fermentation does to it, why it ends up as a powder, and what that does and does not allow us to say.
>
> Everything in this section is a deeper look at one part of that argument.
>
> **CTA:** Read how it works → `/how-it-works/`

## 3. Featured — a woman's guide

**Component:** `FeaturedStoryCard`, badge reading "Guide"

> **Eyebrow:** The Science
> **Title:** A woman's guide to gut health
> **Href:** `/the-science/womens-guide/`

### IMAGE PLACEHOLDER — S-4

**Purpose:** A calm, non-clinical, non-cosmetic image for the guide. Must avoid both laboratory and beauty-advertising registers.
**Aspect ratio:** 16:9 · **Display size:** 1600 × 900 · **Loading:** lazy
**Save to:** `src/assets/science/womens-guide.{avif,webp}`
**Suggested composition:** A still interior — an unmade linen bed edge, morning light across it, a glass of water on a side table. No person, no product, no skin.
**Alt text:** `Morning light falling across crumpled linen beside a glass of water.`

```
higgsfield generate create gpt_image_2 \
  --prompt "quiet editorial interior photograph of crumpled natural linen bedding in soft folds with a plain glass of water on a worn wooden side table beside it, low early morning sunlight entering from a window on the right and lying across the linen in long soft bands, a few dust motes suspended in the light, no people and no products, palette of warm cream soft sage and deep forest green shadow, desaturated and calm, generous empty space in the upper left of the frame, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 16:9 --resolution 2k --wait
```

## 4. The four explainers

**Component:** four `MediaTextRow`s, alternating `reverse`

**Row 1 — Fermentation** *(image left, reuse `src/assets/science/stirring.*`, S-2)*
> **Eyebrow:** The Science
> **Heading:** Fermentation
> **Body:** Four days in a wooden vessel, and what the bacteria are actually doing during them. Why the vessel matters more than the recipe, why the milk turns sour before it turns stable, and what is left once it has been dried.
> **CTA:** Read about fermentation → `/the-science/fermentation/`

**Row 2 — The microbiome** *(image right)*
> **Eyebrow:** The Science
> **Heading:** The microbiome
> **Body:** The population of bacteria living in your gut — what it is, why yours is different from everyone else's, and why almost every confident claim you have read about it is running ahead of the evidence.
> **CTA:** Read about the microbiome → `/the-science/the-microbiome/`

**Row 3 — Digestion and absorption** *(image left)*
> **Eyebrow:** The Science
> **Heading:** Digestion and absorption
> **Body:** How something you swallow becomes something your body can use. What "bioavailable" means, why it is not a marketing word, and why fermentation is relevant to it.
> **CTA:** Read about absorption → `/the-science/digestion-and-absorption/`

**Row 4 — The gut–skin axis** *(image right)*
> **Eyebrow:** The Science
> **Heading:** The gut–skin axis
> **Body:** The connection behind the phrase "radiance from within" — where it comes from, how much of it is established, and how much of it is a marketing department's version of a real but unfinished area of research.
> **CTA:** Read about the gut–skin axis → `/the-science/the-gut-skin-axis/`

### IMAGE PLACEHOLDERS — S-5, S-6, S-7

Row 1 reuses S-2. Rows 2, 3 and 4 need new images.

**S-5 — The microbiome.** Alt: `Dense colonies of bacteria growing on a culture plate.`
```
higgsfield generate create gpt_image_2 \
  --prompt "macro editorial photograph of dense irregular bacterial colonies grown across a shallow culture plate, varied cream and pale sage colonies of different sizes with uneven edges and a few merged patches, hard raking light from the left throwing shadow across the plate's surface texture, a smudge and a thumbprint at the plate's edge, shallow depth of field, palette of warm cream soft sage and deep forest green, desaturated, real laboratory documentary rather than a clean stock science image, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 3:2 --resolution 2k --wait
```

**S-6 — Digestion and absorption.** Alt: `A glass of water with faint powder dispersing through it, seen in raking light.`
```
higgsfield generate create gpt_image_2 \
  --prompt "close editorial photograph of a plain glass of water on a worn oak table with a faint cloud of pale powder dispersing slowly downward through it in delicate trailing threads, low warm morning side light from the left passing through the glass and throwing a bright caustic patch on the wood, fingerprints on the glass and one water ring on the table, palette of warm cream deep forest green shadow and pale amber, desaturated and calm, quiet observational still life, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 3:2 --resolution 2k --wait
```

**S-7 — The gut–skin axis.** Alt: `Warm daylight falling across a folded linen cloth and a ceramic bowl.`
```
higgsfield generate create gpt_image_2 \
  --prompt "quiet editorial still life photograph of a softly folded natural linen cloth beside a small hand-thrown sage-green ceramic bowl on a pale sandstone surface, low warm afternoon light raking from the right picking out the weave of the linen and the uneven glaze on the bowl, one loose thread and a faint chip on the rim, generous empty space to the left, palette of warm cream soft sage and deep forest green shadow, desaturated and restrained, calm tactile still life with no skin no faces and no cosmetic styling, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 3:2 --resolution 2k --wait
```

## 5. How we write about evidence

**Component:** `Container width="prose"` + `Prose`, then `TipList columns={1}`

> **Eyebrow:** Our approach
> **Heading:** How we write about evidence
> **Body:**
> Health writing on the internet is mostly confident. Most of it should not be. We have tried to write these pages the way a careful person would explain something they know reasonably well but not completely.

| Title | Body |
|---|---|
| Every article ends by saying what is not known | It is a fixed section called "What we don't know yet", and it is not optional. |
| We distinguish the nutrient from the product | "Vitamin C contributes to normal collagen formation" is a statement about vitamin C. We never quietly convert it into a statement about Steppe Gut. |
| We do not cite a study of one thing as evidence about another | Fresh fermented milk is not dried powder. An isolated compound is not a food containing it. |
| We date our pages | Every article carries a "last reviewed" date. If a page has not been revisited in a year, that is visible to you. |
| We will correct things | If we get something wrong and you tell us, we will change it and note that we did. |

**Below:** *Our full evidence position is on [Our Research](/our-story/our-research/).*

## 6. Closing CTA

**Component:** `ClosingCTA`, shared bookend

> **Heading:** Understand it first
> **Body:** The product will still be there afterwards.
> **Primary:** Read how it works → `/how-it-works/`
> **Secondary:** See the products → `/products/`

---

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| < 768px | All rows stack image-first. `FeaturedStoryCard` badge shrinks to 64px and repositions to `top-[-45px] left-6`. `TipList` 1 column |
| 768–1023px | Media rows side-by-side, alternating |
| ≥ 1024px | `FeaturedStoryCard` badge at 112px, `top-[-70px] left-28`. Full alternation visible |

## Accessibility notes

- One `<h1>`. Each explainer heading is `<h2>`
- The `FeaturedStoryCard` is a single `<a>` wrapping image, eyebrow and title — one tab stop, not three. Its focus ring sits on the card, not the image
- The floating badge overlaps the card's top edge; ensure it does not overlap the focus ring, and that it is `aria-hidden` (the card's title carries the meaning)
- Alternating `reverse` never changes DOM order — image always precedes text in the markup

## SEO notes

| Element | Value |
|---|---|
| `<title>` | The Science — Fermentation, the Microbiome and the Gut · Steppe Gut |
| Meta description | Plain explanations of fermentation, the gut microbiome, nutrient absorption and the gut–skin connection — including what the evidence does not yet show. |
| `<h1>` | The science |
| JSON-LD | `CollectionPage` + `ItemList` of the five child articles |
| Internal links | 4 articles, women's guide, `/how-it-works/`, `/our-story/our-research/`, `/products/` |
| Note | This hub should not try to rank for the same queries as its children. Its target is the broad head term ("fermented mare's milk science"); the children take the long tail |

## Developer notes

- Route `/the-science/`, lazy-loaded
- Three new images (S-5, S-6, S-7) plus the women's-guide feature (S-4). Rows 1 and the "start here" row reuse existing assets
- `FeaturedStoryCard` is first built here and reused on `/wellbeing/`
- The article list is `src/data/scienceArticles.js`, also consumed by the mega-menu and the `ItemList` JSON-LD — so adding an article updates the nav, the hub and the structured data in one edit
- The "how we write about evidence" list reads from the same source as `/our-story/our-research/` §6 where they overlap
