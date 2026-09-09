"use client";

import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Reveal from "../components/ui/Reveal";
import ImagePlaceholder from "../components/ui/ImagePlaceholder";
import SectionSubNav from "../components/layout/SectionSubNav";
import PlateHero, { PlateHeroTitle } from "../components/ui/PlateHero";
import MissionTimeline from "../components/our-story/MissionTimeline";
import { OUR_STORY_LINKS } from "../data/site";
import { MISSION } from "../content/mission";
import { BODY, H2, H2_XL } from "../styles/type";

// /our-story/mission/, built to the structure of the reference "Our Mission"
// page: a centred mission statement, a steppe image, one large pull quote, a
// horizontal "Our Story" era rail, a "fast forward" beat, then alternating
// image/text chapters, closing on the shared bookend.
//
// The chrome - PageHeader then SectionSubNav - is identical to the Our Story
// hub and the scaffolded sub-pages, so the section switcher sits in the same
// place on every Our Story page. Layout is borrowed; copy is Steppe Gut's own
// (src/content/mission.js) and stays inside the claim discipline - provenance
// and process only, no health-outcome claims, Thai FDA not stated as issued.
// Body voice is sans, headings are the display serif. No eyebrow/kicker
// labels, no terminal full stops. Every image is a written placeholder until
// the photography is shot.

// One alternating chapter row. Mirrors ui/MediaTextRow's grid and rhythm so
// the page keeps the site's measure; it is inlined here only because the image
// slot is an ImagePlaceholder box and the body voice is sans, not the serif
// MediaTextRow sets.
// A chapter heading is a plain string, or an array of strings when the copy
// wants an explicit line break between them.
function renderHeading(heading) {
  if (!Array.isArray(heading)) return heading;
  return heading.map((line) => (
    <span key={line} className="block">
      {line}
    </span>
  ));
}

