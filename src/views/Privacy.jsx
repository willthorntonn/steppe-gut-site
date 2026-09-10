"use client";


// Sibling of src/pages/Cookies.jsx. Layout, type and palette are lifted
// wholesale from that page - the two legal pages are one visual system - and
// the copy is a one-to-one transcription of the reference privacy statement
// (yakult.co.uk/privacy-policy) in the same order, headings and wording.
//
// The reference's geometry, measured at a 1920px viewport (identical to the
// cookie page's):
//
//   text column   left 337px, 924px wide  (a 1246px content box, centred)
//   body          22px / 38.5px line      (1.75)
//   heading tier  41.8px                  (1.9x body), 1.25 line
//   rhythm        27.5px between blocks, 11px between list items
//
// One deliberate divergence from the privacy reference: it sets its page
// title ("Privacy Statement") at the 1.9x section size in brand red. We keep
// the title at the 2.9x TITLE size in forest so it matches "Cookie Policy" on
// the sibling page - a hand-typed jump from /cookies/ to /privacy/ must not
// make the title visibly shrink. Everything below the title is the single
// earth heading tier, exactly as on the cookie page.
//
// Two ink colours only, as on the cookie page: forest for the title, earth
// for every heading below it and for body copy. Gold is the focus ring only.
//
// The copy is now Steppe Gut's: the reference's section order and phrasing are
// kept where they still apply, rewritten to name the real controller (site
// operator and brand owner S72 Strategic Co., Ltd.), the real Thai importer
// (Y Family Co., Ltd., registration number 0105565114721), the info@ contact,
// and Thailand's PDPA in place of the EU GDPR. The Yakult-only processing
// (profiling, factory-visit bookings, EU Model Clauses, the UK/ROI residents
// notice) is removed rather than rewritten. This page still requires review by
// a Thai-qualified lawyer before launch - see website_blueprint/pages/legal.md.

const BODY = {
  fontSize: "clamp(1.25rem, 1.6vw, 1.55rem)",
  lineHeight: 1.75,
};

/** Page title - 2.9x body. Matched to "Cookie Policy" on the sibling page
 *  rather than to the privacy reference's smaller red title. */
const TITLE = {
  fontSize: "clamp(3.625rem, 4.64vw, 4.5rem)",
  lineHeight: 1.25,
  letterSpacing: "-0.035em",
  textWrap: "balance",
};

/** The single heading tier below the title - 1.9x body. Every section break
 *  on the page uses this; the reference runs them all at one level. */
const SECTION = {
  fontSize: "clamp(2.375rem, 3.04vw, 2.95rem)",
  lineHeight: 1.25,
  letterSpacing: "-0.03em",
  textWrap: "balance",
};

// Inline links inside legal prose: underlined rather than colour-only, so
// they read as links against body copy without a second accent colour.
// `external` is the default (mailto and off-site policy links open in a new
// tab); pass external={false} for an in-site link like /cookies/.
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

