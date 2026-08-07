import { useRef } from "react";
import { useParams } from "react-router-dom";
import PageMeta from "../components/ui/PageMeta";
import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import MediaTextRow from "../components/ui/MediaTextRow";
import ComparisonTable from "../components/ui/ComparisonTable";
import ProcessSteps from "../components/ui/ProcessSteps";
import Accordion from "../components/ui/Accordion";
import HonestLimits from "../components/ui/HonestLimits";
import ClosingCTA from "../components/ui/ClosingCTA";
import Reveal from "../components/ui/Reveal";
import BuyBox from "../components/product/BuyBox";
import BadgeRow from "../components/product/BadgeRow";
import NutritionPanel from "../components/product/NutritionPanel";
import CrossSellPair from "../components/product/CrossSellPair";
import StickyBuyBar from "../components/product/StickyBuyBar";
import NotFound from "./NotFound";
import { PRODUCTS, PRODUCT_BY_SLUG, SHARED_BADGES } from "../data/products";
import { BODY, CAPTION, H2 } from "../styles/type";
import powderAvif from "../assets/home/science-powder.avif";
import powderWebp from "../assets/home/science-powder.webp";
import steppeAvif from "../assets/home/steppe-mares.avif";
import steppeWebp from "../assets/home/steppe-mares.webp";

// product-detail.md — one template, three data records. Nothing SKU-specific
// is hard-coded here; everything varies through src/data/products.js.
//
// Sections 3, 4 and 6 are shared content rendered from the constants below,
// not duplicated per record.

const WHAT_IT_IS = [
  "Mare's milk is not like cow's milk. It has more lactose, less fat, and a protein profile closer to human milk than to dairy. On the steppe it has been fermented for centuries because fresh, it spoils in hours — and because fermented, it keeps, and it sits more easily.",
  "Left with its own cultures for four days, the milk changes. Lactose is broken down. Proteins are partly unfolded. What comes out is a thinner, faintly sour liquid, which we then dry at low temperature into the powder in this pack.",
];

// Claim check: mechanism is attributed to fermentation and to the nutrients,
// never to Steppe Gut, and no outcome is promised. Tier B
// (02_brand_guidelines.md §6).
const HOW_IT_WORKS = [
  "Digestion is a disassembly process. Fermentation carries out part of that disassembly before the food reaches you — breaking lactose down into simpler sugars and loosening the structure of the proteins.",
  "The practical consequence is that several of the nutrients naturally present in mare's milk — vitamin C, omega-3 fatty acids, lactoferrin, calcium, iron and a set of B vitamins — arrive in a form the body has less work to do with.",
];

const PROVENANCE = [
  "Mares only give milk for part of the year. Every pack we make comes from that window, from families we buy from directly, on open grassland in Töv Province.",
];

// Category-level only. Never competitor-named, never framed as superiority.
const DIFFERENCE_ROWS = [
  {
    label: "Lactose",
    values: [
      "Largely broken down by fermentation",
      "Present in full",
      "Not applicable",
    ],
  },
  {
    label: "Nutrients",
    values: [
      "Naturally present in the milk",
      "Naturally present in the milk",
      "Added, in isolation",
    ],
  },
  {
    label: "Protein structure",
    values: ["Partly unfolded by fermentation", "Intact", "Not applicable"],
  },
  {
    label: "Origin",
    values: ["Single-region, seasonal", "Varies", "Manufactured"],
  },
  {
    label: "Preparation",
    values: ["Fermented four days, then dried", "None", "Manufactured"],
  },
];

const QUESTIONS = [
  {
    id: "taste",
    question: "What does it taste like?",
    answer:
      "Faintly sour and slightly savoury, closer to plain yoghurt than to milk. In water it is mild. Most people stop noticing it within a week.",
  },
  {
    id: "lactose",
    question: "Is it suitable if I am lactose intolerant?",
    answer:
      "Fermentation breaks down most of the lactose, but not all of it, and the product contains milk. If you react to yoghurt, you may react to this. Speak to your doctor first.",
  },
  {
    id: "vegan",
    question: "Is it suitable for vegans?",
    answer:
      "No. It is a dairy product. It is suitable for vegetarians.",
  },
  {
    id: "gluten",
    question: "Does it contain gluten or nuts?",
    answer:
      "No gluten-containing or nut ingredients are used. We do not hold gluten-free certification, so we do not describe it as gluten-free. If the production facility matters for you, ask us and we will tell you what we know.",
  },
  {
    id: "storage",
    question: "How should I store it?",
    answer:
      "Somewhere cool and dry, out of direct sunlight. It does not need refrigerating. Loose powder takes up moisture faster than a sealed sachet, so reseal the pouch after each use.",
  },
  {
    id: "pregnancy",
    question: "Can I take it while pregnant or breastfeeding?",
    answer:
      "Speak to your doctor before taking any supplement during pregnancy or while breastfeeding. We are not able to advise on this.",
  },
];

