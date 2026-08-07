import PageHeader from "../components/ui/PageHeader";
import PageMeta from "../components/ui/PageMeta";
import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import MediaTextRow from "../components/ui/MediaTextRow";
import ComparisonTable from "../components/ui/ComparisonTable";
import ProcessSteps from "../components/ui/ProcessSteps";
import Accordion from "../components/ui/Accordion";
import ClosingCTA from "../components/ui/ClosingCTA";
import Reveal from "../components/ui/Reveal";
import ProductCard from "../components/product/ProductCard";
import BadgeRow from "../components/product/BadgeRow";
import { PRODUCTS, PRODUCT_BY_SLUG, SHARED_BADGES } from "../data/products";
import { BODY, CAPTION, H2 } from "../styles/type";

// products-collection.md.
//
// Deliberately short grid, long explanation underneath — the ratio that
// separates this from a shop grid for an unfamiliar category.

const CHOOSING_ROWS = [
  { label: "Servings per pack", values: ["25", "90", "25"] },
  { label: "Serving size", values: ["10 g", "3 capsules", "10 g (one scoop)"] },
  { label: "Taste", values: ["Mild, slightly sour", "None", "Mild, slightly sour"] },
  {
    label: "Best for",
    values: ["Starting out", "Travel, or avoiding the taste", "Established routine"],
  },
  {
    label: "Packaging per serving",
    values: ["Individual sachet", "None", "None"],
  },
  { label: "Needs water", values: ["Yes, 100 ml", "No", "Yes, 100 ml"] },
];

const COMPOSITION_BODY = [
  "Fermented mare's milk powder, with the lactose, whey and casein proteins, milk fat and fatty acids that survive fermentation. Alongside them: vitamin C, vitamin A, vitamins B1, B2 and B12, calcium, phosphorus, iron, lactoferrin and lysozyme — all of them present in the milk itself rather than added afterwards.",
  "The full list, with the allergen declaration and where each thing comes from, is on one page.",
];

const POWDER_BRIEF =
  "An opened sachet lying on its side, fine ivory powder drifting out across a deep forest-green stone surface in a soft sculptural ridge. Macro detail, warm golden side light raking across the powder texture. Subject sits lower-left with the upper right open. Premium scientific editorial still life, subtle film grain.";

// Answers 3 and 4 deliberately decline to overclaim. That is the honest-limits
// principle applied at the point of sale (02_brand_guidelines.md §6.3) — and
// on this page it is the most persuasive thing on it.
const QUESTIONS = [
  {
    id: "taste",
    question: "Does it taste like milk?",
    answer:
      "It tastes faintly sour and slightly savoury, closer to plain yoghurt than to milk. In water it is mild. Most people stop noticing it within a week.",
  },
  {
    id: "lactose",
    question: "Is it suitable if I am lactose intolerant?",
    answer:
      "Fermentation breaks down most of the lactose, but not all of it, and the product contains milk. If you react to yoghurt, you may react to this. Speak to your doctor first.",
  },
  {
    id: "how-long",
    question: "How long until I notice anything?",
    answer:
      "We are not going to give you a number. Nutritional intake works on the scale of weeks and months, and anyone promising a date is guessing. Take it daily and judge for yourself.",
  },
  {
    id: "thai-fda",
    question: "Is it registered with the Thai FDA?",
    answer:
      "Registration is in progress. We will publish the registration details on this site as soon as they are issued, and we are not going to claim it is complete before it is.",
  },
];

export default function Products() {
  return (
    <>
      <PageMeta
        title="Products — Steppe Gut Fermented Mare's Milk"
        description="Three formats of the same fermented mare's milk powder: 25-day sachet boxes, 90-count capsules, and a 250 g refill pouch. Full composition and how to take it."
      />

      <PageHeader
        eyebrow="Products"
        title="One formula, three formats"
        lead="The powder is the same in every pack we make — the same milk, from the same season, fermented the same way. What changes is how you take it, and how often you want to think about it."
      />

      {/* No badges on the cards: no "bestseller", no "new", no "limited".
          Those are pressure devices and 02_brand_guidelines.md §4.2 rules
          the vocabulary out. */}
      <Section size="sm">
        <Container>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {PRODUCTS.map((product) => (
              // At sm the third card sits alone on row 2 and keeps its column
              // width rather than stretching across both
              // (products-collection.md, responsive behaviour).
              <li key={product.slug} className="sm:max-w-none">
                <ProductCard product={product} className="h-full" />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Reveal>
        <Section size="default">
          <Container width="content">
            <h2
              className="max-w-[16ch] font-serif font-normal text-forest"
              style={H2}
            >
              Which one to start with
            </h2>
            <p
              className="mt-8 max-w-[62ch] font-serif text-forest/80"
              style={BODY}
            >
              If you have not taken it before, start with the sachets. They are
              portioned, they travel, and twenty-five mornings is long enough to
              know whether it suits you. Everything else is a preference.
            </p>
          </Container>

          <div className="mt-14">
            <ComparisonTable
              caption="Comparison of the three Steppe Gut formats"
              columns={PRODUCTS.map((product) => product.name)}
              rows={CHOOSING_ROWS}
            />
          </div>
        </Section>
      </Reveal>

      <Reveal>
        <Section size="default">
          <MediaTextRow
            eyebrow="Composition"
            heading="The same milk in every pack"
            body={COMPOSITION_BODY}
            imageBrief={POWDER_BRIEF}
            cta={{
              label: "See what is inside",
              to: "/ingredients-sourcing/",
            }}
          />

          <div className="mt-20 lg:mt-28">
            <BadgeRow items={SHARED_BADGES} />
          </div>
        </Section>
      </Reveal>

      <Reveal>
        <Section size="default">
          <Container width="content">
            <h2
              className="max-w-[16ch] font-serif font-normal text-forest"
              style={H2}
            >
              How to take it
            </h2>
            <p
              className="mt-8 max-w-[52ch] font-serif text-forest/80"
              style={BODY}
            >
              It takes about thirty seconds.
            </p>
          </Container>

          <div className="mt-16">
            <ProcessSteps steps={PRODUCT_BY_SLUG["daily-sachets"].howToTake} />
          </div>

          <Container width="content">
            <p
              className="mt-14 max-w-[62ch] font-sans text-forest/60"
              style={CAPTION}
            >
              For capsules: three with water, once a day. For the pouch: one
              level scoop, the same as one sachet.
            </p>
          </Container>
        </Section>
      </Reveal>

      <Reveal>
        <Section size="default">
          <Container width="content">
            <h2
              className="mb-14 max-w-[16ch] font-serif font-normal text-forest"
              style={H2}
            >
              Common questions
            </h2>
            {/* No "read the full answer" links: the FAQ pages these pointed at
                were cut in the rescope, and each answer here is complete on
                its own. */}
            <Accordion items={QUESTIONS} />
          </Container>
        </Section>
      </Reveal>

      <Reveal>
        <ClosingCTA
          heading="Twenty-five mornings"
          body="Long enough to know whether it belongs in your routine."
          primary={{ label: "See the Daily Sachets", to: "/products/daily-sachets/" }}
          secondary={{
            label: "Where it comes from",
            to: "/ingredients-sourcing/",
          }}
        />
      </Reveal>
    </>
  );
}
