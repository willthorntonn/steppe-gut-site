"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Container from "../components/ui/Container";
import { takeConfirmation } from "../checkout/confirmationState";

// cart-and-checkout.md §4. Full chrome is restored here - exits are removed
// at the point of payment and given straight back afterwards.
//
// Reachable only with the handoff the checkout leaves in sessionStorage
// (src/checkout/confirmationState.js). A direct visit redirects to "/"
// rather than rendering a thank-you for an order that was never placed.
//
// `placed` is what marks a genuine arrival, not the order number: a
// signed-out checkout has no account to record against, so it arrives here
// with `order: null` and still deserves its thank-you. When there is a
// number, it belongs to a row that now exists in My Orders.
export default function Confirmation() {
  const router = useRouter();
  // Nothing on the server or the first client render; the handoff is read
  // once mounted. Held in a ref as well as state so React's development-only
  // double effect does not read an already-cleared store the second time.
  const taken = useRef(undefined);
  const [state, setState] = useState(null);

  useEffect(() => {
    if (taken.current === undefined) taken.current = takeConfirmation();
    if (!taken.current?.placed) {
      router.replace("/");
      return;
    }
    setState(taken.current);
  }, [router]);

  if (!state) return null;
  const { order } = state;

  return (
    <>
      <section data-navtheme="light" className="min-h-screen bg-cream flex flex-col">
        <Container width="narrow" className="flex flex-1 flex-col items-center justify-center px-6 pb-24 pt-[136px] text-center">
          <h1 className="-mt-10 font-serif text-[clamp(3.8rem,8.4vw,6.6rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-forest whitespace-nowrap">
            Thank you for your order
          </h1>
          <p className="mt-8 text-center font-sans text-2xl text-forest/70 whitespace-nowrap">
            Your order has been placed and is being processed. You will receive an email with the order details
          </p>
          {order && (
            <p className="mt-8 font-sans text-2xl text-forest/70">
              Order #{order.replace(/\D/g, "")} &middot;{" "}
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
        </Container>
      </section>
    </>
  );
}
