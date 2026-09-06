import Container from "./Container";
import { BODY, H3 } from "../../styles/type";

// 05_component_library.md §17, required by 02_brand_guidelines.md §6.3.
//
// Styled identically everywhere it appears - consistency is what makes it
// read as a principle rather than a disclaimer. No warning triangle, no
// caution icon: this is confidence, not a caveat.
export default function HonestLimits({ id = "honest-limits", children }) {
  return (
    <Container width="content">
      <div
        id={id}
        className="scroll-mt-28 rounded-2xl bg-[#E8EDE4] p-8 lg:p-12"
      >
        <h2 className="font-serif font-normal text-forest" style={H3}>
          What we don&rsquo;t know yet
        </h2>
        <div
          className="mt-6 max-w-[66ch] space-y-5 font-sans text-forest/80"
          style={BODY}
        >
          {children}
        </div>
      </div>
    </Container>
  );
}
