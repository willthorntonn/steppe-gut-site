import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Check } from "lucide-react";
import PageMeta from "../components/ui/PageMeta";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import { BODY, BODY_SM, DISPLAY, H4 } from "../styles/type";

// cart-and-checkout.md §4. Full chrome is restored here — exits are removed
// at the point of payment and given straight back afterwards.
//
// Reachable only with confirmation state in the router location. A direct
// visit redirects to "/" rather than rendering a thank-you for an order that
// was never placed. In practice nothing can reach it yet, because payment is
// disabled — the route exists so that turning payment on is a change to
// Checkout alone.
const NEXT_STEPS = [
  {
    title: "It will arrive in two to four working days",
    body: "You will get a tracking link when it ships.",
  },
  {
    title: "Start the morning after it arrives",
    body: "One sachet in 100 ml of cool water. There is nothing to build up to.",
  },
  {
    title: "Give it a few weeks",
    body: "Take it daily and judge for yourself. We are not going to tell you when to expect anything.",
  },
];

export default function Confirmation() {
  const location = useLocation();
  const order = location.state?.order;

  // Focus moves to the heading on load and the confirmation is announced.
  useEffect(() => {
    if (!order) return;
    document.getElementById("page-title")?.focus({ preventScroll: true });
  }, [order]);

  if (!order) return <Navigate to="/" replace />;

  return (
    <>
      <PageMeta title="Thank you · Steppe Gut" noindex />

      <div
        data-navtheme="light"
        className="bg-cream pb-28 pt-[132px] lg:pb-40 lg:pt-[200px]"
      >
        <Container width="narrow">
          <span
            aria-hidden="true"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E8EDE4]"
          >
            <Check size={28} strokeWidth={1.75} className="text-forest" />
          </span>

          <div aria-live="polite">
            <h1
              id="page-title"
              tabIndex={-1}
              className="mt-8 font-serif font-normal text-forest outline-none"
              style={DISPLAY}
            >
              Thank you
            </h1>
            <p
              className="mt-7 max-w-[46ch] font-serif text-forest/75"
              style={BODY}
            >
              Your order is confirmed and we have emailed the details to you.
            </p>
            {/* Real, selectable text — never an image. */}
            <p className="mt-6 font-sans text-lg font-semibold text-forest">
              Order {order}
            </p>
          </div>

          <ul className="mt-14 space-y-4">
            {NEXT_STEPS.map((step) => (
              <li
                key={step.title}
                className="rounded-2xl border border-forest/12 bg-[#FFFDF9] p-7"
              >
                <h2 className="font-serif font-normal text-forest" style={H4}>
                  {step.title}
                </h2>
                <p
                  className="mt-3 font-serif text-forest/75"
                  style={BODY_SM}
                >
                  {step.body}
                </p>
              </li>
            ))}
          </ul>

          <Button
            to="/ingredients-sourcing/"
            variant="outline-forest"
            radius="2xl"
            size="default"
            className="mt-12"
          >
            What is in it
          </Button>
        </Container>
      </div>
    </>
  );
}
