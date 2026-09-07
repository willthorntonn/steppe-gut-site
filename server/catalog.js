// What the server knows about the three products, and what an order costs.
//
// Pricing is computed here, never accepted from the browser. That is the
// point of moving orders onto a server: a posted basket says which slugs and
// how many, and the service decides what that is worth. A client that asks to
// pay 1 THB is priced at the same rate as everyone else.
//
// The figures come from src/checkout/demoPrices.js so the cart, the checkout
// summary and the recorded order cannot drift apart. That module is plain
// JavaScript with no imports, which is why the server can read it directly.
// When real prices land in src/data/products.js this import is the one line
// to repoint - see the header comment in demoPrices.js.
import {
  DEMO_UNIT_PRICE,
  PROMO_MIN_UNITS,
  PROMO_RATE,
} from "../src/checkout/demoPrices.js";
import { HttpError } from "./lib/http.js";

// Names, not images: src/data/products.js imports its photography, so a
// bundler is needed to read it and Node is not one. Slugs and names are the
// only fields an order line needs, and they are checked against this list so
// an unknown slug cannot be ordered.
export const CATALOG = {
  "sachet-box": { name: "Steppe Gut Sachet Box", unitPrice: DEMO_UNIT_PRICE },
  "pill-bottle": { name: "Steppe Gut Pill Bottle", unitPrice: DEMO_UNIT_PRICE },
  "sachet-bag": { name: "Steppe Gut Sachet Bag", unitPrice: DEMO_UNIT_PRICE },
};

export const CURRENCY = "THB";

/** The launch promotion, applied automatically rather than by code. The
 * wording is the checkout's own savings line, word for word. */
export const PROMO_LABEL = "Launch offer, 20% off two or more";

const MAX_QTY_PER_LINE = 99;

/** Baht to the satang. Kept off floating-point drift before it is stored. */
function money(amount) {
  return Math.round(amount * 100) / 100;
}

/**
 * Turns a posted basket into priced lines and totals.
 *
 * `items` is `[{ slug, qty }]`. Anything else is refused - the price is not
 * read from the request, and neither is the product name.
 */
export function priceBasket(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new HttpError(400, "Your basket is empty", { field: "items" });
  }

  const merged = new Map();
  for (const item of items) {
    const slug = typeof item?.slug === "string" ? item.slug : "";
    const product = CATALOG[slug];
    if (!product) {
      throw new HttpError(400, "That product is not available", { field: "items" });
    }
    const qty = Number(item?.qty);
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY_PER_LINE) {
      throw new HttpError(400, "Choose a quantity between 1 and 99", { field: "items" });
    }
    // A basket that lists the same slug twice is one line, not two.
    merged.set(slug, (merged.get(slug) ?? 0) + qty);
  }

  const lines = [...merged].map(([slug, qty]) => ({
    slug,
    name: CATALOG[slug].name,
    unitPrice: CATALOG[slug].unitPrice,
    qty,
  }));

  const units = lines.reduce((sum, line) => sum + line.qty, 0);
  const original = lines.reduce((sum, line) => sum + line.unitPrice * line.qty, 0);
  const savings = money(units >= PROMO_MIN_UNITS ? original * PROMO_RATE : 0);

  return {
    lines,
    totals: { original: money(original), savings, total: money(original - savings) },
    promoLabel: savings > 0 ? PROMO_LABEL : null,
  };
}
