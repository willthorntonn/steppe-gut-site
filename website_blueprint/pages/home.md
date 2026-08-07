# Page — Home `/`

## Summary

The homepage's only job is to take a person who has never heard of fermented mare's milk and, in one scroll, make them able to say what Steppe Gut is, where it comes from, and why anyone would take it — then hand them to the right depth of the site. It does **not** try to sell. It tries to make selling possible later.

The reference site's homepage was studied closely and one thing about it is worth carrying: **it never asks for a purchase.** Six sections, one soft CTA, and every route out leads to education. For a brand whose category is unfamiliar, that restraint is the correct strategy, and it happens to match Steppe Gut's tonal instincts exactly.

## Purpose

- **Website goals served:** education, trust, brand storytelling, product understanding
- **Journey questions answered (`SG-PROJECT_CONTEXT.md`):** 1 (what is this?), 2 (why does it exist?), 3 (why trust it?), 4 (why Mongolia?) — with 5 and 7 signposted rather than answered
- **Target audience:** first-time visitor, Thai woman 28–45, arriving from social, search or word of mouth, with zero category knowledge
- **User intent:** "What have I just landed on, and is it credible?"
- **Primary CTA:** *See the products* → `/products/`
- **Secondary CTA:** *How it works* → `/how-it-works/`

## Existing-code constraint

> **The hero and the trust panel already exist in `src/App.jsx` and must not be redesigned.** `SG-PROJECT_SPEC.md` §3 is explicit: the existing homepage is the foundation, not a draft. Sections 1 and 2 below are documented **as-built** so the rest of this blueprint has a consistent record; they are extended and componentised, never restyled. Sections 3–8 are new.

---

## Layout specification

| Property | Value |
|---|---|
| Page background | `cream` `#F5F1E9` |
| Container | `container` 1280px, padding per `03_design_system.md` §3.3 |
| Section rhythm | `section-gap` (64 / 88 / 128px) between all sections; `section-gap-lg` before section 8 |
| Vertical order | Fixed. See below |
| Max page weight | 1.2 MB total, LCP < 2.5 s |

## Section order and why each exists

| # | Section | Journey question | Why it exists here |
|---|---|---|---|
| 1 | Hero | 1 | Names the product and the promise before anything else can distract |
| 2 | Trust panel *(existing)* | 3 | Credibility arrives immediately after the claim, not 4 screens later. Every strong site in this category front-loads trust because an unknown brand has no borrowed credibility to spend |
| 3 | What it is | 1 | The plain-language definition. This section is the single most important on the page for a category-unfamiliar audience, and almost every wellness site omits it |
| 4 | Product rail | 1, 7 | Shows the three formats early so "what do I actually buy" has an answer before the long story |
| 5 | How it works | 5 | The mechanism, compressed to one row with a route to depth |
| 6 | Mongolia | 4 | Provenance as a full-bleed chapter break — the emotional centre of the page, placed after the rational sections so it lands as confirmation, not decoration |
| 7 | Ways in | 2, 6 | Three routes to depth (Science · Wellbeing · Story), so the page ends by opening rather than closing |
| 8 | Closing CTA | 7 | The single ask, at the point where the visitor has enough context for it to be reasonable |

---

# Section-by-section implementation

## 1. Hero *(existing — do not redesign)*

**As-built:** full-width staged product composition with the headline set in HTML over it, single primary CTA, custom `1395` breakpoint governing the staged image position.

**Only permitted changes:**
- Extract into `src/components/home/Hero.jsx` verbatim
- Add `fetchpriority="high"` and explicit `width`/`height` to the hero image if not already present
- Ensure the `<h1>` is the hero headline and carries `tabindex="-1"`
- Verify Thai headline does not overflow at 360px

## 2. Trust panel *(existing — do not redesign)*

**As-built:** the horizontal panel strip with the "+14K" count stat and sachet imagery. Extract to `src/components/home/PanelStrip.jsx` verbatim.

