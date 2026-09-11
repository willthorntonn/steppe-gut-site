// Turning a paid Stripe PaymentIntent into an order row.
//
// This is the one place an order is created now. It runs from two callers -
// the Stripe webhook (src/app/api/stripe/webhook/route.js) and the confirm
// endpoint the browser polls (src/app/api/checkout/confirm/route.js) - so that
// a closed tab or a missed webhook still leaves exactly one recorded order.
//
// What it does NOT trust: the amount. The basket (slugs and quantities) rides
// on the PaymentIntent metadata, and the price is recomputed here with
// server/catalog.js, exactly as it was when the intent was created. The row
// records the figures the card was charged, so a past order does not
// re-price itself when list prices move.
//
// Idempotency is the `orders.stripe_payment_intent` unique column: a second
// call for the same intent hits a 23505 and returns the row that already
// exists instead of writing a duplicate.

import { supabaseAdmin } from "../supabase/server";
import { CURRENCY, priceBasket } from "../../../server/catalog.js";

/** An `orders` row in the shape the app speaks. Mirrors mapOrder in
 * src/api/client.js, kept local so this server module pulls in no browser
 * Supabase client. */
function mapOrder(row) {
  return {
    id: row.id,
    placedOn: row.placed_on,
    status: row.status,
    currency: row.currency,
    items: row.items,
    totals: row.totals,
    promoLabel: row.promo_label ?? null,
    shippingAddress: row.shipping_address ?? null,
  };
}

/** `"sachet-box:2|pill-bottle:1"` -> `[{ slug, qty }]`. */
export function parseItems(encoded) {
  if (typeof encoded !== "string" || !encoded) return [];
  return encoded
    .split("|")
    .map((pair) => {
      const [slug, qty] = pair.split(":");
      return { slug, qty: Number(qty) };
    })
    .filter((item) => item.slug && Number.isFinite(item.qty));
}

/** `[{ slug, qty }]` -> `"sachet-box:2|pill-bottle:1"`, for intent metadata. */
export function encodeItems(items) {
  return items.map((item) => `${item.slug}:${item.qty}`).join("|");
}

function publicAddress(row) {
  return {
    id: row.id,
    label: row.label,
    name: row.name,
    line1: row.line1,
    line2: row.line2 ?? "",
    city: row.city,
    postalCode: row.postal_code ?? "",
    country: row.country ?? "",
    phone: row.phone ?? "",
    isDefault: Boolean(row.is_default),
  };
}

/**
 * Reads the shipping address off the intent metadata. Either a saved address
 * id (looked up and confirmed to belong to the paying account) or a typed
 * address stored inline as JSON. Returns a plain object copied onto the order,
 * never a live reference - deleting the saved address later must not rewrite
 * where this order went.
 */
async function resolveShipping(admin, metadata) {
  if (metadata.ship_id && metadata.uid) {
    const { data } = await admin
      .from("addresses")
      .select("*")
      .eq("id", metadata.ship_id)
      .eq("user_id", metadata.uid)
      .maybeSingle();
    if (data) return publicAddress(data);
  }
  if (metadata.ship) {
    try {
      const typed = JSON.parse(metadata.ship);
      if (typed && typeof typed === "object") return typed;
    } catch {
      // Fall through to null - a missing address is not a reason to lose a
      // paid order.
    }
  }
  return null;
}

/**
 * Records the order for a succeeded PaymentIntent, or returns the one already
 * recorded. `intent` is a Stripe.PaymentIntent with our metadata on it.
 *
 * Returns `{ order }` in the same shape the app speaks (see mapOrder), or
 * throws if the intent is not actually paid or its basket is unreadable.
 */
export async function recordOrderFromIntent(intent) {
  if (!intent || intent.status !== "succeeded") {
    throw new Error(`PaymentIntent ${intent?.id ?? "?"} is not paid`);
  }

  const admin = supabaseAdmin();
  const metadata = intent.metadata ?? {};

  // Already recorded? Return it and do nothing else. This is the common path
  // once the webhook and the browser poll race each other.
  const existing = await admin
    .from("orders")
    .select("*")
    .eq("stripe_payment_intent", intent.id)
    .maybeSingle();
  if (existing.data) return { order: mapOrder(existing.data) };

  const priced = priceBasket(parseItems(metadata.items));

  // The intent was created for this exact figure. If they disagree, something
  // re-priced between then and now - record what was actually charged (the
  // intent amount) but keep the line breakdown from the catalog.
  const chargedTotal = intent.amount_received ?? intent.amount;
  const totals = {
    ...priced.totals,
    total:
      Math.round(priced.totals.total * 100) === chargedTotal
        ? priced.totals.total
        : Math.round(chargedTotal) / 100,
  };

  const shippingAddress = await resolveShipping(admin, metadata);

  const insert = await admin
    .from("orders")
    .insert({
      user_id: metadata.uid || null,
      email: metadata.email || null,
      stripe_payment_intent: intent.id,
      status: "processing",
      currency: (intent.currency ?? CURRENCY).toUpperCase(),
      items: priced.lines,
      totals,
      promo_label: priced.promoLabel,
      shipping_address: shippingAddress,
    })
    .select()
    .single();

  if (insert.error) {
    // 23505 = someone (the other caller) inserted between our check and now.
    if (insert.error.code === "23505") {
      const { data } = await admin
        .from("orders")
        .select("*")
        .eq("stripe_payment_intent", intent.id)
        .single();
      return { order: mapOrder(data) };
    }
    throw insert.error;
  }

  return { order: mapOrder(insert.data) };
}
