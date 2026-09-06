import sleepHero from "../assets/gut-health/sleep-hero.webp";
import bedsideLamp from "../assets/gut-health/routine-bedside-lamp-2.webp";
import doorwayMorning from "../assets/gut-health/routine-doorway-morning-2.webp";
import familyMeal from "../assets/gut-health/sleep-cleared-plate.webp";
import singleLamp from "../assets/gut-health/sleep-single-lamp.webp";
import curtainsDrawn from "../assets/gut-health/sleep-curtains-drawn.webp";
import alarmClock from "../assets/gut-health/sleep-wind-up-clock.webp";
import routineNotebook from "../assets/gut-health/routine-notebook-6.webp";
import moodMorningCup from "../assets/gut-health/mood-kitchen-table-4.webp";
import exercisePath from "../assets/gut-health/exercise-path-6.webp";
import sleepBed from "../assets/gut-health/sleep-bed.webp";
import curtainsOpen from "../assets/gut-health/sleep-late-morning-light.webp";

// Copy for /gut-health/sleep/ ("Gut and Sleep" in the Gut Health nav).
// Structure lifted from a reference gut-health "sleep" page: an image band
// and centred title, a centred "why sleep matters" block, one media/text row
// on looking after the gut overnight, a two-block "overnight window" section
// (the sleep hormone, how much sleep), a paged rail of bedtime habits, two
// media/text rows on short nights and catching up, a centred pull quote, a
// "more from Gut Health" grid, then the shared closing bookend.
//
// House rules (PUNCTUATION_RULE.md, WRITING_STYLE.md): no terminal full stop
// on any string here. Internal sentence stops inside a multi-sentence block
// are kept, the way src/content/gutRoutine.js writes them, and only the last
// one is dropped. Headings, the pull quote, notes, link labels, alt text and
// image briefs carry no stops at all. No em dashes, no " - ". No
// eyebrow/kicker labels: the reference page sets a small grey category label
// over the hero and above each heading, and none are carried across. Claim
// discipline (BRAND_GUIDELINES.md §6): sleep, the body clock and the habits
// around bedtime are described in general terms, nothing is phrased as an
// effect on the reader, "probiotic" is not used as a benefit claim, melatonin
// and circadian rhythm are described generally with no outcome promised, and
// Thai FDA registration is not stated as issued. Every image is a written
// placeholder until the photography is shot.

export const GUT_SLEEP_META = {
  title: "Gut and Sleep - Gut Health · Steppe Gut",
  description:
    "Sleep and the gut keep the same daily clock: what a run of short nights asks of the digestive system, and the small bedtime habits that keep the two in step",
};

export const GUT_SLEEP_HERO = {
  image:
    "a person asleep on their side under a pale duvet, a soft sleep mask pushed up on the forehead, low even light from a window off frame, no branding",
  src: sleepHero,
};

export const GUT_SLEEP_INTRO =
  "Sleep and digestion run on the same roughly twenty-four hour clock, and they read the same cues: morning light, the timing of meals, a steady hour for bed. Keep the nights regular and the gut has a quieter, more predictable stretch to do its overnight work in. A daily ferment is one small fixed point in that day, never the thing holding the rhythm together";

// Centred block, in place of the reference page's "why is sleep important"
// standfirst. Kept general: the body clock and the gut are described, no
// benefit is promised to the reader.
export const GUT_SLEEP_WHY = {
  heading: "Why sleep matters for the gut",
  body: "A broken night does more than leave you tired. The digestive system keeps its own daily rhythm, and that rhythm is tied closely to the sleep and wake cycle. The muscle waves that move food along, the timing of hunger, and the mix of microbes in the gut all shift across the day and settle overnight. Disrupt sleep often enough, or push it around by several hours, and that overnight settling has less room to happen",
};

// The lead media/text row, matching the reference page's "it's important to
// take good care of our gut" section.
export const GUT_SLEEP_LEAD_ROW = {
  heading: "The overnight shift",
  body: [
    "Most of the gut's quiet housekeeping happens while you sleep. The pace of digestion drops, the muscle waves that sweep the small intestine clear run more freely between meals, and the lining has a long undisturbed stretch with nothing new arriving",
    "That stretch works best when it is long enough and starts at a similar time each night. A late heavy meal, a bedtime that swings by hours, or a run of five-hour nights all cut into it, and the gut spends the next day catching up rather than ticking over",
  ],
  image:
    "a dim bedroom at night, a glass of water and a folded pair of glasses on the bedside table, curtains half drawn on a dark window",
  src: bedsideLamp,
  alt: "A bedside table in low light with a glass of water and folded glasses",
  ratio: "4 / 5",
  reverse: false,
};

// The "overnight window" section, matching the reference page's stacked
// "melatonin for sleep" and "how much sleep do adults need" blocks: a heading
// and short intro, then two stacked text blocks under it.
export const GUT_SLEEP_WINDOW_INTRO = {
  heading: "What sets the night",
  body: "Two things shape how much the gut gets out of a night: the signal that starts sleep, and how long the night runs. Both take their cues from a regular day rather than from anything you do at bedtime alone",
};

