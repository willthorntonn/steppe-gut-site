// Creating (or refreshing) the Stripe PaymentIntent for a checkout.
//
// The browser posts what it is allowed to decide: which products, how many,
// where to deliver, and a contact email. It never posts a price. This route
// prices the basket with server/catalog.js - the same function the recorded
// order is priced with - and asks Stripe to collect exactly that amount.
//
// Sign-in is optional. A guest checks out with an email only; a signed-in
// visitor also gets the order attached to their account (the id rides on the
// intent metadata and the order row is written against it once payment
// succeeds, in src/lib/checkout/recordOrder.js).
//
// The intent id is handed back so the page can refresh the same intent when
// the basket or address changes, rather than leaving a trail of abandoned
// intents behind every keystroke.

import { NextResponse } from "next/server";
import { supabaseServer } from "../../../../lib/supabase/server";
import { stripe } from "../../../../lib/stripe/server";
import { priceBasket } from "../../../../../server/catalog.js";
import { HttpError } from "../../../../../server/lib/http.js";
import { normaliseAddress } from "../../../../../server/lib/validate.js";
import { encodeItems } from "../../../../lib/checkout/recordOrder";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// THB is a two-decimal currency in Stripe: amounts are in satang.
const MINOR_UNITS = 100;
// Stripe metadata caps each value at 500 characters. A Thai address well
// under that fits; anything longer falls back to Stripe's native `shipping`.
const META_VALUE_MAX = 480;

function refusal(error) {
  if (error instanceof HttpError) {
    return NextResponse.json(
      { error: error.message, ...(error.details ?? {}) },
      { status: error.status }
    );
  }
  console.error("[api/checkout/intent]", error);
  return NextResponse.json(
    { error: "Payment could not be set up, try again" },
    { status: 500 }
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Stripe's shipping shape from our address shape. */
function stripeShipping(address) {
  if (!address) return undefined;
  return {
    name: address.name || "Customer",
    phone: address.phone || undefined,
    address: {
      line1: address.line1 || undefined,
      line2: address.line2 || undefined,
      city: address.city || undefined,
      postal_code: address.postalCode || undefined,
      country: "TH",
    },
  };
}

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      throw new HttpError(400, "That request could not be read");
    }

    const email = String(body.email ?? "").trim().toLowerCase();
    if (!EMAIL_RE.test(email)) {
      throw new HttpError(400, "Enter an email for your receipt", { field: "email" });
    }

    // Priced here, never read from the request.
    const priced = priceBasket(body.items);
    const amount = Math.round(priced.totals.total * MINOR_UNITS);
    if (amount < 10 * MINOR_UNITS) {
      throw new HttpError(400, "That basket is below the minimum order");
    }

    const supabase = await supabaseServer();
    const { data: auth } = await supabase.auth.getUser();
    const uid = auth?.user?.id ?? "";

    // Where it goes: a saved address id (kept as a reference, resolved and
    // ownership-checked when the order is recorded) or an address typed into
    // the form (sanitised now, stored on the intent).
    let shipId = "";
    let typedAddress = null;
    if (body.shippingAddressId && uid) {
      shipId = String(body.shippingAddressId);
    } else if (body.shippingAddress) {
      try {
        typedAddress = normaliseAddress(body.shippingAddress);
      } catch {
        // A checkout that charges via Stripe still collects the address in the
        // Stripe form; an incomplete typed address here is not fatal.
        typedAddress = null;
      }
    }

    const metadata = {
      items: encodeItems(priced.lines.map((l) => ({ slug: l.slug, qty: l.qty }))),
      uid,
      email,
      ship_id: shipId,
      save_addr: uid && body.saveAddress ? "1" : "0",
    };
    if (typedAddress) {
      const json = JSON.stringify(typedAddress);
      if (json.length <= META_VALUE_MAX) metadata.ship = json;
    }

    const params = {
      amount,
      currency: "thb",
      // Card carries Apple Pay / Google Pay / Link automatically once the
      // domain is verified with Stripe. PromptPay is listed explicitly.
      // TrueMoney is not a Stripe payment method and is never offered here.
      payment_method_types: ["card", "promptpay"],
      metadata,
      receipt_email: email,
    };
    const shipping = stripeShipping(typedAddress);
    if (shipping) params.shipping = shipping;

    const client = stripe();
    let intent;

    // Refresh the existing intent when the page already made one this session,
    // as long as it is still awaiting payment.
    if (body.paymentIntentId) {
      try {
        const current = await client.paymentIntents.retrieve(body.paymentIntentId);
        const refreshable = [
          "requires_payment_method",
          "requires_confirmation",
          "requires_action",
        ];
        if (refreshable.includes(current.status)) {
          intent = await client.paymentIntents.update(current.id, {
            amount,
            metadata,
            receipt_email: email,
            ...(shipping ? { shipping } : {}),
          });
        }
      } catch {
        // Unknown or unusable id: fall through and make a fresh one.
      }
    }

    if (!intent) intent = await client.paymentIntents.create(params);

    return NextResponse.json({
      clientSecret: intent.client_secret,
      paymentIntentId: intent.id,
      amount,
      currency: "thb",
    });
  } catch (error) {
    return refusal(error);
  }
}
