// List prices in whole baht, one per product. Plain JavaScript with no
// imports on purpose: src/data/products.js reads it for every page, and
// server/catalog.js reads it to price an order, and Node cannot load
// products.js (it imports image files). One table means the product page,
// the cart, the checkout and the amount Stripe charges cannot disagree.
export const PRICE_BY_SLUG = {
  "sachet-bag": 2490, // 250 g pouch
  "sachet-box": 1790, // sachet pack
  "pill-bottle": 990, // 90 capsules
};
