// Orders. Held by the service, keyed by account id, so a history follows the
// person to any device that can sign in rather than living in one browser.
//
// What the browser sends is what it is allowed to decide: which products, how
// many, and where to deliver. Price, promotion, order number, date and status
// are all decided here.

import { HttpError } from "../lib/http.js";
import { CURRENCY, priceBasket } from "../catalog.js";
import { publicUser, requireUser } from "../lib/users.js";
import { normaliseAddress, withOneDefault } from "../lib/validate.js";
import { randomUUID } from "node:crypto";

// Where order numbers start, so the first order of a fresh install reads like
// a real one rather than #1. The counter lives in the store, not in the row
// count, so a deleted order can never hand its number to the next one.
export const FIRST_ORDER_NUMBER = 25200;

function nextOrderId(db) {
  const seq = Math.max(db.data.meta.orderSeq ?? 0, FIRST_ORDER_NUMBER - 1) + 1;
  db.data.meta.orderSeq = seq;
  return `SG-${seq}`;
}

/** Newest first, which is how an order history normally reads. */
function historyFor(db, userId) {
  return [...(db.data.orders[userId] ?? [])].sort(
    (a, b) => new Date(b.placedOn).getTime() - new Date(a.placedOn).getTime()
  );
}

export async function list(ctx) {
  const user = requireUser(ctx);
  return { body: { orders: historyFor(ctx.db, user.id) } };
}

export async function create(ctx) {
  const user = requireUser(ctx);
  const priced = priceBasket(ctx.body.items);

  // Where it goes. Either one of the account's saved addresses by id, or an
  // address typed into the checkout - which can be saved to the account in
  // the same request, which is how the checkout fills the address book.
  let shippingAddress = null;
  if (ctx.body.shippingAddressId) {
    const saved = (user.addresses ?? []).find(
      (address) => address.id === ctx.body.shippingAddressId
    );
    if (!saved) throw new HttpError(400, "That address is not on your account");
    shippingAddress = { ...saved };
  } else if (ctx.body.shippingAddress) {
    shippingAddress = normaliseAddress(ctx.body.shippingAddress);
    if (ctx.body.saveAddress) {
      const stored = {
        ...shippingAddress,
        id: `addr-${randomUUID().slice(0, 8)}`,
        isDefault: false,
      };
      const addresses = user.addresses ?? [];
      user.addresses = withOneDefault(
        [...addresses, stored],
        addresses.length === 0 ? stored.id : null
      );
      shippingAddress = { ...stored };
    }
  }

  const order = {
    id: nextOrderId(ctx.db),
    placedOn: new Date().toISOString(),
    // Every order starts here. Nothing moves one on to shipped or delivered
    // yet, because nothing ships it - fulfilment is its own piece of work.
    status: "processing",
    currency: CURRENCY,
    // The price charged, recorded on the line. A past order does not re-price
    // itself when list prices move.
    items: priced.lines,
    totals: priced.totals,
    promoLabel: priced.promoLabel,
    shippingAddress,
  };

  ctx.db.data.orders[user.id] = [...(ctx.db.data.orders[user.id] ?? []), order];
  ctx.db.save();

  return { status: 201, body: { order, user: publicUser(user) } };
}

export async function get(ctx) {
  const user = requireUser(ctx);
  const order = (ctx.db.data.orders[user.id] ?? []).find(
    (row) => row.id === ctx.params.id
  );
  if (!order) throw new HttpError(404, "No order with that number");
  return { body: { order } };
}
