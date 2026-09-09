import Contact from "../../../views/Contact";
import { buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: "Contact Steppe Gut",
  description: "Send Steppe Gut a message: questions about a product, an order, trade or press",
  path: "/contact/",
});

export default function ContactPage() {
  return <Contact />;
}
