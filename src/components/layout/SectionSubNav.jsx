"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// In-page section switcher. Sits directly under the page header on every
// page of a sectioned area (Our Story, Gut Health), listing every option so
// moving between them never requires reopening the header dropdown. Mirrors
// components/product/ProductSubNav.jsx, generalised to any link list.
export default function SectionSubNav({ links, ariaLabel }) {
  const pathname = usePathname();
  // Exact match (the old NavLink carried `end`), against the slash-canonical
  // `to` values in data/site.js.
  const current = pathname.endsWith("/") ? pathname : `${pathname}/`;

  return (
    <nav
      aria-label={ariaLabel}
      data-navtheme="light"
      // -top-5/-top-6 pulls the switcher up toward the page header, matching
      // ProductSubNav. A horizontal scroller on narrow screens (the labels
      // here are longer than ProductSubNav's three format names and won't
      // wrap tidily), a centred wrapping row once there is room.
      className="relative -top-5 flex snap-x gap-x-6 gap-y-3 overflow-x-auto border-b border-forest/10 bg-cream px-5 py-4 [scrollbar-width:none] sm:-top-6 sm:flex-wrap sm:justify-center sm:gap-x-12 sm:overflow-visible [&::-webkit-scrollbar]:hidden"
    >
      {links.map((link) => {
        const isActive = current === link.to;
        return (
          <Link
            key={link.to}
            href={link.to}
            className={`shrink-0 snap-start whitespace-nowrap font-sans font-semibold tracking-[-0.01em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${
              isActive ? "text-gold" : "text-forest hover:text-gold"
            }`}
            style={{ fontSize: "clamp(14px, calc(1.2 * var(--vw)), 19px)" }}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
