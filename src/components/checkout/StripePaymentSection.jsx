"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { getStripe } from "../../lib/stripe/browser";
import { AmexMark, MastercardMark, PromptPayMark, VisaMark } from "./brick/marks";

// The payment half of the checkout, on Stripe.
//
// The rest of src/views/Checkout.jsx is unchanged - the reviews strip, the
// benefits, the contact and delivery fields, the order summary. This owns
// everything from the "Payment" heading down.
//
// The card form mounts immediately, with no email or delivery details
// required first - Stripe's "collect payment details before creating the
// Intent" pattern (Elements opened with `mode: "payment"` + an estimated
// amount, not a clientSecret). Nothing hits the server until "Pay now" is
// pressed: elements.submit() validates the card fields first, then the real
// PaymentIntent is priced and opened from the basket + delivery address
// (server/catalog.js - the browser never sends an amount), and only then is
// it confirmed. A card clears inline and we route to the confirmation page.
//
// PromptPay has no fields to fill in, so Stripe draws nothing for it here -
// its panel is ours, and "Pay now" hands off to Stripe's own QR-code popup
// (stripe.confirmPromptPayPayment), then routes to the same confirmation page.
//
// TrueMoney is not a Stripe payment method, so it is not offered here.

const stripePromise = getStripe();

// THB is a two-decimal currency in Stripe: amounts are in satang. Matches
// server/api/checkout/intent/route.js, which is what actually charges.
const MINOR_UNITS = 100;

// Stripe's Appearance API has a single `.AccordionItem` class covering both a
// method's title row and its expanded fields, so a white title over a grey
// field panel is not expressible through it. Instead the selector rows, the
// divider and the grey panel below are ours, and Stripe is left rendering
// only the card fields inside that panel - one payment method in its Elements
// instance, so it draws no selector chrome of its own.
//
// The panel is a light grey, lighter than the forest/20 outline around it and
// clearly apart from the cream page behind it.
const PANEL_GREY = "#E9E6E0";

// Grey field borders, on focus too - the only forest outline in the section
// is the selected method's white title row.
const FIELD_BORDER = "1px solid rgba(47,62,47,0.2)";
const FIELD_BORDER_FOCUS = "1px solid rgba(47,62,47,0.35)";
// Stripe's field fill.
const FIELD_FILL = "#FFFDF9";
// The PromptPay note box is plain white, apart from the cream field fill.
const NOTE_FILL = "#FFFFFF";

const APPEARANCE = {
  theme: "flat",
  variables: {
    colorPrimary: "#2F3E2F",
    // The iframe's own backdrop, so it disappears into our grey panel.
    colorBackground: PANEL_GREY,
    colorText: "#2F3E2F",
    colorDanger: "#8C3A2B",
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
    fontSizeBase: "14px",
    borderRadius: "12px",
    spacingUnit: "3.4px",
  },
  rules: {
    ".Input": {
      border: FIELD_BORDER,
      boxShadow: "none",
      outline: "none",
      padding: "12px 12px",
      backgroundColor: FIELD_FILL,
      transition: "border-color 150ms ease",
    },
    ".Input:focus": {
      border: FIELD_BORDER_FOCUS,
      boxShadow: "none",
      outline: "none",
    },
    ".Label": { fontWeight: "500", color: "#000000" },
  },
};

const METHODS = [
  { id: "card", label: "Credit card" },
  { id: "promptpay", label: "PromptPay" },
];

/**
 * @param {object}   props
 * @param {string}   props.email        contact email, sent as the receipt
 *                                      address when payment is confirmed
 * @param {boolean}  props.cartEmpty    nothing to pay for
 * @param {number}   props.amount       basket subtotal in THB, used only to
 *                                      open the card form with the right
 *                                      payment methods available - the real
 *                                      charge is always priced server-side
 * @param {() => object} props.buildDraft  reads current items + delivery address
 *                                          as `{ items, shippingAddressId? ,
 *                                          shippingAddress?, saveAddress? }`
 * @param {() => boolean} props.validateDeliveryFields  checks the contact/
 *                                      delivery fields above, red-texting
 *                                      and scrolling to the first empty one;
 *                                      returns false when it did that
 */
