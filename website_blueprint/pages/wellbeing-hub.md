# Page — Wellbeing `/wellbeing/`

## Summary

The lifestyle counterpart to `/the-science/`. Five pillars — Nourish, Rest, Movement, Calm, Ritual — plus the nutrient index and the rituals collection. Where the science hub is written to be believed, this hub is written to be **used**.

The reference site runs exactly this split and populates its lifestyle hub with a large volume of practical content. Steppe Gut adopts the structure at a fraction of the volume, deliberately: five well-written pillar pages serve the brand better than fifty thin ones, and thin content is the fastest way to make a premium brand look cheap.

## Purpose

- **Goals:** education, trust, brand storytelling
- **Journey questions:** 2, 5
- **Audience:** the reader who is not currently thinking about buying anything
- **Intent:** "Give me something useful"
- **Primary CTA:** *Nourish* → `/wellbeing/nourish/`
- **Secondary CTA:** *Ways to take it* → `/rituals/`

## Layout

| Property | Value |
|---|---|
| Header | `PageHeader align="center"` |
| Body | `container` for rows, `container-content` for the featured card and grid |
| Rhythm | `section-gap` |

## Section order

| # | Section | Component | Why |
|---|---|---|---|
| 1 | Header | `PageHeader` | States that the content is useful without purchase — the hub's whole premise |
| 2 | The five pillars | `CardGrid columns={3}` | A grid rather than rows: these are peers, and rows would imply a sequence that does not exist |
| 3 | Featured — ways to take it | `FeaturedStoryCard` | The one section that connects to the product, given the loud slot |
| 4 | Nutrients | `MediaTextRow` | Routes to the nutrient index |
| 5 | The unglamorous summary | `TipList columns={2}` | The honest version of all five pillars in one block. The most useful thing on the page |
| 6 | Closing CTA | `ClosingCTA` | |

---

# Copy

## 1. Page header

> **Eyebrow:** Wellbeing
> **Title (h1):** Small things, done often
> **Lead:** Five subjects that affect how your gut behaves — what you eat, how you sleep, how you move, how much stress you carry, and whether you do any of it consistently. None of this requires buying anything from us, and most of it is more useful than a supplement.

## 2. The five pillars

**Component:** `CardGrid columns={3}` of `ContentCard`

| Eyebrow | Title | Excerpt | Href |
|---|---|---|---|
| Wellbeing | Nourish | Fibre, variety and fermented foods — the dietary advice that survives contact with the evidence. | `/wellbeing/nourish/` |
| Wellbeing | Rest | Why disrupted sleep changes digestion, and what actually improves sleep rather than what is sold as improving it. | `/wellbeing/rest/` |
| Wellbeing | Movement | What exercise does for gut transit, how much is enough, and why walking is underrated. | `/wellbeing/movement/` |
| Wellbeing | Calm | The gut–brain connection, what stress does to digestion, and which interventions have something behind them. | `/wellbeing/calm/` |
| Wellbeing | Ritual | Why consistency outperforms intensity, and how to attach a new habit to an existing one. | `/wellbeing/ritual/` |

*(Five cards in a three-column grid: rows of 3 and 2. The second row is left-aligned, not centred — a centred orphan row draws attention to the odd number.)*

### IMAGE PLACEHOLDERS — W-1 … W-5

**Aspect ratio:** 3:2 · **Display size:** 640 × 427 · **Loading:** lazy
**Save to:** `src/assets/wellbeing/{nourish,rest,movement,calm,ritual}.{avif,webp}`

All five share one register: quiet, domestic, contemporary, no people, no product, no faces. They must read as one set.

**W-1 — Nourish.** Alt: `A wooden board of varied raw vegetables and herbs in daylight.`
```
higgsfield generate create gpt_image_2 \
  --prompt "overhead editorial still life photograph of a worn wooden board carrying a loose scatter of many different raw vegetables herbs seeds and pulses in small quantities, deliberately varied rather than arranged, cool soft daylight from a window on the left with gentle shadows, a little soil still on one root and a few loose seeds fallen onto the table, palette of deep forest green warm cream and muted earth tones, desaturated, honest domestic food photography rather than styled wellness imagery, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 3:2 --resolution 2k --wait
```

**W-2 — Rest.** Alt: `A dark bedroom with early light at the edge of a curtain.`
```
higgsfield generate create gpt_image_2 \
  --prompt "quiet editorial interior photograph of a dim bedroom before dawn with a thin line of pale early light showing along the edge of a heavy curtain, crumpled linen bedding in soft shadow in the foreground, a glass of water on a bedside table barely catching the light, no people, palette of deep forest green cool grey and a thin warm edge of cream, very low key and desaturated, calm and still, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 3:2 --resolution 2k --wait
```

**W-3 — Movement.** Alt: `Worn walking shoes by a door in morning light.`
```
higgsfield generate create gpt_image_2 \
  --prompt "quiet editorial photograph of a pair of well-worn plain walking shoes set down beside a door on a bare wooden floor, laces loose and one shoe tipped slightly, early morning light entering low from the doorway and casting long shadows across the boards, scuffed toes and dust on the soles, palette of warm cream deep forest green shadow and muted leather brown, desaturated, plain and domestic with no people and no sportswear branding, generous empty space above, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 3:2 --resolution 2k --wait
```

