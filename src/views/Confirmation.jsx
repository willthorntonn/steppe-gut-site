"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Container from "../components/ui/Container";
import { takeConfirmation } from "../checkout/confirmationState";

// The screen after payment. Reached one of two ways, handled as one:
//
//   * A card or wallet clears inline in the checkout, which then routes here
//     with ?payment_intent=…&payment_intent_client_secret=…&redirect_status=…
//   * PromptPay and other redirect methods send the browser to Stripe and
//     back to this same URL, with the same query Stripe appends itself.
//
// Either way, this asks the server (/api/checkout/confirm/) what Stripe says
// about that intent. On "succeeded" the order has been recorded - by the
// webhook or by that same endpoint - and its number is shown. On "processing"
// it keeps asking for a short while. Anything else means the payment did not
// complete, and the way back to checkout is offered rather than a thank-you
// for an order nobody paid for.
//
// A direct visit with no payment reference (and no legacy sessionStorage
// handoff) redirects home.

const POLL_INTERVAL_MS = 2000;
const POLL_LIMIT = 12;

function ConfirmationInner() {
  const router = useRouter();
  const params = useSearchParams();
  const started = useRef(false);

  // "loading" | "succeeded" | "processing" | "failed"
  const [phase, setPhase] = useState("loading");
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const paymentIntent = params.get("payment_intent");
    const clientSecret = params.get("payment_intent_client_secret");

    if (!paymentIntent || !clientSecret) {
      // No Stripe reference. Honour a legacy handoff if one is there, else
      // this is a direct visit and there is nothing to confirm.
      const legacy = takeConfirmation();
      if (legacy?.placed) {
        setOrderId(legacy.order ?? null);
        setPhase("succeeded");
      } else {
        router.replace("/");
      }
      return;
    }

    let cancelled = false;
    let tries = 0;

    const query = new URLSearchParams({
      payment_intent: paymentIntent,
      payment_intent_client_secret: clientSecret,
    });

    async function poll() {
      tries += 1;
      let data = null;
      try {
        const res = await fetch(`/api/checkout/confirm/?${query.toString()}`);
        data = await res.json().catch(() => null);
      } catch {
        data = null;
      }
      if (cancelled) return;

      if (data?.status === "succeeded") {
        setOrderId(data.order?.id ?? null);
        setPhase("succeeded");
        return;
      }
      if (
        data?.status === "processing" ||
        data?.status === "requires_action" ||
        data == null
      ) {
        if (tries >= POLL_LIMIT) {
          // Paid but not recorded in time, or an async method still clearing.
          // Treat it as placed - the webhook will finish the record - rather
          // than alarming someone whose money has left.
          setPhase("processing");
          return;
        }
        setTimeout(poll, POLL_INTERVAL_MS);
        return;
      }
      // requires_payment_method, canceled, or anything else: not paid.
      setPhase("failed");
    }

    poll();
    return () => {
      cancelled = true;
    };
  }, [params, router]);

  if (phase === "loading") {
    return (
      <Shell>
        <h1 className="font-serif text-[clamp(3rem,7vw,5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-forest">
          Confirming your payment
        </h1>
        <p className="mt-8 font-sans text-2xl text-forest/70">One moment</p>
      </Shell>
    );
  }

  if (phase === "failed") {
    return (
      <Shell>
        <h1 className="font-serif text-[clamp(3rem,7vw,5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-forest">
          That payment did not go through
        </h1>
        <p className="mt-8 font-sans text-2xl text-forest/70">
          Nothing has been charged. You can try again from the checkout
        </p>
        <Link
          href="/checkout/"
          className="mt-10 font-sans text-2xl font-semibold text-gold underline underline-offset-4 hover:text-forest"
        >
          Back to checkout
        </Link>
      </Shell>
    );
  }

  const finalising = phase === "processing";

  return (
    <Shell>
      <h1 className="-mt-10 font-serif text-[clamp(3.8rem,8.4vw,6.6rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-forest whitespace-nowrap">
        Thank you for your order
      </h1>
      <p className="mt-8 text-center font-sans text-2xl text-forest/70">
        {finalising
          ? "Your payment has been received and your order is being finalised. You will receive an email with the details"
          : "Your order has been placed and is being processed. You will receive an email with the order details"}
      </p>
      {orderId && (
        <p className="mt-8 font-sans text-2xl text-forest/70">
          Order #{String(orderId).replace(/\D/g, "")} &middot;{" "}
          <Link
            href="/account/orders/"
            className="font-semibold text-gold underline underline-offset-4 hover:text-forest"
          >
            see it in My Orders
          </Link>
        </p>
      )}
      <Link
        href="/"
        className="mt-10 font-sans text-2xl font-semibold text-gold underline underline-offset-4 hover:text-forest"
      >
        Back to homepage
      </Link>
    </Shell>
  );
}

function Shell({ children }) {
  return (
    <section data-navtheme="light" className="min-h-screen bg-cream flex flex-col">
      <Container
        width="narrow"
        className="flex flex-1 flex-col items-center justify-center px-6 pb-24 pt-[136px] text-center"
      >
        {children}
      </Container>
    </section>
  );
}

export default function Confirmation() {
  return (
    <Suspense fallback={<Shell>{null}</Shell>}>
      <ConfirmationInner />
    </Suspense>
  );
}
