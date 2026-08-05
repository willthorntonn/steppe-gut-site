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
  lead: "For eight hundred years, fermented mare's milk has been part of life on the Mongolian steppe. Not as a designed health product. As what the land gives, and what bodies thrive on.",
  sub: "Still made the same way, eight hundred years on.",
};

export const CHAPTERS = [
  {
    id: "the-land",
    numeral: "I",
    folio: "The land",
    title: "What the earth can sustain.",
    body: [
      "The steppe extends for hundreds of miles without fences. It sits at high altitude, stays dry year-round, and opens to wind on every horizon. Winters kill livestock that aren't built for it. The growing season is brief. Crops cannot take root here.",
      "Grass thrives. That one fact shapes everything else. If the land offers only grass, you keep animals that eat it, and you move when the grass runs out.",
    ],
    pullQuote:
      "The land offers grass. So you keep animals that eat grass, and you move when it runs out.",
    plate: {
      ratio: "21 / 9",
      brief:
        "Wide steppe landscape at golden hour. Light enters from one cardinal direction (photographer's choice), creating long shadows across grass. Lower third foreground (soft focus showing grass texture), middle third sharp detail showing rolling terrain, upper third deep open sky. Low horizon line. No buildings, no people, no visible human intervention. Shot on 35mm film or digital equivalent, 35mm lens, f5.6 for natural depth. Visible film grain or subtle digital texture. Warm earthy colour cast, no saturation boost. Composition resembles documentary landscape photography—observed rather than composed for drama. Sky remains clean and open, suitable for text overlay. Timeless quality. No theatrical clouds or weather effects.",
      image: theLand,
      alt: "Wide steppe grassland under an open sky at golden hour",
      tone: "light",
    },
  },
  {
    id: "the-horse",
    numeral: "II",
    folio: "The horse",
    title: "The animal everything depends on.",
    body: [
      "Cattle require shelter and softer terrain than the steppe provides. Horses don't. They dig through snow to reach grass below. They travel long distances without complaint. They move an entire household from one pasture to the next.",
      "Horses became central to everything. Transport, wealth, food, and survival. A family's standing was counted in horses owned. Among the herd, the mares gave what none of the others could.",
    ],
    pullQuote:
      "Horses carried everything: transport, wealth, food. Only the mares gave milk.",
    plate: {
      ratio: "3 / 2",
      brief:
        "Three to four mares on grassland at golden hour. Animals in natural resting postures—standing, grazing, lying down, or alert—not directed toward camera. Mid-distance composition allows grass texture in foreground to remain visible. Warm amber golden hour light catches coat texture and musculature. Shot at 50mm, f4, from human waist level creating natural perspective. No saddles, no riders, no tack visible. Coat texture, muscle definition, individual animal variation visible. Ground detail and grass visible. No people in frame. Composition feels like quiet observation of wild or semi-wild animals going about their daily routine. Documentary wildlife editorial tone—the photographer observes without directing. Warm, naturalistic colour palette. Calm, undramatic mood. Suitable for text overlay in negative space.",
      image: theHorse,
      alt: "Mares at rest on open grassland at golden hour",
      tone: "light",
    },
  },
  {
    id: "the-season",
    numeral: "III",
    folio: "The season",
    title: "Milk appears, then vanishes.",
    body: [
      "Steppe mares were never bred as dairy animals. They graze wild grassland all year and produce milk only during one brief window in summer, in small quantities, on a schedule the animal controls.",
      "This scarcity shaped everything that followed. Milk that arrives for weeks and spoils quickly must become something that lasts. Fermentation was the solution, one that cultures had understood for centuries.",
    ],
    pullQuote:
      "Milk that spoils fast has to become something else. Fermentation was the only answer available.",
    plate: {
      ratio: "4 / 5",
      width: "portrait",
      brief:
        "Hands actively milking a mare on open grassland. Close framing captures hands, mare's flank, rear leg, and lower herder body. Golden hour side-lighting catches weathered hands (visible age lines, work texture), mare's coat and muscle. Mare's body turned slightly away from camera, engaged in the activity rather than posed. Herder's hands and arms in natural working position during actual milking motion. Shot at 85mm, f2.5, hands sharp focus, background grassland soft. No contemporary clothing—traditional garments only. Warm earthy colour cast. Natural motion visible in hands—not frozen action, not overly blurred. Texture of skin, hair, grass beneath visible in detail. Photograph feels like observational documentary of genuine daily labour—the photographer is present as quiet witness. No staged quality, no heroic framing. Similar tone to editorial work photography or National Geographic labour documentation.",
      image: theSeason,
      alt: "Hands milking a mare on open grassland",
      tone: "light",
    },
  },
  {
    id: "the-vessel",
    numeral: "IV",
    folio: "The vessel",
    title: "Patience and a living culture.",
    body: [
      "Fresh milk flows into a vessel already holding an active culture. Then the stirring begins: not once, but continuously for hours, whoever is nearby adding effort. The culture does the real work. Nothing is added to speed it up.",
      "Each family maintained its culture from season to season, year to year. The result: mildly sour, gently effervescent, still alive. People drank it daily, not as medicine, but as ordinary food their bodies understood and welcomed.",
    ],
    pullQuote:
      "A living culture, gentle stirring, patience. The result is food that belongs to the body.",
    plate: {
      ratio: "3 / 2",
      brief:
        "Interior of a ger during daylight. Traditional wooden fermentation vessel sits at ground level, paddle inside or resting nearby. Warm amber light enters through the ger opening (one side, creating directional shadow pattern across interior surfaces and the vessel. Wooden surfaces show natural grain, patina, age marks—bearing evidence of years of use. Earthen or wooden floor visible beneath vessel. Shot from waist height looking down at 35°, 35mm lens, f2.8. Hands visible mid-stirring motion with natural blur from the stirring action. Interior shadows deep but readable. No modern objects visible. No anachronistic clothing or tools. Colour palette warm and muted—no colour grading or enhancement. Composition feels like being present during actual daily practice, not a museum display or tourist documentation. Documentary editorial tone. The photograph captures the rhythm of work and the weight of sustained tradition—how this practice is embedded in everyday life.",
      image: theVessel,
      alt: "Traditional fermentation vessel inside a ger",
      tone: "dark",
    },
  },
  {
    id: "the-riders",
    numeral: "V",
    folio: "The riders",
    title: "Food that travels on four legs.",
    body: [
      "Mongol cavalry moved faster than supply wagons ever could, so they didn't keep them. Instead, riders traveled with herds of horses. The mares in those herds were milked as the column moved.",
      "The fermented milk traveled because it needed no cart. It walked alongside the column on four legs and was made fresh wherever they stopped to camp. An army that never waits for food moves at a speed nothing else can match.",
    ],
    pullQuote:
      "Food that feeds itself, carries itself, and is made wherever the column stops.",
    plate: {
      ratio: "21 / 9",
      brief:
        "Riders strung out across open grassland at distance during golden hour. Backlighting from sun creates warm silhouettes and rim light on horses and riders. Composition suggests movement and journey without theatrical drama. Foreground grass visible and in focus, mid-ground riders soft, far horizon sharp. Shot at 50mm, f5.6, from low human eye level. No heroic angles, no costume drama visible. Riders dressed in historically authentic garments (no modern clothing or equipment). Horses varied in natural postures—some walking, some standing, some grazing—not synchronized or posed. Dust or natural motion visible in scene without being exaggerated. Warm earthy colour palette with golden light undertone. Composition resembles historical documentary photography or serious historical editorial work—factual, observational, grounded in reality rather than spectacle. No cinematic filtering or colour grading. Timeless quality that could be from film documentation rather than modern AI generation.",
      image: theRiders,
      alt: "Riders on horseback crossing open grassland at golden hour",
      tone: "dark",
    },
  },
  {
    id: "what-survives",
    numeral: "VI",
    folio: "What survives",
    title: "Carried forward, not reinvented.",
    body: [
      "On the steppe today, it's still made exactly as it was made centuries ago. Herder families culture it each season using the same methods for the same reasons. This part doesn't need improvement.",
      "What we do is simple: take the finished ferment, dry it where it was made, and seal it there. It never ships as liquid, gets reconstituted, or re-cultured downstream. What reaches you is the original ferment with the water removed, preserved exactly as the herders intended and ready to wake up when you add water.",
    ],
    pullQuote:
      "The practice already existed. All we do is preserve it, so nothing gets diluted by distance or convenience.",
    plate: {
      ratio: "3 / 2",
      brief:
        "Hands at work on a simple wooden table, filling and sealing sachets. Natural diffuse light from a nearby north-facing opening (soft, directional but not harsh). One hand holding a filled sachet steady, the other hand or sealing tool in motion, heat-sealing the top. Loose powder scattered simply on wooden surface in the background (slightly out of focus). Wooden table surface shows natural grain, age marks, and evidence of repeated use. No branding visible on sachets or work surface. Shot at 50mm, f3.2, focus locked on hands and sealing action, table surface soft background. Hands show natural wear and texture—not manicured or artificial. Natural motion blur visible on the sealing tool or hand movement—captures the action without freezing it artificially. Powder texture visible but not exaggerated or enhanced. No modern equipment or contemporary objects visible. Warm neutral colour cast. Composition resembles artisanal craft documentation (tea, spice, or supplement packaging)—the focus is on the work itself and the care embedded in the process. Documentary editorial tone. No factory aesthetic, no industrial staging.",
      image: whatSurvives,
      alt: "Hands sealing a sachet of dried ferment at a wooden table",
      tone: "light",
    },
  },
];
