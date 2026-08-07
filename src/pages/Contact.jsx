import PageHeader from "../components/ui/PageHeader";
import PageMeta from "../components/ui/PageMeta";
import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Field from "../components/ui/Field";
import Button from "../components/ui/Button";
import Accordion from "../components/ui/Accordion";
import LinkArrow from "../components/ui/LinkArrow";
import ClosingCTA from "../components/ui/ClosingCTA";
import Reveal from "../components/ui/Reveal";
import { COMPANY } from "../data/site";
import { BODY, BODY_SM, CAPTION, H2, H4 } from "../styles/type";

// contact.md, with two departures from the source document, both forced by
// facts the document itself flags:
//
// 1. contact.md §4 lists press@, trade@, careers@ and privacy@ addresses and
//    then says "all five addresses are placeholders. Confirm each one exists
//    and is monitored before publishing." They have not been confirmed, and a
//    published address that bounces is worse than one route that works. So
//    every enquiry is routed through the one address that is verified in
//    BRAND_GUIDELINES.md §1, with a subject-line convention instead.
//
// 2. The "try the FAQ first" deflection pointed at /faq/, which was cut in the
//    rescope. It deflects to /ingredients-sourcing/ instead, which genuinely
//    does answer most of what gets asked.

const EMAIL = COMPANY.brandOwner.email;

function mailto(subject) {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;
}

const DEPARTMENTS = [
  {
    id: "product",
    question: "Product and batch questions",
    answer:
      "Send us the batch number printed on your pack and we will email you the certificate of analysis for that batch. Use the subject line “Batch enquiry”.",
  },
  {
    id: "press",
    question: "Press and media",
    answer:
      "For interviews, images or product samples, email us with the subject line “Press”. We do not have a media pack assembled yet; tell us what you need and we will send what exists.",
  },
  {
    id: "trade",
    question: "Trade and stockists",
    answer:
      "If you run a pharmacy, clinic, spa or store, email us with the subject line “Trade”. Wholesale terms and minimum orders are not published yet, so we will answer with the current position rather than point you at a page.",
  },
  {
    id: "careers",
    question: "Careers",
    answer:
      "We do not currently have open vacancies. If you want to be considered when we do, email us with the subject line “Careers” and tell us what you do.",
  },
  {
    id: "privacy",
    question: "Data and privacy requests",
    answer:
      "To access, correct or delete the personal data we hold about you, email us with the subject line “Privacy”. We respond within 30 days.",
  },
];

