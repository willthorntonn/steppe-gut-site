import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

// Floating return-to-top control, matching the reference's persistent
// bottom-right button. Hidden until the reader is clearly past the hero, and
// removed from the tab order while hidden so it isn't a phantom stop.
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        })
      }
      className={`fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-2xl bg-forest text-cream shadow-lg transition-all duration-300 hover:bg-forest/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold lg:bottom-8 lg:right-8 lg:h-14 lg:w-14 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ChevronUp size={22} strokeWidth={1.75} />
    </button>
  );
}
