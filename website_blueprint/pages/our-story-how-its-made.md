# Page — How It's Made `/our-story/how-its-made/`

## Summary

The production chain, end to end, in seven steps. The most concrete trust page on the site: it names the facility, describes the testing, and shows the parts of the process that are unglamorous.

The reference site's manufacturing page was one of the strongest pages in its whole architecture — a numbered narrative, each step with an image and a plain-English explanation, ending in a video and a route back to the products. That shape is adopted here.

## Purpose

- **Goals:** trust, education, brand storytelling
- **Journey questions:** 3 (why trust it?), 5 (how does it work?)
- **Audience:** the sceptic; also the trade buyer and the journalist
- **Intent:** "Show me the actual process"
- **Primary CTA:** *See the products* → `/products/`
- **Secondary CTA:** *What's inside* → `/products/whats-inside/`

## Layout

| Property | Value |
|---|---|
| Header | `PageHeader align="center"` — **not** a chapter hero. This page is procedural, and atmosphere would undercut it |
| Body | `ProcessSteps` at `container` width; narrative at `container-prose` |
| Rhythm | `section-gap` |

## Section order

| # | Section | Component | Why |
|---|---|---|---|
| 1 | Header | `PageHeader` | States the scope: pail to sachet |
| 2 | The seven steps | `ProcessSteps` | The spine of the page |
| 3 | What is tested | `ComparisonTable` | Turns "we test it" into something checkable |
| 4 | Who makes it | `MediaTextRow` | Names the manufacturer and importer |
| 5 | What we changed and what we did not | `TipList` | Distinguishes traditional from industrial honestly |
| 6 | Honest limits | `HonestLimits` | Standard |
| 7 | Closing CTA | `ClosingCTA` | |

---

# Copy

## 1. Page header

> **Eyebrow:** Production
> **Title (h1):** How it's made
> **Lead:** Seven steps between a mare on open grassland and a sealed sachet in Bangkok. Some of them are eight hundred years old and some of them are a stainless-steel dryer. We will tell you which is which.

## 2. The seven steps

**Component:** `ProcessSteps`, 7 steps, images on steps 1, 3, 5 and 7 only (a photograph per step becomes repetitive and doubles the page weight for no gain)

| # | Title | Body |
|---|---|---|
| One | Milking | Mares are milked in short sessions several times a day, on open ground, alongside their foals. Yield per session is small — this is not a dairy parlour and it cannot be made into one. |
| Two | Straining and cooling | The milk is strained through cloth and cooled as far as ambient conditions allow. It is handled fast, because fresh mare's milk begins to change within hours. |
| Three | Fermentation | Into a wooden churn that already carries an established culture from previous batches. Four days, stirred by hand many times a day. Nothing is inoculated from a packet and nothing is temperature-controlled beyond keeping the vessel out of direct sun. |
| Four | Collection | Fermented milk is collected from the families on a fixed schedule during the season and moved chilled to the facility outside Ulaanbaatar. |
| Five | Low-temperature drying | Water is removed at low temperature rather than by boiling. This preserves the heat-sensitive components — vitamin C in particular — and it is the step that makes export possible at all. It also ends the live culture. We say so plainly on [How It Works](/how-it-works/). |
| Six | Testing and blending | Each batch is tested before it is released. Batches from within a season are blended to even out the variation described on [The Steppe](/our-story/the-steppe/). Nothing from outside the season is ever blended in. |
| Seven | Filling and sealing | Powder is filled into sachets, capsules or pouches under controlled humidity and sealed. Batch and season are printed on every pack. |

### IMAGE PLACEHOLDERS — O-6, O-7, O-8, O-9

**O-6 — Step one, milking.** Reuse `src/assets/story/people.*` (O-3). No new asset.

**O-7 — Step three, fermentation.** Reuse `src/assets/science/stirring.*` (S-2). No new asset.

**O-8 — Step five, drying.**
**Purpose:** Show the industrial step honestly — clean, plain, unromantic.
**Aspect ratio:** 3:2 · **Display size:** 1200 × 800 · **Loading:** lazy · **Save to:** `src/assets/story/drying-facility.{avif,webp}`
**Alt text:** `Stainless steel drying equipment in a plain production room.`
```
higgsfield generate create gpt_image_2 \
  --prompt "plain editorial documentary photograph of brushed stainless steel low-temperature drying equipment in a clean simple production room, a run of pipework and one round inspection port with pale powder visible behind the glass, cool even daylight coming through a high window on the left with the far end of the room falling into shadow, small honest details of use such as a scuffed floor edge and a coiled hose, no people, palette of cool steel grey warm cream and deep forest green shadow, desaturated and muted, matter-of-fact industrial documentary not a glossy factory advertisement, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 3:2 --resolution 2k --wait
```

**O-9 — Step seven, sealed packs.**
**Purpose:** The end of the chain, connecting back to the product the visitor can buy.
**Aspect ratio:** 3:2 · **Display size:** 1200 × 800 · **Loading:** lazy · **Save to:** `src/assets/story/sealed-packs.{avif,webp}`
**Alt text:** `Sealed cream sachets laid in rows on a steel surface.`
```
higgsfield product-photoshoot create --mode conceptual_product \
  --prompt "rows of sealed cream supplement sachets laid neatly on a brushed steel surface just after filling, seen at a low three-quarter angle, cool even overhead daylight with a warm reflection along one edge, plain and factual rather than glossy, subtle film grain" \
  --image src/sachets-cutout.png --aspect_ratio 3:2
```

