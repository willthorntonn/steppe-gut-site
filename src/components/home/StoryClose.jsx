import Button from "../ui/Button";

// The page steps down into darkness at the end: cream chapters, then forest
// here, then the near-black colophon. Purely typographic, so the last thing
// on the page is a sentence rather than a product shot.
export default function StoryClose() {
  return (
    <section id="start" data-navtheme="dark" className="scroll-mt-24 bg-forest">
      <div className="mx-auto max-w-[1240px] px-5 py-28 sm:px-8 sm:py-32 lg:px-10 lg:py-40">
        <div className="lg:grid lg:grid-cols-[6rem_minmax(0,1fr)] lg:gap-x-14">
          <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-cream/40">
            End
          </p>

          <div className="mt-8 lg:mt-0">
            <h2
              className="max-w-[13ch] font-serif font-normal leading-[0.98] tracking-[-0.045em] text-cream"
              style={{ fontSize: "clamp(2.6rem, 6.4vw, 5.6rem)" }}
            >
              Start tomorrow morning.
            </h2>

            <p
              className="mt-9 max-w-[42ch] font-serif text-cream/75"
              style={{ fontSize: "clamp(1.05rem, 1.35vw, 1.2rem)", lineHeight: 1.72 }}
            >
              One sachet, one hundred millilitres of water. Sealed where it was
              made and shipped from Mongolia.
            </p>

            <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-9">
              <Button
                variant="cream-gold"
                className="h-14 w-full px-10 text-base sm:w-auto"
              >
                Shop Steppe Gut
              </Button>
              <a
                href="#the-land"
                className="font-sans text-sm uppercase tracking-[0.2em] text-cream/60 underline underline-offset-8 transition-colors hover:text-gold"
              >
                Read it again from the start
              </a>
            </div>

            <p className="mt-16 font-sans text-[10px] uppercase tracking-[0.3em] text-cream/35">
              47.9&deg;N, 106.9&deg;E &middot; Mongolia
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
