"use client";


// Sibling of src/views/Privacy.jsx and src/views/Terms.jsx. Layout, type and
// palette are lifted wholesale from those pages - the three legal pages are
// one visual system.
//
// The reference's geometry, measured at a 1920px viewport (identical to the
// privacy and terms pages'):
//
//   text column   left 337px, 924px wide  (a 1246px content box, centred)
//   body          22px / 38.5px line      (1.75)
//   heading tiers 41.8px and 63.8px       (1.9x and 2.9x body), 1.25 line
//   rhythm        27.5px between blocks, 11px between list items
//
// Steppe Gut's body token caps at ~24.8px rather than 22px, so the heading
// sizes below are that same 1.9x / 2.9x relationship against OUR body rather
// than the reference's absolute pixels.
//
// This page previously carried a verbatim transcription of a Yakult UK
// reference cookie policy - WordPress, Cloudinary, Google Analytics, Meta
// pixel and all - none of which exist on this site. It has been rewritten
// from scratch to list only what this codebase actually sets, checked
// against the source:
//
//   NEXT_LOCALE          src/i18n/config.js - language choice, 1 year,
//                         written by LanguageSwitcher.jsx
//   sb-*-auth-token       src/lib/supabase/client.js (createBrowserClient) -
//                         signed-in session, cleared on sign out
//   __stripe_mid/__sid    set by Stripe.js during checkout (CheckoutForm.jsx)
//                         for fraud prevention; Stripe's own cookies, not ours
//
// Plus two pieces of browser storage that are not cookies but are disclosed
// here for completeness: localStorage for the cart and saved account details
// (CartProvider.jsx, avatar.js) and sessionStorage for the one-shot order
// confirmation and newsletter hand-offs (confirmationState.js,
// NewsletterSignup.jsx). None of it leaves the device.
//
// There is no analytics, advertising or social-media tracking on the site at
// present, so those sections are gone rather than filled with placeholders -
// this statement should be updated if that ever changes, per the note at the
// bottom of the page.

const BODY = {
  fontSize: "clamp(1.25rem, 1.6vw, 1.55rem)",
  lineHeight: 1.75,
};

/** Page title - 2.9x body. Matched to "Privacy Statement" and "Terms and
 *  conditions" on the sibling pages. */
const TITLE = {
  fontSize: "clamp(3.625rem, 4.64vw, 4.5rem)",
  lineHeight: 1.25,
  letterSpacing: "-0.035em",
  textWrap: "balance",
};

/** The single heading tier below the title - 1.9x body. Every section break
 *  on the page uses this. */
const SECTION = {
  fontSize: "clamp(2.375rem, 3.04vw, 2.95rem)",
  lineHeight: 1.25,
  letterSpacing: "-0.03em",
  textWrap: "balance",
};

// Third-party policy links for the two vendors whose cookies are set on this
// site (Stripe during checkout, Supabase for the signed-in session), plus the
// browser cookie-management guides.
const LINKS = {
  stripe: "https://stripe.com/privacy",
  supabase: "https://supabase.com/privacy",
  edge: "https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09",
  safari: "https://support.apple.com/en-gb/guide/safari/sfri11471/mac",
  firefox: "https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox",
  chrome: "https://support.google.com/chrome/answer/95647",
};

// Inline links inside legal prose: underlined rather than colour-only, so
// they read as links against body copy without a second accent colour.
function A({ href, external = true, children }) {
  const props = external ? { target: "_blank", rel: "noreferrer" } : {};
  return (
    <a
      href={href}
      {...props}
      className="underline underline-offset-[3px] decoration-forest/40 transition-colors hover:text-forest hover:decoration-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      {children}
    </a>
  );
}

// The one heading tier below the title - shared with Privacy.jsx and
// Terms.jsx's Heading component.
function Heading({ children }) {
  return (
    <h2 style={SECTION} className="mt-24 font-serif font-semibold text-earth">
      {children}
    </h2>
  );
}

// Cookie/vendor name above each bulleted block.
function VendorName({ children }) {
  return (
    <h3 style={BODY} className="mt-12 font-sans font-bold tracking-[-0.01em] text-earth">
      {children}
    </h3>
  );
}

function P({ children }) {
  return (
    <p style={BODY} className="mt-8 font-sans text-earth">
      {children}
    </p>
  );
}

function List({ children }) {
  return (
    <ul
      style={BODY}
      className="mt-8 flex list-outside list-disc flex-col gap-3 pl-6 font-sans text-earth marker:text-sage"
    >
      {children}
    </ul>
  );
}

