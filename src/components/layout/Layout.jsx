import { Outlet } from "react-router-dom";
import Navbar from "./Nav";
import Footer from "./Footer";
import RouteChange from "./RouteChange";
import SocialRail from "./SocialRail";
import BackToTop from "../ui/BackToTop";
import AuthModal from "../auth/AuthModal";
import { CartAnnouncer } from "../../cart/CartProvider";

// Global chrome, present on every route except /checkout/ (which uses
// CheckoutLayout to remove exit paths at the point of payment).
export default function Layout() {
  return (
    <>
      <RouteChange />

      <a
        href="#main"
        className="sr-only rounded-md bg-forest px-4 py-2 font-sans text-sm text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main" className="bg-cream">
        <Outlet />
      </main>

      <Footer />
      <SocialRail />
      <BackToTop />
      <AuthModal />
      <CartAnnouncer />
    </>
  );
}
