# Page — Ingredients & Sourcing `/ingredients-sourcing/`

> **Written 2026-08-07**, during the build, because the 7-page rescope created this route without a spec. It consolidates `whats-inside.md` (ingredient list, allergens, nutrition) with a condensed version of the sourcing and production narrative that was previously spread across the deleted `/our-story/*` pages. One scrollable page, not a hub with children.

## Summary

The trust page. It exists because a supplement brand entering an unfamiliar category, in a market with no local track record, before regulatory registration is issued, has exactly one unimpeachable asset: **the willingness to publish everything, including what is missing.**

Two questions are answered on the same page on purpose. "What is in it" and "where did it come from" are the same question asked by the same sceptical reader, and splitting them across two routes makes each half look partial. A reader who arrives asking about allergens usually leaves asking about provenance, and vice versa.

This is the page a pharmacist, an allergy-conscious buyer, or a person comparing two products with a spreadsheet open will search for by name. It is written for them, not for a browser.

## Purpose

- **Website goals served:** trust, education, product understanding
- **Journey questions:** 1 (what is this?), 3 (why trust it?), 4 (why Mongolia?), 6 (why is it different?)
- **Audience:** the sceptic, the allergy-conscious, the pharmacist, the person who has read the product page and wants the unmarketed version
- **User intent:** "Show me everything, without marketing around it"
- **Primary CTA:** *See the products* → `/products/`
- **Secondary CTA:** *Ask us something* → `/contact/`

## Layout specification

| Property | Value |
|---|---|
| Background | `cream` |
| Header | `PageHeader align="left"` |
| Body container | `content` for tables and glossary; `narrow` for the ingredient panel; `prose` for narrative |
| Section rhythm | `Section size="default"` throughout |
| Tone | The plainest page on the site. Minimal imagery, no persuasion, no CTA until the bottom |
| Anchors | `#ingredients` `#allergens` `#nutrition` `#sourcing` `#how-its-made` `#who-makes-it` `#honest-limits` — the home reads carousel and the PDPs link into these directly |

## Section order and rationale

| # | Section | Component | Why it exists here |
|---|---|---|---|
| 1 | Page header | `PageHeader` | States the page's purpose: everything, in one place, including the gaps |
| 2 | Ingredients | panel in `Container narrow` | The full declaration, unabridged, before anything else. Not small print |
| 3 | Allergens & suitability | `CardGrid` of plain fact cards | The single most-searched fact. Given its own section rather than buried |
| 4 | Ingredient glossary | `Accordion` | Turns a list into education. Each entry describes what the substance **is**, never what it will do for you |
| 5 | Nutrition figures | `NutritionPanel` | Honest blocked state — see the blocking item below |
| 6 | Where the milk comes from | `MediaTextRow` + `StatBand` | Provenance as fact, with the seasonality that makes it credible |
| 7 | How it is made | `ProcessSteps` | Milking → fermenting → drying → sealing. Four steps, plainly |
| 8 | Who makes it | named-company panel | Manufacturer, importer and brand owner, named with addresses. Anonymity would undermine the whole page |
| 9 | What is not in it | fact grid | Answers the negative questions directly |
| 10 | Honest limits | `HonestLimits` | The highest-trust device on the site. Required, not optional |
| 11 | Closing CTA | `ClosingCTA` | Single, quiet |

Sections 2–5 are compositional, 6–8 are provenance, 9–10 are defensive. A reader who stops anywhere has still received a complete answer up to that point.

> **Blocking item, carried forward from `product-detail.md` §5 and `whats-inside.md` §4.** `BRAND_GUIDELINES.md` §8 records that the powder panel prints a serving size of 1 scoop (0.5 g) with 90 servings, which reconciles with neither the 250 g net weight nor the 10 g sachet. **Numeric nutrition figures must not ship until this is resolved.** The page still ships: section 5 states plainly that the figures are not published yet and why. A transparency page with arithmetic that does not add up is worse than one that names its own gap.

---

# Copy

## 1. Page header

