import HeroBox from "../components/home/HeroBox";
import SteppeArmyProgress from "../components/home/SteppeArmyProgress";
import OriginFeature from "../components/home/OriginFeature";
import ProcessRow from "../components/home/ProcessRow";
import ReadsCarousel from "../components/home/ReadsCarousel";
import Reveal from "../components/ui/Reveal";
import PageMeta from "../components/ui/PageMeta";

// Extracted verbatim from App.jsx when routing landed. The section order,
// wrappers and Reveal placement are unchanged — App.jsx is now the router
// shell and this is its "/" element.
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
      <ReadsCarousel />
    </>
  );
}
