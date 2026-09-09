"use client";

import Link from "next/link";
import { PRODUCTS } from "../../data/products";

// Phase 2 secondary nav: sits directly under the fixed header on every
// product detail page, listing all three variants so switching formats
// never requires going back through the mega-menu.
const ORDER = ["sachet-bag", "sachet-box", "pill-bottle"];

export default function ProductSubNav({ activeSlug }) {
  const products = ORDER.map((slug) =>
    PRODUCTS.find((product) => product.slug === slug)
  ).filter(Boolean);

  return (
    <nav
      aria-label="Product formats"
      className="relative -top-5 flex justify-center gap-8 border-b border-forest/10 bg-cream px-4 py-4 sm:-top-6 sm:gap-12"
    >
      {products.map((product) => {
        const isActive = product.slug === activeSlug;
        // Sized off the header's own links (Nav.jsx: 13px, 22px at 1395+)
        // and kept one step under them at each breakpoint, so the format
        // switcher reads as secondary to the site nav rather than as fine
        // print.
        return (
          <Link
            key={product.slug}
            href={`/products/${product.slug}/`}
            aria-current={isActive ? "page" : undefined}
            className={`whitespace-nowrap font-sans font-semibold tracking-[-0.01em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${
              isActive ? "text-gold" : "text-forest hover:text-gold"
            }`}
            style={{ fontSize: "clamp(15px, calc(1.35 * var(--vw)), 19px)" }}
          >
            {product.name}
          </Link>
        );
      })}
    </nav>
  );
}
