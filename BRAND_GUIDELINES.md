# Steppe Gut — Brand Guidelines

Derived from **Steppe Gut Corporate Identity: Design Guidelines, Product Mockups & Fabrication Prints**
S72 Strategic Co., LTD. · Product Development Division · Final Revision 27 May 2026

---

## 1. At a glance

| | |
|---|---|
| **Product** | Steppe Gut |
| **Category** | Fermented Mare's Milk supplement — positioned as a "Functional Luxury" |
| **Tagline** | *Natural Radiance from within* |
| **Pack descriptor** | A premium daily ingestible formula with fermented mare's milk to nourish your natural radiance from within |
| **Key actives (front-of-pack)** | Vitamin C · Omega-3 · Fermented Mare's Milk |
| **Company** | S72 Strategic Co., LTD. |
| **Contact** | info@s72strategic.com · +66-97-251-5911 |

Quick reference:

- **Colours:** Forest `#2F3E2F` · Cream `#F5F1E9` · Gold `#D4AF37` · Sage `#7D9D75` · Earth `#442D1C` (muted variant)
- **Type:** EB Garamond (primary/serif) · Inter (secondary/sans) · Noto Sans Thai (Thai)

---

## 2. Brand vision & positioning

Steppe Gut is a fermented mare's milk product framed not as a beverage but as a **"Functional Luxury" supplement**. The positioning statement: *"Natural Radiance from within."* Beyond being nutritionally dense, the product is marketed as helping the body "remember what it was always meant to know" — a wellness-from-within, gut-health-meets-skin narrative.

