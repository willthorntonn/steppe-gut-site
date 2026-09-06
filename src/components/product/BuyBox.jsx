import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import Picture from "../ui/Picture";
import Placeholder from "../ui/Placeholder";
import { useCart } from "../../cart/CartProvider";
import { BODY_SM, CAPTION, DISPLAY } from "../../styles/type";

// 05_component_library.md §22.
//
// Content order inside the card is fixed: h1, price, paragraph, 4 fact
// bullets, quantity stepper, Add to basket, reassurance, allergen.
//
// The allergen line is always visible and never inside an accordion
// (product-detail.md, accessibility notes).
export default function BuyBox({ product, boxRef }) {
  const [qty, setQty] = useState(1);
  const { add } = useCart();

  return (
    <Container>
      <div
        ref={boxRef}
        className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[56fr_44fr] lg:gap-0"
      >
        <div className="overflow-hidden rounded-2xl bg-[#FFFDF9]">
          {product.image ? (
            <Picture
              avif={product.image.avif}
              webp={product.image.webp}
              alt={product.alt}
              width={900}
              height={1125}
              // The LCP element on this page: eager, high priority, explicit
              // dimensions (product-detail.md §1).
              loading="eager"
              className="block"
              imgClassName="aspect-[4/5] w-full object-cover"
            />
          ) : (
            <Placeholder
              ratio="4 / 5"
              brief={product.imageBrief}
              tone="light"
              className="border-0"
            />
          )}
        </div>

        {/* The card overlaps the image's right edge on desktop and sits below
            it on smaller screens. At 768–1023px it stays stacked: that width
            is not enough for a card over an image without one of them
            becoming unreadable. */}
        <div className="rounded-2xl bg-[#FFFDF9] p-8 shadow-[0_22px_60px_-18px_rgba(47,62,47,0.22)] lg:-ml-12 lg:p-10">
          <h1
            id="page-title"
            tabIndex={-1}
            className="font-serif font-normal text-forest outline-none"
            style={{ ...DISPLAY, fontSize: "clamp(2.6rem, 4vw, 4rem)" }}
          >
            {product.name}
          </h1>

          {/* Omitted entirely rather than rendered as a placeholder while
              pricing is unlocked (products-collection.md §2). */}
          {product.price != null && (
            <p className="mt-6 font-sans text-2xl font-semibold text-forest">
              ฿{product.price.toLocaleString("en-TH")}
            </p>
          )}

          <p
            className="mt-7 max-w-[46ch] font-sans text-forest/80"
            style={BODY_SM}
          >
            {product.paragraph}
          </p>

          <ul className="mt-8 space-y-3">
            {product.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-[0.6em] h-1 w-1 shrink-0 bg-gold"
                />
                <span
                  className="font-sans text-forest/80"
                  style={BODY_SM}
                >
                  {bullet}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex items-center gap-5">
            <span
              id={`qty-label-${product.slug}`}
              className="font-sans text-sm font-semibold text-forest"
            >
              Quantity
            </span>
            <div className="flex items-center rounded-full border border-forest/25">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((n) => Math.max(1, n - 1))}
                disabled={qty === 1}
                className="flex h-11 w-11 items-center justify-center rounded-full text-forest transition-colors hover:bg-forest/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-35"
              >
                <Minus size={18} strokeWidth={1.75} />
              </button>
              {/* Announced politely so a screen-reader user hears the new
                  value; the visible number is real text, not an icon. */}
              <span
                aria-live="polite"
                aria-labelledby={`qty-label-${product.slug}`}
                className="w-9 text-center font-sans text-base font-semibold text-forest"
              >
                {qty}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((n) => Math.min(20, n + 1))}
                className="flex h-11 w-11 items-center justify-center rounded-full text-forest transition-colors hover:bg-forest/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <Plus size={18} strokeWidth={1.75} />
              </button>
            </div>
          </div>

          <Button
            variant="forest"
            radius="2xl"
            onClick={() => add(product.slug, qty, product.name)}
            className="mt-8 h-14 w-full text-[18px]"
          >
            Add to basket
          </Button>

          <p className="mt-5 font-sans text-forest/55" style={CAPTION}>
            {product.reassurance}
          </p>

          <p
            className="mt-4 font-sans font-semibold text-forest/75"
            style={CAPTION}
          >
            {product.allergen}
          </p>
        </div>
      </div>
    </Container>
  );
}
