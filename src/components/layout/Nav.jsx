"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  ArrowLeft,
  ChevronRight,
  CornerUpLeft,
  Menu,
  Package,
  Pencil,
  Settings,
  ShoppingBag,
  X,
} from "lucide-react";

// Logout glyph. lucide's own `LogOut` draws the frame as a bare left bracket -
// the box reads as "cut in half". This keeps three-and-a-bit sides of the
// square closed, leaving only a gap on the right edge for the arrow to pass
// through. Same 24x24 grid / round joins / stroke conventions as the lucide
// icons beside it, so it accepts the same `strokeWidth` + `className` props.
function LogOutBox({ strokeWidth = 1.5, className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ transform: "translateX(4px)" }}
      aria-hidden="true"
    >
      {/* Whole glyph shifted right via a CSS transform on the <svg> itself:
          the shape is untouched and, because transforms don't reflow, the
          label and the icons above it stay exactly where they are. */}
      <path d="M13 8V5H3v14h10v-3" />
      <path d="M8 12h13" />
      <path d="M17 8l4 4-4 4" />
    </svg>
  );
}
import * as siteContent from "../../data/site";
import { useContent, useT } from "../../i18n/I18nProvider";
import { PRODUCT_BY_SLUG } from "../../data/products";
import { useCart } from "../../cart/CartProvider";
import { useAuth } from "../../auth/AuthProvider";
import { CART_TARGET_ATTR, FLY_ARRIVE_EVENT } from "../../cart/flyToCart";
import { SOCIAL_PLATFORMS } from "../../data/social";
import {
  FACEBOOK_PATH,
  INSTAGRAM_PATH,
  YOUTUBE_PATH,
  SocialGlyph,
} from "../icons/SocialGlyphs";
import SearchMenu from "./SearchMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import EditProfileModal from "../account/EditProfileModal";
import LogoutConfirmModal from "../account/LogoutConfirmModal";
import accountAvatar from "../../grey-avatar-icon-user-avatar-photo-icon-social-media-user-icon-vector.jpg";

// Bag, Box, Jar - the three product screenshots in reverse of the order they
// were supplied (Jar, Box, Bag).
const MEGA_MENU_SLUGS = ["sachet-bag", "sachet-box", "pill-bottle"];

// Account dropdown rows that navigate to a page. Edit Profile (opens a modal)
// and Logout (opens a confirm modal) are handled separately below because
// they are actions, not links. The signed-in email shows as read-only text
// in the menu header, not as a row. The menu mirrors the Products mega-menu's
// hover-open / hover-bridge / parallax behaviour.
// Foot of the mobile drawer. Three of the four rail platforms - TikTok is
// dropped here because the row is centred on a phone and four 48px tiles plus
// their gaps crowd the edges at 360px.
const MOBILE_SOCIAL_CELLS = [
  { label: "Facebook", d: FACEBOOK_PATH },
  { label: "Instagram", d: INSTAGRAM_PATH },
  { label: "YouTube", d: YOUTUBE_PATH },
];

const ACCOUNT_LINKS = [
  { label: "My Orders", icon: Package, to: "/account/orders/" },
  { label: "Account Settings", icon: Settings, to: "/account/settings/" },
];

// Flat neutral-grey pill colours per section theme (no gradients). Sections
// declare their theme with data-navtheme="dark|light" and the nav samples
// whichever section is under it.
//
// The pills are translucent, so most of what you see through one is the page
// behind it. That is why a neutral grey fill alone never read as grey: the
// homepage hero is green grass and brown rock under a warm brown scrim
// (rgba(24,16,6) in HeroBox/HeroStage), and that hue came straight through.
// The fix is PILL_BACKDROP below, which desaturates the backdrop rather than
// trying to cover it - see the note there. Keeping the fill translucent is
// deliberate: an opaque pill reads grey but goes dead, because it no longer
// shifts with whatever is passing behind it as you scroll.
// Both greys are light, and both fills are fairly opaque. The two go together:
// on a dimmed screen a dark fill lets a much larger share of the backdrop
// through in perceptual terms, so the hero's warm tones resurfaced as a reddy
// brown cast even with grayscale on. Lifting the grey and leaning on the fill
// rather than the backdrop keeps the pill the same neutral at any brightness.
//
// The dark alpha is tied to how light the grey is, and 0.86 is what rgb(92)
// needs. The binding case is the bright bokeh in the top right of the hero:
// composited over it the cream nav labels come out at 4.77:1, just clear of the
// 4.5:1 they need at 13px. Over hero shadow the same pair is 6.67:1. Lighten
// the grey further or drop the alpha and the bokeh case goes under - it was
// 4.38:1 at rgb(88) / 0.78 - so move the two together, not one alone.
const PILL_BG = {
  dark: "rgba(92, 92, 98, 0.86)",
  light: "rgba(246, 246, 250, 0.80)",
};
const PILL_BORDER = {
  dark: "rgba(255, 255, 255, 0.22)",
  light: "rgba(40, 40, 46, 0.14)",
};

