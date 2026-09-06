# Page — A Woman's Guide to Gut Health `/the-science/womens-guide/`

## Summary

A sub-hub inside `/the-science/`, holding three life-stage articles. This is the highest-affinity content on the entire site for the primary audience — Thai women 28–45 — and it is the reason the navigation carries a third level at all.

The reference site maintains an equivalent women's guide with three life-stage children and gives it a featured slot on its science hub. That structural decision is worth understanding: it is the only place on that site where the education content is segmented by *who is reading* rather than by *what the subject is*, and it is the segment with the most search demand and the least good writing available elsewhere.

## Purpose

- **Goals:** education, trust, brand storytelling
- **Journey questions:** 2, 5
- **Audience:** the core customer, reading about herself rather than about a product
- **Intent:** "Does any of this apply to me specifically?"
- **Primary CTA:** the relevant life-stage article
- **Secondary CTA:** *The microbiome* → `/the-science/the-microbiome/`

## Layout

| Property | Value |
|---|---|
| Header | `PageHeader align="center"` |
| Body | `container-prose` for narrative; `container` for media rows |
| Rhythm | `section-gap` |
| Register | Warmer than the other science pages, and no less careful. Not softer on evidence |

## Section order

| # | Section | Component | Why |
|---|---|---|---|
| 1 | Header | `PageHeader` | Frames the guide honestly, including who it is *not* for |
| 2 | Why this has its own guide | `Prose` | Justifies the segmentation with a real reason, not a marketing one |
| 3 | The three stages | `MediaTextRow` ×3 | Routes to the children with substance |
| 4 | What is common across all three | `TipList columns={2}` | The practical advice that does not change by stage |
| 5 | Honest limits | `HonestLimits` | Mandatory, and unusually important here |
| 6 | Closing CTA | `ClosingCTA` | |

---

# Copy

## 1. Page header

> **Eyebrow:** The Science
> **Title (h1):** A woman's guide to gut health
> **Lead:** Hormonal change affects digestion, and digestion affects how hormonal change feels. This guide covers three stages of life where that interaction is most noticeable. It is not medical advice, it is not a substitute for a doctor, and it will not tell you that a supplement solves any of it.

## 2. Why this has its own guide

**Component:** `Container width="prose"` + `Prose`

> **Heading:** Why this is a separate guide
> **Body:**
> Most writing about gut health is written as though the reader's internal chemistry were constant. For roughly half the population it is not, and the variation is neither small nor occasional.
>
> Oestrogen and progesterone both affect how quickly food moves through the digestive tract. That is not a controversial claim — it is why many women notice their digestion changing predictably across a month, and why it changes again during perimenopause and after menopause. There is also an established two-way relationship between gut bacteria and circulating oestrogen, though the practical significance of it is still being worked out.
>
> We have separated this content because the general advice — eat more plants, sleep, move — is true but incomplete if it ignores a variable that changes weekly for a large part of the audience.

## 3. The three stages

**Component:** three `MediaTextRow`s, alternating

**Row 1 — Your monthly cycle** *(image left)*
> **Eyebrow:** Life stage
> **Heading:** Your monthly cycle
> **Body:** Why digestion changes across a month, which phases are typically hardest, and what actually helps — including the things that help mainly because they are gentle rather than because they are effective.
> **CTA:** Read about the cycle → `/the-science/womens-guide/monthly-cycle/`

**Row 2 — Perimenopause** *(image right)*
> **Eyebrow:** Life stage
> **Heading:** Perimenopause
> **Body:** The years of fluctuation before periods stop. Digestion, sleep and appetite frequently change during this period, often before anyone has connected them to hormones at all.
> **CTA:** Read about perimenopause → `/the-science/womens-guide/perimenopause/`

**Row 3 — Menopause** *(image left)*
> **Eyebrow:** Life stage
> **Heading:** Menopause
> **Body:** What changes after oestrogen settles at a lower level — bone density, gut transit, and the nutritional considerations that become more relevant rather than less.
> **CTA:** Read about menopause → `/the-science/womens-guide/menopause/`

### IMAGE PLACEHOLDERS — S-9, S-10, S-11

All three follow one rule: **no faces, no bodies, no skin, no cosmetic styling.** These pages sit close to a sensitive subject and imagery that reads as beauty advertising would undermine the writing entirely. Each is a quiet interior still life in the same register as S-4.

**S-9 — Monthly cycle.** Alt: `A ceramic cup and a folded wool blanket on a chair by a window.`
```
higgsfield generate create gpt_image_2 \
  --prompt "quiet editorial interior photograph of a plain sage-green ceramic cup resting on the arm of a wooden chair with a heavy folded wool blanket draped over its back, low grey afternoon light entering through a window to the left, faint steam rising from the cup, worn upholstery and one loose thread on the blanket, palette of soft sage warm cream and deep forest green shadow, desaturated and calm, no people no skin no products, generous empty space on the right, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 3:2 --resolution 2k --wait
```

