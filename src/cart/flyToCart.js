// "Fly to basket" - a circular crop of the product image arcs from the
// Add-to-Cart button up to the basket icon in the header.
//
// Modelled on the <fly-to-cart> element used by yearsbeer.com: a fixed-position
// circle, positioned with `transform: translate(x, y) scale(s)` driven by
// requestAnimationFrame along a cubic Bézier, then faded out and removed.
//
// Two deliberate departures from that reference:
//
//   1. It launches from the TOP-CENTRE of the button rather than the button's
//      middle, so the image appears to be lifted off the top edge instead of
//      erupting through the label.
//   2. The reference shrinks linearly the whole way (scale = 1 - progress/2).
//      Here the scale rises, HOLDS at full size for the middle 25% of the
//      curve, then falls again - so the image reads as small → big → small
//      with a real plateau at the top of the arc rather than a single moment.
//
// The header owns no part of this: the destination is found by attribute, and
// arrival is broadcast as an event, so nothing here imports the nav.

/** Marks the basket icon in the header. Set in components/layout/Nav.jsx. */
export const CART_TARGET_ATTR = "data-cart-target";

/** Fired on `window` when a projectile reaches the basket. */
export const FLY_ARRIVE_EVENT = "cart:fly-arrive";

const DURATION = 455;
const SIZE = 52;

// Scale envelope. GROW_END → HOLD_END is the plateau; at 0.375 → 0.625 it is
// exactly a quarter of the flight, per the brief.
const SCALE_MIN = 0.38;
const SCALE_MAX = 1;
const GROW_END = 0.375;
const HOLD_END = 0.625;

const easeOutCubic = (t) => 1 - (1 - t) ** 3;
const easeInCubic = (t) => t ** 3;

function scaleAt(progress) {
  if (progress <= GROW_END) {
    return SCALE_MIN + (SCALE_MAX - SCALE_MIN) * easeOutCubic(progress / GROW_END);
  }
  if (progress <= HOLD_END) return SCALE_MAX;
  const t = (progress - HOLD_END) / (1 - HOLD_END);
  return SCALE_MAX - (SCALE_MAX - SCALE_MIN) * easeInCubic(t);
}

/** Standard cubic Bézier, evaluated per axis. */
function bezierPoint(t, p0, p1, p2, p3) {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return {
    x: a * p0.x + b * p1.x + c * p2.x + d * p3.x,
    y: a * p0.y + b * p1.y + c * p2.y + d * p3.y,
  };
}

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

// The site renders the whole page at `zoom: var(--page-zoom)` on <html>
// (index.css) rather than a transform, specifically so vw-sized layout
// widens the viewport like real browser zoom does. The side effect: Chrome
// scales `position: fixed` descendants by every ancestor zoom too, not just
// static ones. sourceRect/destRect from getBoundingClientRect() are already
// real screen pixels, but our projectile is a fixed-position child of that
// zoomed <html> - so a naive translate(x, y) gets the zoom factor applied to
// it a second time and lands short and small. Dividing our target
// coordinates (and the box's own CSS size) by the zoom factor cancels that
// out, so the disc renders at the intended physical size and lands exactly
// where the button/basket measure. The arc's shape is unaffected: every
// point on the curve is converted the same way, so the whole path is just
// expressed in the zoomed root's coordinate space rather than moved.
function pageZoom() {
  const value = parseFloat(getComputedStyle(document.documentElement).zoom);
  return Number.isFinite(value) && value > 0 ? value : 1;
}

/**
 * Launch one projectile.
 *
 * @param {HTMLElement} sourceEl  Button the image lifts off the top edge of.
 * @param {string}      imageSrc  Product thumbnail (the same asset the nav
 *                                mega-menu uses).
 * Returns false when nothing was animated - no source, no basket in the DOM,
 * or the visitor has asked for reduced motion. Callers should update cart
 * state regardless of the return value; this is decoration, not the action.
 */
