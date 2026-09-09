"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import ImagePlaceholder from "../ui/ImagePlaceholder";
import { BODY, H3, H2_XL } from "../../styles/type";

// One paged card shelf on /gut-health/mood/ - the reference article's habit
// carousels, rebuilt as a single reusable shelf driven by props. Same
// mechanics as components/gut-health/WaysToTakeIt and
// components/home/ReadsCarousel: a scroll-snap track so it is natively
// swipeable and keyboard-scrollable, with the arrows and progress bar driven
// off the measured scroll position rather than a transform track, because the number
// of cards on screen changes at every breakpoint. Each id keeps its own
// track so several shelves can sit on one page without their controls
// crossing wires.
//
// `overlayCaption` (used by /gut-health/exercise/) lays the caption over the
// foot of the photo in cream with a small forward arrow under it, on a soft
// bottom scrim, instead of setting it in forest below the frame.
//
// `expandable` (also /gut-health/exercise/) turns each card into a button:
// clicking one cross-fades the whole shelf out and an inline detail panel in,
// with the photo on the left and the card's title and `body` copy on the
// right, flanked by prev/next arrows that cycle through the set. The close
// cross fades it back to the shelf. Needs every item to carry a `body`.

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Hover grows the whole tile, and the photo inside it pushes in a little
// further - the same paired scales the media cards elsewhere on the site use.
// The frame rests a touch under its layout size and grows back to it rather
// than past it, so the track's clipped edges never cut the enlarged card and
// nothing in the row reflows.
const FRAME_ZOOM =
  "scale-[0.96] transition-transform duration-500 ease-out hover:scale-100 " +
  "focus-within:scale-100 motion-reduce:transition-none";
const PHOTO_ZOOM =
  "transition-transform duration-700 ease-out group-hover:scale-[1.06] " +
  "group-focus-visible:scale-[1.06] motion-reduce:transition-none " +
  "motion-reduce:group-hover:scale-100 motion-reduce:group-focus-visible:scale-100";