export default function Contact() {
  return (
    <>
      <PageMeta
        title="Contact Steppe Gut"
        description="Email, phone and postal details for Steppe Gut in Thailand, plus routes for press, trade, careers and data requests."
      />

      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        lead="We answer emails within two working days. If you need something faster, phone is quicker. We are a small team, so you will usually be talking to the same person twice."
      />

      <Section size="sm">
        <Container width="content">
          <div className="rounded-2xl bg-[#E8EDE4] p-8 lg:p-10">
            <h2 className="font-serif font-normal text-forest" style={H4}>
              Your question may already be answered
            </h2>
            <p
              className="mt-4 max-w-[58ch] font-serif text-forest/80"
              style={BODY_SM}
            >
              The ingredients and sourcing page covers allergens, what is in
              each format, where the milk comes from, who makes it, and our
              regulatory status — which is most of what we get asked.
            </p>
            <LinkArrow to="/ingredients-sourcing/" className="mt-8">
              Read that first
            </LinkArrow>
          </div>
        </Container>
      </Section>

      <Reveal>
        <Section size="default">
          <Container width="content">
            <h2
              className="max-w-[18ch] font-serif font-normal text-forest"
              style={H2}
            >
              General enquiries
            </h2>

            <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="border-b border-forest/12 pb-10 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-16">
                <h3 className="font-serif font-normal text-forest" style={H4}>
                  Steppe Gut (Thailand)
                </h3>
                <dl className="mt-6 space-y-4 font-serif text-forest/80" style={BODY_SM}>
                  <div>
                    <dt className="font-sans text-sm font-semibold text-forest/55">
                      Email
                    </dt>
                    <dd>
                      <a
                        href={`mailto:${EMAIL}`}
                        className="underline decoration-gold decoration-2 underline-offset-4 hover:text-forest"
                      >
                        {EMAIL}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-sans text-sm font-semibold text-forest/55">
                      Phone
                    </dt>
                    <dd>
                      <a
                        href={`tel:${COMPANY.brandOwner.phoneHref}`}
                        className="underline decoration-gold decoration-2 underline-offset-4 hover:text-forest"
                      >
                        {COMPANY.brandOwner.phone}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-sans text-sm font-semibold text-forest/55">
                      Hours
                    </dt>
                    <dd>Monday to Friday, 9:00–17:00 ICT</dd>
                  </div>
                  <div>
                    <dt className="font-sans text-sm font-semibold text-forest/55">
                      Distributed by
                    </dt>
                    <dd>
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
                </dl>
              </div>

              <div>
                <h3 className="font-serif font-normal text-forest" style={H4}>
                  {COMPANY.brandOwner.name}
                </h3>
                <p
                  className="mt-4 font-serif text-forest/70"
                  style={BODY_SM}
                >
                  The company behind the brand.
                </p>
                <dl className="mt-6 space-y-4 font-serif text-forest/80" style={BODY_SM}>
                  <div>
                    <dt className="font-sans text-sm font-semibold text-forest/55">
                      Email
                    </dt>
                    <dd>
                      <a
                        href={`mailto:${EMAIL}`}
                        className="underline decoration-gold decoration-2 underline-offset-4 hover:text-forest"
                      >
                        {EMAIL}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-sans text-sm font-semibold text-forest/55">
                      Manufactured by
                    </dt>
                    <dd>
                      {COMPANY.manufacturer.name},{" "}
                      {COMPANY.manufacturer.country}
                    </dd>
                  </div>
                </dl>
                <p className="mt-8 font-sans text-forest/55" style={CAPTION}>
                  All three companies involved in making and importing Steppe
                  Gut are named here so anyone who wants to verify them can find
                  them in one place.
                </p>
              </div>
            </div>
          </Container>
        </Section>
      </Reveal>

      <Reveal>
        <Section size="default">
          <Container width="content">
            <h2
              className="max-w-[18ch] font-serif font-normal text-forest"
              style={H2}
            >
              Other enquiries
            </h2>
            <p
              className="mb-14 mt-8 max-w-[58ch] font-serif text-forest/75"
              style={BODY}
            >
              Everything goes to the same address. We are small enough that a
              dozen separate inboxes would only mean a dozen places for your
              email to sit unread — a subject line is enough.
            </p>
            <Accordion items={DEPARTMENTS} />
          </Container>
        </Section>
      </Reveal>

      {/* Same rule as checkout: no backend, so the form is disabled, has no
          action and no submit handler, and says so in visible text. Do not
          collect personal data into a form that goes nowhere. */}
      <Reveal>
        <Section size="default">
          <Container width="narrow">
            <h2 className="font-serif font-normal text-forest" style={H2}>
              Send a message
            </h2>

            <div
              role="note"
              className="mt-10 rounded-2xl border-2 border-[#8C3A2B]/35 bg-[#FFFDF9] p-7"
            >
              <p
                className="font-serif text-forest/85"
                style={BODY_SM}
              >
                The form is not connected yet. It is disabled and sends nothing
                anywhere — please email{" "}
                <a
                  href={`mailto:${EMAIL}`}
                  className="underline decoration-gold decoration-2 underline-offset-4"
                >
                  {EMAIL}
                </a>{" "}
                instead, or phone{" "}
                <a
                  href={`tel:${COMPANY.brandOwner.phoneHref}`}
                  className="underline decoration-gold decoration-2 underline-offset-4"
                >
                  {COMPANY.brandOwner.phone}
                </a>
                .
              </p>
            </div>

            <form noValidate className="mt-10" aria-describedby="contact-disabled-note">
              <p id="contact-disabled-note" className="sr-only">
                This form is disabled. It is not connected to anything and no
                information entered here is sent or stored.
              </p>
              <fieldset disabled className="border-0 p-0">
                <legend className="sr-only">Message details</legend>
                <div className="space-y-6">
                  <Field label="Your name" name="name" autoComplete="name" required />
                  <Field
                    label="Email address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                  />
                  <Field
                    label="What is this about?"
                    name="topic"
                    as="select"
                    required
                    options={[
                      "General",
                      "Product question",
                      "Order",
                      "Trade",
                      "Press",
                      "Something else",
                    ]}
                  />
                  <Field
                    label="Message"
                    name="message"
                    as="textarea"
                    rows={6}
                    required
                  />
                  <label className="flex items-start gap-3">
                    {/* Unchecked by default. A pre-checked consent box is not
                        consent. */}
                    <input
                      type="checkbox"
                      name="consent"
                      className="mt-1 h-5 w-5 shrink-0 rounded border-forest/30"
                    />
                    <span className="font-sans text-sm text-forest/75">
                      I agree that Steppe Gut may use these details to reply to
                      me. (required)
                    </span>
                  </label>
                </div>
              </fieldset>

              <Button
                type="submit"
                variant="forest"
                radius="2xl"
                disabled
                className="mt-10 h-14 w-full cursor-not-allowed text-[18px] opacity-45"
              >
                Send message
              </Button>
              <p className="mt-4 font-sans text-forest/55" style={CAPTION}>
                Not available yet. Nothing on this form is submitted or stored.
              </p>
            </form>
          </Container>
        </Section>
      </Reveal>

      <Reveal>
        <ClosingCTA
          heading="We do reply"
          body="And if we do not know the answer, we will say so."
          primary={{ label: "See the products", to: "/products/" }}
          secondary={{ label: "What is in it", to: "/ingredients-sourcing/" }}
        />
      </Reveal>
    </>
  );
}
