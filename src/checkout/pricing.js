// Every money value on the checkout comes through this file. Nothing else
// multiplies a price, formats a ฿ amount or decides what a discount is worth.
//
// ─────────────────────────────────────────────────────────────────────────
// THE NULL RULE.
// data/products.js ships with `price: null` on all three SKUs, deliberately -
// products-collection.md §2 forbids placeholder prices. So every function here
// returns `null` the moment any line in the basket is unpriced, rather than
// coercing to 0. A ฿0 subtotal on a basket with items in it reads as a bug,
// and "฿-" is the placeholder the spec rules out. Callers branch on null and
// render the honest "not published yet" state instead.
//
// Setting a real number in products.js turns all of this on with no change
// here.
// ─────────────────────────────────────────────────────────────────────────

import { PRODUCT_BY_SLUG } from "../data/products";

/**
 * Codes the checkout accepts. Local only - there is no backend to validate
 * against, so this is the whole list and it is not a secret.
 *
 * `minItems` gates a code on basket size, which is what drives the
 * "add one more to qualify" nudge on the line item.
 */
export const DISCOUNTS = {
  STEPPE10: {
    code: "STEPPE10",
    label: "Launch offer, 10% off",
    type: "percent",
    value: 10,
    minItems: 1,
  },
  TWOPACK20: {
    code: "TWOPACK20",
    label: "20% off two or more",
    type: "percent",
    value: 20,
    minItems: 2,
    nudge: "Add one more pack to qualify for 20% off",
  },
  FREEPOST: {
    code: "FREEPOST",
    label: "Free delivery",
    type: "delivery",
    value: 0,
    minItems: 1,
  },
};

/** Flat delivery across Thailand. Waived by a `delivery` type discount. */
export const DELIVERY_FEE = 60;

/** `฿3,128` - no decimals, because THB prices here are whole baht. */
export function formatTHB(amount) {
  return `฿${Math.round(amount).toLocaleString("en-TH")}`;
}

/** True only when every line in the basket has a real price. */
export function isPriced(items) {
  return (
    items.length > 0 &&
    items.every((item) => PRODUCT_BY_SLUG[item.slug]?.price != null)
  );
}

/**
 * Resolves `{ slug, qty }` cart state into renderable lines. Unknown slugs are
 * dropped - a basket in localStorage can outlive a product.
 *
 * `unit` and `total` are null when the product has no price.
 */
export function lineTotals(items) {
  return items
    .map((item) => {
      const product = PRODUCT_BY_SLUG[item.slug];
      if (!product) return null;
      return {
        product,
        qty: item.qty,
        unit: product.price,
        total: product.price == null ? null : product.price * item.qty,
      };
    })
    .filter(Boolean);
}

/** Sum of the basket before any discount, or null if anything is unpriced. */
export function subtotalOf(items) {
  if (!isPriced(items)) return null;
  return lineTotals(items).reduce((sum, line) => sum + line.total, 0);
}

/** Total number of units in the basket - what `minItems` is measured against. */
export function unitCount(items) {
  return items.reduce((sum, item) => sum + item.qty, 0);
}

/**
 * A code is only valid if it exists and the basket meets its `minItems`.
 * Returns the discount object or null, so callers can tell "wrong code" from
 * "right code, not enough items" by checking DISCOUNTS themselves.
 */
export function lookupDiscount(code) {
  return DISCOUNTS[String(code).trim().toUpperCase()] ?? null;
}

/**
 * Applies every held code to a subtotal.
 *
 * Percent and fixed discounts stack additively against the subtotal, never
 * compounding, and the result is floored at zero - a stack of codes can make
 * an order free but never negative.
 *
 * Returns nulls throughout when the subtotal is null.
 */
export function applyDiscounts(subtotal, codes, items) {
  const units = unitCount(items);
  const active = codes
    .map(lookupDiscount)
    .filter((discount) => discount && units >= discount.minItems);

  const freeDelivery = active.some((discount) => discount.type === "delivery");
  const delivery = freeDelivery ? 0 : DELIVERY_FEE;

  if (subtotal == null) {
    return { active, savings: null, delivery: null, total: null, freeDelivery };
  }

  const savings = active.reduce((sum, discount) => {
    if (discount.type === "percent") return sum + (subtotal * discount.value) / 100;
    if (discount.type === "fixed") return sum + discount.value;
    return sum;
  }, 0);

  const capped = Math.min(savings, subtotal);
  const deliverySavings = freeDelivery ? DELIVERY_FEE : 0;

  return {
    active,
    savings: capped + deliverySavings,
    delivery,
    total: subtotal - capped + delivery,
    freeDelivery,
  };
}

/**
 * Codes the basket is one or more units short of, so the summary can nudge
 * ("add one more pack to qualify") the way the reference checkout does.
 */
export function nearMissDiscounts(items) {
  const units = unitCount(items);
  return Object.values(DISCOUNTS).filter(
    (discount) => discount.nudge && units > 0 && units < discount.minItems
  );
}
