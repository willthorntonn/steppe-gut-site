import vegetablesGrains from "../assets/gut-health/diet-vegetables-grains.webp";
import infusedWater from "../assets/gut-health/diet-infused-water.webp";
import asparagus from "../assets/gut-health/diet-asparagus.webp";
import fibreBag from "../assets/gut-health/diet-fibre-bag.webp";
import fermentJars from "../assets/gut-health/diet-ferment-jars.webp";
import vegetableGrid from "../assets/gut-health/diet-vegetable-grid.webp";
import kitchenTable from "../assets/gut-health/mood-kitchen-table-2.webp";
import routineNotebook from "../assets/gut-health/routine-notebook-6.webp";
import sleepBed from "../assets/gut-health/sleep-bed-2.webp";

// Copy for /gut-health/diet/ ("Gut Diet" in the Gut Health nav). Built to the
// shape of a reference gut-health "diet" page: a centred title and short
// standfirst, one wide image, two
// image/text blocks with a text-only fermented-foods coda, a three-up "foods
// for the gut" grid, a "more from Gut Health" grid, then the shared closing
// bookend.
//
// House rules (PUNCTUATION_RULE.md, WRITING_STYLE.md): no terminal full stop
// on any string here. Internal sentence stops inside a multi-sentence block
// are kept, the way src/data/faq.js writes them, and only the last one is
// dropped. Headings, the pull quote, notes, link labels, alt text and image
// briefs carry no stops at all. No em dashes, no " - ". No eyebrow/kicker
// labels: the reference page sets a small grey category label over each card
// and above each heading, and none of them are carried across. Claim
// discipline (02_brand_guidelines.md §6): foods and the ferment are
// described, nothing is phrased as an effect on the reader, "probiotic" is
// not used as a benefit claim, Thai FDA registration is not stated as issued.
// Every image is a written placeholder until the photography is shot.

export const GUT_DIET = {
  heading: "Gut and diet",

  standfirst:
    "A healthy gut and a healthy plate are the same project. A wide, mostly plant diet gives the microbes you carry plenty to work with, and a daily ferment is one small part of that, never a stand-in for the rest of the meal",

  intro: {
    heading: "Starts in the gut",
    body: "The gut runs on what reaches it. Fibre from plants, a little ferment, water through the day, meals at roughly regular times. None of it is complicated, and no single food carries the whole load. This page sets out where Steppe Gut fits inside an ordinary week of eating",
    aside:
      "Steppe Gut is one fermented food among many, and not the centre of the plate. It stirs into water, yoghurt or a smoothie in the morning, and sits alongside the vegetables, grains and pulses that carry most of the work across an ordinary week",
  },

  heroImage: {
    description:
      "overhead spread of fresh vegetables, whole grains and pulses on a linen table, even daylight, no branding",
    src: vegetablesGrains,
    alt: "Overhead table of vegetables, grains and pulses",
    ratio: "16 / 9",
  },

  blocks: [
    {
      heading: "H2O first",
      body: [
        "Most of what the digestive system does depends on being well hydrated. Water keeps things moving, helps carry waste out, and keeps the gut lining working as it should",
        "There is no need to count to the millilitre. Drink through the day rather than all at once, more when it is hot or you have been moving, and treat a run of dark urine as the signal to top up",
      ],
      imageBrief:
        "two glass jars of water with sliced cucumber, lemon and mint on a weathered wooden table outdoors, bright daylight",
      src: infusedWater,
      alt: "Two jars of water with cucumber, lemon and mint on a wooden table",
      ratio: "4 / 5",
      reverse: false,
    },
    {
      heading: "What prebiotic foods are",
      body: [
        "Prebiotic foods are plants with fibres the gut cannot break down on its own, so they pass further along and feed the microbes living there. Onions, garlic, leeks, asparagus and artichokes carry them, and to a smaller degree so do beans and some whole grains like oats",
        "The practical version is short. Eat a wide range of plants across the week and the prebiotic side mostly takes care of itself",
      ],
      imageBrief:
        "bundle of fresh asparagus spears standing in brown paper against a plain deep-green backdrop, even studio daylight",
      src: asparagus,
      alt: "A bundle of fresh asparagus spears wrapped in brown paper",
      ratio: "4 / 5",
      reverse: true,
    },
  ],

  fermented: {
    heading: "Fermented foods",
    body: "Pickles, kimchi, sauerkraut, kefir and live yoghurt all carry microbes from their own fermentation, and each one adds variety to the mix you already have. Steppe Gut belongs in this group, a fermented mare's milk dried to a powder. Work on fermented foods points to a more varied gut community in people who eat them regularly, which is the reason to keep a little in the weekly rotation rather than to lean on any one of them",
  },

  foods: {
    heading: "Foods for the gut",
    intro:
      "Three habits rather than a shopping list, each one easy to keep going across a normal week",
    items: [
      {
        id: "fibre",
        title: "Fibre",
        note: "Vegetables, fruit, whole grains and pulses across every day",
        to: "/gut-health/diet/",
        image:
          "loose pile of high-fibre vegetables and grains spilling from a brown paper bag, daylight",
        src: fibreBag,
      },
      {
        id: "fermented",
        title: "Fermented foods",
        note: "A small serving of something cultured most days",
        to: "/gut-health/diet/",
        image:
          "row of open jars of kimchi, sauerkraut and kefir on a plain shelf, soft side light",
        src: fermentJars,
      },
      {
        id: "plants",
        title: "A range of plants",
        note: "Many different plants across a week rather than a lot of a few",
        to: "/gut-health/diet/",
        image:
          "overhead grid of many different vegetables, herbs and fruits arranged loosely by colour",
        src: vegetableGrid,
      },
    ],
  },

  more: {
    heading: "More from Gut Health",
    items: [
      {
        id: "mood",
        title: "Gut and mood",
        note: "How the gut and the brain keep in contact",
        to: "/gut-health/mood/",
        image:
          "person at a kitchen table in morning light, cup in hand, unhurried and mid-thought",
        src: kitchenTable,
      },
      {
        id: "routine",
        title: "Gut and routine",
        note: "Where a daily ferment sits in the shape of a day",
        to: "/gut-health/routine/",
        image:
          "a plain daily schedule written by hand in a notebook, a cup resting on the open page, morning light across the desk",
        src: routineNotebook,
      },
      {
        id: "sleep",
        title: "Gut and sleep",
        note: "What a run of short nights costs the whole system",
        to: "/gut-health/sleep/",
        image:
          "an unmade bed beside a window in the blue quiet before sunrise, soft grey light",
        src: sleepBed,
      },
    ],
  },
};
