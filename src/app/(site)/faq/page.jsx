import FAQ from "../../../views/FAQ";
import { buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: "Frequently asked questions · Steppe Gut",
  description: "Questions about fermented mare's milk answered directly: how to take it, who it is for, ordering, shipping and payment",
  path: "/faq/",
});

export default function FAQPage() {
  return <FAQ />;
}
