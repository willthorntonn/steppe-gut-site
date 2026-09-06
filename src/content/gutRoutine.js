import routineHero from "../assets/gut-health/routine-hero.webp";
import routineNotebook from "../assets/gut-health/routine-notebook.webp";
import sleepBed from "../assets/gut-health/sleep-bed-6.webp";
import vegetablesGrains from "../assets/gut-health/diet-vegetables-grains-3.webp";
import moodMorningCup from "../assets/gut-health/mood-morning-cup.webp";
import bedsideLamp from "../assets/gut-health/routine-bedside-lamp.webp";
import parkWalk from "../assets/gut-health/routine-thai-park-walk.webp";

// Copy for /gut-health/routine/ ("Gut and Routine" in the Gut Health nav).
// Structure lifted from a reference gut-health "routine" page: an image band
// and centred title, a centred "why routine matters" block, one media/text
// row, a "routine that travels" section with two
// short text blocks under it, two media/text rows on protecting the evening
// and getting outside, a centred pull quote, a "more from Gut Health" grid,
// then the shared closing bookend.
//
// House rules (PUNCTUATION_RULE.md, WRITING_STYLE.md): no terminal full stop
// on any string here. Internal sentence stops inside a multi-sentence block
// are kept, the way src/content/gutDiet.js writes them, and only the last one
// is dropped. Headings, the pull quote, notes, link labels, alt text and image
// briefs carry no stops at all. No em dashes, no " - ". No eyebrow/kicker
// labels: the reference page sets a small grey category label over each card
// and above each heading, and none are carried across. Claim discipline
// (BRAND_GUIDELINES.md §6 / 02_brand_guidelines.md §6): the ferment and the
// habits around it are described, nothing is phrased as an effect on the
// reader, "probiotic" is not used as a benefit claim, circadian rhythm is
// described in general terms with no outcome promised, and Thai FDA
// registration is not stated as issued. Every image is a written placeholder
// until the photography is shot.

export const GUT_ROUTINE_META = {
  title: "Gut and Routine - Gut Health · Steppe Gut",
  description:
    "The gut keeps a rough daily clock, and it settles when the days around it are regular: where meals, light, sleep and a daily ferment sit inside the shape of a day",
};

export const GUT_ROUTINE_HERO = {
  image:
    "a sleep mask and a small wind-up alarm clock side by side on a plain linen surface, soft even morning light, no branding",
  src: routineHero,
};

export const GUT_ROUTINE_INTRO =
  "The gut runs on a rough daily clock of its own, tied closely to when you wake, when you eat and when the light goes down. Keep those roughly steady and the whole system has less to correct for. A daily ferment is one small fixed point in that, never the thing holding it together";

// Centred block, in place of the reference page's "why is routine important"
// standfirst. Kept general: the body clock is described, no benefit is
// promised to the reader.
export const GUT_ROUTINE_WHY = {
  heading: "Why routine matters for the gut",
  body: "Most of the body works to a daily rhythm, and the digestive system is part of that. Hunger, the muscle waves that move food along, the mix of microbes in the gut and the lining they sit against all shift across roughly twenty-four hours. That rhythm takes its cues from regular meal times, morning light and a steady sleep window, so a day that resembles yesterday gives the gut less to adjust to than one that does not",
};

// The lead media/text row, matching the reference page's "our bodies love
// routine" section.
export const GUT_ROUTINE_LEAD_ROW = {
  heading: "The body keeps its own time",
  body: [
    "Left to a regular schedule, the gut falls into a pattern. It expects food at certain hours, quietens overnight, and picks up again in the morning. Shift work, long trips across time zones and a wildly different weekend can all pull that pattern out of shape for a few days",
    "None of this asks for a rigid timetable. Meals inside roughly the same windows, a wake-up time that does not swing by hours, and an evening that resembles the one before are enough for the gut to keep its place",
  ],
  image:
    "a plain daily schedule written by hand in a notebook, a cup resting on the open page, morning light across the desk",
  src: routineNotebook,
  alt: "A handwritten daily schedule with a cup resting on the open page",
  ratio: "4 / 5",
  reverse: false,
};

