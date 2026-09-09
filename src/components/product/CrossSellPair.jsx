"use client";

import Link from "next/link";
import Container from "../ui/Container";
import Picture from "../ui/Picture";
import { BODY_SM, H3 } from "../../styles/type";

// 05_component_library.md §26. The two SKUs that are not the current page.
export default function CrossSellPair({ products }) {
  return (
    <Container width="content">
      <ul className="flex flex-col gap-4 lg:flex-row">
        {products.map((product) => (
          <li key={product.slug} className="flex-1">
            <Link
              href={`/products/${product.slug}/`}
              className="flex h-full min-h-[200px] items-center justify-between gap-6 overflow-hidden rounded-2xl border border-forest/12 bg-[#FFFDF9] p-7 transition-colors hover:border-forest/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <div className="min-w-0">
                <h3
                  className="font-serif font-normal text-forest"
                  style={H3}
                >
                  {product.name}
                </h3>
                <p
                  className="mt-3 max-w-[28ch] font-sans text-forest/70"
                  style={BODY_SM}
                >
                  {product.railDescriptor}
                </p>
              </div>

              {product.image && (
                <Picture
                  avif={product.image.avif}
                  webp={product.image.webp}
                  alt=""
                  width={120}
                  height={150}
                  className="hidden shrink-0 overflow-hidden rounded-xl sm:block"
                  imgClassName="h-[150px] w-[120px] object-cover"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
