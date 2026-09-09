"use client";

import PageHeader from "../components/ui/PageHeader";
import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import ClosingCTA from "../components/ui/ClosingCTA";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";
import SocialGrid from "../components/social/SocialGrid";
import { CONTENT_PILLARS, SOCIAL_PLATFORMS } from "../data/social";
import { COMPANY } from "../data/site";
import { BODY, H2, H4 } from "../styles/type";

// See website_blueprint/pages/social.md.
//
// A social page for a brand that has not posted anything yet. The failure mode
// is a grid of stock images pretending to be posts and a follower count that
// is really a target - both of which 02_brand_guidelines.md §10 rules out by
// name. So the page states its position instead, which is honest, costs
// nothing, and matches the honest-limits principle used everywhere else.
//
// No email capture field: there is no backend, and a notify form that collects
// addresses into nothing is the same data-protection problem as the checkout
// form. The action is a mailto:, which collects nothing and goes somewhere
// real.
export default function Social() {
  return (
    <>
      <PageHeader
        title="We have not started posting yet"
        lead="The accounts are not open. Rather than fill this page with pictures that are not ours and numbers that are not real, here is what we intend to post, and how to find out when it starts"
      />

      <Section size="sm">
        <Container width="content">
          <h2
            className="max-w-[18ch] font-serif font-normal text-forest"
            style={H2}
          >
            What will be on them
          </h2>
          <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CONTENT_PILLARS.map((pillar) => (
              <li
                key={pillar.title}
                className="rounded-2xl border border-forest/12 bg-[#FFFDF9] p-7"
              >
                <h3 className="font-serif font-normal text-forest" style={H4}>
                  {pillar.title}
                </h3>
                <p
                  className="mt-3 font-sans text-forest/75"
                  style={BODY}
                >
                  {pillar.body}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Reveal>
        <Section size="default">
          <SocialGrid />
        </Section>
      </Reveal>

      <Reveal>
        <Section size="default">
          <Container width="content">
            <h2
              className="max-w-[18ch] font-serif font-normal text-forest"
              style={H2}
            >
              Where to find us
            </h2>
            <p
              className="mt-8 max-w-[58ch] font-sans text-forest/75"
              style={BODY}
            >
              These are the platforms we intend to use. None of the accounts is
              open yet, so none of them is linked. When they are live, the
              handles will appear here and in the footer
            </p>

            {/* Plain text, not links. A link to a nonexistent account is a
                broken link, and if somebody registers the handle in the
                meantime it becomes a link to a stranger. */}
            <ul className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
              {SOCIAL_PLATFORMS.map((platform) => (
                <li
                  key={platform.name}
                  className="font-sans text-lg font-semibold text-forest/70"
                >
                  {platform.href ? (
                    <a
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-gold decoration-2 underline-offset-4 hover:text-forest"
                    >
                      {platform.name}
                    </a>
                  ) : (
                    platform.name
                  )}
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      </Reveal>

      <Reveal>
        <Section size="default">
          <Container width="content">
            <div className="rounded-2xl bg-[#E8EDE4] p-8 lg:p-12">
              <h2 className="font-serif font-normal text-forest" style={H2}>
                Tell me when it starts
              </h2>
              <p
                className="mt-7 max-w-[54ch] font-sans text-forest/80"
                style={BODY}
              >
                We do not have a mailing list set up yet, and we are not going
                to put up a form that quietly collects addresses into nothing.
                Email us and we will write to you when the accounts go live
              </p>
              <Button
                href={`mailto:${COMPANY.brandOwner.email}?subject=Tell%20me%20when%20Steppe%20Gut%20is%20on%20social`}
                variant="forest"
                radius="2xl"
                size="default"
                className="mt-10"
              >
                Email us
              </Button>
            </div>
          </Container>
        </Section>
      </Reveal>

      <Reveal>
        <ClosingCTA
          placeholder
          heading="In the meantime"
          body="The product pages have more detail than anything we would post anyway"
          primary={{ label: "See the products", to: "/products/" }}
          secondary={{ label: "What is in it", to: "/gut-health/" }}
        />
      </Reveal>
    </>
  );
}
