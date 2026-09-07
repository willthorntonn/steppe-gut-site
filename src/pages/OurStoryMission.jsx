import PageMeta from "../components/ui/PageMeta";
import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Reveal from "../components/ui/Reveal";
import ImagePlaceholder from "../components/ui/ImagePlaceholder";
import SectionSubNav from "../components/layout/SectionSubNav";
import MissionTimeline from "../components/our-story/MissionTimeline";
import { OUR_STORY_LINKS } from "../data/site";
import { MISSION } from "../content/mission";
import { BODY, H2 } from "../styles/type";

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
function ChapterRow({ heading, body, brief, src, alt, ratio, reverse }) {
  return (
    <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
      <div className={reverse ? "md:order-2" : undefined}>
        <ImagePlaceholder description={brief} src={src} alt={alt} ratio={ratio} />
      </div>

      <div className={reverse ? "md:order-1" : undefined}>
        <h2
          className="max-w-[18ch] font-serif font-normal text-forest"
          style={H2}
        >
          {heading}
        </h2>
        {body.map((paragraph, index) => (
          <p
            key={paragraph.slice(0, 24)}
            className={`max-w-[54ch] font-sans text-forest/80 ${
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
      <ImagePlaceholder
        description={brief}
        src={src}
        alt={alt}
        ratio="16 / 9"
        rounded="rounded-3xl"
        className="shadow-[0_24px_60px_-28px_rgba(31,45,33,0.45)] ring-1 ring-forest/10"
      />
      <div className="mx-auto mt-12 max-w-[60ch] text-center lg:mt-16">
        <h2
          className="mx-auto max-w-[24ch] font-serif font-normal text-forest"
          style={H2}
        >
          {heading}
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
      <PageMeta
        title="Our Mission - Our Story · Steppe Gut"
        description="Why Steppe Gut exists: to bring an eight-hundred-year-old fermented mare's milk out of Mongolia without changing what it is"
      />

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

      {/* Steppe image, then the mission statement */}
      <Reveal>
        <Section size="default" bg="cream">
          <Container width="content">
            <ImagePlaceholder
              description={MISSION.hero.brief}
              src={MISSION.hero.src}
              alt={MISSION.hero.alt}
              ratio={MISSION.hero.ratio}
              rounded="rounded-3xl"
              imgStyle={{
                objectPosition: "50% 100%",
                transform: "scale(1.45)",
                transformOrigin: "50% 100%",
              }}
            />
          </Container>
          <Container width="narrow" className="mt-14 text-center lg:mt-20">
            {MISSION.statement.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 24)}
                className={`mx-auto max-w-[62ch] font-sans text-forest/80 ${
                  index === 0 ? "" : "mt-6"
                }`}
                style={index === 0 ? { ...BODY, fontWeight: 500 } : BODY}
              >
                {paragraph}
              </p>
            ))}
          </Container>
        </Section>
      </Reveal>

      {/* Pull quote */}
      <Reveal>
        <Section size="sm" bg="sage-tint">
          <Container width="content">
            <blockquote
              className="mx-auto max-w-[26ch] text-center font-serif font-normal text-forest"
              style={H2}
            >
              {MISSION.quote}
            </blockquote>
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

      {/* Fast forward */}
      <Reveal>
        <Section size="sm" bg="cream">
          <Container width="narrow" className="text-center">
            <h2
              className="mx-auto max-w-[18ch] font-serif font-normal text-forest"
              style={H2}
            >
              {MISSION.todayHeading}
            </h2>
            <p
              className="mx-auto mt-8 max-w-[54ch] font-sans text-forest/80"
              style={BODY}
            >
              {MISSION.todayBody}
            </p>
          </Container>
        </Section>
      </Reveal>

      {/* Alternating chapters */}
      <Reveal>
        <Section size="default" bg="cream">
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
