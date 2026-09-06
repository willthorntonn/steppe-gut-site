# Page — Ways to Take It `/rituals/`

## Summary

Six simple preparations. This is Steppe Gut's replacement for the reference site's 34-page recipe archive, and the reduction is deliberate.

**Why the reference site's approach is not copied:** its product is a small bottled drink used as an everyday ingredient, so a recipe farm is a natural extension — 34 pages of breakfasts and traybakes make sense for a food. Steppe Gut is a 10 g sachet of fermented milk powder with a mildly sour taste. It goes in water. There are perhaps six honest things to do with it, and publishing thirty would be padding a premium brand with filler, which is the fastest way to make it look like neither.

Six good ones, well photographed, is the correct answer.

## Purpose

- **Goals:** product understanding, conversion, education
- **Journey questions:** 1, 7
- **Audience:** an existing customer, or someone at the last step of deciding — often the person asking "will I actually enjoy taking this every day?"
- **Intent:** "How do I make this pleasant?"
- **Primary CTA:** an individual ritual
- **Secondary CTA:** *See the products* → `/products/`

## Layout

| Property | Value |
|---|---|
| Header | `PageHeader align="center"` |
| Body | `container` for the grid |
| Rhythm | `section-gap` |

## Section order

| # | Section | Component | Why |
|---|---|---|---|
| 1 | Header | `PageHeader` | Sets expectation: simple, not culinary |
| 2 | The basic one | `MediaTextRow` | The default preparation, given its own section because most people will only ever use it |
| 3 | The six | `CardGrid columns={3}` + `FilterTabs` | The collection |
| 4 | What not to do | `TipList columns={2}` | Genuinely useful, and prevents the most common bad first experience |
| 5 | Closing CTA | `ClosingCTA` | |

---

# Copy

## 1. Page header

> **Eyebrow:** Wellbeing
> **Title (h1):** Ways to take it
> **Lead:** It goes in water. That is the honest answer and it is what most people do every morning. These are five other things that work, for the days when plain water is not appealing.

## 2. The basic one

**Component:** `MediaTextRow`, image left

> **Eyebrow:** The default
> **Heading:** One sachet, 100 ml of cool water
> **Body:**
> Tear the sachet, tip it into a glass, add cool or room-temperature water, stir for a few seconds and drink it before it settles. It tastes faintly sour and slightly savoury — closer to thin plain yoghurt than to milk.
>
> Most people find it unremarkable within a week, which is the point. A daily habit works better when it is not an event.

### IMAGE PLACEHOLDER — R-1

**Purpose:** The default preparation, in a real contemporary Thai kitchen at breakfast time. Must not read as a Mongolian scene — this is the moment the product enters the customer's life.
**Aspect ratio:** 3:2 · **Display size:** 1200 × 800 · **Loading:** lazy
**Save to:** `src/assets/rituals/basic.{avif,webp}`
**Alt text:** `A sachet being stirred into a glass of water on a kitchen counter in morning light.`

```
higgsfield product-photoshoot create --mode lifestyle_scene \
  --prompt "a woman's hands stirring a cream supplement sachet into a plain glass of water on a pale stone kitchen counter, contemporary city apartment kitchen at early morning with soft warm window light from the left, linen cloth and a ceramic cup nearby, calm ordinary domestic moment rather than a styled wellness shot, subtle film grain" \
  --image src/sachets-cutout.png --aspect_ratio 3:2
```

## 3. The six

**Component:** `FilterTabs` (All · Cold · Warm · With food) above a `CardGrid columns={3}` of `ContentCard`

| Title | Meta | Excerpt | Category |
|---|---|---|---|
| Plain, in water | 1 min | The default. Cool water, stirred, drunk straight away. | Cold |
| With citrus | 2 min | A squeeze of lime or a slice of orange. The acidity flatters the sourness rather than fighting it. | Cold |
| Into plain yoghurt | 2 min | Stirred through unsweetened yoghurt. Both are fermented, so nothing clashes. | With food |
| With cold tea | 2 min | Unsweetened jasmine or barley tea, well chilled. The most popular alternative in our own testing. | Cold |
| In a green smoothie | 5 min | Banana, spinach, a little coconut water. Blend last so it does not aerate. | Cold |
| Warm, not hot | 2 min | Body-temperature water, for cold mornings. Below 40 °C — hot water makes the taste noticeably worse. | Warm |

### IMAGE PLACEHOLDERS — R-2 … R-6

**Aspect ratio:** 3:2 · **Display size:** 640 × 427 · **Loading:** lazy
**Save to:** `src/assets/rituals/{citrus,yoghurt,tea,smoothie,warm}.{avif,webp}`

All five share the same set: a pale stone counter, soft morning light from the left, contemporary and Thai-domestic, no faces. Generate as one batch.

**R-2 — With citrus.** Alt: `A glass with a lime wedge beside a torn sachet on a stone counter.`
```
higgsfield product-photoshoot create --mode lifestyle_scene \
  --prompt "a glass of pale cloudy drink with a fresh lime wedge resting on the rim, a torn cream sachet folded beside it on a pale stone kitchen counter, soft warm morning window light from the left, a few water droplets on the stone, calm ordinary domestic still life, subtle film grain" \
  --image src/sachets-cutout.png --aspect_ratio 3:2
```

