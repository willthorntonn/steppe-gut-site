import { Link, Outlet } from "react-router-dom";
import { Lock } from "lucide-react";
import RouteChange from "./RouteChange";
import { COMPANY, REGULATORY_DISCLOSURE } from "../../data/site";

// Reduced chrome for /checkout/, per 01_navigation.md §8: no nav, no cart
// icon, no social — the exits are removed at the point of payment. The logo
// still links home, so the visitor is never trapped.
export default function CheckoutLayout() {
  return (
    <>
      <RouteChange />

      <a
        href="#main"
        className="sr-only rounded-md bg-forest px-4 py-2 font-sans text-sm text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to main content
      </a>

      <header
        data-navtheme="light"
        className="border-b border-forest/10 bg-cream"
      >
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-6 py-5 sm:px-10 lg:px-14">
          <Link
            to="/"
            aria-label="Steppe Gut — Home"
            className="font-serif text-[26px] font-semibold tracking-[-0.05em] text-forest focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold lg:text-[34px]"
          >
            Steppe Gut
          </Link>
          <p className="flex items-center gap-2 font-sans text-sm text-forest/70">
            <Lock size={16} strokeWidth={1.5} aria-hidden="true" />
            Secure checkout
          </p>
        </div>
      </header>

      <main id="main" className="min-h-[60vh] bg-cream">
        <Outlet />
      </main>

      <footer className="bg-forest px-6 py-10 text-cream sm:px-10 lg:px-14">
        <div className="mx-auto max-w-[1180px]">
          <p className="max-w-[90ch] font-sans text-xs leading-[1.7] text-cream/40">
            {REGULATORY_DISCLOSURE}
          </p>
          <p className="mt-4 font-sans text-xs text-cream/60">
            &copy; {new Date().getFullYear()} {COMPANY.brandOwner.name}. All
            rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