// The "routine that travels" section, matching the reference page's "going
// away this winter" block: a heading and short intro, then two stacked text
// blocks under it.
export const GUT_ROUTINE_TRAVEL_INTRO = {
  heading: "A routine that travels",
  body: "A trip is where a daily pattern usually slips, and that is fine for a few days. A couple of small anchors carried from home tend to bring things back faster once you are moving between airports, hotels and unfamiliar meal times",
};

export const GUT_ROUTINE_TRAVEL_BLOCKS = [
  {
    heading: "Keep the shape of the day",
    body: "Hold on to the parts that travel easily. Get outside into daylight when you land, eat your first proper meal at roughly the local breakfast or lunch time, and aim for a bedtime within an hour or two of your usual one. The exact hours matter less than keeping the order the same",
  },
  {
    heading: "Eat close to how you eat at home",
    body: "Away from your own kitchen it is easy to drift onto a narrow set of foods. Keep some plants on the plate at most meals, carry the powder so the morning glass still happens, and treat a run of very rich days as the thing to even out rather than something to fix in one go",
  },
];

// Two media/text rows, matching the reference page's "catch the zzz's" and
// "get out and about" sections.
export const GUT_ROUTINE_ROWS = [
  {
    heading: "Protect the evening",
    body: [
      "The last hour before bed sets up the night, and the night is when the gut does most of its quiet housekeeping. A late heavy meal, a long screen session or a shifting bedtime all make that hour less settled",
      "Aim to finish eating a couple of hours before you sleep, dim the lights as the evening goes on, and keep the wind-down short and familiar so it runs on its own",
    ],
    image:
      "a bedside table in low warm lamplight, a glass of water and a folded pair of glasses, curtains half drawn on a dark window",
    src: bedsideLamp,
    alt: "A bedside table in low lamplight with a glass of water",
    ratio: "4 / 5",
    reverse: false,
  },
  {
    heading: "Get outside once a day",
    body: [
      "A stretch of time outdoors does two useful things at once. Daylight, especially in the morning, keeps the body clock set, and the walking that usually comes with it keeps digestion ticking over",
      "It does not need to be far or fast. A loop around the block, a walk to buy something, a few minutes in a garden or a park all count, and doing it at a similar time each day helps more than doing it hard",
    ],
    image:
      "a person on an unhurried walk away from camera across a raised walkway in a city park, big broad-canopied rain trees and warm low daylight",
    src: parkWalk,
    alt: "A person walking an unhurried loop through a green city park",
    ratio: "4 / 5",
    reverse: true,
  },
];

export const GUT_ROUTINE_QUOTE =
  "A day that resembles yesterday asks very little of the gut, and that steadiness is most of what a routine is for";

export const GUT_ROUTINE_MORE = {
  heading: "More from Gut Health",
  items: [
    {
      id: "sleep",
      title: "Gut and sleep",
      note: "What a run of short nights costs the whole system",
      to: "/gut-health/sleep/",
      image:
        "an unmade bed beside a window in the blue quiet before sunrise, soft grey light",
      src: sleepBed,
    },
    {
      id: "diet",
      title: "Gut and diet",
      note: "Where a daily ferment sits in an ordinary week of eating",
      to: "/gut-health/diet/",
      image:
        "overhead spread of vegetables and grains on a linen table",
      src: vegetablesGrains,
    },
    {
      id: "mood",
      title: "Gut and mood",
      note: "How the gut and the brain keep in contact through the day",
      to: "/gut-health/mood/",
      image:
        "a person in a headscarf and knit cardigan sipping from a mug in a warm kitchen, soft daylight behind",
      src: moodMorningCup,
    },
  ],
};

