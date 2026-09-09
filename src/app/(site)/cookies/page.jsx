import Cookies from "../../../views/Cookies";
import { buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: "Cookie Policy | Steppe Gut",
  description: "How Steppe Gut uses cookies and similar technologies, what each one does, and how to refuse or delete them",
  path: "/cookies/",
});

export default function CookiesPage() {
  // Long-form copy: `text-wrap: pretty` via .editorial-copy (globals.css).
  return (
    <div className="editorial-copy">
      <Cookies />
    </div>
  );
}
