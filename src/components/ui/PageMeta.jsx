// Per-route document metadata. React 19 hoists <title>, <meta> and <link>
// rendered anywhere in the tree into <head>, so no helmet-style dependency is
// needed - SG-PROJECT_SPEC.md §13 asks for no dependency without a stated
// need, and there isn't one here.
export default function PageMeta({
  title,
  description,
  canonical,
  noindex = false,
}) {
  return (
    <>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {/* Commerce and error routes stay out of the index
          (cart-and-checkout.md, not-found.md - SEO notes). */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
    </>
  );
}
