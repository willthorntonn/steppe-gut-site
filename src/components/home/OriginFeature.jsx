"use client";

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
            {/* Header: extra-large, bold, held to two lines - line-clamp is
                a hard stop rather than a size guess, so a longer title never
                spills a third line on a narrow phone. */}
            <h2
              className="line-clamp-2 max-w-[15ch] font-serif font-bold leading-[0.98] tracking-[-0.045em] text-forest"
              style={{
                fontSize: "clamp(3.2rem, calc(6.4 * var(--vw)), 6.4rem)",
                textWrap: "balance",
              }}
            >
              {ORIGIN.title}
            </h2>

            {/* Body: medium-weight sans, held to exactly three lines the
                same way - clipped rather than sized-to-fit, so copy edits
                later can't silently push a fourth line back in. */}
            <p
              className="line-clamp-3 mt-12 max-w-[54ch] font-sans font-medium text-forest/80"
              style={{
                fontSize: "clamp(1.25rem, calc(1.6 * var(--vw)), 1.55rem)",
                lineHeight: 1.65,
              }}
            >
              {ORIGIN.body}
            </p>

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
            navTheme="dark"
            className="rounded-[28px]"
          />
        </div>
      </div>
    </section>
  );
}
