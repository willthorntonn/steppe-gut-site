# Page — What's Inside `/products/whats-inside/`

## Summary

A single page of total compositional transparency across all three formats, side by side. It exists because a supplement brand entering an unfamiliar category with incomplete regulatory registration has exactly one unimpeachable asset: **the willingness to publish everything.**

The reference site maintains an equivalent page and it is, structurally, one of the most interesting on that site — it duplicates content already present on each PDP, and it earns that duplication because it is the page a sceptical or allergic visitor searches for by name.

## Purpose

- **Website goals served:** trust, product understanding, education
- **Journey questions:** 1, 3, 6
- **Audience:** the sceptic, the allergy-conscious, the pharmacist, the person comparing against another supplement with a spreadsheet open
- **User intent:** "Show me everything, without marketing around it"
- **Primary CTA:** *See the products* → `/products/`
- **Secondary CTA:** *Ask us something* → `/contact/`

## Layout specification

| Property | Value |
|---|---|
| Background | `cream` |
| Header | `PageHeader align="center"` |
| Body container | `container-content` 940px for tables; `container-prose` for explanation |
| Tone | The plainest page on the site. Minimal imagery, no persuasion, no CTA until the very bottom |

## Section order

| # | Section | Why |
|---|---|---|
| 1 | Page header | States the page's purpose: everything, in one place |
| 2 | Ingredient list | The full declaration, unabridged, before anything else |
| 3 | Allergen and suitability | The single most-searched fact. Given its own section rather than buried |
| 4 | Nutrition comparison | All three formats in one table |
| 5 | Ingredient glossary | Each ingredient explained in one sentence. Turns a list into education |
| 6 | Where each thing comes from | Distinguishes naturally-present from added |
| 7 | What is not in it | Answers the negative questions directly |
| 8 | Honest limits | Standard block |
| 9 | Closing CTA | Single, quiet |

---

# Sections

## 1. Page header

> **Eyebrow:** Transparency
> **Title (h1):** Everything that is in it
> **Lead:** The full ingredient declaration, nutrition figures for all three formats, and a plain-English explanation of what each thing is. If something you need is not on this page, ask us and we will publish it.

## 2. Ingredient list

**Component:** `Container width="prose"` + a bordered panel

| Property | Value |
|---|---|
| Panel | `cream-raised`, `radius-lg`, `border-subtle`, `p-6 lg:p-8` |
| Type | `body-lg`, `forest`. Not small print — the point is that it is readable |

> **Heading:** Ingredients
> **Sub:** Identical in all three formats.
>
> Fermented mare's milk powder, lactose, whey protein, casein protein, milk fat, omega-3 fatty acids, omega-6 fatty acids, vitamin C (ascorbic acid), vitamin A (retinol), vitamin B1 (thiamine), vitamin B2 (riboflavin), vitamin B12 (cyanocobalamin), calcium, phosphorus, sodium, iron, lactoferrin, lysozyme.
>
> **Note:** Capsules additionally contain the capsule shell. The powder inside is unchanged.

## 3. Allergen and suitability

**Component:** `Container width="content"` + `CardGrid columns={2}` of plain fact cards

> **Heading:** Allergens and suitability

| Question | Answer |
|---|---|
| **Contains milk** | Yes. This is a dairy product. It is not suitable for anyone with a milk allergy. |
| **Lactose** | Fermentation breaks down most of the lactose in the milk, but lactose remains present and is listed as an ingredient. If you react to yoghurt, you may react to this. |
| **Gluten** | No gluten-containing ingredients are used. We do not currently hold gluten-free certification, so we do not describe it as gluten-free. |
| **Suitable for vegetarians** | Yes. **Not** suitable for vegans — it is a dairy product. |
| **Nuts** | No nut ingredients are used. Ask us about the production facility if this matters for you and we will tell you what we know. |
| **Pregnancy and breastfeeding** | Speak to your doctor before taking any supplement during pregnancy or while breastfeeding. We are not able to advise on this. |

> **Claim check:** the gluten and nut answers deliberately state the limits of what is certified rather than the convenient version. This is the pattern from `02_brand_guidelines.md` §6.3 applied to suitability, and it is the section a sceptical reader will judge the whole brand on.

## 4. Nutrition comparison

**Component:** `ComparisonTable` with a `NutritionPanel`-style presentation

| Property | Value |
|---|---|
| Container | `container-content` 940px, `overflow-x-auto` wrapper |
| Columns | Nutrient · per 10 g sachet · per 3 capsules · per level scoop · per 100 g |
| First column | Sticky left on mobile |
| Header row | `forest` background, `cream` text, sticky within the wrapper |

**Rows:** energy (kJ / kcal) · fat *(of which saturates)* · carbohydrate *(of which sugars)* · protein · salt · calcium · phosphorus · iron · vitamin A · vitamin B1 · vitamin B2 · vitamin B12 · vitamin C

**Below the table:**
> Figures are per the stated serving. Because the milk is seasonal and every batch is fermented individually, small variation between batches is normal and expected; the figures above are batch averages.

> **Blocking item — same as `product-detail.md` §5.** `BRAND_GUIDELINES.md` §8 records an unreconciled serving size (1 scoop / 0.5 g / 90 servings against a 250 g net weight and a 10 g sachet). **This page cannot ship until that is resolved.** A transparency page with arithmetic that does not add up is worse than no transparency page.

## 5. Ingredient glossary

**Component:** `Accordion`, one item per ingredient, `allowMultiple`

Each answer is 1–3 sentences, plain, and **describes what the substance is, not what it will do for you.**

