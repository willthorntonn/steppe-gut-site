"use client";


// Sibling of src/pages/Privacy.jsx and src/pages/Cookies.jsx. Layout, type and
// palette are lifted wholesale from those pages - the three legal pages are one
// visual system - and the copy is a one-to-one transcription of the reference
// terms of use (yakult.co.uk/terms-and-conditions) in the same order, headings
// and wording.
//
// The reference's geometry, measured at a 1920px viewport (identical to the
// cookie and privacy pages'):
//
//   text column   left 337px, 924px wide  (a 1246px content box, centred)
//   body          22px / 38.5px line      (1.75)
//   heading tier  41.8px                  (1.9x body), 1.25 line
//   rhythm        27.5px between blocks
//
// Those are device pixels; this site scales the document with
// `html { zoom: 0.85 }` (src/index.css), so the container below is the
// reference's numbers divided by 0.85 - a 1578px outer box, measure capped at
// 1087px - exactly as on the sibling pages. Below 1578px the gutters take over
// and the column simply narrows.
//
// Same divergences from the reference as Privacy.jsx: the page title is set at
// the 2.9x TITLE size in forest so a hand-typed jump between the legal pages
// never makes the title visibly shrink, and every section break below it uses
// the one earth Heading tier. Two ink colours only: forest for the title,
// earth for every heading and for body copy. Gold is the focus ring only.
//
// Unlike the privacy and cookie references this page carries no "last updated"
// date, so there is no muted date line under the title.
//
// The copy is placeholder - it names the reference's own registered entity,
// address, company number and info@yakult.co.uk contact, and will be rewritten
// for Steppe Gut before this page ships. Kept verbatim for now, typos and the
// reference's own phrasing included, so the layout is reviewed against
// real-length text.

const BODY = {
  fontSize: "clamp(1.25rem, 1.6vw, 1.55rem)",
  lineHeight: 1.75,
};

/** Page title - 2.9x body. Matched to "Cookie Policy" and "Privacy Statement"
 *  on the sibling pages rather than to the reference's smaller title. */
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
// `external` is the default (mailto and off-site links open in a new tab);
// pass external={false} for an in-site link like /privacy/.
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
// promoted to the sibling pages' earth heading tier.
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

export default function Terms() {
  return (
    <>
      <div
        data-navtheme="light"
        className="bg-cream pb-28 pt-[112px] sm:pt-[132px] lg:pb-40 lg:pt-[186px]"
      >
        {/* Same geometry as src/pages/Cookies.jsx and src/pages/Privacy.jsx:
            the reference's 924px column sits 337px from the left of a 1920px
            viewport. Those are device pixels; this site scales the document
            with `html { zoom: 0.85 }` (src/index.css), so every number here is
            the reference's divided by 0.85 - a 1578px outer box, measure
            capped at 1087px. Below 1578px the gutters take over and the column
            simply narrows. */}
        <div className="mx-auto w-full max-w-[1578px] px-6 sm:px-10 lg:px-14">
          <div className="max-w-[1087px]">
            <h1
              id="page-title"
              tabIndex={-1}
              style={TITLE}
              className="font-serif font-semibold text-forest outline-none"
            >
              Terms and conditions
            </h1>

            <P>
              Please read these Terms &amp; Conditions carefully before you start to use our website
              (including accessing or browsing). Use of the Yakult UK Limited website is subject to
              the following terms and conditions. By using our website, you confirm that you accept
              these Terms &amp; Conditions and that you agree to comply with them.
            </P>

            <Heading>Ownership of the copyright on this site</Heading>
            <P>
              Copyright © Yakult UK Limited 2021. All rights reserved. All copyright and other
              intellectual property rights in all text, images and other materials on this site are
              owned by Yakult UK Limited (UK and ROI) and its affiliated companies or are included
              with permission of the relevant owner. References to affiliates or affiliated shall
              include all members of Yakult Honsha Co., Ltd.
            </P>
            <P>
              You are permitted to browse this site and to reproduce extracts by way of printing,
              downloading to a hard disk, and by distribution to other people, but in all cases for
              information purposes only and provided that the above copyright notice appears in all
              such reproductions. No reproduction of any part of the site may be sold or distributed
              for commercial gain nor shall it be modified or incorporated in any other publication,
              whether in hard copy or electronic format, including posting to any other site. No
              other licence or right is granted.
            </P>

            <Heading>Ownership of trademarks on this site</Heading>
            <P>
              All trademarks displayed on this site are either owned or used under licence by Yakult
              UK Limited and its affiliates. The unauthorised use of any trademark on this site is
              strictly prohibited.
            </P>

            <Heading>Content</Heading>
            <P>
              The information on this site has been included in good faith but is for general
              information purposes only. It should not be relied on for any specific purpose and no
              representation or warranty is given as regards its accuracy or its completeness. Yakult
              UK Limited nor any of its affiliates or their officers, employees or agents shall be
              liable for any loss, damage or expense arising out of any access to or use of this site
              or any site linked to it including, without limitation, any loss of profit, indirect,
              incidental or consequential loss. Yakult UK Limited (UK and ROI) reserves the right to
              make any changes and corrections to this site as and when it is considered appropriate
              and without notice.
            </P>

            <Heading>Links</Heading>
            <P>
              The site may provide links to other websites, which are not under the control of Yakult
              UK Limited or its affiliate companies. Yakult UK Limited and/or its affiliate companies
              shall not be responsible in any way for the content of any external websites or links.
              Yakult UK Limited provides such links only as a convenience, and the inclusion of any
              link to any such websites does not imply endorsement by Yakult UK Limited of the
              content of such sites.
            </P>

            <Heading>General Enquiries</Heading>
            <P>
              For all other general enquiries and company information please email{" "}
              <A href="mailto:info@yakult.co.uk">info@yakult.co.uk</A>
            </P>

            <p style={BODY} className="mt-8 font-sans text-earth/60">
              Copyright © Yakult UK Limited 2021. All rights reserved.
            </p>
            <p style={BODY} className="mt-8 font-sans text-earth/60">
              Registered office for Yakult UK &amp; Ireland: Anteros, Odyssey Business Park, West End
              Road, Ruislip, HA4 6QQ. Registered in England and Wales no. 3087710
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
