import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "../ui/Container";
import ImagePlaceholder from "../ui/ImagePlaceholder";
import { BODY, H2 } from "../../styles/type";

// The middle rail of /gut-health/exercise/ - the reference page's "make it
// fun" carousel, rebuilt as a paged row of portrait cards. Same mechanics as
// components/gut-health/WaysToTakeIt and components/home/ReadsCarousel:
// scroll-snap track so it is natively swipeable and keyboard-scrollable,
// arrows and dots driven off the measured scroll position rather than a
// transform track, because the number of cards on screen changes at every
// breakpoint. Cards here are not links - the ideas have no page of their own.

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

export default function MovementCarousel({ heading, intro, items }) {
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

  const arrow =
    "flex h-12 w-12 items-center justify-center rounded-full bg-forest text-cream transition-colors hover:bg-forest/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-35";

  return (
    <div>
      <Container width="content">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif font-normal text-forest" style={H2}>
              {heading}
            </h2>
            <p className="mt-6 max-w-[52ch] font-sans text-forest/80" style={BODY}>
              {intro}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              aria-label="Previous"
              aria-controls="movement-track"
              onClick={() => goTo(page - 1)}
              disabled={atStart}
              className={arrow}
            >
              <ChevronLeft size={20} strokeWidth={1.75} />
            </button>
            <button
              type="button"
              aria-label="Next"
              aria-controls="movement-track"
              onClick={() => goTo(page + 1)}
              disabled={atEnd}
              className={arrow}
            >
              <ChevronRight size={20} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </Container>

      {/* The track clips at the content measure, not the viewport, so the row
          sits on the same column as every other section while the next card
          is still cut mid-frame - which is what signals there is more. */}
      <div className="mx-auto mt-12 max-w-[1180px] px-6 sm:px-10 lg:mt-14 lg:px-14">
        <ul
          id="movement-track"
          ref={trackRef}
          className="no-scrollbar flex list-none snap-x snap-mandatory gap-5 overflow-x-auto overflow-y-hidden lg:gap-8 [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <li
              key={item.id}
              className="w-[74%] flex-none snap-start sm:w-[44%] lg:w-[calc((100%-4rem)/3)]"
            >
              <ImagePlaceholder
                description={item.image}
                src={item.src}
                alt={item.alt}
                ratio="3 / 4"
                rounded="rounded-[20px]"
                className={`group ${FRAME_ZOOM}`}
                imgClassName={PHOTO_ZOOM}
              />
              <p className="mt-5 font-sans text-sm font-semibold uppercase tracking-[0.16em] text-forest/55">
                {item.label}
              </p>
              <h3 className="mt-2 font-serif text-[1.5rem] font-normal leading-[1.15] tracking-[-0.02em] text-forest">
                {item.title}
              </h3>
              <p className="mt-2 font-sans text-forest/70">{item.note}</p>
            </li>
          ))}
        </ul>
      </div>

      {pages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-1 lg:mt-12">
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
  );
}
