import SiteChrome from "../../components/layout/SiteChrome";

// Every route except /checkout/ - including /checkout/confirmation/, which
// gets its exits back - renders inside the full site chrome.
export default function SiteLayout({ children }) {
  return <SiteChrome>{children}</SiteChrome>;
}
