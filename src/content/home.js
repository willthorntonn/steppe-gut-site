import originImg from "../assets/photography/origin.png";
import milkingImg from "../assets/photography/process-milking.png";
import culturingImg from "../assets/photography/process-culturing.png";
import sealingImg from "../assets/photography/process-sealing.png";
import fermentationImg from "../assets/photography/reads-fermentation.png";
import provenanceImg from "../assets/photography/reads-provenance.png";
import theHerdImg from "../assets/photography/reads-the-herd.png";
import qualityImg from "../assets/photography/reads-quality.png";
import theProductImg from "../assets/photography/reads-the-product.png";

// Homepage copy, in the order it appears on the page.
//
// Copy is deliberately qualitative: no dates, temperatures, yields, durations
// or health outcomes are asserted, because none of those are sourced. Claims
// stay at the level the brand's own research summary supports.
//
// VOICE GUIDELINES: Clear, elegant, and trustworthy. Premium wellness brand.
// Short sentences. Everyday vocabulary with sophistication. Confident but never
// exaggerated. Focus on benefits and lifestyle. Warm and respectful. Educational
// without clinical. Persuasive without pushy.

export const ORIGIN = {
  id: "origin",
  title: "Old Tradition, Made New!",
  // Exactly the sentences meant to show - line-clamp-3 in OriginFeature is
  // the actual guardrail, this is just written to land close to 3 lines on
  // its own. Focus on provenance, fermentation, and gut health - the three
  // core messages before the product is introduced.
  body: "Our fermented mare's milk comes from Mongolia, where it has been made for generations Fermentation brings out vitamin C, omega-3 and B vitamins and helps keep your gut healthy",
  link: { label: "See how it is made", href: "#process" },
  plate: {
    ratio: "4 / 5",
    brief:
      "wide steppe landscape at golden hour, vast sky over grassland, long shadows raking across the grass, low horizon, no buildings or people, warm earthy colour, clean open sky for text overlay",
    image: originImg,
    alt: "Wide steppe grassland under an open sky at golden hour",
  },
};

export const PROCESS = {
  id: "process",
  items: [
    {
      id: "milking",
      step: "01",
      // Titles and body copy follow 02_brand_guidelines.md §3.2: short
      // sentences, one idea each, concrete nouns, no wordplay (the old
      // "Living animals, living milk" was exactly the kind of phrase §2 says
      // to keep out of copy that has to survive translation into Thai).
      title: "Milked by hand, in season",
      body: "Steppe mares graze wild grassland all year They are milked by hand, outdoors, in a short season once a year",
      href: "/our-story/mission/#mission-timeline",
      cta: "Learn more",
      plate: {
        ratio: "16 / 9",
        brief:
          "hands milking a mare on open grassland, golden hour backlight on hands and coat, weathered hands with work-worn texture, mare relaxed and turned gently away from camera, traditional dress only, quiet documentary tone",
        image: milkingImg,
        alt: "Hands milking a mare on open grassland",
      },
    },
    {
      id: "culturing",
      step: "02",
      title: "Time does the work",
      body: "Fresh milk goes into a vessel that already holds a living culture Hours of hand-stirring follow Fermentation breaks down lactose and protein",
      href: "/our-story/manufacturing/#fermentation",
      cta: "Learn more",
      plate: {
        ratio: "16 / 9",
        brief:
          "interior of a ger at golden hour, a traditional wooden fermentation vessel on the ground with a paddle resting nearby, warm amber light through the opening, wood grain and patina, hands mid-stir, no modern objects in frame, quiet documentary tone",
        image: culturingImg,
        alt: "Traditional wooden fermentation vessel inside a ger",
      },
    },
    {
      id: "sealing",
      step: "03",
      title: "Steppe Gut Balance",
      body: "Rich in Vitamin D to support immunity & muscle + bone health",
      href: "/our-story/manufacturing/#made",
      cta: "Learn more",
      plate: {
        ratio: "16 / 9",
        brief:
          "hands sealing a sachet at a wooden table, soft north-facing window light, loose powder visible nearby, natural wood grain and wear, no branding, warm neutral colour, craft-documentation tone",
        image: sealingImg,
        alt: "Hands sealing a sachet of dried ferment on a wooden table",
      },
    },
  ],
};

export const READS = {
  id: "reads",
  title: "What makes us different?",
  items: [
    {
      id: "fermentation",
      href: "/our-story/#fermentation",
      category: "Fermentation",
      title: "Gut health",
      subtext: "Gut and routine",
      plate: {
        ratio: "3 / 4",
        brief:
          "macro detail of fermented culture in a wooden vessel, natural overhead light, visible bubbles and surface movement, amber-cream translucence, shallow depth of field, warm earthy colour, no artificial lighting",
        image: fermentationImg,
        alt: "Macro detail of fermenting culture in a wooden vessel",
      },
    },
    {
      id: "provenance",
      href: "/our-story/#sourcing",
      category: "Provenance",
      title: "Our story",
      subtext: "From Mongolia",
      plate: {
        ratio: "3 / 4",
        brief:
          "single ger on open grassland at golden hour, portrait orientation, a herd of mares grazing at mid-distance, clean open sky for text overlay, warm overexposed light, documentary colour, no people",
        image: provenanceImg,
        alt: "A single ger on open grassland with a herd at distance",
      },
    },
    {
      id: "the-herd",
      href: "/our-story/#sourcing",
      category: "The herd",
      title: "Our story",
      subtext: "Happy mares",
      plate: {
        ratio: "3 / 4",
        brief:
          "three or four mares at rest on grassland, mid-distance, natural standing and grazing postures, no saddles or riders, warm late-afternoon light, calm naturalistic mood, negative space for text overlay",
        image: theHerdImg,
        alt: "Mares at rest on open grassland",
      },
    },
    {
      id: "quality",
      href: "/our-story/#honest-limits",
      category: "Quality",
      title: "Our story",
      subtext: "Made with care",
      plate: {
        ratio: "3 / 4",
        brief:
          "hands holding a filled sample vial up to natural window light, plain wooden work surface, a notebook resting nearby, warm neutral colour, no branding or modern objects, quiet documentary tone",
        image: qualityImg,
        alt: "Hands examining a filled sample vial near a window",
      },
    },
    {
      id: "the-product",
      href: "/products/",
      category: "The product",
      title: "Gut health",
      subtext: "Simple routine",
      plate: {
        ratio: "3 / 4",
        brief:
          "a single sachet with loose powder beside it on linen or light wood, natural side window light, soft shadows, warm neutral colour, clean negative space for text overlay, premium understated styling",
        image: theProductImg,
        alt: "A single sachet with loose powder on a plain surface",
      },
    },
  ],
};

// Index of the page, used by the footer. Kept here rather than hard-coded in
// the footer so it stays accurate if the section order above changes.
export const CONTENTS = [
  { id: ORIGIN.id, numeral: "I", label: "Origin" },
  { id: PROCESS.id, numeral: "II", label: "How it is made" },
  { id: READS.id, numeral: "III", label: "What makes us different" },
];
