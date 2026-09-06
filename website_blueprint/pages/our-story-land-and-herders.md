# Page — Land & Herders `/our-story/land-and-herders/`

## Summary

The sourcing-ethics and environment page. The reference site keeps an equivalent "social mission" page and it is, tellingly, one of the least specific pages on that site — full of intention and thin on mechanism. That is the failure mode to avoid: **this page must be about arrangements, not values.** Who is paid, how much, on what terms, and what happens to the land.

## Purpose

- **Goals:** trust, brand storytelling
- **Journey questions:** 3 (why trust it?), 4 (why Mongolia?)
- **Audience:** the ethically-attentive buyer, and press
- **Intent:** "Is this extractive?"
- **Primary CTA:** *The steppe* → `/our-story/the-steppe/`
- **Secondary CTA:** *See the products* → `/products/`

## Layout

| Property | Value |
|---|---|
| Header | `PageHeader align="left"` |
| Body | `container-prose` for narrative, `container` for media rows, `container-content` for the commitments grid |
| Rhythm | `section-gap` |

## Section order

| # | Section | Component | Why |
|---|---|---|---|
| 1 | Header | `PageHeader` | Sets the honest frame |
| 2 | How the herders are paid | `MediaTextRow` | The single most important fact on the page. First |
| 3 | What we ask for and what we don't | `TipList columns={2}` | Defines the relationship's boundaries |
| 4 | The land | `MediaTextRow` reversed | Overgrazing is the real environmental issue here — address it directly |
| 5 | Packaging | `ComparisonTable` | Concrete, checkable, unglamorous |
| 6 | What we have not solved | `HonestLimits` | The page's credibility rests on this section |
| 7 | Closing CTA | `ClosingCTA` | |

---

# Copy

## 1. Page header

> **Eyebrow:** Sourcing
> **Title (h1):** Land and herders
> **Lead:** A page about arrangements rather than intentions. Who we buy from, what they are paid, what we ask of the land, and the parts we have not worked out yet.

## 2. How the herders are paid

**Component:** `MediaTextRow`, image left (reuse O-3)

> **Eyebrow:** The arrangement
> **Heading:** Priced before the season, paid per litre
> **Body:**
> We agree a price per litre with each family before the milking season begins, not after it ends. That means the price does not move against them if the season turns out to be a good one, and it does not move against us if it is a poor one.
>
> Families are not exclusive to us. They sell to whoever they choose, including into the domestic market, and there is no contract that prevents it. We are one buyer among several, which is the position we would rather be in — a supplier who cannot leave is not a partner.
>
> Payment is direct and in full on collection. There is no intermediary taking a margin between the family and us.

## 3. What we ask for and what we don't

**Component:** `TipList columns={2}`

> **Heading:** The boundaries of the relationship

| Title | Body |
|---|---|
| We ask for hygiene standards | Clean vessels, clean cloth, fast cooling. These are specified and they are checked. |
| We ask for traceability | Which family, which week. It is on the batch record. |
| We do not specify the fermentation | Vessels, cultures and technique are theirs. We buy the result. |
| We do not require exclusivity | They sell to whoever they want. |
| We do not fund herd expansion | Increasing herd size to meet our demand would push the grazing pressure described below. We would rather buy less. |
| We do not use the word "partner" loosely | It is a purchase agreement. Calling it a partnership would flatter us more than it would describe anything. |

## 4. The land

**Component:** `MediaTextRow`, image right

> **Eyebrow:** Grazing
> **Heading:** The honest environmental issue is overgrazing
> **Body:**
> Mongolia's grasslands are under real and well-documented pressure from rising livestock numbers. Any company buying animal products from this landscape is operating inside that problem, and it would be dishonest to write a sustainability page that talked about packaging and skipped it.
>
> Our position is narrow but specific: we buy from existing herds and we do not fund expansion. If demand outgrows what the current families produce in a season, we go out of stock. We do not offer a price that makes keeping more horses attractive.
>
> That is a constraint on our own growth, and it is the only lever we actually control.

### IMAGE PLACEHOLDER — O-10

**Purpose:** The land as a working resource under pressure — not a pristine wilderness postcard.
**Aspect ratio:** 3:2 · **Display size:** 1200 × 800 · **Loading:** lazy
**Save to:** `src/assets/story/grazing.{avif,webp}`
**Alt text:** `Grazed grassland with worn animal tracks running across it toward low hills.`

