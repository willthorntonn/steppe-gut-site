import { useId, useState } from "react";
import { X } from "lucide-react";

// Discount entry in the summary rail: an input, an Apply button, and the
// codes already held rendered as removable tags.
//
// `onApply` returns an error string or null, so the parent owns what a valid
// code is (checkout/pricing.js) and this component owns only the input state
// and how a failure is shown.
//
// While prices are null there is nothing for a percentage to apply to, so the
// field is disabled with a plain reason rather than accepting a code and
// silently doing nothing.
export default function DiscountField({
  codes,
  inactiveCodes = [],
  onApply,
  onRemove,
  disabled = false,
}) {
  const id = useId();
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);

  function submit(event) {
    event.preventDefault();
    const entered = value.trim();
    if (!entered) return;
    const message = onApply(entered);
    setError(message);
    if (!message) setValue("");
  }

  const errorId = error ? `${id}-error` : undefined;

  return (
    <div>
      {/* Not a <form> - this sits inside the checkout <form>, and a nested
          form is invalid HTML. The Apply button is type="button" and the
          input handles Enter itself. */}
      <div className="flex gap-2">
        <div className="flex-1">
          <label htmlFor={id} className="sr-only">
            Discount code
          </label>
          <input
            id={id}
            value={value}
            disabled={disabled}
            aria-describedby={errorId}
            aria-invalid={error ? true : undefined}
            onChange={(event) => {
              setValue(event.target.value);
              if (error) setError(null);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") submit(event);
            }}
            placeholder="Discount code"
            className={`h-12 w-full rounded-lg border bg-cream px-4 font-sans text-base text-forest placeholder:text-forest/40 focus:outline-none focus:ring-2 focus:ring-gold/40 disabled:cursor-not-allowed disabled:bg-[#EDE8DD] disabled:text-forest/45 ${
              error ? "border-[#8C3A2B]" : "border-forest/20"
            }`}
          />
        </div>
        <button
          type="button"
          onClick={submit}
          disabled={disabled || !value.trim()}
          className="h-12 shrink-0 rounded-lg border border-forest/25 px-5 font-sans text-sm font-semibold text-forest transition-colors hover:bg-forest hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:cursor-not-allowed disabled:border-forest/12 disabled:bg-[#EDE8DD] disabled:text-forest/40 disabled:hover:bg-[#EDE8DD] disabled:hover:text-forest/40"
        >
          Apply
        </button>
      </div>

      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 font-sans text-[13px] text-[#8C3A2B]"
        >
          {error}
        </p>
      )}

      {disabled && (
        <p className="mt-2 font-sans text-[13px] text-forest/55">
          Codes can be entered once prices are published.
        </p>
      )}

      {codes.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {codes.map((code) => {
            // A code can stop applying without being removed - the basket
            // drops below its minimum. It stays in the list, greyed, rather
            // than silently vanishing or, worse, sitting there looking active
            // while the total ignores it.
            const inactive = inactiveCodes.includes(code);
            return (
              <li key={code}>
                <span
                  className={`inline-flex items-center gap-2 rounded-md py-1 pl-2.5 pr-1 font-sans text-[13px] font-semibold ${
                    inactive
                      ? "bg-[#EDE8DD] text-forest/50 line-through decoration-forest/40"
                      : "bg-[#E8EDE4] text-forest"
                  }`}
                >
                  {code}
                  {inactive && (
                    <span className="sr-only"> - not applied, basket is too small</span>
                  )}
                  <button
                    type="button"
                    onClick={() => onRemove(code)}
                    aria-label={`Remove discount code ${code}`}
                    className="flex h-5 w-5 items-center justify-center rounded text-forest/60 hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-gold"
                  >
                    <X size={13} strokeWidth={2.25} aria-hidden="true" />
                  </button>
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
