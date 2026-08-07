import HeroBox from "../components/home/HeroBox";
import SteppeArmyProgress from "../components/home/SteppeArmyProgress";
import OriginFeature from "../components/home/OriginFeature";
import ProcessRow from "../components/home/ProcessRow";
import ProductRail from "../components/home/ProductRail";
import HowItWorks from "../components/home/HowItWorks";
import ReadsCarousel from "../components/home/ReadsCarousel";
import ClosingCTA from "../components/ui/ClosingCTA";
import Reveal from "../components/ui/Reveal";
import PageMeta from "../components/ui/PageMeta";

// The hero, supporter counter, origin feature, process row and reads carousel
// are the existing homepage, unchanged. ProductRail, HowItWorks and ClosingCTA
// are the sections home.md still had outstanding.
//
// Two of home.md's sections are deliberately not built:
//
// §3 "What it is" — folded into HowItWorks' first paragraph. OriginFeature
//   already sits directly above it with a milk-changed-by-time narrative, and
//   a separate row would have made the same point twice.
//
// §6 "Mongolia chapter break" — its stated purpose is to stop provenance
//   being a footnote. It already isn't: OriginFeature is a full section on the
//   steppe, ProcessRow is three steps of Mongolian production, and two of the
//   five reads cards are provenance. A fourth Mongolia beat would tip the page
//   from "provenance is central" into decoration, which 02_brand_guidelines.md
//   §5 warns against directly.
export default function Home() {
  return (
    <>
      <PageMeta
        title="Steppe Gut — Fermented Mare's Milk from Mongolia"
        description="A daily fermented mare's milk supplement from the Mongolian steppe. What it is, how it is made, and what the research does and does not show."
      />

      {/* Not wrapped in Reveal: the hero runs its own 300–900ms word and
          stage sequence on load, which a scroll reveal would fight. */}
      <HeroBox />

      <SteppeArmyProgress />

      <Reveal>
        <OriginFeature />
      </Reveal>
      <Reveal>
        <ProcessRow />
      </Reveal>
      <Reveal>
        <ProductRail />
      </Reveal>
      <Reveal>
        <HowItWorks />
      </Reveal>
      <ReadsCarousel />

      <Reveal>
        <ClosingCTA
          heading="Start with one sachet a day"
          body="Twenty-five mornings in a box. That is a reasonable place to find out whether it suits you."
          primary={{ label: "See the products", to: "/products/" }}
          secondary={{
            label: "What is in it",
            to: "/ingredients-sourcing/",
          }}
        />
      </Reveal>
    </>
  );
}
