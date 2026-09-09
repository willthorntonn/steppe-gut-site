"use client";

import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Reveal from "../components/ui/Reveal";
import ImagePlaceholder from "../components/ui/ImagePlaceholder";
import PlateHero, { PlateHeroTitle } from "../components/ui/PlateHero";
import SectionSubNav from "../components/layout/SectionSubNav";
import { OUR_STORY_LINKS } from "../data/site";
import { SCIENCE_MISSION } from "../content/scienceMission";
import { BODY, H2, H2_XL, LEAD } from "../styles/type";

// /our-story/science-mission/: the shared opening plate, a staggered
// two-column flow (a bold "Fuelled by science" banner heading over a
// top-left paragraph and a lower, right-aligned bottom-right paragraph),
// two image/text fields, then the shared closing bookend.
//
// The chrome - the section switcher sitting directly under the fixed main nav,
// with nothing above it - is identical to the Our Story hub and Our Mission,
// so the switcher lands at the same height on every Our Story page. Copy is in
// src/content/scienceMission.js and stays inside the claim discipline
// (composition and process only). Body voice is sans, headings are the display
// serif. No eyebrow labels, no terminal full stops. Every image is a written
// placeholder until the photography is shot.

const { intro, heroImage, fields } = SCIENCE_MISSION;

// The two flow paragraphs run at lead size but with a more open leading than
// LEAD's 1.7, so they carry the airy, well-spaced feel of the reference.
const FLOW_BODY = { ...LEAD, lineHeight: 1.9 };

export default function OurStoryScienceMission() {
  return (
    <>
      {/* No page header: the section switcher sits directly under the fixed
          main nav, positioned exactly as ProductSubNav is on the product
          detail pages - same top clearance, same fade-in. Nothing above it
          but the main nav. */}
      <div
        data-navtheme="light"
        className="bg-cream pt-[84px] sm:pt-[99px] lg:pt-[140px]"
      >
        <div className="animate-fade-in delay-200">
          <SectionSubNav ariaLabel="Our Story sections" links={OUR_STORY_LINKS} />
        </div>
      </div>

      {/* Opening plate: lands inset, widens to full bleed as the reader
          scrolls, with the title pair nested in the arch - the same hero
          every Our Story and Gut Health page now opens with. */}
      <Section
        size="none"
        bg="cream"
        className="overflow-x-clip pt-12 pb-0 sm:pt-16 lg:pt-20"
      >
        <PlateHero
          brief={heroImage.description}
          src={heroImage.src}
          alt={heroImage.alt}
          ratio="21 / 9"
        >
          <PlateHeroTitle section="Our Story" title={SCIENCE_MISSION.heading} />
        </PlateHero>
      </Section>

      {/* Staggered two-column flow. A bold heading banner across the top, a
          left-aligned paragraph beneath it at a little over a third of the
          viewport, then a clear vertical gap and a second paragraph of the
          same width pushed to the right edge - the two blocks step down and
          across like a staircase, leaving the bottom-left and top-right
          quarters open. Built as plain block flow rather than a grid so the
          gap between the paragraphs never depends on how many lines the first
          one wraps to. */}
      <Reveal>
        <Section
          size="none"
          bg="cream"
          className="pt-10 pb-20 sm:pt-12 sm:pb-28 lg:pt-20 lg:pb-36"
        >
          <Container width="content">
            {/* The heading carries a top margin of its own, the way the big
                bold-serif beats elsewhere on the site do (MissionTimeline's
                heading runs mt-20/lg:mt-28), so it sits a little lower in the
                section rather than hard against the plate above. Both this
                margin and the section's own top padding above are scaled to
                about 40% of their original values (Will's amendment,
                2026-09-07), so the heading and everything below it sit
                noticeably higher under the plate. */}
            {/* Runs at H2_XL, not H2: this is the page's banner beat, sized to
                match the big bold-serif headings on /our-story/mission/. A plain
                H2 gets pinned by its 4.2rem cap on a wide window, which reads
                small against the plate above it. */}
            <h2
              className="mt-5 font-serif font-bold tracking-[-0.02em] text-forest lg:mt-6"
              style={H2_XL}
            >
              {intro.heading}
            </h2>
            <p
              className="mt-10 max-w-[44ch] font-sans text-forest/80"
              style={FLOW_BODY}
            >
              {intro.body}
            </p>
            {/* The gap to the second paragraph is pulled in by about two
                lines of body text from where it was (mt-24/lg:mt-40) so the
                two blocks read as a closer pair. */}
            <p
              className="mt-12 max-w-[44ch] font-sans text-forest/80 md:ml-auto lg:mt-16"
              style={FLOW_BODY}
            >
              {intro.aside}
            </p>
          </Container>
        </Section>
      </Reveal>

      {/* A wide, softly rounded image sitting under the flow. Its frame carries
          the same 4:3 as the source file, so object-cover crops nothing and
          almost the whole picture is on show. Runs at the "wide" container
          width - the same measure the opening plate uses - so it covers most
          of the viewport. */}
      <Reveal>
        <Section size="none" bg="cream" className="pb-20 sm:pb-28 lg:pb-36">
          <Container width="wide">
            <ImagePlaceholder
              description={intro.image.description}
              src={intro.image.src}
              alt={intro.image.alt}
              ratio={intro.image.ratio}
              rounded="rounded-[2rem]"
            />
          </Container>
        </Section>
      </Reveal>

      {/* The two fields, alternating image and text. Sized to the "fast
          forward to today" chapters on /our-story/mission/: the image takes
          the wider column, the heading runs at H2 on an 18ch measure, the
          body is tightened to 46ch, and the column gap follows the same
          10/12/16 step. Composition now leads with its text and sits its
          image on the right, Fermentation leads with its image on the left -
          the reverse of how they were first laid out. */}
      <Reveal>
        <Section size="default" bg="cream">
          <Container width="content">
            <div className="space-y-24 lg:space-y-36">
              {fields.items.map((item, index) => {
                const reverse = index % 2 === 0;
                return (
                  <div
                    key={item.heading}
                    className={`grid grid-cols-1 items-center gap-10 md:gap-12 lg:gap-16 ${
                      reverse
                        ? "md:grid-cols-[0.82fr_1.18fr]"
                        : "md:grid-cols-[1.18fr_0.82fr]"
                    }`}
                  >
                    <div className={reverse ? "md:order-2" : undefined}>
                      <ImagePlaceholder
                        description={item.image.description}
                        src={item.image.src}
                        alt={item.image.alt}
                        ratio={item.image.ratio}
                      />
                    </div>
                    <div className={reverse ? "md:order-1" : undefined}>
                      <h3
                        className="max-w-[18ch] font-serif font-normal text-forest"
                        style={H2}
                      >
                        {item.heading}
                      </h3>
                      <p
                        className="mt-8 max-w-[46ch] font-sans text-forest/80"
                        style={BODY}
                      >
                        {item.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </Section>
      </Reveal>
    </>
  );
}
