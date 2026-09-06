import { FlaskConical, MapPin, RotateCcw, Truck } from "lucide-react";
import { CAPTION } from "../../styles/type";

// The reassurance block above the form, in the position the reference
// checkout uses it.
//
// The reference runs a "★★★★★ 55,000+ 5 Star Reviews" pill here. Steppe Gut
// has not launched and has no reviews, so there is no star rating and no
// count - inventing social proof at the point of payment is the one place it
// would do the most damage. The pill states a fact about the product instead.
//
// Every claim below is Tier A compositional or logistical fact, per
// 02_brand_guidelines.md §6: origin, delivery window, returns window, and what
// is in the tin. No outcome is stated or implied.
const POINTS = [
  {
    icon: Truck,
    title: "2–4 working days",
    body: "Delivered anywhere in Thailand",
  },
  {
    icon: RotateCcw,
    title: "14-day returns",
    body: "On anything unopened",
  },
  {
    icon: FlaskConical,
    title: "Nothing added",
    body: "Fermented, dried, packed",
  },
];

export default function CheckoutTrustBar() {
  return (
    <div>
      <p className="flex items-center justify-center gap-2 rounded-full border border-forest/12 bg-[#FFFDF9] px-5 py-3 text-center font-sans font-semibold text-forest">
        <MapPin size={16} strokeWidth={1.75} aria-hidden="true" />
        <span style={CAPTION}>Fermented mare&rsquo;s milk, product of Mongolia</span>
      </p>

      <ul className="mt-3 grid grid-cols-3 gap-3">
        {POINTS.map(({ icon: Icon, title, body }) => (
          <li
            key={title}
            className="rounded-2xl border border-forest/12 bg-[#FFFDF9] px-4 py-5 text-center"
          >
            <Icon
              size={22}
              strokeWidth={1.5}
              aria-hidden="true"
              className="mx-auto text-forest/70"
            />
            <p className="mt-3 font-sans text-[13px] font-semibold leading-tight text-forest">
              {title}
            </p>
            <p className="mt-1 font-sans text-[12px] leading-tight text-forest/60">
              {body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
