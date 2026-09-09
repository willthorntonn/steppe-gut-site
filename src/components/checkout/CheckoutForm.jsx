"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { writeConfirmation } from "../../checkout/confirmationState";
import { Lock } from "lucide-react";
import Field from "../ui/Field";
import Button from "../ui/Button";
import { useCart } from "../../cart/CartProvider";
import { BODY_SM, CAPTION, H4 } from "../../styles/type";

// cart-and-checkout.md §3.
//
// ── NOTHING HERE IS TRANSMITTED OR STORED. ────────────────────────────────
// The <form> has no action, no method, and its onSubmit calls
// preventDefault() and then router.push(). There is no fetch, no
// analytics call, and no write to localStorage or sessionStorage. Values live
// in component state for the life of the page and are gone on reload.
//
// The fields are typeable, which is a change from the earlier fully-disabled
// shell: a visitor can see how the form behaves, including its validation.
// The payment fieldset stays disabled, because that is the part that would be
// a lie - there is no provider behind it - and the notice above the form says
// so in plain text before anyone starts typing.
//
// When payment goes live: drop `disabled` from the payment fieldset, remove
// the notice, and point handleSubmit at the provider. The markup, labels,
// autocomplete attributes and validation all stay.
//
// One page with three titled sections, not a multi-step wizard: two extra page
// transitions for eleven fields is two extra chances to abandon.

// Thai addressing is sub-district / district / province. A Western
// city/state/zip form with translated labels is the wrong field structure and
// Thai users notice immediately. The reference checkout's City / Province /
// Postal row is deliberately not copied.
const PROVINCES = [
  "Bangkok",
  "Chiang Mai",
  "Chon Buri",
  "Nonthaburi",
  "Pathum Thani",
  "Phuket",
  "Samut Prakan",
  "Songkhla",
  "Other province",
];

const PAYMENT_METHODS = [
  "PromptPay",
  "Bank transfer",
  "Credit or debit card",
];

// Written out per field rather than generated from the label, so each one
// reads like a sentence someone would say.
const REQUIRED = {
  email: "Enter your email address",
  phone: "Enter a phone number",
  name: "Enter your full name",
  address1: "Enter your street address",
  subdistrict: "Enter your sub-district",
  district: "Enter your district",
  province: "Choose your province",
  postcode: "Enter your postcode",
};

const EMPTY = {
  email: "",
  phone: "",
  marketing: false,
  name: "",
  address1: "",
  address2: "",
  subdistrict: "",
  district: "",
  province: "",
  postcode: "",
  notes: "",
  billingSame: true,
  billingName: "",
  billingAddress1: "",
  billingAddress2: "",
  billingSubdistrict: "",
  billingDistrict: "",
  billingProvince: "",
  billingPostcode: "",
};

function validate(values) {
  const errors = {};

  for (const [name, message] of Object.entries(REQUIRED)) {
    if (!String(values[name]).trim()) errors[name] = message;
  }

  // Deliberately loose: something@something.something. Anything stricter
  // rejects addresses that are perfectly valid and the visitor cannot argue
  // with a form.
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "That does not look like an email address";
  }

  if (values.phone.trim() && values.phone.replace(/\D/g, "").length < 9) {
    errors.phone = "Enter a phone number we can reach you on";
  }

  if (values.postcode.trim() && !/^\d{5}$/.test(values.postcode.trim())) {
    errors.postcode = "Thai postcodes are five digits";
  }

  return errors;
}

/** Human-readable reference, generated locally. There is no order behind it. */
function orderReference() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 6; i += 1) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `SG-${suffix}`;
}

function SectionHeading({ step, children }) {
  return (
    <h2 className="font-serif font-normal text-forest" style={H4}>
      <span className="mr-3 font-sans text-sm font-semibold text-forest/45">
        {step}
      </span>
      {children}
    </h2>
  );
}

function SubHeading({ children }) {
  return (
    <h3 className="font-serif font-normal text-base text-forest">
      {children}
    </h3>
  );
}

