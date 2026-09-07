import Container from "./Container";
import { BODY, H3 } from "../../styles/type";

const ORDINALS = [
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
];

// 05_component_library.md §13. Renders a real <ol>.
//
// The oversized numeral is decorative and aria-hidden - the actual ordinal is
// in the heading text ("One - Tear the sachet"), so the order survives for a
// screen-reader user without the numeral being read twice.
const COLUMNS = {
  3: "sm:grid-cols-3",
  // Four steps go two-up at sm rather than four-up: four columns on a tablet
  // leaves each step about 22 characters wide.
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export default function ProcessSteps({ steps, width = "content", columns = 3 }) {
  return (
    <Container width={width}>
      <ol
        className={`grid grid-cols-1 gap-12 sm:gap-8 lg:gap-14 ${COLUMNS[columns]}`}
      >
        {steps.map((step, index) => (
          <li key={step.title} className="relative">
            <span
              aria-hidden="true"
              className="block font-serif font-normal leading-[0.9] text-gold/40"
              style={{ fontSize: "clamp(3.4rem, 5vw, 4.8rem)" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3
              className="mt-5 max-w-[18ch] font-serif font-normal text-forest"
              style={H3}
            >
              <span className="sr-only">{ORDINALS[index]} - </span>
              {step.title}
            </h3>

            <p
              className="mt-4 max-w-[38ch] font-sans text-forest/75"
              style={BODY}
            >
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </Container>
  );
}