```
higgsfield generate create gpt_image_2 \
  --prompt "wide editorial documentary photograph of grazed Mongolian grassland with worn parallel animal tracks running across it toward low bare hills, the grass visibly short and patchy with bare earth showing between tufts, flat cool overcast afternoon light, a distant small herd barely visible on the ridge line, palette of pale straw dusty brown and cool grey-green, desaturated and muted, honest unflattering land documentary rather than a scenic wilderness photograph, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 3:2 --resolution 2k --wait
```

## 5. Packaging

**Component:** `ComparisonTable`

> **Heading:** Packaging, plainly
> **Sub:** What each pack is made of, and what you can do with it.

| Pack | Material | Recyclable in Thailand | Notes |
|---|---|---|---|
| Sachet | Multi-layer laminate | **No** | A moisture barrier is required for shelf life and there is currently no mono-material laminate that achieves it at this scale. This is the worst part of our packaging and we are not going to describe it as anything else. |
| Sachet carton | Uncoated board | Yes | Recyclable with paper. |
| Capsule bottle | PET with a polypropylene cap | Yes | Both are widely accepted. Remove the cap. |
| Refill pouch | Multi-layer laminate | **No** | Less material per serving than 25 sachets, which is the only reason it is better. |
| Shipping box | Corrugated board | Yes | No plastic void fill. |

**Below the table:**
> If reducing packaging matters to you, the pouch uses roughly a third of the laminate per serving that individual sachets do. That is a real difference and it is the honest recommendation.

> This table is the most persuasive thing on the page precisely because it declines to claim a win. A sustainability section that admits its worst material is trusted; one that does not is skimmed.

## 6. What we have not solved

**Component:** `HonestLimits`

> **Heading:** What we haven't solved
>
> The sachet laminate is not recyclable and we do not have a replacement. We have looked; the compostable and mono-material options we have tested do not hold moisture out for long enough, and shipping a product that degrades in transit would be worse.
>
> We do not currently publish the price per litre we pay. The families we buy from have asked us not to, because it affects their negotiations with other buyers. We think that is a fair reason and we are respecting it, while acknowledging that it makes this page less verifiable than we would like.
>
> We have no third-party certification for any of the above. We have not sought one, and until we do, everything on this page is our own account of our own arrangements.

## 7. Closing CTA

**Component:** `ClosingCTA`, shared bookend

> **Heading:** The grass sets the limit
> **Body:** Everything else follows from it.
> **Primary:** More about the steppe → `/our-story/the-steppe/`
> **Secondary:** See the products → `/products/`

---

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| < 768px | Media rows stack image-first. `TipList` 1 column. Packaging table scrolls horizontally, first column sticky |
| 768–1023px | Media rows side-by-side. `TipList` 2 columns |
| ≥ 1024px | Packaging table fits at `container-content` without scroll |

## Accessibility notes

- One `<h1>`. `TipList` titles are `<h3>`
- The packaging table's "No" values must be conveyed as text, never as a red cross alone
- The `HonestLimits` panel uses `sage-tint` with `forest` text — verify it reaches 4.5:1 (it does at these values, but re-check if the tint is ever adjusted)
- Table wrappers are focusable scroll regions with accessible names

## SEO notes

| Element | Value |
|---|---|
| `<title>` | Land & Herders — Sourcing and Packaging · Steppe Gut |
| Meta description | How we buy mare's milk from herding families in Töv Province, what we ask for, what our packaging is made of, and the problems we have not solved. |
| `<h1>` | Land and herders |
| JSON-LD | `Article` |
| Internal links | `/our-story/the-steppe/`, `/our-story/how-its-made/`, `/products/` |
| Target queries | "Steppe Gut sourcing", "is mare's milk ethical", "Mongolian herders milk price", "supplement sachet recycling Thailand" |

## Developer notes

- Route `/our-story/land-and-herders/`, lazy-loaded
- One new image (O-10). Section 2 reuses O-3
- Packaging data lives in `src/data/packaging.js` — the PDPs each reference their own row, so the material description exists once
- No new components
- **The claims on this page are operational, not creative.** Every one of them — pre-season pricing, non-exclusivity, direct payment, no expansion funding, no certification — must be confirmed as factually true with the client before publication. If any is not currently true, cut it. A false ethics page is the single most damaging thing this site could publish
