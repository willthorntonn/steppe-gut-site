"use client";

import { useId } from "react";

// Switch for the Account Settings notification rows. A real <button
// role="switch"> with aria-checked, so it is keyboard operable and announced
// correctly. Track fills forest when on, hairline grey when off; the knob
// slides with a transform (no layout shift), and under prefers-reduced-motion
// the global rule in index.css drops the transition to an opacity-only change.
export default function Toggle({ checked, onChange, label, description }) {
  const id = useId();
  const descId = description ? `${id}-desc` : undefined;

  return (
    <div className="flex items-start justify-between gap-5 py-4">
      <div className="min-w-0">
        <label
          htmlFor={id}
          className="font-sans text-[15px] font-semibold text-forest"
        >
          {label}
        </label>
        {description && (
          <p id={descId} className="mt-1 font-sans text-[13px] leading-relaxed text-forest/60">
            {description}
          </p>
        )}
      </div>

      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-describedby={descId}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 inline-flex h-[26px] w-[46px] shrink-0 items-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
          checked ? "border-forest bg-forest" : "border-forest/25 bg-[#EDE8DD]"
        }`}
      >
        <span
          aria-hidden="true"
          className={`inline-block h-[18px] w-[18px] rounded-full bg-[#FFFDF9] shadow-sm transition-transform ${
            checked ? "translate-x-[23px]" : "translate-x-[3px]"
          }`}
        />
      </button>
    </div>
  );
}
