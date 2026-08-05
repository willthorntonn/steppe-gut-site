// Shared CTA button. Variant map (not cva) mirrors every bg/hover pair
// already in use across the site — this is a pure extraction, each existing
// call site's exact classes moved here, not redesigned.
const VARIANTS = {
  forest: "bg-forest text-cream hover:bg-forest/85",
  cream: "bg-cream text-forest hover:bg-cream/85",
  "cream-gold": "bg-cream text-forest hover:bg-gold",
};

const RADIUS = {
  full: "rounded-full",
  md: "rounded-md",
};

export default function Button({
  variant = "forest",
  radius = "full",
  className = "",
  children,
  ...props
}) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center font-sans font-semibold tracking-[-0.02em] transition-colors active:scale-[0.97] ${VARIANTS[variant]} ${RADIUS[radius]} ${className}`}
      style={{ transitionProperty: "background-color, transform", transitionDuration: "250ms", transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
      {...props}
    >
      {children}
    </button>
  );
}
