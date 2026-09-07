import scienceHero from "../assets/story/science-hero.webp";
import fuelledCampus from "../assets/story/science-fuelled.webp";
import weighingDish from "../assets/story/science-weighing-dish.webp";
import molecularStructure from "../assets/story/science-molecular.webp";

// Copy for /our-story/science-mission/. Structure: the shared opening plate,
// then a staggered two-column flow (narrow "Fuelled by science" heading, a
// top-left paragraph and a lower bottom-right paragraph), then two image/text
// fields, closing on the shared bookend.
//
// House rules (PUNCTUATION_RULE.md, WRITING_STYLE.md): no terminal full stop
// on any string here. Internal sentence stops inside a multi-sentence block
// are kept, the way src/content/gutDiet.js writes them, and only the last one
// is dropped. Headings, briefs and alt text carry no stops at all. No
// em dashes, no " - ". No eyebrow/kicker labels. Claim discipline
// (02_brand_guidelines.md §6): composition and process only, nothing phrased
// as an effect on a person, no "clinically proven". The page is framed
// positively - what the science supports, not what we withhold. Every image
// is a written brief until the photography is shot.

export const SCIENCE_MISSION = {
  heading: "Our Science Mission",

  intro: {
    heading: "Fuelled by science",
    body: "Every line on this page rests on established dairy science and the growing literature on fermented mare's milk, most of it out of Mongolia, Central Asia and Eastern Europe. We work with independent food scientists who read that evidence with us and keep us honest about describing the powder only in the terms it supports",
    aside: "The fermentation and gentle drying are ordinary, well understood food chemistry, and every batch is measured against the same benchmarks before it leaves the facility. Thai FDA registration has been approved, the certificate sits behind every pack, and anything the evidence newly supports we will publish here first, ahead of anywhere else",
    image: {
      description:
        "glass fronted research and laboratory buildings under a broad blue sky, low upward angle, trees along the base, neutral daylight, no branding",
      src: fuelledCampus,
      alt: "Glass fronted research laboratory buildings under a wide blue sky",
      ratio: "4 / 3",
    },
  },

  heroImage: {
    description:
      "a sachet of pale fermented milk powder and a small sample dish on a laboratory bench, neutral daylight, analysis paperwork out of focus behind, no branding",
    src: scienceHero,
    alt: "A sample of fermented mare's milk powder on a laboratory bench",
    ratio: "16 / 9",
  },

  fields: {
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
