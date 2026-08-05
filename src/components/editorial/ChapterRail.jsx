import { useEffect, useState } from "react";

// Running chapter marker pinned to the right edge on large screens, so the
// reader always knows how far into the story they are.
//
// mix-blend-difference is doing real work here: the rail crosses both cream
// chapters and forest plates, and differencing against white keeps it legible
// on either without needing to track the section theme itself.
export default function ChapterRail({ chapters }) {
  const [active, setActive] = useState(chapters[0]?.id ?? null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const nodes = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter(Boolean);
    if (!nodes.length) return;

    // Only count a chapter as current once it occupies the middle band of the
    // viewport, so the marker changes as the reader actually crosses into it.
    const current = new IntersectionObserver(
      (entries) => {
        const inBand = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (inBand[0]) setActive(inBand[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    // Separate pass tracking whether any chapter is on screen at all. The rail
    // indexes the story, so it has no business still being there over the
    // product, the sidebar or the footer.
    const onScreen = new Set();
    const presence = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) onScreen.add(entry.target.id);
          else onScreen.delete(entry.target.id);
        });
        setVisible(onScreen.size > 0);
      },
      { threshold: 0 },
    );

    nodes.forEach((node) => {
      current.observe(node);
      presence.observe(node);
    });
    return () => {
      current.disconnect();
      presence.disconnect();
    };
  }, [chapters]);

  return (
    <nav
      aria-label="Chapters"
      aria-hidden={!visible}
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-5 mix-blend-difference transition-opacity duration-500 lg:flex"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {chapters.map((chapter) => {
        const isCurrent = chapter.id === active;
        return (
          <a
            key={chapter.id}
            href={`#${chapter.id}`}
            aria-current={isCurrent ? "true" : undefined}
            tabIndex={visible ? 0 : -1}
            className={`flex items-center justify-end gap-3 text-white transition-opacity duration-300 ${
              visible ? "pointer-events-auto" : "pointer-events-none"
            }`}
            style={{ opacity: isCurrent ? 1 : 0.35 }}
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.24em]">
              {chapter.folio}
            </span>
            <span
              aria-hidden
              className="h-px bg-white transition-all duration-300"
              style={{ width: isCurrent ? 28 : 12 }}
            />
          </a>
        );
      })}
    </nav>
  );
}