// grayscale(1) is what actually makes the nav grey. It strips the colour out
// of the backdrop before the blur spreads it, so the greens and browns behind
// the pill arrive as neutral tones and the translucent fill has nothing warm
// left to tint it. The blur alone never did this - blurring a brown photo just
// gives a softer brown.
//
// Both halves are animated between an identity filter and the real one, so the
// pill eases into its fill instead of the blur snapping on at the threshold.
const PILL_BACKDROP = {
  on: "blur(20px) grayscale(1)",
  off: "blur(0px) grayscale(0)",
};
export function HorseMark({ className }) {
  return (
    <svg
      viewBox="0 0 293 280"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <g transform="translate(0.000000,280.000000) scale(0.100000,-0.100000)">
        <path d="M1450 2670 l-25 -31 -103 12 c-80 10 -127 10 -207 1 -103 -11 -263
-46 -278 -61 -4 -4 27 -19 69 -33 75 -26 76 -26 107 -8 45 26 130 47 212 54
l70 5 -73 -19 c-82 -22 -179 -70 -212 -105 l-22 -23 -34 20 c-18 11 -57 26
-85 33 -62 17 -118 54 -152 102 -22 31 -27 34 -33 19 -4 -10 -2 -53 3 -98 l9
-80 -50 -25 c-50 -25 -123 -94 -251 -238 -55 -61 -64 -76 -45 -70 56 16 110
49 198 120 92 74 142 105 192 120 15 4 3 -9 -30 -31 -30 -20 -107 -90 -170
-154 -84 -86 -125 -121 -154 -130 -54 -17 -156 -6 -222 24 -30 14 -54 21 -54
16 0 -21 108 -113 169 -143 56 -27 76 -32 141 -32 41 0 93 4 115 8 l40 9 -42
-40 c-24 -21 -43 -43 -43 -48 0 -5 7 -33 14 -62 l15 -54 -115 -256 c-133 -297
-148 -324 -206 -378 l-43 -40 0 -94 0 -95 49 -60 c27 -33 62 -84 79 -113 40
-72 64 -86 128 -78 41 6 55 3 78 -14 34 -23 78 -26 124 -6 48 20 67 47 96 138
l27 83 187 150 187 150 68 2 c37 0 87 8 111 17 58 21 57 22 74 -21 53 -136 61
-348 17 -488 -30 -96 -90 -207 -150 -283 -28 -34 -47 -62 -43 -62 25 0 117 67
170 123 145 156 182 289 159 582 l-8 100 42 104 c54 134 63 226 32 348 -11 44
-31 105 -44 134 l-23 54 -6 -130 c-7 -157 -26 -211 -100 -280 -109 -102 -251
-122 -339 -49 -44 38 -42 89 9 190 22 43 39 80 37 81 -1 1 -33 -25 -71 -58
-101 -87 -150 -117 -233 -141 -69 -20 -81 -37 -26 -38 52 0 153 -41 195 -79
l43 -38 -27 -36 c-15 -19 -62 -66 -104 -104 -167 -147 -182 -164 -231 -262
-28 -56 -57 -101 -72 -110 l-25 -16 20 30 c10 17 39 64 62 105 36 63 43 83 43
129 0 30 -3 51 -7 47 -5 -4 -42 -55 -83 -114 -111 -158 -177 -196 -204 -118
-9 23 -5 31 26 64 59 61 71 102 47 155 -26 58 -98 52 -152 -12 -32 -38 -33
-61 -7 -120 38 -83 18 -76 -56 20 -41 53 -44 62 -44 117 0 57 3 63 45 113 25
29 66 96 91 148 177 362 236 491 250 545 9 34 26 84 40 111 19 41 32 54 71 72
67 30 157 101 291 227 94 89 117 106 141 104 38 -3 58 15 73 65 12 40 32 63
150 172 l54 50 -29 -115 c-33 -132 -48 -157 -118 -199 -27 -17 -47 -36 -44
-41 3 -6 24 -13 46 -16 54 -9 37 -24 -35 -31 -31 -3 -53 -9 -49 -13 4 -5 58
-28 119 -52 241 -97 440 -272 546 -483 57 -113 80 -210 85 -360 8 -237 -30
-391 -169 -674 -111 -228 -132 -310 -108 -424 13 -62 24 -67 34 -13 11 60 76
175 132 236 30 32 106 97 168 144 124 94 168 138 223 223 79 124 114 259 115
447 0 149 15 111 25 -64 6 -130 -10 -239 -52 -342 -47 -116 -158 -243 -284
-327 -85 -56 -40 -48 93 17 259 127 402 276 462 478 19 63 24 199 11 269 l-8
40 22 -35 c32 -52 69 -155 85 -239 8 -41 16 -76 18 -78 10 -10 28 71 33 147
17 249 -146 525 -396 672 -55 33 -52 34 20 9 170 -58 355 -203 431 -338 40
-71 49 -51 19 45 -57 186 -215 348 -458 471 -96 48 -211 88 -303 106 l-65 12
65 7 c187 22 412 -80 618 -278 39 -38 72 -66 72 -61 0 18 -120 174 -190 245
-184 188 -415 313 -639 345 -84 13 -85 13 -31 15 119 4 228 -12 314 -46 40
-16 4 16 -57 50 -92 51 -209 87 -312 96 l-90 7 120 1 c111 2 168 -6 330 -43
l30 -7 -25 22 c-40 34 -168 95 -260 125 -69 22 -112 29 -225 34 -113 5 -132 8
-97 15 23 4 40 11 38 15 -3 4 -41 16 -85 26 l-80 18 -3 39 -3 38 -25 -30z
m358 -744 c151 -116 258 -274 297 -439 8 -34 15 -110 15 -168 0 -125 -22 -226
-74 -333 -52 -107 -68 -122 -41 -41 38 118 48 200 43 351 -4 123 -9 150 -38
236 -67 201 -184 350 -390 501 -14 10 10 0 53 -22 43 -23 104 -61 135 -85z
m519 -598 c-3 -8 -6 -5 -6 6 -1 11 2 17 5 13 3 -3 4 -12 1 -19z" />
      </g>
    </svg>
  );
}

