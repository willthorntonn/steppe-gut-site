// Owns vertical rhythm. No page section sets its own top padding —
// 05_component_library.md §1, and the reason the homepage's sections already
// line up with each other.
//
// `bg` also sets data-navtheme, because the fixed nav samples whichever
// section is under it (see components/layout/Nav.jsx). A section that sets a
// dark background without declaring its theme leaves the nav pills unreadable
// as they cross it.
const SIZES = {
  sm: "py-12 sm:py-16 lg:py-20",
  default: "py-20 sm:py-28 lg:py-36",
  lg: "py-28 sm:py-40 lg:py-52",
  none: "",
};

const BACKGROUNDS = {
  cream: { cls: "bg-cream text-forest", theme: "light" },
  "cream-raised": { cls: "bg-[#FFFDF9] text-forest", theme: "light" },
  "sage-tint": { cls: "bg-[#E8EDE4] text-forest", theme: "light" },
  forest: { cls: "bg-forest text-cream", theme: "dark" },
  none: { cls: "", theme: null },
};

export default function Section({
  size = "default",
  bg = "cream",
  id,
  className = "",
  children,
  ...props
}) {
  const background = BACKGROUNDS[bg] ?? BACKGROUNDS.cream;

  return (
    <section
      id={id}
      data-navtheme={background.theme ?? undefined}
      // scroll-mt clears the fixed nav when an in-page anchor is followed.
      className={`scroll-mt-28 ${background.cls} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
