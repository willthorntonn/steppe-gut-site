# Page — Our Story `/our-story/`

## Summary

The hub for everything about where Steppe Gut comes from. It tells the whole arc in one scroll — place, people, method, intent — and routes to four child pages that carry the depth.

The reference site's equivalent hub is structured exactly this way: a short narrative overview with three or four `MediaTextRow` sections, each ending in a link to a dedicated child page. That structure works because an origin story that tries to be complete on one page becomes a wall, and one that is only a teaser feels evasive. Three substantial sections plus routes out is the balance.

`SG-PROJECT_CONTEXT.md` asks that Mongolia be "a central part of the brand narrative rather than a minor detail." This page and its four children are how that instruction is honoured structurally rather than decoratively.

## Purpose

- **Website goals served:** brand storytelling, trust, education
- **Journey questions:** 2 (why does it exist?), 3 (why trust it?), 4 (why Mongolia?)
- **Audience:** a visitor who is interested and now wants to know who they would be buying from
- **User intent:** "Is this a real thing from a real place, or a story someone invented in a marketing meeting?"
- **Primary CTA:** *How it's made* → `/our-story/how-its-made/`
- **Secondary CTA:** *See the products* → `/products/`

## Layout specification

| Property | Value |
|---|---|
| Background | `cream` |
| Opening | **Full-bleed chapter hero**, not a standard `PageHeader` — this is the only hub page that earns one |
| Body | `container` 1280px for media rows; `container-prose` for narrative |
| Rhythm | `section-gap-lg` around the chapter hero and closing CTA; `section-gap` elsewhere |

## Section order and rationale

| # | Section | Why it exists here |
|---|---|---|
| 1 | Chapter hero | Establishes place before argument. The one page where atmosphere legitimately precedes information |
| 2 | Why this exists | The founding intent, stated without mythology. Answers "why did anyone do this?" |
| 3 | The place | Töv Province, specifically. Specificity is the credibility mechanism |
| 4 | The people | Herders as partners with names and payment terms, not scenery |
| 5 | The method | How it becomes a powder, compressed, routing to the full page |
| 6 | What we will not do | The brand's constraints, stated as commitments |
| 7 | Read further | The four child pages |
| 8 | Closing CTA | Quiet ask |

---

# Sections

## 1. Chapter hero

**Component:** `Section bleed size="lg"` with full-bleed image and overlaid text

| Property | Value |
|---|---|
| Height | `min-h-[600px]` mobile · `min-h-[760px]` desktop |
| Image | Full-bleed `object-cover`, `object-position: center 45%` |
| Overlay | `rgba(47,62,47,0.72)` bottom-left → `rgba(47,62,47,0.08)` top-right |
| Text block | `max-w-[620px]`, bottom-left, `pb-16 lg:pb-24`, inside `Container` |
| `<h1>` | `display-1`, `cream`, `text-wrap: balance` |
| Lead | `body-lg`, `text-on-dark-muted`, max 3 lines |
| Breadcrumbs | Above the `<h1>`, in `cream/70` |

> **Eyebrow:** Töv Province, Mongolia
> **H1:** Where it comes from
> **Lead:** Mare's milk has been fermented on this grassland for as long as there have been horses and people on it together. We did not invent anything. We found where it was already happening and asked whether we could buy some.

### IMAGE PLACEHOLDER — O-1

**Purpose:** The site's single most important atmospheric image. It has to feel like a place a person actually stood, at a real hour.
**Aspect ratio:** 16:9 · **Display size:** 2400 × 1350 full-bleed · **Loading:** eager, `fetchpriority="high"` (LCP element)
**Save to:** `src/assets/story/steppe-hero.{avif,webp}`
**Suggested composition:** Wide steppe at first light, low mist in the hollows, a ger and a picket line of horses small in the mid-distance right of centre. **Bottom-left 45% is open shadowed grass** for the text block.
**Alt text:** `Open Mongolian grassland at first light with a ger and horses in the distance.`

```
higgsfield generate create gpt_image_2 \
  --prompt "cinematic wide editorial photograph of open Mongolian steppe at first light, low mist lying in the shallow hollows of the grassland, a single white ger and a picket line of horses small in the middle distance to the right of centre, pale cool dawn sky above with the first warm light just touching the tops of the grass, the bottom left forty-five percent of the frame kept as open shadowed grass with very little detail so text can sit over it, palette of deep forest green cool grey-blue and a thin band of aged gold on the horizon, desaturated and muted, vast and quiet rather than dramatic, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 16:9 --resolution 2k --wait
```

## 2. Why this exists

**Component:** `Container width="prose"` + `Prose`, then a `PullQuote`

