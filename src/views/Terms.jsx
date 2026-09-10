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
// The copy is now Steppe Gut's: the reference's section order and phrasing are
// kept where they still apply, and the entity, address, company number and
// contact are the real ones - site operator and brand owner S72 Strategic Co.,
// Ltd., Thai importer and distributor Y Family Co., Ltd. (registration number
// 0105565114721). The Yakult-only clauses (the reproduction licence, the Yakult
// Honsha affiliates wording) are removed rather than rewritten. Still to be
// reviewed by a Thai-qualified lawyer before launch.

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
              Please read these terms and conditions carefully before you start to use our website
              (including accessing or browsing). The Steppe Gut website is operated by S72 Strategic
              Co., Ltd., and use of it is subject to the following terms and conditions. By using our
              website, you confirm that you accept these terms and conditions and that you agree to
              comply with them.
            </P>

            <Heading>Ownership of the copyright on this site</Heading>
            <P>
              Copyright © S72 Strategic Co., Ltd. 2026. All rights reserved. All copyright and other
              intellectual property rights in the text, images and other material on this site are
              owned by S72 Strategic Co., Ltd. or are included with the permission of the relevant
              owner. You may browse this site and print or download extracts for your own personal,
              non-commercial use, provided the above copyright notice appears in any copy. No other
              licence or right is granted.
            </P>

            <Heading>Ownership of trademarks on this site</Heading>
            <P>
              All trademarks displayed on this site are either owned or used under licence by S72
              Strategic Co., Ltd. The unauthorised use of any trademark on this site is strictly
              prohibited.
            </P>

            <Heading>Content</Heading>
            <P>
              The information on this site has been included in good faith but is for general
              information purposes only. It should not be relied on for any specific purpose and no
              representation or warranty is given as regards its accuracy or its completeness. Steppe
              Gut is a dietary supplement and is not intended to diagnose, treat, cure or prevent any
              disease. It should not be used as a substitute for a varied and balanced diet. It
              contains milk. Thai FDA registration is in progress; registration details will be
              published here on completion. Nothing on this website is medical advice, and you should
              consult a qualified professional about any health concern. To the extent permitted by
              law, neither S72 Strategic Co., Ltd. nor its officers, employees or agents shall be
              liable for any loss, damage or expense arising out of any access to or use of this site
              or any site linked to it, including, without limitation, any loss of profit or any
              indirect, incidental or consequential loss. S72 Strategic Co., Ltd. reserves the right
              to make any changes and corrections to this site as and when it is considered
              appropriate and without notice.
            </P>

            <Heading>Links</Heading>
            <P>
              The site may provide links to other websites, which are not under the control of S72
              Strategic Co., Ltd. S72 Strategic Co., Ltd. is not responsible in any way for the
              content of any external websites or links. Such links are provided only as a
              convenience, and the inclusion of any link does not imply endorsement by S72 Strategic
              Co., Ltd. of the content of that site.
            </P>

            <Heading>Governing law</Heading>
            <P>
              These terms and conditions, and any dispute arising out of or in connection with them,
              are governed by the law of Thailand and subject to the jurisdiction of the Thai courts.
            </P>

            <Heading>General enquiries</Heading>
            <P>
              For general enquiries and company information please email{" "}
              [contact email to be confirmed]
            </P>

            <p style={BODY} className="mt-8 font-sans text-earth/60">
              Copyright © S72 Strategic Co., Ltd. 2026. All rights reserved.
            </p>
            <p style={BODY} className="mt-8 font-sans text-earth/60">
              The Steppe Gut website is operated by S72 Strategic Co., Ltd. The product is imported
              and distributed in Thailand by Y Family Co., Ltd., registered in Thailand under
              juristic person registration number 0105565114721, registered office 45/1 Silom 19
              Building, 4th Floor, Room 415, Silom Road, Silom Subdistrict, Bang Rak District,
              Bangkok 10500.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
