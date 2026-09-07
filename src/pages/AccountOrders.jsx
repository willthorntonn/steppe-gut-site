import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RotateCcw } from "lucide-react";
import PageMeta from "../components/ui/PageMeta";
import Container from "../components/ui/Container";
import Picture from "../components/ui/Picture";
import { useAuth } from "../auth/AuthProvider";
import { useCart } from "../cart/CartProvider";
import { useOrders } from "../orders/OrdersProvider";
import { statusLabel } from "../orders/orderStore";
import { PRODUCT_BY_SLUG } from "../data/products";
import { baht } from "../checkout/demoPrices";

// My Orders. The history is fetched from the account API (orders/OrdersProvider
// -> server/routes/orders.js), so it is the account's orders rather than one
// browser's, and it is empty until that account has bought something.
//
// Deliberately built on the cart page's layout - same forest / cream
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

// Rows for one stored order.
//
// The money is read, never recomputed: `unitPrice` per line and the recorded
// totals are what the account was charged at the time, so a past order does
// not silently re-price itself when list prices move. products.js is only
// consulted for the things that are safe to look up live - the image, and the
// link to the product page. A slug that no longer exists (a discontinued SKU)
// still renders its row from the name recorded on the order, because dropping
// it would leave rows that no longer add up to the total beneath them.
function resolveOrder(order) {
  const lines = order.items.map((item) => {
    const product = PRODUCT_BY_SLUG[item.slug] ?? null;
    return {
      product,
      slug: item.slug,
      name: item.name ?? product?.name ?? "Item",
      qty: item.qty,
      unitPrice: item.unitPrice,
      total: item.unitPrice * item.qty,
    };
  });
  const units = lines.reduce((sum, line) => sum + line.qty, 0);
  return {
    lines,
    units,
    savings: order.totals?.savings ?? 0,
    subtotal: order.totals?.total ?? 0,
    promoLabel: order.promoLabel,
  };
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
  const { user, loading: sessionLoading, offline, openAuthModal } = useAuth();
  const { add } = useCart();
  const { orders, loading: ordersLoading, error: ordersError } = useOrders();
  const navigate = useNavigate();
  const [reordering, setReordering] = useState(null);

  // Reorder only puts back what is still buyable - a discontinued line shows
  // in the history but cannot go into a basket.
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

          {/* The session and the history both come from the server, so there
              is a moment on boot where neither the signed-out card nor the
              empty state is true yet. Waiting is the only honest thing to
              show in that gap. */}
          {sessionLoading || (user && ordersLoading) ? (
            <p className="mt-10 border-t border-forest/15 pt-10 font-sans text-[1.25rem] text-forest/60">
              Loading your orders
            </p>
          ) : offline ? (
            /* Not the same thing as being signed out: the session could not
               be checked at all, so telling someone to sign in would send
               them to a form that cannot work either. */
            <div className="mt-10 border-t border-forest/15 pt-10">
              <p className="max-w-[46ch] font-sans text-[1.25rem] leading-relaxed text-forest/75">
                Your orders can&rsquo;t be reached right now. Check your
                connection and reload the page
              </p>
            </div>
          ) : !user ? (
            <div className="mt-10 border-t border-forest/15 pt-10">
              <p className="max-w-[46ch] font-sans text-[1.25rem] leading-relaxed text-forest/75">
                You&rsquo;re signed out. Sign in to see your order history and
                drop any past order back into your cart in one step
              </p>
              <button
                type="button"
                onClick={() => openAuthModal("signin")}
                className="mt-8 inline-flex h-[50px] items-center justify-center rounded-[10px] bg-forest px-7 font-sans text-[14px] font-semibold uppercase tracking-[0.08em] text-cream transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                Sign in
              </button>
            </div>
          ) : ordersError ? (
            <div className="mt-10 border-t border-forest/15 pt-10">
              <p className="max-w-[46ch] font-sans text-[1.25rem] leading-relaxed text-forest/75">
                {ordersError}
              </p>
            </div>
          ) : orders.length === 0 ? (
            <div className="mt-10 border-t border-forest/15 pt-10">
              <p className="max-w-[46ch] font-sans text-[1.25rem] leading-relaxed text-forest/75">
                No orders yet. When you place one it shows up here, ready to
                reorder in a single step
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
                const { lines, units, savings, subtotal, promoLabel } =
                  resolveOrder(order);
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
                          key={line.slug}
                          className="grid grid-cols-[1fr_auto] items-start gap-5 border-t border-forest/15 py-12 first:border-t md:grid-cols-[1fr_auto_140px] md:items-center md:gap-8 md:first:border-t-0"
                        >
                          <div className="col-span-2 flex items-start gap-5 md:col-span-1">
                            {/* A line whose product is gone keeps the row and
                                the empty frame, so the column rhythm holds. */}
                            {line.product ? (
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
                            ) : (
                              <div
                                className="h-32 w-32 shrink-0 rounded-[12px] border border-forest/15 bg-[#FFFDF9]"
                                aria-hidden="true"
                              />
                            )}
                            <div className="min-w-0">
                              {line.product ? (
                                <Link
                                  to={`/products/${line.product.slug}/`}
                                  className="font-sans text-[16px] font-semibold leading-snug text-forest underline-offset-[4px] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                                >
                                  {line.name}
                                </Link>
                              ) : (
                                <p className="font-sans text-[16px] font-semibold leading-snug text-forest">
                                  {line.name}
                                </p>
                              )}
                              <p className="mt-1.5 font-sans text-[15px] text-forest">
                                {baht(line.unitPrice)}
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
                            {baht(line.total)}
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
                              {promoLabel ?? "Discount applied"}
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