> **Eyebrow:** The reason
> **Heading:** It started as a supply question
> **Body:**
> Fermented mare's milk is an ordinary food in Mongolia and almost unknown outside it. That gap is not because anyone was keeping it secret. It is because the fresh product spoils within days, the milking season lasts five months, and nobody had built the logistics to move it anywhere.
>
> Steppe Gut exists because that turned out to be a solvable problem. Ferment it where it has always been fermented, dry it there at low temperature, and it becomes something that can leave the country without pretending to be something else.
>
> There is no origin myth here and we are not going to write one. A company was formed, agreements were signed with herding families, and a facility that already made dairy powder started making this one.

**PullQuote:**
> We did not discover anything. We arranged transport.

## 3. The place

**Component:** `MediaTextRow`, image left, then a `StatBand`

> **Eyebrow:** The place
> **Heading:** Töv Province, five months a year
> **Body:**
> Töv wraps around Ulaanbaatar — high, dry, open grassland at around 1,300 metres, with hard winters and a short intense summer. Mares come into milk in late spring and are milked through to early autumn. Outside that window there is no milk, and so there is no production.
>
> That seasonality is a constraint we cannot design around, and it shapes everything: batch sizes, stock planning, and the fact that what you take in March was collected the previous August.
>
> **CTA:** More about the steppe → `/our-story/the-steppe/`

**StatBand (`sage-tint`, 3):** 1,300 m — average elevation · June–October — the milking season · 4 days — fermentation per batch

### IMAGE PLACEHOLDER — O-2

**Purpose:** Convey the scale and hardness of the landscape, not its prettiness.
**Aspect ratio:** 3:2 · **Display size:** 1200 × 800 · **Loading:** lazy
**Save to:** `src/assets/story/place.{avif,webp}`
**Alt text:** `Dry rolling grassland stretching to low hills under a wide sky.`

```
higgsfield generate create gpt_image_2 \
  --prompt "wide editorial landscape photograph of dry high-altitude Mongolian grassland rolling away toward low bare hills, wind visibly combing the grass into long streaks, a single dirt track cutting diagonally across the lower third, high thin cloud, hard clear light of late afternoon with long shadows in the folds of the ground, no people and no buildings, palette of pale straw deep forest green and cool grey, desaturated and muted, austere rather than picturesque, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 3:2 --resolution 2k --wait
```

## 4. The people

**Component:** `MediaTextRow`, image right

> **Eyebrow:** The people
> **Heading:** We buy the milk. They set the terms.
> **Body:**
> The milk comes from a small number of herding families who were already producing fermented mare's milk before we existed. They are paid per litre at a price agreed before each season starts, not after, and they are free to sell elsewhere.
>
> This matters practically, not only ethically: the fermentation is done by the people who have done it their whole lives, in their own vessels, with their own established cultures. It is not a process we specified and handed over. It is a process we buy the output of.
>
> **CTA:** How we work with herders → `/our-story/land-and-herders/`

### IMAGE PLACEHOLDER — O-3

**Purpose:** Show skilled work, with agency, without a face to camera.
**Aspect ratio:** 3:2 · **Display size:** 1200 × 800 · **Loading:** lazy
**Save to:** `src/assets/story/people.{avif,webp}`
**Alt text:** `A herder milking a mare on open grassland beside her foal.`

```
higgsfield generate create gpt_image_2 \
  --prompt "documentary editorial photograph of a Mongolian herder crouched beside a standing mare on open grassland milking her into a steel pail, the foal standing close by, the herder seen from behind and to the side with no face visible, working clothes and a worn deel, low warm evening light from behind rim-lighting the mare's coat and the grass, dust raised faintly by the horses, palette of deep forest green warm amber and dusty brown, desaturated, respectful documentary framing of skilled everyday work not a posed portrait, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 3:2 --resolution 2k --wait
```

## 5. The method

**Component:** `MediaTextRow`, image left

> **Eyebrow:** The method
> **Heading:** Fermented there, dried there, sealed there
> **Body:**
> The milk never leaves Mongolia as a liquid. It is fermented in the families' own wooden vessels, collected, dried at low temperature at a facility outside Ulaanbaatar, tested, and packed before it is exported.
>
> Manufacturing is by Monsubi Foods LLC. Import into Thailand is by YFamily Co., Ltd. We name both because a supplement whose manufacturer you cannot identify is a supplement you should be wary of.
>
> **CTA:** How it's made, step by step → `/our-story/how-its-made/`

**Image:** reuse `src/assets/science/stirring.*` (S-2). Do not regenerate.

## 6. What we will not do

**Component:** `TipList columns={2}`, plain cards, no icons

