import { Link } from "react-router-dom";
import PageMeta from "../components/ui/PageMeta";
import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Reveal from "../components/ui/Reveal";
import ImagePlaceholder from "../components/ui/ImagePlaceholder";
import PlateHero, { PlateHeroTitle } from "../components/ui/PlateHero";
import SectionSubNav from "../components/layout/SectionSubNav";
import { GUT_HEALTH_LINKS } from "../data/site";
import {
  GUT_ROUTINE_META,
  GUT_ROUTINE_HERO,
  GUT_ROUTINE_INTRO,
  GUT_ROUTINE_WHY,
  GUT_ROUTINE_LEAD_ROW,
  GUT_ROUTINE_TRAVEL_INTRO,
  GUT_ROUTINE_TRAVEL_BLOCKS,
  GUT_ROUTINE_ROWS,
  GUT_ROUTINE_QUOTE,
  GUT_ROUTINE_MORE,
} from "../content/gutRoutine";
import { BODY, H2 } from "../styles/type";

// /gut-health/routine/ - "Gut and Routine". Structure lifted from a reference
// gut-health section page: an image band and centred title, a centred "why
// routine matters" block, one alternating media/text row, a "routine that
// travels" section with two short text blocks
// under it, two more media/text rows, a centred pull quote, a "more from Gut
// Health" grid, then the shared closing bookend.
//
// Chrome (nav, footer, section switcher) is the site's own and sits at the
// same height as on every other Gut Health page, so the switcher does not jump
// when you move between sections. Every image is an ImagePlaceholder grey box
// until the photography exists. Copy discipline follows src/content/gutRoutine.js
// and the rest of the gut-health area: body set in the sans, headings in the
// serif, no eyebrow/kicker labels, no terminal full stops, the body clock
// described in general terms with no outcome promised.

// Hover grows the whole tile and the photo inside it pushes in a little
// further - the site-wide enlarge-on-hover the media cards use
// (components/our-story/MissionTimeline, components/gut-health/CardRail). The
// grid's row gaps absorb the growth. Guarded for reduced motion.
const FRAME_ZOOM =
  "transition-transform duration-500 ease-out " +
  "group-hover:scale-[1.035] group-focus-visible:scale-[1.035] " +
  "motion-reduce:transition-none motion-reduce:group-hover:scale-100 " +
  "motion-reduce:group-focus-visible:scale-100";
const PHOTO_ZOOM =
  "transition-transform duration-700 ease-out " +
  "group-hover:scale-[1.06] group-focus-visible:scale-[1.06] " +
  "motion-reduce:transition-none motion-reduce:group-hover:scale-100 " +
  "motion-reduce:group-focus-visible:scale-100";

