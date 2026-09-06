import PageMeta from "../components/ui/PageMeta";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";
import FaqAccordion from "../components/faq/FaqAccordion";
import { FAQ_GROUPS } from "../data/faq";
import { DISPLAY, LEAD, H2 } from "../styles/type";

// /faq/. Grouped accordion, one <h2> per category, questions as <h3><button>
// rows. The row treatment is the checkout payment switcher's, reused via
// components/faq/FaqAccordion.jsx - single-open within a group, like the
// payment radios there.
//
// Answers are authored copy: most were drafted for this page in the brand
// voice; a few reuse wording already settled elsewhere in the repo
// (see src/data/faq.js). No images - it is a utility page.
export default function FAQ() {
  return (
    <>
      <PageMeta
        title="Frequently asked questions · Steppe Gut"
        description="Questions about fermented mare's milk answered directly: how to take it, who it is for, ordering, shipping and payment"
      />

      {/* Matches PageHeader's clearance and centred treatment without its
          eyebrow/lead spacing, so the lead can carry an inline link. */}
      <header
        data-navtheme="light"
        className="bg-cream pb-7 pt-[112px] sm:pb-8 sm:pt-[132px] lg:pb-10 lg:pt-[186px]"
      >
        <Container width="content" className="text-center">
          <h1
            id="page-title"
            tabIndex={-1}
            className="mx-auto max-w-[20ch] font-serif font-normal text-forest outline-none"
            style={DISPLAY}
          >
            FAQ
          </h1>
          <p
            className="mx-auto mt-8 max-w-[54ch] font-sans text-forest/75"
            style={LEAD}
          >
            We are here to answer your questions!
          </p>
        </Container>
      </header>

      <Section
        size="none"
        className="pb-20 pt-10 sm:pb-28 sm:pt-14 lg:pb-36 lg:pt-[72px]"
      >
        <Container width="content">
          <div className="space-y-16 lg:space-y-24">
            {FAQ_GROUPS.map((group) => (
              <Reveal key={group.id}>
                <div id={group.id} className="scroll-mt-28">
                  <h2
                    className="font-serif font-normal text-forest"
                    style={H2}
                  >
                    {group.heading}
                  </h2>
                  <FaqAccordion
                    items={group.items}
                    className="mt-8 lg:mt-10"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Reveal>
        <Section size="sm" bg="cream" className="-mt-20 sm:-mt-24 lg:-mt-36">
          <Container width="content">
            <div className="flex flex-col items-center text-center">
              <h2 className="font-serif text-[26px] font-normal tracking-[-0.03em] text-forest lg:text-[40px]">
                Still got unanswered questions?
              </h2>
              <Button
                to="/contact/"
                variant="forest"
                radius="2xl"
                className="mt-8 h-12 px-8 text-[21px] lg:mt-10 lg:h-16 lg:px-11 lg:text-[26px]"
              >
                Contact Us
              </Button>
            </div>
          </Container>
        </Section>
      </Reveal>
    </>
  );
}
