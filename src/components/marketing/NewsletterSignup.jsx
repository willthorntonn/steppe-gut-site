import { useEffect, useRef, useState } from "react";
import Section from "../ui/Section";
import Container from "../ui/Container";
import FloatField from "../checkout/brick/FloatField";

// Same layout as the reference Shopify block - centred heading, lead line,
// bordered input, solid button - rebuilt in the site's own forest/cream/gold
// palette instead of the generic black-on-grey defaults. Shared by the
// products landing page and the cart, so the sign-up block reads the same in
// both places (05_component_library.md, reuse map).
//
// Confirm flow: submitting reloads the page (the reference block does a real
// round-trip), then on the fresh load the section shows the acknowledgement
// and the window glides back down to it slowly enough to follow by eye. The
// one bit of state that has to survive the reload is "did they just sign up",
// which rides across in sessionStorage.
const CONFIRM_KEY = "sg:newsletter-confirmed";
const NAV_OFFSET = 96;

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef(null);
  // Whether this load is the one that follows a sign-up. Read from
  // sessionStorage exactly once and held here so StrictMode's double-invoke
  // of the effect (dev) - setup, cleanup, setup - still reschedules the
  // scroll on the second setup rather than seeing an already-cleared flag.
  const followsSignUp = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) return;
    try {
      sessionStorage.setItem(CONFIRM_KEY, "1");
    } catch {
      // Private-mode or storage disabled: fall back to an in-place confirm
      // so the reader still gets feedback.
      setSubmitted(true);
      return;
    }
    window.location.reload();
  };

  // Runs on the reload that the sign-up triggered.
  useEffect(() => {
    if (followsSignUp.current === null) {
      try {
        followsSignUp.current = sessionStorage.getItem(CONFIRM_KEY) === "1";
        if (followsSignUp.current) sessionStorage.removeItem(CONFIRM_KEY);
      } catch {
        followsSignUp.current = false;
      }
    }
    if (!followsSignUp.current) return;

    setSubmitted(true);

    const node = sectionRef.current;
    if (!node) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Where the section sits, measured live each tick - images and lazy
    // sections above it settle in over the first second of the fresh load
    // and would otherwise leave the scroll landing short.
    const targetNow = () =>
      node.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;

    if (reduceMotion) {
      const t = setTimeout(() => window.scrollTo(0, targetNow()), 250);
      return () => clearTimeout(t);
    }

    const timers = [];
    // `html` carries zoom: 0.85 (index.css); under a zoomed ancestor Chromium
    // silently drops native smooth scrolling (see RouteChange.jsx), and rAF is
    // frozen on a backgrounded tab - so the glide is a hand-stepped setTimeout
    // loop. Each tick eases ~8% of the remaining gap toward a freshly measured
    // target (with a small floor so the tail does not crawl): a slow, clearly
    // visible descent, ~1.2s to settle, that also tracks the layout shift as
    // images above the section load in. 3s hard stop as a safety net.
    const start = () => {
      const deadline = performance.now() + 3000;
      const step = () => {
        const target = targetNow();
        const current = window.scrollY;
        const gap = target - current;
        if (Math.abs(gap) <= 8 || performance.now() > deadline) {
          window.scrollTo(0, target);
          return;
        }
        window.scrollTo(0, current + gap * 0.08);
        timers.push(setTimeout(step, 16));
      };
      step();
    };

    // Let the first paint and the nav settle before starting the descent.
    timers.push(setTimeout(start, 250));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <Section bg="white" size="sm" ref={sectionRef}>
      <Container width="content">
        <div className="mx-auto max-w-[500px] text-center">
          <h2 className="font-sans text-[32px] font-bold tracking-[-0.02em] text-forest sm:text-[38px] lg:text-[44px]">
            Subscribe to our emails
          </h2>
          <p className="mx-auto mt-3 whitespace-nowrap font-sans text-base text-forest/70 lg:text-xl">
            Join our email list for exclusive offers and the latest news
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-7 flex flex-col gap-3 text-left"
            noValidate
          >
            <FloatField
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button
              type="submit"
              className="h-[50px] w-full bg-forest font-sans text-[15px] font-bold tracking-[0.08em] text-cream transition-colors hover:bg-forest/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              Sign up
            </button>
          </form>

          <div aria-live="polite" className="min-h-[1.25rem]">
            {submitted && (
              <p className="mt-4 flex items-center gap-2 font-sans text-sm font-semibold text-forest">
                {/* Same tick as the product page benefit list
                    (FybelleLayout.jsx .sg-fyb__tick). */}
                <span
                  aria-hidden="true"
                  className="flex h-[21px] w-[21px] shrink-0 items-center justify-center rounded-full bg-[#3F5A38] text-[13px] leading-none text-white"
                >
                  ✓
                </span>
                Thanks for subscribing
              </p>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
