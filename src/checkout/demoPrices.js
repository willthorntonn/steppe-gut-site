// Shared checkout figures: the shipping surcharge, the launch promotion and
// the ฿ formatter. Product prices are not here - they live in
// src/data/prices.js. The account API imports this file (server/catalog.js)
// to price an order server-side, so it stays plain JavaScript with no imports.

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
