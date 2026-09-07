import { Link } from "react-router-dom";
import PageMeta from "../components/ui/PageMeta";
import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Reveal from "../components/ui/Reveal";
import ImagePlaceholder from "../components/ui/ImagePlaceholder";
import PlateHero, { PlateHeroTitle } from "../components/ui/PlateHero";
import SectionSubNav from "../components/layout/SectionSubNav";
import ProductCard from "../components/product/ProductCard";
import { OUR_STORY_LINKS } from "../data/site";
import { PRODUCTS } from "../data/products";
import { MANUFACTURING } from "../content/manufacturing";
import { BODY, H2, H2_XL, H3 } from "../styles/type";

// /our-story/manufacturing/, built to the structure of the reference
// "Manufacturing Process" page: title, offset intro, wide image, two
// image/text blocks, a "what is measured" beat, the numbered production
// steps, a "who makes it" row, then a closing "discover our products" grid
// linking back to the three product pages.
//
// The chrome - the section switcher sitting directly under the fixed main
// nav, nothing above it - is identical to the Our Story hub, Our Mission and
// Our Science Mission, so the switcher lands at the same height on every Our
// Story page. Copy is in src/content/manufacturing.js. Body voice is sans,
// headings are the display serif. Full stops are used in the big descriptions
// here (Will's amendment, 2026-09-01); headings and short labels stay
// unpunctuated. Every image is a written placeholder until the production
// photography is shot.
//
// The closing product grid reuses the shared ProductCard (components/product/
// ProductCard.jsx) rather than a bespoke layout - the same card the Products
// grid and Cart's "You may also like" cross-sell use, per the reuse map in
// SG-PROJECT_SPEC.md §10, so a manufacturing-trust page ends by pointing
// straight back at the products that trust is meant to support.

const { intro, heroImage, blocks, measured, makers } =
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
            <h2
              className="font-serif font-bold tracking-[-0.02em] text-forest"
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

      {/* What is measured. Same grid-cols-2 split as MediaBlock, so the
          heading and body land in the same second-column position as "It
          starts with the milk" above, with a batch-testing photograph in
          the first column in place of that block's milk image. */}
      <Reveal>
        <Section size="sm" bg="cream">
          <Container width="content">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
              <div>
                <ImagePlaceholder
                  description={measured.imageBrief}
                  src={measured.src}
                  alt={measured.alt}
                  ratio={measured.ratio}
                />
              </div>
              <div>
                <h2
                  className="max-w-[16ch] font-serif font-normal text-forest"
                  style={H2}
                >
                  {measured.heading}
                </h2>
                <div className="mt-8 max-w-[52ch]">
                  <p
                    className="font-sans text-forest/80"
                    style={BODY}
                  >
                    {measured.body}
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </Reveal>

      {/* Who makes it. Sized to match the Composition/Fermentation
          image/text fields on Our Science Mission: the same asymmetric
          0.82fr/1.18fr column split, the same 10/12/16 gap step and the
          same 46ch body measure, rather than the equal two-column
          MediaBlock used for the two blocks above. */}
      <Reveal>
        <Section size="default" bg="cream">
          <Container width="content">
            <div
              className={`grid grid-cols-1 items-center gap-10 md:gap-12 lg:gap-16 ${
                makers.reverse
                  ? "md:grid-cols-[0.82fr_1.18fr]"
                  : "md:grid-cols-[1.18fr_0.82fr]"
              }`}
            >
              <div className={makers.reverse ? "md:order-2" : undefined}>
                <ImagePlaceholder
                  description={makers.imageBrief}
                  src={makers.src}
                  alt={makers.alt}
                  ratio={makers.ratio}
                />
              </div>
              <div className={makers.reverse ? "md:order-1" : undefined}>
                <h3
                  className="max-w-[18ch] font-serif font-normal text-forest"
                  style={H2}
                >
                  {makers.heading}
                </h3>
                {makers.body.map((paragraph, index) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    className={`max-w-[46ch] font-sans text-forest/80 ${
                      index === 0 ? "mt-8" : "mt-5"
                    }`}
                    style={BODY}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      </Reveal>

      {/* Discover our products. Closes the manufacturing trust story by
          pointing straight back at the three products it applies to.
          Reuses the shared ProductCard grid, the same pattern as the
          Products page and Cart's "You may also like" cross-sell - each
          card is itself the link through to that product's detail page.
          The heading pair matches "Fuelled by science" on Our Science
          Mission (H2_XL, bold serif) over "Our Range", set at the same
          size as the "Our Story" section label above PlateHero's title
          (PlateHeroTitle's clamp(1.05rem,1.6vw,1.4rem) sans-semibold). */}
      <Reveal>
        <Section bg="cream" size="default">
          <Container width="wide">
            <div className="text-center">
              <h2
                className="font-serif font-bold tracking-[-0.02em] text-forest"
                style={H2_XL}
              >
                Discover our products
              </h2>
              <p className="mt-4 font-sans font-semibold tracking-[-0.015em] text-sage text-[clamp(1.05rem,1.6vw,1.4rem)]">
                Our range
              </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-[1100px] grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
              {PRODUCTS.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
            <div className="mt-10 flex justify-center lg:mt-14">
              <Link
                to="/products/"
                className="inline-flex h-[50px] items-center justify-center rounded-[10px] bg-forest px-9 font-sans text-[14px] font-semibold uppercase tracking-[0.08em] text-cream transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                View all products
              </Link>
            </div>
          </Container>
        </Section>
      </Reveal>
    </>
  );
}
