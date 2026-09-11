"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { BadgePercent, HelpCircle, Tag, Users } from "lucide-react";
import FloatField from "../components/checkout/brick/FloatField";
import StripePaymentSection from "../components/checkout/StripePaymentSection";
import Picture from "../components/ui/Picture";
import { useCart } from "../cart/CartProvider";
import { useAuth } from "../auth/AuthProvider";
import { PRODUCTS, PRODUCT_BY_SLUG } from "../data/products";
import { getCountryFields, DEFAULT_COUNTRY_FIELDS } from "../data/countryFields";
// Stand-in prices and the ฿ formatter, shared with the cart page.
import {
  DEMO_UNIT_PRICE,
  DEMO_ADDON_PRICE,
  PROMO_MIN_UNITS,
  PROMO_RATE,
  baht,
} from "../checkout/demoPrices";

// ─────────────────────────────────────────────────────────────────────────
// A getbrick.com-STRUCTURED CHECKOUT, RE-SKINNED IN STEPPE GUT'S IDENTITY.
//
// Layout, spacing, sizing and the surrounding features (reviews strip,
// floating labels, discount code, cross-sell card, savings line) are still a
// structural copy of the reference checkout - only colour and type changed.
// Colours are Tailwind's forest / cream / gold tokens (design-tokens.js);
// type is font-serif (EB Garamond) for headings and font-sans (Inter) for
// everything else.
//
// It cancels the site-wide `zoom: 0.85` (see index.css) with an inverse zoom
// on the wrapper, so the px values below are real px.
//
// PAYMENT IS LIVE, ON STRIPE. The "Payment" section below is
// StripePaymentSection: it asks the server to price the basket
// (server/catalog.js - the browser never sends an amount), mounts Stripe's
// PaymentElement for cards / PromptPay / Apple Pay / Google Pay / Link, and on
// "Pay now" confirms the payment. The order row is written only after Stripe
// says the money moved (src/lib/checkout/recordOrder.js), for guests by email
// and for signed-in shoppers against their account. The reference's own
// express-checkout buttons and hand-drawn card fields are gone - the
// PaymentElement carries all of that now. TrueMoney is not a Stripe method and
// is not offered.
// ─────────────────────────────────────────────────────────────────────────

const COUNTRIES = [
  "Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola",
  "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize",
  "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil",
  "British Indian Ocean Territory", "British Virgin Islands", "Brunei", "Bulgaria",
  "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Caribbean Netherlands",
  "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island",
  "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo - Brazzaville", "Congo - Kinshasa",
  "Cook Islands", "Costa Rica", "Côte d'Ivoire", "Croatia", "Cuba", "Curaçao", "Cyprus",
  "Czechia", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana",
  "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany",
  "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala",
  "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong SAR",
  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man",
  "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
  "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
  "Liechtenstein", "Lithuania", "Luxembourg", "Macao SAR", "Madagascar", "Malawi", "Malaysia",
  "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius",
  "Mayotte", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
  "Montserrat", "Morocco", "Mozambique", "Myanmar (Burma)", "Namibia", "Nauru", "Nepal",
  "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue",
  "Norfolk Island", "North Korea", "North Macedonia", "Northern Mariana Islands", "Norway",
  "Oman", "Pakistan", "Palau", "Palestinian Territories", "Panama", "Papua New Guinea",
  "Paraguay", "Peru", "Philippines", "Pitcairn Islands", "Poland", "Portugal", "Puerto Rico",
  "Qatar", "Réunion", "Romania", "Russia", "Rwanda", "Samoa", "San Marino",
  "São Tomé & Príncipe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone",
  "Singapore", "Sint Maarten", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
  "South Africa", "South Georgia & South Sandwich Islands", "South Korea", "South Sudan",
  "Spain", "Sri Lanka", "St. Barthélemy", "St. Helena", "St. Kitts & Nevis", "St. Lucia",
  "St. Martin", "St. Pierre & Miquelon", "St. Vincent & Grenadines", "Sudan", "Suriname",
  "Svalbard & Jan Mayen", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
  "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad & Tobago",
  "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos Islands", "Tuvalu", "U.S. Outlying Islands",
  "U.S. Virgin Islands", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
  "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Wallis & Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe",
];

