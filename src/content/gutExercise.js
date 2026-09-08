import heroSteppe from "../assets/gut-health/exercise-hero-steppe.webp";
import exercisePath from "../assets/gut-health/exercise-path.webp";
import routineNotebook from "../assets/gut-health/routine-notebook-4.webp";
import sleepBed from "../assets/gut-health/sleep-bed-4.webp";
import vegetablesGrains from "../assets/gut-health/diet-vegetables-grains-2.webp";
import warmupCourt from "../assets/gut-health/exercise-warmup-court.webp";
import squatBench from "../assets/gut-health/exercise-squat-bench.webp";
import cardioWalk from "../subpages/venti-views-H9xlJ23Vx8U-unsplash.jpg";
import woodland from "../assets/gut-health/exercise-woodland.webp";
import swimmer from "../assets/gut-health/exercise-swimmer.webp";
import friendsCourt from "../assets/gut-health/exercise-friends-court.webp";
import stairwell from "../assets/gut-health/exercise-stairwell.webp";
import stretchRug from "../assets/gut-health/exercise-stretch-rug.webp";

// Copy for /gut-health/exercise/ ("Gut and Exercise"). The layout is lifted
// from a reference gut-health section page: an opening image band and centred
// title, a "why it matters" block, an alternating media/text row, a paged
// carousel of low-effort ideas, three tip rows each with a short callout, and
// a "more on gut health" shelf at the foot. The words are Steppe Gut's own.
//
// House rules (PUNCTUATION_RULE.md, WRITING_STYLE.md): no terminal full stop
// on any string here. Internal sentence stops inside a multi-sentence block
// are kept, the way src/content/gutDiet.js writes them, and only the last one
// is dropped. Image briefs and alt text carry no stops at all. No
// eyebrow/kicker labels. Claim
// discipline (02_brand_guidelines.md §6): movement and digestion are
// described in general terms, nothing is phrased as a guaranteed effect on
// the reader, and no health outcome is promised. Every image is a written
// placeholder until the photography is shot.

export const GUT_EXERCISE_META = {
  title: "Gut and Exercise · Steppe Gut",
  description:
    "How gentle, regular movement sits alongside a settled gut, with a few low-bar ways to bring more of it into an ordinary day",
};

export const GUT_EXERCISE_HERO = {
  image:
    "a wide quiet steppe path at dawn, a lone walker at an easy pace, soft level daylight",
  src: heroSteppe,
  alt: "A lone walker on a wide steppe path at dawn",
};

export const GUT_EXERCISE_INTRO =
  "Movement is one of the plainer habits that sits alongside a settled gut. A walk after eating, a stretch in the morning, work that keeps you on your feet. This page keeps the bar low on purpose";

// The opening "why is this here" block - a left-aligned heading and a short
// paragraph, before any imagery.
export const GUT_EXERCISE_WHY = {
  heading: "Why movement is important",
  body: "Regular gentle movement is part of an ordinary healthy routine, and it tends to go hand in hand with steady digestion. You do not need a training plan or a gym membership for it to count. Picture the day you already have, and look for the parts of it that keep you upright and moving",
};

// The single alternating media/text row near the top, and the short heading
// block that follows it.
export const GUT_EXERCISE_LEAD_ROW = {
  heading: "Start with what you already do",
  body: "A short walk, a few minutes of stretching, a flight of stairs taken slowly. Gentle movement asks very little and slots into gaps that are already there. Choosing something you will actually keep doing matters more than choosing the hardest option",
  cta: { label: "Gut and routine", to: "/gut-health/routine/" },
  image:
    "someone walking a quiet tree-lined path at an easy pace, seen from behind in soft daylight",
  src: exercisePath,
  alt: "A person walking a quiet tree-lined path at an easy pace",
  ratio: "4 / 5",
};

export const GUT_EXERCISE_LEAD_NOTE = {
  heading: "It does not have to mean long runs or heavy sessions",
  body: "A brisk walk in the park or a game you enjoy still counts. If the activity is one you look forward to, you are far more likely to stay with it week after week and keep movement a normal part of the day",
};