| Ingredient | Explanation |
|---|---|
| Fermented mare's milk powder | Mare's milk that has been fermented with its own cultures for four days, then dried at low temperature. It is the bulk of what is in the pack. |
| Lactose | The natural sugar in milk. Fermentation breaks much of it down; what remains is listed here because it is still present. |
| Whey protein | One of the two main protein groups in milk. It stays in solution rather than curdling. |
| Casein protein | The other main milk protein. It is what makes milk white. |
| Milk fat | Naturally present. Mare's milk is considerably lower in fat than cow's milk. |
| Omega-3 and omega-6 fatty acids | Fatty acids the body cannot make for itself and has to take in from food. Both occur naturally in mare's milk. |
| Vitamin C (ascorbic acid) | Mare's milk is unusually high in vitamin C for a dairy. Vitamin C contributes to normal collagen formation and to normal immune function. |
| Vitamin A (retinol) | Contributes to the normal maintenance of skin and to normal vision. |
| Vitamin B1, B2, B12 | Involved in normal energy-yielding metabolism. B12 also contributes to normal red blood cell formation. |
| Calcium and phosphorus | The two main minerals in milk. Both contribute to the maintenance of normal bones and teeth. |
| Iron | Contributes to normal oxygen transport in the blood. |
| Sodium | Naturally present. Not added as salt. |
| Lactoferrin | An iron-binding protein found in milk. It is one of the components that draws research interest to mare's milk. |
| Lysozyme | An enzyme found naturally in milk, which acts on bacterial cell walls. Mare's milk contains notably more of it than cow's milk. |

> **Claim discipline note for the implementer:** the vitamin and mineral statements above are Tier B — general, established nutrient function, attributed to the nutrient and never to Steppe Gut. Keep them phrased as "contributes to normal…" and never rewrite them into "helps your…". This wording is not stylistic; it is the boundary.

## 6. Naturally present, not added

**Component:** `MediaTextRow`, image left

> **Eyebrow:** Where it comes from
> **Heading:** We do not add the vitamins
> **Body:**
> Everything in the ingredient list except the capsule shell is naturally present in mare's milk, or is produced by fermenting it. There is no vitamin premix, no isolate blended in afterwards, no flavouring and no sweetener.
>
> That is partly a decision and partly a constraint: mare's milk happens to be unusually rich in vitamin C and lysozyme to begin with, which is a large part of why anyone fermented it in the first place.

**Image:** reuse `src/assets/products/powder-detail.*` (P-2).

## 7. What is not in it

**Component:** `TipList columns={2}`, plain cards, no icons

| Not present | |
|---|---|
| No added sugar | Nothing sweet is added. The sugars declared are the lactose naturally present in milk. |
| No sweeteners | No sucralose, stevia, aspartame or sugar alcohols. |
| No flavourings | It tastes of fermented milk, because that is what it is. |
| No colourings | None, natural or artificial. |
| No preservatives | Drying is the preservation method. |
| No fillers or bulking agents | The powder is milk. |

## 8. Honest limits

**Component:** `HonestLimits`

> **Heading:** What we don't know yet
>
> Batch-to-batch variation in a seasonal, naturally fermented product is real, and our figures are averages rather than guarantees. We are working toward per-batch published analysis and are not there yet.
>
> Thai FDA registration is in progress. Until it is issued we describe this product as a dietary supplement and make no health claims for it.

## 9. Closing CTA

**Component:** `ClosingCTA`, shared bookend

> **Heading:** Anything missing?
> **Body:** If there is a figure you need that is not on this page, write to us and we will find it.
> **Primary:** Send a message → `/contact/`
> **Secondary:** See the products → `/products/`

---

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| < 640px | Comparison table scrolls horizontally, first column sticky, wrapper focusable. Suitability cards 1 column. Glossary accordion full-width |
| 640–1023px | Suitability 2 columns. Table still scrolls |
| ≥ 1024px | Table fits without scroll at 940px. Glossary accordion at `container-content` |

## Accessibility notes

- One `<h1>`. Glossary accordion triggers are `<button>` inside `<h3>`
- The comparison table has a `<caption>`, `scope="col"` on unit headers and `scope="row"` on nutrient names. It is a data table and must be marked up as one — this is the page most likely to be read by assistive technology, because it is the page allergy-conscious visitors seek out
- The horizontal-scroll wrapper is `tabindex="0"`, `role="region"`, `aria-label="Nutrition comparison table, scrollable"`
- Allergen information appears in section 3 as visible text, never only inside a collapsed accordion
- No information on this page is conveyed by colour alone

## SEO notes

| Element | Value |
|---|---|
| `<title>` | What's Inside — Ingredients and Nutrition · Steppe Gut |
| Meta description | The full ingredient list, allergen information and nutrition figures for all three Steppe Gut formats, with each ingredient explained in plain English. |
| `<h1>` | Everything that is in it |
| JSON-LD | `FAQPage` generated from the glossary accordion — this page is a strong candidate for long-tail queries of the form "does X contain Y" |
| Internal links | `/products/` and 3 PDPs, `/faq/`, `/contact/`, `/the-science/fermentation/` |
| Target queries | "fermented mare's milk ingredients", "mare's milk lactose", "is mare's milk suitable for lactose intolerance", "mare's milk vitamin C" |

## Developer notes

- Route `/products/whats-inside/`, lazy-loaded
- All nutrition data comes from a single `src/data/nutrition.js` object keyed by format. **This page and all three PDPs read the same object** — a nutrition figure must exist in exactly one place in the codebase
- The glossary is `src/data/ingredients.js`, an array of `{ name, explanation }`. Reused to generate the `FAQPage` JSON-LD
- Reuses `ComparisonTable`, `Accordion`, `TipList`, `MediaTextRow`, `HonestLimits`, `ClosingCTA`. **No new components.**
- Only one new image is needed and it is already generated (P-2). This page is cheap to build and disproportionately valuable — schedule it in Stage 3 alongside the PDPs, not later
