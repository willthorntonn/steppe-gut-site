import Section from "../ui/Section";
import Container from "../ui/Container";
import Eyebrow from "../ui/Eyebrow";
import LinkArrow from "../ui/LinkArrow";
import ProductCard from "../product/ProductCard";
import { PRODUCTS } from "../../data/products";
import { BODY, H2 } from "../../styles/type";

// home.md §4. The homepage had no route to purchase at all before this — it
// answered "what is this" four times and "what do I actually buy" never.
//
// 05_component_library.md §18 specifies a scrolling CardRail with arrows at
// ≥1024px. With three cards the arrows would be permanently disabled on
// desktop, so this scroll-snaps below lg (where three cards genuinely do not
// fit) and becomes a plain three-column grid above it. The rail's purpose is
// to signal "there is more to the right"; at lg there isn't.
export default function ProductRail() {
  return (
    <Section id="products" size="default">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
          <div className="min-w-0">
            <Eyebrow>The formats</Eyebrow>
            <h2
              className="mt-7 max-w-[16ch] font-serif font-normal text-forest"
              style={H2}
            >
              Three ways to take it
            </h2>
            <p
              className="mt-7 max-w-[46ch] font-serif text-forest/75"
              style={BODY}
            >
              The formula is the same in all three. Choose whichever fits your
              morning.
            </p>
          </div>

          <LinkArrow to="/products/" className="shrink-0 md:pb-3">
            See all products
          </LinkArrow>
        </div>
      </Container>

      {/* Below lg the track breaks the container to the right edge, so a
          partially visible third card signals that it scrolls without needing
          arrows. The first card still aligns to the container's left
          padding. */}
      <div
        role="region"
        aria-label="Product formats, scrollable"
        tabIndex={0}
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:px-10 lg:mx-auto lg:grid lg:max-w-[2000px] lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:px-14"
      >
        {PRODUCTS.map((product) => (
          <div
            key={product.slug}
            className="w-[280px] shrink-0 snap-start sm:w-[320px] lg:w-auto"
          >
            <ProductCard product={product} className="h-full" />
          </div>
        ))}
      </div>
    </Section>
  );
}
