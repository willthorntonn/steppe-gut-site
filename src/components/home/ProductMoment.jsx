import Placeholder from "../ui/Placeholder";

// The single product beat on the page. Deliberately quiet: one frame, a short
// statement of what the thing actually is, and a text link out to the range.
// No cards, no prices, no badges. The story has already done the selling.
export default function ProductMoment() {
  return (
    <section id="the-product" data-navtheme="light" className="scroll-mt-24 bg-cream">
      <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-12 border-t border-forest/15 pt-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-20 lg:pt-20">
          <Placeholder
            ratio="1 / 1"
            tone="light"
            brief="Single sachet and the loose powder, shot flat on a plain surface. Product as artifact, not as packshot. No props, no styling."
          />

          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-forest/45">
              What it is now
            </p>
            <h2
              className="mt-7 max-w-[16ch] font-serif font-normal leading-[1.04] tracking-[-0.035em] text-forest"
              style={{ fontSize: "clamp(1.9rem, 3.6vw, 2.9rem)" }}
            >
              The ferment, dried and sealed.
            </h2>
            <p
              className="mt-7 max-w-[46ch] font-serif text-forest/80"
              style={{ fontSize: "clamp(1.02rem, 1.3vw, 1.15rem)", lineHeight: 1.72 }}
            >
              One serving of the dried ferment, sealed at origin. Stir it into
              water and drink it before the day starts. That is the whole
              routine, and it keeps at room temperature so it travels.
            </p>
            <a
              href="#"
              className="mt-9 inline-block font-sans text-sm uppercase tracking-[0.2em] text-forest underline underline-offset-8 transition-colors hover:text-gold"
            >
              See the three formats
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
