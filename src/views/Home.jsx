"use client";

import HeroBox from "../components/home/HeroBox";
import SteppeArmyProgress from "../components/home/SteppeArmyProgress";
import OriginFeature from "../components/home/OriginFeature";
import ProcessRow from "../components/home/ProcessRow";
import ReadsCarousel from "../components/home/ReadsCarousel";
import Reveal from "../components/ui/Reveal";

// The hero, origin feature, process row, reads carousel and supporter counter
// are the existing homepage, unchanged in substance. The product-formats rail
// ("The formats" / "Three ways to take it"), the "How it works" section and
// the "Start with one sachet a day" closing CTA were all removed by request -
// ClosingCTA still bookends every other page; HowItWorks was only ever used
// here, so components/home/HowItWorks.jsx is now unreferenced - kept on disk
// rather than deleted in case the section is wanted back. The supporter
// counter (SteppeArmyProgress) moved from right after the hero to the very
// bottom of the page, directly above the footer, also by request.
//
// Two of home.md's sections are deliberately not built:
//
// §3 "What it is" - folded into HowItWorks' first paragraph. OriginFeature
//   already sits directly above it with a milk-changed-by-time narrative, and
//   a separate row would have made the same point twice.
//
// §6 "Mongolia chapter break" - its stated purpose is to stop provenance
//   being a footnote. It already isn't: OriginFeature is a full section on the
//   steppe, ProcessRow is three steps of Mongolian production, and two of the
//   five reads cards are provenance. A fourth Mongolia beat would tip the page
//   from "provenance is central" into decoration, which 02_brand_guidelines.md
//   §5 warns against directly.
export default function Home() {
  return (
    <>
      {/* Not wrapped in Reveal: the hero runs its own 300–900ms word and
          stage sequence on load, which a scroll reveal would fight. */}
      <HeroBox />

      <Reveal>
        <OriginFeature />
      </Reveal>
      <Reveal>
        <ProcessRow />
      </Reveal>

      <Reveal>
        <SteppeArmyProgress />
      </Reveal>

      <ReadsCarousel />
    </>
  );
}
