import { Link } from "react-router-dom";
import PageMeta from "../components/ui/PageMeta";
import Container from "../components/ui/Container";
import Field from "../components/ui/Field";
import Button from "../components/ui/Button";
import OrderSummary from "../components/cart/OrderSummary";
import { useCart } from "../cart/CartProvider";
import { PRODUCT_BY_SLUG } from "../data/products";
import { BODY, BODY_SM, CAPTION, DISPLAY, H4 } from "../styles/type";

// cart-and-checkout.md §3.
//
// ── FRONTEND SHELL. NOTHING HERE TRANSMITS ANYTHING. ──────────────────────
// There is no backend. Every field is disabled, the submit button is
// disabled, the <form> has no action and no onSubmit handler, and no
// analytics or third-party call is wired to any of it. The page collects
// nothing.
//
// This is not laziness about validation — it is the rule stated in
// cart-and-checkout.md §3 and repeated in the project constraints: a checkout
// that accepts personal details and does nothing with them, without saying
// so, is both a trust failure and a data-protection problem.
//
// When payment goes live the changes are: drop `disabled` from the fieldsets
// and the submit, remove the notice, add validation, and point a handler at
// the provider. The markup, labels, autocomplete attributes and layout all
// stay.
//
// One page with three titled sections, not a multi-step wizard: two extra
// page transitions for eleven fields is two extra chances to abandon.

// Thai addressing is sub-district / district / province. A Western
// city/state/zip form with translated labels is the wrong field structure and
// Thai users notice immediately.
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

export default function Checkout() {
  const { items } = useCart();
  const lines = items
    .map((item) => ({ product: PRODUCT_BY_SLUG[item.slug], qty: item.qty }))
    .filter((line) => line.product);

  return (
    <>
      <PageMeta title="Checkout · Steppe Gut" noindex />

      <Container width="content" className="pb-24 pt-14 lg:pb-32 lg:pt-20">
        <h1
          id="page-title"
          tabIndex={-1}
          className="font-serif font-normal text-forest outline-none"
          style={{ ...DISPLAY, fontSize: "clamp(2.4rem, 4vw, 3.6rem)" }}
        >
          Checkout
        </h1>

        {lines.length === 0 && (
          <p className="mt-7 font-serif text-forest/75" style={BODY}>
            Your basket is empty.{" "}
            <Link
              to="/products/"
              className="underline decoration-gold decoration-2 underline-offset-4"
            >
              See the products
            </Link>
            .
          </p>
        )}

        {/* The notice sits above the form, not below it. A visitor must know
            the form does nothing before they start filling it in, not after.
            It is visible text in the document flow — never a tooltip or a
            title attribute. */}
        <div
          role="note"
          className="mt-10 rounded-2xl border-2 border-[#8C3A2B]/35 bg-[#FFFDF9] p-7 lg:p-8"
        >
          <h2 className="font-serif font-normal text-forest" style={H4}>
            Payment is not yet enabled
          </h2>
          <p
            className="mt-4 max-w-[62ch] font-serif text-forest/80"
            style={BODY_SM}
          >
            This site is live ahead of launch. The form below will not take
            payment and will not place an order, so it is disabled and sends
            nothing anywhere — please do not enter your details. It is shown so
            you can see what ordering will involve. When payment goes live this
            notice will be replaced.
          </p>
          <p className="mt-4 font-sans text-forest/65" style={CAPTION}>
            If you want to order before then, email{" "}
            <a
              className="underline decoration-gold decoration-2 underline-offset-4"
              href="mailto:info@s72strategic.com"
            >
              info@s72strategic.com
            </a>
            .
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[58fr_42fr] lg:gap-16">
          <form
            // No action, no method, no onSubmit. Nothing is transmitted.
            noValidate
            aria-describedby="checkout-disabled-note"
          >
            <p id="checkout-disabled-note" className="sr-only">
              This checkout form is disabled. Payment is not enabled yet and no
              information entered here is sent or stored.
            </p>

            <fieldset disabled className="border-0 p-0">
              <legend className="sr-only">Contact details</legend>
              <SectionHeading step="01">Contact</SectionHeading>
              <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Field
                  label="Email address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
                <Field
                  label="Phone number"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                />
              </div>
              <label className="mt-6 flex items-start gap-3">
                {/* Unchecked by default. A pre-checked marketing box is not
                    consent. */}
                <input
                  type="checkbox"
                  name="marketing"
                  className="mt-1 h-5 w-5 shrink-0 rounded border-forest/30"
                />
                <span className="font-sans text-sm text-forest/75">
                  Email me about Steppe Gut
                </span>
              </label>
            </fieldset>

            <fieldset disabled className="mt-14 border-0 p-0">
              <legend className="sr-only">Delivery address</legend>
              <SectionHeading step="02">Delivery</SectionHeading>
              <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Field
                  label="Full name"
                  name="name"
                  autoComplete="name"
                  required
                  className="sm:col-span-2"
                />
                <Field
                  label="Address line 1"
                  name="address1"
                  autoComplete="address-line1"
                  required
                  className="sm:col-span-2"
                />
                <Field
                  label="Address line 2"
                  name="address2"
                  autoComplete="address-line2"
                  className="sm:col-span-2"
                />
                <Field
                  label="Sub-district"
                  name="subdistrict"
                  autoComplete="address-level3"
                  required
                />
                <Field
                  label="District"
                  name="district"
                  autoComplete="address-level2"
                  required
                />
                <Field
                  label="Province"
                  name="province"
                  as="select"
                  options={PROVINCES}
                  autoComplete="address-level1"
                  required
                />
                <Field
                  label="Postcode"
                  name="postcode"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  required
                />
                <Field
                  label="Delivery notes"
                  name="notes"
                  as="textarea"
                  rows={4}
                  className="sm:col-span-2"
                />
              </div>
            </fieldset>

            <fieldset disabled className="mt-14 border-0 p-0">
              <legend className="sr-only">Payment method</legend>
              <SectionHeading step="03">Payment</SectionHeading>
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
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      className="h-5 w-5"
                    />
                    <span className="font-sans text-base text-forest/50">
                      {method}
                    </span>
                  </label>
                ))}
              </div>
              {/* Official PromptPay, bank and card marks are not rendered:
                  the supplied assets are not in the repo, and redrawing a
                  payment mark is not permitted. They drop in here when
                  supplied. */}
            </fieldset>

            <Button
              type="submit"
              variant="forest"
              radius="2xl"
              disabled
              className="mt-12 h-14 w-full cursor-not-allowed text-[18px] opacity-45"
            >
              Place order
            </Button>
            <p className="mt-4 font-sans text-forest/55" style={CAPTION}>
              Ordering is not available yet. Nothing on this page is submitted
              or stored.
            </p>
          </form>

          <div className="lg:sticky lg:top-10 lg:self-start">
            <OrderSummary />
            {lines.length > 0 && (
              <ul className="mt-6 space-y-3">
                {lines.map((line) => (
                  <li
                    key={line.product.slug}
                    className="flex justify-between gap-4 font-sans text-sm text-forest/70"
                  >
                    <span>
                      {line.product.name} × {line.qty}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
