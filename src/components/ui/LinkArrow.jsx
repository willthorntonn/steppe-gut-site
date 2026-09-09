"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

// The inline "read more" link, lifted from the homepage's OriginFeature so
// every page uses one treatment: leading arrow that nudges right on hover,
// uppercase sans label, gold on hover.
//
// Gold-on-cream fails contrast for text (03_design_system.md §1.4), so gold
// here is a hover state on an already-legible forest label, never the rest
// state, and never the only signal that the element is a link.
const TONES = {
  light: "text-forest hover:text-forest/60",
  dark: "text-cream hover:text-gold",
};

export default function LinkArrow({
  to,
  href,
  tone = "light",
  className = "",
  children,
  ...props
}) {
  const cls = `group inline-flex items-center gap-3 font-sans text-base font-bold uppercase tracking-[0.14em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold lg:text-lg ${TONES[tone]} ${className}`;
  const inner = (
    <>
      <ArrowRight
        size={22}
        strokeWidth={2}
        aria-hidden="true"
        className="shrink-0 transition-transform duration-300 group-hover:translate-x-1.5"
      />
      {children}
    </>
  );

  if (to) {
    return (
      <Link href={to} className={cls} {...props}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} {...props}>
      {inner}
    </a>
  );
}
