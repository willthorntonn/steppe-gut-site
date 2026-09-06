import PageMeta from "../components/ui/PageMeta";
import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import LinkArrow from "../components/ui/LinkArrow";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";
import ImagePlaceholder from "../components/ui/ImagePlaceholder";
import SectionSubNav from "../components/layout/SectionSubNav";
import { OUR_STORY_LINKS } from "../data/site";
import { MISSION } from "../content/mission";
import { SCIENCE_MISSION } from "../content/scienceMission";
import manufacturingTransport from "../assets/story/manufacturing-transport.webp";
import { BODY, H2, H3, LEAD } from "../styles/type";

// Our Story, rebuilt to the structure of a reference "Our Story" page:
// centred intro, then a circular-badged hero feature, then alternating
// media/text rows that each link to their sub-section. The layout is
// borrowed; the copy is Steppe Gut's own and stays inside the claim
// discipline (provenance and composition only, no health-outcome claims,
// Thai FDA not yet issued). Every image is a written placeholder until the
// steppe and production photography is shot. No eyebrow/kicker labels
// (WRITING_STYLE.md), no terminal full stops (PUNCTUATION_RULE.md).

const FEATURES = [
  {
    id: "science-mission",
    heading: "Made by fermentation, not formulation",
    body: "Steppe mares are milked by hand for a few months each summer. The milk is fermented with a living culture, the way herding families have done it for centuries, then gently dried. Nothing is added to speed it up or stretch it out",
    cta: { label: "Learn more", to: "/our-story/science-mission/" },
    image: SCIENCE_MISSION.heroImage.description,
    src: SCIENCE_MISSION.heroImage.src,
    alt: SCIENCE_MISSION.heroImage.alt,
    ratio: "4 / 5",
    reverse: false,
  },
  {
    id: "manufacturing",
    heading: "How Steppe Gut is made",
    body: "The finished ferment is dried and sealed in Mongolia, then shipped as a stable powder that is never reconstituted or re-cultured downstream. Three companies are involved in making it and bringing it to you, and all three are named on the manufacturing page",
    cta: { label: "Read more", to: "/our-story/manufacturing/" },
    image:
      "documentary photograph of a plain green box truck on a dirt track across the open Mongolian steppe, canvas-sided load of sealed ferment aboard, herding camp small on the horizon, cool overcast daylight, no branding",
    src: manufacturingTransport,
    alt: "A green box truck crossing the steppe on a dirt track, herding camp in the distance",
    ratio: "4 / 5",
    reverse: true,
  },
];

// One alternating row. Mirrors ui/MediaTextRow's grid and spacing so the page
// keeps the site's rhythm; it exists only because the image slot here is an
// ImagePlaceholder grey box rather than MediaTextRow's briefed frame.
function FeatureRow({ heading, body, cta, image, src, alt, ratio, reverse }) {
  return (
    <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
      <div className={reverse ? "md:order-2" : undefined}>
        <ImagePlaceholder description={image} src={src} alt={alt} ratio={ratio} />
      </div>

      <div className={reverse ? "md:order-1" : undefined}>
        <h2
          className="max-w-[16ch] font-serif font-normal text-forest"
          style={H2}
        >
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

export default function OurStory() {
  return (
    <>
      <PageMeta
        title="Our Story · Steppe Gut"
        description="The steppe, the season and the people behind Steppe Gut's fermented mare's milk, and who makes the finished pack"
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

      {/* Badged hero feature, the "Our Mission" anchor. A circular badge
          overlaps a wide rounded image, with a centred caption and one pill
          CTA beneath. The section intro sits above it rather than in the
          PageHeader, so the switcher lands at the same height as every other
          Our Story page. */}
      <Reveal>
        <Section id="mission" size="sm">
          <Container width="content">
            <p
              className="mx-auto mb-14 max-w-[62ch] text-center font-sans text-forest/75 lg:mb-20"
              style={LEAD}
            >
              For eight hundred years, fermented mare's milk has been part of
              daily life on the Mongolian steppe. We take that same ferment, dry
              it where it is made, and bring it to you unchanged
            </p>

            <div className="relative">
              <span className="absolute -left-2 -top-6 z-10 flex h-28 w-28 items-center justify-center rounded-full bg-forest px-4 text-center font-sans text-[13px] font-semibold uppercase leading-tight tracking-[0.16em] text-cream sm:-left-6 lg:h-36 lg:w-36 lg:text-sm">
                Our Mission
              </span>
              <ImagePlaceholder
                description={MISSION.hero.brief}
                src={MISSION.hero.src}
                alt={MISSION.hero.alt}
                ratio="16 / 9"
                rounded="rounded-3xl"
                imgStyle={{
                  objectPosition: "50% 100%",
                  transform: "scale(1.19)",
                  transformOrigin: "50% 100%",
                }}
              />
            </div>

            <div className="mt-10 text-center">
              <h2
                className="mx-auto max-w-[16ch] font-serif font-normal text-forest"
                style={H3}
              >
                Our Mission
              </h2>
              <Button
                to="/our-story/mission/"
                variant="forest"
                radius="full"
                size="default"
                className="mt-8"
              >
                Find out more
              </Button>
            </div>
          </Container>
        </Section>
      </Reveal>

      <Reveal>
        <Section size="default">
          <Container width="content">
            <div className="space-y-24 lg:space-y-36">
              {FEATURES.map((feature) => (
                <FeatureRow key={feature.id} {...feature} />
              ))}
            </div>
          </Container>
        </Section>
      </Reveal>
    </>
  );
}
