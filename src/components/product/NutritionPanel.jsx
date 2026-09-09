"use client";

import Container from "../ui/Container";
import { BODY_SM, CAPTION, H4 } from "../../styles/type";
import { COMPANY } from "../../data/site";
import { INGREDIENTS_DECLARATION, NUTRITION } from "../../data/products";

// 05_component_library.md §24.
//
// ── Why there are no numbers here yet ──────────────────────────────────────
// BRAND_GUIDELINES.md §8 records that the powder panel prints a serving size
// of 1 scoop (0.5 g) with 90 servings, which reconciles with neither the 250 g
// net weight nor the 10 g sachet. product-detail.md §5 and whats-inside.md §4
// both call this blocking, in the same words: a transparency panel whose
// arithmetic does not add up costs more trust than it earns.
//
// So the panel states plainly that the figures are not published yet, rather
// than printing numbers that do not add up or quietly omitting the section as
// if it were never planned. Everything that IS verified - the full ingredient
// declaration, the allergen, the origin, the named manufacturer - is here in
// full, because none of that depends on the unreconciled figures.
//
// When the figures are reconciled, populate NUTRITION in data/products.js and
// render the table branch below.
export default function NutritionPanel({ servingNote }) {
  return (
    <Container width="narrow">
      <div className="rounded-3xl bg-[#EDE8DD] p-7 lg:p-10">
        <h3 className="font-serif font-normal text-forest" style={H4}>
          Nutrition figures
        </h3>

        {NUTRITION == null ? (
          <p
            className="mt-4 font-sans text-forest/80"
            style={BODY_SM}
          >
            We have not published the nutrition panel yet. The serving figures
            on the current pack artwork do not reconcile against the pack
            weight, and we would rather say that than print numbers we cannot
            stand behind. They will be published here, per serving and per
            100 g, once they are checked
          </p>
        ) : null}

        {servingNote && (
          <p className="mt-5 font-sans text-forest/55" style={CAPTION}>
            {servingNote}
          </p>
        )}
      </div>

      <div className="mt-10 space-y-7">
        <div>
          <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-forest">
            Ingredients
          </h3>
          <p
            className="mt-3 font-sans text-forest/80"
            style={BODY_SM}
          >
            {INGREDIENTS_DECLARATION}
          </p>
        </div>

        <div>
          <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-forest">
            Allergen
          </h3>
          <p className="mt-3 font-sans text-forest/80" style={BODY_SM}>
            Contains milk
          </p>
        </div>

        <div>
          <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-forest">
            Origin
          </h3>
          <p className="mt-3 font-sans text-forest/80" style={BODY_SM}>
            {COMPANY.origin}. Manufactured by {COMPANY.manufacturer.name}
          </p>
        </div>
      </div>
    </Container>
  );
}