> **Eyebrow:** Transparency
> **Title (h1):** Everything that is in it, and where it came from
> **Lead:** The full ingredient declaration, what each thing is, where the milk is collected, who ferments it and who makes the finished pack. Where we do not have a figure yet, this page says so rather than leaving a gap you have to notice for yourself.

## 2. Ingredients

> **Heading:** Ingredients
> **Sub:** Identical in all three formats.
>
> *(Full declaration from `BRAND_GUIDELINES.md` §8, rendered at reading size, not small print.)*
>
> **Note:** The capsules additionally contain the capsule shell. The powder inside is unchanged.

## 3. Allergens and suitability

> **Heading:** Allergens and suitability

| Question | Answer |
|---|---|
| Contains milk | Yes. This is a dairy product. It is not suitable for anyone with a milk allergy. |
| Lactose | Fermentation breaks down most of the lactose in the milk, but lactose remains present and is listed as an ingredient. If you react to yoghurt, you may react to this. |
| Gluten | No gluten-containing ingredients are used. We do not currently hold gluten-free certification, so we do not describe it as gluten-free. |
| Vegetarian and vegan | Suitable for vegetarians. Not suitable for vegans — it is a dairy product. |
| Nuts | No nut ingredients are used. Ask us about the production facility if this matters for you and we will tell you what we know. |
| Pregnancy and breastfeeding | Speak to your doctor before taking any supplement during pregnancy or while breastfeeding. We are not able to advise on this. |

> **Claim check:** the gluten and nut answers state the limits of what is certified rather than the convenient version. This is `02_brand_guidelines.md` §6.3 applied to suitability, and it is the section a sceptical reader judges the whole brand on.

## 4. Ingredient glossary

`Accordion`, `allowMultiple`, one item per ingredient. Each answer is 1–3 sentences and describes **what the substance is**, not what it will do for the reader. Content as per `whats-inside.md` §5, unchanged.

> **Claim discipline, non-negotiable:** the vitamin and mineral entries are Tier B — general, established nutrient function, attributed to the nutrient. Keep them phrased as "contributes to normal…". Never rewrite into "helps your…". This wording is the boundary, not a style preference.

## 5. Nutrition figures

`NutritionPanel`. While the serving-size reconciliation is outstanding, the panel states:

> We have not published the nutrition panel yet. The serving figures on the current pack artwork do not reconcile against the pack weight, and we would rather say that than print numbers we cannot stand behind. They will be published here, per serving and per 100 g, once they are checked.

Everything not blocked by that — the declaration, the allergen, the origin, the named manufacturer — is published in full in the same section.

## 6. Where the milk comes from

> **Eyebrow:** Töv Province, Mongolia
> **Heading:** Milked between June and October
> **Body:**
> The milk is collected in Töv Province, on open grassland, by herding families who are paid directly for it. Mares are milked by hand, several times a day, and only during the months they are in milk — roughly June to October. Outside that window there is no milk, so there is no production.
>
> That seasonality is the reason the product exists in this form. Fresh mare's milk spoils in hours. Fermenting it, and then drying it, is how a summer's milk becomes something you can take in February.

**StatBand:** 5 months of milking (June to October) · 4 days of fermentation (per batch, before drying) · 1 province (Töv, where every batch is collected)

> All three are provenance facts. None is an efficacy figure.

## 7. How it is made

`ProcessSteps`, four steps.

| Step | Title | Body |
|---|---|---|
| One | Milking | By hand, outdoors, during the months the mares are in milk. The milk is chilled and moved quickly, because fresh mare's milk spoils within hours. |
| Two | Fermenting | The milk is left with its own cultures for about four days and stirred regularly. Lactose breaks down, proteins partly unfold, and the milk turns thinner and faintly sour. |
| Three | Drying | The fermented milk is dried at low temperature into a fine powder. Nothing is added at this stage and nothing is taken out. |
| Four | Packing | The powder is portioned into sachets, capsules or pouches and sealed. Every pack is filled from a single season's collection. |

## 8. Who makes it

> **Heading:** Who makes it
> **Body:** Three companies are involved and all three are named here, because a page about transparency that does not name them is not one.

