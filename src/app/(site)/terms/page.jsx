import Terms from "../../../views/Terms";
import { buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: "Terms and Conditions | Steppe Gut",
  description: "The terms that apply when you use the Steppe Gut website, covering copyright, trademarks, the accuracy of information and links to other sites",
  path: "/terms/",
});

export default function TermsPage() {
  // Long-form copy: `text-wrap: pretty` via .editorial-copy (globals.css).
  return (
    <div className="editorial-copy">
      <Terms />
    </div>
  );
}
