"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { writeConfirmation } from "../checkout/confirmationState";
import { BadgePercent, HelpCircle, Lock, Tag, Users } from "lucide-react";
import FloatField from "../components/checkout/brick/FloatField";
import { AmexMark } from "../components/checkout/brick/marks";
import Picture from "../components/ui/Picture";
import { useCart } from "../cart/CartProvider";
import { useOrders } from "../orders/OrdersProvider";
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

// Same badge assets and framing the product page uses (FybelleLayout /
// src/data/payments.js) - every payment mark on checkout other than Amex
// (no real asset for that one, so its hand-drawn SVG stays) now matches the
// icons shown on the product page one-for-one, instead of the earlier
// hand-drawn stand-in marks for Visa/Mastercard/PromptPay/TrueMoney.
import applepayLogo from "../assets/payment/applepay.png";
import googlepayLogo from "../assets/payment/googlepay.png";
import mastercardLogo from "../assets/payment/mastercard.png";
import promptpayLogo from "../assets/payment/promptpay.png";
import truemoneyLogo from "../assets/payment/truemoney.png";
import visaLogo from "../assets/payment/visa.png";

/** Small payment badge chip - same 1.6-aspect, white, bordered treatment as
 * the product page's `.sg-fyb__pay-badge`. */
function PayBadge({ src, label, className = "" }) {
  return (
    <span
      className={`inline-flex h-6 w-[38px] shrink-0 items-center justify-center overflow-hidden rounded-[3px] border border-black/10 bg-white ${className}`}
    >
      <img src={src} alt={label} className="h-full w-full object-cover" />
    </span>
  );
}

/** Full-width express-checkout button using the real Apple Pay / Google Pay
 * mark, on the same white/bordered chip treatment as the product page's
 * payment badges, just scaled up to button size. The mark is contained and
 * modestly sized rather than stretched to fill the button. */