**Only permitted changes:** add `prefers-reduced-motion` handling to the count-up if absent; confirm the sachets do not overflow at the `1395` breakpoint (a fix already landed for this — do not regress it).

---

## 3. What it is

**Component:** `Section` + `Container width="content"` + `MediaTextRow` (`reverse=false`)

**Why this section exists:** the visitor does not know what fermented mare's milk is. Every other section on the page assumes they do. This one removes the assumption. It is written to be understandable by someone reading it aloud to a friend.

### Layout

| Property | Value |
|---|---|
| Container | `Container` 1280px |
| Layout < 768px | Image, then text, 32px gap |
| Layout ≥ 768px | `flex items-center`, 50/50, 64px gap. Image left |
| Image | 3:2, `radius-lg` |
| Heading | `<h2>`, `h2` token |
| Body | `body-lg`, max `52ch` |
| CTA | `Button link-arrow` |
| Reveal | Yes, `Reveal` with no delay |

### Copy

> **Eyebrow:** What it is
>
> **Heading:** Milk that has been changed by time
>
> **Body:**
> On the Mongolian steppe, mare's milk has been fermented in wooden vessels for as long as anyone has kept records of it. Left with its own cultures for a few days, the milk changes — its sugars break down, its proteins loosen, and it becomes something the body reads differently from fresh milk.
>
> Steppe Gut is that milk, fermented the same way, then gently dried into a fine powder. One sachet, once a day, in a glass of water. That is the whole product.
>
> **CTA:** How fermentation works → `/the-science/fermentation/`

### IMAGE PLACEHOLDER — H-3

**Purpose:** Show fermenting mare's milk as a real, physical, slightly unglamorous process — the visual proof that this is a traditional food, not a manufactured supplement.
**Aspect ratio:** 3:2 · **Display size:** 1200 × 800 · **Loading:** lazy
**Save to:** `src/assets/home/what-it-is.{avif,webp}`
**Suggested composition:** Three-quarter view of a wooden churn, slightly off-centre left, milk surface catching the light. Right third falls into shadow. Subject fills the lower two-thirds; the top third is dim ger wall.
**Alt text:** `A worn wooden fermentation churn holding mare's milk inside a Mongolian ger.`

**Higgsfield prompt:**
```
higgsfield generate create gpt_image_2 \
  --prompt "close editorial photograph of a worn oak fermentation churn bound with dark leather straps, filled with fresh mare's milk showing a faint uneven skin on its surface, standing on a packed earth floor inside a dim Mongolian ger with felt walls behind it, a single shaft of warm low morning light falling from the roof ring and raking across the milk surface while the right side of the vessel falls into deep green shadow, subject placed slightly left of centre with the upper third of the frame dim and empty, palette of deep forest green warm cream and aged gold, desaturated and muted, documentary texture with fine dust visible in the light shaft and a worn scuffed rim on the wood, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 3:2 --resolution 2k --wait
```

---

## 4. Product rail

**Component:** `CardRail` rendering `ProductCard`

**Why this section exists:** a visitor who is interested needs to know what "buying it" concretely means before they will invest in a long story. Three formats, three prices, no persuasion. Placed before the emotional sections so the page's commercial reality is stated plainly rather than sprung at the end.

### Layout

| Property | Value |
|---|---|
| Heading | Inside `Container`, `<h2>` left-aligned; "See all products" `link-arrow` right-aligned on `≥768px`, below heading otherwise |
| Track | Bleeds to the right edge; first card aligns to container left padding |
| Card | 280px mobile / 320px desktop, 16px gap, `scroll-snap-align: start` |
| Cards shown | 3 |
| Arrows | `≥1024px` only |

### Copy

> **Heading:** Three ways to take it
>
> **Sub:** The formula is the same in all three. Choose whichever fits your morning.
>
> **View all:** See all products → `/products/`

**Card 1 — Daily Sachets**
> Eyebrow: 25 × 10 g · Name: Daily Sachets · Descriptor: The standard format. One sachet in 100 ml of water. · CTA: Read the details