> **Heading:** Some things we have decided not to do
> **Sub:** It is easier to trust a company that has told you where its limits are.

| Title | Body |
|---|---|
| We will not claim it cures anything | It is a food supplement. We describe what is in it and what is generally known about those nutrients, and we stop there. |
| We will not use before-and-after imagery | There is no honest version of it for a product like this. |
| We will not invent reviews or ratings | We have not launched. Anyone showing you five stars before launch is showing you something they made up. |
| We will not source outside the season | If there is no milk, there is no batch. We would rather be out of stock than substitute. |
| We will not claim registration we do not hold | Thai FDA registration is in progress. It will be published here when it is issued, and not before. |
| We will not romanticise the herders | They are producers running a business in a hard climate. That is more interesting than the alternative. |

> This section is the trust engine of the whole page. It costs nothing, is entirely honest, and is the thing a sceptical reader will remember. Do not cut it for length.

## 7. Read further

**Component:** `CardGrid columns={2}` of `ContentCard`

| Eyebrow | Title | Excerpt | Href |
|---|---|---|---|
| Our Story | The steppe | The landscape, the season, and why both of them limit what we can make. | `/our-story/the-steppe/` |
| Our Story | How it's made | From the milking pail to the sealed sachet, in seven steps. | `/our-story/how-its-made/` |
| Our Story | Land and herders | Who we buy from, how they are paid, and what we do about the land. | `/our-story/land-and-herders/` |
| Our Story | Our research | What is actually known about fermented mare's milk, and what is not. | `/our-story/our-research/` |

## 8. Closing CTA

**Component:** `ClosingCTA`, shared bookend

> **Heading:** From there to your kitchen
> **Body:** One box is twenty-five mornings of it.
> **Primary:** See the products → `/products/`
> **Secondary:** How it's made → `/our-story/how-its-made/`

---

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| < 768px | Chapter hero `min-h-[600px]`, text block full-width with 20px padding, `<h1>` at 40px. Media rows stack image-first. `TipList` 1 column. `CardGrid` 1 column |
| 768–1023px | Media rows side-by-side. `TipList` 2 columns. `CardGrid` 2 columns |
| ≥ 1024px | Hero `min-h-[760px]`, `<h1>` at `display-1`. Full 48px padding |
| ≥ 1600px | Hero uses the 2400px source; text block stays at 620px and does not drift right — anchor it to the container, not the viewport |

## Accessibility notes

- One `<h1>` — "Where it comes from" — inside the chapter hero, `tabindex="-1"`
- **The hero overlay contrast must be measured on the exported image**, at the exact position the text block sits, at every breakpoint. Cream on the gradient must reach 4.5:1. If it does not, deepen the gradient rather than moving the text
- Breadcrumbs sit in `cream/70` on the hero — verify this specific pairing reaches 4.5:1 too; it is the easiest thing on the page to get wrong
- The `PullQuote` is a `<p>`, not a heading
- `TipList` renders a `<ul>`; each card's title is a `<h3>`
- All four story images are informational and carry real alt text

## SEO notes

| Element | Value |
|---|---|
| `<title>` | Our Story — Fermented Mare's Milk from Töv Province · Steppe Gut |
| Meta description | Where Steppe Gut comes from: the Mongolian steppe, the herding families we buy from, the five-month milking season, and the things we have decided not to claim. |
| `<h1>` | Where it comes from |
| JSON-LD | `AboutPage` + `Organization` with `foundingLocation`, `address`, and the manufacturer named |
| OG image | O-1, cropped to 1200 × 630 |
| Internal links | 4 children, `/products/`, `/how-it-works/` |
| Target queries | "where does fermented mare's milk come from", "Mongolian mare's milk", "kumis Mongolia", "Steppe Gut origin" |

## Developer notes

- Route `/our-story/`, lazy-loaded
- O-1 is the LCP element: eager, `fetchpriority="high"`, explicit dimensions, and a 1200px source served below the `md` breakpoint. It is the largest image on the site — hold it to 260 KB compressed at 2400px
- Reuses `MediaTextRow`, `StatBand`, `PullQuote`, `TipList`, `CardGrid`, `ContentCard`, `ClosingCTA`. The only new pattern is the chapter hero, which is `Section bleed` plus an overlay — **build it as `ChapterHero`** because `/our-story/the-steppe/` and each PDP's provenance section reuse it
- Three new images (O-1, O-2, O-3); O-4 onward belong to the child pages
- The "What we will not do" list is content, not chrome — put it in `src/data/commitments.js` so `/our-story/our-research/` and `/faq/` can reference the same items without them drifting apart
