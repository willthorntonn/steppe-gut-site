import SiteChrome from "../components/layout/SiteChrome";
import NotFound from "../views/NotFound";
import { buildMetadata } from "../lib/seo";

// The 404, with the full site chrome as it always had. Unlike the SPA it
// now answers with a real 404 status (public/404.html used to stand in for
// that on unmatched top-level paths).
export const metadata = buildMetadata({
  title: "Page not found · Steppe Gut",
  path: "/404/",
  noindex: true,
});

export default function NotFoundPage() {
  return (
    <SiteChrome>
      <NotFound />
    </SiteChrome>
  );
}
