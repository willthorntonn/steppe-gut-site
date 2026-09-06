// Stand-in prices for the cart and checkout.
//
// products.js still ships `price: null` on all three SKUs on purpose (see the
// header comment there) - pricing was never locked. The cart page and the
// checkout both need real figures to render a believable order, so the two
// numbers live here, once, instead of being typed into each page.
//
// These are the first thing to delete once real prices exist in products.js.
export const DEMO_UNIT_PRICE = 1956;
export const DEMO_ADDON_PRICE = 498;

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