**Card 2 — Capsules**
> Eyebrow: 90 capsules · Name: Capsules · Descriptor: For travel, or if you would rather not taste it. · CTA: Read the details

**Card 3 — Refill Pouch**
> Eyebrow: 250 g pouch · Name: Refill Pouch · Descriptor: The same powder, loose, for people already in the habit. · CTA: Read the details

### IMAGE PLACEHOLDERS — H-4a, H-4b, H-4c

**Purpose:** Three product cards that read as one catalogue set — same surface, same light, same distance.
**Aspect ratio:** 4:5 (generate at 3:4, crop in CSS) · **Display size:** 640 × 800 · **Loading:** lazy
**Save to:** `src/assets/home/product-sachets.{avif,webp}` · `product-capsules.{avif,webp}` · `product-pouch.{avif,webp}`

> **Reuse note:** `product-sachets` and `product-capsules` were already generated in the earlier homepage pass and exist in `src/assets/home/`. **Reuse them. Do not regenerate.** Only `product-pouch` is new.

**Suggested composition (H-4c, the new one):** Stand-up pouch upright on the shared sandstone plinth, centred, deep forest-green backdrop, ~12% breathing room all sides so the 4:5 crop is safe.
**Alt text:** `A 250 g Steppe Gut refill pouch standing on a sandstone surface.`

**Higgsfield prompt (H-4c):**
```
higgsfield product-photoshoot create --mode product_shot \
  --prompt "premium fermented mare's milk supplement stand-up pouch standing upright on a rough sandstone plinth, deep forest-green seamless backdrop, single warm golden side light, calm luxury editorial catalog shot, subtle film grain" \
  --image src/hero-product-box.png --aspect_ratio 3:4
```

---

## 5. How it works

**Component:** `MediaTextRow` (`reverse=true`) + `StatBand`

**Why this section exists:** answers journey question 5 in one screen, and gives the visitor a reason to believe the product does anything at all. Deliberately compressed — the full argument lives on `/how-it-works/`. A homepage that tries to teach the whole mechanism loses everyone.

### Layout

Standard `MediaTextRow` reversed (image right on `≥768px`), followed by a `StatBand` on `sage-tint` with `section-gap-sm` between them.

### Copy

> **Eyebrow:** How it works
>
> **Heading:** Nothing here is added. It is unlocked.
>
> **Body:**
> Fermentation does the work that digestion would otherwise have to do. Lactose is broken down. Proteins are partly unfolded. What is left is a set of nutrients the body can reach more easily than it could in the original milk — among them vitamin C, omega-3 fatty acids, lactoferrin and a range of B vitamins.
>
> That is the whole mechanism. We are not adding anything to the milk. We are letting time take things apart.
>
> **CTA:** Read how it works → `/how-it-works/`

**StatBand (3 stats, `sage-tint`, count-up on):**

| Value | Label | Note |
|---|---|---|
| 4 | days of fermentation | Per batch, before drying |
| 5 | months of milking | June to October, when mares are in milk |
| 10 g | one daily serving | Mixed into 100 ml of water |

> **Claim check:** all three are compositional/provenance facts. None is an efficacy figure. Compliant with `02_brand_guidelines.md` §6.

### IMAGE PLACEHOLDER — H-5

**Purpose:** Make fermentation legible as a physical transformation — texture and structure, not a diagram.
**Aspect ratio:** 3:2 · **Display size:** 1200 × 800 · **Loading:** lazy
**Save to:** `src/assets/home/how-it-works.{avif,webp}`
**Suggested composition:** Overhead macro of fermented milk mid-swirl in a shallow dark ceramic bowl. Concentric currents, micro-bubbles, one bright raking highlight. Subject centred with even margin — the row places text beside, not over, so no negative-space constraint applies.
**Alt text:** `Fermented mare's milk swirling in a dark ceramic bowl, seen from above.`

