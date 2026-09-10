import missionHero from "../assets/story/mission-hero.webp";
import theLand from "../assets/story/story-land.webp";
import theMares from "../assets/story/story-mares.webp";
import theMilking from "../assets/story/story-milking-2.webp";
import theVessel from "../assets/story/story-vessel-2.webp";
import theHerders from "../assets/story/story-herders.webp";
import timelineRiders from "../assets/story/story-timeline-riders.webp";
import timelineGer from "../assets/story/story-timeline-ger.webp";
import timelineHerder from "../assets/story/story-timeline-herder.webp";
import timelinePowder from "../assets/story/story-timeline-powder.webp";

// Copy for /our-story/mission/. It follows the structure of the reference
// "Our Mission" page (mission statement, pull quote, "Our Story" era rail,
// "fast forward" beat, alternating chapters) with Steppe Gut's own words.
//
// House rules (PUNCTUATION_RULE.md, WRITING_STYLE.md): no terminal full stop
// on any string here. Internal sentence stops inside a multi-sentence block
// are kept, the way src/content/gutDiet.js writes them, and only the last one
// is dropped. Headings, briefs and alt text carry no stops at all. No
// eyebrow/kicker labels. Claim discipline (02_brand_guidelines.md §6):
// provenance and process only, nothing phrased as an effect on a person, and
// Thai FDA registration is not stated as issued. Every image is a written
// brief until the steppe and production photography is shot.

export const MISSION = {
  hero: {
    brief:
      "wide Mongolian steppe at first light, low mist lying in the hollows, a single white ger and a picket line of horses small in the mid-distance, pale cool dawn sky, no people close to camera, no text",
    src: missionHero,
    alt: "Open Mongolian grassland at first light with a ger and horses in the distance",
    ratio: "21 / 9",
  },

  heading: "Our Mission",
  statement:
    "Our mission is to bring one of the world's oldest fermented foods out of Mongolia without changing what it is. Fermented mare's milk has been part of daily life on the steppe for eight hundred years. It was never designed as a health product. It is what the land gives, and what the people who live on it have always made. It had never travelled, because the fresh ferment spoils within days and the mares are only in milk for a few months of the year. We fixed that, and nothing else. It is fermented where it has always been fermented, dried where it is made, and sealed there before it leaves the country",

  timelineHeading: "Our Story",
  timeline: [
    {
      era: "Eight hundred years ago",
      body: "Riders cross the steppe with herds of mares. The milk is fermented as the column moves, and made fresh wherever it stops to camp",
      brief:
        "a mounted column of riders moving across open steppe with a loose herd of mares alongside, low dust behind the hooves, wide unposed framing, muted overcast daylight, no modern objects in shot",
      src: timelineRiders,
      alt: "A herd of horses moving together across open grassland",
    },
    {
      era: "Every season since",
      body: "Herding families keep their own living cultures, each one carried from one summer to the next without a break",
      brief:
        "three generations of a herding family outside their ger at dawn passing a worn wooden pail between them, faint steam off fresh milk, warm low side light, quiet documentary tone",
      src: timelineGer,
      alt: "A herding family's ger standing alone on open grassland",
    },
    {
      era: "Töv Province, today",
      body: "Steppe Gut is formed. The milk is bought from families who were already fermenting it, at a price agreed before each season starts",
      brief:
        "two herders and a Steppe Gut buyer talking beside a full milk churn on the tailgate of a weathered truck, open grassland behind, flat daylight, candid and unposed",
      src: timelineHerder,
      alt: "A herder standing on the open steppe in daylight",
    },
    {
      era: "Now",
      body: "Dried and sealed where it is made, the ferment reaches you as a stable powder, never re-cultured on the way",
      brief:
        "sealed foil sachets of pale powder on a stainless bench inside a small production room, one gloved hand placing a sachet into a carton, clean even light, no branding visible",
      src: timelinePowder,
      alt: "A scoop lifting pale dried powder from a larger heap",
    },
  ],

  todayHeading: "Fast forward to today",
  todayBody: [
    "The way this milk is fermented on the steppe has not changed in eight centuries",
    "and the one thing that has changed is only how far the sealed ferment can now travel",
    "it reaches you unchanged as a dried powder that keeps until the day you add water",
  ],

  chapters: [
    {
      id: "the-land",
      heading: "What the earth can sustain",
      body: [
        "The steppe runs for hundreds of miles without a fence. It sits high, stays dry, and opens to wind on every horizon. The growing season is short, and crops can't take root",
        "Grass thrives, and that one fact shapes everything else. If the land offers only grass, you keep animals that eat it, and you move on when the grass runs out",
      ],
      brief:
        "wide steppe landscape at golden hour, long shadows raking across the grass, low horizon, deep open sky, no buildings or people",
      src: theLand,
      alt: "Wide steppe grassland under an open sky at golden hour",
      ratio: "3 / 2",
    },
    {
      id: "the-horse",
      heading: "The animal everything depends on",
      body: [
        "Horses dig through snow to reach the grass underneath. They travel long distances without complaint. They move a whole household from one pasture to the next",
        "A family's standing was counted in the horses it owned. Among the herd, the mares gave what none of the others could",
      ],
      brief:
        "three or four mares at rest on open grassland at golden hour, natural standing and grazing postures, no saddles or riders, warm side light on their coats",
      src: theMares,
      alt: "Mares at rest on open grassland at golden hour",
      ratio: "3 / 2",
    },
    {
      id: "the-season",
      // Two lines on purpose: the break falls at the comma.
      heading: ["Milk that appears,", "then goes"],
      body: [
        "Steppe mares were never bred as dairy animals. They graze wild grassland all year and come into milk for one short window in summer, in small amounts, on a schedule the animal sets",
        "Milk that arrives for a few weeks and spoils quickly has to become something that lasts. Fermentation was the answer, and people here had understood it for centuries",
      ],
      brief:
        "weathered hands milking a mare on open grassland, close framing on hands and flank, golden hour side light, traditional dress, quiet documentary tone",
      src: theMilking,
      alt: "A herder at his horse on open grassland",
      ratio: "3 / 2",
    },
    {
      id: "the-vessel",
      heading: "Patience and a living culture",
      body: [
        "Fresh milk goes into a vessel that already holds an active culture. Then the stirring begins, not once but for hours, whoever is nearby adding to it. The culture does the real work, and nothing is added to hurry it",
        "Each family kept its culture going from one season to the next. The result is mildly sour, gently sparkling, and still alive. People drank it every day as ordinary food",
      ],
      brief:
        "interior of a ger in daylight, a traditional wooden fermentation vessel at ground level with a paddle resting in it, warm amber light through the door, hands mid-stir",
      src: theVessel,
      alt: "Traditional wooden fermentation vessel inside a ger",
      ratio: "3 / 2",
    },
    {
      id: "what-survives",
      feature: true,
      heading: "Carried forward, not reinvented",
      body: [
        "On the steppe it is still made the way it always has been. Herding families culture it each season by the same method, for the same reasons. This part doesn't need improving",
        "What we do is simple. We take the finished ferment, dry it where it was made, and seal it there. It never ships as a liquid, never gets reconstituted, never gets re-cultured downstream. What reaches you is the original ferment with the water taken out",
      ],
      brief:
        "a herd grazing across open Mongolian grassland with low snow-dusted hills behind, flat daylight, wide unposed documentary framing, no people close to camera, no branding",
      src: theHerders,
      alt: "A herd grazing across open Mongolian grassland below snow-dusted hills",
      ratio: "3 / 2",
    },
  ],
};
