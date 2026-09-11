// The fast path for turning a just-paid checkout into a recorded order.
//
// The confirmation page calls this with the PaymentIntent id and client
// secret that Stripe put on the return URL (or that the inline card flow held
// on to). It retrieves the intent straight from Stripe - the source of truth
// for whether money moved - and, if it settled, records the order via the same
// idempotent recorder the webhook uses. The page then has an order number to
// show without waiting on the webhook round-trip.
//
// The client secret is required and checked against the intent: a PaymentIntent
// id is not secret, the secret is, so this cannot be poked with a guessed id.

import { NextResponse } from "next/server";
import { stripe } from "../../../../lib/stripe/server";
import { recordOrderFromIntent } from "../../../../lib/checkout/recordOrder";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("payment_intent");
  const clientSecret = url.searchParams.get("payment_intent_client_secret");

  if (!id || !clientSecret) {
    return NextResponse.json(
      { error: "Missing payment reference" },
      { status: 400 }
    );
  }

  let intent;
  try {
    intent = await stripe().paymentIntents.retrieve(id);
  } catch {
    return NextResponse.json({ error: "Unknown payment" }, { status: 404 });
  }

  if (intent.client_secret !== clientSecret) {
    return NextResponse.json({ error: "Payment reference does not match" }, { status: 403 });
  }

  if (intent.status === "succeeded") {
    try {
      const { order } = await recordOrderFromIntent(intent);
      return NextResponse.json({ status: "succeeded", order });
    } catch (error) {
      console.error("[api/checkout/confirm] recording failed:", error);
      // Paid but not yet recorded - the webhook will retry. Tell the page to
      // keep polling rather than to show a failure.
      return NextResponse.json({ status: "processing" });
    }
  }

  // "processing" covers async methods still clearing; the rest mean the
  // payment did not complete and the shopper should be sent back to pay.
  return NextResponse.json({ status: intent.status });
}
