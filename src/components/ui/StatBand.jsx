import Container from "./Container";
import { useCountUp, useInView } from "../../hooks/useCountUp";
import { BODY_SM, CAPTION } from "../../styles/type";

// 05_component_library.md §15.
//
// Claim discipline: every stat here is a compositional or provenance fact -
// grams, days of fermentation, months of the milking season. Never an
// efficacy figure (02_brand_guidelines.md §6).
//
// Values are given as { number, suffix } rather than a formatted string so
// the numeral can count up while its unit stays put.
function Stat({ number, suffix, label, note, inView }) {
  const value = useCountUp(number, inView, 1400);

  return (
    <div>
      <p
        className="font-serif font-normal leading-[1] tracking-[-0.04em] text-forest"
        style={{ fontSize: "clamp(3rem, 5vw, 4.6rem)" }}
      >
        {value}
        {suffix && (
          <span className="text-[0.55em] tracking-[-0.02em]"> {suffix}</span>
        )}
      </p>
      <p className="mt-4 font-sans font-semibold text-forest" style={BODY_SM}>
        {label}
      </p>
      {note && (
        <p className="mt-2 max-w-[28ch] font-sans text-forest/60" style={CAPTION}>
          {note}
        </p>
      )}
    </div>
  );
}

export default function StatBand({ stats }) {
  // useCountUp already renders the final value immediately when reduced
  // motion is set - the hook the homepage's supporter counter uses.
  const [ref, inView] = useInView(0.3);

  return (
    <Container>
      <div
        ref={ref}
        className="grid grid-cols-1 gap-12 rounded-2xl bg-[#E8EDE4] px-8 py-12 sm:grid-cols-3 sm:gap-8 lg:px-14 lg:py-16"
      >
        {stats.map((stat) => (
          <Stat key={stat.label} {...stat} inView={inView} />
        ))}
      </div>
    </Container>
  );
}
