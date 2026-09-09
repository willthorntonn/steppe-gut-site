"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { CornerUpLeft, Search, ShoppingBag } from "lucide-react";
import RouteChange from "./RouteChange";
import { HorseMark } from "./Nav";
import { useCart } from "../../cart/CartProvider";
import accountAvatar from "../../grey-avatar-icon-user-avatar-photo-icon-social-media-user-icon-vector.jpg";

// Reduced chrome for /checkout/: the same logo mark and right-side icon
// cluster as the site-wide nav - same sizing/breakpoints and container
// padding as Nav.jsx, so it reads as the identical mark at the identical
// position - but with the middle link row (Products - Buy Steppe Gut)
// removed and no scroll-driven pill/theme behaviour. The header sits in
// normal document flow at the top of the page rather than fixed+animated,
// per 01_navigation.md §8. The logo still links home, so the visitor is
// never trapped. Rendered by the (checkout) route group's layout.
export default function CheckoutChrome({ children }) {
  const { count } = useCart();
  const router = useRouter();

  return (
    <>
      <RouteChange />

      <a
        href="#main"
        className="sr-only rounded-md bg-forest px-4 py-2 font-sans text-sm text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to main content
      </a>

      <header data-navtheme="light" className="bg-cream">
        <div className="flex items-center justify-between gap-2 px-3 py-3 sm:px-4 lg:px-5 lg:py-4">
          <Link
            href="/"
            aria-label="Steppe Gut home"
            className="flex shrink-0 items-center gap-2 whitespace-nowrap px-3 py-[6px] font-serif text-[37.5px] font-semibold tracking-[-0.05em] text-forest focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold 1395:gap-2.5 1395:px-4 1395:py-[7px] 1395:text-[56px]"
          >
            <HorseMark className="h-[37.5px] w-auto shrink-0 1395:h-[56px]" />
            Steppe Gut
          </Link>

          <div className="flex items-center gap-2 px-3 py-1.5 1395:gap-3 1395:px-4 1395:py-2">
            <button
              type="button"
              aria-label="Search"
              className="hidden h-11 w-11 items-center justify-center rounded-full text-forest transition-colors hover:text-forest/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:flex"
            >
              <Search strokeWidth={1.5} className="h-6 w-6 1395:h-[37px] 1395:w-[37px]" />
            </button>

            <Link
              href="/cart/"
              aria-label={
                count > 0
                  ? `Your basket, ${count} ${count === 1 ? "item" : "items"}`
                  : "Your basket, empty"
              }
              className="relative flex h-11 w-11 items-center justify-center rounded-full text-forest transition-colors hover:text-forest/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <ShoppingBag strokeWidth={1.5} className="h-6 w-6 1395:h-[37px] 1395:w-[37px]" />
              {count > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 font-sans text-[10px] font-bold text-forest"
                >
                  {count}
                </span>
              )}
            </Link>

            <button
              type="button"
              aria-label="Go back"
              onClick={() => router.back()}
              className="hidden h-11 w-11 items-center justify-center rounded-full text-forest transition-colors hover:text-forest/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:flex"
            >
              <CornerUpLeft strokeWidth={1.5} className="h-6 w-6 1395:h-[37px] 1395:w-[37px]" />
            </button>

            <button
              type="button"
              aria-label="Account"
              className="hidden h-11 w-11 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:flex 1395:h-[52px] 1395:w-[52px]"
            >
              <img
                src={accountAvatar}
                alt=""
                className="h-9 w-9 shrink-0 rounded-full object-cover 1395:h-[52px] 1395:w-[52px]"
              />
            </button>
          </div>
        </div>
      </header>

      <main id="main" className="min-h-[calc(60*var(--vh))] bg-cream">
        {children}
      </main>
    </>
  );
}
