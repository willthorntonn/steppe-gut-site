"use client";


// Type and layout here are measured off the reference cookie policy
// (yakult.co.uk/cookies) at a 1920px viewport, then re-expressed as ratios of
// this site's body size so the page stays fluid rather than pinned to that one
// width. The reference measures, for the record:
//
//   text column   left 337px, 924px wide  (a 1246px content box, centred)
//   body          22px / 38.5px line      (1.75)
//   heading tiers 41.8px and 63.8px       (1.9x and 2.9x body), 1.25 line
//   rhythm        27.5px between blocks, 11px between list items
//
// Steppe Gut's body token (styles/type.js BODY) caps at ~24.8px rather than
// 22px, so the heading sizes below are that same 1.9x / 2.9x relationship
// against OUR body rather than the reference's absolute pixels - the
// proportions are what read as "the same page", not the raw numbers.

const BODY = {
  fontSize: "clamp(1.25rem, 1.6vw, 1.55rem)",
  lineHeight: 1.75,
};

/** Page title, and the one-off "Cookie Statement" divider - 2.9x body.
 *  The reference sets both at exactly the same size; they are one tier. */
const TITLE = {
  fontSize: "clamp(3.625rem, 4.64vw, 4.5rem)",
  lineHeight: 1.25,
  letterSpacing: "-0.035em",
  textWrap: "balance",
};

/** The single heading tier below the title - 1.9x body. The cookie-category
 *  titles and the plain-language questions share this size and are told apart
 *  only by colour, exactly as in the reference. */
const SECTION = {
  fontSize: "clamp(2.375rem, 3.04vw, 2.95rem)",
  lineHeight: 1.25,
  letterSpacing: "-0.03em",
  textWrap: "balance",
};

// Legal long-form page reached from the footer's legal row.
//
// Structure is a one-to-one transcription of the reference cookie policy
// (yakult.co.uk/cookies) - same headings, same order, same copy, same
// two-tier heading hierarchy - rebuilt in Steppe Gut's own type and palette.
//
// The reference runs exactly two ink colours: its brand red for the page
// title and the cookie-category titles, and a near-black for everything else,
// body copy included. That maps onto forest (our brand primary, the accent
// tier) and earth (our darkest neutral, the near-black tier) - so the second
// heading tier and the body copy share one colour here too, as they do there.
// Gold is deliberately not used for headings: #D4AF37 on cream fails contrast.
//
// The copy is placeholder - it names the reference's own vendors and
// contacts and will be rewritten for Steppe Gut's actual cookie set before
// this page ships. Kept verbatim for now so the layout is reviewed against
// real-length text rather than lorem.

// Third-party policy links. The reference links each vendor row out to the
// vendor's own policy; these point at the same public documents.
const LINKS = {
  wordpress: "https://automattic.com/privacy/",
  cloudinary: "https://cloudinary.com/privacy",
  google: "https://policies.google.com/privacy",
  googleOptOut: "https://tools.google.com/dlpage/gaoptout",
  ga4Docs: "https://support.google.com/analytics/answer/12017362",
  facebook: "https://www.facebook.com/privacy/policy/",
  edge: "https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09",
  safari: "https://support.apple.com/en-gb/guide/safari/sfri11471/mac",
  firefox: "https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox",
  chrome: "https://support.google.com/chrome/answer/95647",
};

// Inline links inside legal prose: underlined rather than colour-only, so
// they read as links against body copy without a second accent colour.
function A({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="underline underline-offset-[3px] decoration-forest/40 transition-colors hover:text-forest hover:decoration-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      {children}
    </a>
  );
}

// Top-tier section title - the reference's red display headings. `divider`
// is the one-off oversized "Cookie Statement" break.
function SectionTitle({ divider = false, children }) {
  return (
    <h2
      style={divider ? TITLE : SECTION}
      className={`font-serif font-semibold text-forest ${
        divider ? "mt-28" : "mt-[6.5rem]"
      }`}
    >
      {children}
    </h2>
  );
}

// Mid-tier heading - the reference's near-black headings.
function Heading({ children }) {
  return (
    <h3 style={SECTION} className="mt-24 font-serif font-semibold text-earth">
      {children}
    </h3>
  );
}

// Vendor name above each bulleted cookie block. A heading in the reference's
// visual hierarchy, so it is marked up as one rather than as a bold <p>.
function VendorName({ children }) {
  return (
    <h4 style={BODY} className="mt-12 font-sans font-bold tracking-[-0.01em] text-earth">
      {children}
    </h4>
  );
}

function P({ children }) {
  return (
    <p style={BODY} className="mt-8 font-sans text-earth">
      {children}
    </p>
  );
}

function List({ children, ordered = false }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      style={BODY}
      className={`mt-8 flex list-outside flex-col gap-3 pl-6 font-sans text-earth ${
        ordered ? "list-decimal" : "list-disc"
      } marker:text-sage`}
    >
      {children}
    </Tag>
  );
}