export const GUT_SLEEP_WINDOW_BLOCKS = [
  {
    heading: "The sleep signal",
    body: "Melatonin is the hormone that rises in the evening as the light drops and tells the body the night has started. It is not only made in the brain; the gut wall carries a large share of the body's melatonin too, which is part of why the digestive system tracks the sleep cycle so closely. Dim indoor light in the last hour before bed, and a dark room, let that evening rise happen on time",
  },
  {
    heading: "How long a night runs",
    body: "Most adults do best on somewhere between seven and nine hours, kept to a similar window from one night to the next. What the number is matters less than holding it roughly steady. A consistent wake time is the easier end to fix, since it also sets the following evening",
  },
];

// The paged rail of bedtime habits, matching the reference page's "how to get
// better quality sleep at bedtime" carousel. Cards carry a title and one
// line, no kicker label, each handing off to the section it belongs with.
export const GUT_SLEEP_HABITS = {
  heading: "Habits that set up the night",
  intro:
    "Five small fixed points around bedtime, each one easy to keep through an ordinary week and none of them a rule",
  items: [
    {
      id: "light-early",
      title: "Light early",
      note: "A few minutes outside soon after waking to set the day's clock",
      to: "/gut-health/routine/",
      image:
        "a person standing at an open doorway in low morning sun, cup in hand, long shadow across the floor",
      src: doorwayMorning,
    },
    {
      id: "finish-eating-earlier",
      title: "Finish eating earlier",
      note: "The last proper meal a couple of hours before bed rather than right before it",
      to: "/gut-health/diet/",
      image:
        "a family sharing an early evening meal at a wooden table, bowls and chopsticks, warm indoor light",
      src: familyMeal,
    },
    {
      id: "dim-the-evening",
      title: "Dim the evening",
      note: "Lower light and screens down in the last hour so the sleep signal rises on time",
      to: "/gut-health/routine/",
      image:
        "a living room lit only by a single low lamp, a book face down on a blanket, dark window behind",
      src: singleLamp,
    },
    {
      id: "cool-dark-room",
      title: "A cool dark room",
      note: "Curtains drawn and the room a little cooler than the rest of the home",
      to: "/gut-health/sleep/",
      image:
        "a tidy bedroom with heavy curtains fully drawn, bed turned down, faint light at the curtain edge",
      src: curtainsDrawn,
    },
    {
      id: "steady-wake-time",
      title: "A steady wake time",
      note: "Getting up within the same hour each day, including at the weekend",
      to: "/gut-health/routine/",
      image:
        "a twin-bell alarm clock and a small plant on a bedside table beside a made bed, daylight, no people",
      src: alarmClock,
    },
  ],
};

// Two media/text rows, matching the reference page's lower content sections.
export const GUT_SLEEP_ROWS = [
  {
    heading: "What short nights ask of the gut",
    body: [
      "A single late night is a small thing the body evens out quickly. A run of them is where the daily rhythm starts to drift. Hunger signals get louder and less regular, meals move later, and the overnight clear-out keeps getting cut short",
      "The fix is not a perfect night. It is stringing together a few ordinary ones: the same wake time, an evening that resembles the one before, and meals back inside their usual windows",
    ],
    image:
      "an unmade bed beside a window in the blue quiet before sunrise, soft grey light across rumpled sheets",
    src: sleepBed,
    alt: "An unmade bed beside a window in the grey light before sunrise",
    ratio: "4 / 5",
    reverse: false,
  },
  {
    heading: "Catching up is not the same",
    body: [
      "A long weekend lie-in feels like repayment, and some of the lost hours do come back. What a lie-in does not do is reset the clock, because sleeping until midday pushes the next evening later and the following week starts already shifted",
      "Evening out gently works better than a single big correction. Bring the wake time back by half an hour at a time, get outside into daylight early, and let the bedtime follow rather than forcing it",
    ],
    image:
      "a person drawing open sheer curtains to let bright daylight into a calm room, seen from behind",
    src: curtainsOpen,
    alt: "A person opening sheer curtains to bright daylight, seen from behind",
    ratio: "4 / 5",
    reverse: true,
  },
];

export const GUT_SLEEP_QUOTE =
  "The gut does its steadiest work on a night that looks like the one before it, and most of what good sleep gives it is that sameness";

export const GUT_SLEEP_MORE = {
  heading: "More from Gut Health",
  items: [
    {
      id: "routine",
      title: "Gut and routine",
      note: "Where meals, light and sleep sit inside the shape of a day",
      to: "/gut-health/routine/",
      image:
        "a plain daily schedule written by hand in a notebook, a cup resting on the open page, morning light across the desk",
      src: routineNotebook,
    },
    {
      id: "mood",
      title: "Gut and mood",
      note: "How the gut and the brain keep in contact through the day",
      to: "/gut-health/mood/",
      image:
        "a woman by a window in warm morning light, mug held in both hands, unhurried and mid-thought",
      src: moodMorningCup,
    },
    {
      id: "exercise",
      title: "Gut and exercise",
      note: "What easy daily movement does for digestion",
      to: "/gut-health/exercise/",
      image:
        "a woman walking an easy pace along a green tree-lined park path in soft daylight",
      src: exercisePath,
    },
  ],
};

