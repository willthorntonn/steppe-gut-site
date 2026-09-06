# Page — The Steppe `/our-story/the-steppe/`

## Summary

The place, in depth. Where `/our-story/` establishes that Mongolia is real, this page establishes that it is *specific* — a climate, an elevation, a season, and a set of constraints that determine what the product can be. Specificity is the credibility mechanism; a page of landscape adjectives would achieve the opposite.

## Purpose

- **Goals:** brand storytelling, trust, education
- **Journey question:** 4 (why is Mongolia important?)
- **Audience:** a visitor already interested in the story, reading for pleasure and for reassurance
- **Intent:** "Tell me about this place properly"
- **Primary CTA:** *How it's made* → `/our-story/how-its-made/`
- **Secondary CTA:** *Land and herders* → `/our-story/land-and-herders/`

## Layout

| Property | Value |
|---|---|
| Opening | `ChapterHero` (built for `/our-story/`), `min-h-[520px]` / `min-h-[640px]` |
| Body | `container-prose` 680px for narrative; `container` for media rows |
| Rhythm | `section-gap` |
| Reading time | ~6 minutes |

## Section order

| # | Section | Component | Why |
|---|---|---|---|
| 1 | Chapter hero | `ChapterHero` | Place first |
| 2 | Where exactly | `MediaTextRow` + map figure | Removes vagueness immediately |
| 3 | The season | `ProcessSteps` (4 seasonal stages) | The single most consequential constraint on the product |
| 4 | Why horses here | `MediaTextRow` reversed | Explains why mare's milk rather than any other milk |
| 5 | What the grass does | `Container prose` | The link from landscape to composition — the section that makes the page earn its place |
| 6 | Living with the season | `TipList` | Honest operational consequences: stock, batches, out-of-stock periods |
| 7 | Read further | `CardGrid columns={2}` | Routes on |
| 8 | Closing CTA | `ClosingCTA` | Quiet |

---

# Copy

## 1. Chapter hero

> **Eyebrow:** Töv Province
> **H1:** The steppe
> **Lead:** High, dry, open, and cold for most of the year. Everything about this product is downstream of what that landscape allows.

**Image:** reuse `src/assets/story/place.*` (O-2) at full bleed. **No new hero asset** — this page is a child of `/our-story/` and reusing its imagery reinforces that relationship.

## 2. Where exactly

> **Eyebrow:** Location
> **Heading:** An hour and a half north of Ulaanbaatar
> **Body:**
> Töv Province surrounds the capital on almost every side. The milk we buy comes from grassland in its northern districts, at roughly 1,300 metres, where the ground is dry, the soil is thin, and the grass is short, hard and unimproved.
>
> There is no irrigation, no planted pasture and no supplementary feed for most of the year. The horses eat what grows, where it grows, and move when it runs out.

### IMAGE PLACEHOLDER — O-4

**Purpose:** A simple, unshowy locator — the ground itself at close range.
**Aspect ratio:** 3:2 · **Display size:** 1200 × 800 · **Loading:** lazy
**Save to:** `src/assets/story/ground.{avif,webp}`
**Alt text:** `Close view of short dry steppe grass and thin stony soil.`

```
higgsfield generate create gpt_image_2 \
  --prompt "close-to-the-ground editorial photograph of short dry Mongolian steppe grass growing out of thin stony soil, individual stems and small pale stones sharply visible in the foreground with the plain falling away soft and out of focus behind, hard clear high-altitude midday-adjacent light from a low angle raking across the tufts, a few dry seed heads and one small hoofprint pressed into the dust, palette of pale straw deep forest green and grey stone, desaturated and muted, plain observational field photograph, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 3:2 --resolution 2k --wait
```

## 3. The season

**Component:** `ProcessSteps`, 4 steps, no images (icons only)

> **Heading:** Five months, and then nothing

| Step | Title | Body |
|---|---|---|
| One | Late spring | Foals are born. Mares come into milk. Nothing is collected yet — the foals have priority and the yield is low. |
| Two | June to August | Peak season. Mares are milked several times a day, in short sessions, alongside their foals. This is when most of the year's volume is produced. |
| Three | September to October | Yield falls as the grass dries and the nights turn. Collection tails off and then stops. |
| Four | November to May | No milk. Horses are wintered out on the open range in temperatures that regularly fall below −30 °C. Production is closed for seven months of the year. |

**Below the steps:**
> This is not a scarcity story and we are not going to sell it as one. It is simply how the animal works, and it means our production year is five months long whether that is convenient or not.

## 4. Why horses here

> **Eyebrow:** The animal
> **Heading:** Horses can live here. Most dairy animals cannot.
> **Body:**
> Mongolian horses are small, unshod, and left out through the winter. They graze standing snow and survive on grass that would not support a dairy herd. There is no barn, no feed regime and no veterinary intensification, because none of it would be economic at this density.
>
> The consequence for the milk is straightforward: it comes from animals eating a wild, varied, seasonal diet rather than a formulated one. That does not make it magical. It makes it variable, which is why every batch is tested rather than assumed.

