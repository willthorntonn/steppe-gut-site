import { Link } from "react-router-dom";
import { SOCIAL_PLATFORMS } from "../../data/social";
import {
  FACEBOOK_PATH,
  INSTAGRAM_PATH,
  YOUTUBE_PATH,
  TIKTOK_PATH,
  SocialGlyph,
} from "../icons/SocialGlyphs";

// Persistent social rail, pinned to the left edge and vertically centred -
// the reference's own on-scroll strip, called out but deliberately left
// unbuilt in Footer.jsx until now. Present on every page Layout wraps;
// Checkout uses CheckoutLayout instead, so it drops away there along with
// the rest of the chrome.
const CELLS = [
  { label: "Facebook", d: FACEBOOK_PATH },
  { label: "Instagram", d: INSTAGRAM_PATH },
  { label: "YouTube", d: YOUTUBE_PATH },
  { label: "TikTok", d: TIKTOK_PATH },
];

function socialTarget(label) {
  const platform = SOCIAL_PLATFORMS.find((item) => item.name === label);
  return platform?.href ?? null;
}

// Each cell sits white-on-forest at rest. Hover/focus rises a forest wedge
// up from the bottom edge - starting as a wide sliver hugging the bottom
// centre, then widening out to the full square as it climbs, rather than a
// flat curtain rising evenly. clip-path (not scale) draws that wedge, with
// both rest and hover states sharing four points so the browser interpolates
// between them instead of jump-cutting. The glyph flips to cream once the
// fill reaches it, staying inverted for as long as the pointer (or focus)
// remains.
export default function SocialRail() {
  return (
    <div
      data-social-rail=""
      className="fixed left-0 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-3 rounded-r-[28px] border border-forest/8 bg-cream px-3 py-6 shadow-[0_20px_48px_-16px_rgba(38,50,38,0.38)] sm:gap-4 sm:px-3.5 sm:py-7"
      aria-label="Steppe Gut on social media"
    >
      {CELLS.map((cell) => {
        const live = socialTarget(cell.label);
        const cls =
          "group relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-[0_4px_14px_-4px_rgba(38,50,38,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:h-14 sm:w-14";
        const glyphCls =
          "relative z-10 h-5 w-5 text-forest transition-colors duration-300 ease-out group-hover:text-cream group-focus-visible:text-cream sm:h-6 sm:w-6";

        const fill = (
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-forest transition-[clip-path] duration-300 ease-out [clip-path:ellipse(0%_0%_at_50%_100%)] group-hover:[clip-path:ellipse(180%_115%_at_50%_100%)] group-focus-visible:[clip-path:ellipse(180%_115%_at_50%_100%)]"
          />
        );

        return live ? (
          <a
            key={cell.label}
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Steppe Gut on ${cell.label}`}
            className={cls}
          >
            {fill}
            <SocialGlyph d={cell.d} className={glyphCls} />
          </a>
        ) : (
          <Link
            key={cell.label}
            to="/social/"
            aria-label={`${cell.label}, our accounts are not open yet`}
            className={cls}
          >
            {fill}
            <SocialGlyph d={cell.d} className={glyphCls} />
          </Link>
        );
      })}
    </div>
  );
}
