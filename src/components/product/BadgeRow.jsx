import { FlaskConical, MapPin, Milk, MinusCircle } from "lucide-react";
import Container from "../ui/Container";
import { BODY_SM } from "../../styles/type";

const ICONS = {
  "map-pin": MapPin,
  "flask-conical": FlaskConical,
  milk: Milk,
  "minus-circle": MinusCircle,
};

// 05_component_library.md §23.
//
// Baseline-aligned, never staggered — the reference site offsets these
// vertically for a hand-placed feel, which reads as misalignment in a
// restrained brand.
//
// Icons are aria-hidden: the label beside each one carries the meaning, so
// the icon must not be announced as well (03_design_system.md §11).
export default function BadgeRow({ items }) {
  return (
    <Container width="content">
      <ul className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {items.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <li key={item.label} className="flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E8EDE4]">
                <Icon size={24} strokeWidth={1.75} className="text-forest" aria-hidden="true" />
              </span>
              <span
                className="mt-4 max-w-[16ch] font-sans font-semibold text-forest"
                style={BODY_SM}
              >
                {item.label}
              </span>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
