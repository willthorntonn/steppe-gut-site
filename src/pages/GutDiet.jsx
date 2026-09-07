import { Link } from "react-router-dom";
import PageMeta from "../components/ui/PageMeta";
import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Reveal from "../components/ui/Reveal";
import ImagePlaceholder from "../components/ui/ImagePlaceholder";
import PlateHero, { PlateHeroTitle } from "../components/ui/PlateHero";
import SectionSubNav from "../components/layout/SectionSubNav";
import { GUT_HEALTH_LINKS } from "../data/site";
import { GUT_DIET } from "../content/gutDiet";
import { BODY, H2, H2_XL, H3, LEAD } from "../styles/type";

// /gut-health/diet/, built to the structure of a reference gut-health "diet"
// page: a centred title and short standfirst, one wide image,
// two image/text blocks with a text-only fermented
// foods coda, a three-up "foods for the gut" grid, a "more from Gut Health"
// row, then the shared closing bookend.
//
// The chrome - the section switcher sitting directly under the fixed main nav,
// nothing above it - matches every other Gut Health page and the Our Story
// sub-pages, so the switcher lands at the same height across the site. Copy is
// in src/content/gutDiet.js. Body voice is sans, headings are the display
// serif. No terminal full stops, no eyebrow labels (PUNCTUATION_RULE.md,
// no-eyebrow decision). Every image is a written placeholder until the
// photography is shot.

const { standfirst, intro, heroImage, blocks, fermented, foods, more } = GUT_DIET;

// The two flow paragraphs run at lead size but with a more open leading than
// LEAD's 1.7, matching the staggered "Fuelled by science" flow on
// /our-story/science-mission/.
const FLOW_BODY = { ...LEAD, lineHeight: 1.9 };

// One image/text block. Mirrors ui/MediaTextRow's grid and rhythm but uses an
// ImagePlaceholder box and the sans body voice, matching the alternating rows
// on the Our Story sub-pages.
function MediaBlock({ heading, body, imageBrief, src, alt, ratio, reverse }) {
  return (
    <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
      <div className={reverse ? "md:order-2" : undefined}>
        <ImagePlaceholder description={imageBrief} src={src} alt={alt} ratio={ratio} />
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

// Hover grows the whole tile and the photo inside it pushes in a little
// further - the same paired scales the media cards elsewhere on the site use
// (components/our-story/MissionTimeline, components/gut-health/CardRail). The
// grid's row gaps absorb the growth, so the frame can grow past its layout
// size rather than resting under it. Guarded for reduced motion.
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

// The static three-up card grid, used for "foods for the gut" and could be
// reused elsewhere on the page. Image over a serif title over one line, each
// card a link. No kicker label over the image, unlike the reference. Pass
// `zoom` to give the tiles the site-wide enlarge-on-hover effect instead of
// the plain opacity fade.
function CardGrid({ items, zoom = false }) {
  return (
    <ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
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
              className={zoom ? FRAME_ZOOM : "transition-opacity group-hover:opacity-90"}
              imgClassName={zoom ? PHOTO_ZOOM : undefined}
            />
            <h3
              className="mt-5 font-serif font-normal text-forest"
              style={H3}
            >
              {item.title}
            </h3>
            {item.note && (
              <p className="mt-2 max-w-[38ch] font-sans text-forest/70" style={BODY}>
                {item.note}
              </p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function GutDiet() {
  return (
    <>
      <PageMeta
        title="Gut and Diet - Gut Health · Steppe Gut"
        description="Where a fermented mare's milk fits in an ordinary week of eating: fibre, prebiotic plants, fermented foods and hydration"
      />

      {/* No page header: the section switcher sits directly under the fixed
          main nav, positioned exactly as on every other Gut Health page. */}
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
          brief={heroImage.description}
          src={heroImage.src}
          alt={heroImage.alt}
          ratio="21 / 9"
        >
          <PlateHeroTitle section="Gut Health" title="Gut and Diet" />
        </PlateHero>
      </Section>

      {/* Staggered two-column flow, copied from the "Fuelled by science" beat
          on /our-story/science-mission/: a bold serif heading banner across the
          top, a left-aligned paragraph beneath it, then a clear vertical gap
          and a second paragraph of the same width pushed to the right edge, so
          the two blocks step down and across like a staircase. Plain block flow
          rather than a grid so the gap never depends on how the first paragraph
          wraps. */}
      {/* rootMargin extends the observer's viewport 20% past the real bottom
          edge, so each main section starts revealing while it is still a fifth
          of a screen below the fold rather than only after it has scrolled in. */}
      <Reveal rootMargin="0px 0px 20% 0px">
        <Section
          size="none"
          bg="cream"
          className="pt-4 pb-4 sm:pt-6 sm:pb-6 lg:pt-10 lg:pb-8"
        >
          <Container width="content">
            <p
              className="mx-auto max-w-[72ch] text-center font-sans text-forest/80 [text-wrap:balance]"
              style={BODY}
            >
              {standfirst}
            </p>

            <h2
              className="mt-16 font-serif font-bold tracking-[-0.02em] text-forest md:mt-20 lg:mt-24"
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
            <p
              className="mt-12 max-w-[44ch] font-sans text-forest/80 md:ml-auto lg:mt-16"
              style={FLOW_BODY}
            >
              {intro.aside}
            </p>
          </Container>
        </Section>
      </Reveal>

      {/* Two image/text blocks, then the text-only fermented foods coda.
          Top padding trimmed so this block pulls up into the open space left
          by the staggered "Starts in the gut" flow above it. */}
      <Reveal rootMargin="0px 0px 20% 0px">
        <Section
          size="none"
          bg="cream"
          className="pt-8 pb-20 sm:pt-10 sm:pb-28 lg:pt-12 lg:pb-36"
        >
          <Container width="content">
            <div className="space-y-24 lg:space-y-36">
              {blocks.map((block) => (
                <MediaBlock key={block.heading} {...block} />
              ))}
            </div>

            <div className="mt-24 border-t border-forest/12 pt-16 lg:mt-36 lg:pt-20">
              <h2
                className="max-w-[18ch] font-serif font-normal text-forest"
                style={H2}
              >
                {fermented.heading}
              </h2>
              <p className="mt-8 max-w-[64ch] font-sans text-forest/80" style={BODY}>
                {fermented.body}
              </p>
            </div>
          </Container>
        </Section>
      </Reveal>

      {/* Foods for the gut - static three-up grid */}
      <Reveal rootMargin="0px 0px 20% 0px">
        <Section size="default" bg="cream-raised">
          <Container width="content">
            <h2 className="max-w-[18ch] font-serif font-normal text-forest" style={H2}>
              {foods.heading}
            </h2>
            <p className="mt-6 max-w-[52ch] font-sans text-forest/80" style={BODY}>
              {foods.intro}
            </p>
            <div className="mt-14 lg:mt-20">
              <CardGrid items={foods.items} />
            </div>
          </Container>
        </Section>
      </Reveal>

      {/* More from Gut Health. Heading matches the "How is Steppe Gut made?"
          beat on /our-story/manufacturing/: bold serif at H2 with the same
          tight tracking, no width clamp. */}
      <Reveal rootMargin="0px 0px 20% 0px">
        <Section size="default" bg="cream">
          <Container width="content">
            <h2
              className="font-serif font-bold tracking-[-0.02em] text-forest"
              style={H2}
            >
              {more.heading}
            </h2>
            <div className="mt-14 lg:mt-20">
              <CardGrid items={more.items} zoom />
            </div>
          </Container>
        </Section>
      </Reveal>
    </>
  );
}
