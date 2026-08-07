import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, ShoppingBag, X } from "lucide-react";
import { NAV_LINKS } from "../../data/site";
import { useCart } from "../../cart/CartProvider";

// Flat pill colours per section theme (no gradients). Sections declare their
// theme with data-navtheme="dark|light"; the nav samples whichever section is
// under it and blends the pills into that background.
const PILL_BG = {
  dark: "rgba(38, 50, 38, 0.55)",
  light: "rgba(245, 241, 233, 0.78)",
};
const PILL_BORDER = {
  dark: "rgba(245, 241, 233, 0.14)",
  light: "rgba(47, 62, 47, 0.12)",
};
function HorseMark({ className }) {
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

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("dark");
  const { count } = useCart();
  const location = useLocation();

  useEffect(() => {
    // Scroll events are already frame-aligned in modern browsers, and this
    // does a single cheap read pass, so no extra throttling is needed.
    const update = () => {
      setScrolled(window.scrollY > 24);
      // Sample the section sitting under the nav bar so the pills always
      // blend with the background they're floating over.
      const probe = 44;
      let next = "dark";
      document.querySelectorAll("[data-navtheme]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= probe && rect.bottom >= probe) {
          next = el.dataset.navtheme;
        }
      });
      setTheme(next);
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
  }, [location.pathname]);

  // The menu is a full-screen overlay, so the page behind it must not scroll,
  // and Escape must close it (01_navigation.md §4).
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  // Close on navigation, so tapping a link in the overlay doesn't leave it
  // open over the new page.
  useEffect(() => setMenuOpen(false), [location.pathname]);

  // Ink follows the section theme at every scroll position — the page now
  // opens on cream, so cream ink at rest would be invisible. Only the pill
  // fill is still gated on `scrolled`.
  const light = theme === "light";
  const ink = light ? "text-forest" : "text-cream";
  const inkSoft = light
    ? "text-forest/80 hover:text-forest"
    : "text-cream/90 hover:text-cream";
  const iconInk = light
    ? "text-forest hover:text-forest/60"
    : "text-cream hover:text-cream/70";

  // One flat colour per theme. The pill background snaps on/off instantly and
  // the padding never changes, so the nav's geometry is identical at every
  // scroll position — only the fill appears.
  //
  // `transitionProperty: "color, fill"` is set explicitly (and wins over the
  // Tailwind `transition-colors` utility below via inline-style specificity)
  // so background-color/border-color/box-shadow are excluded from the
  // transition and snap instantly, while the ink itself still eases when the
  // section theme changes underneath a pinned nav.
  const pillStyle = {
    backgroundColor: scrolled ? PILL_BG[theme] ?? PILL_BG.dark : "rgba(0,0,0,0)",
    borderColor: scrolled ? PILL_BORDER[theme] ?? PILL_BORDER.dark : "rgba(0,0,0,0)",
    boxShadow: scrolled
      ? "0 12px 40px rgba(24, 16, 6, 0.18)"
      : "0 0 0 rgba(0,0,0,0)",
    transitionProperty: "color, fill",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease",
  };
  const pillCls = `rounded-full border ${scrolled ? "backdrop-blur-xl" : ""}`;

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-2 px-3 py-3 sm:px-4 lg:px-5 lg:py-4"
    >
      <Link
        to="/"
        aria-label="Steppe Gut — Home"
        className={`animate-slide-left delay-200 flex shrink-0 items-center gap-2 whitespace-nowrap px-3 py-[6px] font-serif text-[37.5px] font-semibold tracking-[-0.05em] ${ink} ${pillCls} 1395:gap-2.5 1395:px-4 1395:py-[7px] 1395:text-[56px]`}
        style={pillStyle}
      >
        <HorseMark className="h-[37.5px] w-auto shrink-0 1395:h-[56px]" />
        Steppe Gut
      </Link>

      {/* Four items, not the six-item mega-menu in 01_navigation.md §2.3 —
          that spec predates the 7-page rescope. Every item is a plain
          top-level link; there are no submenus to open. */}
      <div
        className={`animate-fade-in delay-400 hidden items-center gap-5 px-4 py-1.5 lg:flex ${pillCls} 1395:gap-8 1395:px-6 1395:py-2`}
        style={pillStyle}
      >
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `relative whitespace-nowrap py-1 font-sans text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold 1395:text-[22px] ${inkSoft} ${
                // 2px gold underline on the active route. Gold is a rule
                // colour here, never the label colour — gold text on cream
                // fails contrast (03_design_system.md §1.4), so the label
                // stays forest/cream and the underline is decoration on top
                // of an already-legible word.
                isActive
                  ? "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-gold after:content-['']"
                  : ""
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* Search, account and returns were removed with the rescope: there is
          no search index across 7 pages, no auth, and no returns portal.
          01_navigation.md §2.4 is explicit that a dead icon should be omitted
          rather than shipped. */}
      <div
        className={`animate-slide-right delay-300 flex items-center gap-2 px-3 py-1.5 ${pillCls} 1395:gap-3 1395:px-4 1395:py-2`}
        style={pillStyle}
      >
        <Link
          to="/cart/"
          aria-label={
            count > 0
              ? `Your basket, ${count} ${count === 1 ? "item" : "items"}`
              : "Your basket, empty"
          }
          className={`relative flex h-11 w-11 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${iconInk}`}
        >
          <ShoppingBag
            strokeWidth={1.5}
            className="h-6 w-6 1395:h-[37px] 1395:w-[37px]"
          />
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
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className={`relative z-40 flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold lg:hidden ${ink}`}
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
          className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-8 bg-forest/95 backdrop-blur-md lg:hidden"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-sans text-[30px] font-semibold text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${
                  isActive ? "underline decoration-gold decoration-2 underline-offset-8" : ""
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