**Higgsfield prompt:**
```
higgsfield generate create gpt_image_2 \
  --prompt "overhead macro editorial photograph of cream-white fermented mare's milk mid-swirl in a shallow hand-thrown dark forest-green ceramic bowl, delicate concentric currents and clusters of tiny micro-bubbles across the surface, one warm golden raking light from the left picking out the surface texture while the right edge falls into deep green shadow, the bowl's uneven glaze and a small chip on its rim visible, subject centred with even margin on all sides, palette of deep forest green warm cream and aged gold, desaturated, scientific beauty still life, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 3:2 --resolution 2k --wait
```

---

## 6. Mongolia — full-bleed chapter break

**Component:** `Section bleed size="lg"` with an internal `Container width="content"`

**Why this section exists and why it is here:** `SG-PROJECT_CONTEXT.md` asks that Mongolia be "a central part of the brand narrative rather than a minor detail." A logo footnote does not achieve that; a full-bleed break in the middle of the homepage does. Its placement is deliberate — it comes *after* the rational sections, so provenance reads as the reason the rational claims are true, rather than as atmosphere the visitor has to take on faith.

### Layout

| Property | Value |
|---|---|
| Section | `bleed`, `100vw`, min-height `560px` mobile / `720px` desktop |
| Image | Full-bleed `object-cover`, `object-position: center 40%` |
| Overlay | Linear gradient, `rgba(47,62,47,0.70)` at bottom-left → `rgba(47,62,47,0.10)` at top-right |
| Content block | `max-w-[560px]`, positioned bottom-left, `pb-16 lg:pb-24`, inside `Container` |
| Heading | `display-2`, `cream` |
| Body | `body-lg`, `text-on-dark-muted`, max 3 lines |
| CTA | `Button link-arrow` in `cream` |
| Motion | No parallax. The image is static |

### Copy

> **Eyebrow:** Töv Province, Mongolia
>
> **Heading:** It comes from somewhere specific
>
> **Body:**
> The mares are milked on open grassland between June and October, by families who have done it for generations and who are paid directly for it. We did not go looking for a story. We went looking for milk, and this is where it is.
>
> **CTA:** Where it comes from → `/our-story/`

### IMAGE PLACEHOLDER — H-6

**Purpose:** The emotional anchor of the entire site. Must feel like a real place at a real hour, not a desktop wallpaper.
**Aspect ratio:** 16:9 · **Display size:** 2048 × 1152 full-bleed · **Loading:** lazy
**Save to:** `src/assets/home/steppe-chapter.{avif,webp}`
**Suggested composition:** Wide steppe at golden hour, a loose herd mid-distance right of centre, low mountains behind. **Bottom-left 40% is open, dark, low-detail grass** so cream text sits cleanly on it.
**Alt text:** `Horses grazing on open Mongolian grassland in low evening light.`

**Higgsfield prompt:**
```
higgsfield generate create gpt_image_2 \
  --prompt "cinematic wide editorial photograph of the Mongolian steppe in the last hour before dusk, an endless sea of wind-brushed dry grass rolling toward low blue mountains, a loose herd of horses grazing in the mid-distance to the right of centre catching low amber sunlight along their backs, a vast sky with thin gilded cloud, the bottom left forty percent of the frame kept as open shadowed grass with very little detail so text can sit over it, palette of deep forest green warm cream and aged gold, desaturated and muted, quiet and monumental rather than dramatic, wind visibly moving the grass, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 16:9 --resolution 2k --wait
```

---

## 7. Ways in

**Component:** `CardGrid columns={3}` rendering `ContentCard`

**Why this section exists:** the homepage cannot answer everything, and shouldn't try. This section makes its incompleteness deliberate by naming the three depths and handing the visitor a choice. It is also the page's main internal-linking engine for SEO.

### Layout

| Property | Value |
|---|---|
| Container | `Container` 1280px |
| Grid | 1 col < 640px · 2 at `sm` · 3 at `lg`, `gap-6 lg:gap-8` |
| Heading | Centred `<h2>` + one-line sub, `container-content`, 48px above the grid |
| Cards | `ContentCard`, 3:2 image |
| Reveal | `Reveal stagger` |