export default function BoosterCarousel({
  heading,
  intro,
  items,
  overlayCaption = false,
  expandable = false,
}) {
  const trackId = `booster-track-${useId().replace(/[:]/g, "")}`;
  const trackRef = useRef(null);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);
  // Tracked apart from `page`: the bar rounds to the nearest page, but the
  // arrows stay live until the track is genuinely at an end.
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  // Detail panel (expandable shelves only). `openIndex` is null when the
  // shelf is showing; `shownIndex` lags a beat behind so the panel keeps its
  // photo and copy while it fades back out rather than blanking mid-transition.
  const [openIndex, setOpenIndex] = useState(null);
  const [shownIndex, setShownIndex] = useState(0);
  const isOpen = openIndex !== null;
  const activeItem = items[shownIndex];

  const shelfRef = useRef(null);
  const closeRef = useRef(null);
  const cardRefs = useRef([]);
  const returnFocusRef = useRef(null);

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

  const openPanel = (index) => {
    returnFocusRef.current = cardRefs.current[index] || null;
    setShownIndex(index);
    setOpenIndex(index);
  };
  const closePanel = () => setOpenIndex(null);
  const stepPanel = (dir) =>
    setOpenIndex((i) => {
      if (i === null) return i;
      const next = (i + dir + items.length) % items.length;
      setShownIndex(next);
      return next;
    });

  // The shelf underneath is taken out of the tab order and off the
  // accessibility tree while the panel is up, so keyboard focus cannot land
  // on a hidden card. `inert` is a DOM property here, so it is React-version
  // independent.
  useEffect(() => {
    if (shelfRef.current) shelfRef.current.inert = isOpen;
  }, [isOpen]);

  // Focus moves into the panel on open and back to the card that opened it on
  // close. Escape closes; the arrow keys page through the set.
  useEffect(() => {
    if (isOpen) {
      closeRef.current?.focus();
    } else if (returnFocusRef.current) {
      returnFocusRef.current.focus();
      returnFocusRef.current = null;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closePanel();
      else if (e.key === "ArrowLeft") stepPanel(-1);
      else if (e.key === "ArrowRight") stepPanel(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, items.length]);

  const goTo = (next) => {
    const track = trackRef.current;
    if (!track || pages < 2) return;
    const target = Math.max(0, Math.min(pages - 1, next));
    track.scrollTo({
      left: (target / (pages - 1)) * (track.scrollWidth - track.clientWidth),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  // The circle itself stays solid at both ends of the track - only the chevron
  // fades - so the control keeps its shape when a direction runs out.
  const arrow =
    "flex h-11 w-11 flex-none items-center justify-center rounded-full bg-forest text-cream transition-colors hover:bg-forest/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-not-allowed disabled:text-cream/40 disabled:hover:bg-forest";

  // A single bar in place of dots. The pill is a fixed slice of the track
  // rather than one page wide, so it reads the same on a two-page shelf as on
  // a five-page one, and it travels the full length as the reader pages
  // through - position, not proportion, is what the bar is saying.
  const FILL_WIDTH = 20;
  const fillShift = pages > 1 ? (page / (pages - 1)) * (100 - FILL_WIDTH) : 0;

  return (
    <div>
      <div className="mx-auto max-w-[2000px] px-5 sm:px-8 lg:px-10">
        <h2
          className="mx-auto max-w-[24ch] text-center font-serif font-bold tracking-[-0.02em] text-forest"
          style={H2_XL}
        >
          {heading}
        </h2>
        {intro && (
          <p className="mx-auto mt-6 max-w-[46ch] text-center font-sans text-forest/80" style={BODY}>
            {intro}
          </p>
        )}
      </div>

      <div className="relative">
        {/* View 1 - the shelf. Fades and lifts out of the way while the
            detail panel is up, and is made inert so it cannot be reached. */}
        <div
          ref={shelfRef}
          className={`transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
            isOpen ? "pointer-events-none -translate-y-2 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          {/* The track clips at the content measure, not the viewport, so the
              row sits on the same column as every other section while the next
              card is still cut mid-frame - which is what signals there is more. */}
          <div className="mx-auto mt-8 max-w-[2000px] px-5 sm:px-8 lg:mt-10 lg:px-10">
            <ul
              id={trackId}
              ref={trackRef}
              className="no-scrollbar flex list-none snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden lg:gap-8 [&::-webkit-scrollbar]:hidden"
            >
              {items.map((item, index) => {
                const frame = (
                  <ImagePlaceholder
                    description={item.image}
                    src={item.src}
                    alt={item.alt}
                    ratio="3 / 4"
                    rounded="rounded-[20px]"
                    className={`group ${FRAME_ZOOM}`}
                    imgClassName={PHOTO_ZOOM}
                  >
                    {overlayCaption && (
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center bg-gradient-to-t from-forest/55 via-forest/15 to-transparent px-5 pb-7 pt-16 text-center">
                        <p className="font-sans text-cream" style={BODY}>
                          {item.caption}
                        </p>
                        <ArrowRight
                          className="mt-3 text-cream"
                          size={22}
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                      </div>
                    )}
                  </ImagePlaceholder>
                );

                return (
                  <li
                    key={item.id}
                    className={`w-[80%] flex-none snap-start sm:w-[47%] lg:w-[27%] ${
                      index % 2 === 1 ? "lg:mt-14" : ""
                    }`}
                  >
                    {expandable ? (
                      <button
                        type="button"
                        ref={(el) => {
                          cardRefs.current[index] = el;
                        }}
                        onClick={() => openPanel(index)}
                        aria-haspopup="dialog"
                        aria-label={`${item.caption} - read more`}
                        className="block w-full rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                      >
                        {frame}
                      </button>
                    ) : (
                      frame
                    )}
                    {!overlayCaption && (
                      <p className="mt-5 font-sans text-forest/80" style={BODY}>
                        {item.caption}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {pages > 1 && (
            <div className="mx-auto mt-10 flex w-full max-w-[540px] items-center gap-4 px-5 sm:gap-5 sm:px-0 lg:mt-12">
              <button
                type="button"
                aria-label="Previous"
                aria-controls={trackId}
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
                aria-controls={trackId}
                onClick={() => goTo(page + 1)}
                disabled={atEnd}
                className={arrow}
              >
                <ChevronRight size={18} strokeWidth={2.25} />
              </button>
            </div>
          )}
        </div>

        {/* View 2 - the detail panel. Sits over the shelf's box and is
            centred in it, so opening and closing does not shift the page. */}
        {expandable && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeItem?.caption}
            aria-hidden={!isOpen}
            onClick={(e) => {
              if (e.target === e.currentTarget) closePanel();
            }}
            className={`absolute inset-0 flex items-start justify-center transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
              isOpen
                ? "opacity-100 translate-y-0"
                : "pointer-events-none translate-y-3 opacity-0"
            }`}
          >
            <div className="mx-auto w-full max-w-[2000px] px-5 sm:px-8 lg:px-10">
              <div className="relative pt-8 lg:pt-10">
                <button
                  type="button"
                  ref={closeRef}
                  onClick={closePanel}
                  aria-label="Close"
                  className="absolute right-0 top-8 flex h-11 w-11 items-start justify-center text-forest/70 transition-colors hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold lg:top-10"
                >
                  <X size={32} strokeWidth={1.75} />
                </button>

                {/* items-center: the text block is centred against the middle
                    of the photo. The bodies are close enough in length that
                    the heading lands at the same height on every card. */}
                <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
                  <ImagePlaceholder
                    description={activeItem?.image}
                    src={activeItem?.src}
                    alt={activeItem?.alt}
                    ratio="4 / 3"
                    rounded="rounded-[20px]"
                  />

                  <div className="flex flex-col items-center text-center">
                    {/* The arrow row and the paragraph share one measure, and
                        justify-between pushes the chevrons out to its edges,
                        so they sit above the ends of the body copy beneath. */}
                    <div className="w-full max-w-[32rem]">
                      <div className="flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => stepPanel(-1)}
                          aria-label="Previous"
                          className={arrow}
                        >
                          <ChevronLeft size={18} strokeWidth={2.25} />
                        </button>
                        <h3
                          className="font-serif font-bold tracking-[-0.02em] text-forest"
                          style={H3}
                        >
                          {activeItem?.caption}
                        </h3>
                        <button
                          type="button"
                          onClick={() => stepPanel(1)}
                          aria-label="Next"
                          className={arrow}
                        >
                          <ChevronRight size={18} strokeWidth={2.25} />
                        </button>
                      </div>

                      <p className="mt-8 font-sans text-forest/80" style={BODY}>
                        {activeItem?.body}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
