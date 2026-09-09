"use client";

import Container from "./Container";
import { BODY_SM, CAPTION } from "../../styles/type";

// 05_component_library.md §25.
//
// A real <table> with a <caption> and scope attributes, inside an
// overflow-x-auto wrapper so a wide table never causes page-level horizontal
// scroll. The wrapper is focusable and named, so a keyboard user can scroll it
// (a scrollable region that cannot be reached by keyboard is a common defect).
//
// Comparison content is factual and category-level, never competitor-named
// and never framed as superiority (02_brand_guidelines.md §6).
export default function ComparisonTable({
  caption,
  columns,
  rows,
  highlightColumn = null,
  note,
}) {
  return (
    <Container width="content">
      <div
        role="region"
        aria-label={`${caption}, scrollable`}
        tabIndex={0}
        className="overflow-x-auto rounded-2xl border border-forest/12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        <table className="w-full min-w-[640px] border-collapse text-left">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="bg-forest text-cream">
              {/* The corner cell heads the row-label column and has no text of
                  its own; an empty <th> with no scope would be announced as a
                  meaningless column header. */}
              <td className="px-5 py-4" />
              {columns.map((column, index) => (
                <th
                  key={column}
                  scope="col"
                  className={`px-5 py-4 font-sans text-[15px] font-semibold ${
                    // The Steppe Gut column gets a gold-tinted header cell and
                    // gold side rules, never a full gold fill
                    // (05_component_library.md §25).
                    index === highlightColumn
                      ? "border-x border-gold bg-gold/25"
                      : ""
                  }`}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-forest/12">
                <th
                  scope="row"
                  className="bg-[#FFFDF9] px-5 py-4 font-sans text-[15px] font-semibold text-forest"
                >
                  {row.label}
                </th>
                {row.values.map((value, index) => (
                  <td
                    key={columns[index]}
                    className={`px-5 py-4 font-sans text-forest/80 ${
                      index === highlightColumn ? "border-x border-gold" : ""
                    }`}
                    style={BODY_SM}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {note && (
        <p
          className="mt-6 max-w-[70ch] font-sans text-forest/60"
          style={CAPTION}
        >
          {note}
        </p>
      )}
    </Container>
  );
}
