import Sitemap from "../../../views/Sitemap";
import { buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: "Sitemap | Steppe Gut",
  description: "Every page on the Steppe Gut site, listed in one place",
  path: "/sitemap/",
});

export default function SitemapPage() {
  // Long-form copy: `text-wrap: pretty` via .editorial-copy (globals.css).
  return (
    <div className="editorial-copy">
      <Sitemap />
    </div>
  );
}
