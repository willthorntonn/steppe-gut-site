import Confirmation from "../../../../views/Confirmation";
import { buildMetadata } from "../../../../lib/seo";

export const metadata = buildMetadata({
  title: "Thank you · Steppe Gut",
  path: "/checkout/confirmation/",
  noindex: true,
});

export default function ConfirmationPage() {
  return <Confirmation />;
}
