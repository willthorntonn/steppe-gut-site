"use client";

import Link from "next/link";
import {
  GUT_HEALTH_LINKS,
  OUR_STORY_LINKS,
  PRODUCT_LINKS,
} from "../data/site";

// Plain index of every page a visitor can reach, reached from the footer's
// legal row. It mirrors the reference sitemap (yakult.co.uk/sitemap) in
// shape - a display title, a "Pages" group, then a nested list where the two
// sectioned areas (Our Story, Gut Health) and Products carry their sub-pages
// indented beneath them - rebuilt in Steppe Gut's own type and palette.
//
// The reference runs two ink colours: brand red for the title, near-black for
// every link. That maps onto forest (our brand primary) for the title and
// earth (our darkest neutral) for the links, with forest on hover so a link
// still resolves against body copy without a third colour.

const BODY = {
  fontSize: "clamp(1.25rem, 1.6vw, 1.55rem)",
  lineHeight: 1.75,
};

const TITLE = {
  fontSize: "clamp(3.625rem, 4.64vw, 4.5rem)",
  lineHeight: 1.25,
  letterSpacing: "-0.035em",
  textWrap: "balance",
};

const GROUP = {
  fontSize: "clamp(2.375rem, 3.04vw, 2.95rem)",
  lineHeight: 1.25,
  letterSpacing: "-0.03em",
  textWrap: "balance",
};

// The tree. `children` is the indented sub-list under a sectioned area. The
// section overviews (Our Story, Gut Health, Products) drop their own "All"
// entry - the parent row already links to it - and keep the rest.
const PAGES = [
  { label: "Home", to: "/" },
  {
    label: "Products",
    to: "/products/",
    children: PRODUCT_LINKS.filter((item) => item.label !== "All"),
  },
  {
    label: "Our Story",
    to: "/our-story/",
    children: OUR_STORY_LINKS.filter((item) => item.label !== "All"),
  },
  {
    label: "Gut Health",
    to: "/gut-health/",
    children: GUT_HEALTH_LINKS.filter((item) => item.label !== "All"),
  },
  { label: "FAQ", to: "/faq/" },
  { label: "Buy Steppe Gut", to: "/buy/" },
  { label: "Contact Us", to: "/contact/" },
  { label: "Social", to: "/social/" },
  { label: "Cookie Policy", to: "/cookies/" },
];

function SitemapLink({ to, children }) {
  return (
    <Link
      href={to}
      style={BODY}
      className="inline-block font-sans text-earth underline underline-offset-[3px] decoration-forest/40 transition-colors hover:text-forest hover:decoration-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      {children}
    </Link>
  );
}

export default function Sitemap() {
  return (
    <>
      <div
        data-navtheme="light"
        className="bg-cream pb-28 pt-[112px] sm:pt-[132px] lg:pb-40 lg:pt-[186px]"
      >
        {/* Same geometry as the cookie policy: a 1578px outer box with the
            measure capped, so the two legal pages read as one set. */}
        <div className="mx-auto w-full max-w-[1578px] px-6 sm:px-10 lg:px-14">
          <div className="max-w-[1087px]">
            <h1
              id="page-title"
              tabIndex={-1}
              style={TITLE}
              className="font-serif font-semibold text-forest outline-none"
            >
              Sitemap
            </h1>

            <h2 style={GROUP} className="mt-16 font-serif font-semibold text-earth">
              Pages
            </h2>

            <ul className="mt-10 flex flex-col gap-5">
              {PAGES.map((page) => (
                <li key={page.to}>
                  <SitemapLink to={page.to}>{page.label}</SitemapLink>
                  {page.children && (
                    <ul className="mt-5 flex flex-col gap-5 pl-8">
                      {page.children.map((child) => (
                        <li key={child.to}>
                          <SitemapLink to={child.to}>{child.label}</SitemapLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
