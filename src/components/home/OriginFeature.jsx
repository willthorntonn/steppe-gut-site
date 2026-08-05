import { ArrowRight } from "lucide-react";
import { ORIGIN } from "../../content/home";
import Placeholder from "../ui/Placeholder";

// First content beat after the hero, in the reference's two-column shape:
// heading, body and a single arrow link on the left, one tall image frame on
// the right. It answers "where does this come from" before the page mentions
// the product at all.
export default function OriginFeature() {
  return (
    <section id={ORIGIN.id} data-navtheme="light" className="scroll-mt-28 bg-cream">
      <div className="mx-auto max-w-[2000px] px-6 pb-28 pt-7 sm:px-10 sm:pb-36 sm:pt-9 lg:px-14 lg:pb-48 lg:pt-12">
        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-[1fr_1fr] lg:gap-24 xl:gap-32">
          <div>
            <p className="font-sans text-[13px] uppercase tracking-[0.3em] text-forest/45">
              {ORIGIN.eyebrow}
            </p>

            <h2
              className="mt-8 max-w-[15ch] font-serif font-normal leading-[0.98] tracking-[-0.045em] text-forest"
              style={{
                fontSize: "clamp(3.2rem, 6.4vw, 6.4rem)",
                // Stops short titles dropping a single orphaned word onto the
                // last line.
                textWrap: "balance",
              }}
            >
              {ORIGIN.title}
            </h2>

            {ORIGIN.body.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 32)}
                className={`max-w-[54ch] font-serif text-forest/80 ${
                  index === 0 ? "mt-12" : "mt-8"
                }`}
                style={{
                  fontSize: "clamp(1.25rem, 1.6vw, 1.55rem)",
                  lineHeight: 1.75,
                }}
              >
                {paragraph}
              </p>
            ))}

            <a
              href={ORIGIN.link.href}
              className="group mt-16 inline-flex items-center gap-3 font-sans text-xl font-bold uppercase tracking-[0.14em] text-forest transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              <ArrowRight
                size={26}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              />
              {ORIGIN.link.label}
            </a>
          </div>

          <Placeholder
            ratio={ORIGIN.plate.ratio}
            brief={ORIGIN.plate.brief}
            image={ORIGIN.plate.image}
            alt={ORIGIN.plate.alt}
            tone="light"
            className="rounded-[28px]"
          />
        </div>
      </div>
    </section>
  );
}
