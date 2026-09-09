import AccountSettings from "../../../../views/AccountSettings";
import { buildMetadata } from "../../../../lib/seo";

export const metadata = buildMetadata({
  title: "Account Settings · Steppe Gut",
  path: "/account/settings/",
  noindex: true,
});

export default function AccountSettingsPage() {
  return <AccountSettings />;
}