export default function CheckoutForm({ canOrder }) {
  const router = useRouter();
  const { clear } = useCart();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const summaryRef = useRef(null);

  const update = (name) => (event) => {
    const value =
      event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setValues((current) => ({ ...current, [name]: value }));
    // Re-validating on change only after the field has been blurred keeps the
    // form from shouting at someone halfway through typing their email.
    if (touched[name]) {
      setErrors(validate({ ...values, [name]: value }));
    }
  };

  const blur = (name) => () => {
    setTouched((current) => ({ ...current, [name]: true }));
    setErrors(validate(values));
  };

  function handleSubmit(event) {
    // No action, no method, no network call. This is the only handler.
    event.preventDefault();

    const found = validate(values);
    setErrors(found);
    setTouched(Object.fromEntries(Object.keys(REQUIRED).map((key) => [key, true])));

    if (Object.keys(found).length > 0) {
      // Focus the summary rather than the first bad field: it tells the
      // visitor how many problems there are before walking them to the first.
      summaryRef.current?.focus();
      return;
    }

    const reference = orderReference();
    clear();
    writeConfirmation({ order: reference });
    router.push("/checkout/confirmation/");
  }

  // Only surfaced once a submit has been attempted, so the page never opens
  // with a list of complaints about fields nobody has visited.
  const shown = Object.entries(errors).filter(([name]) => touched[name]);

  const fieldProps = (name) => ({
    id: `f-${name}`,
    name,
    value: values[name],
    onChange: update(name),
    onBlur: blur(name),
    error: touched[name] ? errors[name] : undefined,
  });

  return (
    <form noValidate onSubmit={handleSubmit}>
      {/* tabIndex -1 so focus can be moved here programmatically without
          putting it in the tab order. */}
      <div
        ref={summaryRef}
        tabIndex={-1}
        aria-live="assertive"
        className="outline-none"
      >
        {shown.length > 0 && (
          <div
            role="alert"
            className="mb-10 rounded-2xl border border-[#8C3A2B]/40 bg-[#FFFDF9] p-6"
          >
            <h2 className="font-sans text-base font-semibold text-[#8C3A2B]">
              {shown.length === 1
                ? "One thing needs fixing"
                : `${shown.length} things need fixing`}
            </h2>
            <ul className="mt-3 space-y-1.5">
              {shown.map(([name, message]) => (
                <li key={name}>
                  <a
                    href={`#f-${name}`}
                    className="font-sans text-sm text-[#8C3A2B] underline underline-offset-4"
                  >
                    {message}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <fieldset className="border-0 p-0">
        <legend className="sr-only">Contact details</legend>
        <SectionHeading step="01">Contact</SectionHeading>
        <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field
            label="Email address"
            type="email"
            autoComplete="email"
            required
            {...fieldProps("email")}
          />
          <Field
            label="Phone number"
            type="tel"
            autoComplete="tel"
            required
            {...fieldProps("phone")}
          />
        </div>
        <label className="mt-6 flex items-start gap-3">
          {/* Unchecked by default. A pre-checked marketing box is not consent. */}
          <input
            type="checkbox"
            name="marketing"
            checked={values.marketing}
            onChange={update("marketing")}
            className="mt-1 h-5 w-5 shrink-0 rounded border-forest/30"
          />
          <span className="font-sans text-sm text-forest/75">
            Email me about Steppe Gut
          </span>
        </label>
      </fieldset>

      <fieldset className="mt-14 border-0 p-0">
        <legend className="sr-only">Delivery address</legend>
        <SectionHeading step="02">Delivery</SectionHeading>
        <p className="mt-3 font-sans text-sm text-forest/60">
          We deliver within Thailand only.
        </p>
        <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field
            label="Full name"
            autoComplete="name"
            required
            className="sm:col-span-2"
            {...fieldProps("name")}
          />
          <Field
            label="Address line 1"
            autoComplete="address-line1"
            required
            className="sm:col-span-2"
            {...fieldProps("address1")}
          />
          <Field
            label="Address line 2"
            autoComplete="address-line2"
            className="sm:col-span-2"
            {...fieldProps("address2")}
          />
          <Field
            label="Sub-district"
            autoComplete="address-level3"
            required
            {...fieldProps("subdistrict")}
          />
          <Field
            label="District"
            autoComplete="address-level2"
            required
            {...fieldProps("district")}
          />
          <Field
            label="Province"
            as="select"
            options={PROVINCES}
            autoComplete="address-level1"
            required
            {...fieldProps("province")}
          />
          <Field
            label="Postcode"
            inputMode="numeric"
            autoComplete="postal-code"
            required
            {...fieldProps("postcode")}
          />
          <Field
            label="Delivery notes"
            as="textarea"
            rows={4}
            className="sm:col-span-2"
            {...fieldProps("notes")}
          />
        </div>
      </fieldset>

      {/* The one part that stays disabled. Everything above can be filled in
          to see how the form behaves; this cannot, because there is no
          provider behind it. */}
      <fieldset disabled className="mt-14 border-0 p-0">
        <legend className="sr-only">Payment method</legend>
        <SectionHeading step="03">Payment</SectionHeading>
        <p className="mt-3 font-sans text-sm text-forest/60">
          Not available yet - see the notice above.
        </p>
        <div
          role="radiogroup"
          aria-label="Payment method"
          className="mt-7 space-y-3"
        >
          {PAYMENT_METHODS.map((method) => (
            <label
              key={method}
              className="flex cursor-not-allowed items-center gap-4 rounded-lg border border-forest/15 bg-[#EDE8DD] px-5 py-4"
            >
              <input type="radio" name="payment" value={method} className="h-5 w-5" />
              <span className="font-sans text-base text-forest/50">{method}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Billing address section */}
      <label className="mt-6 flex items-start gap-3">
        <input
          type="checkbox"
          name="billingSame"
          checked={values.billingSame}
          onChange={update("billingSame")}
          className="mt-1 h-5 w-5 shrink-0 rounded border-forest/30"
        />
        <span className="font-sans text-sm text-forest/75">
          Use delivery address as billing address
        </span>
      </label>

      {!values.billingSame && (
        <fieldset className="mt-8 border-0 p-0">
          <legend className="sr-only">Billing address</legend>
          <SubHeading>Billing address</SubHeading>
          <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Field
              label="Full name"
              autoComplete="name"
              className="sm:col-span-2"
              {...fieldProps("billingName")}
            />
            <Field
              label="Address line 1"
              autoComplete="address-line1"
              className="sm:col-span-2"
              {...fieldProps("billingAddress1")}
            />
            <Field
              label="Address line 2"
              autoComplete="address-line2"
              className="sm:col-span-2"
              {...fieldProps("billingAddress2")}
            />
            <Field
              label="Sub-district"
              autoComplete="address-level3"
              {...fieldProps("billingSubdistrict")}
            />
            <Field
              label="District"
              autoComplete="address-level2"
              {...fieldProps("billingDistrict")}
            />
            <Field
              label="Province"
              as="select"
              options={PROVINCES}
              autoComplete="address-level1"
              {...fieldProps("billingProvince")}
            />
            <Field
              label="Postcode"
              inputMode="numeric"
              autoComplete="postal-code"
              {...fieldProps("billingPostcode")}
            />
          </div>
        </fieldset>
      )}

      <Button
        type="submit"
        variant="forest"
        radius="2xl"
        disabled={!canOrder}
        className={`mt-12 h-14 w-full text-[18px] ${
          canOrder ? "" : "cursor-not-allowed opacity-45"
        }`}
      >
        <Lock size={17} strokeWidth={1.75} aria-hidden="true" className="mr-2.5" />
        Place order
      </Button>

      <p className="mt-4 font-sans text-forest/55" style={CAPTION}>
        Payment is not enabled. Nothing on this page is submitted, sent or
        stored, completing the form only shows you the confirmation screen
      </p>

      <p className="mt-8 border-t border-forest/10 pt-6 font-sans text-forest/55" style={BODY_SM}>
        Questions before you order? Email{" "}
        <a
          className="underline decoration-gold decoration-2 underline-offset-4"
          href="mailto:info@s72strategic.com"
        >
          info@s72strategic.com
        </a>
      </p>
    </form>
  );
}
