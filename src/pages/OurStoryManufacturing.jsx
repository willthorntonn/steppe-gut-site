import PageMeta from "../components/ui/PageMeta";
import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Reveal from "../components/ui/Reveal";
import ImagePlaceholder from "../components/ui/ImagePlaceholder";
import ProcessSteps from "../components/ui/ProcessSteps";
import PlateHero, { PlateHeroTitle } from "../components/ui/PlateHero";
import SectionSubNav from "../components/layout/SectionSubNav";
import { OUR_STORY_LINKS } from "../data/site";
import { MANUFACTURING } from "../content/manufacturing";
import { BODY, H2, H3 } from "../styles/type";

// /our-story/manufacturing/, built to the structure of the reference
// "Manufacturing Process" page: title, offset intro, wide image, two
// image/text blocks, a centred pull quote, a "what is measured" beat, the
// numbered production steps, then a "who makes it" row and the shared closing
// bookend.
//
// The chrome - the section switcher sitting directly under the fixed main
// nav, nothing above it - is identical to the Our Story hub, Our Mission and
// Our Science Mission, so the switcher lands at the same height on every Our
// Story page. Copy is in src/content/manufacturing.js. Body voice is sans,
// headings are the display serif. Full stops are used in the big descriptions
// here (Will's amendment, 2026-09-01); headings and short labels stay
// unpunctuated. Every image is a written placeholder until the production
// photography is shot.

const { intro, heroImage, blocks, measured, steps, makers } =
  MANUFACTURING;

// One image/text block. Mirrors ui/MediaTextRow's grid and rhythm but uses an
// ImagePlaceholder box and the sans body voice, matching the inline rows on
// Our Mission and Our Science Mission.
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

export default function OurStoryManufacturing() {
  return (
    <>
      <PageMeta
        title="Manufacturing Process - Our Story · Steppe Gut"
        description="The seven steps between a mare on Mongolian grassland and a sealed sachet: fermentation, low-temperature drying, batch testing, and who manufactures it"
      />

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
          <PlateHeroTitle section="Our Story" title={MANUFACTURING.heading} />
        </PlateHero>
      </Section>

      {/* Offset intro. */}
      <Reveal>
        <Section
          size="none"
          bg="cream"
          className="pt-4 pb-20 sm:pt-6 sm:pb-28 lg:pt-10 lg:pb-36"
        >
          <Container width="content">
            <div className="grid gap-x-16 gap-y-10 md:grid-cols-[1fr_0.85fr]">
              <div>
                <h2
                  className="max-w-[16ch] font-serif font-normal text-forest"
                  style={H2}
                >
                  {intro.heading}
                </h2>
                <p
                  className="mt-8 max-w-[48ch] font-sans text-forest/80"
                  style={BODY}
                >
                  {intro.body}
                </p>
              </div>
              <p
                className="max-w-[46ch] font-sans text-forest/70 md:mt-28"
                style={BODY}
              >
                {intro.aside}
              </p>
            </div>
          </Container>
        </Section>
      </Reveal>

      {/* Two image/text blocks, alternating */}
      <Reveal>
        <Section size="sm" bg="cream">
          <Container width="content">
            <div className="space-y-24 lg:space-y-36">
              {blocks.map((block) => (
                <MediaBlock key={block.heading} {...block} />
              ))}
            </div>
          </Container>
        </Section>
      </Reveal>

      {/* Pull quote */}
      <Reveal>
        <Section size="sm" bg="sage-tint">
          <Container width="content">
            <blockquote
              className="mx-auto max-w-[28ch] text-center font-serif font-normal text-forest"
              style={H2}
            >
              {MANUFACTURING.quote}
            </blockquote>
          </Container>
        </Section>
      </Reveal>

      {/* What is measured */}
      <Reveal>
        <Section size="sm" bg="cream">
          <Container width="content">
            <div className="grid gap-x-16 gap-y-8 md:grid-cols-[1fr_0.9fr]">
              <h2
                className="max-w-[16ch] font-serif font-normal text-forest"
                style={H2}
              >
                {measured.heading}
              </h2>
              <p
                className="max-w-[52ch] font-sans text-forest/80"
                style={BODY}
              >
                {measured.body}
              </p>
            </div>
          </Container>
        </Section>
      </Reveal>

      {/* The seven steps */}
      <Reveal>
        <Section size="default" bg="cream">
          <Container width="content">
            <h2
              className="max-w-[18ch] font-serif font-normal text-forest"
              style={H3}
            >
              {MANUFACTURING.stepsHeading}
            </h2>
          </Container>
          <div className="mt-12 lg:mt-16">
            <ProcessSteps steps={steps} width="content" columns={3} />
          </div>
        </Section>
      </Reveal>

      {/* Who makes it */}
      <Reveal>
        <Section size="default" bg="cream">
          <Container width="content">
            <MediaBlock
              heading={makers.heading}
              body={makers.body}
              imageBrief={makers.imageBrief}
              src={makers.src}
              alt={makers.alt}
              ratio={makers.ratio}
              reverse={makers.reverse}
            />
          </Container>
        </Section>
      </Reveal>
    </>
  );
}
