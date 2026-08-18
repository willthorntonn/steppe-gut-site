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
  title: "Old Tradition, Same Great Taste!",
  // Exactly the sentences meant to show — line-clamp-3 in OriginFeature is
  // the actual guardrail, this is just written to land close to 3 lines on
  // its own, ~31 words. Product-update + gut-health beat: the refill pouch is
  // a real lower-packaging format (see data/products.js), and the actives
  // named are the same ones BRAND_GUIDELINES.md and content/home.js's
  // removed HowItWorks copy already claim — nothing here is a new assertion.
  body: "Our new refill pouch still carries the same fermented mare's milk in far less packaging. Inside: vitamin C, omega-3 and B vitamins, unlocked by fermentation — the same living culture, simply repackaged.",
  link: { label: "See how it is made", href: "#process" },
  plate: {
    ratio: "4 / 5",
    brief:
      "Wide steppe landscape at golden hour. Vast sky occupies upper third, grassland lower two-thirds. Light enters from one side (left or right, photographer's choice) creating long shadows across grass. No buildings, no people, no intervention visible. Natural wind-rippled grass texture in foreground (soft focus), mid-ground detail sharp, horizon sharp. Shot on medium-format or full-frame at 50mm equivalent, f4.5. Colour warm and earthy with subtle saturation. Composition feels like observational landscape photography from a travel documentary. Empty sky allows text overlay. No dramatic clouds, no HDR, no exaggerated weather effects—just quiet, genuine terrain.",
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
      body: "Steppe mares graze wild grassland all year. They are milked by hand, outdoors, in a short season once a year.",
      href: "/our-story/#sourcing",
      cta: "Learn more",
      plate: {
        ratio: "16 / 9",
        brief:
          "Hands actively milking a mare on open grassland. Shot from the side at waist level, framing hands, mare's flank and rear leg, and lower body of herder. Golden hour backlight catching hands and mare's coat. Weathered hands with visible age lines and work-worn texture. Mare's body relaxed, slightly turned away from camera, engaged in the work rather than posed. Shot at 85mm, f2.8, hands sharp focus, background soft grassland visible. Captures the rhythm of work—hands in natural position during actual milking. Warm earthy colour cast. No contemporary clothing visible, traditional dress only. Photograph feels like observational documentary of daily practice, not staged portraiture.",
        image: milkingImg,
        alt: "Hands milking a mare on open grassland",
      },
    },
    {
      id: "culturing",
      step: "02",
      title: "Time does the work",
      body: "Fresh milk goes into a vessel that already holds a living culture. Hours of hand-stirring follow. Fermentation breaks down lactose and protein.",
      href: "/our-story/#fermentation",
      cta: "Learn more",
      plate: {
        ratio: "16 / 9",
        brief:
          "Interior of a ger during golden hour. Traditional wooden fermentation vessel sits on the ground, paddle resting inside or nearby. Warm amber light streams through the ger opening (left or right side), creating strong directional shadow pattern across wooden surfaces and the vessel. Wood grain and patina visible—aged, genuine, bearing marks of repeated use. Shot from waist height looking down at 35°, 35mm lens, f2.8. Hands visible mid-motion, stirring the vessel with natural blur from the stirring action (not frozen). Interior shadows are deep but contain detail. Earthen or wooden floor visible beneath vessel. No modern objects in frame. Colour palette warm and muted. Feels like being present during actual daily work—the photographer is a quiet observer, not directing the scene. Documentary editorial style, not performance.",
        image: culturingImg,
        alt: "Traditional wooden fermentation vessel inside a ger",
      },
    },
    {
      id: "sealing",
      step: "03",
      title: "Steppe Gut Balance",
      body: "Rich in Vitamin D to support immunity & muscle + bone health.",
      href: "/gut-health/#nutrition",
      cta: "Learn more",
      plate: {
        ratio: "16 / 9",
        brief:
          "Hands at work on a wooden table sealing sachets. Natural north-facing window light (soft, diffuse, no harsh shadows). One hand holding a filled sachet steady, the other hand or sealing tool in motion, heat-sealing the top. Loose powder visible on wooden surface in the background (slightly out of focus). Wooden table shows natural grain, age marks and wear. Shot from above at 50°, 50mm lens, f3.2, focus locked on the sealing action/hands. Shallow motion blur on the sealing tool or hand moving—not frozen action. Powder texture visible but not exaggerated. No branding visible on sachets or work surface. Hands show natural wear, no artificial lighting or glare. Warm, neutral colour cast. Feels like authentic craft work being documented—the focus is on the work itself, the care in the process. Similar in tone to artisanal food production photography (tea, coffee, spice packaging). No factory aesthetic, no dramatic lighting.",
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
      subtext: "Fermented milk",
      plate: {
        ratio: "3 / 4",
        brief:
          "Close macro detail of fermented culture surface in wooden vessel. Natural overhead light illuminates the liquid, showing active fermentation: visible bubbles, slight surface movement from paddle action, amber-cream translucence. Shallow depth of field (f2.8) with bubbles sharp in immediate foreground, paddle edge soft background. Micro shadows and light refraction visible on bubbles. Wooden vessel rim visible at frame edge showing patina and age. No artificial lighting, no enhancement—just natural diffuse light capturing the living, active quality of fermentation. Warm earthy colour cast. Texture of wood and liquid detail visible. Feels like observational close documentation of an active natural process, not a clinical or stylized product shot. Suitable for text overlay on upper portion of frame.",
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
          "Single ger on open grassland at golden hour, portrait orientation. Lower two-thirds grass with natural rolling variations and texture, upper third open sky (clean for text overlay). Herd of mares visible at mid-distance, slightly soft focus, grazing or at rest—not posed toward camera. Shot from low human eye level (not dramatically low), 35mm lens, f4, creating natural depth between foreground grass and distant structures. Warm, slightly overexposed sky typical of golden hour. Documentary colour palette—no saturation boost, no grading. Feels like observational landscape from travel photography or documentary film. No people visible. No intervention in the scene. The ger and herd are simply there, part of the landscape. Timeless quality—could be from any recent era.",
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
          "Three to four mares at rest on grassland, mid-distance. Animals in relaxed postures (standing, grazing, or resting)—not posed toward camera. Late afternoon/golden hour light creating warm undertones and gentle shadows across their bodies. Shot from human waist level, 50mm lens, f4, creating natural perspective. No saddles, no tack, no riders. Texture of individual coats visible—muscle definition, hair texture, variations in coat colour. Grass and ground texture visible around hooves. No people in frame. Composition feels like quiet observation—the photographer is witnessing daily life, not orchestrating it. Documentary style similar to wildlife editorial photography rather than agricultural stock imagery. Warm, understated colour. Calm, naturalistic mood. Suitable for text overlay in negative space.",
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
          "Quality control moment: hands holding a filled vial up toward light (natural window light), examining the ferment. Hands belong to someone in the act of observation—not posing but genuinely engaged in the work. Plain wooden work surface (table or bench) visible beneath, showing natural grain and age. A notebook and pen lie nearby—handwriting visible on the page but content not legible. Natural diffuse window light provides illumination without drama. Shot at 50mm, f2.5, focus on the vial and examining hands, work surface soft background. No branding or modern objects visible. Warm, neutral colour cast. The atmosphere resembles watching a sommelier, tea master, or experienced craftsperson at work—quiet confidence in the assessment process. Documentary editorial tone. No clinical feel, no lab aesthetic. Feels like observation of genuine craft and care.",
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
          "Single sachet with loose powder beside it on off-white linen or light wood surface. Natural window light enters from one side (left or right, photographer's choice) creating gentle directional shadow and depth. Shot at 45° angle rather than flat overhead, 35mm macro lens, f3.5. Sachet sits naturally with slight angle/asymmetry—not perfectly arranged. Loose powder scattered simply on surface—organic distribution, not a styled pattern. Texture of sachet material (paper, thread, seal edge) visible. Fine powder texture visible without exaggeration. Soft shadows beneath both items add dimension. Warm, neutral colour palette—no colour grading. Negative space clean and ready for text overlay on upper or side areas. Photograph feels like quiet documentation of a finished product—premium, understated, confident without styling. Similar aesthetic to high-end tea, spice, or supplement brand photography. Natural, lived-in quality—not precious or artificial.",
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