export function flyToCart(sourceEl, imageSrc) {
  const destEl = document.querySelector(`[${CART_TARGET_ATTR}]`);
  if (!sourceEl || !destEl || prefersReducedMotion()) return false;

  const sourceRect = sourceEl.getBoundingClientRect();
  const destRect = destEl.getBoundingClientRect();

  // Both rects come back in real screen pixels, but the projectile is a
  // fixed-position child of the zoomed <html>, so everything it is given is
  // scaled by `zoom` a second time on the way to the screen. Dividing the
  // rects (and the box's own CSS size) by that factor cancels it out - see
  // the note on pageZoom() above.
  const zoom = pageZoom();
  const sizeCss = SIZE / zoom;

  // Every coordinate is the projectile's top-left, so the visual centre
  // lands where we mean it to.
  const offset = sizeCss / 2;
  const start = {
    x: (sourceRect.left + sourceRect.width / 2) / zoom - offset,
    y: sourceRect.top / zoom - offset, // top edge, not centre
  };
  const end = {
    x: (destRect.left + destRect.width / 2) / zoom - offset,
    y: (destRect.top + destRect.height / 2) / zoom - offset,
  };

  // Control points scale with the distance travelled rather than using the
  // reference's fixed 200/300px, so the arc keeps its shape on a phone (short
  // hop) and on a wide desktop (long diagonal) alike. The 90/280 clamp is a
  // real-screen-pixel bound, so it is divided by zoom like everything else
  // here - otherwise the arc would read 18% taller than intended once the
  // browser scales it back down.
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const lift = Math.min(280 / zoom, Math.max(90 / zoom, Math.hypot(dx, dy) * 0.45));

  // Rise almost vertically off the button, then sweep in towards the basket
  // from below-left - the path bows outward instead of cutting a straight line.
  const control1 = { x: start.x, y: start.y - lift };
  const control2 = { x: start.x + dx * 0.45, y: end.y - lift * 0.6 };

  const node = document.createElement("div");
  node.setAttribute("aria-hidden", "true");
  Object.assign(node.style, {
    position: "fixed",
    left: "0",
    top: "0",
    width: `${sizeCss}px`,
    height: `${sizeCss}px`,
    borderRadius: "50%",
    overflow: "hidden",
    pointerEvents: "none",
    // Above the fixed nav (z-40) and the mega-menu (z-60).
    zIndex: "9999",
    backgroundColor: "#FFFDF9",
    backgroundImage: `url(${imageSrc})`,
    // Two of the three thumbnails are 3:4 portrait, so `contain` at full size
    // would run the product edge-to-edge and let the circular mask clip its
    // top and bottom. 68% insets the whole product inside the disc.
    backgroundSize: "68%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    // The disc is cream on a cream page, so the rim - not the fill - is what
    // makes it legible. Same forest/12 hairline the nav pills use on light
    // sections, over a shadow deep enough to lift it off the page.
    border: "1px solid rgba(47, 62, 47, 0.12)",
    boxShadow: "0 10px 28px -8px rgba(24, 16, 6, 0.45)",
    boxSizing: "border-box",
    opacity: "0",
    transition: "opacity 180ms ease",
    transform: `translate(${start.x}px, ${start.y}px) scale(${SCALE_MIN})`,
    willChange: "transform, opacity",
  });
  document.body.appendChild(node);

  let startTime = null;

  const step = (now) => {
    if (startTime === null) {
      startTime = now;
      // Held until the first frame so the fade-in runs from the launch point
      // rather than from wherever the previous layout put it.
      node.style.opacity = "1";
    }
    const progress = Math.min((now - startTime) / DURATION, 1);
    const point = bezierPoint(progress, start, control1, control2, end);
    node.style.transform = `translate(${point.x}px, ${point.y}px) scale(${scaleAt(progress)})`;

    if (progress < 1) {
      requestAnimationFrame(step);
      return;
    }

    node.style.opacity = "0";
    window.dispatchEvent(new CustomEvent(FLY_ARRIVE_EVENT));
    // Matches the opacity transition above; `transitionend` alone would never
    // fire if the tab is backgrounded mid-flight.
    setTimeout(() => node.remove(), 220);
  };

  requestAnimationFrame(step);
  return true;
}
