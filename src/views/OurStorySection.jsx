"use client";

import { useParams } from "next/navigation";
import SectionSubNav from "../components/layout/SectionSubNav";
import NotFound from "./NotFound";
import { OUR_STORY_LINKS } from "../data/site";

// Scaffolded sub-pages of Our Story. The section switcher sits directly under
// the fixed main nav, in the same spot as on every other Our Story page, with
// the rest of the page left deliberately empty until copy and photography
// land.
//
// "Our Mission" (/our-story/mission/), "Our Science Mission"
// (/our-story/science-mission/) and "Manufacturing Process"
// (/our-story/manufacturing/) are full pages with their own routes and
// components; they are not scaffolded here. This map is empty until the next
// Our Story sub-page is scaffolded - an unknown section renders NotFound.
const SECTIONS = {};

export default function OurStorySection() {
  const { section } = useParams();
  const entry = SECTIONS[section];
  if (!entry) return <NotFound />;

  return (
    <>
      {/* No page header: the section switcher sits directly under the fixed
          main nav, positioned exactly as ProductSubNav is on the product
          detail pages - same top clearance, same fade-in. Nothing above it
          but the main nav. */}
      <div
        data-navtheme="light"
        className="bg-cream pt-[84px] sm:pt-[99px] lg:pt-[140px]"
      >
        <div className="animate-fade-in delay-200">
          <SectionSubNav ariaLabel="Our Story sections" links={OUR_STORY_LINKS} />
        </div>
      </div>

      {/* Holds the page height until this section's content is built, so the
          footer doesn't ride up under the switcher. */}
      <div
        data-navtheme="light"
        className="min-h-[calc(45*var(--vh))] bg-cream"
      />
    </>
  );
}
