import Container from "./Container";
import Button from "./Button";
import LinkArrow from "./LinkArrow";
import closingAvif from "../../assets/home/steppe-closing.avif";
import closingWebp from "../../assets/home/steppe-closing.webp";
import { BODY, H2 } from "../../styles/type";

// The bookend that ends most pages (05_component_library.md §9).
//
// One shared image sitewide rather than a new asset per page. That is
// deliberate — a repeated closing image reads as a signature, not a shortcut.
//
// The image is decorative: the heading beside it carries all the meaning, so
// alt="" and it is a CSS background rather than an <img>. The gradient is
// heavy enough that cream type clears 4.5:1 over it at every point where text
// sits — 03_design_system.md §12 is explicit that the photograph must never
// be relied on for contrast on its own.
export default function ClosingCTA({ heading, body, primary, secondary }) {
  return (
    <section
      data-navtheme="dark"
      className="relative isolate flex min-h-[520px] items-center overflow-hidden bg-forest lg:min-h-[640px]"
    >
      <picture className="absolute inset-0 -z-10">
        <source type="image/avif" srcSet={closingAvif} />
        <img
          src={closingWebp}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-[center_45%]"
        />
      </picture>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(105deg, rgba(38,50,38,0.92) 0%, rgba(38,50,38,0.78) 42%, rgba(38,50,38,0.34) 100%)",
        }}
      />

      <Container className="py-20 lg:py-28">
        <div className="max-w-[620px]">
          <h2 className="font-serif font-normal text-cream" style={H2}>
            {heading}
          </h2>
          {body && (
            <p
              className="mt-7 max-w-[44ch] font-serif text-cream/80"
              style={BODY}
            >
              {body}
            </p>
          )}

          <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10">
            <Button to={primary.to} variant="cream" size="default" radius="2xl">
              {primary.label}
            </Button>
            {secondary && (
              <LinkArrow to={secondary.to} tone="dark">
                {secondary.label}
              </LinkArrow>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
