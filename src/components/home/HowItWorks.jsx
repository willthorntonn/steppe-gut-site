import Section from "../ui/Section";
import MediaTextRow from "../ui/MediaTextRow";
import StatBand from "../ui/StatBand";
import powderAvif from "../../assets/home/science-powder.avif";
import powderWebp from "../../assets/home/science-powder.webp";

// home.md §5, with §3 ("What it is") folded into its opening paragraph.
//
// §3 is not built as a separate section because OriginFeature already gives
// the page a Mongolia-and-history beat immediately above this one, and a
// third media/text row between them would have said "milk, changed by time"
// twice. The plain-language definition §3 exists to deliver is the first
// paragraph here instead — nothing is lost, one row is.
//
// Claim check: paragraph one is Tier A (composition and method). Paragraph
// two attributes mechanism to fermentation and names the nutrients without
// promising any outcome for a person — Tier B. Neither sentence puts a health
// outcome next to the brand name (02_brand_guidelines.md §6.2).
const BODY = [
  "Fermented mare's milk is exactly what it sounds like. On the Mongolian steppe the milk is left with its own cultures for four days, then dried at low temperature into a fine powder. One sachet, once a day, in a glass of water. That is the whole product.",
  "Fermentation does some of the work that digestion would otherwise have to do. Lactose is broken down. Proteins are partly unfolded. What is left is a set of nutrients that were already in the milk — among them vitamin C, omega-3 fatty acids, lactoferrin and a range of B vitamins. We are not adding anything. We are letting time take things apart.",
];

// Compositional and provenance facts only — no efficacy figure appears here
// or anywhere else on the site.
const STATS = [
  {
    number: 4,
    label: "days of fermentation",
    note: "Per batch, before drying.",
  },
  {
    number: 5,
    label: "months of milking",
    note: "June to October, when the mares are in milk.",
  },
  {
    number: 10,
    suffix: "g",
    label: "one daily serving",
    note: "Mixed into 100 ml of water.",
  },
];

export default function HowItWorks() {
  return (
    <Section id="how-it-works" size="default">
      <MediaTextRow
        reverse
        eyebrow="How it works"
        heading="Nothing here is added. It is unlocked."
        body={BODY}
        image={{ avif: powderAvif, webp: powderWebp }}
        alt="Fine ivory milk powder in raking light, close up."
        cta={{
          label: "What is in it, and where it comes from",
          to: "/ingredients-sourcing/",
        }}
      />

      <div className="mt-20 lg:mt-28">
        <StatBand stats={STATS} />
      </div>
    </Section>
  );
}
