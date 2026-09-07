import { Link } from "react-router-dom";
import { PROCESS } from "../../content/home";
import Placeholder from "../ui/Placeholder";

// Three-up media row, matching the reference's video-tile band: a wide frame,
// then the title and copy beneath it. The reference raises its middle tile out
// of line, which is the only reason these columns are not flush - the offset is
// decorative rhythm, not hierarchy, so it collapses below lg.
const RAISED = "lg:-mt-14";

// On hover a white panel lifts in behind the card and grows 12px outward on
// every side. It is absolutely positioned, so growing it costs no layout - the
// grid never reflows and the text never moves.
const PANEL_BOX =
  "absolute -left-5 -right-5 -top-5 -bottom-10 rounded-[32px] transition-all duration-500 ease-out " +
  "group-hover:-left-8 group-hover:-right-8 group-hover:-top-8 group-hover:-bottom-[3.25rem] " +
  "group-focus-visible:-left-8 group-focus-visible:-right-8 group-focus-visible:-top-8 group-focus-visible:-bottom-[3.25rem]";

// The frame grows with the panel; the photo inside it pushes in a little
// further, so the crop tightens on its own centre as the frame enlarges. Two
// separate scales on two nested elements - the text is in neither, which is why
// it holds its size while the boxes around it grow.
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

// Each card is a link through to the story page section it expands on, and the
// whole card is one hover target. Everything happens together on hover: the
// white panel lifts in and grows, the photo frame grows with it, the photo
// tightens on its own centre, and the CTA pill fades up.
export default function ProcessRow() {
  return (
    <section id={PROCESS.id} data-navtheme="light" className="scroll-mt-28 bg-cream">
      <div className="mx-auto max-w-[2000px] px-5 pb-12 sm:px-8 sm:pb-16 lg:px-10 lg:pb-20 lg:pt-16">
        <div className="grid grid-cols-1 items-start gap-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {PROCESS.items.map((item, index) => (
            <Link
              key={item.id}
              to={item.href}
              className={`group relative block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${
                index === 1 ? RAISED : ""
              }`}
            >
              {/* The white panel, behind everything. */}
              <span
                aria-hidden
                className={`${PANEL_BOX} bg-transparent group-hover:bg-white group-hover:shadow-[0_28px_64px_-24px_rgba(38,50,38,0.32)] group-focus-visible:bg-white group-focus-visible:shadow-[0_28px_64px_-24px_rgba(38,50,38,0.32)]`}
              />

              <div className="relative">
                {/* The middle plate is the one under the nav's centre, so it
                    is the one that repaints the bar as it passes. The outer
                    two declare the same thing and simply never win the
                    probe - marking only the middle one would be a lie about
                    what the photograph is. */}
                <Placeholder
                  ratio={item.plate.ratio}
                  brief={item.plate.brief}
                  image={item.plate.image}
                  alt={item.plate.alt}
                  tone="light"
                  navTheme="dark"
                  className={FRAME}
                  imageClassName={PHOTO}
                />

                <h3
                  className="mt-12 max-w-[18ch] font-serif font-bold leading-[1.1] tracking-[-0.03em] text-forest"
                  style={TITLE_SIZE}
                >
                  <span className="sr-only">{`Step ${item.step}: `}</span>
                  {item.title}
                </h3>

                <p
                  className="mt-6 max-w-[44ch] font-sans text-forest/80"
                  style={BODY_SIZE}
                >
                  {item.body}
                </p>

                {/* In flow rather than pinned to a corner, so the panel's
                    bottom padding is real space the pill sits inside rather
                    than space it overlaps. It holds its slot while hidden, so
                    revealing it shifts nothing. */}
                <span className="mt-10 inline-flex items-center rounded-full bg-forest px-5 py-2.5 font-sans text-sm font-bold uppercase tracking-[0.1em] text-cream opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100">
                  {item.cta}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