const BENEFITS = [
  { icon: BadgePercent, label: "Discounts for Members" },
  { icon: null, label: "30-Day Product Guarantee" },
  { icon: Users, label: "Dedicated Ongoing Support" },
];

const FOOTER_LINKS = [
  "Refund policy",
  "Shipping",
  "Privacy policy",
  "Terms of service",
  "Contact",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** The shield-with-30 badge from the middle benefit card. */
function GuaranteeBadge() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className="h-[38px] w-[38px]">
      <path
        d="M20 3.5 34 8.2v11.4c0 8.4-5.7 14.6-14 17.1-8.3-2.5-14-8.7-14-17.1V8.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="18.5" r="7.8" fill="currentColor" />
      <text
        x="20"
        y="22.2"
        textAnchor="middle"
        fontFamily="Helvetica, Arial, sans-serif"
        fontSize="9"
        fontWeight="700"
        fill="#fff"
      >
        30
      </text>
    </svg>
  );
}

function SectionTitle({ children, className = "" }) {
  return (
    <h2
      className={`font-sans text-[13px] font-semibold text-forest 1395:text-[22px] ${className}`}
    >
      {children}
    </h2>
  );
}

/** Shopify's square checkbox: black fill with a white tick when checked. */
function CheckBox({ checked, onChange, children, muted = false }) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <span className="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-[4px] border border-forest/35 bg-[#FFFDF9] checked:border-forest checked:bg-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        />
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          className="pointer-events-none absolute h-3 w-3 opacity-0 peer-checked:opacity-100"
        >
          <path
            d="M3.5 8.5l3 3 6-6.5"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className={`text-[14px] ${muted ? "text-forest/60" : "text-forest"}`}>
        {children}
      </span>
    </label>
  );
}

/** Shopify's radio: black ring with a black centre dot when selected. */
function Radio({ checked, onChange, name, value }) {
  return (
    <span className="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-full border border-forest/35 bg-[#FFFDF9] checked:border-[5px] checked:border-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      />
    </span>
  );
}

