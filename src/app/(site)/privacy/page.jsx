import Privacy from "../../../views/Privacy";
import { buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy | Steppe Gut",
  description: "How Steppe Gut collects and uses your personal data, why we process it, how long we keep it, and the rights you have over it",
  path: "/privacy/",
});

export default function PrivacyPage() {
  // Long-form copy: `text-wrap: pretty` via .editorial-copy (globals.css).
  return (
    <div className="editorial-copy">
      <Privacy />
    </div>
  );
}
