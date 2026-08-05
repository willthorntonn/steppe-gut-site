import { STANDFIRST } from "../../content/story";

// Standfirst. Sets the page up as something to read rather than something to
// shop, and does the job the old product-first section used to occupy.
export default function StoryIntro() {
  return (
    <section data-navtheme="light" className="bg-cream">
      <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8 sm:py-28 lg:px-10 lg:py-36">
        <div className="lg:grid lg:grid-cols-[6rem_minmax(0,1fr)] lg:gap-x-14">
          <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-forest/45">
            {STANDFIRST.eyebrow}
          </p>

          <div className="mt-8 lg:mt-0">
            <p
              className="max-w-[36ch] font-serif font-normal leading-[1.24] tracking-[-0.025em] text-forest"
              style={{ fontSize: "clamp(1.45rem, 2.9vw, 2.35rem)" }}
            >
              {STANDFIRST.lead}
            </p>
            <p className="mt-8 flex items-center gap-4 font-sans text-sm uppercase tracking-[0.22em] text-forest/50">
              <span aria-hidden className="h-px w-10 bg-gold" />
              {STANDFIRST.sub}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