| Role | Company |
|---|---|
| Manufactured by | Monsubi Foods LLC, Mongolia |
| Imported and distributed in Thailand by | YFamily Co., Ltd., 45/1 Silom, 19 Building, 4th Floor, Room 415, Trok Weth, Silom Road, Silom Subdistrict, Bang Rak District, Bangkok 10500 |
| Brand owner | S72 Strategic Co., Ltd. — info@s72strategic.com, +66 97 251 5911 |

> **Batch certificates:** send us the batch number printed on your pack and we will email you the certificate of analysis for that batch. *(Confirm this is operationally supported before publishing — it also appears on `/contact/`.)*

## 9. What is not in it

| Not present | |
|---|---|
| No added sugar | Nothing sweet is added. The sugars declared are the lactose naturally present in milk. |
| No sweeteners | No sucralose, stevia, aspartame or sugar alcohols. |
| No flavourings | It tastes of fermented milk, because that is what it is. |
| No colourings | None, natural or artificial. |
| No preservatives | Drying is the preservation method. |
| No fillers or bulking agents | The powder is milk. |

## 10. Honest limits

`HonestLimits`. Required. Standard styling, identical to the PDP's.

> **Heading:** What we don't know yet
>
> Research into fermented mare's milk is limited. Most published studies are small, many are conducted outside the countries where it is traditionally consumed, and few look at the outcomes people ask us about.
>
> Batch-to-batch variation in a seasonal, naturally fermented product is real. We are working toward per-batch published analysis and are not there yet. We do not hold gluten-free or organic certification and do not describe the product as either.
>
> Thai FDA registration is in progress. Until it is issued we describe this product as a dietary supplement and make no health claims for it. We will publish the registration details here the day they are issued.

## 11. Closing CTA

> **Heading:** Anything missing?
> **Body:** If there is a figure you need that is not on this page, write to us and we will find it.
> **Primary:** Send a message → `/contact/`
> **Secondary:** See the products → `/products/`

---

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| < 640px | Everything single column. Suitability and "not in it" grids 1 column. Glossary accordion full width. `ProcessSteps` fully stacked |
| 640–1023px | Suitability and "not in it" grids 2 columns. `ProcessSteps` 2 columns |
| ≥ 1024px | `MediaTextRow` side by side. `ProcessSteps` 4 across. `StatBand` 3 across |

## Accessibility notes

- One `<h1>`. Section headings `<h2>`; glossary accordion questions are `<button>` inside `<h3>`
- Allergen information appears in section 3 as visible text, never only inside a collapsed accordion
- Postal addresses use `<address>`; the phone number is a `tel:` link and the email a `mailto:` link
- No information on this page is conveyed by colour alone
- Anchor targets carry `scroll-mt` clearing the fixed nav, so a deep link does not land under the header

## SEO notes

| Element | Value |
|---|---|
| `<title>` | Ingredients & Sourcing — What's in it and where it comes from · Steppe Gut |
| Meta description | The full ingredient list, allergen information, and where Steppe Gut's fermented mare's milk is collected, fermented and made — with the manufacturer, importer and brand owner named. |
| `<h1>` | Everything that is in it, and where it came from |
| JSON-LD | `FAQPage` generated from the glossary, once the glossary data is stable |
| Internal links | `/products/` and 3 PDPs, `/contact/` |
| Target queries | "fermented mare's milk ingredients", "mare's milk lactose", "is mare's milk suitable for lactose intolerance", "where does Steppe Gut come from", "Monsubi Foods" |

## Developer notes

- Route `/ingredients-sourcing/`, lazy-loaded
- Ingredient declaration, allergen and origin come from `src/data/products.js`; company details from `src/data/site.js`. **A fact must exist in exactly one place in the codebase** — this page and the PDPs read the same objects
- The glossary is `src/data/ingredients.js`, an array of `{ id, name, explanation }`
- Reuses `PageHeader`, `MediaTextRow`, `StatBand`, `ProcessSteps`, `Accordion`, `NutritionPanel`, `HonestLimits`, `ClosingCTA`. **No new components**
- Do not publish numeric nutrition figures until the serving-size reconciliation is resolved
