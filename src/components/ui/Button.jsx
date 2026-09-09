"use client";

import Link from "next/link";

// Shared CTA button. Variant map (not cva) mirrors every bg/hover pair
// already in use across the site - the first three are a pure extraction,
// each existing call site's exact classes moved here, not redesigned.
//
// The outline pair was added when the site grew past the homepage: pages
// beyond Home need a secondary action that doesn't compete with the solid
// forest primary. Gold is deliberately absent as a fill - 03_design_system.md
// §14 rules it out, because a gold button beside a forest one creates two
// competing primaries.
const VARIANTS = {
  forest: "bg-forest text-cream hover:bg-forest/85",
  cream: "bg-cream text-forest hover:bg-cream/85",
  "cream-gold": "bg-cream text-forest hover:bg-gold",
  "outline-forest":
    "border border-forest text-forest hover:bg-forest hover:text-cream",
  "outline-cream":
    "border border-cream text-cream hover:bg-cream hover:text-forest",
};

const RADIUS = {
  full: "rounded-full",
  md: "rounded-md",
  "2xl": "rounded-2xl",
};

// Matches the control height already used by the homepage's own CTAs
// (SteppeArmyProgress, Footer): h-14 stepping to h-16 at lg.
const SIZES = {
  none: "",
  default:
    "h-14 px-8 text-[19px] lg:h-16 lg:px-11 lg:text-[23px]",
};

export default function Button({
  variant = "forest",
  radius = "full",
  size = "none",
  href,
  to,
  className = "",
  children,
  ...props
}) {
  const cls = `inline-flex items-center justify-center font-sans font-semibold tracking-[-0.02em] transition-colors active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${VARIANTS[variant]} ${RADIUS[radius]} ${SIZES[size]} ${className}`;
  const style = {
    transitionProperty: "background-color, border-color, color, transform",
    transitionDuration: "250ms",
    transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  };

  // Renders a real link when given a destination, never a <div> or a button
  // with a click handler (05_component_library.md §4).
  if (to) {
    return (
      <Link href={to} className={cls} style={style} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} style={style} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={cls} style={style} {...props}>
      {children}
    </button>
  );
}
