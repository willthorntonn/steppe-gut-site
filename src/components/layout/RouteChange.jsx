"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// Route-change behaviour, per 01_navigation.md §10: scroll resets to the top
// and focus moves to the page's <h1> (which carries tabindex="-1"), so a
// keyboard user does not have to tab back through the whole nav after every
// navigation.
//
// Exception: when the new location carries a hash (site search deep-links to
// `path#section`, in-page anchors, the "See how it is made" links), scroll
// that section into view and move focus there instead of to the top. A same
// -page anchor exists immediately; a lazy route's element arrives a beat
// late, so this polls until it appears (or a ~4s deadline passes) and then
// re-aligns twice as late content above the anchor - fonts, earlier images -
// settles and shifts it down.
//
// Two deliberate choices:
//   - `behavior: "instant"` is pinned. `html` carries `zoom: 0.85`
//     (index.css) and under a zoomed ancestor Chromium silently drops
//     scrollIntoView unless the behavior is exactly "instant" (smooth and the
//     "auto" default both no-op). Instant is also the norm for an anchor jump.
//   - polling is on setTimeout, not requestAnimationFrame - rAF callbacks are
//     frozen while the tab is in the background, which would strand the jump.
//
// Nothing is rendered.
export default function RouteChange() {
  const pathname = usePathname();
  // Next has no reactive hash. A cross-page anchor arrives with the new
  // pathname and the hash already in the URL, so it is read off
  // window.location below. A same-page anchor (the search overlay landing on
  // the page you are already on) sets location.hash, which fires hashchange;
  // the counter re-runs the effect even when the same hash is chosen twice,
  // which is what the old location `key` did.
  const [anchor, setAnchor] = useState(0);
  useEffect(() => {
    const onHashChange = () => setAnchor((n) => n + 1);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Skipped on first paint: a fresh page load already starts at the top (or
  // the browser restores the anchor itself), and moving focus before the
  // visitor has done anything would put a focus ring on the hero for no
  // reason.
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timers = [];
    const hash = window.location.hash;

    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const deadline = performance.now() + 4000;

      const alignTo = (target) => {
        target.scrollIntoView({ behavior: "instant", block: "start" });
      };

      const settle = () => {
        const target = document.getElementById(id);
        if (target) {
          alignTo(target);
          // The section is a focus destination, not a tab stop. CSS only
          // suppresses the ring on <h1 tabindex="-1">, so programmatic focus
          // here stays quiet on its own (no :focus-visible without a key
          // press) while still moving the screen reader onto the section.
          if (!target.hasAttribute("tabindex")) {
            target.setAttribute("tabindex", "-1");
          }
          target.focus({ preventScroll: true });
          timers.push(setTimeout(() => alignTo(target), 160));
          timers.push(setTimeout(() => alignTo(target), 480));
          return;
        }
        if (performance.now() < deadline) timers.push(setTimeout(settle, 40));
      };

      settle();
      return () => timers.forEach(clearTimeout);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // The heading belongs to the route that just mounted, so this waits a
    // tick. setTimeout rather than rAF for the same background-tab reason as
    // above, and it avoids fighting lazy boundaries.
    timers.push(
      setTimeout(() => {
        const heading = document.querySelector("#page-title, main h1");
        if (heading instanceof HTMLElement) {
          heading.focus({ preventScroll: true });
        }
      }, 0)
    );
    return () => timers.forEach(clearTimeout);
    // `anchor` is in the deps so following a second anchor on the page you
    // are already on still re-triggers the scroll.
  }, [pathname, anchor]);

  return null;
}
