import Products from "../../../views/Products";
import { buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: "Products",
  description: "Fermented mare's milk powder from Mongolia, in three formats: sachets, capsules, and a refill pouch",
  path: "/products/",
});

export default function ProductsPage() {
  return <Products />;
}
