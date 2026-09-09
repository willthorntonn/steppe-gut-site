"use client";

import { ArrowUpRight } from "lucide-react";

function Word({ delay, dim = false, children }) {
  return (
    <span className="animate-word-reveal">
      <span className={`${delay} ${dim ? "text-cream/45" : "text-cream"}`}>
        {children}
      </span>
    </span>
  );
}

export default function Hero() {
  return (
    <section className="relative z-10 flex flex-1 flex-col justify-center px-5 py-10 sm:px-8 lg:px-10">
      {/* The top step is gated on 1800px rather than Tailwind's 2xl (1536px)
          on purpose: the stage occupies a fixed 58% of the hero box, so the
          headline's runway grows with the box, not with the breakpoint. At
          1536 the box is still only ~1490 wide, and a 2xl-sized headline
          overruns the product. 1800 is where the runway is actually there. */}
      <h1 className="font-serif text-[46px] font-normal leading-[48px] tracking-[-0.05em] sm:text-[76px] sm:leading-[68px] md:text-[104px] md:leading-[90px] lg:text-[120px] lg:leading-[102px] xl:text-[140px] xl:leading-[113px] min-[1800px]:text-[160px] min-[1800px]:leading-[129px]">
        <span className="block">
          <Word delay="delay-300" dim>
            The
          </Word>{" "}
          <Word delay="delay-400">Radiance</Word>{" "}
          <Word delay="delay-500" dim>
            of
          </Word>
        </span>
        <span className="block">
          <Word delay="delay-600">Nature</Word>{" "}
          <Word delay="delay-700" dim>
            in
          </Word>{" "}
          <Word delay="delay-800">Full</Word>
        </span>
        <span className="block">
          <Word delay="delay-900">Bloom</Word>
        </span>
      </h1>

      <div className="animate-fade-up delay-600 mt-[38px] flex flex-col gap-5 sm:mt-[57px] sm:flex-row sm:items-center sm:gap-8 lg:mt-[89.1px] lg:gap-[50px]">
        <button
          type="button"
          className="flex h-[60px] w-full items-center justify-center gap-2 rounded-md bg-forest font-sans text-lg font-semibold tracking-[-0.03em] text-cream transition-colors hover:bg-forest/85 sm:h-[68px] sm:w-[256px] sm:text-xl md:w-[300px] md:text-2xl lg:h-[78px] lg:w-[334px] lg:text-[26px]"
        >
          Discover Now
          <ArrowUpRight size={24} strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
}