The visual tone is premium, natural, and restrained: forest greens, ivory, gold, and steppe-landscape / equine imagery (the mare's milk origin story, "Product of Mongolia").

---

## 3. Target consumer

**Working Women — age 28 to 45.**

- Professional working individuals navigating high-pressure environments with curated, effortless grace.
- Time-poor; want a simple, beneficial health routine.
- Believe in gut-health science and understand the gut–skin connection.

---

## 4. Logo system

**Symbolism**

- **Horse head (logomark)** — strength & purity.
- **Female figure motif** — elegance & natural beauty.
- **Circular lockup** — unity and a complete cycle of wellness.

**Lockups**

- **Primary logo — circular lockup.** Horse-head logomark centred in a ring, with `NATURAL RADIANCE FROM WITHIN` arced along the top and `STEPPE GUT` arced along the bottom. This is the default, most-used mark for immediate brand recognition.
- **Secondary logo — landscape/horizontal lockup.** Horse-head logomark to the left of the `STEPPE GUT` wordmark. Used where a horizontal format fits better.
- **Isolated logomark.** The horse head can stand alone for minimal brand recognition.

**Colourways**

- **Green** (page 8) and **Gold** (page 9) variations of the circular lockup.
- Verified to work on: dark forest green, cream/ivory, sage green, and white backgrounds.

### ✅ Chosen logo for the website

| Use case | Lockup | Colorway |
|---|---|---|
| **Default / primary** (nav bar, favicon, header) | Circular lockup (page 8) | **Green** (Forest on Cream) |
| **Horizontal contexts** (footer, wide headers, email signatures) | Landscape/wordmark lockup (page 10) | **Green** |
| **Accent / premium moments** (limited editions, hover states, gifting) | Either lockup | **Gold** (page 9) |

Reasoning: the circular lockup is the document's own stated default ("the default and most-used version, ensuring immediate brand recognition"). Between the two colorways, Green is picked as the default over Gold because it's built from the palette's *primary* colour (Forest) and gives stronger contrast at small sizes (favicons, nav bars) than gold-on-cream does. Gold is kept in reserve as the accent/premium treatment rather than dropped, since it's a real documented asset.

> Page 10 (the landscape wordmark lockup) is the "more detailed" logo page — it pairs the horse mark with the full `STEPPE GUT` wordmark in a horizontal format, shown across green, cream, sage, and white swatches plus four wordmark colour combinations.

---

## 5. Colour palette

The identity ships **three documented variations** (source pages 5, 6, 7). Forest, Cream and Sage are constant across all three; only the tertiary colour changes (Gold → Earth in the muted set).

### Core colours

| Name | Role | Hex | RGB | CMYK |
|---|---|---|---|---|
| Forest | Primary | `#2F3E2F` | 47, 62, 47 | 71, 53, 75, 55 |
| Cream | Secondary | `#F5F1E9` | 245, 241, 233 | 2, 4, 7, 0 |
| Gold | Tertiary | `#D4AF37` | 212, 175, 55 | 18, 29, 96, 0 |
| Sage | Quarternary | `#7D9D75` | 125, 157, 117 | 54, 24, 64, 3 |
| Earth | Tertiary (muted variation only) | `#442D1C` | 68, 45, 28 | 49, 68, 82, 63 |

### Variations documented in the source

| Variation | Mood | Primary | Secondary | Tertiary | Quarternary |
|---|---|---|---|---|---|
| **Vibrant** | Optimism, warmth, high contrast | Forest | Cream | Gold | Sage |
| **Gold** | Gold-forward emphasis | Forest | Cream | Gold | Sage |
| **Muted** | Stability, organic, rooted in nature | Forest | Cream | **Earth** | Sage |

> Note: *Vibrant* and *Gold* are numerically identical in the source (same four hex values) — they only differ in name/emphasis, not data.

### ✅ Chosen palette for the website: **Vibrant / Gold**

`design-tokens.js` marks this as `activePalette: 'vibrant'`. Reasoning:

1. **Logo match.** The only two logo colorways documented (pages 8–9) are Green and Gold — there is no Earth/Muted logo asset anywhere in the source. Building the site around Muted would leave the logo with no matching background treatment.
2. **Category fit.** Forest + Cream + Gold reads as premium/wellness on screen. Earth brown leans rustic/food-packaging — a better fit for the physical pouch SKUs (page 30) than for a digital brand surface.
3. **Audience fit.** The target consumer — working women, 28–45, "curated, effortless grace" (page 3) — maps more naturally to a cooler forest/gold palette than a warm-brown one.

The Muted/Earth palette is retained in the tokens as documented brand data (it's valid, sourced, and may suit a future sub-brand or packaging refresh) but is **not** the active website palette.

---

## 6. Typography

| Role | Typeface | Weights specified |
|---|---|---|
| **Primary — English** | **EB Garamond** (serif) | Regular 400 · Semi-Bold 600 · Bold 700 |
| **Secondary — English** | **Inter** (sans-serif) | Regular 400 · Semi-Bold 600 · Bold 700 |
| **Primary — Thai** | **Noto Sans Thai** | Light 300 · Regular 400 · Bold 700 |

- **EB Garamond** carries the display/heading voice and the `STEPPE GUT` wordmark.
- **Inter** carries body and UI text.
- **Noto Sans Thai** covers all Thai copy.
- Body sizes shown in the source: **16px** and **12px** (Regular 400). Heading/sub-heading point sizes are not specified in the document.

---

## 7. Product range

Three product names appear across the packaging: **Fermented Mare's Milk**, **Kumis**, and a **Steppe Gut** (logo-only) variant. Each ships in Green and Gold colourways.

| Format | Net weight / count | Notes |
|---|---|---|
| Individual sachet | 10 g | Single-serve powder |
| 25-piece sachet box | 250 g (25 × 10 g) | Retail carton |
| Large sachet (stand-up pouch) | 250 g | Bulk powder |
| Pill bottle | 90 capsules | Capsule format |

**Preparation (powder):** empty a sachet → add to 100 ml of water → mix and drink.

---

## 8. Ingredients & regulatory

**Ingredients:** Fermented Mare's Milk Powder, Lactose, Whey Protein, Casein Protein, Milk Fat, Omega-3 Fatty Acids, Omega-6 Fatty Acids, Vitamin C (Ascorbic Acid), Vitamin A (Retinol), Vitamin B1 (Thiamine), Vitamin B2 (Riboflavin), Vitamin B12 (Cyanocobalamin), Calcium, Phosphorus, Sodium, Iron, Lactoferrin, Lysozyme.

**Allergen:** Contains Milk.

**Origin:** Product of Mongolia.

**Manufactured by:** Monsubi Foods LLC.

**Imported by:** YFamily Co., Ltd., 45/1 Silom, 19 Building, 4th Floor, Room 415, Trok Weth, Silom Road, Silom Subdistrict, Bang Rak District, Bangkok 10500.

**On-pack fields to complete before print:** Best Before (DD/MM/YY), nutrition panel values, serving size.

> The powder panel prints serving size **1 scoop (0.5 g)** and **90 servings** — flagged in the sense-check as needing a reconciliation against the 250 g net weight.

---

## 9. Document metadata

- **Owner:** S72 Strategic Co., LTD. — tagline *"Strategic Solutions. Simplified Success."*
- **Designed by:** Product Development Division
- **Revision:** Final Revision, 27 May 2026
- **Contact:** info@s72strategic.com · +66-97-251-5911
