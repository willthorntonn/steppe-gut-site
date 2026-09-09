"use client";

import Container from "./Container";
import { DISPLAY, LEAD } from "../../styles/type";

// The standard top of every page except Home (which opens on its own hero).
//
// The top padding clears the fixed nav and matches the homepage hero's own
// clearance (pt-[96px] / sm:pt-[108px] / lg:pt-[174px]), so a subpage's first
// line of type sits at the same height as the hero's.
//
// The <h1> carries tabindex="-1" because it is the focus target on route
// change (01_navigation.md §10) - it is focused programmatically and is never
// a tab stop.
export default function PageHeader({
  title,
  lead,
  align = "left",
  width = "content",
  children,
}) {
  const centred = align === "center";

  return (
    <header
      data-navtheme="light"
      className="bg-cream pb-14 pt-[112px] sm:pb-16 sm:pt-[132px] lg:pb-20 lg:pt-[186px]"
    >
      <Container width={width} className={centred ? "text-center" : undefined}>
        <h1
          id="page-title"
          tabIndex={-1}
          className={`font-serif font-normal text-forest outline-none ${
            centred ? "mx-auto max-w-[20ch]" : "max-w-[18ch]"
          }`}
          style={DISPLAY}
        >
          {title}
        </h1>
        {lead && (
          <p
            className={`mt-8 font-sans text-forest/75 ${
              centred ? "mx-auto max-w-[58ch]" : "max-w-[58ch]"
            }`}
            style={LEAD}
          >
            {lead}
          </p>
        )}
        {children}
      </Container>
    </header>
  );
}
