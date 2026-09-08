import manufacturingHero from "../assets/story/manufacturing-hero.webp";
import theMilking from "../assets/story/story-milking.webp";
import theVessel from "../assets/story/story-vessel.webp";
import measured from "../assets/story/manufacturing-measured.webp";
import makers from "../assets/story/manufacturing-makers.webp";

// Copy for /our-story/manufacturing/. Built to the shape of the reference
// "Manufacturing Process" page: a title, an intro with an offset second
// column, one wide image, two image/text blocks, a centred pull quote, a
// "what is measured" beat, the numbered production steps, a film placeholder,
// a "who makes it" row, then the shared closing bookend.
//
// House rules, amended: the site-wide no-terminal-full-stop rule
// (PUNCTUATION_RULE.md) is relaxed for the big descriptions on the Our Story
// sub-pages, on Will's instruction (2026-09-01). Multi-sentence body copy here
// is punctuated normally, terminal stop included. Headings, the pull quote,
// link labels, alt text and image briefs stay unpunctuated, matching the
// sibling Our Story pages. No em dashes, no " - ". No eyebrow/kicker labels.
// Claim discipline (02_brand_guidelines.md §6): composition and process only,
// nothing phrased as an effect on a person, no "probiotic", Thai FDA
// registration is not stated as issued. The company names match
// src/data/site.js. Every image is a written brief until the production
// photography is shot.

export const MANUFACTURING = {
  heading: "Manufacturing Process",

  intro: {
    heading: "How is Steppe Gut made?",
    body: "Every pack begins with a mare on open grassland in Töv Province, Mongolia, and ends with a sealed sachet. In between there are seven steps. Some of them are eight hundred years old and some of them run on stainless steel, and this page walks through all of them, names the facility, and shows the parts of the process that are not picturesque.",
    aside: "Fresh mare's milk starts to change within hours of milking, and the mares are only in milk from June to October. The whole chain is built around those two facts.",
  },

  heroImage: {
    description:
      "wide production still, a row of steel milk churns stood against a rough plastered wall in cool daylight, no branding",
    src: manufacturingHero,
    alt: "A row of steel milk churns against a plastered wall",
    ratio: "16 / 9",
  },

  blocks: [
    {
      heading: "It starts with the milk",
      body: [
        "Steppe mares were never bred as dairy animals. They graze wild grassland all year and come into milk for one short window in summer, in small amounts, on a schedule the animal sets. Yield per session is a fraction of what a dairy cow gives, and there is no way to change that.",
        "The milk is strained through cloth and cooled as far as conditions on open ground allow. It is handled fast, because the clock starts the moment it leaves the mare.",
      ],
      imageBrief:
        "weathered hands milking a mare on open grassland, close framing on hands and flank, golden hour side light, quiet documentary tone",
      src: theMilking,
      alt: "A herder at his horse on open grassland",
      ratio: "4 / 5",
      reverse: false,
    },
    {
      id: "fermentation",
      heading: "What the fermentation does",
      body: [
        "Strained milk goes into a wooden churn that already carries a living culture from earlier batches. Nothing is inoculated from a packet. Over about four days it is stirred by hand many times a day, by whoever is nearby, and the vessel is kept out of direct sun rather than held at a set temperature.",
        "The culture turns lactose into lactic acid, the acidity rises, and the milk proteins partly unfold. This is ordinary, well-understood food chemistry, and it is the same process herding families have run every season for centuries.",
      ],
      imageBrief:
        "interior of a ger in daylight, a traditional wooden fermentation vessel at ground level with a paddle resting in it, warm light through the door, hands mid-stir",
      src: theVessel,
      alt: "Traditional wooden fermentation vessel inside a ger",
      ratio: "4 / 5",
      reverse: true,
    },
  ],

  quote:
    "About a week between a mare on open grassland and a sealed sachet, and most of that week is fermentation",

  measured: {
    heading: "Every batch is measured, not assumed",
    body: "Fermentation carried out in individual family vessels produces more variation than a single industrial tank would. We manage that by testing every batch before it is released and by blending batches from within one season to even out the difference, and nothing from outside the June to October season is ever blended in. Moisture, protein, fat, lactose, vitamin C, heavy metals and the declared allergen are all checked, and a certificate of analysis is available on request.",
    imageBrief:
      "plain editorial photograph of an analytical balance on a laboratory bench reading a small mass in grams, gloved hands settling a sample on the pan, a graduated cylinder alongside, cool daylight, matter-of-fact tone",
    src: measured,
    alt: "A sample being weighed on an analytical balance in a laboratory",
    ratio: "3 / 4",
  },

  stepsHeading: "Seven steps, pail to sachet",
  steps: [
    {
      title: "Milking",
      body: "Mares are milked in short sessions several times a day on open ground, alongside their foals. Yield per session is small, and this cannot be scaled into a parlour.",
    },
    {
      title: "Straining and cooling",
      body: "The milk is strained through cloth and cooled as far as ambient conditions allow, then handled quickly before it begins to change.",
    },
    {
      title: "Fermentation",
      body: "Into a wooden churn holding an established culture. Four days, stirred by hand many times a day, nothing inoculated from a packet, no temperature control beyond shade.",
    },
    {
      title: "Collection",
      body: "Fermented milk is collected from the families on a fixed schedule through the season and moved chilled to the facility outside Ulaanbaatar.",
    },
    {
      title: "Low-temperature drying",
      body: "Water is removed at low temperature rather than by boiling, which protects the heat-sensitive components, vitamin C in particular. This step also ends the live culture, and we say so plainly.",
    },
    {
      title: "Testing and blending",
      body: "Each batch is tested before release. Batches from within one season are blended to even out variation, and nothing from outside the season is blended in.",
    },
    {
      title: "Filling and sealing",
      body: "Powder is filled into sachets, capsules or pouches under controlled humidity and sealed. Batch and season are printed on every pack.",
    },
  ],

  makers: {
    heading: "Named, not implied",
    body: [
      "Manufacturing is by Monsubi Foods LLC, in Mongolia. Import and distribution in Thailand is by YFamily Co., Ltd., in Bang Rak, Bangkok. The brand is owned by S72 Strategic Co., Ltd.",
      "A supplement whose manufacturer you cannot identify is a supplement worth being cautious about. These are the three companies involved, and there are no others.",
    ],
    imageBrief:
      "plain editorial photograph of brushed stainless steel low-temperature drying equipment in a clean simple production room, cool daylight, no people, matter-of-fact industrial tone",
    src: makers,
    alt: "Stainless steel drying equipment in a plain production room",
    ratio: "3 / 2",
    reverse: false,
  },
};
