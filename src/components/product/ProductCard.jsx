import { Link } from "react-router-dom";
import Picture from "../ui/Picture";
import Placeholder from "../ui/Placeholder";
import { BODY_SM, H3 } from "../../styles/type";
import { EYEBROW_CLS } from "../../styles/type";

// Built once, used by the home rail and the products grid. Rebuilding it per
// page is a defect (05_component_library.md, reuse map).
//
// The whole card is one <a>, so there is one tab stop per product rather than
// three (products-collection.md, accessibility notes). "Read the details" is
// therefore a styled <span>, not a nested <button> — an interactive element
// inside a link is invalid and breaks keyboard behaviour.
//
// The CTA is "Read the details", never "Add to basket": adding from a grid
// skips the education step this brand depends on
// (05_component_library.md §21).
export default function ProductCard({ product, className = "" }) {
  return (
    <Link
      to={`/products/${product.slug}/`}
      className={`group flex h-full flex-col rounded-2xl border border-forest/12 bg-[#FFFDF9] p-4 transition-shadow hover:shadow-[0_10px_30px_-12px_rgba(47,62,47,0.16)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:p-5 ${className}`}
    >
      <div className="overflow-hidden rounded-xl bg-cream">
        {product.image ? (
          <Picture
            avif={product.image.avif}
            webp={product.image.webp}
            alt={product.alt}
            width={640}
            height={800}
            className="block"
            imgClassName="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          // No photograph shot for this format yet. The written brief is the
          // house convention for an unshot frame — it is handed to the
          // photographer as-is rather than filled with a stand-in.
          <Placeholder
            ratio="4 / 5"
            brief={product.imageBrief}
            tone="light"
            className="rounded-xl border-0"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col px-1 pb-1 pt-6">
        <p className={EYEBROW_CLS}>{product.format}</p>

        <h3
          className="mt-3 font-serif font-normal text-forest"
          style={H3}
        >
          {product.name}
        </h3>

        <p
          className="mt-3 font-serif text-forest/75"
          style={BODY_SM}
        >
          {product.railDescriptor ?? product.descriptor}
        </p>

        {/* Price is omitted rather than rendered as a placeholder while
            pricing is unlocked (products-collection.md §2). */}
        {product.price != null && (
          <p className="mt-4 font-sans text-lg font-semibold text-forest">
            ฿{product.price.toLocaleString("en-TH")}
          </p>
        )}

        <span
          aria-hidden="true"
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full border border-forest font-sans text-[15px] font-semibold tracking-[-0.01em] text-forest transition-colors group-hover:bg-forest group-hover:text-cream"
        >
          Read the details
        </span>
        {/* The visible label above is decorative because the whole card is
            already the link; this gives the link an accessible name that
            names the product rather than repeating "Read the details" three
            times in a row to a screen reader. */}
        <span className="sr-only">Read the details about {product.name}</span>
      </div>
    </Link>
  );
}
