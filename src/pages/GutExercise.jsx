import { Link } from "react-router-dom";
import PageMeta from "../components/ui/PageMeta";
import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Reveal from "../components/ui/Reveal";
import ImagePlaceholder from "../components/ui/ImagePlaceholder";
import LinkArrow from "../components/ui/LinkArrow";
import PlateHero, { PlateHeroTitle } from "../components/ui/PlateHero";
import SectionSubNav from "../components/layout/SectionSubNav";
import MovementCarousel from "../components/gut-health/MovementCarousel";
import { GUT_HEALTH_LINKS } from "../data/site";
import {
  GUT_EXERCISE_META,
  GUT_EXERCISE_HERO,
  GUT_EXERCISE_INTRO,
  GUT_EXERCISE_WHY,
  GUT_EXERCISE_LEAD_ROW,
  GUT_EXERCISE_LEAD_NOTE,
  GUT_EXERCISE_WAYS,
  GUT_EXERCISE_TIPS_INTRO,
  GUT_EXERCISE_TIPS,
  GUT_EXERCISE_MORE,
} from "../content/gutExercise";
import { BODY, BODY_SM, H2, LEAD } from "../styles/type";

// /gut-health/exercise/ - "Gut and Exercise". Structure lifted from a
// reference gut-health section page: an image band and centred title, a
// left-aligned "why it's here" block, one alternating media/text row, a paged
// carousel of low-effort ideas, three tip rows each with a short callout, and
// a "more on gut health" shelf at the foot. Chrome (nav, footer, section
// switcher) is the site's own; every image is an ImagePlaceholder grey box
// until the photography exists.
//
// Copy discipline follows src/content/gutExercise.js and the rest of the
// gut-health area: body set in the sans, headings in the serif, no
// eyebrow/kicker labels, no terminal full stops, movement and digestion
// described in general terms with no outcome promised.

// One alternating row. Mirrors ui/MediaTextRow's grid and spacing so the page
// keeps the site's rhythm; it exists as a local copy only because the image
// slot here is an ImagePlaceholder grey box and the body carries an optional
// "Tip" callout. Matches src/pages/GutHealth.jsx's FeatureRow.
function FeatureRow({ heading, body, cta, tip, image, src, alt, ratio, reverse }) {
  return (
    <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
      <div className={reverse ? "md:order-2" : undefined}>
        <ImagePlaceholder description={image} src={src} alt={alt} ratio={ratio} />
      </div>

      <div className={reverse ? "md:order-1" : undefined}>
        <h2
          className="max-w-[18ch] font-serif font-normal text-forest"
          style={H2}
        >
          {heading}
        </h2>
        <p className="mt-8 max-w-[54ch] font-sans text-forest/80" style={BODY}>
          {body}
        </p>

        {tip && (
          <p
            className="mt-8 max-w-[54ch] border-l-2 border-gold/60 pl-5 font-sans text-forest/70"
            style={BODY_SM}
          >
            <span className="font-semibold text-forest">Tip </span>
            {tip}
          </p>
        )}

        {cta && (
          <LinkArrow to={cta.to} className="mt-10">
            {cta.label}
          </LinkArrow>
        )}
      </div>
    </div>
  );
}

export default function GutExercise() {
  return (
    <>
      <PageMeta
        title={GUT_EXERCISE_META.title}
        description={GUT_EXERCISE_META.description}
      />

      {/* The section switcher sits directly under the fixed main nav, at the
          same height as on every other Gut Health page, so it does not jump
          when you move between sections. */}
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

      {/* Opening plate: lands inset, widens to full bleed as the reader
          scrolls, with the title pair nested in the arch - the same hero
          every Our Story and Gut Health page now opens with. */}
      <Section
        size="none"
        bg="cream"
        className="overflow-x-clip pt-12 pb-0 sm:pt-16 lg:pt-20"
      >
        <PlateHero
          brief={GUT_EXERCISE_HERO.image}
          src={GUT_EXERCISE_HERO.src}
          alt={GUT_EXERCISE_HERO.alt}
          ratio="21 / 9"
        >
          <PlateHeroTitle section="Gut Health" title="Gut and Exercise" />
        </PlateHero>
      </Section>

      <Reveal>
        <Section
          size="none"
          bg="cream"
          className="pt-4 pb-12 sm:pt-6 sm:pb-16 lg:pt-10 lg:pb-20"
        >
          <Container width="content" className="text-center">
            <p
              className="mx-auto max-w-[58ch] font-sans text-forest/80"
              style={LEAD}
            >
              {GUT_EXERCISE_INTRO}
            </p>
          </Container>
        </Section>
      </Reveal>

      {/* Why it's here, the lead media/text row, and the short follow-on note. */}
      <Reveal>
        <Section size="default">
          <Container width="content">
            <div className="max-w-[46ch]">
              <h2 className="font-serif font-normal text-forest" style={H2}>
                {GUT_EXERCISE_WHY.heading}
              </h2>
              <p
                className="mt-8 font-sans text-forest/80"
                style={BODY}
              >
                {GUT_EXERCISE_WHY.body}
              </p>
            </div>

            <div className="mt-20 lg:mt-28">
              <FeatureRow {...GUT_EXERCISE_LEAD_ROW} />
            </div>

            <div className="mt-20 max-w-[42ch] lg:mt-28">
              <h2 className="font-serif font-normal text-forest" style={H2}>
                {GUT_EXERCISE_LEAD_NOTE.heading}
              </h2>
              <p className="mt-8 font-sans text-forest/80" style={BODY}>
                {GUT_EXERCISE_LEAD_NOTE.body}
              </p>
            </div>
          </Container>
        </Section>
      </Reveal>

      {/* The "keep it enjoyable" carousel. */}
      <Reveal>
        <Section size="default" bg="cream-raised">
          <MovementCarousel
            heading={GUT_EXERCISE_WAYS.heading}
            intro={GUT_EXERCISE_WAYS.intro}
            items={GUT_EXERCISE_WAYS.items}
          />
        </Section>
      </Reveal>

      {/* Three tip rows, each with a short callout. */}
      <Reveal>
        <Section size="default">
          <Container width="content">
            <div className="max-w-[42ch]">
              <h2 className="font-serif font-normal text-forest" style={H2}>
                {GUT_EXERCISE_TIPS_INTRO.heading}
              </h2>
              <p className="mt-8 font-sans text-forest/80" style={BODY}>
                {GUT_EXERCISE_TIPS_INTRO.body}
              </p>
            </div>

            <div className="mt-20 space-y-24 lg:mt-28 lg:space-y-36">
              {GUT_EXERCISE_TIPS.map((row) => (
                <FeatureRow key={row.id} {...row} />
              ))}
            </div>
          </Container>
        </Section>
      </Reveal>

      {/* More on gut health - hands off to the other sections. */}
      <Reveal>
        <Section size="default" bg="cream-raised">
          <Container width="content">
            <h2
              className="text-center font-serif font-normal text-forest"
              style={H2}
            >
              {GUT_EXERCISE_MORE.heading}
            </h2>

            <ul className="mt-14 grid list-none grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-10">
              {GUT_EXERCISE_MORE.items.map((item) => (
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
