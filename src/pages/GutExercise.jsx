import { Link } from "react-router-dom";
import PageMeta from "../components/ui/PageMeta";
import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Reveal from "../components/ui/Reveal";
import ImagePlaceholder from "../components/ui/ImagePlaceholder";
import LinkArrow from "../components/ui/LinkArrow";
import PlateHero, { PlateHeroTitle } from "../components/ui/PlateHero";
import SectionSubNav from "../components/layout/SectionSubNav";
import BoosterCarousel from "../components/gut-health/BoosterCarousel";
import { GUT_HEALTH_LINKS } from "../data/site";
import {
  GUT_EXERCISE_META,
  GUT_EXERCISE_HERO,
  GUT_EXERCISE_WHY,
  GUT_EXERCISE_LEAD_ROW,
  GUT_EXERCISE_LEAD_NOTE,
  GUT_EXERCISE_WAYS,
  GUT_EXERCISE_TIPS_INTRO,
  GUT_EXERCISE_TIPS,
  GUT_EXERCISE_MORE,
} from "../content/gutExercise";
import { BODY, BODY_SM, H2 } from "../styles/type";

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
            style={BODY}
          >
            <span className="font-semibold text-forest">Tip: </span>
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

      {/* Staggered opening block, lifted straight from /gut-health/mood/: it
          breaks out of the centred content measure and hugs the left page
          gutter, so the why-heading starts hard against the left edge and runs
          to about five-eighths of the viewport. The lead image drops in
          lower-left; its heading and body sit to the right, centred against it,
          so the whole thing steps down and across in a loose Z. Collapses to a
          single column below md. */}
      <Reveal>
        <Section
          size="none"
          bg="cream"
          className="pt-20 pb-20 sm:pt-28 sm:pb-28 lg:pt-36 lg:pb-36"
        >
          <div className="w-full pl-16 pr-6 sm:pl-20 sm:pr-10 lg:pl-28 lg:pr-14">
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-12 md:gap-y-24">
              <div className="md:col-span-12 md:col-start-1">
                <h2
                  className="font-serif font-normal text-forest md:max-w-[61.5%]"
                  style={H2}
                >
                  {GUT_EXERCISE_WHY.heading}
                </h2>
                <p
                  className="mt-7 font-sans text-forest/80 md:max-w-[71%]"
                  style={BODY}
                >
                  {GUT_EXERCISE_WHY.body}
                </p>
              </div>

              <div className="md:col-span-6 md:col-start-1">
                <ImagePlaceholder
                  description={GUT_EXERCISE_LEAD_ROW.image}
                  src={GUT_EXERCISE_LEAD_ROW.src}
                  alt={GUT_EXERCISE_LEAD_ROW.alt}
                  ratio={GUT_EXERCISE_LEAD_ROW.ratio}
                />
              </div>

              <div className="md:col-span-6 md:col-start-7 md:self-center">
                <h2
                  className="max-w-[19ch] font-serif font-normal text-forest [text-wrap:balance]"
                  style={H2}
                >
                  {GUT_EXERCISE_LEAD_ROW.heading}
                </h2>
                <p
                  className="mt-7 max-w-[50ch] font-sans text-forest/80"
                  style={BODY}
                >
                  {GUT_EXERCISE_LEAD_ROW.body}
                </p>
                {GUT_EXERCISE_LEAD_ROW.cta && (
                  <LinkArrow to={GUT_EXERCISE_LEAD_ROW.cta.to} className="mt-10">
                    {GUT_EXERCISE_LEAD_ROW.cta.label}
                  </LinkArrow>
                )}
              </div>
            </div>
          </div>
        </Section>
      </Reveal>

      <Reveal>
        <Section size="none" bg="cream" className="pt-0 pb-16 sm:pb-20 lg:pb-24">
          <div className="w-full pl-16 pr-6 sm:pl-20 sm:pr-10 lg:pl-28 lg:pr-14">
            <h2 className="max-w-[22ch] font-serif font-normal text-forest" style={H2}>
              {GUT_EXERCISE_LEAD_NOTE.heading}
            </h2>
            <p className="mt-8 max-w-[58ch] font-sans text-forest/80" style={BODY}>
              {GUT_EXERCISE_LEAD_NOTE.body}
            </p>
          </div>
        </Section>
      </Reveal>

      {/* The "make fitness fun" card shelf - the same BoosterCarousel the
          /gut-health/mood/ habit shelves use. */}
      <Reveal>
        <Section
          size="none"
          bg="cream"
          className="pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-28"
        >
          <BoosterCarousel
            heading={GUT_EXERCISE_WAYS.heading}
            items={GUT_EXERCISE_WAYS.items}
            overlayCaption
            expandable
          />
        </Section>
      </Reveal>

      {/* Three tip rows, each with a short callout. Breaks out of the centred
          content measure and hugs the left page gutter, the same wider
          treatment the staggered opening block and the /gut-health/mood/
          sections use, so the media/text rows run close to both edges. */}
      <Reveal threshold={0.05}>
        <Section size="default">
          <div className="w-full pl-16 pr-6 sm:pl-20 sm:pr-10 lg:pl-28 lg:pr-14">
            <div>
              <h2
                className="font-serif font-normal text-forest md:max-w-[61.5%]"
                style={H2}
              >
                {GUT_EXERCISE_TIPS_INTRO.heading}
              </h2>
              <p
                className="mt-7 font-sans text-forest/80 md:max-w-[71%]"
                style={BODY}
              >
                {GUT_EXERCISE_TIPS_INTRO.body}
              </p>
            </div>

            <div className="mt-20 space-y-24 lg:mt-28 lg:space-y-36">
              {GUT_EXERCISE_TIPS.map((row) => (
                <FeatureRow key={row.id} {...row} />
              ))}
            </div>
          </div>
        </Section>
      </Reveal>

      {/* More on gut health - hands off to the other sections. */}
      <Reveal>
        <Section
          size="none"
          bg="cream-raised"
          className="pt-4 pb-20 sm:pt-6 sm:pb-28 lg:pt-8 lg:pb-36"
        >
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
                      className={FRAME_ZOOM}
                      imgClassName={PHOTO_ZOOM}
                    />
                    <p className="mt-5 font-sans text-base font-bold uppercase tracking-[0.14em] text-forest transition-colors group-hover:text-forest/60">
                      {item.title}
                    </p>
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
