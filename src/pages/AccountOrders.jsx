import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RotateCcw } from "lucide-react";
import PageMeta from "../components/ui/PageMeta";
import Container from "../components/ui/Container";
import Picture from "../components/ui/Picture";
import { useAuth } from "../auth/AuthProvider";
import { useCart } from "../cart/CartProvider";
import { ordersNewestFirst, statusLabel } from "../data/orders";
import { PRODUCT_BY_SLUG } from "../data/products";
import {
  DEMO_UNIT_PRICE,
  PROMO_MIN_UNITS,
  PROMO_RATE,
  baht,
} from "../checkout/demoPrices";

// My Orders. Deliberately built on the cart page's layout - same forest / cream
// palette, same PRODUCT / QUANTITY / TOTAL rule, same right-aligned totals
// block - so a past order reads like a frozen basket. The differences are all
// the ones that follow from the order being finished: the quantity is a
// read-only value rather than a stepper, there is no line-remove control, the
// per-order header carries the order number, date and status pill, and the
// single action under the totals is "Reorder" instead of "Checkout securely".

const STATUS_STYLES = {
  delivered: "bg-[#E8EDE4] text-forest",
  shipped: "bg-gold/15 text-earth",
  processing: "bg-forest/10 text-forest/70",
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Line items resolved against products.js, plus the same promo maths the cart
// runs. Kept out of the component so an order with an unknown slug (e.g. a
// discontinued SKU) simply drops that row rather than crashing the page.
function resolveOrder(order) {
  const lines = order.items
    .map((item) => ({ product: PRODUCT_BY_SLUG[item.slug], qty: item.qty }))
    .filter((line) => line.product);
  const units = lines.reduce((sum, line) => sum + line.qty, 0);
  const original = units * DEMO_UNIT_PRICE;
  const savings = units >= PROMO_MIN_UNITS ? original * PROMO_RATE : 0;
  const subtotal = original - savings;
  return { lines, units, original, savings, subtotal };
}

/** Read-only quantity, styled to echo the cart's stepper field. */
function QtyValue({ qty }) {
  return (
    <span className="inline-flex h-12 min-w-[3rem] items-center justify-center rounded-[10px] border border-forest/15 bg-[#FFFDF9] px-4 font-sans text-[15px] font-medium text-forest">
      {qty}
    </span>
  );
}

export default function AccountOrders() {
  const { user, openAuthModal } = useAuth();
  const { add } = useCart();
  const navigate = useNavigate();
  const [reordering, setReordering] = useState(null);

  const orders = ordersNewestFirst();

  const handleReorder = (order) => {
    setReordering(order.id);
    order.items.forEach((item) => {
      const product = PRODUCT_BY_SLUG[item.slug];
      if (product) add(item.slug, item.qty, product.name);
    });
    navigate("/cart/");
  };

  return (
    <>
      <PageMeta title="My Orders · Steppe Gut" noindex />

      {/* The fixed nav samples this to pick its ink colour - without it the
          cream nav labels would sit invisible on the cream page. */}
      <section data-navtheme="light" className="bg-cream">
        <Container width="wide" className="pb-24 pt-[136px] lg:pt-[168px]">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h1 className="font-serif text-[clamp(2.4rem,4vw,3.4rem)] font-semibold leading-none tracking-[-0.04em] text-forest">
              My orders
            </h1>
            <Link
              to="/products/"
              className="font-sans text-[15px] font-semibold uppercase tracking-[0.1em] text-forest underline-offset-[6px] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              Continue shopping
            </Link>
          </div>

          {!user ? (
            <div className="mt-10 border-t border-forest/15 pt-10">
              <p className="max-w-[46ch] font-sans text-[1.25rem] leading-relaxed text-forest/75">
                You&rsquo;re signed out. Sign in to see your order history and
                drop any past order back into your cart in one step.
              </p>
              <button
                type="button"
                onClick={() => openAuthModal("signin")}
                className="mt-8 inline-flex h-[50px] items-center justify-center rounded-[10px] bg-forest px-7 font-sans text-[14px] font-semibold uppercase tracking-[0.08em] text-cream transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                Sign in
              </button>
            </div>
          ) : orders.length === 0 ? (
            <div className="mt-10 border-t border-forest/15 pt-10">
              <p className="max-w-[46ch] font-sans text-[1.25rem] leading-relaxed text-forest/75">
                No orders yet. When you place one it shows up here, ready to
                reorder in a single step.
              </p>
              <Link
                to="/products/"
                className="mt-8 inline-flex h-[50px] items-center justify-center rounded-[10px] bg-forest px-7 font-sans text-[14px] font-semibold uppercase tracking-[0.08em] text-cream transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                See the products
              </Link>
            </div>
          ) : (
            <ul>
              {orders.map((order, index) => {
                const { lines, units, savings, subtotal } = resolveOrder(order);
                return (
                  <li
                    key={order.id}
                    className={
                      index === 0
                        ? "mt-14"
                        : "mt-20 border-t border-forest/15 pt-16"
                    }
                  >
                    {/* Per-order header - the one thing the cart has no
                        equivalent of. Order number sits where the cart's page
                        title does; the status pill takes the "Continue
                        shopping" slot. */}
                    <div className="flex flex-wrap items-baseline justify-between gap-4">
                      <div>
                        <h2 className="font-serif text-[1.6rem] font-semibold leading-none tracking-[-0.03em] text-forest">
                          Order #{order.id.replace(/\D/g, "")}
                        </h2>
                        <p className="mt-2 font-sans text-[14px] text-forest/60">
                          Placed {formatDate(order.placedOn)} &middot; {units}{" "}
                          {units === 1 ? "item" : "items"}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 font-sans text-[12px] font-semibold uppercase tracking-[0.1em] ${
                          STATUS_STYLES[order.status] ?? STATUS_STYLES.processing
                        }`}
                      >
                        {statusLabel(order.status)}
                      </span>
                    </div>

                    {/* Column headings. Hidden below md, where each row stacks
                        and the labels would sit above nothing. */}
                    <div className="mt-8 hidden border-b border-forest/15 pb-5 md:grid md:grid-cols-[1fr_auto_140px] md:items-end md:gap-8">
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
                            <Link
                              to={`/products/${line.product.slug}/`}
                              className="h-32 w-32 shrink-0 rounded-[12px] border border-forest/15 bg-[#FFFDF9] p-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                            >
                              <Picture
                                avif={line.product.thumb.avif}
                                webp={line.product.thumb.webp}
                                alt={line.product.alt}
                                width={128}
                                height={128}
                                imgClassName="h-full w-full object-contain"
                              />
                            </Link>
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
                              beside it, so the quantity lines up under the
                              product name when the row stacks below md. */}
                          <div className="flex items-center gap-3 sm:pl-[148px] md:justify-center md:pl-0">
                            <QtyValue qty={line.qty} />
                          </div>

                          <p className="text-right font-sans text-[18px] font-medium text-forest">
                            {baht(DEMO_UNIT_PRICE * line.qty)}
                          </p>
                        </li>
                      ))}
                    </ul>

                    {/* Totals sit under the TOTAL column, right-aligned, as on
                        the cart. */}
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
                            Order total
                          </span>
                          <span className="font-sans text-[22px] font-semibold text-forest">
                            {baht(subtotal)} THB
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleReorder(order)}
                          disabled={reordering === order.id}
                          className="mt-8 flex h-[58px] w-full items-center justify-center gap-2 rounded-[10px] bg-forest font-sans text-[15px] font-semibold uppercase tracking-[0.1em] text-cream transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-50"
                        >
                          <RotateCcw
                            size={18}
                            strokeWidth={1.75}
                            aria-hidden="true"
                          />
                          {reordering === order.id
                            ? "Adding to cart…"
                            : "Reorder"}
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}
