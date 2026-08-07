import PageHeader from "../components/ui/PageHeader";
import PageMeta from "../components/ui/PageMeta";
import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import MediaTextRow from "../components/ui/MediaTextRow";
import StatBand from "../components/ui/StatBand";
import ProcessSteps from "../components/ui/ProcessSteps";
import Accordion from "../components/ui/Accordion";
import HonestLimits from "../components/ui/HonestLimits";
import ClosingCTA from "../components/ui/ClosingCTA";
import Reveal from "../components/ui/Reveal";
import NutritionPanel from "../components/product/NutritionPanel";
import {
  INGREDIENT_GLOSSARY,
  NOT_IN_IT,
  PRODUCTION_STEPS,
  SUITABILITY,
} from "../data/ingredients";
import { INGREDIENTS_DECLARATION } from "../data/products";
import { COMPANY } from "../data/site";
import { BODY, BODY_SM, CAPTION, H2, H4 } from "../styles/type";
import steppeAvif from "../assets/home/steppe-mares.avif";
import steppeWebp from "../assets/home/steppe-mares.webp";

// See website_blueprint/pages/ingredients-sourcing.md — written during this
// build, because the 7-page rescope created the route without a spec.
//
// "What is in it" and "where did it come from" are answered on one page on
// purpose: they are the same question asked by the same sceptical reader, and
// splitting them across two routes makes each half look partial.

const SOURCING_BODY = [
  "The milk is collected in Töv Province, on open grassland, by herding families who are paid directly for it. Mares are milked by hand, several times a day, and only during the months they are in milk — roughly June to October. Outside that window there is no milk, so there is no production.",
  "That seasonality is the reason the product exists in this form. Fresh mare's milk spoils in hours. Fermenting it, and then drying it, is how a summer's milk becomes something you can take in February.",
];

// Provenance facts. No efficacy figure appears anywhere on this site.
const SOURCING_STATS = [
  {
    number: 5,
    label: "months of milking",
    note: "June to October, when the mares are in milk.",
  },
  {
    number: 4,
    label: "days of fermentation",
    note: "Per batch, before drying.",
  },
  {
    number: 1,
    label: "province",
    note: "Töv, where every batch is collected.",
  },
];

// A plain fact card, used by both the suitability grid and "what is not in it".
function FactCard({ title, body }) {
  return (
    <li className="rounded-2xl border border-forest/12 bg-[#FFFDF9] p-7">
      <h3 className="font-serif font-normal text-forest" style={H4}>
        {title}
      </h3>
      <p className="mt-3 font-serif text-forest/75" style={BODY_SM}>
        {body}
      </p>
    </li>
  );
}