export default function StripePaymentSection({
  email,
  cartEmpty,
  amount,
  buildDraft,
  validateDeliveryFields,
}) {
  const ready = !cartEmpty && amount > 0 && Boolean(stripePromise);
  const [method, setMethod] = useState("card");

  // Prices the basket and opens a fresh PaymentIntent - called only once,
  // from "Pay now" (for a card, after its fields passed elements.submit()).
  const syncIntent = useCallback(async () => {
    const draft = buildDraft();
    const res = await fetch("/api/checkout/intent/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...draft, email, paymentMethodType: method }),
    });
    const payload = await res.json().catch(() => null);
    if (!res.ok) {
      throw new Error(payload?.error ?? "Payment could not be set up");
    }
    return payload;
  }, [buildDraft, email, method]);

  // Deferred Elements: no clientSecret yet, just an estimated amount so the
  // right payment methods show up. This is what lets the card form render
  // before anyone has typed an email or an address.
  //
  // Mounted up front even while PromptPay is selected, so switching back
  // shows fields that already loaded. `loader: "never"` drops Stripe's grey
  // skeleton - the card panel stays closed until its fields are ready instead.
  const cardOptions = useMemo(
    () =>
      ready
        ? {
            mode: "payment",
            amount: Math.round(amount * MINOR_UNITS),
            currency: "thb",
            paymentMethodTypes: ["card"],
            appearance: APPEARANCE,
            loader: "never",
          }
        : null,
    [ready, amount]
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

      {stripePromise && !cardOptions && (
        <p className="mt-4 rounded-[12px] border border-forest/20 bg-[#FFFDF9] px-5 py-6 text-center text-[14px] text-forest/60">
          Your basket is empty
        </p>
      )}

      {stripePromise && cardOptions && (
        <PayNow
          method={method}
          onMethodChange={setMethod}
          cardOptions={cardOptions}
          syncIntent={syncIntent}
          validateDeliveryFields={validateDeliveryFields}
          email={email}
        />
      )}
    </section>
  );
}