### Copy

> **Heading:** Where to go next
>
> **Sub:** Three ways into the same subject. Start wherever you like.

| Eyebrow | Title | Excerpt | Href |
|---|---|---|---|
| The Science | What the research says, and what it doesn't | Fermentation, the microbiome, and the gut–skin connection — explained plainly, with the gaps left visible. | `/the-science/` |
| Wellbeing | Small things that actually help | Food, sleep, movement, stress and routine. Useful whether or not you ever buy anything from us. | `/wellbeing/` |
| Our Story | The steppe, the herders, the method | Where the milk comes from, who collects it, and how it becomes a powder. | `/our-story/` |

### IMAGE PLACEHOLDERS — H-7a, H-7b, H-7c

**Aspect ratio:** 3:2 · **Display size:** 640 × 427 · **Loading:** lazy
**Save to:** `src/assets/home/way-science.{avif,webp}` · `way-wellbeing.{avif,webp}` · `way-story.{avif,webp}`

**H-7a — The Science.** Macro of dried milk powder texture, raking light. Alt: `Fine ivory milk powder in raking light, close up.`
```
higgsfield generate create gpt_image_2 \
  --prompt "extreme macro editorial photograph of fine ivory milk powder drifted across a dark forest-green stone slab, individual grains and a soft sculptural ridge visible, hard warm golden light raking from the left across the surface texture leaving deep shadow in the troughs, a single fingerprint pressed into the powder at the edge of frame, palette of deep forest green and warm cream, desaturated, scientific still life, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 3:2 --resolution 2k --wait
```

**H-7b — Wellbeing.** A still morning table, no product. Alt: `A glass of water and a linen cloth on a sunlit table in the morning.`
```
higgsfield generate create gpt_image_2 \
  --prompt "quiet editorial still life photograph of a plain glass of water and a crumpled natural linen cloth on a worn oak table beside a window, low early morning sunlight falling across the table at a shallow angle casting long soft shadows, a few dust motes in the light, water surface faintly rippled, one water ring left on the wood, palette of warm cream soft sage and deep forest green shadow, desaturated and calm, generous empty space in the upper right, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 3:2 --resolution 2k --wait
```

**H-7c — Our Story.** Herder's hands at work. Alt: `A herder's hands binding a leather strap on a wooden vessel.`
```
higgsfield generate create gpt_image_2 \
  --prompt "close documentary photograph of a Mongolian herder's weathered hands tightening a dark leather binding strap around the staves of a wooden milk vessel, no face visible, worn wool sleeve cuff at the edge of frame, warm low daylight from a doorway to the left with the background falling into deep green shadow, dirt under the fingernails and a frayed edge on the leather, palette of deep forest green warm cream and aged gold, desaturated, respectful documentary framing, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 3:2 --resolution 2k --wait
```

---

## 8. Closing CTA

**Component:** `ClosingCTA`

**Why this section exists:** it is the only place on the homepage that asks for anything. Placed last, after four sections of explanation, so the ask is proportionate to what has been given.

### Copy

> **Heading:** Start with one sachet a day
>
> **Body:** Twenty-five mornings in a box. That is a reasonable place to find out whether it suits you.
>
> **Primary:** See the products → `/products/`
> **Secondary:** Read the questions first → `/faq/`

### IMAGE PLACEHOLDER — H-8

**Purpose:** The shared closing bookend, reused on `/our-story/`, `/the-science/` and `/wellbeing/`. Generate once.
**Aspect ratio:** 16:9 · **Display size:** 2048 × 1152 · **Loading:** lazy
**Save to:** `src/assets/shared/closing-bookend.{avif,webp}`
**Suggested composition:** Lone rider silhouetted against dusk sky. **Top third is clean sky** for the heading.
**Alt text:** `""` (decorative — the heading beside it carries the meaning)

**Higgsfield prompt:**
```
higgsfield generate create gpt_image_2 \
  --prompt "atmospheric wide editorial photograph of a single Mongolian herder on horseback silhouetted small against a vast dusk sky on open steppe, the last band of gold light lying along the horizon beneath deep indigo-green cloud, foreground grass in near darkness, the upper third of the frame kept as clean uncluttered sky for a headline, palette of deep forest green aged gold and deep indigo shadow, desaturated, romantic and monumental but restrained, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 16:9 --resolution 2k --wait