export default function Cookies() {
  return (
    <>
      <div
        data-navtheme="light"
        className="bg-cream pb-28 pt-[112px] sm:pt-[132px] lg:pb-40 lg:pt-[186px]"
      >
        {/* The reference's geometry, reproduced. Its text column sits 337px
            from the left of a 1920px viewport and runs 924px wide (a 1246px
            content box, centred). Those are DEVICE pixels; this site scales
            the whole document with `html { zoom: 0.85 }` (src/index.css), so
            every number here is the reference's divided by 0.85 to land on it
            once the zoom is applied: 1466px of content, +56px for the lg
            gutter = a 1578px outer box, with the measure capped at 1087px.
            Verified at 1920px: left edge 337, right edge 1261. Below 1578px
            the gutters take over and the column simply narrows. */}
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
              Last updated 11th May 2022
            </p>

            <P>
              Any website you visit is likely to store information from your browser, using
              cookies. This is to collect and understand information about you and your
              preferences, and is designed to make your browsing experiences more interesting and
              useful to you.
            </P>
            <P>
              Some of the cookies are necessary to make our complicated system work well for you,
              others are to help you find the information you want, participate in the events and
              competitions that you choose, and get messages, including on social media, that suit
              your search and profile history.
            </P>
            <P>
              But you don’t have to have them all if you don’t want – your privacy is your right –
              and so, like other websites, we have defined the different categories of cookies so
              you can choose to accept or refuse, as you wish.
            </P>
            <P>
              Just so you know, this site is owned and managed by Yakult UK (‘We’). We do reserve
              the right to change this Privacy Policy at any time without notice but you’ll easily
              see our changes when you look at the LAST UPDATED notice on the top of this page.
              Changes notified will be implemented immediately.
            </P>
            <P>Yakult uses cookies and other technologies on this website to:</P>

            <List ordered>
              <li>assess the use of our website by each website visitor (statistical cookies),</li>
              <li>to remember your preferences and settings (functional cookies),</li>
              <li>to provide you with social media functionality</li>
              <li>[and to provide you with relevant content (including our own advertisements)].</li>
            </List>

            <P>
              You can find out more about these technologies and how you can refuse or delete them
              by reading our cookie statement. By continuing to use our website without changing
              your settings you consent to our use of cookies and other technologies in accordance
              with our cookie statement.
            </P>

            <SectionTitle divider>Cookie Statement</SectionTitle>

            <Heading>What are these cookies and other technologies?</Heading>
            <P>
              Cookies are small text files that are placed on your device via our website. The next
              time you visit our website, web beacons will allow us to recognize the cookie and your
              device. These web beacons will also read how you use our website. Pixel tags allow us
              to place relevant content for you on our website.
            </P>

            <Heading>What is the function of these cookies and other technologies?</Heading>
            <P>
              Below we list the different types of cookies that may be used on the Site. Note that
              where information collected through cookies constitutes personal information, the
              provisions in the Privacy Policy apply and complement this Cookie Policy.
            </P>

            <SectionTitle>Essential Cookies</SectionTitle>

            <VendorName>WordPress</VendorName>
            <List>
              <li>
                Purpose: Essential cookies are necessary for the Site to work. They help you move
                around it and to use its services and features. Without these absolutely necessary
                cookies, the Site will not perform as smoothly for you as we would like it to and we
                may not be able to provide the Site or certain services or features you request.
              </li>
              <li>Storage duration: N/A</li>
              <li>
                Third party: WordPress <A href={LINKS.wordpress}>Privacy Policy</A>
              </li>
            </List>

            <VendorName>Cloudinary</VendorName>
            <List>
              <li>Cloudinary is a hosting service provided by Cloudinary Ltd.</li>
              <li>
                Personal Data processed: various types of Data as specified in the privacy policy of
                the service.
              </li>
              <li>
                Third party: Cloudinary <A href={LINKS.cloudinary}>Privacy Policy</A>
              </li>
            </List>

            <VendorName>YouTube Video Widget</VendorName>
            <List>
              <li>
                YouTube is a video content visualisation service provided by Google Ireland Limited
                that allows this Application to incorporate content of this kind on its pages.
              </li>
              <li>Personal Data processed: Tracker; Usage Data</li>
              <li>
                Third party: Google <A href={LINKS.google}>Privacy Policy</A>.
              </li>
            </List>

            <SectionTitle>Analytics Cookies</SectionTitle>

            <VendorName>Google Analytics</VendorName>
            <List>
              <li>
                Purpose: This analytics cookie tracks and reports on website use, to help us improve
                the site
              </li>
              <li>Storage duration: N/A</li>
              <li>
                Third party: Google, Inc. <A href={LINKS.google}>Privacy statement</A>
              </li>
            </List>

            <VendorName>Google Analytics with Anonymised IP</VendorName>
            <List>
              <li>
                Google Analytics is a web analysis service provided by Google Ireland Limited
                (“Google”). Google utilises the Data collected to track and examine the use of this
                Application, to prepare reports on its activities and share them with other Google
                services.
              </li>
              <li>
                Purpose: Google may use the Data collected to contextualise and personalise the ads
                of its own advertising network.
                <br />
                This integration of Google Analytics anonymises your IP address. It works by
                shortening Users’ IP addresses within member states of the European Union or in
                other contracting states to the Agreement on the European Economic Area. Only in
                exceptional cases will the complete IP address be sent to a Google server and
                shortened within the US.
              </li>
              <li>Personal Data processed: Tracker; Usage Data</li>
              <li>
                Third party: Google <A href={LINKS.google}>Privacy Policy</A> –{" "}
                <A href={LINKS.googleOptOut}>Opt Out</A>
              </li>
            </List>

            <VendorName>Google Analytics 4 (Google Ireland Limited)</VendorName>
            <List>
              <li>
                Google Analytics 4 is a web analysis service provided by Google Ireland Limited
                (“Google”). Google utilizes the Data collected to track and examine the use of this
                Application, to prepare reports on its activities and share them with other Google
                services.
              </li>
              <li>
                Purpose: Google may use the Data collected to contextualize and personalize the ads
                of its own advertising network.
                <br />
                In Google Analytics 4, IP addresses are used at collection time and then discarded
                before Data is logged in any data center or server. Users can learn more by
                consulting <A href={LINKS.ga4Docs}>Google’s official documentation</A>.
              </li>
              <li>
                Personal Data processed: browser information; city; device information; latitude (of
                city); longitude (of city); number of Users; session statistics; Trackers; Usage
                Data.
              </li>
              <li>
                Place of processing: Ireland – <A href={LINKS.google}>Privacy Policy</A> –{" "}
                <A href={LINKS.googleOptOut}>Opt Out</A>.
              </li>
            </List>

            <VendorName>Google Tag Manager</VendorName>
            <List>
              <li>Google Tag Manager is a tag management service provided by Google Ireland Limited.</li>
              <li>Personal Data processed: Tracker; Usage Data</li>
              <li>
                Third party: Google <A href={LINKS.google}>Privacy Policy</A>
              </li>
            </List>

            <SectionTitle>Social Media Cookies</SectionTitle>

            <VendorName>Facebook</VendorName>
            <List>
              <li>
                Purpose: This cookie tracks when you share our information on Facebook and other
                social media.
              </li>
              <li>Storage duration: N/A</li>
              <li>
                Third party: Facebook <A href={LINKS.facebook}>Privacy Policy</A>
              </li>
            </List>

            <VendorName>YouTube</VendorName>
            <List>
              <li>Purpose: This cookie tracks analytics and view rates on YouTube.</li>
              <li>Storage duration: N/A</li>
              <li>
                Third party: Google, Inc. <A href={LINKS.google}>Privacy statement</A>
              </li>
            </List>

            <VendorName>Facebook Ads Conversion Tracking</VendorName>
            <List>
              <li>
                Facebook Ads conversion tracking (Facebook pixel) is an analytics service provided
                by Meta Platforms Ireland Limited that connects data from the Meta advertising
                network with actions performed on this Application.
              </li>
              <li>
                Purpose: The Facebook pixel tracks conversions that can be attributed to ads on
                Facebook, Instagram and Audience Network.
              </li>
              <li>Personal Data processed: Tracker; Usage Data</li>
              <li>
                Third party: Facebook <A href={LINKS.facebook}>Privacy Policy</A>
              </li>
            </List>

            <VendorName>Meta Events Manager (Meta Platforms Ireland Limited)</VendorName>
            <List>
              <li>
                Meta Events Manager is an analytics service provided by Meta Platforms Ireland
                Limited.
              </li>
              <li>
                Purpose: By integrating the Meta pixel, Meta Events Manager can give the Owner
                insights into the traffic and interactions on this Application.
              </li>
              <li>Personal Data processed: Trackers; Usage Data.</li>
              <li>
                Place of processing: Ireland – <A href={LINKS.facebook}>Privacy Policy</A>.
              </li>
            </List>

            <Heading>How can you remove cookies?</Heading>
            <P>
              If you want to prevent cookies and other technologies being placed on your device, or
              used when you visit our website, you can change your browser’s settings or options on
              your device. Please click on the links below to read your browser’s user guidance on
              changing settings or options.
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

            <Heading>Contact Us</Heading>
            <P>
              If you have any further questions, please contact us via{" "}
              <A href="mailto:marketing@yakult.co.uk">marketing@yakult.co.uk</A>
            </P>
          </div>
        </div>
      </div>
    </>
  );
}
