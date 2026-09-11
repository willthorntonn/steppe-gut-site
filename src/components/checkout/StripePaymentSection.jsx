"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { getStripe } from "../../lib/stripe/browser";

// The payment half of the checkout, on Stripe.
//
// The rest of src/views/Checkout.jsx is unchanged - the reviews strip, the
// benefits, the contact and delivery fields, the order summary. This owns
// everything from the "Payment" heading down: it asks the server for a
// PaymentIntent priced from the basket (never from the browser), mounts
// Stripe's PaymentElement so the shopper sees every method enabled in the
// dashboard - cards, PromptPay, Apple Pay, Google Pay, Link - and on "Pay now"
// confirms the payment. A card clears inline and we route to the confirmation
// page; PromptPay and other redirect methods send the browser to Stripe and
// back to that same page, which records the order from the returned intent.
//
// TrueMoney is not a Stripe payment method, so it is not offered here.

const stripePromise = getStripe();

// PaymentElement styled to sit inside the checkout's forest/cream palette
// rather than Stripe's default blue-on-white.
const APPEARANCE = {
  theme: "flat",
  variables: {
    colorPrimary: "#2F3E2F",
    colorBackground: "#FFFDF9",
    colorText: "#2F3E2F",
    colorDanger: "#8C3A2B",
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
    fontSizeBase: "14px",
    borderRadius: "12px",
    spacingUnit: "3.4px",
  },
  rules: {
    ".Input": {
      border: "1px solid rgba(47,62,47,0.2)",
      boxShadow: "none",
      padding: "12px 12px",
    },
    ".Input:focus": {
      border: "1px solid #2F3E2F",
      boxShadow: "none",
      outline: "2px solid #D4AF37",
      outlineOffset: "1px",
    },
    ".Tab": {
      border: "1px solid rgba(47,62,47,0.2)",
      boxShadow: "none",
    },
    ".Tab--selected": {
      border: "1px solid #2F3E2F",
      backgroundColor: "#FFFFFF",
    },
    ".Label": { fontWeight: "500" },
  },
};

/**
 * @param {object}   props
 * @param {string}   props.email        contact email, also the receipt address
 * @param {boolean}  props.emailValid   whether that email passes the form's check
 * @param {boolean}  props.cartEmpty    nothing to pay for
 * @param {() => object} props.buildDraft  reads current items + delivery address
 *                                          as `{ items, shippingAddressId? ,
 *                                          shippingAddress?, saveAddress? }`
 * @param {string}   props.itemsKey     changes when the basket changes, so the
 *                                      intent amount can be kept in step
 * @param {() => boolean} props.validateDeliveryFields  checks the contact/
 *                                      delivery fields above, red-texting
 *                                      and scrolling to the first empty one;
 *                                      returns false when it did that
 */