// One alternating media/text row. Mirrors ui/MediaTextRow's grid and spacing
// so the page keeps the site's rhythm; it exists as a local copy only because
// the image slot here is an ImagePlaceholder grey box and the body is an array
// of paragraphs. Matches src/pages/GutDiet.jsx's MediaBlock.
function MediaBlock({ heading, body, image, src, alt, ratio, reverse }) {
  return (
    <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
      <div className={reverse ? "md:order-2" : undefined}>
        <ImagePlaceholder description={image} src={src} alt={alt} ratio={ratio} />
      </div>
      <div className={reverse ? "md:order-1" : undefined}>
        <h2 className="max-w-[18ch] font-serif font-normal text-forest" style={H2}>
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

export default function GutRoutine() {
  return (
    <>
      <PageMeta
        title={GUT_ROUTINE_META.title}
        description={GUT_ROUTINE_META.description}
      />

      {/* The section switcher sits directly under the fixed main nav, at the
          same height as on every other Gut Health page. */}
      <div
        data-navtheme="light"
        className="bg-cream pt-[84px] sm:pt-[99px] lg:pt-[140px]"
      >
        <div className="animate-fade-in delay-200">
          <SectionSubNav ariaLabel="Gut Health sections" links={GUT_HEALTH_LINKS} />
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
          brief={GUT_ROUTINE_HERO.image}
          src={GUT_ROUTINE_HERO.src}
          alt={GUT_ROUTINE_HERO.alt}
          ratio="21 / 9"
        >
          <PlateHeroTitle section="Gut Health" title="Gut and Routine" />
        </PlateHero>
      </Section>

      {/* Centred lead. */}
      <Reveal>
        <Section
          size="none"
          bg="cream"
          className="pt-4 pb-12 sm:pt-6 sm:pb-16 lg:pt-10 lg:pb-20"
        >
          <Container width="content" className="text-center">
            <p
              className="mx-auto max-w-[58ch] font-sans text-forest/80"
              style={BODY}
            >
              {GUT_ROUTINE_INTRO}
            </p>
          </Container>
        </Section>
      </Reveal>

      {/* Why routine matters - centred, in place of the reference standfirst. */}
      <Reveal>
        <Section size="default">
          <Container width="content" className="text-center">
            <h2
              className="mx-auto max-w-[20ch] font-serif font-normal text-forest"
              style={H2}
            >
              {GUT_ROUTINE_WHY.heading}
            </h2>
            <p
              className="mx-auto mt-8 max-w-[62ch] font-sans text-forest/80"
              style={BODY}
            >
              {GUT_ROUTINE_WHY.body}
            </p>
          </Container>
        </Section>
      </Reveal>

      {/* The lead media/text row. */}
      <Reveal>
        <Section size="default">
          <Container width="content">
            <MediaBlock {...GUT_ROUTINE_LEAD_ROW} />
          </Container>
        </Section>
      </Reveal>

      {/* A routine that travels - heading and intro, then two short text
          blocks stacked under it. */}
      <Reveal>
        <Section size="default">
          <Container width="content">
            <div className="max-w-[46ch]">
              <h2 className="font-serif font-normal text-forest" style={H2}>
                {GUT_ROUTINE_TRAVEL_INTRO.heading}
              </h2>
              <p className="mt-8 font-sans text-forest/80" style={BODY}>
                {GUT_ROUTINE_TRAVEL_INTRO.body}
              </p>
            </div>

            <div className="mt-16 grid gap-x-16 gap-y-12 md:mt-20 md:grid-cols-2">
              {GUT_ROUTINE_TRAVEL_BLOCKS.map((block) => (
                <div key={block.heading}>
                  <h3
                    className="max-w-[22ch] font-serif font-normal text-forest"
                    style={H2}
                  >
                    {block.heading}
                  </h3>
                  <p
                    className="mt-6 max-w-[52ch] font-sans text-forest/80"
                    style={BODY}
                  >
                    {block.body}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      </Reveal>

      {/* Two more media/text rows. */}
      <Reveal>
        <Section size="default" bg="cream-raised">
          <Container width="content">
            <div className="space-y-24 lg:space-y-36">
              {GUT_ROUTINE_ROWS.map((row) => (
                <MediaBlock key={row.heading} {...row} />
              ))}
            </div>
          </Container>
        </Section>
      </Reveal>

      {/* Centred pull quote. */}
      <Reveal>
        <Section size="sm" bg="sage-tint">
          <Container width="content">
            <blockquote
              className="mx-auto max-w-[30ch] text-center font-serif font-normal text-forest"
              style={H2}
            >
              {GUT_ROUTINE_QUOTE}
            </blockquote>
          </Container>
        </Section>
      </Reveal>

      {/* More from Gut Health - three-up grid. */}
      <Reveal>
        <Section size="default">
          <Container width="content">
            <h2
              className="text-center font-serif font-normal text-forest"
              style={H2}
            >
              {GUT_ROUTINE_MORE.heading}
            </h2>
            <ul className="mt-14 grid list-none grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-10">
              {GUT_ROUTINE_MORE.items.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.to}
                    className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                  >
                    <ImagePlaceholder
                      description={item.image}
                      src={item.src}
                      alt={item.alt}
                      ratio="4 / 3"
                      rounded="rounded-[20px]"
                      className={FRAME_ZOOM}
                      imgClassName={PHOTO_ZOOM}
                    />
                    <h3 className="mt-5 font-serif text-[1.5rem] font-normal leading-[1.15] tracking-[-0.02em] text-forest">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-sans text-forest/70">{item.note}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      </Reveal>

    </>
  );
}
