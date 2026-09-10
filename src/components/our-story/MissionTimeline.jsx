"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Placeholder from "../ui/Placeholder";
import { H2_XL } from "../../styles/type";

// The "Our Story" beats on /our-story/mission/. Card look and hover are lifted
// wholesale from home/ProcessRow - a cream band (never green), an oversized
// heavy heading, then a row of cards where, on hover, a white panel lifts in
// behind the card and grows outward on every side, the image frame grows with
// it, and the photo tightens on its own centre.
//
// All four beats sit on one horizontal line. Only three fit at a time, so the
// row is a scroll-snap carousel driven by the arrows above it and the dots
// below - the same measured-from-the-track paging as home/ReadsCarousel and
// the original of this component, kept swipeable and keyboard-scrollable.
//
// Vertical rhythm runs down -> up -> down -> up: the 2nd and 4th cards are
// raised out of line on lg (RAISED), the 1st and 3rd sit at the baseline. The
// offset is decorative and collapses below lg. Each card carries a stock
// steppe photograph; the written brief still rides along as its fallback and
// as the spec for the commissioned shot that will replace it.
const RAISED = "lg:-mt-14";

// On hover a white panel lifts in behind the card and grows 12px outward on
// every side. Absolutely positioned, so growing it costs no layout.
const PANEL_BOX =
  "absolute -left-5 -right-5 -top-5 -bottom-10 rounded-[32px] transition-all duration-500 ease-out " +
  "group-hover:-left-8 group-hover:-right-8 group-hover:-top-8 group-hover:-bottom-[3.25rem] " +
  "group-focus-visible:-left-8 group-focus-visible:-right-8 group-focus-visible:-top-8 group-focus-visible:-bottom-[3.25rem]";

// The frame grows with the panel; the photo inside pushes in a little further,
// so the crop tightens on its own centre. The text is in neither, so it holds
// its size while the boxes grow.
const FRAME =
  "rounded-[28px] transition-transform duration-500 ease-out " +
  "group-hover:scale-[1.035] group-focus-visible:scale-[1.035]";
const PHOTO =
  "transition-transform duration-700 ease-out " +
  "group-hover:scale-[1.06] group-focus-visible:scale-[1.06]";

const TITLE_SIZE = { fontSize: "clamp(1.6rem, calc(2.3 * var(--vw)), 2.2rem)" };
const BODY_SIZE = {
  fontSize: "clamp(1.25rem, calc(1.6 * var(--vw)), 1.55rem)",
  lineHeight: 1.7,
};

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function MissionTimeline({ heading, items }) {
  const trackRef = useRef(null);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);
  // Tracked separately from `page`: the dots round to the nearest page, but the
  // arrows must stay live until the track is genuinely at an end.
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    // 2px slack absorbs sub-pixel rounding.
    setAtStart(track.scrollLeft <= 2);
    setAtEnd(track.scrollLeft >= maxScroll - 2);
    if (maxScroll <= 2) {
      setPages(1);
      setPage(0);
      return;
    }
    const total = Math.ceil(maxScroll / track.clientWidth) + 1;
    setPages(total);
    setPage(Math.round((track.scrollLeft / maxScroll) * (total - 1)));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    measure();
    // The row sizes late - it is inside a Reveal and its image frames settle a
    // frame or two after mount - so a single mount measure can read a stale
    // width and wrongly disable Next. Re-measure on the next frame and whenever
    // the track's own box changes, not just on window resize.
    const raf = requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    track.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      track.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const goTo = (next) => {
    const track = trackRef.current;
    if (!track || pages < 2) return;
    const target = Math.max(0, Math.min(pages - 1, next));
    track.scrollTo({
      left: (target / (pages - 1)) * (track.scrollWidth - track.clientWidth),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const arrow =
    "flex h-12 w-12 items-center justify-center rounded-full bg-forest text-cream transition-colors hover:bg-forest/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-35";

  return (
    <section
      id="mission-timeline"
      data-navtheme="light"
      className="scroll-mt-[140px] bg-cream pt-8 pb-14 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20"
    >
      <div className="mx-auto max-w-[2000px] px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            aria-label="Previous"
            aria-controls="mission-timeline-track"
            onClick={() => goTo(page - 1)}
            disabled={atStart}
            className={arrow}
          >
            <ChevronLeft size={20} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            aria-label="Next"
            aria-controls="mission-timeline-track"
            onClick={() => goTo(page + 1)}
            disabled={atEnd}
            className={arrow}
          >
            <ChevronRight size={20} strokeWidth={1.75} />
          </button>
        </div>

        {/* pt/pb give the raised cards and their hover panels headroom inside
            the horizontal scroller (which clips the vertical axis). */}
        <ol
          id="mission-timeline-track"
          ref={trackRef}
          className="no-scrollbar mt-8 flex snap-x snap-mandatory list-none items-start gap-6 overflow-x-auto overflow-y-hidden pb-16 pt-24 sm:mt-10 lg:mt-12 lg:gap-12 lg:pb-24 lg:pt-32"
        >
          {items.map((item, index) => (
            <li
              key={item.era}
              className={`group relative w-[82%] flex-none snap-start sm:w-[47%] lg:w-[31%] ${
                index % 2 === 1 ? RAISED : ""
              }`}
            >
              {/* The white panel, behind everything. */}
              <span
                aria-hidden
                className={`${PANEL_BOX} bg-transparent group-hover:bg-white group-hover:shadow-[0_28px_64px_-24px_rgba(38,50,38,0.32)] group-focus-visible:bg-white group-focus-visible:shadow-[0_28px_64px_-24px_rgba(38,50,38,0.32)]`}
              />

              <div className="relative">
                <Placeholder
                  ratio="16 / 9"
                  brief={item.brief}
                  image={item.src}
                  alt={item.alt}
                  tone="light"
                  className={FRAME}
                  imageClassName={PHOTO}
                />

                <h3
                  className="mt-12 max-w-[18ch] font-serif font-bold leading-[1.1] tracking-[-0.03em] text-forest"
                  style={TITLE_SIZE}
                >
                  {item.era}
                </h3>

                <p
                  className="mt-6 max-w-[44ch] font-sans text-forest/80"
                  style={BODY_SIZE}
                >
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {pages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-1 lg:mt-10">
            {Array.from({ length: pages }, (_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to page ${index + 1} of ${pages}`}
                aria-current={index === page}
                onClick={() => goTo(index)}
                className="flex h-11 w-11 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <span
                  className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                    index === page ? "bg-forest" : "bg-forest/25"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