// Nav-item underline width is fixed at one third of the rendered width of
// the word "Products" - every underline (hover or active) uses this same
// number rather than sizing itself to its own label, so "Our Story" and
// "FAQ" carry the identical short mark that "Products" does. Measured live
// off a hidden span using the nav links' own font classes, because the
// custom 1395px breakpoint changes the type size and a static px/ch value
// would drift from the real glyph width.
function useUnderlineWidth(sampleRef) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const measure = () => {
      if (sampleRef.current) {
        setWidth(sampleRef.current.getBoundingClientRect().width / 3);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [sampleRef]);
  return width;
}

export default function Navbar() {
  const { NAV_LINKS, PRODUCT_LINKS } = useContent("site", siteContent);
  const t = useT();
  const [menuOpen, setMenuOpen] = useState(false);
  // Which section of the mobile drawer is drilled into, by label, or null for
  // the root list. The label rather than the row itself: the rows are rebuilt
  // every render, and Settings' contents depend on whether anyone is signed
  // in, so a stored row would go stale the moment someone logs out from
  // inside it.
  const [menuSection, setMenuSection] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("dark");
  const { count } = useCart();
  const { user, openAuthModal } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  // Route matching for the active-link marks below. React Router's NavLink
  // matched against the slash-canonical `to` values in data/site.js; the
  // pathname is normalised to a trailing slash here so those comparisons
  // read the same whether or not the router reports the slash.
  const current = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const isActiveExact = (to) => current === to;
  const isActivePrefix = (to) => current === to || current.startsWith(to);

  // Account menu modals. Opening either one first closes the dropdown, so the
  // dialog is never layered over a still-open menu card.
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const productsSampleRef = useRef(null);
  const underlineWidth = useUnderlineWidth(productsSampleRef);

  // Products mega-menu. Opens on hover, closes on route change so it never
  // stays pinned open after a click navigates away.
  const [megaOpen, setMegaOpen] = useState(false);
  const megaWrapRef = useRef(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => setMegaOpen(false), [pathname]);

  // Text-list dropdowns for the sectioned areas (Our Story, Gut Health).
  // Only one is open at a time; holds the parent link's label or null. Same
  // hover-open / close-on-route-change contract as the Products mega-menu.
  const [openSection, setOpenSection] = useState(null);
  const sectionWrapRef = useRef(null);
  const [sectionParallax, setSectionParallax] = useState({ x: 0, y: 0 });
  useEffect(() => setOpenSection(null), [pathname]);

  // Account dropdown - same hover-open / hover-bridge / mouse parallax / close-
  // on-route-change contract as the Products mega-menu above.
  const [accountOpen, setAccountOpen] = useState(false);
  const accountWrapRef = useRef(null);
  // Read by the theme probe, so it samples the nav's real centre rather than a
  // hardcoded point that drifts when the bar changes height at 1395px.
  const navRef = useRef(null);
  const [accountParallax, setAccountParallax] = useState({ x: 0, y: 0 });

  useEffect(() => setAccountOpen(false), [pathname]);

  // The count itself updates the instant Add to Cart is pressed. The badge
  // only *pops* when a flying product image actually lands here, so the two
  // read as one gesture instead of two unrelated events. Nothing about the
  // count depends on this - a visitor with reduced motion, or one who added
  // from a surface that does not animate, still sees the number change.
  const [bump, setBump] = useState(false);
  useEffect(() => {
    const timers = new Set();
    const onArrive = () => {
      // Cleared and re-set on the next frame so a second add mid-pop
      // restarts the keyframe rather than being swallowed by it.
      setBump(false);
      requestAnimationFrame(() => setBump(true));
      timers.add(setTimeout(() => setBump(false), 420));
    };
    window.addEventListener(FLY_ARRIVE_EVENT, onArrive);
    return () => {
      window.removeEventListener(FLY_ARRIVE_EVENT, onArrive);
      timers.forEach(clearTimeout);
    };
  }, []);

  // 1–2px horizontal / max 1px vertical mouse-tracking parallax on the
  // dropdown card, driven off the pointer's position within the trigger +
  // card wrapper.
  const handleMegaMouseMove = (event) => {
    const rect = megaWrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const relY = (event.clientY - rect.top) / rect.height;
    setParallax({
      x: Math.max(-2, Math.min(2, relX * 2)),
      y: Math.max(-1, Math.min(1, (relY - 0.5) * 2)),
    });
  };

  const handleSectionMouseMove = (event) => {
    const rect = sectionWrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const relY = (event.clientY - rect.top) / rect.height;
    setSectionParallax({
      x: Math.max(-2, Math.min(2, relX * 2)),
      y: Math.max(-1, Math.min(1, (relY - 0.5) * 2)),
    });
  };

  const handleAccountMouseMove = (event) => {
    const rect = accountWrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const relY = (event.clientY - rect.top) / rect.height;
    setAccountParallax({
      x: Math.max(-2, Math.min(2, relX * 2)),
      y: Math.max(-1, Math.min(1, (relY - 0.5) * 2)),
    });
  };

  useEffect(() => {
    // Scroll events are already frame-aligned in modern browsers, and this
    // does a single cheap read pass, so no extra throttling is needed.
    const update = () => {
      setScrolled(window.scrollY > 24);
      // Sample whatever is sitting under the nav bar so the pills always blend
      // with the background they're floating over.
      //
      // The probe is a point, not a band: the nav's own centre. Sections are
      // full width so the x test never mattered for them, but photography
      // declares its theme too now (Placeholder, navTheme prop) and a plate
      // that fills only one column must not repaint the whole bar. Requiring
      // the centre means the nav answers to what is actually behind it.
      const navRect = navRef.current?.getBoundingClientRect();
      const probeY = navRect ? navRect.top + navRect.height / 2 : 44;
      const probeX = navRect
        ? navRect.left + navRect.width / 2
        : window.innerWidth / 2;

      let next = null;
      document.querySelectorAll("[data-navtheme]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (
          rect.top <= probeY &&
          rect.bottom >= probeY &&
          rect.left <= probeX &&
          rect.right >= probeX
        ) {
          // Document order, so the last hit is the innermost - a plate inside
          // a cream section wins over the section, which is the point.
          next = el.dataset.navtheme;
        }
      });
      // Nothing under the probe means a seam between two sections, not a
      // change of background - there is a 20px one between the hero and the
      // section below it. This used to fall back to "dark", so crossing that
      // seam flashed the bar over and straight back. Hold the last answer.
      setTheme((prev) => next ?? prev);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
    // Re-sampled on navigation: a new route replaces every [data-navtheme]
    // node, so the theme measured for the previous page is stale.
  }, [pathname]);

  // The menu is a full-screen overlay, so the page behind it must not scroll,
  // and Escape must close it (01_navigation.md §4).
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event) => {
      // Escape unwinds one level at a time: out of a section first, then out
      // of the drawer.
      if (event.key !== "Escape") return;
      setMenuSection((section) => {
        if (!section) setMenuOpen(false);
        return null;
      });
    };
    document.documentElement.style.overflow = "hidden";
    // Read by index.css to drop the fixed social rail for as long as the
    // drawer is up.
    document.documentElement.dataset.menuOpen = "";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.style.overflow = "";
      delete document.documentElement.dataset.menuOpen;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  // Close on navigation, so tapping a link in the overlay doesn't leave it
  // open over the new page.
  useEffect(() => setMenuOpen(false), [pathname]);
  // The drawer always reopens on its root list - a section left open from a
  // previous visit is not where anyone expects to land.
  useEffect(() => {
    if (!menuOpen) setMenuSection(null);
  }, [menuOpen]);
  useEffect(() => setSearchOpen(false), [pathname]);

  // Global shortcuts to open search: Cmd/Ctrl+K anywhere, or "/" when the
  // visitor is not already typing in a field.
  useEffect(() => {
    const onKeyDown = (event) => {
      const key = event.key.toLowerCase();
      const inField =
        event.target instanceof HTMLElement &&
        (event.target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName));

      if ((event.metaKey || event.ctrlKey) && key === "k") {
        event.preventDefault();
        setSearchOpen(true);
      } else if (key === "/" && !inField && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Ink follows the section theme at every scroll position - the page now
  // opens on cream, so cream ink at rest would be invisible. Only the pill
  // fill is still gated on `scrolled`.
  const light = theme === "light";
  // `ink` is set on the three pill containers only - never on the labels or
  // icons inside them. Those inherit `color`, so they repaint from the pill's
  // own animated value on every frame and cannot drift out of step with it,
  // however the timing below is tuned. (HorseMark paints with
  // fill="currentColor", so the logo glyph rides along too.)
  // The mobile drawer's root list. Every top-level route in the order the
  // desktop bar shows them, plus a Settings row gathering what the desktop
  // account dropdown holds - the dropdown itself is desktop-only.
  //
  // Products carries its three products here but has no `menu` in NAV_LINKS:
  // on desktop it opens the picture mega-menu instead, and giving the entry a
  // `menu` would send it down the plain-text dropdown branch above.
  const accountItems = user
    ? [
        ...ACCOUNT_LINKS.map(({ label, to }) => ({ label, to })),
        {
          label: t("nav.editProfile", "Edit Profile"),
          action: () => {
            setMenuOpen(false);
            setProfileOpen(true);
          },
        },
        {
          label: t("nav.logOut", "Log out"),
          tone: "danger",
          action: () => {
            setMenuOpen(false);
            setLogoutOpen(true);
          },
        },
      ]
    : [
        {
          label: t("nav.signIn", "Sign in"),
          action: () => {
            setMenuOpen(false);
            openAuthModal("signin");
          },
        },
      ];

  const mobileRows = [
    ...NAV_LINKS.map((link) => ({
      label: link.label,
      to: link.to,
      // Matched on the route, not the label: `label` is translated, so
      // comparing it to the English word "Products" would quietly stop
      // matching in all seven other languages and leave the mobile drawer's
      // Products row with no children.
      items: link.to === "/products/" ? PRODUCT_LINKS : link.menu,
    })),
    { label: t("nav.settings", "Settings"), items: accountItems },
  ];

  const openSectionRow = mobileRows.find((row) => row.label === menuSection);

  // The drawer is a cream sheet under the bar, so while it is open the logo
  // and the close button take forest ink whatever the section behind them
  // declared - cream on cream would leave both invisible.
  const ink = light || menuOpen ? "text-forest" : "text-cream";
  // Hover dims via opacity rather than a second text colour: opacity is a
  // separate property from the `color` being swapped here, so an icon mid-
  // hover during a theme change animates both without the two fighting.
  const iconInk = "transition-opacity hover:opacity-60";

  // One flat colour per theme. The padding never changes, so the nav's
  // geometry is identical at every scroll position - only the fill appears.
  //
  // Pill fill, border, shadow, backdrop filter and the inherited ink all share
  // one transition declaration, so they start and finish together - easing only
  // some of them made the pill visibly arrive before its contents (most obvious
  // on the "Steppe Gut" logo top-left). The backdrop filter has to be in that
  // list too, or the blur switches on instantly under a fill that is still
  // fading, which is what made the change feel abrupt.
  // The drawer is an opaque cream sheet, so a grey blurred pill over it would
  // read as a floating chip on a flat page rather than as part of the bar.
  // While it is open the pills go back to their unscrolled, fill-less state.
  const filled = scrolled && !menuOpen;
  const backdrop = filled ? PILL_BACKDROP.on : PILL_BACKDROP.off;
  const pillStyle = {
    backgroundColor: filled ? PILL_BG[theme] ?? PILL_BG.dark : "rgba(0,0,0,0)",
    borderColor: filled ? PILL_BORDER[theme] ?? PILL_BORDER.dark : "rgba(0,0,0,0)",
    // A neutral dark shadow rather than the mid-grey glow this had before: a
    // 40px 30% grey spread over the cream page read as a muddy warm halo
    // around each pill, which added to the brown cast rather than the pill.
    boxShadow: filled
      ? "0 10px 30px rgba(18, 18, 22, 0.16)"
      : "0 0 0 rgba(0,0,0,0)",
    backdropFilter: backdrop,
    WebkitBackdropFilter: backdrop,
    transitionProperty:
      "color, fill, background-color, border-color, box-shadow, backdrop-filter, -webkit-backdrop-filter",
    // Slower and with almost no lead-in. The old 120ms delay on a 260ms move
    // meant the fill sat still through the start of the scroll and then caught
    // up in a hurry, which is what read as stiff.
    transitionDuration: "440ms",
    transitionDelay: "40ms",
    transitionTimingFunction: "cubic-bezier(0.33, 0, 0.2, 1)",
  };
  const pillCls = "rounded-full border";

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      className="fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-2 px-3 py-3 sm:px-4 lg:px-5 lg:py-4"
    >
      <Link
        href="/"
        aria-label="Steppe Gut home"
        className={`animate-slide-left delay-200 relative z-40 flex shrink-0 items-center gap-2 whitespace-nowrap px-3 py-[6px] font-serif text-[37.5px] font-semibold tracking-[-0.05em] ${ink} ${pillCls} 1395:gap-2.5 1395:px-4 1395:py-[7px] 1395:text-[56px]`}
        style={pillStyle}
      >
        <HorseMark className="h-[37.5px] w-auto shrink-0 1395:h-[56px]" />
        Steppe Gut
      </Link>

      {/* Five items, not the six-item mega-menu in 01_navigation.md §2.3 -
          that spec predates the page rescope. Every item is a plain
          top-level link; there are no submenus to open.

          Each label carries an underline mark the same fixed width as one
          third of "Products" (measured off the hidden sample span below),
          centred under the text. At rest it is invisible (scale-x-0); on
          hover it grows from the centre to that fixed width, coloured like
          the label itself (bg-current) rather than gold - gold is reserved
          for the active route, so hovering never looks like "you are here."
          Once a route is active, the mark is permanently shown at full
          width in gold. */}
      <div
        className={`animate-fade-in delay-400 hidden items-center gap-5 px-4 py-1.5 lg:absolute lg:left-1/2 lg:top-1/2 lg:flex lg:-translate-x-1/2 lg:-translate-y-1/2 ${ink} ${pillCls} 1395:gap-8 1395:px-6 1395:py-2`}
        style={pillStyle}
      >
        {/* Invisible reference used only to measure "Products" at the
            current breakpoint's font size/weight. Never shown, never in the
            tab order. */}
        <span
          ref={productsSampleRef}
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 whitespace-nowrap font-sans text-[13px] font-semibold opacity-0 1395:text-[22px]"
        >
          Products
        </span>

        {NAV_LINKS.map((link) => {
          const isProducts = link.label === "Products";
          const hasMenu = Array.isArray(link.menu);
          const sectionOpen = hasMenu && openSection === link.label;

          // No `end` on the old NavLink, so a section's sub-pages keep the
          // parent lit: a prefix match.
          const isActive = isActivePrefix(link.to);
          const navItem = (
            <Link
              href={link.to}
              className="group relative whitespace-nowrap py-1 font-sans text-[13px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold 1395:text-[22px]"
            >
              {link.label}
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute inset-x-0 -bottom-0.5 mx-auto h-0.5 origin-center scale-x-0 bg-gold transition-transform duration-150 ease-out ${
                  isActive || (isProducts && megaOpen) || sectionOpen
                    ? "scale-x-100"
                    : "group-hover:scale-x-100"
                }`}
                style={{ width: underlineWidth || undefined }}
              />
            </Link>
          );

          if (hasMenu) {
            return (
              <div
                key={link.to}
                ref={sectionOpen ? sectionWrapRef : null}
                className="relative"
                onMouseEnter={() => setOpenSection(link.label)}
                onMouseLeave={() => setOpenSection(null)}
                onMouseMove={handleSectionMouseMove}
              >
                {navItem}

                {sectionOpen && (
                  // pt-5 is the invisible hover bridge, as on the Products
                  // mega-menu: the pointer never leaves this wrapper crossing
                  // the gap from the link down to the card.
                  <div className="absolute left-1/2 top-full z-[60] w-max -translate-x-1/2 pt-5">
                    <ul
                      className="min-w-[240px] rounded-3xl border border-forest/10 bg-[#FFFDF9] p-3 shadow-[0_24px_60px_-16px_rgba(24,16,6,0.28)] transition-transform duration-150 ease-out"
                      style={{
                        transform: `translate(${sectionParallax.x}px, ${sectionParallax.y}px)`,
                      }}
                    >
                      {link.menu.map((item) => (
                        <li key={item.to}>
                          <Link
                            href={item.to}
                            className="group/row flex items-center rounded-2xl px-3 py-2"
                          >
                            <span className="font-sans text-[15px] font-semibold text-forest transition-colors group-hover/row:text-gold">
                              {item.label}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          }

          if (!isProducts) return <div key={link.to}>{navItem}</div>;

          return (
            <div
              key={link.to}
              ref={megaWrapRef}
              className="relative"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
              onMouseMove={handleMegaMouseMove}
            >
              {navItem}

              {megaOpen && (
                // The pt-5 here is the invisible hover bridge: it's part of
                // this wrapper's own hoverable box, so the pointer never
                // leaves the wrapper while crossing the gap from the link
                // down to the card.
                <div className="absolute left-1/2 top-full z-[60] w-max -translate-x-1/2 pt-5">
                  <ul
                    className="min-w-[280px] rounded-3xl border border-forest/10 bg-[#FFFDF9] p-3 shadow-[0_24px_60px_-16px_rgba(24,16,6,0.28)] transition-transform duration-150 ease-out"
                    style={{
                      transform: `translate(${parallax.x}px, ${parallax.y}px)`,
                    }}
                  >
                    {MEGA_MENU_SLUGS.map((slug) => {
                      const product = PRODUCT_BY_SLUG[slug];
                      if (!product) return null;
                      return (
                        <li key={slug}>
                          <Link
                            href={`/products/${slug}/`}
                            className="group/row flex items-center gap-3 rounded-2xl px-3 py-2"
                          >
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center p-0.25">
                              {product.thumb ? (
                                <picture>
                                  <source type="image/avif" srcSet={product.thumb.avif} />
                                  <img
                                    src={product.thumb.webp}
                                    alt=""
                                    className="h-full w-full object-contain"
                                  />
                                </picture>
                              ) : null}
                            </span>
                            <span className="font-sans text-[15px] font-semibold text-forest transition-colors group-hover/row:text-gold">
                              {product.name}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div
        className={`animate-slide-right delay-300 relative z-40 flex items-center gap-2 px-3 py-1.5 ${ink} ${pillCls} 1395:gap-3 1395:px-4 1395:py-2`}
        style={pillStyle}
      >
        <SearchMenu
          open={searchOpen}
          onOpen={() => setSearchOpen(true)}
          onClose={() => setSearchOpen(false)}
        />

        <Link
          href="/cart/"
          // The landing target for flyToCart(). Read by attribute rather than
          // by ref so nothing outside the header needs to import the nav.
          {...{ [CART_TARGET_ATTR]: "" }}
          aria-label={
            count > 0
              ? `Your basket, ${count} ${count === 1 ? "item" : "items"}`
              : "Your basket, empty"
          }
          className={`relative flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${iconInk}`}
        >
          <ShoppingBag
            strokeWidth={1.5}
            className="h-6 w-6 1395:h-[37px] 1395:w-[37px]"
          />
          {count > 0 && (
            <span
              aria-hidden="true"
              className={`absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 font-sans text-[10px] font-bold text-forest ${
                bump ? "animate-cart-bump" : ""
              }`}
            >
              {count}
            </span>
          )}
        </Link>

        <LanguageSwitcher iconInk={iconInk} />

        <button
          type="button"
          aria-label="Go back"
          onClick={() => router.back()}
          className={`hidden h-11 w-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:flex ${iconInk}`}
        >
          <CornerUpLeft strokeWidth={1.5} className="h-6 w-6 1395:h-[37px] 1395:w-[37px]" />
        </button>

        <div
          ref={accountWrapRef}
          className="relative hidden sm:block"
          onMouseEnter={() => setAccountOpen(true)}
          onMouseLeave={() => setAccountOpen(false)}
          onMouseMove={handleAccountMouseMove}
        >
          <button
            type="button"
            aria-label="Account"
            aria-haspopup="menu"
            aria-expanded={accountOpen}
            onClick={() => setAccountOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold 1395:h-[52px] 1395:w-[52px]"
          >
            <img
              src={user?.avatar || accountAvatar}
              alt=""
              className="h-9 w-9 shrink-0 rounded-full object-cover 1395:h-[52px] 1395:w-[52px]"
            />
          </button>

          {accountOpen && (
            // pt-5 is the invisible hover bridge, exactly as the Products
            // mega-menu: the pointer never leaves this wrapper crossing the gap
            // from the avatar down to the card.
            <div className="absolute right-0 top-full z-[60] w-max pt-5">
              <div
                className="min-w-[264px] rounded-3xl border border-forest/10 bg-[#FFFDF9] p-3 shadow-[0_24px_60px_-16px_rgba(24,16,6,0.28)] transition-transform duration-150 ease-out"
                style={{
                  transform: `translate(${accountParallax.x}px, ${accountParallax.y}px)`,
                }}
              >
                {user ? (
                  <>
                    {/* Header: avatar, name, and the email as read-only text. */}
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
                      <LogOutBox
                        strokeWidth={1.5}
                        className="h-[18px] w-[18px] shrink-0 text-red-600"
                      />
                      <span className="font-sans text-[15px] font-semibold text-red-600">
                        Log out
                      </span>
                    </button>
                  </>
                ) : (
                  <div className="px-2 py-1.5">
                    <p className="px-1 pb-2 font-sans text-[13px] text-forest/55">
                      You&rsquo;re signed out.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setAccountOpen(false);
                        openAuthModal("signin");
                      }}
                      className="flex w-full items-center justify-center rounded-2xl bg-forest px-3 py-2.5 font-sans text-[14px] font-semibold text-cream transition-opacity hover:opacity-90"
                    >
                      Sign in
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="relative z-40 flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold lg:hidden"
        >
          {menuOpen ? (
            <X size={24} strokeWidth={1.5} />
          ) : (
            <Menu size={24} strokeWidth={1.5} />
          )}
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          // Two-level drawer: the root list, and a drilled-in view for the
          // one row whose chevron was tapped. Both live in the same
          // full-bleed cream sheet, so the nav bar above (logo left, close
          // right) stays put across the transition and only the body swaps.
          className="fixed inset-0 z-30 flex flex-col overflow-y-auto overscroll-contain bg-cream pb-10 pt-24 lg:hidden"
        >
          {openSectionRow ? (
            <div className="flex flex-1 flex-col px-6">
              {/* Back sits on its own row rather than beside the logo: the
                  logo is left-aligned in this nav, so the two would collide. */}
              <button
                type="button"
                onClick={() => setMenuSection(null)}
                aria-label={`Back to the main menu, leaving ${openSectionRow.label}`}
                className="-ml-1 flex h-11 w-11 items-center justify-center self-start rounded-full text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <ArrowLeft size={26} strokeWidth={2} />
              </button>

              <p className="mt-4 text-center font-sans text-[26px] font-semibold text-gold">
                {openSectionRow.label}
              </p>

              <div className="mt-8 flex flex-col items-start">
                {openSectionRow.items.map((item) =>
                  item.to ? (
                    <Link
                      key={item.to}
                      href={item.to}
                      className={`py-3.5 text-left font-sans text-[21px] text-forest focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${
                        isActiveExact(item.to) ? "font-semibold text-gold" : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    // Edit Profile and Log out open modals rather than
                    // navigating, so they are buttons sitting in the same
                    // list as the links.
                    <button
                      key={item.label}
                      type="button"
                      onClick={item.action}
                      className={`py-3.5 text-left font-sans text-[21px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${
                        item.tone === "danger" ? "text-red-600" : "text-forest"
                      }`}
                    >
                      {item.label}
                    </button>
                  ),
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-1 flex-col px-6">
              <div className="flex flex-col">
                {mobileRows.map((row) =>
                  row.items ? (
                    // The whole row opens the section, matching the phone
                    // pattern the client asked for - for the three sectioned
                    // areas the overview page is still one tap away as "All"
                    // inside, so nothing is lost by giving the row to the
                    // chevron.
                    <button
                      key={row.label}
                      type="button"
                      onClick={() => setMenuSection(row.label)}
                      aria-expanded={false}
                      className="flex w-full items-center justify-between py-4 text-left font-sans text-[30px] font-semibold text-forest focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                    >
                      {row.label}
                      <ChevronRight size={28} strokeWidth={2.5} className="shrink-0" />
                    </button>
                  ) : (
                    <Link
                      key={row.to}
                      href={row.to}
                      className={`py-4 font-sans text-[30px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${
                        isActivePrefix(row.to) ? "text-gold" : "text-forest"
                      }`}
                    >
                      {row.label}
                    </Link>
                  ),
                )}
              </div>

              {/* Social row, pinned to the foot of the sheet. The left-edge
                  SocialRail is the desktop equivalent; it reads the same
                  data, so an account going live turns both into real links
                  at once. */}
              <div className="mt-auto flex items-center justify-center gap-3 pt-12">
                {MOBILE_SOCIAL_CELLS.map((cell) => {
                  const live = SOCIAL_PLATFORMS.find(
                    (item) => item.name === cell.label,
                  )?.href;
                  const cls =
                    "flex h-12 w-12 items-center justify-center rounded-2xl bg-gold text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";

                  return live ? (
                    <a
                      key={cell.label}
                      href={live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Steppe Gut on ${cell.label}`}
                      className={cls}
                    >
                      <SocialGlyph d={cell.d} className="h-6 w-6" />
                    </a>
                  ) : (
                    <Link
                      key={cell.label}
                      href="/social/"
                      aria-label={`${cell.label}, our accounts are not open yet`}
                      className={cls}
                    >
                      <SocialGlyph d={cell.d} className="h-6 w-6" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      <EditProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
      <LogoutConfirmModal open={logoutOpen} onClose={() => setLogoutOpen(false)} />
    </nav>
  );
}