### IMAGE PLACEHOLDER — O-5

**Purpose:** Show Mongolian horses as working animals adapted to hardship, not as beauty subjects.
**Aspect ratio:** 3:2 · **Display size:** 1200 × 800 · **Loading:** lazy
**Save to:** `src/assets/story/horses.{avif,webp}`
**Alt text:** `Small Mongolian horses grazing in a loose group on windswept grassland.`

```
higgsfield generate create gpt_image_2 \
  --prompt "editorial documentary photograph of a loose group of small stocky unshod Mongolian horses grazing on windswept open grassland, thick shaggy winter-ready coats and tangled manes, heads down, seen at middle distance in profile, flat cool overcast light with a hard wind flattening the grass around their legs, dust and dry grass seed in the air, palette of dusty brown deep forest green and cool grey, desaturated and muted, plain and unromantic observational framing, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 3:2 --resolution 2k --wait
```

## 5. What the grass does

**Component:** `Container width="prose"` + `Prose`, then a `PullQuote`

> **Eyebrow:** The link
> **Heading:** Diet ends up in the milk
> **Body:**
> Milk composition follows diet. This is not a controversial claim; it is why season, region and feed are recorded for every dairy product that takes itself seriously. Animals eating a wide range of wild forage produce milk with a different fatty-acid and micronutrient profile from animals eating a formulated ration.
>
> What we can say honestly is that our milk comes from one region, in one season, from animals on unimproved pasture, and that we test each batch rather than publishing a single fixed figure and pretending nothing varies.
>
> What we cannot say is that this makes the milk better for you in a way we have measured. We have not measured it. That would take a study we have not run.

**PullQuote:**
> Variable is honest. Consistent would be a claim we cannot support.

## 6. Living with the season

**Component:** `TipList columns={2}`

> **Heading:** What this means for you as a customer

| Title | Body |
|---|---|
| We will go out of stock | If a season is short, we run out. We would rather do that than blend in milk from somewhere else. |
| Batches are dated | Every pack carries its batch and its season. You can tell how old it is. |
| Figures are averages | Published nutrition values are batch averages, not fixed guarantees. See [What's Inside](/products/whats-inside/). |
| Prices do not move with scarcity | We set a price before the season and hold it. A short year is our problem, not yours. |

## 7. Read further

**Component:** `CardGrid columns={2}` — links to `/our-story/land-and-herders/`, `/our-story/how-its-made/`.

## 8. Closing CTA

**Component:** `ClosingCTA`, shared bookend

> **Heading:** From five months of grass
> **Body:** To a sachet on your counter.
> **Primary:** How it's made → `/our-story/how-its-made/`
> **Secondary:** See the products → `/products/`

---

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| < 768px | Hero `min-h-[520px]`. Media rows stack. `ProcessSteps` stacked with reduced numerals. `TipList` 1 column |
| 768–1023px | Media rows side-by-side. `TipList` 2 columns |
| ≥ 1024px | `ProcessSteps` gains its connector rule. Prose at 680px |

## Accessibility notes

- One `<h1>` in the chapter hero. Overlay contrast measured on the exported image, as with `/our-story/`
- `ProcessSteps` renders an `<ol>`; large numerals `aria-hidden`, ordinal repeated in the heading text
- The temperature figure uses a non-breaking space and a proper minus sign: `−30 °C`
- `PullQuote` is a `<p>`

## SEO notes

| Element | Value |
|---|---|
| `<title>` | The Steppe — Töv Province, Mongolia · Steppe Gut |
| Meta description | Where the milk comes from: high dry grassland in Töv Province, a five-month milking season, and what a wild forage diet means for what is in the milk. |
| `<h1>` | The steppe |
| JSON-LD | `Article`; also emit `Place` with `Töv Province, Mongolia` |
| Breadcrumb | Home → Our Story → The Steppe |
| Target queries | "Töv Province mare's milk", "Mongolian steppe horses milk", "when are mares milked in Mongolia" |

## Developer notes

- Route `/our-story/the-steppe/`, lazy-loaded
- **Reuses O-2 as its hero** — no new hero asset. Two new images only (O-4, O-5)
- Reuses `ChapterHero`, `MediaTextRow`, `ProcessSteps`, `TipList`, `PullQuote`, `CardGrid`, `ClosingCTA`. No new components
- The seasonal table in §3 is content that also appears in `/our-story/how-its-made/` and the FAQ. Source it once from `src/data/season.js`
- If a real map is ever added in §2, it must be a static image, not an embedded interactive map — an external map SDK is a large dependency and a tracking surface for a single decorative locator
