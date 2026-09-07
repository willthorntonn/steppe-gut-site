import PageMeta from "../components/ui/PageMeta";
import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Reveal from "../components/ui/Reveal";
import ImagePlaceholder from "../components/ui/ImagePlaceholder";
import PlateHero, { PlateHeroTitle } from "../components/ui/PlateHero";
import SectionSubNav from "../components/layout/SectionSubNav";
import BoosterCarousel from "../components/gut-health/BoosterCarousel";
import { GUT_HEALTH_LINKS } from "../data/site";
import { BODY, H2 } from "../styles/type";
import {
  GUT_MOOD_FEATURE,
  GUT_MOOD_HABITS_INTRO,
  GUT_MOOD_HERO,
  GUT_MOOD_INTRO,
  GUT_MOOD_READ_MORE,
  GUT_MOOD_SHELVES,
} from "../content/gutMood";
import { Link } from "react-router-dom";

// /gut-health/mood/ - the "Gut Mood" sub-section. Structure is lifted from a
// reference gut-health article: a wide banner sitting under the section
// switcher, a centred title, a two-part intro, one media/text row, then a
// stack of paged habit shelves (BoosterCarousel) on alternating backgrounds,
// and a small "keep reading" grid handing off to the neighbouring
// sub-sections. Every image is an ImagePlaceholder grey box until the real
// photography exists. Copy is Steppe Gut's own and stays inside the claim
// discipline - no health-outcome claims, none of the habits routed through
// the product. No eyebrow/kicker labels, no terminal full stops (house
// rules).

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

// One media/text row. Mirrors src/pages/GutHealth.jsx's FeatureRow grid and
// spacing so the page keeps the site's rhythm, without the trailing CTA.
function FeatureRow({ heading, body, image, src, alt, ratio }) {
  return (
    <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
      <div>
        <ImagePlaceholder description={image} src={src} alt={alt} ratio={ratio} />
      </div>
      <div>
        <h2 className="max-w-[18ch] font-serif font-normal text-forest" style={H2}>
          {heading}
        </h2>
        <p className="mt-8 max-w-[54ch] font-sans text-forest/80" style={BODY}>
          {body}
        </p>
      </div>
    </div>
  );
}

export default function GutMood() {
  return (
    <>
      <PageMeta
        title="Gut and Mood - Gut Health · Steppe Gut"
        description="How the gut and the brain stay in contact, and a set of ordinary daily habits people use to feel steadier"
      />

      {/* No PageHeader: the section switcher sits directly under the fixed
          main nav, in the same spot as on every other Gut Health page. */}
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
          brief={GUT_MOOD_HERO.image}
          src={GUT_MOOD_HERO.src}
          alt={GUT_MOOD_HERO.alt}
          ratio="21 / 9"
        >
          <PlateHeroTitle section="Gut Health" title="Gut and Mood" />
        </PlateHero>
      </Section>

      <Reveal>
        <Section
          size="none"
          bg="cream"
          className="pt-10 pb-20 sm:pt-12 sm:pb-28 lg:pt-16 lg:pb-36"
        >
          <Container width="content">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16">
              <h2 className="font-serif font-normal text-forest" style={H2}>
                {GUT_MOOD_INTRO.heading}
              </h2>
              <p className="max-w-[54ch] font-sans text-forest/80" style={BODY}>
                {GUT_MOOD_INTRO.body}
              </p>
            </div>
          </Container>
        </Section>
      </Reveal>

      <Reveal>
        <Section size="default" bg="cream-raised">
          <Container width="content">
            <FeatureRow {...GUT_MOOD_FEATURE} />
          </Container>
        </Section>
      </Reveal>

      <Reveal>
        <Section size="default" bg="cream">
          <Container width="content">
            <h2 className="max-w-[22ch] font-serif font-normal text-forest" style={H2}>
              {GUT_MOOD_HABITS_INTRO.heading}
            </h2>
            <p className="mt-8 max-w-[58ch] font-sans text-forest/80" style={BODY}>
              {GUT_MOOD_HABITS_INTRO.body}
            </p>
          </Container>
        </Section>
      </Reveal>

      {GUT_MOOD_SHELVES.map((shelf, index) => (
        <Reveal key={shelf.id}>
          <Section
            size="default"
            bg={index % 2 === 0 ? "cream-raised" : "cream"}
          >
            <BoosterCarousel
              heading={shelf.heading}
              intro={shelf.intro}
              items={shelf.items}
            />
          </Section>
        </Reveal>
      ))}

      <Reveal>
        <Section size="default" bg="cream">
          <Container width="content">
            <h2
              className="mx-auto max-w-[16ch] text-center font-serif font-normal text-forest"
              style={H2}
            >
              {GUT_MOOD_READ_MORE.heading}
            </h2>
            <ul className="mt-12 grid list-none grid-cols-1 gap-8 sm:grid-cols-3 lg:mt-16 lg:gap-10">
              {GUT_MOOD_READ_MORE.items.map((item) => (
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
                      {item.caption}
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
