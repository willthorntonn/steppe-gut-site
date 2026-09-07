import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import PageMeta from "../components/ui/PageMeta";
import Container from "../components/ui/Container";
import Picture from "../components/ui/Picture";
import { useCart } from "../cart/CartProvider";
import { PRODUCTS, PRODUCT_BY_SLUG } from "../data/products";
import ProductCard from "../components/product/ProductCard";
import Section from "../components/ui/Section";
import NewsletterSignup from "../components/marketing/NewsletterSignup";
import {
  DEMO_UNIT_PRICE,
  PROMO_MIN_UNITS,
  PROMO_RATE,
  baht,
} from "../checkout/demoPrices";
import applepayLogo from "../assets/payment/applepay.png";
import googlepayLogo from "../assets/payment/googlepay.png";

// The basket page. The header basket icon lands here; "Checkout securely"
// is the only way on to /checkout/, so the cart is the single place a
// quantity can be changed before payment.
//
// Structure follows the supplied reference screenshot one section at a time -
// title with a "Continue shopping" link opposite, a PRODUCT / QUANTITY /
// TOTAL rule, one row per line with a stepper and a bin, then a right-aligned
// subtotal above the checkout and express-pay buttons. Colour and type are
// this site's (forest / cream / gold, EB Garamond headings), not the
// reference's black-on-white.

/** One quantity stepper: − value + inside a single rounded field. */
function Stepper({ qty, onChange, name }) {
  const button =
    "flex h-12 w-12 items-center justify-center text-forest/70 transition-colors hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-not-allowed disabled:text-forest/25";
  return (
    <div className="inline-flex items-center rounded-[10px] border border-forest/15 bg-[#FFFDF9]">
      <button
        type="button"
        className={button}
        onClick={() => onChange(qty - 1)}
        disabled={qty <= 1}
        aria-label={`Decrease quantity of ${name}`}
      >
        <Minus size={18} strokeWidth={1.75} aria-hidden="true" />
      </button>
      <span
        className="min-w-[2.5rem] text-center font-sans text-[15px] font-medium text-forest"
        aria-live="polite"
      >
        {qty}
      </span>
      <button
        type="button"
        className={button}
        onClick={() => onChange(qty + 1)}
        aria-label={`Increase quantity of ${name}`}
      >
        <Plus size={18} strokeWidth={1.75} aria-hidden="true" />
      </button>
    </div>
  );
}

/** Express-pay button, same white chip treatment the checkout uses. */
function ExpressPayButton({ src, label, borderClassName = "border-forest/15" }) {
  return (
    <button
      type="button"
      className={`flex h-[50px] w-full items-center justify-center rounded-[10px] border ${borderClassName} bg-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold`}
    >
      <span className="sr-only">Pay with {label}</span>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="h-10 w-auto object-contain"
      />
    </button>
  );
}

