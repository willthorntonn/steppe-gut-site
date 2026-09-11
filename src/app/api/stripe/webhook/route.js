// Stripe's server-to-server notification that a payment settled.
//
// This is the reliable path for recording an order: it fires even if the
// shopper closed the tab on the PromptPay QR screen, or the browser never came
// back from the redirect. The confirm endpoint the page polls
// (src/app/api/checkout/confirm/route.js) is the fast path for the common case
// where the shopper is still watching - both call the same recorder, which is
// idempotent on the PaymentIntent id, so whichever lands first wins and the
// other is a no-op.
//
// The signature check is the whole security model here: without a valid
// `stripe-signature` for STRIPE_WEBHOOK_SECRET, the body is ignored. That is
// why the raw text is read rather than request.json() - the bytes have to be
// exactly what Stripe signed.

import { NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe/server";
import { recordOrderFromIntent } from "../../../../lib/checkout/recordOrder";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[api/stripe/webhook] STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  const raw = await request.text();

  let event;
  try {
    event = await stripe().webhooks.constructEventAsync(raw, signature, secret);
  } catch (error) {
    // A bad or missing signature is the only expected failure. Say so plainly
    // and stop - Stripe will not retry a 400.
    console.error("[api/stripe/webhook] signature check failed:", error.message);
    return NextResponse.json({ error: "Bad signature" }, { status: 400 });
  }

  try {
    if (event.type === "payment_intent.succeeded") {
      await recordOrderFromIntent(event.data.object);
    }
    // payment_intent.payment_failed and the rest are acknowledged and ignored:
    // nothing here acts on them yet.
  } catch (error) {
    // Returning 500 asks Stripe to retry the delivery, which is what we want
    // if the database was briefly unreachable.
    console.error("[api/stripe/webhook] handling", event.type, "failed:", error);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
