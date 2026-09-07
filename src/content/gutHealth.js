import dietFruitBowl from "../assets/gut-health/diet-fruit-bowl.webp";
import microbiomeSpoon from "../assets/gut-health/microbiome-spoon.webp";
import routineBedsideTable from "../assets/gut-health/routine-bedside-lamp-2.webp";
import moodMorningCup from "../assets/gut-health/mood-morning-cup.webp";
import exercisePath from "../assets/gut-health/exercise-path-2.webp";
import sleepBed from "../assets/gut-health/sleep-bed-3.webp";
import smallDroplet from "../assets/gut-health/small-droplet.webp";
import waysMorning from "../assets/gut-health/ways-morning.webp";
import waysWithFood from "../assets/gut-health/ways-with-food.webp";
import waysAfterTraining from "../assets/gut-health/ways-after-training.webp";
import waysEvening from "../assets/gut-health/ways-evening.webp";

// Copy for /gut-health/ (the "All" overview). The layout is lifted from a
// reference gut-health hub: centred intro, then alternating media/text rows
// that each hand off to a sub-section, with a small "ways to take it" shelf
// in the middle. The words are Steppe Gut's own.
//
// House rules (PUNCTUATION_RULE.md, WRITING_STYLE.md): no terminal full stop
// on any string here. Internal sentence stops inside a multi-sentence block
// are kept, the way src/content/gutDiet.js writes them, and only the last one
// is dropped. Image briefs and alt text carry no stops at all. No
// eyebrow/kicker labels. Claim discipline
// (02_brand_guidelines.md §6): the ferment and the microbes it contains can
// be described, nothing is phrased as an effect on the reader, and Thai FDA
// registration is not stated as issued. Every image is a written placeholder
// until the photography is shot.

// Rendered as three near-equal centred lines under the page title, matching
// the split lead on /our-story/. Keep each line close in length.
export const GUT_HEALTH_INTRO_LINES = [
  "We treat the gut as the starting point rather than an afterthought.",
  "Everything we make sits around one old, living ferment and the ordinary",
  "daily habits that go with it. This page is how the two fit together",
];

