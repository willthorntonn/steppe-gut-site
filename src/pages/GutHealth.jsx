import PageMeta from "../components/ui/PageMeta";
import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Reveal from "../components/ui/Reveal";
import ImagePlaceholder from "../components/ui/ImagePlaceholder";
import LinkArrow from "../components/ui/LinkArrow";
import SectionSubNav from "../components/layout/SectionSubNav";
import WaysToTakeIt from "../components/gut-health/WaysToTakeIt";
import { GUT_HEALTH_LINKS } from "../data/site";
import { GUT_HEALTH_INTRO_LINES, GUT_HEALTH_ROWS } from "../content/gutHealth";
import { BODY, H2, H2_XL, LEAD } from "../styles/type";

// Gut Health - the "All" overview for the sectioned area. Layout borrowed
// from a reference gut-health hub (centred intro, section switcher, then
// alternating media/text rows with a paged "ways to take it" shelf in the
// middle); every image is an ImagePlaceholder grey box until the real
// photography exists. Copy is Steppe Gut's own and stays inside the claim
// discipline - no health-outcome claims, Thai FDA not stated as issued. No
// eyebrow/kicker labels, no terminal full stops (house rules).
//
// The ingredient declaration, allergens, glossary and nutrition that used to
// live here belong with the product, not the education hub - see
// src/pages/GutHealth.jsx history and src/components/product/NutritionPanel.

// One alternating row. Mirrors ui/MediaTextRow's grid and spacing so the
// page keeps the site's rhythm; it exists only because the image slot here
// is an ImagePlaceholder grey box rather than MediaTextRow's briefed frame.
// Matches src/pages/OurStory.jsx's FeatureRow exactly.
function FeatureRow({ heading, body, cta, image, src, alt, ratio, reverse, imgStyle }) {
  return (
    <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
      <div className={reverse ? "md:order-2" : undefined}>
        <ImagePlaceholder
          description={image}
          src={src}
          alt={alt}
          ratio={ratio}
          rounded="rounded-[20px]"
          imgStyle={imgStyle}
        />
      </div>

      <div className={reverse ? "md:order-1" : undefined}>
        <h2 className="max-w-[16ch] font-serif font-normal text-forest" style={H2}>
          {heading}
        </h2>
        <p className="mt-8 max-w-[54ch] font-sans text-forest/80" style={BODY}>
          {body}
        </p>
        <LinkArrow to={cta.to} className="mt-10">
          {cta.label}
        </LinkArrow>
      </div>
    </div>
  );
}

// The screenshot's order: two rows, the ways-to-take-it shelf, then the
// remaining rows. Split here so the shelf can drop in between.
const LEAD_ROWS = GUT_HEALTH_ROWS.slice(0, 2);
const REST_ROWS = GUT_HEALTH_ROWS.slice(2);

export default function GutHealth() {
  return (
    <>
      <PageMeta
        title="Gut Health · Steppe Gut"
        description="How Steppe Gut's fermented mare's milk sits alongside diet, routine, mood, movement and sleep, and where each of those is covered in more detail"
      />

      {/* The section switcher sits directly under the fixed main nav, at the
          same height as on every other Gut Health page, so it does not jump
          when you move between sections. The centred title and intro follow
          it, in place of the standard PageHeader. */}
      <div
        data-navtheme="light"
        className="bg-cream pt-[84px] sm:pt-[99px] lg:pt-[140px]"
      >
        <div className="animate-fade-in delay-200">
          <SectionSubNav
            ariaLabel="Gut Health sections"
            links={GUT_HEALTH_LINKS}
          />
        </div>
      </div>

      {/* Title matches /our-story/'s "Our Story" heading exactly - same
          Section (size "none" with the small negative top margin), same
          centred wrapper, same serif/bold/tracking/H2_XL type - so the two
          "All" pages open at an identical height and weight. */}
      <Reveal>
        <Section size="none" className="pb-0 -mt-4 sm:-mt-5 lg:-mt-6">
          <Container width="content">
            <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 lg:mb-4">
              <h1
                id="page-title"
                tabIndex={-1}
                className="font-serif font-bold tracking-[-0.02em] text-forest outline-none mb-8"
                style={H2_XL}
              >
                Gut Health
              </h1>
              {/* Split for balance: three near-equal centred lines, the same
                  treatment /our-story/ gives its lead. */}
              <p
                className="mx-auto max-w-[58ch] font-sans text-forest/80 lg:max-w-none"
                style={LEAD}
              >
                <span className="block lg:whitespace-nowrap">
                  {GUT_HEALTH_INTRO_LINES[0]}
                </span>
                <span className="block lg:whitespace-nowrap">
                  {GUT_HEALTH_INTRO_LINES[1]}
                </span>
                <span className="block lg:whitespace-nowrap">
                  {GUT_HEALTH_INTRO_LINES[2]}
                </span>
              </p>
            </div>
          </Container>
        </Section>
      </Reveal>

      {/* rootMargin extends the observer's viewport 20% past the real bottom
          edge, so each main section starts revealing while it is still a fifth
          of a screen below the fold rather than only after it has scrolled in. */}
      <Reveal rootMargin="0px 0px 20% 0px">
        <Section size="default">
          <Container width="content">
            <div className="space-y-24 lg:space-y-36">
              {LEAD_ROWS.map((row) => (
                <FeatureRow key={row.id} {...row} />
              ))}
            </div>
          </Container>
        </Section>
      </Reveal>

      <Reveal rootMargin="0px 0px 20% 0px">
        <Section size="default" bg="cream">
          <WaysToTakeIt />
        </Section>
      </Reveal>

      <Reveal rootMargin="0px 0px 20% 0px">
        <Section size="default">
          <Container width="content">
            <div className="space-y-24 lg:space-y-36">
              {REST_ROWS.map((row) => (
                <FeatureRow key={row.id} {...row} />
              ))}
            </div>
          </Container>
        </Section>
      </Reveal>
    </>
  );
}
