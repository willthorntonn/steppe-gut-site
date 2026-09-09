"use client";

import { useId } from "react";

// Shopify-checkout-style field: a 1px #DEDEDE box with a 12px radius, whose
// label sits centred as a placeholder when empty and shrinks to the top-left
// once the field has a value or focus.
//
// The label is a real <label for>, not a placeholder attribute - the visual
// treatment mimics a placeholder but the accessible name survives typing.
// `placeholder=" "` (a single space) is what drives :placeholder-shown, which
// is how the resting/floated states are told apart in CSS alone.

const BOX =
  "checkout-field peer h-[50px] w-full rounded-[12px] border bg-[#FFFDF9] px-[11px] text-[14px] text-forest outline-none transition-colors";
const FOCUS = "focus:border-forest";
const LABEL =
  "pointer-events-none absolute left-[11px] text-forest/55 transition-all duration-150";

export default function FloatField({
  label,
  error,
  className = "",
  as = "input",
  options,
  suffix,
  rows = 4,
  ...props
}) {
  const id = useId();
  const errorId = error ? `${id}-error` : undefined;
  const border = error ? "border-[#8C3A2B]" : "border-forest/20";

  const shared = {
    id,
    "aria-describedby": errorId,
    "aria-invalid": error ? true : undefined,
    ...props,
  };

  return (
    <div className={className}>
      <div className="relative">
        {as === "textarea" ? (
          <>
            <textarea
              {...shared}
              placeholder=" "
              rows={rows}
              className={`checkout-field peer w-full resize-y rounded-[12px] border bg-[#FFFDF9] px-[11px] text-[14px] text-forest outline-none transition-colors ${FOCUS} ${border} pb-[8px] pt-[22px] placeholder-shown:pt-[13px]`}
            />
            <label
              htmlFor={id}
              className={`${LABEL} top-[7px] text-[11px] peer-placeholder-shown:top-[13px] peer-placeholder-shown:text-[14px] peer-focus:top-[7px] peer-focus:text-[11px]`}
            >
              {label}
            </label>
          </>
        ) : as === "select" ? (
          <>
            <select
              {...shared}
              defaultValue=""
              className={`${BOX} ${FOCUS} ${border} appearance-none pb-[6px] pt-[19px]`}
            >
              <option value="" disabled hidden />
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {/* A select always has a value, so its label is permanently
                floated - no :placeholder-shown state to track. */}
            <label htmlFor={id} className={`${LABEL} top-[7px] text-[11px]`}>
              {label}
            </label>
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="pointer-events-none absolute right-[12px] top-1/2 h-4 w-4 -translate-y-1/2 text-forest"
            >
              <path
                d="M5 8l5 5 5-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
        ) : (
          <>
            <input
              {...shared}
              placeholder=" "
              className={`${BOX} ${FOCUS} ${border} pb-[6px] pt-[19px] placeholder-shown:pb-0 placeholder-shown:pt-0 ${
                suffix ? "pr-[38px]" : ""
              }`}
            />
            <label
              htmlFor={id}
              className={`${LABEL} top-[7px] text-[11px] peer-placeholder-shown:top-[15px] peer-placeholder-shown:text-[14px] peer-focus:top-[7px] peer-focus:text-[11px]`}
            >
              {label}
            </label>
            {suffix && (
              <span className="pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2 text-forest/55">
                {suffix}
              </span>
            )}
          </>
        )}
      </div>

      {error && (
        <p id={errorId} className="mt-1.5 flex items-center gap-1.5 text-[13px] text-[#8C3A2B]">
          <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5 shrink-0">
            <circle cx="8" cy="8" r="8" fill="#8C3A2B" />
            <path
              d="M8 4v5M8 11.2v.6"
              stroke="#fff"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
