import { Minus, Plus, Tag } from "lucide-react";
import Picture from "../ui/Picture";
import { formatTHB } from "../../checkout/pricing";

// One basket line in the summary rail: thumbnail with a quantity badge sitting
// on its top-right corner, name and format, then the price column.
//
// The reference checkout puts a "Modify" text link under the line and sends
// you back to the cart to change quantity. Two clicks and a page transition to
// change a number that is already on screen is a worse deal than a stepper, so
// the stepper is inline here - it writes straight to the cart via setQty, the
// same call CartLine uses.
export default function SummaryLine({ line, discountLabel, nudge, onQty }) {
  const { product, qty, total } = line;

  return (
    <li className="flex items-start gap-4 py-4">
      <div className="relative shrink-0">
        <Picture
          avif={product.thumb.avif}
          webp={product.thumb.webp}
          alt={product.alt}
          width={64}
          height={64}
          imgClassName="h-16 w-16 rounded-xl border border-forest/12 bg-[#FFFDF9] object-cover"
        />
        <span
          aria-hidden="true"
          className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-forest px-1.5 font-sans text-[12px] font-semibold text-cream"
        >
          {qty}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-sans text-[15px] font-semibold leading-snug text-forest">
          {product.name}
        </p>
        <p className="mt-0.5 font-sans text-[13px] text-forest/60">
          {product.format}
        </p>

        {discountLabel && (
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-[#E8EDE4] px-2 py-1 font-sans text-[12px] font-semibold text-forest">
            <Tag size={12} strokeWidth={2} aria-hidden="true" />
            {discountLabel}
          </p>
        )}

        {nudge && (
          <p className="mt-2 font-sans text-[12px] text-forest/60">{nudge}</p>
        )}

        <div className="mt-3 inline-flex items-center rounded-lg border border-forest/20 bg-cream">
          <button
            type="button"
            onClick={() => onQty(qty - 1)}
            aria-label={`Reduce quantity of ${product.name}`}
            className="flex h-8 w-8 items-center justify-center text-forest/70 hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <Minus size={14} strokeWidth={2} aria-hidden="true" />
          </button>
          {/* aria-live so a screen reader hears the new count without the
              focused button losing its own label. */}
          <span
            aria-live="polite"
            className="min-w-7 text-center font-sans text-sm font-semibold text-forest"
          >
            {qty}
          </span>
          <button
            type="button"
            onClick={() => onQty(qty + 1)}
            aria-label={`Increase quantity of ${product.name}`}
            className="flex h-8 w-8 items-center justify-center text-forest/70 hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <Plus size={14} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>

      {total != null && (
        <p className="shrink-0 pt-0.5 font-sans text-[15px] font-semibold text-forest">
          {formatTHB(total)}
        </p>
      )}
    </li>
  );
}
