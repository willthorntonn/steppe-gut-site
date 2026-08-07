import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Route-change behaviour, per 01_navigation.md §10: scroll resets to the top
// and focus moves to the page's <h1> (which carries tabindex="-1"), so a
// keyboard user does not have to tab back through the whole nav after every
// navigation.
//
// Nothing is rendered.
export default function RouteChange() {
  const { pathname } = useLocation();
  // Skipped on first paint: a fresh page load already starts at the top, and
  // moving focus to the heading before the visitor has done anything would
  // put a focus ring on the hero for no reason.
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    // The heading belongs to the route that just mounted, so this runs after
    // paint. A frame's delay is enough and avoids fighting lazy boundaries.
    const frame = requestAnimationFrame(() => {
      const heading = document.querySelector("#page-title, main h1");
      if (heading instanceof HTMLElement) {
        heading.focus({ preventScroll: true });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
