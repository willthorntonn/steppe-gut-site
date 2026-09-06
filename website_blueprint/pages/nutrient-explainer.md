# Template — Nutrient Explainer `/wellbeing/nutrients/:slug/`

Covers `vitamin-c`, `omega-3`, `lactoferrin`, `vitamin-a`, `b-vitamins`, `calcium-and-iron`. **One template, six short records.**

## Summary

Six 250–400 word pages, each answering four fixed questions. Deliberately the shortest content pages on the site. Their value is search coverage and claim substantiation, not depth — depth belongs in `/the-science/`.

## Purpose

- **Goals:** education, trust
- **Journey question:** 5
- **Audience:** search arrivals with a specific, narrow question
- **Intent:** "What is this and what does it do?"
- **Primary CTA:** *See what's inside* → `/products/whats-inside/`
- **Secondary CTA:** the nutrient index

## Layout

| Property | Value |
|---|---|
| Header | `PageHeader align="left"` with breadcrumbs |
| Body | `container-prose` 680px |
| Length | 250–400 words. **Do not expand these** |
| Images | None |

## Fixed section order

Four questions, in this order, on every page. The repetition is the point — a reader who has read one knows exactly where to look on the next.

| # | Section heading | Content |
|---|---|---|
| 1 | Header | Name + one-line lead |
| 2 | What it is | 2–3 sentences. Plain definition |
| 3 | What it contributes to | Established nutrient function statements only. Phrased as "contributes to normal…" |
| 4 | Where you can get it | Common food sources, **including sources other than Steppe Gut** |
| 5 | In mare's milk | 1–2 sentences on its presence in the product, with a link to the figures |
| 6 | Worth knowing | One caveat, limit or common misconception |
| 7 | Other nutrients | `CardRail` of the other five |

> **Section 4 must list food sources other than Steppe Gut.** A nutrient page that only points back at the product is an advertisement wearing an article's clothing, and readers recognise it immediately.
> **Section 6 is mandatory.** It is where the honesty lives on a page too short for a full `HonestLimits` block.

---

# Content records

## `vitamin-c`

**H1:** Vitamin C
**Lead:** Mare's milk contains considerably more of it than cow's milk — one of the few dairy sources worth mentioning at all.

**What it is.** Ascorbic acid, a water-soluble vitamin. The human body cannot make it and cannot store much of it, so it has to come in regularly through food. It is also chemically fragile — heat, light and time all degrade it.

**What it contributes to.** Vitamin C contributes to normal collagen formation for the normal function of skin, bones, cartilage and blood vessels. It contributes to normal immune system function, to normal energy-yielding metabolism, and to the protection of cells from oxidative stress. It also increases iron absorption from non-meat sources.

**Where you can get it.** Peppers, guava, citrus, kiwi, broccoli, strawberries, tomatoes. Almost any diet containing fresh fruit and vegetables provides more than enough. Deficiency in a normally-fed adult is rare.

**In mare's milk.** Naturally present, and the reason our drying step is done at low temperature — vitamin C is the first thing lost to heat, which makes it a useful indicator that the process was done properly. Quantities are on [What's Inside](/products/whats-inside/).

**Worth knowing.** Because it is water-soluble and poorly stored, taking large amounts does not build a reserve — the excess is excreted. High-dose vitamin C supplementation has not been shown to prevent common illness in the general population, despite how persistently it is marketed that way.

## `omega-3`

**H1:** Omega-3
**Lead:** A family of fatty acids the body cannot manufacture and must take in from food.

**What it is.** A group of polyunsaturated fatty acids. The main ones are ALA, found in plants, and EPA and DHA, found mainly in oily fish. The body can convert ALA to EPA and DHA, but inefficiently.

**What it contributes to.** EPA and DHA contribute to the normal function of the heart. DHA contributes to the maintenance of normal brain function and normal vision. ALA contributes to the maintenance of normal blood cholesterol levels.

**Where you can get it.** Oily fish — salmon, mackerel, sardines — for EPA and DHA. Walnuts, flaxseed, chia and rapeseed oil for ALA. Algae oil for a non-fish source of DHA.

**In mare's milk.** Naturally present as part of the milk fat. Mare's milk is much lower in total fat than cow's milk but proportionally higher in polyunsaturated fatty acids. Quantities are on [What's Inside](/products/whats-inside/).

**Worth knowing.** "Contains omega-3" is one of the least informative claims in food marketing, because it says nothing about which omega-3 or how much. The amounts in a 10 g serving of any milk powder are modest. Oily fish remains the most efficient dietary source by a wide margin.

## `lactoferrin`

**H1:** Lactoferrin
**Lead:** An iron-binding protein found in milk, and one of the reasons mare's milk attracts research interest.

**What it is.** A protein that binds iron tightly. It occurs in milk, tears and other secretions, at much higher concentrations in human milk than in cow's milk. Mare's milk sits between the two.

**What it contributes to.** This is where we have to be careful. Lactoferrin has been studied extensively in laboratory settings, where it shows iron-binding and antimicrobial activity. **It does not currently hold an authorised nutrient function claim**, and we are not going to describe what it does in a person as though it did.

**Where you can get it.** Milk and dairy products, in small amounts. Concentrations fall with processing, particularly with heat treatment. It is also sold as an isolated supplement.

**In mare's milk.** Naturally present and listed in our ingredients. How much survives fermentation and low-temperature drying in our specific process is something we have not measured and therefore will not estimate.

