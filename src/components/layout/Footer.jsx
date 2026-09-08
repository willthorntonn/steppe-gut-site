import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FOOTER_LINKS } from "../../data/site";
import { SOCIAL_PLATFORMS } from "../../data/social";

const TRANSPARENT = ["rgba(0, 0, 0, 0)", "transparent"];

// The corners uncovered by the footer's arc need to match whatever the page
// actually ends on - cream on most pages, but plain white on the product
// pages (the AG1 comparison/scoop sections are `all: initial` white blocks).
// Hardcoding one color here drifts out of sync the moment a page's last
// section changes, so instead this walks down the DOM's last-child chain
// from #main, reading real computed backgrounds until it finds one that
// isn't transparent - a DOM-order probe rather than a viewport hit-test, so
// it isn't thrown off by scroll position.
function findPageEndBackground() {
  let el = document.getElementById("main")?.lastElementChild ?? null;
  while (el) {
    const color = getComputedStyle(el).backgroundColor;
    if (color && !TRANSPARENT.includes(color)) return color;
    el = el.lastElementChild;
  }
  return null;
}

function usePageEndBackground() {
  const location = useLocation();
  const [bg, setBg] = useState(null);

  useEffect(() => {
    const main = document.getElementById("main");
    if (!main) return;

    const update = () => setBg(findPageEndBackground());
    update();

    // Routes are lazy-loaded (App.jsx): #main first mounts a cream
    // RouteFallback, then swaps in the real page once its chunk resolves.
    // A MutationObserver catches that swap - and any later content change,
    // e.g. an accordion opening the last section - so the sample never goes
    // stale the way a one-shot read keyed only on the route would.
    const observer = new MutationObserver(update);
    observer.observe(main, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [location.pathname]);

  return bg;
}

// Social glyphs are the standard simplified brand marks used site-wide for
// outbound "follow us" links (the common open-source icon set every major
// footer draws from) - not a reproduction of Steppe Gut's own identity, so
// they carry none of the horse-mark's brand rules.
const FACEBOOK_PATH =
  "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 7.626 7.626 0 0 0-.735-.034c-.408 0-.777.033-1.101.093-.294.086-.591.279-.844.501-.246.257-.472.582-.539.899-.077.302-.117.767-.117 1.397v1.115h3.828l-.542 3.667h-3.286v7.98H9.101z";
const INSTAGRAM_PATH =
  "M12 0C8.74 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.014 8.333 0 8.74 0 12s.014 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.986 8.74 24 12 24s3.667-.014 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.014-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.014 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z";
const YOUTUBE_PATH =
  "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z";
const TIKTOK_PATH =
  "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z";

// Fixed 2-up arrangement rather than a generic map: Facebook, Instagram and
// YouTube stack down the left column in that order, with TikTok sitting to
// Facebook's right on the top row only - matching the reference exactly
// rather than an evenly-spaced grid.
// Every account is still unopened, so none of these can point at a real
// profile. They previously carried href="#" - a dead link on every page.
// They now go to /social/, which explains the position honestly, and each
// carries a label saying so rather than promising a profile that isn't there.
// When SOCIAL_PLATFORMS in data/social.js gains real URLs, these follow.
const SOCIAL_CELLS = [
  { label: "Facebook", d: FACEBOOK_PATH },
  { label: "TikTok", d: TIKTOK_PATH },
  { label: "Instagram", d: INSTAGRAM_PATH },
  null,
  { label: "YouTube", d: YOUTUBE_PATH },
  null,
];

function socialTarget(label) {
  const platform = SOCIAL_PLATFORMS.find((item) => item.name === label);
  return platform?.href ?? null;
}

// Rescoped to the seven live routes. The previous set (Careers, Press,
// Corporate, FAQs) and the legal row (Terms, Cookies, Privacy, Sitemap)
// pointed at pages that were deliberately cut from the build - a footer link
// to a page that does not exist is worse than no link, so they are removed
// rather than left as `href="#"`. They come back when those pages do.
const SITE_LINKS = FOOTER_LINKS;

// Bottom-bar legal row. These pages aren't in the build yet; the links are
// here so the bar matches the reference and resolve once the pages land.
const LEGAL_LINKS = [
  { label: "Terms and conditions", to: "/terms/" },
  { label: "Cookies", to: "/cookies/" },
  { label: "Privacy Policy", to: "/privacy/" },
  { label: "Sitemap", to: "/sitemap/" },
];

function SocialIcon({ d }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[22px] w-[22px] lg:h-8 lg:w-8" fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function LinkList({ items }) {
  return (
    <ul className="mt-9 flex flex-col gap-6 lg:mt-14 lg:gap-9">
      {items.map((item) => (
        <li key={item.to}>
          <Link
            to={item.to}
            className="font-sans text-lg font-bold text-cream/90 transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold lg:text-2xl"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

// Three-column footer - Follow us / Get in Touch! / About Us - plus a bottom
// legal bar, matching the reference's structure and rhythm exactly rather
// than the previous colophon layout. The reference's own on-scroll social
// rail sits to the side of the page as a separate fixed element, not inside
// the footer, so it isn't part of this component.
//
// The top edge is a shallow convex arc. It's drawn as an elliptical
// border-radius on the footer's own background rather than an SVG mask -
// every child band is transparent, so nothing needs clipping.
// The corners left uncovered by the arc's border-radius show whatever is
// behind the footer. The outer div below is a plain (unrounded) rectangle
// sized exactly to the footer, coloured to match whatever the page actually
// ends on (see usePageEndBackground) - cream on most pages, white on the
// product pages - instead of showing through to whatever sits underneath.
export default function Footer() {
  const pageEndBg = usePageEndBackground();

  return (
    <div className="bg-cream" style={pageEndBg ? { backgroundColor: pageEndBg } : undefined}>
    <footer
      data-navtheme="dark"
      className="bg-forest text-cream"
      style={{ borderRadius: "50% 50% 0 0 / 48px 48px 0 0" }}
    >
      {/* At lg the three columns sit on one row, but the middle one is the
          only column whose content can reflow, so it is the one allowed to
          shrink (min-w-0 + a ch-capped measure). Left and right stay at their
          intrinsic width; without the cap the enquiry line ran full-width and
          collided with About Us at intermediate desktop sizes. */}
      <div className="mx-auto grid max-w-[2000px] grid-cols-1 gap-12 px-5 pb-16 pt-24 sm:grid-cols-3 sm:gap-8 sm:px-8 lg:flex lg:items-start lg:justify-between lg:gap-12 lg:px-16 lg:pb-28 lg:pt-36 xl:gap-20">
        <div className="lg:shrink-0">
          <h3 className="font-serif text-[26px] font-normal tracking-[-0.03em] text-cream lg:text-[46px]">
            Follow us
          </h3>
          <div className="mt-9 grid w-fit grid-cols-2 gap-6 lg:mt-14 lg:gap-9">
            {SOCIAL_CELLS.map((cell, index) =>
              cell ? (
                (() => {
                  const live = socialTarget(cell.label);
                  const cls =
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream text-forest transition-colors hover:bg-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold lg:h-[70px] lg:w-[70px]";
                  return live ? (
                    <a
                      key={cell.label}
                      href={live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Steppe Gut on ${cell.label}`}
                      className={cls}
                    >
                      <SocialIcon d={cell.d} />
                    </a>
                  ) : (
                    <Link
                      key={cell.label}
                      to="/social/"
                      aria-label={`${cell.label} - our accounts are not open yet`}
                      className={cls}
                    >
                      <SocialIcon d={cell.d} />
                    </Link>
                  );
                })()
              ) : (
                <span key={`spacer-${index}`} aria-hidden="true" />
              )
            )}
          </div>
        </div>

        <div className="min-w-0 lg:max-w-[42ch] lg:flex-1">
          <h3 className="font-serif text-[26px] font-normal tracking-[-0.03em] text-cream lg:text-[46px]">
            Get in Touch!
          </h3>
          <p className="mt-7 max-w-[34ch] font-sans text-base leading-[1.6] text-cream/85 lg:mt-9 lg:max-w-none lg:text-2xl">
            Do you have a specific enquiry or would simply like more
            information about Steppe Gut?
          </p>
          <Link
            to="/contact/"
            className="mt-9 inline-flex h-12 items-center justify-center rounded-2xl border border-cream px-8 font-sans text-[21px] font-bold tracking-[-0.02em] text-cream transition-colors hover:bg-cream hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold lg:mt-12 lg:h-16 lg:px-11 lg:text-[26px]"
          >
            Contact Us
          </Link>
        </div>

        <div className="sm:w-fit sm:justify-self-end lg:w-fit lg:shrink-0">
          <h3 className="font-serif text-[26px] font-normal tracking-[-0.03em] text-cream lg:text-[46px]">
            Explore
          </h3>
          <LinkList items={SITE_LINKS} />
        </div>
      </div>

      <div className="mx-auto flex max-w-[2000px] flex-col gap-4 px-5 pb-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-16 lg:pb-11">
        <ul className="flex flex-wrap items-center gap-x-10 gap-y-3 font-sans text-xs text-cream/70 lg:text-base">
          {LEGAL_LINKS.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="text-cream/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="shrink-0 font-sans text-xs text-cream/60 lg:text-base">
          &copy; {new Date().getFullYear()} Copyright S72 Strategic Limited
        </p>
      </div>
    </footer>
    </div>
  );
}