```

---

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| 360–639px | Everything single-column. `MediaTextRow` stacks image-first. `CardRail` shows 1.2 cards. `CardGrid` 1 column. Chapter break min-height 560px, text block full-width with 20px padding. Section gap 64px |
| 640–767px | `CardGrid` 2 columns. Rail 1.6 cards |
| 768–1023px | `MediaTextRow` goes side-by-side 50/50, 48px gap. Social rail appears. Section gap 88px |
| 1024–1279px | `CardGrid` 3 columns. Rail arrows appear. Full 48px page padding. Section gap 128px |
| ≥1280px | Desktop nav replaces hamburger. Container caps at 1280px |
| 1395px | **Verify the existing hero's staged-image maths still holds.** This breakpoint exists solely for it |
| ≥1600px | Chapter-break image uses the 2048px source; nothing else changes |

## Accessibility notes

- One `<h1>` — the hero headline. Every subsequent section heading is `<h2>`; `ContentCard` titles are `<h3>`
- Skip link is the first focusable element
- The chapter-break section's contrast must be measured on the actual exported image, not assumed. Cream on the gradient must reach 4.5:1 at the text's position
- `CardRail` is keyboard-scrollable and announced as a scrollable region
- Every `MediaTextRow` keeps image-before-text DOM order regardless of `reverse`, so screen-reader order is consistent down the page
- Count-up stats render their final value immediately under `prefers-reduced-motion`
- All decorative imagery (`H-8`) carries `alt=""`; all informational imagery carries real descriptions
- Test the full page with Thai copy at 360px before shipping — the headings are the tightest fit on the site

## SEO notes

| Element | Value |
|---|---|
| `<title>` | Steppe Gut — Fermented Mare's Milk from Mongolia |
| Meta description | A daily fermented mare's milk supplement from the Mongolian steppe. What it is, how it is made, and what the research does and does not show. |
| Canonical | `https://<domain>/` |
| `<h1>` | The hero headline (must exist — the reference site's homepage has no `<h1>` at all, which is a defect worth not repeating) |
| JSON-LD | `Organization` (name, logo, address, contact, sameAs socials) + `WebSite` with `SearchAction` |
| OG image | The chapter-break steppe image, 1200 × 630 crop |
| Internal links out | `/products/` ×2, `/how-it-works/`, `/the-science/` ×2, `/wellbeing/`, `/our-story/`, `/faq/` |
| hreflang | `en-TH` and `th-TH` pair, plus `x-default` |

## Developer notes

- Route: `/`. **Not** code-split — this is the entry point; lazy-loading it costs the LCP budget
- Component files: `src/components/home/{Hero,PanelStrip,WhatItIs,ProductRail,HowItWorks,SteppeChapter,WaysIn,ClosingCTA}.jsx`
- `Hero` and `PanelStrip` are extracted verbatim from the current `App.jsx`. **Diff them after extraction to prove nothing changed visually.**
- Product rail data comes from `src/data/products.js`. That file is a prerequisite for this section — if it does not exist yet, the rail may launch with provisional copy from this document, but must be retrofitted to the real data once Stage 3 lands
- `ProductCard` is first built in Stage 3 for `/products/`. If Home ships first, build the rail's cards as a thin local component and **retrofit to `ProductCard`** when Stage 3 completes. Do not leave two card implementations in the tree
- Hero image: eager, `fetchpriority="high"`, explicit dimensions. Everything else lazy
- The chapter-break image is the largest asset on the page — budget 220 KB compressed, and serve a 1024px source below the `md` breakpoint
- Wrap every section from 3 onward in `Reveal`. Sections 1 and 2 are above the fold and must not animate in
