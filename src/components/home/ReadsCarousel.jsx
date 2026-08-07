import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { READS } from "../../content/home";
import Placeholder from "../ui/Placeholder";

// Closing beat: a centred section title, paged arrows on the right, and a row
// of portrait cards that runs off the right edge — the reference's article
// carousel, with its alternating vertical offset kept.
//
// Paging is scroll-snap rather than a transform track, so the row is natively
// swipeable, keyboard-scrollable and arrow-driven from the same state. Page
// count is measured from the track instead of assumed, because the number of
// cards on screen changes at every breakpoint.
const RAISED = "lg:mt-14";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function ReadsCarousel() {
  const trackRef = useRef(null);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);
  // Tracked separately from `page`: the dots round to the nearest page, but
  // the arrows must stay live until the track is genuinely at an end, or a
  // rounded-up page index would disable Next with scrolling still left.
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    // A 2px slack absorbs sub-pixel rounding throughout, so a track that
    // fits doesn't report a phantom extra page or a live Next arrow.
    setAtStart(track.scrollLeft <= 2);
    setAtEnd(track.scrollLeft >= maxScroll - 2);
    if (maxScroll <= 2) {
      setPages(1);
      setPage(0);
      return;
    }
    const total = Math.ceil(maxScroll / track.clientWidth) + 1;
    setPages(total);
    // Pages are spaced evenly across the scrollable distance rather than one
    // viewport apart: the final hop is nearly always shorter than a viewport,
    // so measuring in viewports would leave the last page unreachable.
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
    <section id={READS.id} data-navtheme="light" className="scroll-mt-28 bg-cream">
      <div className="pb-24 pt-3 sm:pb-28 lg:pb-36 lg:pt-5">
        <h2
          className="mx-auto max-w-[16ch] px-5 text-center font-serif font-normal leading-[1.04] tracking-[-0.04em] text-forest sm:px-8 lg:px-10"
          style={{ fontSize: "clamp(2.45rem, 5.2vw, 4.9rem)", textWrap: "balance" }}
        >
          {READS.title}
        </h2>

        <div className="mx-auto mt-12 flex max-w-[2000px] items-center justify-end gap-3 px-5 sm:px-8 lg:mt-16 lg:px-10">
          <button
            type="button"
            aria-label="Previous"
            aria-controls="reads-track"
            onClick={() => goTo(page - 1)}
            disabled={atStart}
            className={arrow}
          >
            <ChevronLeft size={20} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            aria-label="Next"
            aria-controls="reads-track"
            onClick={() => goTo(page + 1)}
            disabled={atEnd}
            className={arrow}
          >
            <ChevronRight size={20} strokeWidth={1.75} />
          </button>
        </div>

        {/* The track clips at the container's content edge rather than the
            viewport, so the row stays on the same measure as every other
            section while the next card is still cut mid-frame — which is what
            signals there is more to scroll. */}
        <div className="mx-auto max-w-[2000px] px-5 sm:px-8 lg:px-10">
          <ul
            id="reads-track"
            ref={trackRef}
            className="no-scrollbar mt-8 flex snap-x snap-mandatory list-none gap-5 overflow-x-auto overflow-y-hidden lg:mt-10 lg:gap-8"
          >
            {READS.items.map((item, index) => (
              <li
                key={item.id}
                className={`w-[80%] flex-none snap-start sm:w-[47%] lg:w-[26%] ${
                  index % 2 === 1 ? RAISED : ""
                }`}
              >
                {/* These pointed at `#id` anchors that had no targets on the
                    page. Now that the routes exist they go to the real
                    destination, from content/home.js. */}
                <Link
                  to={item.href}
                  className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  <Placeholder
                    ratio={item.plate.ratio}
                    brief={item.plate.brief}
                    image={item.plate.image}
                    alt={item.plate.alt}
                    tone="light"
                  />
                  <p className="mt-6 font-sans text-[11px] uppercase tracking-[0.28em] text-forest/80">
                    {item.category}
                  </p>
                  <h3
                    className="mt-3 max-w-[20ch] font-serif font-normal leading-[1.14] tracking-[-0.03em] text-forest decoration-gold decoration-2 underline-offset-[6px] group-hover:underline"
                    style={{ fontSize: "clamp(1.32rem, 1.85vw, 1.75rem)" }}
                  >
                    {item.title}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>

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