function ExpressPayButton({ src, label, borderClassName = "border-black/12" }) {
  return (
    <button
      type="button"
      className={`flex h-[50px] w-full items-center justify-center rounded-[10px] border bg-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${borderClassName}`}
    >
      <span className="sr-only">Pay with {label}</span>
      <img src={src} alt="" aria-hidden="true" className="h-11 w-auto object-contain" />
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// A getbrick.com-STRUCTURED CHECKOUT, RE-SKINNED IN STEPPE GUT'S IDENTITY.
//
// Layout, spacing, sizing and every feature (express-checkout row, floating
// labels, payment method switcher, discount code, cross-sell card, savings
// line) are still a pixel-for-pixel structural copy of the reference
// checkout - only colour and type changed. Colours are Tailwind's forest /
// cream / gold tokens (design-tokens.js); type is font-serif (EB Garamond)
// for headings and font-sans (Inter) for everything else, matching the rest
// of the site. Sizes, radii and px-based layout intentionally were not
// touched, so this still ignores 03_design_system.md's own spacing/radius
// scale - it is Brick's measurements wearing Steppe Gut's palette.
//
// It also cancels the site-wide `zoom: 0.85` (see index.css) with an inverse
// zoom on the wrapper, so the px values below are real px and line up with
// the reference one-for-one.
//
// Two things could not be copied and are stand-ins:
//   · Brand marks (Visa/Mastercard/Amex/Shop/PayPal/Klarna) are drawn as
//     approximations in brick/marks.jsx - the official artwork is not in the
//     repo. Their colours are the real third-party brand colours and were
//     deliberately left alone: recolouring someone else's payment mark would
//     misrepresent it.
//   · Product names and images come from our own products.js, because the
//     reference's product photography is not ours to take.
//
// PAYMENT IS STILL NOT CONNECTED. No card is charged, no processor is called,
// and every payment control below is a stand-in.
//
// One thing here is real and did change: pressing "Pay now" records the order
// with the account API (server/), against the signed-in account. The basket is
// priced by the server, not by this page, and the delivery address is either
// one picked from the account's address book or one typed here. A signed-out
// visitor still gets the confirmation screen with nothing recorded, because
// there is no account to record it against.
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

// Payment method options below the Credit Card option.
// Express checkout (Apple Pay, Google Pay) handled separately above.
const ALT_METHODS = [
  {
    id: "promptpay",
    label: "PromptPay",
    note: null,
    mark: <PayBadge src={promptpayLogo} label="PromptPay" />,
  },
  {
    id: "truemoney",
    label: "TrueMoney",
    note: null,
    mark: <PayBadge src={truemoneyLogo} label="TrueMoney" />,
  },
];

const FOOTER_LINKS = [
  "Refund policy",
  "Shipping",
  "Privacy policy",
  "Terms of service",
  "Contact",
];

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
  const router = useRouter();
  const { items, add, clear } = useCart();
  const { placeOrder } = useOrders();
  // Saved addresses come from the account, not this form. Account Settings
  // promises "addresses you can pick from at checkout"; this is the checkout
  // end of that promise.
  const { user, openAuthModal } = useAuth();
  const [method, setMethod] = useState("");
  const [billingSame, setBillingSame] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [discount, setDiscount] = useState("");
  const [country, setCountry] = useState("");
  const [billingCountry, setBillingCountry] = useState("");
  // Toggled by the Save / Not now control below the payment section - Save
  // switches the copy to the agreement text a real Shop-account save would
  // require; Not now switches it back.
  const [saveInfo, setSaveInfo] = useState(false);

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
  const [placing, setPlacing] = useState(false);
  const [orderError, setOrderError] = useState("");

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

  const { region: billingRegion, postal: billingPostal } = billingCountry
    ? getCountryFields(billingCountry)
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

  /** The typed delivery fields, as an address. Uncontrolled, so read out. */
  function typedAddress(form) {
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
      phone: "",
    };
  }

  async function handleSubmit(event) {
    // Payment is still not connected - no card is charged and nothing is sent
    // to a processor. What is real is the order: the basket is priced and
    // recorded by the account API against the signed-in account, and My
    // Orders reads it back from there.
    //
    // Note what is not sent: no prices. The browser says which products, how
    // many and where to; the server decides what that costs
    // (server/catalog.js), which is why DEMO_UNIT_PRICE is no longer read
    // here.
    event.preventDefault();
    const form = event.currentTarget;
    setOrderError("");

    const draft = {
      items: lines.map((line) => ({ slug: line.product.slug, qty: line.qty })),
    };

    if (chosenAddress) {
      draft.shippingAddressId = chosenAddress.id;
    } else {
      const address = typedAddress(form);
      const complete = address.name && address.line1 && address.city;
      if (complete) {
        draft.shippingAddress = address;
        draft.saveAddress = Boolean(user) && saveAddress;
      } else if (user && saveAddress) {
        // Only blocking when the visitor asked for the address to be kept -
        // an incomplete one is otherwise no reason to refuse a checkout that
        // charges nothing.
        setOrderError("Fill in the name, address and city to save this address");
        return;
      }
    }

    setPlacing(true);
    try {
      const order = await placeOrder(draft);
      clear();
      // A signed-out checkout has nothing to record against, so it lands on
      // the same thank-you without an order number to point at.
      writeConfirmation({ placed: true, order: order?.id ?? null });
      router.push("/checkout/confirmation/");
    } catch (failure) {
      setOrderError(failure.message ?? "That order could not be placed, try again");
    } finally {
      setPlacing(false);
    }
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

            <h2 className="mt-8 text-center text-[14px] text-forest/60">
              Express checkout
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <ExpressPayButton src={applepayLogo} label="Apple Pay" borderClassName="border-black" />
              <ExpressPayButton src={googlepayLogo} label="Google Pay" />
            </div>

            <div className="my-7 flex items-center gap-4">
              <span className="h-px flex-1 bg-forest/15" />
              <span className="text-[13px] text-forest/60">OR</span>
              <span className="h-px flex-1 bg-forest/15" />
            </div>

            <form noValidate onSubmit={handleSubmit}>
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
                  // Uncontrolled, so the account's address is seeded rather
                  // than bound - and re-seeded if the session arrives late.
                  key={user?.email ?? "guest"}
                  defaultValue={user?.email ?? ""}
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
                  <FloatField label="First name" name="firstName" autoComplete="given-name" />
                  <FloatField label="Last name" name="lastName" autoComplete="family-name" />
                </div>
                <FloatField label="Address" name="address1" autoComplete="address-line1" />
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
                  <FloatField label="City" name="city" autoComplete="address-level2" />
                  {region &&
                    (region.options ? (
                      <FloatField
                        key={`region-${country}`}
                        label={region.label}
                        as="select"
                        options={region.options}
                        name="province"
                        autoComplete="address-level1"
                      />
                    ) : (
                      <FloatField
                        key={`region-${country}`}
                        label={region.label}
                        name="province"
                        autoComplete="address-level1"
                      />
                    ))}
                  {postal && (
                    <FloatField
                      key={`postal-${country}`}
                      label={postal.label}
                      name="postalCode"
                      inputMode={postal.numeric ? "numeric" : "text"}
                      autoComplete="postal-code"
                    />
                  )}
                </div>

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

              <SectionTitle className="mt-9">Payment</SectionTitle>
              <p className="mt-1.5 text-[14px] text-forest/60">
                All transactions are secure and encrypted
              </p>

              <div
                role="radiogroup"
                aria-label="Payment method"
                className="mt-4 space-y-0"
              >
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-t-[12px] border px-4 py-[14px] transition-colors ${
                    method === "card"
                      ? "border-forest bg-white"
                      : "border-forest/20 bg-white"
                  }`}
                >
                  <Radio
                    name="payment"
                    value="card"
                    checked={method === "card"}
                    onChange={() => setMethod("card")}
                  />
                  <span className="flex-1 text-[14px]">Credit card</span>
                  <span className="flex items-center gap-1.5">
                    <PayBadge src={visaLogo} label="Visa" />
                    <PayBadge src={mastercardLogo} label="Mastercard" />
                    <AmexMark />
                    <span className="text-[12px] text-forest/60">+5</span>
                  </span>
                </label>

                {method === "card" && (
                  <div className="space-y-3 border border-t-0 border-forest/20 bg-forest/5 px-4 py-4">
                    <FloatField
                      label="Card number"
                      name="cardNumber"
                      inputMode="numeric"
                      suffix={<Lock size={16} strokeWidth={1.6} aria-hidden="true" />}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <FloatField
                        label="Expiration date (MM / YY)"
                        name="cardExpiry"
                        inputMode="numeric"
                      />
                      <FloatField
                        label="Security code"
                        name="cardCvc"
                        inputMode="numeric"
                        suffix={
                          <HelpCircle size={17} strokeWidth={1.5} aria-hidden="true" />
                        }
                      />
                    </div>
                    <FloatField label="Name on card" name="cardName" autoComplete="cc-name" />
                    <div className="pt-1">
                      <CheckBox
                        checked={billingSame}
                        onChange={(event) => setBillingSame(event.target.checked)}
                      >
                        Use shipping address as billing address
                      </CheckBox>
                    </div>

                    {!billingSame && (
                      <div className="mt-4 pt-4">
                        <h3 className="font-sans text-[15px] font-semibold text-forest">
                          Billing address
                        </h3>
                        <div className="mt-3 space-y-3">
                          <FloatField
                            label="Country/Region"
                            as="select"
                            options={COUNTRIES}
                            name="billingCountry"
                            autoComplete="country-name"
                            onChange={(event) => setBillingCountry(event.target.value)}
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <FloatField label="First name" name="billingFirstName" autoComplete="given-name" />
                            <FloatField label="Last name" name="billingLastName" autoComplete="family-name" />
                          </div>
                          <FloatField label="Address" name="billingAddress1" autoComplete="address-line1" />
                          <FloatField
                            label="Apartment, suite, etc. (optional)"
                            name="billingAddress2"
                            autoComplete="address-line2"
                          />
                          <div
                            className={`grid gap-3 ${
                              billingRegion && billingPostal
                                ? "grid-cols-3"
                                : billingRegion || billingPostal
                                ? "grid-cols-[2fr_1fr]"
                                : "grid-cols-1"
                            }`}
                          >
                            <FloatField label="City" name="billingCity" autoComplete="address-level2" />
                            {billingRegion &&
                              (billingRegion.options ? (
                                <FloatField
                                  key={`billing-region-${billingCountry}`}
                                  label={billingRegion.label}
                                  as="select"
                                  options={billingRegion.options}
                                  name="billingProvince"
                                  autoComplete="address-level1"
                                />
                              ) : (
                                <FloatField
                                  key={`billing-region-${billingCountry}`}
                                  label={billingRegion.label}
                                  name="billingProvince"
                                  autoComplete="address-level1"
                                />
                              ))}
                            {billingPostal && (
                              <FloatField
                                key={`billing-postal-${billingCountry}`}
                                label={billingPostal.label}
                                name="billingPostalCode"
                                inputMode={billingPostal.numeric ? "numeric" : "text"}
                                autoComplete="postal-code"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {ALT_METHODS.map((alt, idx) => (
                  <label
                    key={alt.id}
                    className={`flex cursor-pointer items-center gap-3 border px-4 py-[14px] transition-colors ${
                      idx === ALT_METHODS.length - 1 ? "rounded-b-[12px]" : ""
                    } ${
                      method === alt.id
                        ? "border-forest bg-white"
                        : "border-forest/20 bg-white"
                    }`}
                  >
                    <Radio
                      name="payment"
                      value={alt.id}
                      checked={method === alt.id}
                      onChange={() => setMethod(alt.id)}
                    />
                    <span className="flex-1 text-[14px]">
                      {alt.label}
                      {alt.note && (
                        <>
                          <span aria-hidden="true" className="px-1.5 text-forest/60">
                            •
                          </span>
                          <span className="text-forest/60">{alt.note}</span>
                        </>
                      )}
                    </span>
                    {alt.mark}
                  </label>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between gap-8">
                <div>
                  <p className="text-[15px] font-semibold leading-[1.3]">
                    Save my information for a faster checkout
                  </p>
                  {saveInfo ? (
                    <p className="mt-1 max-w-[68ch] text-[13px] leading-[1.5] text-forest/60">
                      By paying, you agree to our{" "}
                      <button type="button" className="underline underline-offset-[3px]">
                        Terms
                      </button>{" "}
                      and{" "}
                      <button type="button" className="underline underline-offset-[3px]">
                        Privacy Policy
                      </button>{" "}
                      subject to Stripe&rsquo;s secure processing standards.
                    </p>
                  ) : (
                    <p className="mt-1 max-w-[68ch] text-[13px] leading-[1.5] text-forest/60">
                      Get secure checkout and sign in on Steppe Gut LLC and millions of
                      stores with a Link account
                    </p>
                  )}
                </div>
                {saveInfo ? (
                  <button
                    type="button"
                    onClick={() => setSaveInfo(false)}
                    className="flex h-[50px] shrink-0 items-center justify-center whitespace-nowrap text-[15px] font-semibold text-forest"
                  >
                    Not now
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSaveInfo(true)}
                    className="flex h-[50px] shrink-0 items-center justify-center rounded-[12px] border border-black/15 bg-white px-6 text-[15px] font-bold text-[#0A3FB0] transition-colors hover:bg-black/[0.02]"
                  >
                    Save
                  </button>
                )}
              </div>

              {orderError && (
                <p role="alert" className="mt-6 text-[14px] text-[#8C3A2B]">
                  {orderError}
                </p>
              )}

              <button
                type="submit"
                disabled={placing}
                className="mt-7 h-[52px] w-full rounded-[12px] bg-forest font-sans text-[15px] font-bold uppercase tracking-[0.08em] text-cream transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-60"
              >
                {placing ? "Placing your order" : "Pay now"}
              </button>

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
