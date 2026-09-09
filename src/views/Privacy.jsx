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
// The copy is placeholder - it names the reference's own registered entity,
// address, retention periods and marketing@yakult.co.uk contact, and will be
// rewritten for Steppe Gut's actual data processing before this page ships.
// Kept verbatim for now, typos and bracketed drafting notes included, so the
// layout is reviewed against real-length text.

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
              Last updated 29th September 2021
            </p>

            <P>
              Yakult UK Ltd. is sensitive to privacy issues surrounding use of customer
              information. Protection of privacy is extremely important to us. The instances in
              which Yakult does collect and use information are specifically described in this
              Privacy Statement and for which we took into account the principles of the EU General
              Data Protection Regulation.
            </P>
            <P>
              This privacy statement describes how your personal data is processed by Yakult in
              connection with the services (“Services”) we provide to you. These Services include:
            </P>
            <List>
              <li>All our Yakult websites, and any other website operated by us.</li>
              <li>
                Any (mobile) sites, applications, widgets, and other (mobile) interactive features;
                and
              </li>
              <li>
                Other services that we may offer in connections with the two points mentioned above,
                such as rewards programs, through our official social media pages as well as through
                HTML-formatted email messages that we send to you.
              </li>
            </List>
            <P>
              This statement also describes the rights you have in respect of your personal data
              being collected and processed by Yakult. If you have any questions regarding this
              statement, you can contact us at the contact details included in this statement.
              Please read this statement carefully before you start using our Services.
            </P>

            <Heading>Responsible party</Heading>
            <P>
              The controller of the processing of your personal data (meaning the party that is
              responsible) is: Yakult UK Ltd. Registered Address at Anteros, Odyssey Business Park,
              West End Road, South Ruislip, HA4 6QQ. Yakult UK Ltd will be your point of contact for
              privacy and data protection matters.
            </P>

            <Heading>Which personal data do we collect from you?</Heading>
            <P>
              Depending on the Service, we may ask you to provide us with the following personal
              data:
            </P>
            <List>
              <li>Name, address</li>
              <li>Telephone number</li>
              <li>Email address</li>
              <li>Date of birth</li>
              <li>Consumption habits</li>
              <li>Gender</li>
              <li>Lifestyle routines (e.g., breakfast habits)</li>
              <li>Postal code</li>
              <li>Family composition</li>
              <li>Hobbies/interest</li>
            </List>
            <P>
              We will derive the following personal data from your use of our Services (with your
              consent where required):
            </P>
            <List>
              <li>IP address</li>
              <li>Personal characteristics, such as hobbies and interests, location</li>
              <li>
                Online behaviour when you use our Services, e.g., whether or not you click on
                content or on items on Yakult emails / newsletters
              </li>
              <li>Social media account ID (such as your Facebook username).</li>
              <li>Type of your mobile device (computer, laptop, mobile)</li>
            </List>

            <Heading>How do we collect your personal data?</Heading>
            <List>
              <li>
                We collect personal data because you provide this data to us, for instance when you
                sign up for more information, news and events from Yakult or make a purchase. Certain
                information will be always required when you sign up, for instance the details we
                need to contact you, e.g., your email address and name (and country) or the
                information we need to verify that you are eligible to enter a contest. These
                mandatory fields are the minimal data we need from you to provide you with the
                requested service. We may ask you to provide other personal data voluntarily, such
                as gender, hobbies and activities that you like. Such personal data will usually be
                added to your profile.
              </li>
              <li>
                When you interact on Facebook or other social media accounts, we will view your
                social account data that is visible to us.
              </li>
              <li>
                We may also collect personal data from you offline, for instance when you call our
                contact customer service.
              </li>
              <li>
                We may receive personal data from third parties. I.e., from people with whom you are
                friends or otherwise connected on social media platforms.
              </li>
            </List>

            <Heading>Why and how we use your personal data?</Heading>
            <P>
              Below we describe why and how we process your personal data. Where we have other
              purposes of use of your personal data, we will inform you there of separately.
            </P>
            <List>
              <li>
                We use your personal data to provide you with our customer care services, including
                responding to your enquiries, comments and complaints and fulfilling your requests
                all with the objective of improving the service we provide. We protect your rights
                by the limiting the data we collect from you for this purpose and by limiting the
                retention period of this personal data.
              </li>
              <li>
                We use your contact details to send administrative information to you, such as
                changes to this privacy statement.
              </li>
              <li>
                We use your personal data to fulfil and take part in our promotions and contests,
                and to process prizes. We protect your rights by informing you of this use of your
                personal data and giving you the option of opting out at any time.
              </li>
              <li>
                We use your personal data to manage your reservation for our factory visits or any
                other Yakult events, for example, to process your payments, to communicate with you
                regarding details of your reservation and provide you with related customer
                services.
              </li>
              <li>
                With your consent, we use your personal data to inform you of Yakult’s products and
                Services (direct marketing), to provide you with tailored news, information updates
                and announcements via our marketing communications ,, to you send you information
                about promotions and to invite you to participate in our special programs or local
                events. As permitted by applicable law, will contact you by email, telephone, SMS,
                post or social media. We protect your rights by informing you of these activities in
                and by giving you the option to opt-out every time we communicate with you.
              </li>
              <li>
                If you interact via social media, we will retrieve your social media profile data
                that is visible to us and aggregate this data to give us insight in our consumers.
              </li>
              <li>
                We use your personal data for our business purposes, such as market research,
                enhancing our Services, determining the effectiveness of our promotional campaigns,
                tailoring our website experience and content based on your past activities on the
                websites. Where we can, we aggregate your details into anonymous data for these
                business purposes.
              </li>
            </List>

            <Heading>Information on profiling</Heading>
            <P>
              In addition to the purposes of use as described in this paragraph we also use your
              personal data to build your profile. Where such information is available to us, your
              profile will consist of your gender, age, open rate and click through rate, topics
              clicked on, participation in an activity, type of activities participated in and other
              information that is provided by you to us via marketing communication or consumer
              research. We use this profile the better to inform you of our Yakult products and
              services, for instance by adjusting the website you view or the newsletter you
              receive, to your interests. If you do not wish us to build and use your profile,
              please contact us via <A href="mailto:marketing@yakult.co.uk">marketing@yakult.co.uk</A>{" "}
              or opt out using the unsubscribe on emails sent by us.
            </P>

            <Heading>The cases where we give other parties access to your personal data</Heading>
            <P>We may allow other parties access to your personal data including:</P>
            <List>
              <li>
                Our third-party service providers, such as our customer relationship management
                service provider, data processors, our market research service provider and other
                information technology service providers (e.g., our e-mailing service).
              </li>
              <li>
                Third parties with whom we cooperate for our events, contests or other activities.
              </li>
            </List>
            <P>
              These transfers may include the transfer of personal data to other countries,
              including countries outside the European Economic Area which do not have a level of
              personal data protection similar to the EU. Yakult will ensure that these transfers
              are based on appropriate safeguards, including the use of EU Model Clauses, to ensure
              an adequate level of personal data protection. A copy of these safeguards can be
              requested via the contact details under ‘Your rights’.
            </P>
            <P>
              We will not share your data with third parties unless there is a specific legitimate
              business reason for Yakult to instruct such third party to fulfil Yakult’s activities
              by using your data.
            </P>

            <Heading>Retention periods</Heading>
            <List>
              <li>
                We will keep personal data we obtain in relation to your questions, complaints and
                enquiries, for 3 months after we fully address your question, complaint or enquiry,
                to ensure we have helped you sufficiently or in case you require more information or
                assistance. In exceptional circumstances, we will keep your name and e-mail address
                for 1 year after a complaint to address serious cases, fake or malicious complaints
                made. After these periods, we will delete your personal data as provided to us via
                the contact form, unless we are required by law to keep the personal data longer
                ([e.g., in case on complaints on food regulations]).
              </li>
              <li>
                Unless you have consented to receive future news, events and information, we will
                keep personal data we obtained in relation to promotions, contests and reward
                programs, for the period of that activity and for 3 months thereafter to be able to
                address any questions or outstanding matters. After that we will delete your
                personal data related to that activity, except for any financial data on
                reimbursements, which we will store as long as required by applicable tax
                legislation.
              </li>
              <li>
                Unless you have consented to receive future news, events and information, we will
                keep personal data we obtained in relation to online purchases for a period of 3
                months since your last purchase, unless tax regulation requires us to keep the
                personal data longer. In those cases, we will keep the relevant personal data as
                long as required by applicable tax legislation.
              </li>
              <li>
                If you have consented to receive future news, events and information we will keep
                your profile for 24 months since your last activity with us. We measure your last
                activity by assessing whether or not you opened our newsletters or other digital
                communication, what links you click on and whether or not you enrol in our
                promotion, or contests. Your data will be deleted if we asses there has been no
                activity from you for 24 months.
              </li>
            </List>

            <Heading>Your rights</Heading>
            <P>You have the following rights with respect to your personal data:</P>
            <List>
              <li>
                You have the right to access your personal data as processed by Yakult. This means
                that Yakult will provide you with information such as the categories of personal data
                that are processed, the purposes of processing, retention periods and categories of
                third-party recipients, e.g., fulfilment centres, prize providers.
              </li>
              <li>
                You also have the right to have your personal data rectified or erased as
                appropriate, the right to restrict the processing and the right to object to the
                processing ( I.e., correct, opt-out or unsubscribe).
              </li>
              <li>
                You have the right to withdraw your consent at any time. Your withdrawal will not
                affect the lawfulness of the processing of your personal data by Yakult based on
                consent before the withdrawal.
              </li>
              <li>
                At your request, a copy of your personal data provided held by us will be provided
                to you in a common machine-readable format (data portability).
              </li>
            </List>
            <P>
              You can exercise your rights by contacting us via{" "}
              <A href="mailto:marketing@yakult.co.uk">marketing@yakult.co.uk</A>. Upon your request,
              we may ask for additional information from you to verify your identity, such as a photo
              ID or a utility bill (and make sure we do not violate any other person’s privacy) and
              to handle your request efficiently. All identity check documents will thereafter be
              disposed of securely.
            </P>
            <P>
              You also have the right to file a complaint with your data protection supervisory
              authority.
            </P>

            <Heading>Changes to this privacy statement</Heading>
            <P>
              The website and services from Yakult may change from time to time. For this reason,
              Yakult may need to change or add information to this statement. Changes to our privacy
              statement, when they occur, will be clearly noted on our website, In case of
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
              If you have any further questions, please contact us via{" "}
              <A href="mailto:marketing@yakult.co.uk">marketing@yakult.co.uk</A>
            </P>

            <Heading>Disclaimer</Heading>
            <P>
              This website is operated by Yakult UK Ltd. The information provided through this
              website is intended only for residents of the United Kingdom of Great Britain and
              Northern Ireland and the Republic of Ireland. No other person should rely or act upon
              any information contained in this website and information available is not relevant to
              any other countries or territories.
            </P>

            <p style={BODY} className="mt-8 font-sans text-earth/60">
              Copyright 2021 All rights Reserved Yakult UK Limited (UK and ROI) Terms and conditions
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
