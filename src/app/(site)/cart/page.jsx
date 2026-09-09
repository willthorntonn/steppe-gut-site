import Cart from "../../../views/Cart";
import { buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: "Your cart · Steppe Gut",
  path: "/cart/",
  noindex: true,
});

export default function CartPage() {
  return <Cart />;
}