function ChapterRow({ heading, body, brief, src, alt, ratio, reverse }) {
  return (
    <div
      className={`grid grid-cols-1 items-center gap-10 md:gap-12 lg:gap-16 ${
        reverse
          ? "md:grid-cols-[0.82fr_1.18fr]"
          : "md:grid-cols-[1.18fr_0.82fr]"
      }`}
    >
      <div className={reverse ? "md:order-2" : undefined}>
        <ImagePlaceholder description={brief} src={src} alt={alt} ratio={ratio} />
      </div>

      <div className={reverse ? "md:order-1" : undefined}>
        <h2
          className={`${
            Array.isArray(heading) ? "max-w-[22ch]" : "max-w-[18ch]"
          } font-serif font-normal text-forest`}
          style={H2}
        >
          {renderHeading(heading)}
        </h2>
        {body.map((paragraph, index) => (
          <p
            key={paragraph.slice(0, 24)}
            className={`max-w-[46ch] font-sans text-forest/80 ${
              index === 0 ? "mt-8" : "mt-5"
            }`}
            style={BODY}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

// The closing chapter breaks the alternating rhythm on purpose: one wide
// plate, then heading and body centred beneath it, so the page ends on the
// same centred single column as the mission statement and the "fast forward"
// beat rather than on another split row.
function ChapterFeature({ heading, body, brief, src, alt }) {
  return (
    <div>
      {/* The closing plate runs a touch wider than the text measure below it -
          a block wrapper with negative side margins so it grows symmetrically
          past the content container, which a w-full element cannot do on its
          own. */}
      <div className="lg:-mx-8 xl:-mx-14">
        <ImagePlaceholder
          description={brief}
          src={src}
          alt={alt}
          ratio="16 / 9"
          rounded="rounded-3xl"
          className="shadow-[0_24px_60px_-28px_rgba(31,45,33,0.45)] ring-1 ring-forest/10"
        />
      </div>
      <div className="mx-auto mt-12 max-w-[60ch] text-center lg:mt-16">
        <h2
          className="mx-auto max-w-[24ch] font-serif font-normal text-forest"
          style={H2}
        >
          {renderHeading(heading)}
        </h2>
        {body.map((paragraph, index) => (
          <p
            key={paragraph.slice(0, 24)}
            className={`mx-auto max-w-[56ch] font-sans text-forest/80 ${
              index === 0 ? "mt-8" : "mt-5"
            }`}
            style={BODY}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function OurStoryMission() {
  return (
    <>
      {/* No page header: the section switcher sits directly under the fixed
          main nav, positioned exactly as ProductSubNav is on the product
          detail pages - same top clearance, same fade-in. Nothing above it
          but the main nav; the mission statement itself sits below the image. */}
      <div
        data-navtheme="light"
        className="bg-cream pt-[84px] sm:pt-[99px] lg:pt-[140px]"
      >
        <div className="animate-fade-in delay-200">
          <SectionSubNav ariaLabel="Our Story sections" links={OUR_STORY_LINKS} />
        </div>
      </div>

      {/* Steppe image, the section/page title pair, then the mission
          statement. The image is deliberately outside Reveal: it has to be
          there, inset, the moment the page lands, because the widening is
          driven by the reader's own scrolling rather than by an entrance.
          The hero section carries only its top clearance - its bottom padding
          is dropped so "Our Mission" sits just above the statement, at the
          same heading-to-body gap as "Fast forward to today" below. */}
      <Section
        size="none"
        bg="cream"
        className="overflow-x-clip pt-12 pb-0 sm:pt-16 lg:pt-20"
      >
        <PlateHero
          brief={MISSION.hero.brief}
          src={MISSION.hero.src}
          alt={MISSION.hero.alt}
          ratio={MISSION.hero.ratio}
          imgStyle={{
            objectPosition: "50% 100%",
            transform: "scale(1.45)",
            transformOrigin: "50% 100%",
          }}
        >
          <PlateHeroTitle section="Our Story" title={MISSION.heading} />
        </PlateHero>
      </Section>

      <Reveal>
        <Section
          size="none"
          bg="cream"
          className="pt-4 pb-12 sm:pt-6 sm:pb-16 lg:pt-10 lg:pb-20"
        >
          <Container width="wide" className="text-center">
            <p
              className="mx-auto max-w-[960px] font-sans text-forest/80"
              style={BODY}
            >
              {MISSION.statement}
            </p>
          </Container>
        </Section>
      </Reveal>

      {/* "Our Story" era rail */}
      <Reveal>
        <MissionTimeline
          heading={MISSION.timelineHeading}
          items={MISSION.timeline}
        />
      </Reveal>

      {/* Fast forward. Top padding is dropped so the beat sits up in the
          space under the era rail rather than adrift in a cream gap. The
          reveal is tuned the same way as the chapters below, but the other
          way round: a negative bottom rootMargin holds the animation back
          until the block is genuinely in view, so the reader watches it play
          instead of arriving to find it already settled. */}
      <Reveal threshold={0.2} rootMargin="0px 0px -25% 0px">
        <Section
          size="sm"
          bg="cream"
          className="pt-0 pb-4 sm:pt-0 sm:pb-6 lg:pt-0 lg:pb-10"
        >
          <Container width="content" className="text-center">
            <h2
              className="mx-auto max-w-[20ch] font-serif font-bold text-forest"
              style={H2_XL}
            >
              {MISSION.todayHeading}
            </h2>
            {/* Matched to the card body copy in the "Our Story" carousel
                above: the same --vw-based clamp, not the plain-vw BODY, so the
                two read at an identical size across the breakpoints. */}
            <div
              className="mx-auto mt-10 font-sans text-forest/80"
              style={{
                fontSize: "clamp(1.25rem, calc(1.6 * var(--vw)), 1.55rem)",
                lineHeight: 1.7,
              }}
            >
              {MISSION.todayBody.map((line) => (
                <p key={line.slice(0, 20)} className="text-center">
                  {line}
                </p>
              ))}
            </div>
          </Container>
        </Section>
      </Reveal>

      {/* Alternating chapters. Revealed early - a positive bottom rootMargin
          plus a low threshold trip the animation as the block enters from
          below, instead of after it has been scrolled well up the viewport. */}
      <Reveal threshold={0.05} rootMargin="0px 0px 20% 0px">
        <Section size="default" bg="cream" className="pt-6 sm:pt-10 lg:pt-16">
          <Container width="content">
            <div className="space-y-24 lg:space-y-36">
              {MISSION.chapters.map((chapter, index) =>
                chapter.feature ? (
                  <ChapterFeature key={chapter.id} {...chapter} />
                ) : (
                  <ChapterRow
                    key={chapter.id}
                    {...chapter}
                    reverse={index % 2 === 1}
                  />
                ),
              )}
            </div>
          </Container>
        </Section>
      </Reveal>
    </>
  );
}
