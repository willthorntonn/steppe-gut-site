import { PROCESS } from "../../content/home";
import Placeholder from "../ui/Placeholder";

// Three-up media row, matching the reference's video-tile band: a wide frame
// with a badge sitting on its lower-left corner, then the title and copy
// beneath it. The reference raises its middle tile out of line, which is the
// only reason these columns are not flush — the offset is decorative rhythm,
// not hierarchy, so it collapses below lg.
const RAISED = "lg:-mt-14";

export default function ProcessRow() {
  return (
    <section id={PROCESS.id} data-navtheme="light" className="scroll-mt-28 bg-cream">
      <div className="mx-auto max-w-[2000px] px-5 pb-12 sm:px-8 sm:pb-16 lg:px-10 lg:pb-20 lg:pt-16">
        <div className="grid grid-cols-1 items-start gap-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {PROCESS.items.map((item, index) => (
            <article key={item.id} className={index === 1 ? RAISED : undefined}>
              <div className="relative">
                <Placeholder
                  ratio={item.plate.ratio}
                  brief={item.plate.brief}
                  image={item.plate.image}
                  alt={item.plate.alt}
                  tone="light"
                />
                {/* Sits on the frame's lower-left corner the way the
                    reference's play badge does, half outside the crop. */}
                <span
                  aria-hidden
                  className="absolute -bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-full bg-forest font-sans text-base tracking-[0.06em] text-cream"
                >
                  {item.step}
                </span>
              </div>

              <h3
                className="mt-12 max-w-[18ch] font-serif font-normal leading-[1.1] tracking-[-0.03em] text-forest"
                style={{ fontSize: "clamp(1.6rem, 2.3vw, 2.2rem)" }}
              >
                <span className="sr-only">{`Step ${item.step}. `}</span>
                {item.title}
              </h3>

              <p
                className="mt-6 max-w-[44ch] font-serif text-forest/80"
                style={{ fontSize: "clamp(1.15rem, 1.4vw, 1.35rem)", lineHeight: 1.7 }}
              >
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
