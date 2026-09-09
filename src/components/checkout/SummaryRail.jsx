"use client";

import { useState } from "react";
import { ChevronDown, ShoppingBag, Tag } from "lucide-react";
import SummaryLine from "./SummaryLine";
import CrossSellCard from "./CrossSellCard";
import DiscountField from "./DiscountField";
import { useCart } from "../../cart/CartProvider";
import { PRODUCTS } from "../../data/products";
import {
  applyDiscounts,
  formatTHB,
  isPriced,
  lineTotals,
  lookupDiscount,
  nearMissDiscounts,
  subtotalOf,
  unitCount,
} from "../../checkout/pricing";
import { H4 } from "../../styles/type";

// The right-hand column: basket lines, cross-sell, discount entry, cost
// summary, savings.
//
// Discount codes live here rather than in the cart, because they are a
// property of this order attempt and not of the basket - reloading the page
// clears them, which is the honest behaviour when nothing is being persisted
// server-side.
//
// Below lg the whole rail collapses into a single tappable row showing the
// total, per cart-and-checkout.md §3. A full summary stacked above a mobile
// form pushes the first field below the fold.
export default function SummaryRail() {
  const { items, setQty, add } = useCart();
  const [codes, setCodes] = useState([]);
  const [open, setOpen] = useState(false);

  const lines = lineTotals(items);
  const priced = isPriced(items);
  const subtotal = subtotalOf(items);
  const { active, savings, delivery, total, freeDelivery } = applyDiscounts(
    subtotal,
    codes,
    items
  );

  const units = unitCount(items);
  const nudges = nearMissDiscounts(items);
  // The nudge hangs off the first line, the way the reference does it, rather
  // than becoming a fourth banner competing with the payment notice.
  const lineNudge = nudges.length > 0 ? nudges[0].nudge : null;
  const lineDiscount = active.length > 0 ? active[0].label : null;

  function applyCode(entered) {
    const code = entered.trim().toUpperCase();
    if (codes.includes(code)) return "That code is already applied";
    const discount = lookupDiscount(code);
    if (!discount) return "That code is not recognised";
    if (units < discount.minItems) {
      return `${code} needs at least ${discount.minItems} items in your basket.`;
    }
    setCodes((current) => [...current, code]);
    return null;
  }

  const suggestions = PRODUCTS.filter(
    (product) => !items.some((item) => item.slug === product.slug)
  );

  const rowCls = "flex items-baseline justify-between gap-4 font-sans text-[15px]";

  return (
    <section aria-labelledby="summary-heading">
      {/* Mobile disclosure. Hidden at lg, where the rail is always open. */}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls="summary-body"
        className="-m-1 flex w-[calc(100%+0.5rem)] items-center justify-between gap-4 rounded-xl p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold lg:hidden"
      >
        <span className="flex items-center gap-2 font-sans text-[15px] font-semibold text-forest">
          <ShoppingBag size={17} strokeWidth={1.75} aria-hidden="true" />
          Order summary
          <ChevronDown
            size={16}
            strokeWidth={2}
            aria-hidden="true"
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </span>
        <span className="font-sans text-[15px] font-semibold text-forest">
          {total == null ? `${units} item${units === 1 ? "" : "s"}` : formatTHB(total)}
        </span>
      </button>

      <div
        id="summary-body"
        className={`${open ? "block" : "hidden"} mt-4 lg:mt-0 lg:block`}
      >
        <h2
          id="summary-heading"
          className="hidden font-serif font-normal text-forest lg:block"
          style={H4}
        >
          Order summary
        </h2>

        <ul className="mt-2 divide-y divide-forest/10 border-b border-forest/10 lg:mt-4">
          {lines.map((line, index) => (
            <SummaryLine
              key={line.product.slug}
              line={line}
              discountLabel={index === 0 ? lineDiscount : null}
              nudge={index === 0 ? lineNudge : null}
              onQty={(qty) => setQty(line.product.slug, qty, line.product.name)}
            />
          ))}
        </ul>

        <div className="mt-5">
          <CrossSellCard
            products={suggestions}
            onAdd={(product) => add(product.slug, 1, product.name)}
          />
        </div>

        <div className="mt-5">
          <DiscountField
            codes={codes}
            inactiveCodes={codes.filter(
              (code) => !active.some((discount) => discount.code === code)
            )}
            onApply={applyCode}
            onRemove={(code) =>
              setCodes((current) => current.filter((held) => held !== code))
            }
            disabled={!priced}
          />
        </div>

        <dl className="mt-6 space-y-3 border-t border-forest/12 pt-6">
          <div className={rowCls}>
            <dt className="text-forest/70">Subtotal</dt>
            <dd className="font-semibold text-forest">
              {subtotal == null ? "Not published yet" : formatTHB(subtotal)}
            </dd>
          </div>

          <div className={rowCls}>
            <dt className="text-forest/70">Delivery</dt>
            <dd className="font-semibold text-forest">
              {delivery == null
                ? "-"
                : freeDelivery
                  ? "Free"
                  : formatTHB(delivery)}
            </dd>
          </div>

          <div
            className={`${rowCls} border-t border-forest/12 pt-4 text-[17px]`}
          >
            <dt className="font-semibold text-forest">Total</dt>
            <dd className="font-semibold text-forest">
              {total == null ? "Not published yet" : formatTHB(total)}
            </dd>
          </div>
        </dl>

        {savings != null && savings > 0 && (
          <p className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#E8EDE4] px-3 py-2 font-sans text-[13px] font-semibold uppercase tracking-[0.08em] text-forest">
            <Tag size={13} strokeWidth={2} aria-hidden="true" />
            Total savings {formatTHB(savings)}
          </p>
        )}

        {!priced && items.length > 0 && (
          <p className="mt-4 font-sans text-[13px] leading-relaxed text-forest/60">
            We have not published prices yet. You can keep a basket, but nothing
            can be totalled or paid for until they are set.
          </p>
        )}
      </div>
    </section>
  );
}
