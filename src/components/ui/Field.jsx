"use client";

import { useId } from "react";

// 03_design_system.md §13.
//
// Always renders a real visible <label for>. A placeholder is never a label.
// Required fields say "(required)" in the label text, not a bare asterisk.
// Inputs are 16px minimum - anything smaller triggers iOS zoom on focus, which
// looks like the layout breaking.
const BASE =
  "mt-2 w-full rounded-lg border bg-[#FFFDF9] px-4 font-sans text-base text-forest placeholder:text-forest/35 focus:outline-none focus:ring-2 focus:ring-gold/40 disabled:cursor-not-allowed disabled:bg-[#EDE8DD] disabled:text-forest/45";

export default function Field({
  label,
  name,
  type = "text",
  as = "input",
  required = false,
  help,
  error,
  options,
  rows = 6,
  className = "",
  ...props
}) {
  const id = useId();
  const helpId = help ? `${id}-help` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [helpId, errorId].filter(Boolean).join(" ") || undefined;

  const borderCls = error ? "border-[#8C3A2B]" : "border-forest/20";
  const shared = {
    id,
    name,
    required,
    "aria-describedby": describedBy,
    "aria-invalid": error ? true : undefined,
    ...props,
  };

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="font-sans text-sm font-semibold text-forest"
      >
        {label}
        {required && (
          <span className="font-normal text-forest/55"> (required)</span>
        )}
      </label>

      {as === "textarea" && (
        <textarea {...shared} rows={rows} className={`${BASE} ${borderCls} py-3`} />
      )}

      {as === "select" && (
        <select {...shared} className={`${BASE} ${borderCls} h-12`}>
          <option value="">Choose one</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {as === "input" && (
        <input {...shared} type={type} className={`${BASE} ${borderCls} h-12`} />
      )}

      {help && (
        <p id={helpId} className="mt-2 font-sans text-[13px] text-forest/55">
          {help}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-2 font-sans text-[13px] text-[#8C3A2B]">
          {error}
        </p>
      )}
    </div>
  );
}
