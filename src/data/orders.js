// Demo order history for the signed-in account. Frontend only - there is no
// order backend, so this is a static list the My Orders page reads. Line
// items reference real slugs from data/products.js so the page can pull the
// name and image for each row (the same reason the cart only stores
// `{ slug, qty }`).
//
// Not the price, though: products.js ships `price: null` on every SKU, so My
// Orders values these rows with DEMO_UNIT_PRICE from checkout/demoPrices. See
// the note on resolveOrder in pages/AccountOrders - an order total ought to
// be a recorded fact rather than today's list price, and once real prices
// exist each order here needs the figures it was actually charged.
//
// These orders are the first thing to delete once a real order backend
// exists, exactly as demoPrices.js is for pricing. Nothing else reads them.
//
// `status` is one of: "delivered" | "shipped" | "processing". The My Orders
// page maps each to a coloured pill and every order exposes a Reorder action
// that drops its line items back into the cart.
export const ORDERS = [
  {
    id: "SG-24816",
    placedOn: "2026-08-14",
    status: "delivered",
    items: [
      { slug: "sachet-box", qty: 1 },
      { slug: "pill-bottle", qty: 1 },
    ],
  },
  {
    id: "SG-24122",
    placedOn: "2026-07-02",
    status: "delivered",
    items: [{ slug: "sachet-bag", qty: 2 }],
  },
  {
    id: "SG-23404",
    placedOn: "2026-05-19",
    status: "delivered",
    items: [{ slug: "sachet-box", qty: 1 }],
  },
  {
    id: "SG-25190",
    placedOn: "2026-08-28",
    status: "shipped",
    items: [
      { slug: "pill-bottle", qty: 1 },
      { slug: "sachet-bag", qty: 1 },
    ],
  },
];

const STATUS_LABELS = {
  delivered: "Delivered",
  shipped: "Shipped",
  processing: "Processing",
};

export function statusLabel(status) {
  return STATUS_LABELS[status] ?? "Processing";
}

// Newest first, matching how an order history normally reads.
export function ordersNewestFirst() {
  return [...ORDERS].sort(
    (a, b) => new Date(b.placedOn).getTime() - new Date(a.placedOn).getTime()
  );
}
