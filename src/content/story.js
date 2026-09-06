import theLand from "../assets/photography/story-the-land.png";
import theHorse from "../assets/photography/story-the-horse.png";
import theSeason from "../assets/photography/story-the-season.png";
import theVessel from "../assets/photography/story-the-vessel.png";
import theRiders from "../assets/photography/story-the-riders.png";
import whatSurvives from "../assets/photography/story-what-survives.png";

// The homepage long-read. Copy is deliberately qualitative: no dates,
// temperatures, yields or durations are asserted, because none of those are
// sourced. Claims stay at the level the research summary supports.
//
// VOICE GUIDELINES: Clear, elegant, and trustworthy. Premium wellness brand.
// Short sentences. Everyday vocabulary with sophistication. Confident but never
// exaggerated. Focus on benefits and lifestyle. Warm and respectful.
//
// Each chapter carries its own plate brief so the photography can be
// commissioned straight from this file.

export const STANDFIRST = {
  eyebrow: "Origin",
  lead: "For eight hundred years, fermented mare's milk has been part of life on the Mongolian steppe. Not as a designed health product. As what the land gives, and what bodies thrive on",
  sub: "Still made the same way, eight hundred years on",
};

export const CHAPTERS = [
  {
    id: "the-land",
    numeral: "I",
    folio: "The land",
    title: "What the earth can sustain",
    body: [
      "The steppe extends for hundreds of miles without fences. It sits at high altitude, stays dry year-round, and opens to wind on every horizon. Winters kill livestock that aren't built for it. The growing season is brief. Crops cannot take root here",
      "Grass thrives. That one fact shapes everything else. If the land offers only grass, you keep animals that eat it, and you move when the grass runs out",
    ],
    pullQuote:
      "The land offers grass. So you keep animals that eat grass, and you move when it runs out",
    plate: {
      ratio: "21 / 9",
      brief:
        "wide steppe landscape at golden hour, long shadows raking across the grass, low horizon, deep open sky, no buildings or people, warm earthy colour, clean sky for text overlay",
      image: theLand,
      alt: "Wide steppe grassland under an open sky at golden hour",
      tone: "light",
    },
  },
  {
    id: "the-horse",
    numeral: "II",
    folio: "The horse",
    title: "The animal everything depends on",
    body: [
      "Cattle require shelter and softer terrain than the steppe provides. Horses don't. They dig through snow to reach grass below. They travel long distances without complaint. They move an entire household from one pasture to the next",
      "Horses became central to everything. Transport, wealth, food, and survival. A family's standing was counted in horses owned. Among the herd, the mares gave what none of the others could",
    ],
    pullQuote:
      "Horses carried everything: transport, wealth, food. Only the mares gave milk",
    plate: {
      ratio: "3 / 2",
      brief:
        "three or four mares at rest on open grassland at golden hour, natural standing and grazing postures, no saddles or riders, warm side light on their coats, calm undramatic mood, negative space for text overlay",
      image: theHorse,
      alt: "Mares at rest on open grassland at golden hour",
      tone: "light",
    },
  },
  {
    id: "the-season",
    numeral: "III",
    folio: "The season",
    title: "Milk appears, then vanishes",
    body: [
      "Steppe mares were never bred as dairy animals. They graze wild grassland all year and produce milk only during one brief window in summer, in small quantities, on a schedule the animal controls",
      "This scarcity shaped everything that followed. Milk that arrives for weeks and spoils quickly must become something that lasts. Fermentation was the solution, one that cultures had understood for centuries",
    ],
    pullQuote:
      "Milk that spoils fast has to become something else. Fermentation was the only answer available",
    plate: {
      ratio: "4 / 5",
      width: "portrait",
      brief:
        "weathered hands milking a mare on open grassland, close framing on hands and flank, golden hour side light, traditional dress, quiet documentary tone",
      image: theSeason,
      alt: "Hands milking a mare on open grassland",
      tone: "light",
    },
  },
  {
    id: "the-vessel",
    numeral: "IV",
    folio: "The vessel",
    title: "Patience and a living culture",
    body: [
      "Fresh milk flows into a vessel already holding an active culture. Then the stirring begins: not once, but continuously for hours, whoever is nearby adding effort. The culture does the real work. Nothing is added to speed it up",
      "Each family maintained its culture from season to season, year to year. The result: mildly sour, gently effervescent, still alive. People drank it daily, not as medicine, but as ordinary food their bodies understood and welcomed",
    ],
    pullQuote:
      "A living culture, gentle stirring, patience. The result is food that belongs to the body",
    plate: {
      ratio: "3 / 2",
      brief:
        "interior of a ger in daylight, a traditional wooden fermentation vessel at ground level with a paddle resting in it, warm amber light through the door, hands mid-stir, no modern objects in frame, quiet documentary tone",
      image: theVessel,
      alt: "Traditional fermentation vessel inside a ger",
      tone: "dark",
    },
  },
  {
    id: "the-riders",
    numeral: "V",
    folio: "The riders",
    title: "Food that travels on four legs",
    body: [
      "Mongol cavalry moved faster than supply wagons ever could, so they didn't keep them. Instead, riders traveled with herds of horses. The mares in those herds were milked as the column moved",
      "The fermented milk traveled because it needed no cart. It walked alongside the column on four legs and was made fresh wherever they stopped to camp. An army that never waits for food moves at a speed nothing else can match",
    ],
    pullQuote:
      "Food that feeds itself, carries itself, and is made wherever the column stops",
    plate: {
      ratio: "21 / 9",
      brief:
        "riders strung out across open grassland at distance during golden hour, warm backlit silhouettes and rim light on horses and riders, historically authentic dress, horses in varied natural postures, no heroic angles, documentary tone",
      image: theRiders,
      alt: "Riders on horseback crossing open grassland at golden hour",
      tone: "dark",
    },
  },
  {
    id: "what-survives",
    numeral: "VI",
    folio: "What survives",
    title: "Carried forward, not reinvented",
    body: [
      "On the steppe today, it's still made exactly as it was made centuries ago. Herder families culture it each season using the same methods for the same reasons. This part doesn't need improvement",
      "What we do is simple: take the finished ferment, dry it where it was made, and seal it there. It never ships as liquid, gets reconstituted, or re-cultured downstream. What reaches you is the original ferment with the water removed, preserved exactly as the herders intended and ready to wake up when you add water",
    ],
    pullQuote:
      "The practice already existed. All we do is preserve it, so nothing gets diluted by distance or convenience",
    plate: {
      ratio: "3 / 2",
      brief:
        "a craftsperson's hands at work on a simple wooden table, natural diffuse light from a north-facing opening, one hand steady and the other in motion, natural wood grain and wear, no branding, warm neutral colour, artisanal craft-documentation tone",
      image: whatSurvives,
      alt: "Hands at work on a simple wooden table",
      tone: "light",
    },
  },
];
