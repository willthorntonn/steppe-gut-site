// Our Story and Gut Health are the site's long-form editorial pages. This
// wrapper switches on `text-wrap: pretty` for their body copy (see
// globals.css) so no paragraph ever breaks to leave a single orphaned word
// on its own line. A plain block wrapper - no layout or scroll effect.
export default function EditorialLayout({ children }) {
  return <div className="editorial-copy">{children}</div>;
}
