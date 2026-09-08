import PageMeta from "../components/ui/PageMeta";
import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import ProductCard from "../components/product/ProductCard";
import Reveal from "../components/ui/Reveal";
import ContactForm from "../components/contact/ContactForm";
import { PRODUCTS } from "../data/products";

// Buy Steppe Gut. The heading and the "Contact us" heading both use the cart
// page's serif treatment (same weight, tracking and leading), the second a
// step smaller; heading, blurb and "Contact us" are all centred.
//
// The three product cards are the shared /products/ component, hover panel
// and all (05_component_library.md's reuse map).
//
// The contact form (components/contact/ContactForm.jsx) is the shared block
// also used as the whole of /contact/ - sized ~55% larger than the checkout
// FloatField it derives from, text included.

export default function Buy() {
  return (
    <>
      <PageMeta
        title="Buy Steppe Gut"
        description="Explore the full Steppe Gut range of fermented mare's milk supplements and find the right format for your daily routine"
      />

      <div
        data-navtheme="light"
        className="bg-cream pb-14 pt-[112px] sm:pb-16 sm:pt-[132px] lg:pb-20 lg:pt-[186px]"
      >
        <Container width="wide" className="text-center">
          {/* Phase 2: heading enlarged 20% over its phase-1 size
              (clamp(2.5rem,6vw,4.75rem) x 1.2). The container steps up to
              "wide" so the larger line still fits on one line on desktop. */}
          <h1
            id="page-title"
            tabIndex={-1}
            className="mx-auto font-serif text-[clamp(3rem,7.2vw,5.7rem)] font-semibold uppercase leading-[1.05] tracking-[-0.04em] text-forest outline-none sm:whitespace-nowrap"
          >
            Buy Steppe Gut Today
          </h1>
          <p className="mx-auto mt-9 max-w-[56ch] font-sans text-[1.15rem] leading-relaxed text-forest/70 sm:mt-11 sm:text-[1.35rem]">
            Whether you're looking for our classic Steppe Gut Original, or one of
            our specialised formulas, you can explore the full Steppe Gut range
            and find the right product for your daily wellness routine. Discover
            our fermented mare's milk supplements, rooted in Mongolian tradition
            and crafted for modern everyday life
          </p>
        </Container>
      </div>

      <Reveal>
        <Section bg="white" size="default" className="pt-10 sm:pt-14 lg:pt-20">
          <Container>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {PRODUCTS.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </Container>
        </Section>
      </Reveal>

      <Reveal>
        <Section bg="cream" size="default">
          <Container width="content" className="text-center">
            {/* ~90% of the "Buy Steppe Gut Today" heading at every width
                (h1 clamp(3rem,7.2vw,5.7rem) x 0.9). */}
            <h2 className="font-serif text-[clamp(2.7rem,6.48vw,5.13rem)] font-semibold leading-none tracking-[-0.04em] text-forest">
              Contact us
            </h2>
            <ContactForm />
          </Container>
        </Section>
      </Reveal>
    </>
  );
}
