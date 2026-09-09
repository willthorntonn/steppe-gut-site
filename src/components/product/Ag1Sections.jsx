"use client";

// ---------------------------------------------------------------------------
// Two section layouts extracted from
// https://drinkag1.com/products/greens-powder-pouch - read out of the live DOM
// (the page sits behind a Vercel bot checkpoint, so it was inspected in a real
// browser rather than fetched):
//
//   1. Ag1Comparison - "AG1 is a more-in-one solution": a table whose first
//      data column is a dark filled card (rounded top, #023D3D on the source)
//      running the full height of the body, tick/cross glyphs in every cell,
//      1px row rules, and a small italic footnote under the table.
//   2. Ag1Scoop - "In One Scoop of AG1 Next Gen": two columns, a heading +
//      lede + label/value spec rows with 1px rules and a pill outline button
//      on the left, a square media panel on the right.
//
// ISOLATION CONTRACT - same as FybelleLayout.jsx:
//   * Every selector in AG1_CSS is prefixed `.sg-ag1`, so nothing here can
//     reach the site nav, the footer, or any other section.
//   * `all: initial` on each root stops the site's globals and Tailwind
//     preflight bleeding in.
//   * No Tailwind classes - these are self-contained blocks.
//   * The media panel is a plain-text placeholder. Nothing is generated,
//     downloaded or rendered.
// ---------------------------------------------------------------------------

const COMPARE_COLUMNS = ["Multivitamins", "Probiotics", "Greens"];

// Column order: Steppe Gut, then the three category comparators. `true` = tick,
// `false` = cross. Category-level only, never brand-named.
const COMPARE_ROWS = [
  { label: "Probiotics", values: [true, false, true, false] },
  { label: "Vitamins & minerals", values: [true, true, false, true] },
  { label: "Prebiotics", values: [true, false, false, true] },
  { label: "Whole-food source", values: [true, false, false, true] },
  { label: "Antioxidants", values: [true, false, false, true] },
  { label: "Fermented", values: [true, false, true, false] },
  { label: "Single daily serving", values: [true, true, false, false] },
];

const COMPARISON_HEADING_BY_SLUG = {
  "sachet-bag": "Everything your gut needs in one scoop",
  "sachet-box": "Everything your gut needs in one sachet",
  "pill-bottle": "Everything your gut needs in just three capsules",
};

const SCOOP_HEADING_BY_SLUG = {
  "sachet-bag": "In One Scoop of Steppe Gut",
  "sachet-box": "In One Sachet of Steppe Gut",
  "pill-bottle": "In Three Capsules of Steppe Gut",
};

const SCOOP_LEDE_BY_SLUG = {
  "sachet-bag":
    "Make it part of your daily ritual. One level 10 g scoop stirred into 100 ml of water, once a day. Simple, natural, nourishing",
  "sachet-box":
    "Make it part of your daily ritual. One 10 g sachet stirred into 100 ml of water, once a day. Simple, natural, nourishing",
  "pill-bottle":
    "Make it part of your daily ritual. Three capsules with water, once a day. Simple, natural, nourishing",
};

// Nutrition figures are identical across all three formats (products.js:
// "The formula is identical in all three formats"), so this list is not
// keyed by product.
const SCOOP_ROWS = [
  { label: "Calories", value: "38" },
  { label: "Carbohydrates", value: "5g" },
  { label: "Naturally occurring sugar", value: "<2g" },
  { label: "Protein", value: "2g" },
  { label: "Fat", value: "<1g" },
  { label: "Vitamin C", value: "PLACEHOLDER" },
  { label: "Omega-3 fatty acids", value: "PLACEHOLDER" },
  { label: "Lactoferrin", value: "PLACEHOLDER" },
];