function PayNow({
  method,
  onMethodChange,
  cardOptions,
  syncIntent,
  validateDeliveryFields,
  email,
}) {
  const router = useRouter();
  const containerRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [payError, setPayError] = useState("");
  // The card Elements' { stripe, elements }, handed up from inside it. The
  // Stripe instance is shared, so PromptPay confirms with it too.
  const [handles, setHandles] = useState({});
  // The card fields have painted - its panel only opens once they have.
  const [cardLoaded, setCardLoaded] = useState(false);
  const markCardLoaded = useCallback(() => setCardLoaded(true), []);

  const { stripe, elements } = handles;

  function changeMethod(id) {
    setPayError("");
    onMethodChange(id);
  }

  function routeToConfirmation(paymentIntent) {
    // Hand the confirmation page the same reference Stripe would have put on
    // a redirect, so it has one code path. Anything short of "succeeded" is
    // an async method that has not settled, waited out on that page.
    const params = new URLSearchParams({
      payment_intent: paymentIntent.id,
      payment_intent_client_secret: paymentIntent.client_secret,
      redirect_status: paymentIntent.status === "succeeded" ? "succeeded" : "pending",
    });
    router.push(`/checkout/confirmation/?${params.toString()}`);
  }

  async function handlePayPromptPay() {
    let payload;
    try {
      payload = await syncIntent();
    } catch (error) {
      setPayError(error.message ?? "Payment could not be set up");
      setSubmitting(false);
      return;
    }

    // Opens Stripe's QR-code popup and resolves once it is scanned or closed.
    const { error, paymentIntent } = await stripe.confirmPromptPayPayment(
      payload.clientSecret,
      {
        payment_method: { billing_details: { email } },
        return_url: `${window.location.origin}/checkout/confirmation/`,
      }
    );

    if (error) {
      setPayError(error.message ?? "That payment could not be completed, try again");
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      setSubmitting(false);
      return;
    }

    if (paymentIntent && paymentIntent.status !== "requires_payment_method") {
      routeToConfirmation(paymentIntent);
      return;
    }

    setPayError("The QR code was closed before payment, press Pay now to try again");
    setSubmitting(false);
  }

  async function handlePay() {
    if (!stripe || (method === "card" && !elements)) return;
    setPayError("");

    // The contact/delivery fields above are checked first - if any of them
    // is empty, that box already got its red text and the page has already
    // scrolled to it, so payment never starts.
    if (validateDeliveryFields && !validateDeliveryFields()) {
      return;
    }

    setSubmitting(true);

    try {
      if (method === "promptpay") {
        await handlePayPromptPay();
        return;
      }

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

      // Card details are already collected and validated - only now does the
      // basket get priced and a real PaymentIntent opened.
      let payload;
      try {
        payload = await syncIntent();
      } catch (error) {
        setPayError(error.message ?? "Payment could not be set up");
        setSubmitting(false);
        return;
      }

      const returnUrl = `${window.location.origin}/checkout/confirmation/`;
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret: payload.clientSecret,
        confirmParams: {
          return_url: returnUrl,
          payment_method_data: { billing_details: { email } },
        },
        // Cards and wallets resolve here; PromptPay and friends still redirect.
        redirect: "if_required",
      });

      if (error) {
        // PaymentElement carries every card field in one box, so there is no
        // per-field "card number" / "CVV" split to red-text individually; a
        // validation error means something in that box is incomplete or
        // invalid.
        setPayError(
          error.type === "validation_error"
            ? "Enter your card details to continue"
            : error.message ?? "That payment could not be completed, try again"
        );
        containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        setSubmitting(false);
        return;
      }

      if (paymentIntent) {
        routeToConfirmation(paymentIntent);
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
      {/* One connected block, like the saved-address list above - a single
          outline wraps both methods, with a hairline between them. The
          green selected outline sits only on the white title row, inset so
          it never doubles up with the shared outline around it. */}
      <div className="divide-y divide-forest/20 overflow-hidden rounded-[12px] border border-forest/20">
        {METHODS.map((m, index) => {
          const selected = m.id === method;
          const open = selected && (m.id !== "card" || cardLoaded);
          // The outline curves with a real corner radius only where the
          // label actually meets the container's own rounded edge - the
          // first item's top, and the last item's bottom but only while
          // its panel is collapsed flush beneath it. Otherwise a curved
          // outline gets sliced by the container's square corner clip and
          // thins out right at the curve.
          const isFirst = index === 0;
          const isLast = index === METHODS.length - 1;
          const roundedCorners = `${isFirst ? "rounded-t-[12px]" : ""} ${
            isLast && !open ? "rounded-b-[12px]" : ""
          }`;
          return (
            <div key={m.id}>
              <label
                className={`flex cursor-pointer items-center justify-between gap-4 bg-[#FFFDF9] px-5 py-4 ${roundedCorners} ${
                  selected ? "outline outline-2 -outline-offset-2 outline-forest" : ""
                }`}
              >
                <span className="flex items-center gap-3">
                  <MethodRadio
                    value={m.id}
                    checked={selected}
                    onChange={() => changeMethod(m.id)}
                  />
                  <span className="text-[14px] font-medium text-black">{m.label}</span>
                </span>
                <span className="flex shrink-0 items-center gap-1.5">
                  {m.id === "card" ? (
                    <>
                      <VisaMark />
                      <MastercardMark />
                      <AmexMark />
                    </>
                  ) : (
                    <PromptPayMark />
                  )}
                </span>
              </label>

              {/* Always mounted, so the card fields are loaded before it
                  opens. Closed, it is zero-height and inert (out of the tab
                  order). */}
              <div
                inert={!open}
                aria-hidden={!open}
                className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="px-5 py-4" style={{ backgroundColor: PANEL_GREY }}>
                    {m.id === "card" ? (
                      <Elements stripe={stripePromise} options={cardOptions}>
                        <CardFields onHandles={setHandles} onLoaded={markCardLoaded} />
                      </Elements>
                    ) : (
                      <p
                        className="rounded-[12px] border border-forest/20 px-4 py-3.5 text-[14px] leading-[1.5] text-forest"
                        style={{ backgroundColor: NOTE_FILL }}
                      >
                        After you press Pay now, a PromptPay QR code opens for
                        you to scan with your banking app
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {payError && (
        <p role="alert" className="mt-4 text-[14px] text-[#8C3A2B]">
          {payError}
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

// The card's Stripe fields. Lives inside the card Elements, so it hands the
// Stripe instance and Elements group up to PayNow for "Pay now".
function CardFields({ onHandles, onLoaded }) {
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (stripe && elements) onHandles({ stripe, elements });
  }, [stripe, elements, onHandles]);

  return (
    <PaymentElement
      onReady={onLoaded}
      options={{
        // One method type in this Elements, so tabs draws no tab bar - just
        // the card fields.
        layout: "tabs",
        // The email above the fold is already the receipt address.
        fields: { billingDetails: { email: "never" } },
        // No Link autofill prompt on the card number field - the email
        // field it hinges on is hidden anyway. Google Pay / Apple Pay are
        // also turned off - this box is card-only, so no wallet tab should
        // sit next to "Card".
        wallets: { link: "never", googlePay: "never", applePay: "never" },
      }}
    />
  );
}

// Same radio as the Shipping method boxes in src/views/Checkout.jsx.
function MethodRadio({ value, checked, onChange }) {
  return (
    <span className="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center">
      <input
        type="radio"
        name="paymentMethod"
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-full border border-forest/35 bg-[#FFFDF9] checked:border-[5px] checked:border-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      />
    </span>
  );
}
