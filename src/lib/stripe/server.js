// The server-side Stripe client.
//
// Reads STRIPE_SECRET_KEY from the environment and never leaves this module,
// the same rule the Supabase secret key follows next door in
// src/lib/supabase/server.js. It must not appear in anything prefixed
// NEXT_PUBLIC_, which is bundled into the browser. Only the publishable key
// (NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) is meant to be public - it identifies
// the account and can do nothing on its own.
//
// A sandbox/test key (sk_test_...) charges nothing real. Swapping in a live
// key (sk_live_...) is the only change needed to take real payments, plus the
// matching publishable key and webhook secret.

import Stripe from "stripe";

let client;

export function stripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set, so the server cannot talk to Stripe"
    );
  }
  // One instance per server process. `apiVersion` is pinned so a Stripe-side
  // default bump cannot change a response shape underneath us.
  client ??= new Stripe(key, {
    // Pinned to the version this SDK build ships types for, so a Stripe-side
    // default bump cannot change a response shape underneath us. Bump this
    // together with the `stripe` package.
    apiVersion: "2026-08-26.dahlia",
    appInfo: { name: "Steppe Gut", url: "https://steppegut.com" },
  });
  return client;
}