export default function Cart() {
  const { items, setQty, remove } = useCart();

  // A slug that no longer exists in products.js is dropped rather than
  // crashing the page - a basket in localStorage can outlive a product.
  const lines = items
    .map((item) => ({ product: PRODUCT_BY_SLUG[item.slug], qty: item.qty }))
    .filter((line) => line.product);

  const units = lines.reduce((sum, line) => sum + line.qty, 0);
  const original = units * DEMO_UNIT_PRICE;
  // Matches the checkout: the launch offer applies itself at two units
  // rather than asking for a code.
  const promoRate = units >= PROMO_MIN_UNITS ? PROMO_RATE : 0;
  const savings = original * promoRate;
  const subtotal = original - savings;

  // Cross-sell under the basket. The catalogue is only the three formats, so
  // "you may also like" is simply the formats not already in the basket -
  // shown as the shared ProductCard, same as the products grid. With an empty
  // basket every format is offered.
  const inCart = new Set(items.map((item) => item.slug));
  const recommendations = PRODUCTS.filter((product) => !inCart.has(product.slug));

  return (
    <>
      <PageMeta title="Your cart · Steppe Gut" noindex />

      {/* The fixed nav samples this to pick its ink colour - without it the
          cream nav labels would sit invisible on the cream page. */}
      <section data-navtheme="light" className="bg-cream">
        <Container width="wide" className="pb-24 pt-[136px] lg:pt-[168px]">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h1 className="font-serif text-[clamp(2.4rem,4vw,3.4rem)] font-semibold leading-none tracking-[-0.04em] text-forest">
              Your cart
            </h1>
            <Link
              to="/products/"
              // Matches the "Checkout securely" label exactly - same 15px,
              // weight, case and tracking - so the two read at the same size.
              className="font-sans text-[15px] font-semibold uppercase tracking-[0.1em] text-forest underline-offset-[6px] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              Continue shopping
            </Link>
          </div>

          {lines.length === 0 ? (
            <div className="mt-10 border-t border-forest/15 pt-10">
              <p className="max-w-[46ch] font-sans text-[1.25rem] leading-relaxed text-forest/75">
                Nothing in here yet. The three formats all contain the same
                powder - sachets, capsules or a refill pouch.
              </p>
              <Link
                to="/products/"
                className="mt-8 inline-flex h-[50px] items-center justify-center rounded-[10px] bg-forest px-7 font-sans text-[14px] font-semibold uppercase tracking-[0.08em] text-cream transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                See the products
              </Link>
            </div>
          ) : (
            <>
              {/* Column headings. Hidden below md, where each row stacks and
                the labels would sit above nothing. */}
              <div className="mt-14 hidden border-b border-forest/15 pb-5 md:grid md:grid-cols-[1fr_auto_140px] md:items-end md:gap-8">
                <span className="font-sans text-[12px] uppercase tracking-[0.12em] text-forest/60">
                  Product
                </span>
                <span className="font-sans text-[12px] uppercase tracking-[0.12em] text-forest/60">
                  Quantity
                </span>
                <span className="text-right font-sans text-[12px] uppercase tracking-[0.12em] text-forest/60">
                  Total
                </span>
              </div>

              <ul className="border-b border-forest/15 md:border-t-0">
                {lines.map((line) => (
                  <li
                    key={line.product.slug}
                    className="grid grid-cols-[1fr_auto] items-start gap-5 border-t border-forest/15 py-12 first:border-t md:grid-cols-[1fr_auto_140px] md:items-center md:gap-8 md:first:border-t-0"
                  >
                    <div className="col-span-2 flex items-start gap-5 md:col-span-1">
                      <div className="h-32 w-32 shrink-0 rounded-[12px] border border-forest/15 bg-[#FFFDF9] p-0.5">
                        <Picture
                          avif={line.product.thumb.avif}
                          webp={line.product.thumb.webp}
                          alt={line.product.alt}
                          width={128}
                          height={128}
                          imgClassName="h-full w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <Link
                          to={`/products/${line.product.slug}/`}
                          className="font-sans text-[16px] font-semibold leading-snug text-forest underline-offset-[4px] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                        >
                          {line.product.name}
                        </Link>
                        <p className="mt-1.5 font-sans text-[15px] text-forest">
                          {baht(DEMO_UNIT_PRICE)}
                        </p>
                      </div>
                    </div>

                    {/* Indent clears the thumbnail (w-32) plus the gap-5
                        beside it, so the stepper lines up under the product
                        name when the row stacks below md. Dropped on the
                        narrowest screens, where stepper + bin + total cannot
                        share a line with a 148px indent without the total
                        running off the right edge. */}
                    <div className="flex items-center gap-3 sm:pl-[148px] md:justify-center md:pl-0">
                      <Stepper
                        qty={line.qty}
                        name={line.product.name}
                        onChange={(next) =>
                          setQty(line.product.slug, next, line.product.name)
                        }
                      />
                      <button
                        type="button"
                        onClick={() =>
                          remove(line.product.slug, line.product.name)
                        }
                        aria-label={`Remove ${line.product.name} from your cart`}
                        className="flex h-12 w-12 items-center justify-center rounded-full text-forest/60 transition-colors hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                      >
                        <Trash2
                          size={20}
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </button>
                    </div>

                    <p className="text-right font-sans text-[18px] font-medium text-forest">
                      {baht(DEMO_UNIT_PRICE * line.qty)}
                    </p>
                  </li>
                ))}
              </ul>

              {/* Totals sit under the TOTAL column, right-aligned, as in the
                reference. */}
              <div className="mt-12 flex justify-end">
                <div className="w-full max-w-[460px]">
                  {savings > 0 && (
                    <div className="flex items-baseline justify-between gap-4 pb-4">
                      <span className="font-sans text-[15px] text-forest/70">
                        Launch offer, 20% off two or more
                      </span>
                      <span className="font-sans text-[15px] text-forest/70">
                        −{baht(savings)}
                      </span>
                    </div>
                  )}

                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-sans text-[17px] font-semibold text-forest">
                      Subtotal
                    </span>
                    <span className="font-sans text-[22px] font-semibold text-forest">
                      {baht(subtotal)} THB
                    </span>
                  </div>

                  <Link
                    to="/checkout/"
                    className="mt-8 flex h-[58px] w-full items-center justify-center rounded-[10px] bg-forest font-sans text-[15px] font-semibold uppercase tracking-[0.1em] text-cream transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    Checkout securely
                  </Link>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <ExpressPayButton
                      src={applepayLogo}
                      label="Apple Pay"
                      borderClassName="border-black"
                    />
                    <ExpressPayButton src={googlepayLogo} label="Google Pay" />
                  </div>
                </div>
              </div>
            </>
          )}
        </Container>
      </section>

      {recommendations.length > 0 && (
        <Section bg="cream" size="none" className="pb-14 pt-4 sm:pb-16 sm:pt-6">
          <Container width="wide">
            <h2 className="text-center font-sans text-[28px] font-bold leading-tight tracking-[-0.02em] text-forest sm:text-[32px] lg:text-[38px]">
              You may also like
            </h2>
            <div
              className={`mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 ${
                recommendations.length >= 3
                  ? "max-w-[1100px] lg:grid-cols-3"
                  : "max-w-[760px]"
              }`}
            >
              {recommendations.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Link
                to="/products/"
                className="inline-flex h-[50px] items-center justify-center rounded-[10px] bg-forest px-9 font-sans text-[14px] font-semibold uppercase tracking-[0.08em] text-cream transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                View all
              </Link>
            </div>
          </Container>
        </Section>
      )}

      <NewsletterSignup />
    </>
  );
}
