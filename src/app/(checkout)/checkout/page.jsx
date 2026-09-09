import Checkout from "../../../views/Checkout";
import { buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: "Checkout",
  path: "/checkout/",
  noindex: true,
});

export default function CheckoutPage() {
  return <Checkout />;
}