## 3. What is tested

**Component:** `ComparisonTable` — a simple two-column table

> **Heading:** What each batch is tested for
> **Sub:** Before release, and again on arrival in Thailand.

| Test | Why |
|---|---|
| Moisture content | Powder above a moisture threshold will not keep. This is the main determinant of shelf life. |
| Microbiological screening | Standard food-safety screening for pathogens and total viable count. |
| Protein, fat and lactose | Confirms the batch sits within the expected range for the season. |
| Vitamin C | The most heat-sensitive component, and therefore the best single indicator that drying was done correctly. |
| Heavy metals | Screened because the animals graze unimproved open land and this is the responsible thing to check. |
| Allergen verification | Confirms the declared allergen — milk — and screens for unintended cross-contact. |

**Below the table:**
> If you want to see a certificate of analysis for the batch you have, write to us with the batch number and we will send it.

> **Implementer note:** that last sentence is a real operational commitment, not copy. **Confirm with the client that the business can honour it before publishing it.** A published promise that is not honoured is worse than no promise.

## 4. Who makes it

**Component:** `MediaTextRow`, image left (reuse O-8)

> **Eyebrow:** The companies
> **Heading:** Named, not implied
> **Body:**
> Manufacturing is by **Monsubi Foods LLC**, in Mongolia. Import and distribution in Thailand is by **YFamily Co., Ltd.**, 45/1 Silom, 19 Building, 4th Floor, Room 415, Trok Weth, Silom Road, Silom Subdistrict, Bang Rak, Bangkok 10500. The brand is owned by **S72 Strategic Co., Ltd.**
>
> A supplement whose manufacturer you cannot identify is a supplement worth being cautious about. These are the three companies involved and there are no others.

## 5. What we changed and what we did not

**Component:** `TipList columns={2}`

> **Heading:** Traditional where it matters, modern where it has to be

| Title | Body |
|---|---|
| Unchanged — the fermentation | Same vessels, same cultures, same four days, same people. We buy the output; we did not specify the process. |
| Unchanged — the season | Five months, and no substitution outside it. |
| Changed — drying | Low-temperature industrial drying. There is no traditional method of making this into a stable exportable powder, and pretending otherwise would be a lie. |
| Changed — testing | Batch testing to modern food-safety standards. Tradition does not include a heavy-metals screen. |
| Changed — packaging | Sealed sachets under controlled humidity. Necessary for shelf life. |
| Unchanged — what is in it | Nothing is added at any stage after fermentation. |

## 6. Honest limits

**Component:** `HonestLimits`

> **Heading:** What we don't know yet
>
> Fermentation carried out in individual family vessels, rather than in a single controlled tank, produces more variation than an industrial process would. We manage that by testing and by blending within a season, but we do not eliminate it, and we are not going to describe our product as standardised when it is not.
>
> We do not yet publish per-batch analysis on this site. We intend to. Until then, batch certificates are available on request.

## 7. Closing CTA

**Component:** `ClosingCTA`, shared bookend

> **Heading:** That is the whole chain
> **Body:** Seven steps, three companies, one season a year.
> **Primary:** See the products → `/products/`
> **Secondary:** What's inside → `/products/whats-inside/`

---

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| < 768px | Steps fully stacked, image above text within each step, numerals at `display-2`. Testing table scrolls horizontally with a sticky first column. `TipList` 1 column |
| 768–1023px | Steps side-by-side, alternating. `TipList` 2 columns |
| ≥ 1024px | Steps gain the `gold/30` connector rule in the gutter. Testing table fits without scroll |

## Accessibility notes

- One `<h1>`. Each step is `<h3>` inside an `<ol>`; decorative numerals `aria-hidden` with the ordinal repeated in the heading text
- Steps without images must not leave an empty grid cell — the text column spans full width for those steps rather than sitting beside a gap
- The testing table is a real `<table>` with `<caption>` and `scope`
- The company address in §4 is marked up as a `<address>` element
- Batch-certificate email link is a real `mailto:` with a pre-filled subject

## SEO notes

| Element | Value |
|---|---|
| `<title>` | How It's Made — From Milking to Sachet · Steppe Gut |
| Meta description | The seven steps between a mare on Mongolian grassland and a sealed sachet: fermentation, low-temperature drying, batch testing, and who manufactures it. |
| `<h1>` | How it's made |
| JSON-LD | `HowTo` is **appropriate here** (unlike `/how-it-works/`) — this is a genuine sequential process. Emit `HowTo` with seven `HowToStep` entries. Also `Article` |
| Internal links | `/how-it-works/`, `/our-story/the-steppe/`, `/products/whats-inside/`, `/products/` |
| Target queries | "how is fermented mare's milk made", "how is kumis produced", "mare's milk powder manufacturing" |

## Developer notes

- Route `/our-story/how-its-made/`, lazy-loaded
- **Only two new images** (O-8, O-9). Steps 1 and 3 reuse O-3 and S-2. Do not regenerate them
- `ProcessSteps` must support an optional image per step — build that variant here if it was not built for `/how-it-works/`
- Company details come from a single `src/data/company.js` used by the footer, `/contact/`, `/legal/terms/` and this page. One address, one place in the codebase
- The testing table content lives in `src/data/testing.js` so `/stockists/` can reuse it for trade buyers
- Confirm the batch-certificate commitment in §3 with the client before this page ships
