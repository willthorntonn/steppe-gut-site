"use client";

import { useParams } from "next/navigation";
import Reveal from "../components/ui/Reveal";
import ProductSubNav from "../components/product/ProductSubNav";
import FybelleLayout from "../components/product/FybelleLayout";
import { Ag1Comparison, Ag1Scoop } from "../components/product/Ag1Sections";
import NotFound from "./NotFound";
import { PRODUCT_BY_SLUG } from "../data/products";

// All three formats share one layout: the imported main-product block
// (FybelleLayout), then the two imported AG1-derived sections. Both are
// parameterised by `product` so copy, benefits, specification, price and
// accordion content vary per SKU without duplicating markup per page.
export default function ProductDetail() {
  const { slug } = useParams();
  const product = PRODUCT_BY_SLUG[slug];

  // An unknown slug renders the 404 rather than an empty template. An empty
  // product page returning 200 is worse than an error (not-found.md).
  if (!product) return <NotFound />;

  return (
    <>
      <div
        data-navtheme="light"
        className="bg-cream pt-[84px] sm:pt-[99px] lg:pt-[140px]"
      >
        {/* The subnav and the layout below it run their own load-in (a
            fade for the switcher, column entrances inside FybelleLayout),
            so neither is wrapped in Reveal - a scroll reveal on content
            that is already above the fold would fight the entrance. */}
        <div className="animate-fade-in delay-200">
          <ProductSubNav activeSlug={product.slug} />
        </div>
        <FybelleLayout product={product} />
      </div>

      {/* Below the fold, so these use the homepage's scroll reveal. */}
      <Reveal>
        <Ag1Comparison product={product} />
      </Reveal>
      <Reveal>
        <Ag1Scoop product={product} />
      </Reveal>
    </>
  );
}
