import scienceHero from "../assets/story/science-hero.webp";
import weighingDish from "../assets/story/science-weighing-dish.webp";
import molecularStructure from "../assets/story/science-molecular.webp";

// Copy for /our-story/science-mission/. Built to the shape of the reference
// "science mission" page: a title, an intro with an offset second column, one
// wide image, two short position statements, a centred "what we look at"
// divider, then two image/text fields, closing on the shared bookend.
//
// House rules (PUNCTUATION_RULE.md, WRITING_STYLE.md): no terminal full stop
// on any string here. Internal sentence stops inside a multi-sentence block
// are kept, the way src/content/gutDiet.js writes them, and only the last one
// is dropped. Headings, briefs and alt text carry no stops at all. No
// em dashes, no " - ". No eyebrow/kicker labels. Claim discipline
// (02_brand_guidelines.md §6): composition and process only, nothing phrased
// as an effect on a person, no "clinically proven", Thai FDA registration is
// not stated as issued. The strategy of this page is disclosure, not boast -
// the rigour of what is and isn't said is the credential. Every image is a
// written brief until the photography is shot.

export const SCIENCE_MISSION = {
  heading: "Our Science Mission",

  intro: {
    heading: "Led by evidence, not by claims",
    body: "Steppe Gut is a new company selling a product most people have never tried. Rather than borrow credibility we do not have, we are precise about what is known, what is still uncertain, and what we have and have not tested ourselves. That precision is the whole of our science position",
    aside: "We work with independent food scientists and read the existing literature on fermented mare's milk, most of it out of Mongolia, Central Asia and Eastern Europe. We do not fund studies of our own product and then cite them as proof, and we will not present a study of the fresh ferment as though it described our dried powder",
  },

  heroImage: {
    description:
      "a sachet of pale fermented milk powder and a small sample dish on a laboratory bench, neutral daylight, analysis paperwork out of focus behind, no branding",
    src: scienceHero,
    alt: "A sample of fermented mare's milk powder on a laboratory bench",
    ratio: "16 / 9",
  },

  blocks: [
    {
      heading: "What we can say with confidence",
      body: [
        "Two things sit on firm ground. The first is composition. Mare's milk is well described in dairy science, lower in fat than cow's milk, higher in lactose, whey-dominant in its protein, and higher in vitamin C. Fermenting and drying it does not change that starting point",
        "The second is the chemistry of the ferment. A living culture turns lactose into lactic acid, the acidity rises, and the milk proteins partly unfold. This is ordinary, well-understood food chemistry, and it is what every batch is measured against",
      ],
    },
    {
      heading: "What we do not claim",
      body: [
        "We do not say the powder improves skin, digestion, energy or immunity, and we do not describe it as a probiotic. Low-temperature drying ends the live culture, so what reaches you is the fermented milk itself, not a bacterial supplement",
        "Thai FDA registration is in progress and has not been issued. No registration number appears on the pack or on this page until it is. If evidence ever supports a new statement, we will publish it here before it goes anywhere else",
      ],
    },
  ],

  fields: {
    heading: "What we actually look at",
    sub: "The questions are narrow and practical, and they all come back to keeping the ferment intact from the steppe to your kitchen",
    items: [
      {
        heading: "Composition",
        body: "What is in each batch, measured rather than assumed. Moisture, protein, fat, lactose, vitamin C, heavy metals and allergens are all tested. Certificates are available on request while per-batch analysis is prepared for publication",
        image: {
          description:
            "close overhead view of pale fermented milk powder in a weighing dish beside a printed assay sheet, soft even light",
          src: weighingDish,
          alt: "Fermented milk powder in a weighing dish beside a printed assay sheet",
          ratio: "4 / 3",
        },
      },
      {
        heading: "Fermentation",
        body: "What the culture does before drying, and how much of that survives the process. We follow acidity and protein structure through fermentation and low-temperature drying, so the finished powder matches the ferment it came from",
        image: {
          description:
            "a scientific visualisation of milk protein structure and lactic acid molecules, fine ball and stick models over a deep forest green gradient, warm raking light, soft depth of field, no text or branding",
          src: molecularStructure,
          alt: "A molecular visualisation of milk protein structure and lactic acid",
          ratio: "4 / 3",
        },
      },
    ],
  },
};
