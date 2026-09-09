import AccountOrders from "../../../../views/AccountOrders";
import { buildMetadata } from "../../../../lib/seo";

export const metadata = buildMetadata({
  title: "My Orders · Steppe Gut",
  path: "/account/orders/",
  noindex: true,
});

export default function AccountOrdersPage() {
  return <AccountOrders />;
}
