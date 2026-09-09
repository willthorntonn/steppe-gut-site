import Social from "../../../views/Social";
import { buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: "Social · Steppe Gut",
  description: "What Steppe Gut intends to post, and how to find out when the accounts open",
  path: "/social/",
});

export default function SocialPage() {
  return <Social />;
}