export default function IngredientsSourcing() {
  return (
    <>
      <PageMeta
        title="Ingredients & Sourcing — What's in it and where it comes from · Steppe Gut"
        description="The full ingredient list, allergen information, and where Steppe Gut's fermented mare's milk is collected, fermented and made — with the manufacturer, importer and brand owner named."
      />

      <PageHeader
        eyebrow="Transparency"
        title="Everything that is in it, and where it came from"
        lead="The full ingredient declaration, what each thing is, where the milk is collected, who ferments it and who makes the finished pack. Where we do not have a figure yet, this page says so rather than leaving a gap you have to notice for yourself."
      />

      {/* Rendered at reading size, not small print. The point of the section
          is that it is readable. */}
      <Section id="ingredients" size="sm">
        <Container width="narrow">
          <h2 className="font-serif font-normal text-forest" style={H2}>
            Ingredients
          </h2>
          <p className="mt-5 font-sans text-forest/55" style={CAPTION}>
            Identical in all three formats.
          </p>
          <div className="mt-8 rounded-2xl border border-forest/12 bg-[#FFFDF9] p-7 lg:p-9">
            <p className="font-serif text-forest/85" style={BODY}>
              {INGREDIENTS_DECLARATION}
            </p>
          </div>
          <p className="mt-6 font-sans text-forest/60" style={CAPTION}>
            The capsules additionally contain the capsule shell. The powder
            inside is unchanged.
          </p>
        </Container>
      </Section>

      {/* Allergen information is visible text in its own section, never only
          inside a collapsed accordion. */}
      <Reveal>
        <Section id="allergens" size="default">
          <Container width="content">
            <h2
              className="max-w-[18ch] font-serif font-normal text-forest"
              style={H2}
            >
              Allergens and suitability
            </h2>
            <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {SUITABILITY.map((item) => (
                <FactCard key={item.title} {...item} />
              ))}
            </ul>
          </Container>
        </Section>
      </Reveal>

      <Reveal>
        <Section id="glossary" size="default">
          <Container width="content">
            <h2
              className="max-w-[18ch] font-serif font-normal text-forest"
              style={H2}
            >
              What each thing is
            </h2>
            <p
              className="mb-14 mt-8 max-w-[58ch] font-serif text-forest/75"
              style={BODY}
            >
              Every ingredient, in one sentence each. These describe what the
              substance is. Where a nutrient has an established function, that
              function is stated about the nutrient — not about this product,
              and not about you.
            </p>
            <Accordion
              items={INGREDIENT_GLOSSARY.map((entry) => ({
                id: entry.id,
                question: entry.name,
                answer: entry.explanation,
              }))}
              allowMultiple
            />
          </Container>
        </Section>
      </Reveal>

      <Reveal>
        <Section id="nutrition" size="default">
          <Container width="narrow">
            <h2 className="mb-10 font-serif font-normal text-forest" style={H2}>
              Nutrition
            </h2>
          </Container>
          <NutritionPanel />
        </Section>
      </Reveal>

      <Reveal>
        <Section id="sourcing" size="default">
          <MediaTextRow
            eyebrow="Töv Province, Mongolia"
            heading="Milked between June and October"
            body={SOURCING_BODY}
            image={{ avif: steppeAvif, webp: steppeWebp }}
            alt="Horses grazing on open Mongolian grassland in low evening light."
          />
          <div className="mt-20 lg:mt-28">
            <StatBand stats={SOURCING_STATS} />
          </div>
        </Section>
      </Reveal>

      <Reveal>
        <Section id="how-its-made" size="default">
          <Container width="content">
            <h2
              className="mb-16 max-w-[18ch] font-serif font-normal text-forest"
              style={H2}
            >
              How it is made
            </h2>
          </Container>
          <ProcessSteps steps={PRODUCTION_STEPS} columns={4} />
        </Section>
      </Reveal>

      {/* Naming all three companies is the point of this section. A
          transparency page that keeps its manufacturer anonymous undermines
          everything above it. */}
      <Reveal>
        <Section id="who-makes-it" size="default">
          <Container width="content">
            <h2
              className="max-w-[18ch] font-serif font-normal text-forest"
              style={H2}
            >
              Who makes it
            </h2>
            <p
              className="mt-8 max-w-[58ch] font-serif text-forest/75"
              style={BODY}
            >
              Three companies are involved and all three are named here, because
              a page about transparency that does not name them is not one.
            </p>

            <dl className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="rounded-2xl border border-forest/12 bg-[#FFFDF9] p-7">
                <dt className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-forest/55">
                  Manufactured by
                </dt>
                <dd className="mt-4 font-serif text-forest" style={BODY_SM}>
                  {COMPANY.manufacturer.name}
                  <br />
                  {COMPANY.manufacturer.country}
                </dd>
              </div>

              <div className="rounded-2xl border border-forest/12 bg-[#FFFDF9] p-7">
                <dt className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-forest/55">
                  Imported and distributed by
                </dt>
                <dd className="mt-4 font-serif text-forest" style={BODY_SM}>
                  <address className="not-italic">
                    {COMPANY.importer.name}
                    <br />
                    {COMPANY.importer.address.map((line) => (
                      <span key={line}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </address>
                </dd>
              </div>

              <div className="rounded-2xl border border-forest/12 bg-[#FFFDF9] p-7">
                <dt className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-forest/55">
                  Brand owner
                </dt>
                <dd className="mt-4 font-serif text-forest" style={BODY_SM}>
                  {COMPANY.brandOwner.name}
                  <br />
                  <a
                    className="underline decoration-gold decoration-2 underline-offset-4"
                    href={`mailto:${COMPANY.brandOwner.email}`}
                  >
                    {COMPANY.brandOwner.email}
                  </a>
                  <br />
                  <a
                    className="underline decoration-gold decoration-2 underline-offset-4"
                    href={`tel:${COMPANY.brandOwner.phoneHref}`}
                  >
                    {COMPANY.brandOwner.phone}
                  </a>
                </dd>
              </div>
            </dl>
          </Container>
        </Section>
      </Reveal>

      <Reveal>
        <Section id="not-in-it" size="default">
          <Container width="content">
            <h2
              className="max-w-[18ch] font-serif font-normal text-forest"
              style={H2}
            >
              What is not in it
            </h2>
            <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {NOT_IN_IT.map((item) => (
                <FactCard key={item.title} {...item} />
              ))}
            </ul>
          </Container>
        </Section>
      </Reveal>

      <Reveal>
        <Section size="default">
          <HonestLimits>
            <p>
              Research into fermented mare&rsquo;s milk is limited. Most
              published studies are small, many are conducted outside the
              countries where it is traditionally consumed, and few look at the
              outcomes people ask us about.
            </p>
            <p>
              Batch-to-batch variation in a seasonal, naturally fermented
              product is real. We are working toward per-batch published
              analysis and are not there yet. We do not hold gluten-free or
              organic certification and do not describe the product as either.
            </p>
            <p>
              Thai FDA registration is in progress. Until it is issued we
              describe this product as a dietary supplement and make no health
              claims for it. We will publish the registration details here the
              day they are issued.
            </p>
          </HonestLimits>
        </Section>
      </Reveal>

      <Reveal>
        <ClosingCTA
          heading="Anything missing?"
          body="If there is a figure you need that is not on this page, write to us and we will find it."
          primary={{ label: "Send a message", to: "/contact/" }}
          secondary={{ label: "See the products", to: "/products/" }}
        />
      </Reveal>
    </>
  );
}
