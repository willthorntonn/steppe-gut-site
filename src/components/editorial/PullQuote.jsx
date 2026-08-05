// Breaks the reading column to surface one line from the chapter. Set in the
// display serif at roughly twice body size, with a gold rule above rather
// than quotation marks.
export default function PullQuote({ children }) {
  return (
    <figure className="my-12 lg:my-16">
      <span aria-hidden className="block h-px w-16 bg-gold" />
      <blockquote
        className="mt-7 font-serif font-normal leading-[1.22] tracking-[-0.02em] text-forest"
        style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)" }}
      >
        {children}
      </blockquote>
    </figure>
  );
}