**W-4 — Calm.** Alt: `Rain on a window with a blurred green view beyond.`
```
higgsfield generate create gpt_image_2 \
  --prompt "quiet editorial photograph of fine rain running down a plain window pane with a soft blurred green view of foliage beyond, individual droplets sharp on the glass while everything behind falls out of focus, flat cool grey daylight, a faint smudge and one old fingerprint on the glass, palette of deep forest green cool grey and muted sage, desaturated and still, no people, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 3:2 --resolution 2k --wait
```

**W-5 — Ritual.** Alt: `A kitchen counter at dawn with a kettle, a cup and a glass of water.`
```
higgsfield generate create gpt_image_2 \
  --prompt "quiet editorial photograph of a simple kitchen counter at first light with a plain steel kettle a single ceramic cup and a glass of water set out in a row, low warm early sun entering from a window on the right and laying a long band of light across the counter, faint steam and a few water marks on the surface, no people, palette of warm cream soft sage and deep forest green shadow, desaturated and calm, contemporary and ordinary rather than styled, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 3:2 --resolution 2k --wait
```

## 3. Featured — ways to take it

**Component:** `FeaturedStoryCard`, badge reading "Six ways"

> **Eyebrow:** Wellbeing
> **Title:** Ways to take it
> **Href:** `/rituals/`

**Image:** reuse `src/assets/home/way-wellbeing.*` (H-7b) or the ritual collection's own hero once it exists. Do not generate a new asset for this slot.

## 4. Nutrients

**Component:** `MediaTextRow`, image left (reuse W-1)

> **Eyebrow:** Nutrients
> **Heading:** What the individual things do
> **Body:**
> Short, plain explanations of the nutrients naturally present in mare's milk — vitamin C, omega-3, lactoferrin, vitamin A, the B vitamins, calcium and iron. What each one is, where else you can get it, and what it is generally understood to contribute to.
>
> These are statements about the nutrients, not about our product. The difference is explained on [Our Research](/our-story/our-research/).
>
> **CTA:** See the nutrients → `/wellbeing/nutrients/`

## 5. The unglamorous summary

**Component:** `TipList columns={2}`

> **Heading:** All five pillars, honestly, in one block
> **Sub:** If you read nothing else here, read this.

| Title | Body |
|---|---|
| Eat more different plants | The single best-supported thing in this entire section. Variety matters more than quantity of any one thing. |
| Sleep at consistent hours | More effective than almost any dietary intervention, and free. |
| Walk more than you think is worth counting | Gut transit responds to ordinary daily movement more than to occasional hard training. |
| Reduce what you can, accept what you can't | Stress affects digestion measurably. Most stress-reduction advice ignores that some stress is not optional. |
| Do it on the days you don't feel like it | Consistency is the mechanism. Intensity is mostly not. |
| No supplement replaces the five above | Including ours. We would rather you did these and never bought anything. |

> That last row is not modesty as a technique. It is the position the brand has taken, and it is stated in the same plain register as the other five so it reads as a continuation rather than a flourish.

## 6. Closing CTA

**Component:** `ClosingCTA`, shared bookend

> **Heading:** Start with one of them
> **Body:** Not all five, and not this week.
> **Primary:** Nourish → `/wellbeing/nourish/`
> **Secondary:** Ways to take it → `/rituals/`

---

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| < 640px | Grid 1 column. `TipList` 1 column |
| 640–1023px | Grid 2 columns — five cards fill rows of 2, 2, 1, left-aligned. `TipList` 2 columns |
| ≥ 1024px | Grid 3 columns — rows of 3 and 2, second row left-aligned |

## Accessibility notes

- One `<h1>`. `ContentCard` titles `<h3>`, `TipList` titles `<h3>`
- The grid is `<ul>`/`<li>`; each card is one `<a>`, one tab stop
- The `FeaturedStoryCard` badge is `aria-hidden`
- The odd-number grid must not use `justify-items: center` on the last row — it changes the visual alignment without changing the reading order, which is confusing when magnified

## SEO notes

| Element | Value |
|---|---|
| `<title>` | Wellbeing — Food, Sleep, Movement, Stress and Routine · Steppe Gut |
| Meta description | Five things that affect how your gut behaves, explained without exaggeration. Useful whether or not you ever buy a supplement. |
| `<h1>` | Small things, done often |
| JSON-LD | `CollectionPage` + `ItemList` of the five pillars |
| Internal links | 5 pillars, `/rituals/`, `/wellbeing/nutrients/`, `/the-science/` |

## Developer notes

- Route `/wellbeing/`, lazy-loaded
- Five new images (W-1 … W-5). All `generate create`, all interior/domestic, none containing a person. Generate them as one batch so they match
- Reuses `PageHeader`, `CardGrid`, `ContentCard`, `FeaturedStoryCard`, `MediaTextRow`, `TipList`, `ClosingCTA`. No new components
- Pillar list in `src/data/wellbeing.js`, also driving the mega-menu and the `ItemList` JSON-LD
- The "unglamorous summary" list is the same content used at the foot of each pillar page — source it once