export default function Checkout() {
  const { items, add } = useCart();
  // Saved addresses come from the account, not this form. Account Settings
  // promises "addresses you can pick from at checkout"; this is the checkout
  // end of that promise.
  const { user, openAuthModal } = useAuth();
  const [marketing, setMarketing] = useState(false);
  const [discount, setDiscount] = useState("");
  const [country, setCountry] = useState("");
  // Contact email is controlled now: the Stripe intent is priced against the
  // basket but keyed to a receipt address, so it cannot open until this is a
  // real-looking email.
  const [email, setEmail] = useState(user?.email ?? "");

  useEffect(() => {
    // Seed from the account once the session resolves, without clobbering
    // anything already typed.
    setEmail((current) => current || user?.email || "");
  }, [user?.email]);

  const formRef = useRef(null);

  // ── Delivery address ───────────────────────────────────────────────────
  // A saved address by id, or "new" for the typed form below it. Empty until
  // the session answers, so the default can be pre-selected once it does.
  const savedAddresses = user?.addresses ?? [];
  const defaultAddressId =
    savedAddresses.find((address) => address.isDefault)?.id ??
    savedAddresses[0]?.id ??
    null;
  const [addressChoice, setAddressChoice] = useState("");
  const [saveAddress, setSaveAddress] = useState(false);

  useEffect(() => {
    // Only ever fills the blank. Once someone has picked, a session refresh
    // must not move their choice back to the default underneath them.
    setAddressChoice((current) => current || defaultAddressId || "new");
  }, [defaultAddressId]);

  const chosenAddress =
    savedAddresses.find((address) => address.id === addressChoice) ?? null;

  // The region (state/province/...) and postal-code fields both vary by
  // country - some countries use neither, so the row below reflows rather
  // than showing an empty box (see src/data/countryFields.js).
  const { region, postal } = country
    ? getCountryFields(country)
    : DEFAULT_COUNTRY_FIELDS;

  const lines = items
    .map((item) => ({ product: PRODUCT_BY_SLUG[item.slug], qty: item.qty }))
    .filter((line) => line.product);

  const units = lines.reduce((sum, line) => sum + line.qty, 0);
  const original = units * DEMO_UNIT_PRICE;
  // The reference applies its promotion automatically at two units, rather
  // than making you type a code for it.
  const promoRate = units >= PROMO_MIN_UNITS ? PROMO_RATE : 0;
  const savings = original * promoRate;
  const subtotal = original - savings;

  const addon = PRODUCTS.find(
    (product) => !items.some((item) => item.slug === product.slug)
  );

  const emailValid = EMAIL_RE.test(email.trim());

  const [errors, setErrors] = useState({});

  /** Scrolls to and focuses the named field, then reports its label's red
   * text underneath via the `errors` state already wired into each
   * FloatField. Only ever called for the highest field still unfilled -
   * never for the "Apartment, suite" box, which is optional. */
  function focusField(name) {
    const field = formRef.current?.elements?.[name];
    if (!field) return;
    field.scrollIntoView({ behavior: "smooth", block: "center" });
    field.focus({ preventScroll: true });
  }

  /** Every required delivery field, in the order they appear on the page -
   * the order "Pay now" checks them in, so the first one it stops on is
   * also the highest one on screen. Skipped entirely when a saved address
   * is chosen, since that address is already complete. */
  const FIELD_ORDER = useMemo(
    () => [
      { name: "firstName", message: "Enter a first name" },
      { name: "lastName", message: "Enter a last name" },
      { name: "address1", message: "Enter an address" },
      { name: "city", message: "Enter a city" },
      ...(region ? [{ name: "province", message: `Select a ${region.label.toLowerCase()}` }] : []),
      ...(postal ? [{ name: "postalCode", message: `Enter a ${postal.label.toLowerCase()}` }] : []),
      { name: "phone", message: "Enter a phone number" },
    ],
    [region, postal]
  );

  /** Validates the typed delivery fields, sets the red text under the first
   * few that are empty, and scrolls/focuses the highest one. Returns true
   * only when every required field has something in it. A saved address
   * needs none of this - it was already filled in to save it. */
  function validateDeliveryFields() {
    if (chosenAddress) {
      setErrors({});
      return true;
    }
    const form = formRef.current;
    if (!form) return true;
    const data = new FormData(form);
    const nextErrors = {};
    let firstInvalid = null;
    for (const field of FIELD_ORDER) {
      const value = (data.get(field.name) ?? "").toString().trim();
      if (!value) {
        nextErrors[field.name] = field.message;
        if (!firstInvalid) firstInvalid = field.name;
      }
    }
    setErrors(nextErrors);
    if (firstInvalid) {
      focusField(firstInvalid);
      return false;
    }
    return true;
  }

  // Changes whenever the basket does, so the payment section can keep the
  // Stripe intent's amount in step.
  const itemsKey = useMemo(
    () =>
      lines
        .map((line) => `${line.product.slug}:${line.qty}`)
        .join("|"),
    [lines]
  );

  /** The typed delivery fields, as an address. Uncontrolled, so read out of
   * the form on demand. */
  function typedAddress() {
    const form = formRef.current;
    if (!form) return null;
    const data = new FormData(form);
    const value = (name) => (data.get(name) ?? "").toString().trim();
    const name = [value("firstName"), value("lastName")].filter(Boolean).join(" ");
    return {
      label: "Delivery address",
      name,
      line1: value("address1"),
      line2: value("address2"),
      city: value("city"),
      postalCode: value("postalCode"),
      country: value("country"),
      phone: value("phone"),
    };
  }

  /** What the payment section posts to price the basket and open the intent.
   * No prices - the server sets those (server/catalog.js). */
  function buildDraft() {
    const draft = {
      items: lines.map((line) => ({ slug: line.product.slug, qty: line.qty })),
    };
    if (chosenAddress) {
      draft.shippingAddressId = chosenAddress.id;
    } else {
      const address = typedAddress();
      if (address && address.name && address.line1 && address.city) {
        draft.shippingAddress = address;
        draft.saveAddress = Boolean(user) && saveAddress;
      }
    }
    return draft;
  }

  return (
    <>
      {/* Cancels the site-wide zoom: 0.85 so every px below is a real px. */}
      <div
        style={{ zoom: "calc(1 / 0.85)" }}
        className="font-sans text-forest antialiased"
      >

        <div className="mx-auto grid max-w-[1334px] grid-cols-1 items-start px-6 py-8 lg:grid-cols-[55fr_45fr] lg:py-[60px]">
          {/* ── LEFT: the form ─────────────────────────────────────────── */}
          <div className="order-2 pb-20 pt-8 lg:order-1 lg:pr-14 lg:pt-6">
            <p className="rounded-[12px] bg-[#FFFDF9] px-5 py-[15px] text-center text-[15px] font-medium">
              <span aria-hidden="true" className="tracking-[-0.08em]">
                ★★★★★
              </span>{" "}
              3,000+ 5 Star Reviews
            </p>

            <ul className="mt-4 grid grid-cols-3 gap-3">
              {BENEFITS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex flex-col items-center justify-center rounded-[12px] bg-[#FFFDF9] px-3 py-8 text-center"
                >
                  {Icon ? (
                    <Icon size={38} strokeWidth={1.3} aria-hidden="true" />
                  ) : (
                    <GuaranteeBadge />
                  )}
                  <p className="mt-3 text-[14px] font-medium leading-[1.35]">{label}</p>
                </li>
              ))}
            </ul>

            <form ref={formRef} noValidate onSubmit={(event) => event.preventDefault()} className="mt-8">
              <div className="flex items-baseline justify-between gap-4">
                <SectionTitle>Contact</SectionTitle>
                {user ? (
                  <span className="text-[14px] text-forest/60">
                    Signed in as {user.email}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => openAuthModal("signin")}
                    className="text-[14px] underline underline-offset-[3px]"
                  >
                    Sign in
                  </button>
                )}
              </div>

              <div className="mt-4 space-y-3">
                <FloatField
                  label="Email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  suffix={<HelpCircle size={17} strokeWidth={1.5} aria-hidden="true" />}
                />
                <CheckBox
                  checked={marketing}
                  onChange={(event) => setMarketing(event.target.checked)}
                >
                  Email me with news and offers
                </CheckBox>
              </div>

              <SectionTitle className="mt-9">Delivery</SectionTitle>

              {/* The account's address book, offered before the form. It only
                  appears when there is something in it, so a guest and a new
                  account see exactly the checkout they saw before. */}
              {savedAddresses.length > 0 && (
                <div
                  role="radiogroup"
                  aria-label="Delivery address"
                  className="mt-4"
                >
                  {savedAddresses.map((address, index) => (
                    <label
                      key={address.id}
                      className={`flex cursor-pointer items-start gap-3 border border-b-0 border-forest/20 bg-white px-4 py-[14px] transition-colors ${
                        index === 0 ? "rounded-t-[12px]" : ""
                      } ${addressChoice === address.id ? "border-forest" : ""}`}
                    >
                      <span className="pt-0.5">
                        <Radio
                          name="deliveryAddress"
                          value={address.id}
                          checked={addressChoice === address.id}
                          onChange={() => setAddressChoice(address.id)}
                        />
                      </span>
                      <span className="flex-1 text-[14px] leading-[1.5]">
                        <span className="flex items-center gap-2 font-medium">
                          {address.label}
                          {address.isDefault && (
                            <span className="rounded-full bg-[#E8EDE4] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em]">
                              Default
                            </span>
                          )}
                        </span>
                        <span className="mt-1 block text-forest/65">
                          {address.name}, {address.line1}
                          {address.line2 ? `, ${address.line2}` : ""},{" "}
                          {[address.city, address.postalCode]
                            .filter(Boolean)
                            .join(" ")}
                          {address.country ? `, ${address.country}` : ""}
                        </span>
                      </span>
                    </label>
                  ))}
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-b-[12px] border border-forest/20 bg-white px-4 py-[14px] transition-colors ${
                      addressChoice === "new" ? "border-forest" : ""
                    }`}
                  >
                    <Radio
                      name="deliveryAddress"
                      value="new"
                      checked={addressChoice === "new"}
                      onChange={() => setAddressChoice("new")}
                    />
                    <span className="flex-1 text-[14px]">
                      Deliver somewhere else
                    </span>
                  </label>
                  <p className="mt-2 text-[13px] text-forest/55">
                    Saved addresses come from your account, and are managed in{" "}
                    <Link
                      href="/account/settings/"
                      className="underline underline-offset-[3px]"
                    >
                      Account settings
                    </Link>
                  </p>
                </div>
              )}

              {/* Hidden, not disabled, when a saved address is chosen: an
                  empty form under a chosen address is a second answer to a
                  question already answered. */}
              <div className={`mt-4 space-y-3 ${chosenAddress ? "hidden" : ""}`}>
                <FloatField
                  label="Country/Region"
                  as="select"
                  options={COUNTRIES}
                  name="country"
                  autoComplete="country-name"
                  onChange={(event) => setCountry(event.target.value)}
                />
                <div className="grid grid-cols-2 gap-3">
                  <FloatField
                    label="First name"
                    name="firstName"
                    autoComplete="given-name"
                    error={errors.firstName}
                    onChange={() => setErrors((current) => ({ ...current, firstName: undefined }))}
                  />
                  <FloatField
                    label="Last name"
                    name="lastName"
                    autoComplete="family-name"
                    error={errors.lastName}
                    onChange={() => setErrors((current) => ({ ...current, lastName: undefined }))}
                  />
                </div>
                <FloatField
                  label="Address"
                  name="address1"
                  autoComplete="address-line1"
                  error={errors.address1}
                  onChange={() => setErrors((current) => ({ ...current, address1: undefined }))}
                />
                <FloatField
                  label="Apartment, suite, etc. (optional)"
                  name="address2"
                  autoComplete="address-line2"
                />
                {/* City always shows. Region and postal code each show only
                    when the selected country has that concept - when one is
                    missing, City widens instead of leaving an empty box, and
                    when both are missing City runs the full row alone. */}
                <div
                  className={`grid gap-3 ${
                    region && postal
                      ? "grid-cols-3"
                      : region || postal
                      ? "grid-cols-[2fr_1fr]"
                      : "grid-cols-1"
                  }`}
                >
                  <FloatField
                    label="City"
                    name="city"
                    autoComplete="address-level2"
                    error={errors.city}
                    onChange={() => setErrors((current) => ({ ...current, city: undefined }))}
                  />
                  {region &&
                    (region.options ? (
                      <FloatField
                        key={`region-${country}`}
                        label={region.label}
                        as="select"
                        options={region.options}
                        name="province"
                        autoComplete="address-level1"
                        error={errors.province}
                        onChange={() => setErrors((current) => ({ ...current, province: undefined }))}
                      />
                    ) : (
                      <FloatField
                        key={`region-${country}`}
                        label={region.label}
                        name="province"
                        autoComplete="address-level1"
                        error={errors.province}
                        onChange={() => setErrors((current) => ({ ...current, province: undefined }))}
                      />
                    ))}
                  {postal && (
                    <FloatField
                      key={`postal-${country}`}
                      label={postal.label}
                      name="postalCode"
                      inputMode={postal.numeric ? "numeric" : "text"}
                      autoComplete="postal-code"
                      error={errors.postalCode}
                      onChange={() => setErrors((current) => ({ ...current, postalCode: undefined }))}
                    />
                  )}
                </div>
                <FloatField
                  label="Phone"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  error={errors.phone}
                  onChange={() => setErrors((current) => ({ ...current, phone: undefined }))}
                />

                {/* Only an account has an address book to add to, so a guest
                    is not offered a box that would do nothing. */}
                {user && (
                  <CheckBox
                    checked={saveAddress}
                    onChange={(event) => setSaveAddress(event.target.checked)}
                  >
                    Save this address to my account
                  </CheckBox>
                )}
              </div>

              <SectionTitle className="mt-9">Shipping method</SectionTitle>
              <p className="mt-3 rounded-[12px] border border-forest/20 bg-[#FFFDF9] px-5 py-6 text-center text-[14px] text-forest/60">
                Enter your shipping address to view available shipping methods
              </p>

              {/* ── Payment, on Stripe ─────────────────────────────────── */}
              <StripePaymentSection
                email={email.trim()}
                emailValid={emailValid}
                cartEmpty={lines.length === 0}
                buildDraft={buildDraft}
                itemsKey={itemsKey}
                validateDeliveryFields={validateDeliveryFields}
              />
            </form>

            <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 border-t border-forest/15 pt-5">
              {FOOTER_LINKS.map((link) => (
                <li key={link}>
                  <button
                    type="button"
                    className="text-[13px] text-forest/60 underline underline-offset-[3px]"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── RIGHT: the order summary ───────────────────────────────── */}
          <div className="order-1 pt-8 lg:sticky lg:top-[90px] lg:order-2 lg:self-start lg:border-l lg:border-forest/15 lg:min-h-screen lg:pl-14 lg:pt-6">
            <h2 className="sr-only">Order summary</h2>

            {lines.length === 0 ? (
              <p className="text-[14px] text-forest/60">
                Your cart is empty.{" "}
                <Link href="/products/" className="underline underline-offset-[3px]">
                  Browse the products
                </Link>
                .
              </p>
            ) : (
              <>
                <ul className="space-y-4">
                  {lines.map((line) => (
                    <li key={line.product.slug} className="flex items-start gap-4">
                      <div className="relative h-16 w-16 shrink-0 rounded-[10px] border border-forest/15 bg-[#FFFDF9] p-0.5">
                        <Picture
                          avif={line.product.thumb.avif}
                          webp={line.product.thumb.webp}
                          alt={line.product.alt}
                          width={64}
                          height={64}
                          imgClassName="h-full w-full object-contain"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-[14px] font-medium leading-snug">
                          {line.product.name}
                        </p>
                        {promoRate > 0 && (
                          <p className="mt-1 flex items-start gap-1.5 text-[13px] leading-[1.35] text-forest/60">
                            <Tag
                              size={13}
                              strokeWidth={1.6}
                              aria-hidden="true"
                              className="mt-[3px] shrink-0"
                            />
                            <span>
                              LAUNCH OFFER, 20% OFF 2 OR MORE (-
                              {baht(savings)})
                            </span>
                          </p>
                        )}
                      </div>

                      <div className="shrink-0 text-right">
                        {promoRate > 0 && (
                          <p className="text-[12px] text-forest/60 line-through">
                            {baht(original)}
                          </p>
                        )}
                        <p className="text-[15px] font-medium">{baht(subtotal)}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                {addon && (
                  <div className="mt-5 rounded-[12px] bg-[#FFFDF9] p-4">
                    <h3 className="text-[16px] font-medium text-forest">
                      Complete your routine
                    </h3>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="h-[52px] w-[52px] shrink-0 rounded-[10px] bg-[#FFFDF9] p-0.5">
                        <Picture
                          avif={addon.thumb.avif}
                          webp={addon.thumb.webp}
                          alt={addon.alt}
                          width={52}
                          height={52}
                          imgClassName="h-full w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[14px] font-medium leading-snug">
                          {addon.name}
                        </p>
                        <p className="mt-0.5 text-[13px] text-forest/60">
                          THB {DEMO_ADDON_PRICE.toFixed(2)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => add(addon.slug, 1, addon.name)}
                        className="h-[45px] shrink-0 rounded-[10px] bg-forest px-5 text-[14px] font-medium text-cream transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}

                <div className="mt-5 flex gap-3">
                  <input
                    value={discount}
                    onChange={(event) => setDiscount(event.target.value)}
                    placeholder="Discount code"
                    aria-label="Discount code"
                    className="h-[50px] flex-1 rounded-[12px] border border-forest/15 bg-[#FFFDF9] px-[11px] text-[14px] outline-none placeholder:text-forest/60 checkout-field focus:border-[#9A9A9A]"
                  />
                  <button
                    type="button"
                    disabled={!discount.trim()}
                    className="h-[50px] w-[92px] shrink-0 rounded-[12px] bg-[#FFFDF9] font-sans text-[13px] font-bold uppercase tracking-[0.08em] text-forest/60 transition-colors disabled:cursor-not-allowed enabled:bg-forest enabled:text-cream enabled:hover:opacity-90"
                  >
                    Apply
                  </button>
                </div>

                <dl className="mt-7 space-y-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-[14px]">
                      Subtotal &middot; {units} {units === 1 ? "item" : "items"}
                    </dt>
                    <dd className="text-[14px] font-medium">{baht(subtotal)}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="flex items-center gap-1.5 text-[14px]">
                      Shipping
                      <HelpCircle
                        size={15}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className="text-forest/60"
                      />
                    </dt>
                    <dd className="text-[14px] text-forest/60">Enter shipping address</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 pt-2">
                    <dt className="text-[20px] font-medium text-forest">Total</dt>
                    <dd className="flex items-baseline gap-2">
                      <span className="text-[12px] text-forest/60">THB</span>
                      <span className="text-[24px] font-semibold">{baht(subtotal)}</span>
                    </dd>
                  </div>
                </dl>

                {savings > 0 && (
                  <p className="mt-2 flex items-center gap-2 text-[14px] font-medium">
                    <Tag size={15} strokeWidth={1.6} aria-hidden="true" />
                    <span>TOTAL SAVINGS</span>
                    <span>{baht(savings)}</span>
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
