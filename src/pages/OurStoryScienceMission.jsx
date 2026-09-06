import PageMeta from "../components/ui/PageMeta";
import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Reveal from "../components/ui/Reveal";
import ImagePlaceholder from "../components/ui/ImagePlaceholder";
import SectionSubNav from "../components/layout/SectionSubNav";
import { OUR_STORY_LINKS } from "../data/site";
import { SCIENCE_MISSION } from "../content/scienceMission";
import { BODY, DISPLAY, H2, H3, LEAD } from "../styles/type";

// /our-story/science-mission/, built to the structure of the reference
// "science mission" page: title, intro with an offset second column, one wide
// image, two position statements, a centred "what we look at" divider, two
// image/text fields, then the shared closing bookend.
//
// The chrome - the section switcher sitting directly under the fixed main nav,
// with nothing above it - is identical to the Our Story hub and Our Mission,
// so the switcher lands at the same height on every Our Story page. Copy is in
// src/content/scienceMission.js and stays inside the claim discipline
// (composition and process only, Thai FDA not stated as issued). Body voice is
// sans, headings are the display serif. No eyebrow labels, no terminal full
// stops. Every image is a written placeholder until the photography is shot.
//
// The title, intro and wide image share one Section so the rhythm stays tight
// the way the reference does - stacking a Section per block leaves dead cream
// bands between them.

const { intro, heroImage, blocks, fields } = SCIENCE_MISSION;

export default function OurStoryScienceMission() {
  return (
    <>
      <PageMeta
        title="Our Science Mission - Our Story · Steppe Gut"
        description="What is established about fermented mare's milk, what we do not claim, and what every batch is tested for"
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

      {/* Title, offset intro, wide image */}
      <Reveal>
        <Section size="default" bg="cream">
          <Container width="content">
            <h1
              className="mx-auto max-w-[20ch] text-center font-serif font-normal text-forest"
              style={DISPLAY}
            >
              {SCIENCE_MISSION.heading}
            </h1>

            <div className="mt-12 grid gap-x-16 gap-y-10 md:mt-16 md:grid-cols-[1fr_0.85fr]">
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

            <div className="mt-16 lg:mt-24">
              <ImagePlaceholder
                description={heroImage.description}
                src={heroImage.src}
                alt={heroImage.alt}
                ratio={heroImage.ratio}
                rounded="rounded-3xl"
              />
            </div>
          </Container>
        </Section>
      </Reveal>

      {/* Two position statements, side by side */}
      <Reveal>
        <Section size="sm" bg="cream">
          <Container width="content">
            <div className="grid gap-x-16 gap-y-14 md:grid-cols-2 lg:gap-x-24">
              {blocks.map((block) => (
                <div key={block.heading}>
                  <h2
                    className="font-serif font-normal text-forest"
                    style={H3}
                  >
                    {block.heading}
                  </h2>
                  {block.body.map((paragraph, index) => (
                    <p
                      key={paragraph.slice(0, 24)}
                      className={`max-w-[52ch] font-sans text-forest/80 ${
                        index === 0 ? "mt-7" : "mt-5"
                      }`}
                      style={BODY}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </Container>
        </Section>
      </Reveal>

      {/* Centred divider into the fields */}
      <Reveal>
        <Section size="sm" bg="sage-tint">
          <Container width="narrow" className="text-center">
            <h2
              className="mx-auto max-w-[16ch] font-serif font-normal text-forest"
              style={H2}
            >
              {fields.heading}
            </h2>
            <p
              className="mx-auto mt-8 max-w-[54ch] font-sans text-forest/75"
              style={LEAD}
            >
              {fields.sub}
            </p>
          </Container>
        </Section>
      </Reveal>

      {/* The two fields, alternating image and text */}
      <Reveal>
        <Section size="default" bg="cream">
          <Container width="content">
            <div className="space-y-24 lg:space-y-36">
              {fields.items.map((item, index) => {
                const reverse = index % 2 === 1;
                return (
                  <div
                    key={item.heading}
                    className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24"
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
                        className="font-serif font-normal text-forest"
                        style={H3}
                      >
                        {item.heading}
                      </h3>
                      <p
                        className="mt-8 max-w-[52ch] font-sans text-forest/80"
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
