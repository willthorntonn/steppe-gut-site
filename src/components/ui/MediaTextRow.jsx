"use client";

import Container from "./Container";
import LinkArrow from "./LinkArrow";
import Picture from "./Picture";
import Placeholder from "./Placeholder";
import { BODY, H2 } from "../../styles/type";

// The workhorse (05_component_library.md §10). Alternating image/text rows
// carry most of the content sections on the site.
//
// `reverse` swaps the columns visually via `order`, never in the DOM, so the
// reading order stays image → text at every width and down every page.
export default function MediaTextRow({
  heading,
  headingId,
  body = [],
  cta,
  image,
  imageBrief,
  alt = "",
  ratio = "3 / 2",
  reverse = false,
  children,
}) {
  return (
    <Container>
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
        <div className={reverse ? "md:order-2" : undefined}>
          {image ? (
            <Picture
              avif={image.avif}
              webp={image.webp}
              alt={alt}
              width={1200}
              height={800}
              className="block overflow-hidden rounded-2xl"
              imgClassName="w-full object-cover"
            />
          ) : (
            <Placeholder ratio={ratio} brief={imageBrief} tone="light" />
          )}
        </div>

        <div className={reverse ? "md:order-1" : undefined}>
          <h2
            id={headingId}
            className="max-w-[16ch] font-serif font-normal text-forest"
            style={H2}
          >
            {heading}
          </h2>

          {body.map((paragraph, index) => (
            <p
              key={paragraph.slice(0, 32)}
              className={`max-w-[50ch] font-sans text-forest/80 ${
                index === 0 ? "mt-9" : "mt-6"
              }`}
              style={BODY}
            >
              {paragraph}
            </p>
          ))}

          {children}

          {cta && (
            <LinkArrow to={cta.to} className="mt-11">
              {cta.label}
            </LinkArrow>
          )}
        </div>
      </div>
    </Container>
  );
}
