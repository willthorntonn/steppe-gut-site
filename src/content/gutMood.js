import moodHero from "../assets/gut-health/mood-hero.webp";
import microbiomeSpoon from "../assets/gut-health/microbiome-spoon-2.webp";
import routineNotebook from "../assets/gut-health/routine-notebook-5.webp";
import sleepBed from "../assets/gut-health/sleep-bed-5.webp";
import greenPath from "../assets/gut-health/mood-green-path.webp";
import exercisePathReadMore from "../assets/gut-health/exercise-path-4.webp";
import morningLight from "../assets/gut-health/mood-morning-light.webp";
import stepEyesClosed from "../assets/gut-health/mood-step-eyes-closed.webp";
import windowsillPlants from "../assets/gut-health/mood-windowsill-plants.webp";
import alarmClock from "../assets/gut-health/mood-alarm-clock.webp";
import yoghurtBowl from "../assets/gut-health/ways-with-food-2.webp";
import deskStretch from "../assets/gut-health/mood-desk-stretch.webp";
import handsWater from "../assets/gut-health/mood-hands-water.webp";
import notebookList from "../assets/gut-health/mood-notebook-list.webp";
import headphonesRecord from "../assets/gut-health/mood-headphones-record.webp";
import dogSun from "../assets/gut-health/mood-dog-sun.webp";
import openWindow from "../assets/gut-health/mood-open-window.webp";

// Copy for /gut-health/mood/ (the "Gut Mood" sub-section). Layout is lifted
// from a reference gut-health article: a wide banner, a centred title, a
// short two-part intro, one media/text row, then a stack of paged card
// shelves grouping the ordinary habits people use to feel steadier, and a
// small "keep reading" grid at the foot.
//
// House rules (PUNCTUATION_RULE.md, WRITING_STYLE.md): no terminal full stop
// on any string here. Internal sentence stops inside a multi-sentence block
// are kept, the way src/content/gutDiet.js writes them, and only the last one
// is dropped. Captions, image briefs and alt text carry no stops at all. No
// eyebrow/kicker labels. Claim
// discipline (02_brand_guidelines.md §6): the ferment and the microbes it
// carries can be described, nothing is phrased as an effect on the reader,
// and none of the habits below are routed through the product. Every image
// is a written placeholder until the photography is shot.

export const GUT_MOOD_HERO = {
  image:
    "a person laughing in bright daylight, surrounded by pale balloons, shot loose and unposed",
  src: moodHero,
  alt: "A person laughing outdoors among pale balloons in bright light",
};

export const GUT_MOOD_INTRO = {
  heading: "The gut and how you feel are more connected than they look",
  body: "A stressful stretch can change both the mix and the behaviour of the microbes in the gut, and the gut sends signals back the other way. So it is worth keeping an eye on the things that wind you up and the things that settle you",
};

export const GUT_MOOD_FEATURE = {
  heading: "The gut and the brain stay in close contact",
  body: "They pass messages along the nervous system in both directions all day, which is why a flat stretch can show up in digestion and an unsettled gut can colour how a day feels. What follows is a set of plain habits people use to look after the second half of that loop",
  image:
    "soft-focus macro of a spoon lifting a pale liquid, fine bubbles catching a low window light",
  src: microbiomeSpoon,
  alt: "Close view of a spoonful of a pale bubbling liquid",
  ratio: "4 / 5",
};

export const GUT_MOOD_HABITS_INTRO = {
  heading: "Some of the habits people use to feel at their best",
  body: "None of this is a treatment and none of it runs through Steppe Gut. These are the simple, low-cost things that fit around an ordinary week. Take the ones that suit you and leave the rest",
};

