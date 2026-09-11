"use client";

// The browser's Stripe.js loader.
//
// `loadStripe` pulls Stripe.js from js.stripe.com the first time it is called
// and caches the promise, so every <Elements> on the site shares one script
// and one instance. It carries only the publishable key, which is meant to be
// public - it names the account and can authorise nothing on its own. The
// secret key lives on the server (src/lib/stripe/server.js) and never ships.

import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

export function getStripe() {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!key) {
    // Surfaced in the checkout as "payment is unavailable" rather than a blank
    // Element that never mounts.
    return null;
  }
  stripePromise ??= loadStripe(key);
  return stripePromise;
}
