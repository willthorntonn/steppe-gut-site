// Ingredient glossary. Each explanation describes what the substance IS,
// never what it will do for the reader.
//
// CLAIM DISCIPLINE — read before editing any entry:
// The vitamin and mineral entries are Tier B under 02_brand_guidelines.md §6:
// general, established nutrient function, attributed to the nutrient itself.
// They are phrased "contributes to normal…" deliberately. Rewriting one into
// "helps your…" or attaching it to Steppe Gut turns it into a Tier C
// product-efficacy claim, which cannot ship until Thai FDA registration and
// substantiation exist. This wording is the boundary, not a style preference.
export const INGREDIENT_GLOSSARY = [
  {
    id: "fermented-mares-milk-powder",
    name: "Fermented mare's milk powder",
    explanation:
      "Mare's milk that has been fermented with its own cultures for about four days, then dried at low temperature. It is the bulk of what is in the pack.",
  },
  {
    id: "lactose",
    name: "Lactose",
    explanation:
      "The natural sugar in milk. Fermentation breaks much of it down; what remains is listed here because it is still present.",
  },
  {
    id: "whey-protein",
    name: "Whey protein",
    explanation:
      "One of the two main protein groups in milk. It stays in solution rather than curdling.",
  },
  {
    id: "casein-protein",
    name: "Casein protein",
    explanation: "The other main milk protein. It is what makes milk white.",
  },
  {
    id: "milk-fat",
    name: "Milk fat",
    explanation:
      "Naturally present. Mare's milk is considerably lower in fat than cow's milk.",
  },
  {
    id: "omega-fatty-acids",
    name: "Omega-3 and omega-6 fatty acids",
    explanation:
      "Fatty acids the body cannot make for itself and has to take in from food. Both occur naturally in mare's milk.",
  },
  {
    id: "vitamin-c",
    name: "Vitamin C (ascorbic acid)",
    explanation:
      "Mare's milk is unusually high in vitamin C for a dairy. Vitamin C contributes to normal collagen formation and to normal immune function.",
  },
  {
    id: "vitamin-a",
    name: "Vitamin A (retinol)",
    explanation:
      "Contributes to the normal maintenance of skin and to normal vision.",
  },
  {
    id: "b-vitamins",
    name: "Vitamins B1, B2 and B12",
    explanation:
      "Involved in normal energy-yielding metabolism. B12 also contributes to normal red blood cell formation.",
  },
  {
    id: "calcium-phosphorus",
    name: "Calcium and phosphorus",
    explanation:
      "The two main minerals in milk. Both contribute to the maintenance of normal bones and teeth.",
  },
  {
    id: "iron",
    name: "Iron",
    explanation: "Contributes to normal oxygen transport in the blood.",
  },
  {
    id: "sodium",
    name: "Sodium",
    explanation: "Naturally present. Not added as salt.",
  },
  {
    id: "lactoferrin",
    name: "Lactoferrin",
    explanation:
      "An iron-binding protein found in milk. It is one of the components that draws research interest to mare's milk.",
  },
  {
    id: "lysozyme",
    name: "Lysozyme",
    explanation:
      "An enzyme found naturally in milk, which acts on bacterial cell walls. Mare's milk contains notably more of it than cow's milk.",
  },
];

export const SUITABILITY = [
  {
    title: "Contains milk",
    body: "Yes. This is a dairy product. It is not suitable for anyone with a milk allergy.",
  },
  {
    title: "Lactose",
    body: "Fermentation breaks down most of the lactose in the milk, but lactose remains present and is listed as an ingredient. If you react to yoghurt, you may react to this.",
  },
  {
    title: "Gluten",
    body: "No gluten-containing ingredients are used. We do not currently hold gluten-free certification, so we do not describe it as gluten-free.",
  },
  {
    title: "Vegetarian and vegan",
    body: "Suitable for vegetarians. Not suitable for vegans — it is a dairy product.",
  },
  {
    title: "Nuts",
    body: "No nut ingredients are used. Ask us about the production facility if this matters for you and we will tell you what we know.",
  },
  {
    title: "Pregnancy and breastfeeding",
    body: "Speak to your doctor before taking any supplement during pregnancy or while breastfeeding. We are not able to advise on this.",
  },
];

export const NOT_IN_IT = [
  {
    title: "No added sugar",
    body: "Nothing sweet is added. The sugars declared are the lactose naturally present in milk.",
  },
  {
    title: "No sweeteners",
    body: "No sucralose, stevia, aspartame or sugar alcohols.",
  },
  {
    title: "No flavourings",
    body: "It tastes of fermented milk, because that is what it is.",
  },
  { title: "No colourings", body: "None, natural or artificial." },
  { title: "No preservatives", body: "Drying is the preservation method." },
  { title: "No fillers or bulking agents", body: "The powder is milk." },
];

export const PRODUCTION_STEPS = [
  {
    title: "Milking",
    body: "By hand, outdoors, during the months the mares are in milk. The milk is chilled and moved quickly, because fresh mare's milk spoils within hours.",
  },
  {
    title: "Fermenting",
    body: "The milk is left with its own cultures for about four days and stirred regularly. Lactose breaks down, proteins partly unfold, and the milk turns thinner and faintly sour.",
  },
  {
    title: "Drying",
    body: "The fermented milk is dried at low temperature into a fine powder. Nothing is added at this stage and nothing is taken out.",
  },
  {
    title: "Packing",
    body: "The powder is portioned into sachets, capsules or pouches and sealed. Every pack is filled from a single season's collection.",
  },
];
