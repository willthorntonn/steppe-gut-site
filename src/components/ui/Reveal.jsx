import { useEffect, useRef, useState } from "react";

function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, ...options }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  stagger = 0,
  // Tune when the reveal fires. `threshold` is the fraction of the element
  // that must be in view; `rootMargin` grows/shrinks the viewport the observer
  // measures against - a positive bottom value (e.g. "0px 0px 20% 0px") trips
  // the animation while the element is still below the fold, so it plays as it
  // enters rather than after the reader has scrolled it well up the page.
  threshold = 0.2,
  rootMargin,
}) {
  const [ref, inView] = useInView({ threshold, rootMargin });
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const baseStyle = (index = 0) => ({
    transitionDelay: `${delay + index * stagger}ms`,
    transitionDuration: "700ms",
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    transitionProperty: reducedMotion ? "opacity" : "opacity, transform",
    opacity: inView ? 1 : 0,
    transform: inView || reducedMotion ? "translateY(0)" : "translateY(24px)",
  });

  if (stagger > 0) {
    const items = Array.isArray(children) ? children : [children];
    return (
      <div ref={ref} className={className}>
        {items.map((child, index) => (
          <div key={index} style={baseStyle(index)}>
            {child}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={baseStyle()}>
      {children}
    </div>
  );
}
