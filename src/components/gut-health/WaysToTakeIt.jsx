"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import ImagePlaceholder from "../ui/ImagePlaceholder";
import { GUT_HEALTH_WAYS } from "../../content/gutHealth";
import { H2_XL } from "../../styles/type";

// The middle shelf of /gut-health/ - the reference page's recipe carousel,
// rebuilt as a paged row of portrait cards. Same mechanics as
// components/home/ReadsCarousel: scroll-snap track so it is natively
// swipeable and keyboard-scrollable, arrows and dots driven off the same
// measured scroll position rather than a transform track, because the number
// of cards on screen changes at every breakpoint.

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Hover grows the whole tile, and the photo inside it pushes in a little
// further - the same paired scales the media cards elsewhere on the site use.
// The frame rests a touch under its layout size and grows back to it rather
// than past it, so the track's clipped edges never cut the enlarged card and
// nothing in the row reflows.
const FRAME_ZOOM =
  "scale-[0.96] transition-transform duration-500 ease-out group-hover:scale-100 " +
  "group-focus-visible:scale-100 motion-reduce:transition-none";
const PHOTO_ZOOM =
  "transition-transform duration-700 ease-out group-hover:scale-[1.06] " +
  "group-focus-visible:scale-[1.06] motion-reduce:transition-none " +
  "motion-reduce:group-hover:scale-100 motion-reduce:group-focus-visible:scale-100";

// A single bar in place of dots, matching BoosterCarousel: the pill is a
// fixed slice of the track and travels its full length as the reader pages
// through, so it reads the same on a two-page shelf as on a five-page one.
const FILL_WIDTH = 20;

export default function WaysToTakeIt() {
  const trackRef = useRef(null);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);
  // Tracked apart from `page`: the dots round to the nearest page, but the
  // arrows stay live until the track is genuinely at an end.
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
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
    track.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
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

  const fillShift = pages > 1 ? (page / (pages - 1)) * (100 - FILL_WIDTH) : 0;

  // The circle stays solid at both ends of the track - only the chevron fades
  // - so the control keeps its shape when a direction runs out.
  const arrow =
    "flex h-11 w-11 flex-none items-center justify-center rounded-full bg-forest text-cream transition-colors hover:bg-forest/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-not-allowed disabled:text-cream/40 disabled:hover:bg-forest";

  return (
    <div>
      <div className="mx-auto max-w-[2000px] px-5 sm:px-8 lg:px-10">
        <h2
          className="mx-auto max-w-[24ch] text-center font-serif font-bold tracking-[-0.02em] text-forest"
          style={H2_XL}
        >
          {GUT_HEALTH_WAYS.heading}
        </h2>
      </div>

      {/* The track clips at the content measure, not the viewport, so the row
          sits on the same column as every other section while the next card
          is still cut mid-frame - which is what signals there is more. */}
      <div className="mx-auto mt-8 max-w-[2000px] px-5 sm:px-8 lg:mt-10 lg:px-10">
        <ul
          id="ways-track"
          ref={trackRef}
          className="no-scrollbar flex list-none snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden lg:gap-8 [&::-webkit-scrollbar]:hidden"
        >
          {GUT_HEALTH_WAYS.items.map((item, index) => (
            <li
              key={item.id}
              className={`w-[80%] flex-none snap-start sm:w-[47%] lg:w-[27%] ${
                index % 2 === 1 ? "lg:mt-14" : ""
              }`}
            >
              <Link
                href={item.to}
                className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                <ImagePlaceholder
                  description={item.image}
                  src={item.src}
                  alt={item.alt}
                  ratio="3 / 4"
                  rounded="rounded-[20px]"
                  className={FRAME_ZOOM}
                  imgClassName={PHOTO_ZOOM}
                />
                <p className="mt-5 font-sans text-sm font-semibold uppercase tracking-[0.16em] text-forest/55">
                  {item.label}
                </p>
                <h3 className="mt-2 font-serif text-[1.5rem] font-normal leading-[1.15] tracking-[-0.02em] text-forest">
                  {item.title}
                </h3>
                <p className="mt-2 font-sans text-forest/70">{item.note}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {pages > 1 && (
        <div className="mx-auto mt-10 flex w-full max-w-[540px] items-center gap-4 px-5 sm:gap-5 sm:px-0 lg:mt-12">
          <button
            type="button"
            aria-label="Previous"
            aria-controls="ways-track"
            onClick={() => goTo(page - 1)}
            disabled={atStart}
            className={arrow}
          >
            <ChevronLeft size={18} strokeWidth={2.25} />
          </button>

          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-forest/15">
            <div
              className="h-full rounded-full bg-forest transition-transform duration-500 ease-out motion-reduce:transition-none"
              style={{
                width: `${FILL_WIDTH}%`,
                transform: `translateX(${(fillShift / FILL_WIDTH) * 100}%)`,
              }}
            />
          </div>

          <button
            type="button"
            aria-label="Next"
            aria-controls="ways-track"
            onClick={() => goTo(page + 1)}
            disabled={atEnd}
            className={arrow}
          >
            <ChevronRight size={18} strokeWidth={2.25} />
          </button>
        </div>
      )}
    </div>
  );
}
