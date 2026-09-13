// Stand-in prices for the cart and checkout.
//
// products.js still ships `price: null` on all three SKUs on purpose (see the
// header comment there) - pricing was never locked. The cart page and the
// checkout both need real figures to render a believable order, so the two
// numbers live here, once, instead of being typed into each page.
//
// These are the first thing to delete once real prices exist in products.js.
// Note before you do: the account API imports this file (server/catalog.js) to
// price an order server-side, so the figures the checkout shows and the
// figures an order is charged cannot drift apart. Repoint that import at the
// same time.
export const DEMO_UNIT_PRICE = 1956;
export const DEMO_ADDON_PRICE = 498;

/** Stand-in Express Priority Shipping surcharge, shown once delivery is complete. */
export const DEMO_SHIPPING_EXPRESS = 590;

/** The promotion the checkout applies automatically at two or more units. */
export const PROMO_MIN_UNITS = 2;
export const PROMO_RATE = 0.2;

/** `฿3,912.00` - two decimals, matching the checkout. */
export function baht(amount) {
  return `฿${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
