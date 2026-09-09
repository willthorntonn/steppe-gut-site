import Buy from "../../../views/Buy";
import { buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: "Buy Steppe Gut",
  description: "Explore the full Steppe Gut range of fermented mare's milk supplements and find the right format for your daily routine",
  path: "/buy/",
});

export default function BuyPage() {
  return <Buy />;
}