// The alternating rows, in the order they appear down the page. `reverse`
// puts the image on the right; the DOM order stays image then text at every
// width, matching ui/MediaTextRow.
export const GUT_HEALTH_ROWS = [
  {
    id: "diet",
    heading: "What you eat, and what feeds it",
    body: "A varied diet with plenty of plants gives the gut a wide range of things to work with. Steppe Gut is one fermented food among many, never a stand-in for the rest of the plate. The diet page sets out where it fits in an ordinary day of eating",
    cta: { label: "Gut and diet", to: "/gut-health/diet/" },
    image: "overhead spread of fresh fruit on a linen table",
    src: dietFruitBowl,
    alt: "Overhead spread of fresh fruit in a bowl",
    ratio: "4 / 5",
    // The source frame sits the bowl low and right of centre with a wide
    // white marble border; nudge it back to centre and scale in, so the whole
    // bowl reads with a thin margin either side. The source is 640x800 and the
    // frame is 4/5, so object-cover leaves no crop slack of its own - the
    // scale has to open up more than the nudge shifts, or the photo pulls off
    // the top and right edges and shows its own square corners inside the
    // rounded frame. At this nudge that means scale >= 1.12; 1.14 keeps a
    // margin at every breakpoint.
    imgStyle: {
      transform: "scale(1.14) translate(-5%, 4%)",
      transformOrigin: "50% 50%",
    },
    reverse: true,
  },
  {
    id: "microbiome",
    heading: "The community you carry",
    body: "Trillions of microbes live in the human gut, and no two people carry quite the same mix. Fermented foods have been part of that picture for as long as people have made them. We keep a running list of the questions we are asked most about the ferment and the microbes in it",
    cta: { label: "Common questions", to: "/faq/" },
    image:
      "soft-focus macro of a spoon lifting a pale liquid, fine bubbles catching a low window light",
    src: microbiomeSpoon,
    alt: "Close view of a spoonful of a pale bubbling liquid",
    ratio: "4 / 5",
    reverse: false,
  },
  {
    id: "routine",
    heading: "A place in the day",
    body: "The gut keeps its own rough schedule, and it settles when the days around it are regular. Meals at similar times, a steady wake-up, an evening that resembles yesterday's. The routine page looks at where a daily ferment sits inside that",
    cta: { label: "Gut and routine", to: "/gut-health/routine/" },
    image:
      "a bedside table in low light, a small clock, a lamp and a few flowers in a jar",
    src: routineBedsideTable,
    alt: "A bedside table with a lamp, a small clock and flowers in a glass jar",
    ratio: "4 / 5",
    reverse: false,
  },
  {
    id: "mood",
    heading: "The gut and how you feel",
    body: "The gut and the brain stay in close contact through the nervous system, and each one reads the state of the other. A flat stretch can show up in digestion, and an unsettled gut can colour a day. The mood page walks through what is understood about that link and what is still being studied",
    cta: { label: "Gut and mood", to: "/gut-health/mood/" },
    image:
      "a person in a headscarf and knit cardigan sipping from a mug in a warm kitchen, soft daylight behind",
    src: moodMorningCup,
    alt: "A person sipping from a mug in a warm kitchen in soft daylight",
    ratio: "4 / 5",
    reverse: true,
  },
  {
    id: "exercise",
    heading: "Movement, at an ordinary pace",
    body: "Regular gentle movement is one of the plainer things that keeps digestion ticking over. A walk after eating, a stretch in the morning, work that keeps you on your feet. The exercise page keeps the bar low on purpose",
    cta: { label: "Gut and exercise", to: "/gut-health/exercise/" },
    image:
      "someone walking a quiet tree-lined path at an easy pace, seen from behind in soft daylight",
    src: exercisePath,
    alt: "A person walking a quiet path at an easy pace",
    ratio: "4 / 5",
    reverse: false,
  },
  {
    id: "sleep",
    heading: "What a short night costs",
    body: "Sleep and the gut run on overlapping clocks, so a run of short nights tends to be felt in both. Protecting the hours you sleep is one of the few habits that pays back across the whole system. The sleep page covers how the two keep time together",
    cta: { label: "Gut and sleep", to: "/gut-health/sleep/" },
    image:
      "an unmade bed beside a window in the blue quiet before sunrise, soft grey light",
    src: sleepBed,
    alt: "An unmade bed by a window in pre-dawn light",
    ratio: "4 / 5",
    reverse: true,
  },
  {
    id: "small",
    heading: "The power of something very small",
    body: "A single microbe is far too small to see, and there are more of them inside you than there are people on earth. Looked after, that population does a great deal of quiet work. Steppe Gut is one way of sending it something it already recognises",
    cta: { label: "See the products", to: "/products/" },
    image:
      "a single dew drop held on a blade of grass, magnified until it fills the frame, soft green light behind",
    src: smallDroplet,
    alt: "A single dew drop resting on a blade of grass",
    ratio: "4 / 5",
    reverse: false,
  },
];

// The middle shelf - a short, paged row of ways people already fit the
// powder into a day. Cards carry a label, a title and one line, and each
// hands off to the sub-section it belongs with.
export const GUT_HEALTH_WAYS = {
  heading: "Ways people take it",
  intro:
    "The powder dissolves in cold or warm liquid, so it slots into a day wherever there is already a glass or a bowl",
  items: [
    {
      id: "morning",
      label: "Morning",
      title: "Stirred into water",
      note: "Before anything else",
      to: "/gut-health/routine/",
      image: "a glass of cloudy liquid on a windowsill in early daylight",
      src: waysMorning,
      alt: "A glass of cloudy liquid on a windowsill",
    },
    {
      id: "with-food",
      label: "With food",
      title: "Alongside a meal",
      note: "Into yoghurt or a smoothie",
      to: "/gut-health/diet/",
      image: "a bowl of yoghurt with a spoon resting in it",
      src: waysWithFood,
      alt: "A bowl of yoghurt with a spoon resting in it",
    },
    {
      id: "after-training",
      label: "After training",
      title: "In a recovery drink",
      note: "Once things have settled",
      to: "/gut-health/exercise/",
      image: "a shaker bottle beside a folded towel on a worn wooden bench",
      src: waysAfterTraining,
      alt: "A shaker bottle and dumbbell on a gym bench",
    },
    {
      id: "evening",
      label: "Evening",
      title: "Warm, before bed",
      note: "Part of winding down",
      to: "/gut-health/sleep/",
      image: "a warm cup held in two hands in low lamplight",
      src: waysEvening,
      alt: "A warm cup held in two hands in low light",
    },
  ],
};
