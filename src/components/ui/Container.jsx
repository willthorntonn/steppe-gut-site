// Horizontal measure + page gutters. Widths follow the existing homepage
// (max-w-[2000px] with px-6 / sm:px-10 / lg:px-14), not the blueprint's
// 1280px container — see the note in src/styles/type.js.
const WIDTHS = {
  default: "max-w-[2000px]",
  // Long single-column pages (Ingredients & Sourcing, Contact) read badly at
  // 2000px, so they step down rather than inventing their own padding.
  content: "max-w-[1180px]",
  prose: "max-w-[72ch]",
  narrow: "max-w-[620px]",
};

export default function Container({
  width = "default",
  className = "",
  children,
  ...props
}) {
  return (
    <div
      className={`mx-auto w-full px-6 sm:px-10 lg:px-14 ${WIDTHS[width]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