**S-10 — Perimenopause.** Alt: `An open window with a light curtain moving in the morning air.`
```
higgsfield generate create gpt_image_2 \
  --prompt "quiet editorial interior photograph of an open wooden window with a thin unbleached linen curtain lifting slightly in the morning air, soft early light falling across a bare plaster wall and a worn windowsill, a single dry stem in a small ceramic jar on the sill, flaking paint on the frame, palette of warm cream soft sage and deep forest green shadow, desaturated and still, no people no skin no products, generous empty space in the lower left, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 3:2 --resolution 2k --wait
```

**S-11 — Menopause.** Alt: `Late afternoon light across a plain wooden table and an empty bowl.`
```
higgsfield generate create gpt_image_2 \
  --prompt "quiet editorial still life photograph of a worn oak table with a single empty hand-thrown cream ceramic bowl and a folded linen napkin, warm late afternoon light entering low from the right and casting long soft shadows across the grain of the wood, small scratches and one old ring mark in the surface, palette of warm cream aged oak and deep forest green shadow, desaturated and settled, no people no skin no products, generous empty space in the upper left, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 3:2 --resolution 2k --wait
```

## 4. What is common across all three

**Component:** `TipList columns={2}`

> **Heading:** What holds true at every stage

| Title | Body |
|---|---|
| Fibre is the most reliable lever | More plants, and more different plants. It is dull advice and it is the best-supported advice there is. |
| Sleep affects digestion directly | Disrupted sleep changes gut transit and appetite regulation. If you can only change one thing, change this one. |
| Hydration matters more than people expect | Particularly where transit has slowed. |
| Track before you change anything | A few weeks of noting what happens and when is worth more than any product, and it is free. |
| Talk to a doctor about symptoms | Persistent digestive change deserves a medical opinion, not a supplement. We mean this literally. |
| No supplement addresses hormonal change | Including ours. Anything marketed to you as a hormonal solution is overreaching. |

## 5. Honest limits

**Component:** `HonestLimits`

> **Heading:** What we don't know yet
>
> The interaction between hormones, the gut and how a person feels is an area with real research behind it and a great deal of confident marketing running ahead of that research. The mechanisms described in these pages are plausible and in some cases well evidenced; their practical significance for any individual is far less clear.
>
> Steppe Gut is a food supplement containing nutrients naturally present in mare's milk. It has no established effect on hormonal symptoms of any kind, we have not studied it in this context, and we will not market it as though we had.
>
> Nothing on these pages is medical advice. If something has changed and it concerns you, see a doctor rather than a supplement company.

## 6. Closing CTA

**Component:** `ClosingCTA`, shared bookend

> **Heading:** Start with the stage you are in
> **Body:** Or read all three — they overlap more than they differ.
> **Primary:** Your monthly cycle → `/the-science/womens-guide/monthly-cycle/`
> **Secondary:** The microbiome → `/the-science/the-microbiome/`

---

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| < 768px | Rows stack image-first. `TipList` 1 column |
| 768–1023px | Rows side-by-side, alternating. `TipList` 2 columns |
| ≥ 1024px | Prose at 680px. Third-level nav items reachable in the mega-menu |

## Accessibility notes

- One `<h1>`. Breadcrumbs: Home / The Science / A Woman's Guide
- This page is three levels deep. **Breadcrumbs are essential here**, not optional — a search arrival has no other route to the parent hub
- `TipList` titles are `<h3>`
- `HonestLimits` heading is a real `<h2>`
- The medical-advice disclaimer in §5 must be visible text, never inside a collapsed element

## SEO notes

| Element | Value |
|---|---|
| `<title>` | A Woman's Guide to Gut Health · Steppe Gut |
| Meta description | How hormonal change across the monthly cycle, perimenopause and menopause interacts with digestion — with the evidence and its limits stated plainly. |
| `<h1>` | A woman's guide to gut health |
| JSON-LD | `CollectionPage` + `ItemList` of the three life-stage articles. **Not** `MedicalWebPage` |
| Internal links | 3 children, `/the-science/the-microbiome/`, `/wellbeing/rest/`, `/wellbeing/nourish/` |
| Target queries | "gut health women", "hormones and digestion", "does the menstrual cycle affect digestion" |
| Strategic note | This cluster has the strongest organic potential on the site. It is also the cluster where overclaiming would do the most damage — the audience is well-informed and has been marketed to badly before |

## Developer notes

- Route `/the-science/womens-guide/`, lazy-loaded
- Three new images (S-9, S-10, S-11) — all `generate create`, all interior still lifes, none containing a person
- Reuses `PageHeader`, `MediaTextRow`, `TipList`, `HonestLimits`, `ClosingCTA`. No new components
- The three children share this page's `HonestLimits` text — put it in `src/data/womensGuide.js` as a shared `medicalDisclaimer` field so it cannot drift between four pages
- The mega-menu's third level is driven by the same data file (see `01_navigation.md` §3.3)