**R-3 — Into plain yoghurt.** Alt: `A bowl of plain yoghurt with pale powder stirred through it.`
```
higgsfield product-photoshoot create --mode lifestyle_scene \
  --prompt "a shallow ceramic bowl of thick plain unsweetened yoghurt with pale ivory powder half stirred through it leaving a visible swirl, a small spoon resting in the bowl, pale stone counter, soft warm morning window light from the left, honest domestic food photography rather than styled, subtle film grain" \
  --image src/sachets-cutout.png --aspect_ratio 3:2
```

**R-4 — With cold tea.** Alt: `A tall glass of chilled tea with condensation on a stone counter.`
```
higgsfield product-photoshoot create --mode lifestyle_scene \
  --prompt "a tall glass of chilled pale jasmine tea with heavy condensation running down the outside, standing on a pale stone counter beside a folded cream sachet, soft warm morning window light from the left, a wet ring on the stone, calm ordinary domestic still life, subtle film grain" \
  --image src/sachets-cutout.png --aspect_ratio 3:2
```

**R-5 — In a green smoothie.** Alt: `A green smoothie in a glass beside spinach leaves and half a banana.`
```
higgsfield product-photoshoot create --mode lifestyle_scene \
  --prompt "a glass of muted green smoothie beside a few loose spinach leaves and half a banana on a pale stone counter, a blender jug just out of focus behind, soft warm morning window light from the left, a smear of smoothie on the stone, honest domestic food photography rather than bright styled wellness imagery, subtle film grain" \
  --image src/sachets-cutout.png --aspect_ratio 3:2
```

**R-6 — Warm, not hot.** Alt: `A ceramic cup of warm cloudy drink held in both hands.`
```
higgsfield product-photoshoot create --mode lifestyle_scene \
  --prompt "a plain sage-green ceramic cup of warm pale cloudy drink held in two hands at counter height, no face visible, faint steam, pale stone counter and a linen cloth beneath, soft cool early light from a window on the left, calm ordinary domestic moment, subtle film grain" \
  --image src/sachets-cutout.png --aspect_ratio 3:2
```

## 4. What not to do

**Component:** `TipList columns={2}`

> **Heading:** Four things that make it worse
> **Sub:** Most bad first experiences come from one of these.

| Title | Body |
|---|---|
| Hot water | Above about 40 °C the taste turns noticeably worse. It is not harmful; it is just unpleasant, and it puts more people off than anything else. |
| Letting it stand | The powder settles within a few minutes. Stir and drink, rather than making it and walking away. |
| Adding sugar | It works, and it defeats the point. If the taste is the problem, the capsules exist. |
| Too little water | Under 100 ml the sourness concentrates. More water is always the easier fix. |

## 5. Closing CTA

**Component:** `ClosingCTA`, shared bookend

> **Heading:** Find one you will keep doing
> **Body:** The best preparation is the one you do not have to think about.
> **Primary:** See the products → `/products/`
> **Secondary:** Why consistency works → `/wellbeing/ritual/`

---

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| < 640px | Grid 1 column. `FilterTabs` scroll horizontally. `TipList` 1 column |
| 640–1023px | Grid 2 columns. `TipList` 2 columns |
| ≥ 1024px | Grid 3 columns — 6 cards fill two even rows |

## Accessibility notes

- One `<h1>`. Card titles `<h3>`
- `FilterTabs` is `role="tablist"` with `aria-selected`; filtering updates a `?category=` param and announces the result count via `aria-live="polite"`
- The 40 °C figure uses a non-breaking space
- Grid is `<ul>`/`<li>`, one `<a>` per card

## SEO notes

| Element | Value |
|---|---|
| `<title>` | Ways to Take It — Six Simple Preparations · Steppe Gut |
| Meta description | How to take fermented mare's milk powder: in water, with citrus, in yoghurt, with cold tea, in a smoothie, or warm. Plus what makes it taste worse. |
| `<h1>` | Ways to take it |
| JSON-LD | `ItemList` of the six. **Do not use `Recipe` schema** — these are preparations, not recipes, and `Recipe` markup on a one-ingredient instruction invites a structured-data penalty |
| Internal links | 6 ritual pages, `/products/`, `/wellbeing/ritual/`, `/faq/` |
| Target queries | "how to take mare's milk powder", "what does fermented mare's milk taste like", "mare's milk powder smoothie" |

## Developer notes

- Route `/rituals/`, lazy-loaded
- Six new images (R-1 … R-6), all `product-photoshoot lifestyle_scene`. **Generate as one batch on the same set** so they read as a series
- Records in `src/data/rituals.js`: `{ slug, title, time, category, excerpt, image, alt, ingredients[], method[] }`
- Reuses `PageHeader`, `MediaTextRow`, `FilterTabs`, `CardGrid`, `ContentCard`, `TipList`, `ClosingCTA`. No new components
- **Resist scope creep here.** If the collection grows past eight items it has stopped being a curated set and become the recipe farm this page exists to avoid