// The paged card shelf - the reference page's "make it fun" rail, rebuilt on
// the same BoosterCarousel the /gut-health/mood/ shelves use. Each card
// carries a one-line caption, a written image brief and a `body` paragraph
// shown in the card's detail panel once it is opened; they are not links.
export const GUT_EXERCISE_WAYS = {
  heading: "Make Fitness Fun",
  items: [
    {
      id: "outdoors",
      caption: "10,000 Steps",
      body: "A daily step count is an easy thing to build a walk around. Break it across the day if that suits you better, a lap at lunch, a longer way home, a turn around the block after dinner, and treat the number as a rough guide rather than a rule",
      image: "a person walking a green woodland path in dappled afternoon light",
      src: woodland,
      alt: "A person walking a green woodland path",
    },
    {
      id: "water",
      caption: "Take a swim",
      body: "Swimming asks something of the whole body while keeping the load off your joints. Set an easy pace you can hold for a while, rest at the wall whenever you need to, and count lengths only if it keeps you going",
      image: "an unhurried swimmer crossing a calm outdoor pool, seen from the side",
      src: swimmer,
      alt: "An unhurried swimmer crossing a calm outdoor pool",
    },
    {
      id: "together",
      caption: "Fun with friends",
      body: "Arranging to move with other people makes it far easier to show up. A regular game, a walking catch-up, a class you go to together, the company does as much of the work as the activity",
      image: "three friends mid-game on a grass court, laughing, low evening sun",
      src: friendsCourt,
      alt: "Three friends playing a relaxed game on a grass court",
    },
    {
      id: "on-foot",
      caption: "Take the stairs",
      body: "Choosing the stairs over the lift is a small decision you can make several times a day. Take them at a steady pace, use the handrail, and stop a floor early while you are still building it up",
      image: "a plain concrete apartment stairwell lit from a long skylight overhead",
      src: stairwell,
      alt: "A plain concrete stairwell lit by a skylight overhead",
    },
    {
      id: "at-home",
      caption: "Stretching",
      body: "A few minutes of slow stretching needs no kit and very little space. Move gently to the first point of resistance, hold it while you breathe, and keep well short of anything that hurts",
      image: "someone stretching slowly on a rug by a window in early light",
      src: stretchRug,
      alt: "A person stretching slowly on a rug by a window",
    },
  ],
};

// The three tip rows - alternating media/text, each with a short callout line
// under the body. `reverse` puts the image on the right; DOM order stays
// image then text at every width.
export const GUT_EXERCISE_TIPS_INTRO = {
  heading: "Top Fitness Tips by us",
  body: "Three easy places to start. Take them at your own pace, build up slowly, and stop if anything hurts",
};

export const GUT_EXERCISE_TIPS = [
  {
    id: "warm-up",
    heading: "Warm up",
    body: "Begin with a few minutes of easy movement. Gentle stretches, then slow versions of whatever you are about to do. This gives your muscles and your mind a chance to catch up before anything more",
    tip: "Try a slow walk on the spot, some shoulder rolls and a few easy lunges",
    image:
      "a person in a low lunge with one arm reaching up, warming up on a grass field in soft morning light",
    src: warmupCourt,
    alt: "A person in a low lunge stretch with one arm raised, warming up on a grass field",
    ratio: "4 / 5",
    reverse: false,
  },
  {
    id: "strength",
    heading: "Build Your Strength",
    body: "Working against some resistance, whether that is light weights, a band or your own bodyweight, helps keep everyday movement easy. Carrying the shopping, standing up from a low chair, climbing stairs",
    tip: "Set aside ten to fifteen minutes and keep every movement slow and controlled",
    image: "someone doing a steady bodyweight squat beside a park bench, unhurried",
    src: squatBench,
    alt: "A person doing a bodyweight squat beside a park bench",
    ratio: "4 / 5",
    reverse: true,
  },
  {
    id: "cardio",
    heading: "Don't forget about cardio",
    body: "Anything that lifts your breathing and your heart rate a little counts. Brisk walking, cycling, an easy swim. It does not need to be hard to be worth doing",
    tip: "Add a ten to fifteen minute brisk walk to your day and build it up over weeks",
    image:
      "a person walking briskly along a wooden boardwalk by the water at an easy pace",
    src: cardioWalk,
    alt: "A person walking briskly along a boardwalk by the water",
    ratio: "4 / 5",
    reverse: false,
  },
];

// The closing shelf - three cards handing off to the other gut-health
// sections.
export const GUT_EXERCISE_MORE = {
  heading: "More on gut health",
  items: [
    {
      id: "routine",
      title: "Gut and routine",
      note: "Where a daily habit sits in the day",
      to: "/gut-health/routine/",
      image: "a plain handwritten daily schedule with a cup resting on the open page",
      src: routineNotebook,
      alt: "A handwritten daily schedule with a cup resting on the page",
    },
    {
      id: "sleep",
      title: "Gut and sleep",
      note: "How the two keep time together",
      to: "/gut-health/sleep/",
      image: "an unmade bed with warm morning sun across white sheets and a green plant in the corner",
      src: sleepBed,
      alt: "An unmade bed with warm morning sunlight on white sheets and a green plant nearby",
    },
    {
      id: "diet",
      title: "Gut and diet",
      note: "What you eat, and what feeds it",
      to: "/gut-health/diet/",
      image:
        "an overhead spread of fresh vegetables and whole grains",
      src: vegetablesGrains,
      alt: "An overhead spread of vegetables and whole grains",
    },
  ],
};
