import { Link } from "react-router-dom";
import PageMeta from "../components/ui/PageMeta";
import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Reveal from "../components/ui/Reveal";
import ImagePlaceholder from "../components/ui/ImagePlaceholder";
import SectionSubNav from "../components/layout/SectionSubNav";
import CardRail from "../components/gut-health/CardRail";
import { GUT_HEALTH_LINKS } from "../data/site";
import {
  GUT_SLEEP_META,
  GUT_SLEEP_HERO,
  GUT_SLEEP_INTRO,
  GUT_SLEEP_WHY,
  GUT_SLEEP_LEAD_ROW,
  GUT_SLEEP_WINDOW_INTRO,
  GUT_SLEEP_WINDOW_BLOCKS,
  GUT_SLEEP_HABITS,
  GUT_SLEEP_ROWS,
  GUT_SLEEP_QUOTE,
  GUT_SLEEP_MORE,
} from "../content/gutSleep";
import { BODY, DISPLAY, H2, LEAD } from "../styles/type";

// /gut-health/sleep/ - "Gut and Sleep". Structure lifted from a reference
// gut-health section page: an image band and centred title, a centred "why
// sleep matters" block, one alternating media/text row, a two-block section
// on the sleep signal and night length, a paged rail of bedtime habits, two
// more media/text rows on short nights and catching up, a centred pull quote,
// a "more from Gut Health" grid, then the shared closing bookend.
//
// Chrome (nav, footer, section switcher) is the site's own and sits at the
// same height as on every other Gut Health page, so the switcher does not
// jump when you move between sections. Every image is an ImagePlaceholder
// grey box until the photography exists. Copy discipline follows
// src/content/gutSleep.js and the rest of the gut-health area: body set in
// the sans, headings in the serif, no eyebrow/kicker labels, no terminal full
// stops, melatonin and the body clock described in general terms with no
// outcome promised.

// One alternating media/text row. Mirrors ui/MediaTextRow's grid and spacing
// so the page keeps the site's rhythm; it exists as a local copy only because
// the image slot here is an ImagePlaceholder grey box and the body is an
// array of paragraphs. Matches src/pages/GutRoutine.jsx's MediaBlock.
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

export default function GutSleep() {
  return (
    <>
      <PageMeta
        title={GUT_SLEEP_META.title}
        description={GUT_SLEEP_META.description}
      />

      {/* The section switcher sits directly under the fixed main nav, then an
          image band standing in for the reference page's hero photo. */}
      <div
        data-navtheme="light"
        className="bg-cream pt-[84px] sm:pt-[99px] lg:pt-[140px]"
      >
        <div className="animate-fade-in delay-200">
          <SectionSubNav ariaLabel="Gut Health sections" links={GUT_HEALTH_LINKS} />
        </div>

        <Container width="wide" className="pb-4 pt-2 sm:pb-6 lg:pb-8">
          <ImagePlaceholder
            description={GUT_SLEEP_HERO.image}
            src={GUT_SLEEP_HERO.src}
            alt={GUT_SLEEP_HERO.alt}
            ratio="16 / 7"
          />
        </Container>
      </div>

      {/* Centred title and lead. */}
      <Reveal>
        <Section size="sm">
          <Container width="content" className="text-center">
            <h1
              id="page-title"
              tabIndex={-1}
              className="mx-auto max-w-[20ch] font-serif font-normal text-forest outline-none"
              style={DISPLAY}
            >
              Gut and Sleep
            </h1>
            <p
              className="mx-auto mt-8 max-w-[58ch] font-sans text-forest/80"
              style={LEAD}
            >
              {GUT_SLEEP_INTRO}
            </p>
          </Container>
        </Section>
      </Reveal>

      {/* Why sleep matters - centred, in place of the reference standfirst. */}
      <Reveal>
        <Section size="default">
          <Container width="content" className="text-center">
            <h2
              className="mx-auto max-w-[20ch] font-serif font-normal text-forest"
              style={H2}
            >
              {GUT_SLEEP_WHY.heading}
            </h2>
            <p
              className="mx-auto mt-8 max-w-[62ch] font-sans text-forest/80"
              style={BODY}
            >
              {GUT_SLEEP_WHY.body}
            </p>
          </Container>
        </Section>
      </Reveal>

      {/* The lead media/text row. */}
      <Reveal>
        <Section size="default">
          <Container width="content">
            <MediaBlock {...GUT_SLEEP_LEAD_ROW} />
          </Container>
        </Section>
      </Reveal>

      {/* What sets the night - heading and intro, then two short text blocks
          stacked under it. */}
      <Reveal>
        <Section size="default" bg="cream-raised">
          <Container width="content">
            <div className="max-w-[46ch]">
              <h2 className="font-serif font-normal text-forest" style={H2}>
                {GUT_SLEEP_WINDOW_INTRO.heading}
              </h2>
              <p className="mt-8 font-sans text-forest/80" style={BODY}>
                {GUT_SLEEP_WINDOW_INTRO.body}
              </p>
            </div>

            <div className="mt-16 grid gap-x-16 gap-y-12 md:mt-20 md:grid-cols-2">
              {GUT_SLEEP_WINDOW_BLOCKS.map((block) => (
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

      {/* The bedtime-habits rail. */}
      <Reveal>
        <Section size="default">
          <CardRail
            heading={GUT_SLEEP_HABITS.heading}
            intro={GUT_SLEEP_HABITS.intro}
            items={GUT_SLEEP_HABITS.items}
            trackId="gut-sleep-habits"
          />
        </Section>
      </Reveal>

      {/* Two more media/text rows. */}
      <Reveal>
        <Section size="default" bg="cream-raised">
          <Container width="content">
            <div className="space-y-24 lg:space-y-36">
              {GUT_SLEEP_ROWS.map((row) => (
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
              {GUT_SLEEP_QUOTE}
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
              {GUT_SLEEP_MORE.heading}
            </h2>
            <ul className="mt-14 grid list-none grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-10">
              {GUT_SLEEP_MORE.items.map((item) => (
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
                      className="transition-opacity group-hover:opacity-90"
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
