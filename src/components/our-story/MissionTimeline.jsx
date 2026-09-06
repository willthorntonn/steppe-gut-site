import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BODY_SM, H2, H3 } from "../../styles/type";

// The "Our Story" era rail on /our-story/mission/, in the reference page's
// timeline shape: a centred section title, paged arrows on the right, and a
// row of era cards that runs off the right edge so the cut card signals there
// is more to scroll.
//
// Paging is scroll-snap measured from the track rather than a transform, so
// the row is natively swipeable, keyboard-scrollable and arrow-driven from one
// piece of state - the same mechanism as home/ReadsCarousel, kept consistent
// on purpose. Page count is measured, not assumed, because the number of cards
// on screen changes at every breakpoint.

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
    // 2px slack absorbs sub-pixel rounding, so a track that fits doesn't report
    // a phantom extra page or a live Next arrow.
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

  const arrow =
    "flex h-12 w-12 items-center justify-center rounded-full bg-forest text-cream transition-colors hover:bg-forest/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-35";

  return (
    <section data-navtheme="light" className="scroll-mt-28 bg-cream py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[2000px] px-6 sm:px-10 lg:px-14">
        <h2
          className="mx-auto max-w-[16ch] text-center font-serif font-normal text-forest"
          style={H2}
        >
          {heading}
        </h2>

        <div className="mt-12 flex items-center justify-end gap-3 lg:mt-16">
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

        <ol
          id="mission-timeline-track"
          ref={trackRef}
          className="no-scrollbar mt-8 flex snap-x snap-mandatory list-none gap-5 overflow-x-auto overflow-y-hidden lg:mt-10 lg:gap-8"
        >
          {items.map((item) => (
            <li
              key={item.era}
              className="w-[78%] flex-none snap-start sm:w-[46%] lg:w-[30%]"
            >
              <div className="flex h-full flex-col rounded-[20px] bg-[#E8EDE4] p-8 lg:p-10">
                <span className="block h-px w-12 bg-gold" aria-hidden="true" />
                <h3 className="mt-6 font-serif font-normal text-forest" style={H3}>
                  {item.era}
                </h3>
                <p className="mt-4 font-sans text-forest/75" style={BODY_SM}>
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {pages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-1 lg:mt-16">
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