const AG1_CSS = `
.sg-ag1 {
  all: initial;
  display: block;
  box-sizing: border-box;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #1a1a1a;
  background: #ffffff;
  -webkit-font-smoothing: antialiased;
}
.sg-ag1 *, .sg-ag1 *::before, .sg-ag1 *::after { box-sizing: border-box; }
.sg-ag1 h2, .sg-ag1 p, .sg-ag1 table, .sg-ag1 figure { margin: 0; padding: 0; }
.sg-ag1 button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; }

/* Left padding clears the site's fixed SocialRail (left: 0, ~84px wide,
   vertically centred), which would otherwise sit over the table's row
   labels. The rail itself is not touched. */
.sg-ag1__wrap { max-width: 1568px; margin: 0 auto; padding: 48px 20px 48px 92px; }
@media (min-width: 900px) { .sg-ag1__wrap { padding: 88px 48px 88px 104px; } }

.sg-ag1__h2 {
  font-size: 32px;
  font-weight: 400;
  line-height: 1.05;
  letter-spacing: -0.03em;
}
@media (min-width: 900px) { .sg-ag1__h2 { font-size: 48px; } }

/* ---- 1. comparison table --------------------------------------------- */
.sg-ag1__table-scroll { overflow-x: auto; margin-top: 32px; }
@media (min-width: 900px) { .sg-ag1__table-scroll { margin-top: 56px; } }

.sg-ag1__table { width: 100%; min-width: 640px; table-layout: fixed; border-collapse: collapse; }
.sg-ag1__table thead th {
  padding: 0;
  height: 93px;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
}
.sg-ag1__table thead tr { border-bottom: 1px solid #d9dddb; }
.sg-ag1__table tbody tr { border-bottom: 1px solid #d9dddb; }
.sg-ag1__table td { padding: 0; height: 73px; text-align: center; vertical-align: middle; }
.sg-ag1__row-label { text-align: left !important; font-size: 15px; padding-right: 16px !important; }

/* The highlighted first data column: one continuous dark card, rounded at
   the top of the header cell and at the bottom of the last body row. */
.sg-ag1__hl { background: #2F3E2F; color: #ffffff; }
.sg-ag1__table thead .sg-ag1__hl { border-radius: 16px 16px 0 0; }
.sg-ag1__table tbody tr:last-child .sg-ag1__hl { border-radius: 0 0 16px 16px; }
.sg-ag1__brand { font-size: 17px; font-weight: 600; letter-spacing: 0.01em; color: #ffffff; }

.sg-ag1__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  font-size: 14px;
  line-height: 1;
}
.sg-ag1__mark--yes { background: #4CC93F; color: #12331a; font-weight: 700; }
.sg-ag1__mark--no { border: 1px solid #b2b3b2; color: #b2b3b2; }

/* Tag-qualified on purpose: the reset above is ".sg-ag1 p" (0,1,1), which
   outranks a lone class and was zeroing this margin out. */
p.sg-ag1__footnote { margin-top: 14px; font-size: 12.5px; font-style: italic; color: #6a6f6c; }

/* ---- 2. scoop / spec split ------------------------------------------- */
.sg-ag1__split { display: grid; grid-template-columns: 1fr; gap: 32px; align-items: start; }
@media (min-width: 900px) { .sg-ag1__split { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 64px; } }

/* Tag-qualified for the same reason as the footnote below: the ".sg-ag1 p"
   reset (0,1,1) outranks a lone class, so a bare .sg-ag1__lede margin never
   landed. */
p.sg-ag1__lede { margin-top: 26px; font-size: 16px; color: #3d423f; max-width: 46ch; }

.sg-ag1__specs { margin-top: 26px; }
.sg-ag1__spec-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  border-bottom: 1px solid #b2b3b2;
}
.sg-ag1__spec-row p { padding: 16px 0; font-size: 15px; }
.sg-ag1__spec-label { text-transform: uppercase; letter-spacing: 0.01em; }
.sg-ag1__spec-value { white-space: nowrap; }

.sg-ag1__pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 40px;
  padding: 14px 20px;
  border: 1px solid #2F3E2F;
  border-radius: 32px;
  font-size: 17px;
  color: #2F3E2F;
  transition: background-color .15s ease, color .15s ease;
}
.sg-ag1__pill:hover { background: #2F3E2F; color: #ffffff; }

.sg-ag1__panel {
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;
  background: #EAE7DF;
  color: #6a6f6c;
  font-size: 14px;
  letter-spacing: 0.02em;
}

@media (prefers-reduced-motion: reduce) {
  .sg-ag1 * { transition: none !important; }
}
`;

function Mark({ on }) {
  return (
    <span
      className={`sg-ag1__mark sg-ag1__mark--${on ? "yes" : "no"}`}
      role="img"
      aria-label={on ? "Yes" : "No"}
    >
      {on ? "✓" : "✕"}
    </span>
  );
}

export function Ag1Comparison({ product }) {
  return (
    <div className="sg-ag1">
      <style>{AG1_CSS}</style>
      <div className="sg-ag1__wrap">
        <h2 className="sg-ag1__h2">{COMPARISON_HEADING_BY_SLUG[product?.slug] || "Everything your gut needs"}</h2>

        <div className="sg-ag1__table-scroll">
          <table className="sg-ag1__table">
            <thead>
              <tr>
                <th />
                <th className="sg-ag1__hl">
                  <span className="sg-ag1__brand">STEPPE GUT</span>
                </th>
                {COMPARE_COLUMNS.map((name) => (
                  <th key={name}>{name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row) => (
                <tr key={row.label}>
                  <td className="sg-ag1__row-label">{row.label}</td>
                  {row.values.map((on, index) => (
                    <td
                      key={`${row.label}-${index}`}
                      className={index === 0 ? "sg-ag1__hl" : undefined}
                    >
                      <Mark on={on} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="sg-ag1__footnote">
          &dagger;Compares product categories. Steppe Gut combines fermented whole-food ingredients that you won't find in most single-category supplements
        </p>
      </div>
    </div>
  );
}

export function Ag1Scoop({ product }) {
  return (
    <div className="sg-ag1">
      <style>{AG1_CSS}</style>
      <div className="sg-ag1__wrap">
        <div className="sg-ag1__split">
          <div>
            <h2 className="sg-ag1__h2">{SCOOP_HEADING_BY_SLUG[product.slug]}</h2>

            <p className="sg-ag1__lede">{SCOOP_LEDE_BY_SLUG[product.slug]}</p>

            <div className="sg-ag1__specs">
              {SCOOP_ROWS.map((row) => (
                <div key={row.label} className="sg-ag1__spec-row">
                  <p className="sg-ag1__spec-label">{row.label}</p>
                  <p className="sg-ag1__spec-value">{row.value}</p>
                </div>
              ))}
            </div>

            <button type="button" className="sg-ag1__pill">
              View Supplement Facts
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>

          <div className="sg-ag1__panel">
            [ IMAGE PLACEHOLDER: top-down {product.servingSize} serving of{" "}
            {product.name} on a flat neutral background ]
          </div>
        </div>
      </div>
    </div>
  );
}