export default function StripePaymentSection({
  email,
  emailValid,
  cartEmpty,
  buildDraft,
  itemsKey,
  validateDeliveryFields,
}) {
  const [clientSecret, setClientSecret] = useState("");
  const [intentId, setIntentId] = useState("");
  const [setupError, setSetupError] = useState("");
  const creating = useRef(false);

  const ready = emailValid && !cartEmpty && Boolean(stripePromise);

  // Ask the server to price the basket and open (or refresh) a PaymentIntent.
  const syncIntent = useCallback(async () => {
    const draft = buildDraft();
    const res = await fetch("/api/checkout/intent/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...draft,
        email,
        paymentIntentId: intentId || undefined,
      }),
    });
    const payload = await res.json().catch(() => null);
    if (!res.ok) {
      throw new Error(payload?.error ?? "Payment could not be set up");
    }
    return payload;
  }, [buildDraft, email, intentId]);

  // Open the intent once, as soon as there is a valid email and a basket.
  useEffect(() => {
    if (!ready || clientSecret || creating.current) return;
    creating.current = true;
    setSetupError("");
    syncIntent()
      .then((payload) => {
        setClientSecret(payload.clientSecret);
        setIntentId(payload.paymentIntentId);
      })
      .catch((error) => setSetupError(error.message))
      .finally(() => {
        creating.current = false;
      });
  }, [ready, clientSecret, syncIntent]);

  // Keep the amount in step if the basket changes on this page (the "complete
  // your routine" add-on). The client secret does not change, so the mounted
  // Element is undisturbed.
  useEffect(() => {
    if (!intentId) return;
    syncIntent().catch(() => {
      /* the Pay-now handler re-syncs and will surface any real failure */
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsKey]);

  const options = useMemo(
    () => (clientSecret ? { clientSecret, appearance: APPEARANCE } : null),
    [clientSecret]
  );

  return (
    <section className="mt-9">
      <h2 className="font-sans text-[13px] font-semibold text-forest 1395:text-[22px]">
        Payment
      </h2>
      <p className="mt-1.5 text-[14px] text-forest/60">
        All transactions are secure and encrypted
      </p>

      {!stripePromise && (
        <p className="mt-4 rounded-[12px] border border-forest/20 bg-[#FFFDF9] px-5 py-6 text-center text-[14px] text-forest/60">
          Payment is not configured on this environment yet
        </p>
      )}

      {stripePromise && !options && (
        <p className="mt-4 rounded-[12px] border border-forest/20 bg-[#FFFDF9] px-5 py-6 text-center text-[14px] text-forest/60">
          {setupError
            ? setupError
            : cartEmpty
            ? "Your basket is empty"
            : "Enter your email above to load payment options"}
        </p>
      )}

      {stripePromise && options && (
        <Elements stripe={stripePromise} options={options}>
          <PayNow
            syncIntent={syncIntent}
            clientSecret={clientSecret}
            setupError={setupError}
            validateDeliveryFields={validateDeliveryFields}
            email={email}
          />
        </Elements>
      )}
    </section>
  );
}

function PayNow({ syncIntent, clientSecret, setupError, validateDeliveryFields, email }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const containerRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [payError, setPayError] = useState("");

  async function handlePay() {
    if (!stripe || !elements) return;
    setPayError("");

    // The contact/delivery fields above are checked first - if any of them
    // is empty, that box already got its red text and the page has already
    // scrolled to it, so payment never starts.
    if (validateDeliveryFields && !validateDeliveryFields()) {
      return;
    }

    setSubmitting(true);

    try {
      // Stripe requires elements.submit() to run synchronously off the
      // click, before any other await - it's what actually validates the
      // Payment Element's own fields (card number, expiry, CVV...).
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setPayError(
          submitError.message ?? "Enter your card details to continue"
        );
        containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        setSubmitting(false);
        return;
      }

      // Make sure the amount and address on the intent are current before it
      // is confirmed - the basket may have changed since it was opened.
      try {
        await syncIntent();
      } catch {
        /* a stale amount is caught by Stripe; carry on to confirm */
      }

      const returnUrl = `${window.location.origin}/checkout/confirmation/`;
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: returnUrl,
          payment_method_data: { billing_details: { email } },
        },
        // Cards and wallets resolve here; PromptPay and friends still redirect.
        redirect: "if_required",
      });

      if (error) {
        // PaymentElement carries every method - card, wallets, PromptPay -
        // in one box, so there is no per-field "card number" / "CVV" split
        // to red-text individually; a validation error means something in
        // that box is incomplete or invalid.
        setPayError(
          error.type === "validation_error"
            ? "Enter your card details to continue"
            : error.message ?? "That payment could not be completed, try again"
        );
        containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        setSubmitting(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        // Hand the confirmation page the same reference Stripe would have put
        // on a redirect, so it has one code path.
        const params = new URLSearchParams({
          payment_intent: paymentIntent.id,
          payment_intent_client_secret: paymentIntent.client_secret,
          redirect_status: "succeeded",
        });
        router.push(`/checkout/confirmation/?${params.toString()}`);
        return;
      }

      // "processing" - an async method that has not settled. Send them to the
      // confirmation page to wait it out.
      if (paymentIntent) {
        const params = new URLSearchParams({
          payment_intent: paymentIntent.id,
          payment_intent_client_secret: paymentIntent.client_secret,
          redirect_status: "pending",
        });
        router.push(`/checkout/confirmation/?${params.toString()}`);
        return;
      }

      setSubmitting(false);
    } catch (failure) {
      setPayError(failure.message ?? "Something went wrong, try again");
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-4" ref={containerRef}>
      <PaymentElement
        options={{
          layout: {
            type: "accordion",
            defaultCollapsed: false,
            radios: true,
            spacedAccordionItems: true,
          },
          paymentMethodOrder: ["card", "promptpay"],
          // The email above the fold is already the receipt address - don't
          // ask for it again inside the PromptPay panel.
          fields: { billingDetails: { email: "never" } },
        }}
      />

      {(payError || setupError) && (
        <p role="alert" className="mt-4 text-[14px] text-[#8C3A2B]">
          {payError || setupError}
        </p>
      )}

      <button
        type="button"
        onClick={handlePay}
        disabled={!stripe || submitting}
        className="mt-6 h-[52px] w-full rounded-[12px] bg-forest font-sans text-[15px] font-bold uppercase tracking-[0.08em] text-cream transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-60"
      >
        {submitting ? "Processing your payment" : "Pay now"}
      </button>
    </div>
  );
}
