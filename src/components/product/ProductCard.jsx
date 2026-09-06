import { Link } from "react-router-dom";
import Picture from "../ui/Picture";
import Placeholder from "../ui/Placeholder";
import { MARKETING_PRICE_BY_SLUG, REVIEWS_BY_SLUG } from "../../data/products";

// Built once, used by the products grid and the cart's cross-sell.
// Rebuilding it per page is a defect (05_component_library.md, reuse map).
//
// The whole card is one <a>, so there is one tab stop per product rather than
// several (products-collection.md, accessibility notes). The "Choose options"
// control is therefore a styled <span>, not a nested <button> - an interactive
// element inside a link is invalid and breaks keyboard behaviour. The card
// already lands on the detail page, which is where options are chosen.
//
// Layout under the image mirrors the storefront reference card: centred
// title, star rating with a review count, a "From" price with the marketing
// compare-at struck through, and a solid full-width call to action. Price and
// review figures are the shared placeholders from data/products.js.
//
// Hover borrows the homepage three-up media row's style (components/home/
// ProcessRow.jsx), scaled to this smaller card: a white panel lifts in behind
// the card and grows a few px outward on every side, the image frame grows
// with it, and the photo inside tightens on its own centre. The panel is
// absolutely positioned so nothing reflows. There is no resting border - the
// panel is the whole visual frame, and it only appears on hover/focus.
const PANEL_BOX =
  "absolute -left-2.5 -right-2.5 -top-2.5 -bottom-2.5 rounded-[28px] transition-all duration-500 ease-out " +
  "group-hover:-left-4 group-hover:-right-4 group-hover:-top-4 group-hover:-bottom-4 " +
  "group-focus-visible:-left-4 group-focus-visible:-right-4 group-focus-visible:-top-4 group-focus-visible:-bottom-4";

const FRAME =
  "overflow-hidden rounded-xl bg-cream transition-[transform,background-color] duration-500 ease-out " +
  "group-hover:scale-[1.035] group-hover:bg-white group-focus-visible:scale-[1.035] group-focus-visible:bg-white";
const PHOTO =
  "aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out " +
  "group-hover:scale-[1.06] group-focus-visible:scale-[1.06]";

export default function ProductCard({ product, className = "" }) {
  const pricing = MARKETING_PRICE_BY_SLUG[product.slug];
  const reviews = REVIEWS_BY_SLUG[product.slug];

  return (
    <Link
      to={`/products/${product.slug}/`}
      className={`group relative flex h-full flex-col rounded-2xl bg-[#FFFDF9] p-4 transition-colors duration-500 ease-out hover:bg-white focus-visible:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:p-5 ${className}`}
    >
      {/* The white panel, behind everything. */}
      <span
        aria-hidden="true"
        className={`${PANEL_BOX} bg-transparent group-hover:bg-white group-hover:shadow-[0_28px_64px_-24px_rgba(38,50,38,0.32)] group-focus-visible:bg-white group-focus-visible:shadow-[0_28px_64px_-24px_rgba(38,50,38,0.32)]`}
      />

      <div className={`relative ${FRAME}`}>
        {product.image ? (
          <Picture
            avif={product.image.avif}
            webp={product.image.webp}
            alt={product.alt}
            width={640}
            height={800}
            className="block"
            imgClassName={PHOTO}
          />
        ) : (
          // No photograph shot for this format yet. The written brief is the
          // house convention for an unshot frame - it is handed to the
          // photographer as-is rather than filled with a stand-in.
          <Placeholder
            ratio="4 / 5"
            brief={product.imageBrief}
            tone="light"
            className="rounded-xl border-0"
          />
        )}
      </div>

      <div className="relative flex flex-1 flex-col items-center px-1 pb-1 pt-6 text-center">
        <h3 className="font-sans text-[17px] font-semibold leading-snug tracking-[-0.01em] text-forest">
          {product.name}
        </h3>

        {reviews && (
          <p className="mt-3 flex items-center justify-center gap-1.5 font-sans text-[13px] text-forest/55">
            <span aria-hidden="true" className="tracking-[2px] text-gold">
              {"★".repeat(reviews.rating)}
            </span>
            <span>({reviews.count})</span>
            <span className="sr-only">
              Rated {reviews.rating} out of 5 from {reviews.count} reviews
            </span>
          </p>
        )}

        {pricing && (
          <p className="mt-3 font-sans text-[15px] text-forest">
            <span className="font-semibold">From {pricing.price}</span>{" "}
            <span className="text-forest/45 line-through">{pricing.was}</span>
          </p>
        )}

        <span
          aria-hidden="true"
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-lg bg-forest px-4 font-sans text-[15px] font-semibold tracking-[-0.01em] text-cream transition-colors group-hover:bg-forest/90"
        >
          Choose options
        </span>
        {/* The visible label above is decorative because the whole card is
            already the link; this gives the link an accessible name that
            names the product rather than repeating "Choose options" for every
            card in a row to a screen reader. */}
        <span className="sr-only">Choose options for {product.name}</span>
      </div>
    </Link>
  );
}