export default function Cookies() {
  return (
    <>
      <div
        data-navtheme="light"
        className="bg-cream pb-28 pt-[112px] sm:pt-[132px] lg:pb-40 lg:pt-[186px]"
      >
        {/* Same geometry as Privacy.jsx and Terms.jsx: the reference's 924px
            column sits 337px from the left of a 1920px viewport. Those are
            device pixels; this site scales the document with
            `html { zoom: 0.85 }` (src/index.css), so every number here is the
            reference's divided by 0.85 - a 1578px outer box, measure capped
            at 1087px. Below 1578px the gutters take over and the column
            simply narrows. */}
        <div className="mx-auto w-full max-w-[1578px] px-6 sm:px-10 lg:px-14">
          <div className="max-w-[1087px]">
            <h1
              id="page-title"
              tabIndex={-1}
              style={TITLE}
              className="font-serif font-semibold text-forest outline-none"
            >
              Cookie Policy
            </h1>

            <p style={BODY} className="mt-8 font-sans text-earth/60">
              Last updated 10 September 2026
            </p>

            <P>
              This page explains the cookies and browser storage this website uses. We keep the
              list short on purpose: Steppe Gut does not run analytics, advertising or social-media
              tracking, so everything below exists to make the site work rather than to watch you
              use it.
            </P>

            <Heading>Cookies we set</Heading>
            <P>
              These are all strictly necessary for the site to function, so we do not ask for
              consent to set them and there is no cookie banner. You can still remove them at any
              time through your browser settings, see &lsquo;How to remove cookies&rsquo; below.
            </P>

            <VendorName>Language preference (NEXT_LOCALE)</VendorName>
            <List>
              <li>
                Purpose: remembers whether you chose English or Thai, so the site opens in that
                language on your next visit.
              </li>
              <li>Storage duration: 1 year, or until you pick the other language.</li>
              <li>Set by us, first-party.</li>
            </List>

            <VendorName>Signed-in session</VendorName>
            <List>
              <li>
                Purpose: keeps you signed in to your account between pages and visits. Set only if
                you create an account or sign in, and removed when you sign out.
              </li>
              <li>Storage duration: cleared on sign-out, or after a period of inactivity.</li>
              <li>
                Third party: Supabase, our account and order database provider.{" "}
                <A href={LINKS.supabase}>Supabase Privacy Policy</A>
              </li>
            </List>

            <VendorName>Checkout fraud prevention</VendorName>
            <List>
              <li>
                Purpose: set by Stripe, our payment processor, while you are on the checkout page,
                to help detect fraudulent card use. We never see your card details, and neither
                these cookies nor your card details are stored by us.
              </li>
              <li>Storage duration: up to 1 year.</li>
              <li>
                Third party: Stripe. <A href={LINKS.stripe}>Stripe Privacy Policy</A>
              </li>
            </List>

            <Heading>Browser storage we use</Heading>
            <P>
              Alongside cookies, your browser also holds a small amount of local storage that never
              leaves your device and is never sent to us:
            </P>
            <List>
              <li>Your shopping basket, so it survives a page refresh or a closed tab.</li>
              <li>
                Saved account details you have entered, such as your name and delivery address, so
                you do not have to retype them.
              </li>
              <li>
                A short-lived flag used to show your order confirmation after checkout, or a
                newsletter sign-up confirmation, which clears itself once shown.
              </li>
            </List>

            <Heading>Cookies we do not use</Heading>
            <P>
              We do not use analytics cookies (such as Google Analytics), advertising cookies, or
              social-media tracking pixels (such as a Facebook/Meta pixel) anywhere on this site. If
              that changes, we will update this page first and, where required, ask for your
              consent before any such cookie is set.
            </P>

            <Heading>How to remove cookies</Heading>
            <P>
              You can also block or delete cookies at any time through your browser&rsquo;s own
              settings. Removing the ones above will not stop the site working, though you may be
              asked to choose your language again or to sign back in.
            </P>
            <List>
              <li>
                <A href={LINKS.edge}>Microsoft Edge</A>
              </li>
              <li>
                <A href={LINKS.safari}>Safari</A>
              </li>
              <li>
                <A href={LINKS.firefox}>Firefox</A>
              </li>
              <li>
                <A href={LINKS.chrome}>Google Chrome</A>
              </li>
            </List>

            <Heading>More about your personal data</Heading>
            <P>
              For how we handle personal data more broadly, including what we collect and your
              rights over it, see our{" "}
              <A href="/privacy/" external={false}>Privacy Statement</A>.
            </P>

            <Heading>Contact Us</Heading>
            <P>
              If you have any further questions, please contact us via{" "}
              <A href="mailto:info@steppegut.com">info@steppegut.com</A>
            </P>
          </div>
        </div>
      </div>
    </>
  );
}