export default function ProductDetail() {
  const { slug } = useParams();
  const product = PRODUCT_BY_SLUG[slug];
  const buyBoxRef = useRef(null);

  // An unknown slug renders the 404 rather than an empty template. An empty
  // product page returning 200 is worse than an error (not-found.md).
  if (!product) return <NotFound />;

  const others = PRODUCTS.filter((item) => item.slug !== product.slug);

  return (
    <>
      <PageMeta
        title={`${product.name} — Fermented Mare's Milk · Steppe Gut`}
        description={`${product.formatLong} of fermented mare's milk powder from Mongolia. Full ingredients, allergen information and how to take it.`}
      />

      <div
        data-navtheme="light"
        className="bg-cream pt-[112px] sm:pt-[132px] lg:pt-[186px]"
      >
        <BuyBox product={product} boxRef={buyBoxRef} />
      </div>

      <Section size="default">
        <BadgeRow items={SHARED_BADGES} />
      </Section>

      <Reveal>
        <Section size="sm">
          <MediaTextRow
            eyebrow="What it is"
            heading="Mare's milk, changed by fermentation"
            body={WHAT_IT_IS}
            imageBrief="Three-quarter view of a worn wooden fermentation churn bound with dark leather straps, holding mare's milk with a faint uneven skin on the surface, on a packed earth floor inside a dim Mongolian ger. A single shaft of warm low morning light rakes across the milk while the right of the vessel falls into deep green shadow. Subject slightly left of centre, upper third dim and empty. Documentary texture, subtle film grain."
          />
        </Section>
      </Reveal>

      <Reveal>
        <Section size="default">
          <MediaTextRow
            reverse
            eyebrow="How it works"
            heading="Fermentation does some of the work first"
            body={HOW_IT_WORKS}
            image={{ avif: powderAvif, webp: powderWebp }}
            alt="Fine ivory milk powder in raking light, close up."
            cta={{
              label: "What is in it, in full",
              to: "/ingredients-sourcing/",
            }}
          />
        </Section>
      </Reveal>

      <Reveal>
        <Section size="default">
          <Container width="narrow">
            <h2
              className="mb-10 font-serif font-normal text-forest"
              style={H2}
            >
              What&rsquo;s inside
            </h2>
          </Container>
          <NutritionPanel
            servingNote={`Per ${product.servingSize}. The formula is identical in all three formats.`}
          />
        </Section>
      </Reveal>

      <Reveal>
        <Section size="default">
          <MediaTextRow
            eyebrow="Töv Province, Mongolia"
            heading="Milked between June and October"
            body={PROVENANCE}
            image={{ avif: steppeAvif, webp: steppeWebp }}
            alt="Horses grazing on open Mongolian grassland in low evening light."
            cta={{
              label: "Where it comes from",
              to: "/ingredients-sourcing/#sourcing",
            }}
          />
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
          </Container>
          <div className="mt-16">
            <ProcessSteps steps={product.howToTake} />
          </div>
          <Container width="content">
            <p
              className="mt-14 max-w-[62ch] font-serif text-forest/70"
              style={BODY}
            >
              Take it at the same time each day. Consistency matters more than
              the hour. If you miss a day, take the next one as normal — there
              is nothing to catch up on.
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
              Why it&rsquo;s different
            </h2>
          </Container>
          <ComparisonTable
            caption="Fermented mare's milk compared with fresh dairy milk and an isolated probiotic capsule"
            columns={[
              "Fermented mare's milk",
              "Fresh dairy milk",
              "Isolated probiotic capsule",
            ]}
            rows={DIFFERENCE_ROWS}
            highlightColumn={0}
            note="This compares categories of product, not brands. Which is right for you depends on what you are trying to do."
          />
        </Section>
      </Reveal>

      <Reveal>
        <Section size="default">
          <HonestLimits>
            <p>
              Research into fermented mare&rsquo;s milk is limited. Most
              published studies are small, many are conducted outside the
              countries where it is traditionally consumed, and few of them
              look at the specific outcomes people ask us about.
            </p>
            <p>
              We can tell you what is in this powder, how it was made, and what
              the individual nutrients in it are generally understood to do. We
              cannot tell you what it will do for you specifically, and we are
              not going to pretend otherwise.
            </p>
            <p>
              Thai FDA registration is in progress. We will publish the details
              here the day they are issued.
            </p>
          </HonestLimits>
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
            <Accordion items={QUESTIONS} />
          </Container>
        </Section>
      </Reveal>

      <Reveal>
        <Section size="default">
          <Container width="content">
            <h2
              className="mb-4 max-w-[16ch] font-serif font-normal text-forest"
              style={H2}
            >
              The other two formats
            </h2>
            <p
              className="mb-12 font-serif text-forest/70"
              style={CAPTION}
            >
              Same powder, different pack.
            </p>
          </Container>
          <CrossSellPair products={others} />
        </Section>
      </Reveal>

      <Reveal>
        <ClosingCTA
          heading="One sachet, tomorrow morning"
          body="Twenty-five days is long enough to know."
          primary={{ label: "See all products", to: "/products/" }}
          secondary={{
            label: "What is in it",
            to: "/ingredients-sourcing/",
          }}
        />
      </Reveal>

      <StickyBuyBar product={product} boxRef={buyBoxRef} />
    </>
  );
}
