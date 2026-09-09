"use client";

import Picture from "../ui/Picture";
import { formatTHB } from "../../checkout/pricing";

// The reference checkout's "Complete your setup" card, sitting between the
// basket lines and the discount field.
//
// It offers the formats not already in the basket. All three contain the same
// powder, so this is a format choice rather than an upsell to something extra
// - the copy says so instead of implying the basket is incomplete without it.
export default function CrossSellCard({ products, onAdd }) {
  if (products.length === 0) return null;

  return (
    <div className="rounded-xl bg-cream p-5">
      <h3 className="font-sans text-sm font-semibold text-forest">
        The other formats
      </h3>
      <p className="mt-1 font-sans text-[13px] text-forest/60">
        Same powder, different packaging.
      </p>

      <ul className="mt-4 space-y-4">
        {products.map((product) => (
          <li key={product.slug} className="flex items-center gap-3">
            <Picture
              avif={product.thumb.avif}
              webp={product.thumb.webp}
              alt={product.alt}
              width={48}
              height={48}
              imgClassName="h-12 w-12 shrink-0 rounded-lg border border-forest/12 bg-[#FFFDF9] object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="font-sans text-[14px] font-semibold leading-snug text-forest">
                {product.name}
              </p>
              <p className="mt-0.5 font-sans text-[12px] text-forest/60">
                {product.price == null
                  ? product.format
                  : `${product.format} · ${formatTHB(product.price)}`}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onAdd(product)}
              className="h-9 shrink-0 rounded-lg bg-forest px-4 font-sans text-sm font-semibold text-cream transition-colors hover:bg-forest/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              Add
              <span className="sr-only"> {product.name} to your basket</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
