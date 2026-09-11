"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CornerUpLeft, Package, Pencil, Settings, ShoppingBag } from "lucide-react";
import RouteChange from "./RouteChange";
import { HorseMark } from "./Nav";
import SearchMenu from "./SearchMenu";
import AuthModal from "../auth/AuthModal";
import EditProfileModal from "../account/EditProfileModal";
import LogoutConfirmModal from "../account/LogoutConfirmModal";
import { useCart } from "../../cart/CartProvider";
import { useAuth } from "../../auth/AuthProvider";
import accountAvatar from "../../grey-avatar-icon-user-avatar-photo-icon-social-media-user-icon-vector.jpg";

// Account rows that navigate. Edit Profile and Log out are actions handled
// separately below - same set the site-wide nav's account dropdown carries.
const ACCOUNT_LINKS = [
  { label: "My Orders", icon: Package, to: "/account/orders/" },
  { label: "Account Settings", icon: Settings, to: "/account/settings/" },
];

// Reduced chrome for /checkout/: the same logo mark and right-side icon
// cluster as the site-wide nav - same sizing/breakpoints and container
// padding as Nav.jsx, so it reads as the identical mark at the identical
// position - but with the middle link row (Products - Buy Steppe Gut)
// removed and no scroll-driven pill/theme behaviour. The header sits in
// normal document flow at the top of the page rather than fixed+animated,
// per 01_navigation.md §8. The logo still links home, so the visitor is
// never trapped. Rendered by the (checkout) route group's layout.
//
// The right-side controls are live here, exactly as on every other page:
// search opens the same dropdown, and the avatar opens an account menu
// (or the sign-in modal when signed out). AuthModal and the two account
// modals are mounted here too - on the (site) routes SiteChrome mounts
// them, and /checkout/ has its own layout that never touches SiteChrome.
export default function CheckoutChrome({ children }) {
  const { count } = useCart();
  const { user, openAuthModal } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const accountWrapRef = useRef(null);

  // Close the account menu on navigation and on an outside click / Escape,
  // so it never stays pinned open over the payment form.
  useEffect(() => setAccountOpen(false), [pathname]);
  useEffect(() => setSearchOpen(false), [pathname]);
  useEffect(() => {
    if (!accountOpen) return;
    const onPointerDown = (event) => {
      if (!accountWrapRef.current?.contains(event.target)) setAccountOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setAccountOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [accountOpen]);

  return (
    <>
      <RouteChange />

      <a
        href="#main"
        className="sr-only rounded-md bg-forest px-4 py-2 font-sans text-sm text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to main content
      </a>

      <header data-navtheme="light" className="relative z-40 bg-cream">
        <div className="flex items-center justify-between gap-2 px-3 py-3 sm:px-4 lg:px-5 lg:py-4">
          <Link
            href="/"
            aria-label="Steppe Gut home"
            className="flex shrink-0 items-center gap-2 whitespace-nowrap px-3 py-[6px] font-serif text-[37.5px] font-semibold tracking-[-0.05em] text-forest focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold 1395:gap-2.5 1395:px-4 1395:py-[7px] 1395:text-[56px]"
          >
            <HorseMark className="h-[37.5px] w-auto shrink-0 1395:h-[56px]" />
            Steppe Gut
          </Link>

          <div className="flex items-center gap-2 px-3 py-1.5 text-forest 1395:gap-3 1395:px-4 1395:py-2">
            <SearchMenu
              open={searchOpen}
              onOpen={() => setSearchOpen(true)}
              onClose={() => setSearchOpen(false)}
            />

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

            <div ref={accountWrapRef} className="relative">
              <button
                type="button"
                aria-label="Account"
                aria-haspopup="menu"
                aria-expanded={accountOpen}
                onClick={() => {
                  if (user) {
                    setAccountOpen((open) => !open);
                  } else {
                    openAuthModal("signin");
                  }
                }}
                className="flex h-11 w-11 items-center justify-center rounded-full transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold 1395:h-[52px] 1395:w-[52px]"
              >
                <img
                  src={user?.avatar || accountAvatar}
                  alt=""
                  className="h-9 w-9 shrink-0 rounded-full object-cover 1395:h-[52px] 1395:w-[52px]"
                />
              </button>

              {user && accountOpen && (
                <div className="absolute right-0 top-full z-[60] w-max pt-3">
                  <div className="min-w-[264px] rounded-3xl border border-forest/10 bg-[#FFFDF9] p-3 shadow-[0_24px_60px_-16px_rgba(24,16,6,0.28)]">
                    <div className="flex items-center gap-3 px-3 pb-1 pt-1.5">
                      <img
                        src={user.avatar || accountAvatar}
                        alt=""
                        className="h-10 w-10 shrink-0 rounded-full object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-sans text-[15px] font-semibold text-forest">
                          {user.name}
                        </p>
                        <p className="truncate font-sans text-[13px] text-forest/55">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="my-2 h-px bg-forest/10" />

                    <button
                      type="button"
                      onClick={() => {
                        setAccountOpen(false);
                        setProfileOpen(true);
                      }}
                      className="group/row flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left"
                    >
                      <Pencil
                        strokeWidth={1.5}
                        className="h-[18px] w-[18px] shrink-0 text-forest/70 transition-colors group-hover/row:text-gold"
                      />
                      <span className="font-sans text-[15px] font-semibold text-forest transition-colors group-hover/row:text-gold">
                        Edit Profile
                      </span>
                    </button>

                    {ACCOUNT_LINKS.map(({ label, icon: Icon, to }) => (
                      <Link
                        key={to}
                        href={to}
                        className="group/row flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left"
                      >
                        <Icon
                          strokeWidth={1.5}
                          className="h-[18px] w-[18px] shrink-0 text-forest/70 transition-colors group-hover/row:text-gold"
                        />
                        <span className="font-sans text-[15px] font-semibold text-forest transition-colors group-hover/row:text-gold">
                          {label}
                        </span>
                      </Link>
                    ))}

                    <div className="my-2 h-px bg-forest/10" />

                    <button
                      type="button"
                      onClick={() => {
                        setAccountOpen(false);
                        setLogoutOpen(true);
                      }}
                      className="group/row flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left"
                    >
                      <span className="font-sans text-[15px] font-semibold text-red-600">
                        Log out
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main id="main" className="min-h-[calc(60*var(--vh))] bg-cream">
        {children}
      </main>

      <AuthModal />
      <EditProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
      <LogoutConfirmModal open={logoutOpen} onClose={() => setLogoutOpen(false)} />
    </>
  );
}
