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
import { BODY, H2, H3 } from "../styles/type";

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

// The static three-up card grid, used for "foods for the gut" and could be
// reused elsewhere on the page. Image over a serif title over one line, each
// card a link. No kicker label over the image, unlike the reference.
function CardGrid({ items }) {
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
              className="transition-opacity group-hover:opacity-90"
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

      {/* Standfirst, then the offset intro. */}
      <Reveal>
        <Section
          size="none"
          bg="cream"
          className="pt-4 pb-20 sm:pt-6 sm:pb-28 lg:pt-10 lg:pb-36"
        >
          <Container width="content">
            <p
              className="mx-auto max-w-[54ch] text-center font-sans text-forest/80"
              style={BODY}
            >
              {standfirst}
            </p>

            <div className="mt-14 grid gap-x-16 gap-y-10 md:mt-20 md:grid-cols-[1fr_0.85fr]">
              <div>
                <h2
                  className="max-w-[16ch] font-serif font-normal text-forest"
                  style={H2}
                >
                  {intro.heading}
                </h2>
                <p className="mt-8 max-w-[48ch] font-sans text-forest/80" style={BODY}>
                  {intro.body}
                </p>
              </div>
              <p className="max-w-[42ch] font-sans text-forest/70 md:mt-24" style={BODY}>
                {intro.aside}
              </p>
            </div>
          </Container>
        </Section>
      </Reveal>

      {/* Two image/text blocks, then the text-only fermented foods coda */}
      <Reveal>
        <Section size="default" bg="cream">
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
      <Reveal>
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

      {/* More from Gut Health */}
      <Reveal>
        <Section size="default" bg="cream">
          <Container width="content">
            <h2 className="max-w-[18ch] font-serif font-normal text-forest" style={H2}>
              {more.heading}
            </h2>
            <div className="mt-14 lg:mt-20">
              <CardGrid items={more.items} />
            </div>
          </Container>
        </Section>
      </Reveal>
    </>
  );
}