**Worth knowing.** Lactoferrin is frequently marketed on the strength of laboratory findings that have not been reproduced in people. What happens to a protein in a dish is not what happens to it after digestion. Treat confident claims about it with scepticism, including any you might see about products like ours.

## `vitamin-a`

**H1:** Vitamin A
**Lead:** Necessary, established, and the one on this list most easily taken to excess.

**What it is.** A fat-soluble vitamin occurring as retinol in animal foods and as carotenoids in plants, which the body converts. Because it is fat-soluble, it is stored in the liver rather than excreted.

**What it contributes to.** Vitamin A contributes to the maintenance of normal skin and normal mucous membranes, to the maintenance of normal vision, to normal iron metabolism, and to the normal function of the immune system.

**Where you can get it.** Liver, egg yolk, dairy fat and oily fish for retinol. Carrots, sweet potato, spinach and other orange and dark green vegetables for carotenoids.

**In mare's milk.** Naturally present in the milk fat. Quantities are on [What's Inside](/products/whats-inside/).

**Worth knowing.** Unlike vitamin C, vitamin A accumulates. Excessive intake from supplements — not from food — can be harmful, and high intakes are specifically contraindicated in pregnancy. If you are taking a multivitamin as well as anything else, check the totals. This is a real caution, not a formality.

## `b-vitamins`

**H1:** B vitamins
**Lead:** B1, B2 and B12 are all naturally present in mare's milk. B12 is the one worth paying attention to.

**What they are.** A group of water-soluble vitamins with distinct roles. B1 is thiamine, B2 is riboflavin, B12 is cyanocobalamin. They are not interchangeable and "B vitamins" as a single category is a convenience rather than a description.

**What they contribute to.** B1 contributes to normal energy-yielding metabolism and normal heart function. B2 contributes to normal energy-yielding metabolism and the maintenance of normal skin and vision. B12 contributes to normal red blood cell formation, normal neurological function and the reduction of tiredness and fatigue.

**Where you can get them.** B1 in whole grains, pork and pulses. B2 in dairy, eggs and green vegetables. B12 **only in animal foods** — meat, fish, eggs and dairy — or in fortified foods and supplements.

**In mare's milk.** All three naturally present. Quantities are on [What's Inside](/products/whats-inside/).

**Worth knowing.** B12 is the one that matters most, because it is the only one on this list that is genuinely difficult to obtain on a plant-based diet. If you eat no animal products, B12 needs a deliberate source — and a 10 g serving of milk powder is not a sufficient one. Get it tested rather than assumed.

## `calcium-and-iron`

**H1:** Calcium and iron
**Lead:** Two minerals that compete with each other for absorption, which is why they are on one page.

**What they are.** Calcium is the most abundant mineral in the body, almost all of it in bone. Iron is a component of haemoglobin, which carries oxygen in the blood.

**What they contribute to.** Calcium contributes to the maintenance of normal bones and teeth and to normal muscle function. Iron contributes to normal oxygen transport in the blood, to normal cognitive function, and to the reduction of tiredness and fatigue.

**Where you can get them.** Calcium: dairy, tinned fish with bones, tofu set with calcium, fortified plant milks, dark leafy greens. Iron: red meat, liver, pulses, dark leafy greens, fortified cereals.

**In mare's milk.** Both naturally present, along with phosphorus. Quantities are on [What's Inside](/products/whats-inside/).

**Worth knowing.** Calcium interferes with iron absorption when both are eaten together, and the iron in plant foods is absorbed less readily than the iron in meat. Vitamin C improves absorption of plant iron considerably, which is convenient here since mare's milk contains both. If you have been told your iron is low, that is a conversation for a doctor rather than a supplement label.

---

## Responsive behaviour

Single column at every breakpoint. Prose at 680px from `lg`. `CardRail` shows 1.2 cards on mobile, arrows from `lg`.

## Accessibility notes

- One `<h1>` per page. The four fixed questions are `<h2>`
- Breadcrumbs mandatory: Home / Wellbeing / Nutrients / *nutrient*
- The vitamin A caution in "Worth knowing" must be plain visible text, never collapsed
- No images means no alt-text decisions on these pages

## SEO notes

- `<title>`: `Vitamin C — What It Is and What It Does · Steppe Gut` *(pattern per nutrient)*
- Target queries: "what does vitamin C do", "omega 3 sources", "what is lactoferrin", "vitamin A too much", "B12 sources", "calcium and iron together"
- JSON-LD `Article` per page
- **These pages will attract traffic with no purchase intent whatsoever, and that is correct.** They exist to make the site a credible source, and to give every nutrient mentioned elsewhere a substantiating destination. Do not attempt to commercialise them
- Each links to the other five, to the index, and to `/products/whats-inside/`

## Developer notes

- Route `/wellbeing/nutrients/:slug`, lazy-loaded. Unknown slug → 404
- **Zero images across all six pages**
- Records in `src/data/nutrients.js`: `{ slug, name, lead, whatItIs, contributesTo, sources, inMaresMilk, worthKnowing }`
- `worthKnowing` is a **required** field
- The `contributesTo` strings are the site's only nutrient-function claims. **They are regulated language.** Keep them in one file, keep them in the "contributes to normal…" form, and have them reviewed against Thai FDA supplement-labelling requirements before publication. Do not let a copy edit anywhere else in the site rephrase them
- Reuses `PageHeader`, `Prose`, `CardRail`, `ContentCard`. No new components. All six pages are roughly one day of work total