// The one heading tier below the title - the reference's bold section labels,
// promoted to the sibling page's earth heading tier.
function Heading({ children }) {
  return (
    <h2 style={SECTION} className="mt-24 font-serif font-semibold text-earth">
      {children}
    </h2>
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

export default function Privacy() {
  return (
    <>
      <div
        data-navtheme="light"
        className="bg-cream pb-28 pt-[112px] sm:pt-[132px] lg:pb-40 lg:pt-[186px]"
      >
        {/* Same geometry as src/pages/Cookies.jsx: the reference's 924px
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
              Privacy Statement
            </h1>

            <p style={BODY} className="mt-8 font-sans text-earth/60">
              Last updated 10 September 2026
            </p>

            <P>
              S72 Strategic Co., Ltd. is sensitive to privacy issues surrounding use of customer
              information. Protection of privacy is extremely important to us. The instances in
              which we collect and use information are specifically described in this privacy
              statement, which reflects the principles of Thailand&rsquo;s Personal Data Protection
              Act (PDPA).
            </P>
            <P>
              This privacy statement describes how your personal data is processed by S72 Strategic
              Co., Ltd. (&ldquo;Steppe Gut&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) in connection
              with the services (&ldquo;Services&rdquo;) we provide to you. These Services include:
            </P>
            <List>
              <li>The Steppe Gut website, and any other website operated by us.</li>
              <li>
                Any mobile sites, applications and other interactive features; and
              </li>
              <li>
                Other services that we may offer in connection with the two points mentioned above,
                such as our newsletter and our customer support, as well as our official social
                media pages and the email messages that we send to you.
              </li>
            </List>
            <P>
              This statement also describes the rights you have in respect of your personal data
              being collected and processed by us. If you have any questions regarding this
              statement, you can contact us at the contact details included in this statement.
              Please read this statement carefully before you start using our Services.
            </P>

            <Heading>Responsible party</Heading>
            <P>
              The controller of the processing of your personal data (meaning the party that is
              responsible) is S72 Strategic Co., Ltd., [privacy contact email to be confirmed],
              [contact phone to be confirmed]. The
              product is imported and distributed in Thailand by Y Family Co., Ltd. (juristic person
              registration number 0105565114721), registered office 45/1 Silom 19 Building, 4th
              Floor, Room 415, Silom Road, Silom Subdistrict, Bang Rak District, Bangkok 10500. S72
              Strategic Co., Ltd. is your point of contact for privacy and data protection matters.
            </P>

            <Heading>Which personal data do we collect from you?</Heading>
            <P>
              Depending on the Service, we may ask you to provide us with the following personal
              data:
            </P>
            <List>
              <li>Name</li>
              <li>Billing and delivery address</li>
              <li>Email address</li>
              <li>Telephone number</li>
              <li>
                Order and payment history (your card details are handled by our payment provider and
                are not stored by us)
              </li>
              <li>Any information you include in a message to our customer support</li>
            </List>
            <P>
              We will derive the following personal data from your use of our Services (with your
              consent where required):
            </P>
            <List>
              <li>IP address</li>
              <li>Device and browser type</li>
              <li>
                How you use our website, for example the pages you view and the links you click
              </li>
              <li>Whether you open our emails or newsletters, and which links you click</li>
              <li>
                Your social media account ID, if you contact us through a social media platform
              </li>
            </List>

            <Heading>How do we collect your personal data?</Heading>
            <List>
              <li>
                We collect personal data because you provide this data to us, for instance when you
                place an order, create an account, sign up for our newsletter, or contact us.
                Certain fields will always be required, for instance the details we need to fulfil
                and deliver your order or to reply to you. These mandatory fields are the minimal
                data we need from you to provide you with the requested service. We may ask you to
                provide other personal data voluntarily.
              </li>
              <li>
                When you interact with our official social media accounts, we will view your social
                account data that is visible to us.
              </li>
              <li>
                We may also collect personal data from you offline, for instance when you contact
                our customer support by phone.
              </li>
            </List>

            <Heading>Why and how we use your personal data?</Heading>
            <P>
              Below we describe why and how we process your personal data. Where we have other
              purposes of use of your personal data, we will inform you of those separately.
            </P>
            <List>
              <li>
                We use your personal data to process, fulfil and deliver your orders, and to handle
                returns and refunds.
              </li>
              <li>
                We use your personal data to provide you with our customer support, including
                responding to your enquiries, comments and complaints and fulfilling your requests,
                all with the objective of improving the service we provide. We protect your rights
                by limiting the data we collect for this purpose and by limiting the retention
                period of this personal data.
              </li>
              <li>
                We use your contact details to send administrative information to you, such as
                changes to this privacy statement or updates about an order.
              </li>
              <li>
                With your consent, we use your personal data to inform you of Steppe Gut products
                and offers by email. We protect your rights by giving you the option to opt out
                every time we communicate with you, using the unsubscribe link in any marketing
                email.
              </li>
              <li>
                We use aggregated, anonymised data for business purposes such as understanding how
                our website is used and improving it.
              </li>
            </List>

            <Heading>The cases where we give other parties access to your personal data</Heading>
            <P>We may allow other parties access to your personal data including:</P>
            <List>
              <li>
                Our service providers, such as our ecommerce platform, our payment provider, our
                fulfilment and delivery partners, our email provider, our customer support tools and
                our analytics providers.
              </li>
              <li>
                Our importer and distributor in Thailand, Y Family Co., Ltd., where needed for
                delivery, regulatory or after-sales purposes.
              </li>
              <li>Public authorities, where we are required to disclose data by law.</li>
            </List>
            <P>
              Some of these parties are located outside Thailand. Where we transfer your personal
              data abroad, we take steps to ensure it is protected to a standard consistent with the
              PDPA, for example through contractual safeguards with the recipient. A copy of these
              safeguards can be requested via the contact details under &lsquo;Your rights&rsquo;.
            </P>
            <P>
              We do not sell your personal data, and we will not share it with third parties unless
              there is a specific, legitimate business reason to do so.
            </P>

            <Heading>Retention periods</Heading>
            <List>
              <li>
                We will keep personal data we obtain in relation to your questions, complaints and
                enquiries for up to 1 year after we fully address the matter, to ensure we have
                helped you sufficiently or in case you require more information or assistance, unless
                we are required by law to keep the personal data longer (for example in the case of
                complaints relating to food regulations).
              </li>
              <li>
                We will keep personal data we obtain in relation to orders and payments for as long
                as required by applicable tax and accounting legislation.
              </li>
              <li>
                If you have consented to receive news and information, we will keep your contact
                details and marketing preferences until you unsubscribe or ask us to delete them,
                and we review inactive contacts periodically.
              </li>
              <li>
                After the relevant period we will delete or anonymise your personal data.
              </li>
            </List>

            <Heading>Your rights</Heading>
            <P>You have the following rights with respect to your personal data:</P>
            <List>
              <li>
                You have the right to access your personal data as processed by us. This means that
                we will provide you with information such as the categories of personal data that
                are processed, the purposes of processing, retention periods and categories of
                third-party recipients, for example fulfilment and delivery partners.
              </li>
              <li>
                You also have the right to have your personal data rectified or erased as
                appropriate, the right to restrict the processing and the right to object to the
                processing (that is, correct, opt out or unsubscribe).
              </li>
              <li>
                You have the right to withdraw your consent at any time. Your withdrawal will not
                affect the lawfulness of the processing based on consent before the withdrawal.
              </li>
              <li>
                At your request, a copy of the personal data held by us will be provided to you in a
                common machine-readable format (data portability).
              </li>
            </List>
            <P>
              You can exercise your rights by contacting us via [privacy contact email to be
              confirmed]. Upon your request, we
              may ask for additional information from you to verify your identity and to handle your
              request efficiently. All identity check documents will thereafter be disposed of
              securely.
            </P>
            <P>
              You also have the right to lodge a complaint with the Personal Data Protection
              Committee (PDPC) in Thailand.
            </P>

            <Heading>Changes to this privacy statement</Heading>
            <P>
              The website and services from Steppe Gut may change from time to time. For this reason,
              we may need to change or add information to this statement. Changes to our privacy
              statement, when they occur, will be clearly noted on our website. In case of
              substantial changes, we will inform you of our new privacy statement via the contact
              details we have from you.
            </P>

            <Heading>Cookies and Similar Technologies</Heading>
            <P>
              On the website we use cookies and similar technologies. More information on this can be
              found in our <A href="/cookies/" external={false}>Cookie Policy Statement</A>.
            </P>

            <Heading>Contact Us</Heading>
            <P>
              If you have any further questions, please contact us via [privacy contact email to be
              confirmed]
            </P>

            <Heading>Disclaimer</Heading>
            <P>
              This website is operated by S72 Strategic Co., Ltd. Steppe Gut is a dietary supplement
              and is not intended to diagnose, treat, cure or prevent any disease. It contains milk.
              Thai FDA registration is in progress; registration details will be published here on
              completion. Nothing on this website is medical advice, and you should consult a
              qualified professional about any health concern.
            </P>

            <p style={BODY} className="mt-8 font-sans text-earth/60">
              Copyright © 2026 S72 Strategic Co., Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