// The paged shelves, in the order they appear down the page. Each shelf is
// the reference page's card carousel, rebuilt on the same scroll-snap
// mechanics as components/home/ReadsCarousel and
// components/gut-health/WaysToTakeIt. Cards carry a one-line caption and a
// written image brief; they are not links.
export const GUT_MOOD_SHELVES = [
  {
    id: "outside",
    heading: "Time outside",
    intro:
      "Daylight and green space are two of the plainer things that lift a low mood, and neither asks much of a day",
    items: [
      {
        id: "green-walk",
        caption: "A walk somewhere green",
        image: "the lake at Lumphini Park in Bangkok, a green tree lined bank and a couple of pedal boats on calm water with the city soft behind",
        src: greenPath,
        alt: "The lake at Lumphini Park in Bangkok, pedal boats on calm water below a green tree lined bank with the hazy city skyline behind",
      },
      {
        id: "morning-light",
        caption: "Morning daylight, early",
        image: "the sun clearing the horizon over the sea at Ao Nang in Krabi, a long tail boat in silhouette and the light laid out across the water",
        src: morningLight,
        alt: "Sunrise over the sea at Ao Nang in Krabi, the sun low on the horizon behind a long tail boat with light stretched across the water",
      },
      {
        id: "few-minutes-sun",
        caption: "A few minutes in the sun",
        image: "a person sitting on a step in warm light with their eyes closed",
        src: stepEyesClosed,
        alt: "A person resting on a step in warm sunlight",
      },
      {
        id: "keeping-a-plant",
        caption: "Something green to look after",
        image: "a row of small potted plants on a bright windowsill",
        src: windowsillPlants,
        alt: "Small potted plants on a windowsill",
      },
    ],
  },
  {
    id: "shape-of-day",
    heading: "The shape of a day",
    intro:
      "The gut settles when the days around it are regular, and a steady rhythm tends to be felt in mood as well",
    items: [
      {
        id: "regular-wake",
        caption: "A wake-up at a similar time",
        image: "an alarm clock on a bedside table in soft morning light",
        src: alarmClock,
        alt: "An alarm clock on a bedside table",
      },
      {
        id: "sit-down-breakfast",
        caption: "A breakfast you sit down for",
        image: "a bowl of yoghurt and fruit on a table, a spoon resting in it",
        src: yoghurtBowl,
        alt: "A bowl of yoghurt and fruit on a table",
      },
      {
        id: "move-between-tasks",
        caption: "A pause between tasks",
        image: "a person standing to stretch at a cluttered desk by a window",
        src: deskStretch,
        alt: "A person stretching at a desk",
      },
      {
        id: "cold-rinse",
        caption: "A cold rinse to wake up",
        image: "water running over hands at a basin, caught mid-splash",
        src: handsWater,
        alt: "Cold water running over hands at a basin",
      },
    ],
  },
  {
    id: "settling-the-mind",
    heading: "Settling the mind",
    intro:
      "A few small practices that give a busy head somewhere plainer to sit for a while",
    items: [
      {
        id: "name-the-good",
        caption: "Naming the good parts of a day",
        image: "a hand writing a short list in a worn notebook",
        src: notebookList,
        alt: "A hand writing a short list in a notebook",
      },
      {
        id: "music-you-know",
        caption: "Music you already know well",
        image: "headphones resting on a record sleeve on a wooden floor",
        src: headphonesRecord,
        alt: "Headphones resting on a record sleeve",
      },
      {
        id: "time-with-animal",
        caption: "A quiet hour with an animal",
        image: "a dog asleep in a patch of afternoon sun on a rug",
        src: dogSun,
        alt: "A dog asleep in a patch of sunlight",
      },
      {
        id: "slow-breath",
        caption: "One slow breath, repeated",
        image: "a person sitting still by an open window, shoulders low",
        src: openWindow,
        alt: "A person sitting calmly by an open window",
      },
    ],
  },
];

// The foot of the page - a short grid handing off to the neighbouring
// sub-sections, matching the reference's "discover more" row. Image plus a
// plain caption; the whole card is the link.
export const GUT_MOOD_READ_MORE = {
  heading: "Keep reading",
  items: [
    {
      id: "routine",
      caption: "Gut and routine",
      to: "/gut-health/routine/",
      image: "a plain daily schedule written by hand in a notebook, a cup resting on the page",
      src: routineNotebook,
      alt: "A handwritten daily schedule with a cup on the page",
    },
    {
      id: "sleep",
      caption: "Gut and sleep",
      to: "/gut-health/sleep/",
      image: "an unmade bed beside a window in the blue quiet before sunrise",
      src: sleepBed,
      alt: "An unmade bed by a window in pre-dawn light",
    },
    {
      id: "exercise",
      caption: "Gut and exercise",
      to: "/gut-health/exercise/",
      image: "someone walking a quiet path at an easy pace, seen from behind in soft daylight",
      src: exercisePathReadMore,
      alt: "A person walking a quiet path at an easy pace",
    },
  ],
};
