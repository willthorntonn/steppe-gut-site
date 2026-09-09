"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { highlightParts, runSearch } from "../../search/runSearch";

// Site search, rendered as a dropdown in the nav's own visual language - the
// same card, rows, type and hover treatment as the Products mega-menu in
// Nav.jsx. The first row is the field itself; once the query reaches
// MIN_CHARS, matching pages and page sections list underneath it as rows.
//
// Content comes from src/search/entries.js; matching from runSearch(). Picking
// a result navigates to `path + hash`; RouteChange.jsx scrolls the anchor into
// view once the (possibly lazy) route has mounted.

const MIN_CHARS = 3;
const MAX_RESULTS = 8;

export default function SearchMenu({ open, onOpen, onClose }) {
  const router = useRouter();
  const pathname = usePathname();
  const wrapRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const trimmed = query.trim();
  const ready = trimmed.length >= MIN_CHARS;

  const { total, groups, tokens } = useMemo(
    () => (ready ? runSearch(trimmed, { limit: MAX_RESULTS }) : { total: 0, groups: [], tokens: [] }),
    [ready, trimmed]
  );

  const flatResults = useMemo(
    () => groups.flatMap((group) => group.results.map((r) => ({ ...r, page: group.page }))),
    [groups]
  );

  // Reset transient state every time the menu opens, and put the caret in the
  // field. setTimeout, not rAF: rAF is frozen while the tab is backgrounded,
  // which would leave the field unfocused when the tab is brought forward.
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActiveIndex(0);
    const id = setTimeout(() => inputRef.current?.focus(), 0);
    return () => clearTimeout(id);
  }, [open]);

  // Never leave the active row past the end of a shrinking list.
  useEffect(() => {
    setActiveIndex((index) =>
      flatResults.length === 0 ? 0 : Math.min(index, flatResults.length - 1)
    );
  }, [flatResults.length]);

  // Escape closes; so does a pointer press anywhere outside the card. The
  // page behind is not locked - this is a dropdown, not a modal.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };
    const onPointerDown = (event) => {
      if (!wrapRef.current?.contains(event.target)) onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("touchstart", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("touchstart", onPointerDown);
    };
  }, [open, onClose]);

  // Keep the highlighted row in view during keyboard navigation.
  useEffect(() => {
    const node = listRef.current?.querySelector('[data-active="true"]');
    node?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, flatResults.length]);

  // Same 1-2px horizontal / max 1px vertical mouse-tracking parallax the
  // Products mega-menu carries, driven off the pointer's position within the
  // trigger + card wrapper.
  const handleMouseMove = (event) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const relY = (event.clientY - rect.top) / rect.height;
    setParallax({
      x: Math.max(-2, Math.min(2, relX * 2)),
      y: Math.max(-1, Math.min(1, (relY - 0.5) * 2)),
    });
  };

  const selectResult = (result) => {
    if (!result) return;
    onClose();
    // A result on the page you are already on: the router would treat the
    // push as a hash-only change and fire nothing RouteChange can hear.
    // Setting location.hash fires hashchange, which it listens for; a
    // page-top result just goes to the top, as the old router did.
    const current = pathname.endsWith("/") ? pathname : `${pathname}/`;
    if (result.path === current) {
      if (result.hash) {
        window.location.hash = result.hash;
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
      return;
    }
    router.push(`${result.path}${result.hash}`);
  };

  const onInputKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) =>
        flatResults.length === 0 ? 0 : (index + 1) % flatResults.length
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) =>
        flatResults.length === 0
          ? 0
          : (index - 1 + flatResults.length) % flatResults.length
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      selectResult(flatResults[activeIndex]);
    }
  };

  return (
    <div ref={wrapRef} className="relative" onMouseMove={handleMouseMove}>
      <button
        type="button"
        aria-label="Search"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => (open ? onClose() : onOpen())}
        className="flex h-11 w-11 items-center justify-center rounded-full transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        <Search strokeWidth={1.5} className="h-6 w-6 1395:h-[37px] 1395:w-[37px]" />
      </button>

      {open && (
        // pt-5 matches the Products menu's invisible bridge between the
        // trigger and the card.
        <div className="absolute right-0 top-full z-[60] pt-5">
          <div
            className="w-[min(92vw,300px)] rounded-3xl border border-forest/10 bg-[#FFFDF9] p-3 shadow-[0_24px_60px_-16px_rgba(24,16,6,0.28)] transition-transform duration-150 ease-out"
            style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}
          >
            {/* The field is the first row of the menu, and wears the
                checkout form's box: a 12px-radius #FFFDF9 field. Its
                appearance is identical focused and unfocused - no border
                change, no ring. The site-wide gold focus ring in index.css
                sits outside Tailwind's cascade layers, so no utility can
                switch it off; only the inline outline can. */}
            <input
              ref={inputRef}
              type="search"
              role="combobox"
              aria-label="Search"
              aria-expanded={flatResults.length > 0}
              aria-controls="sg-search-results"
              aria-activedescendant={
                flatResults[activeIndex]
                  ? `sg-search-opt-${flatResults[activeIndex].id}`
                  : undefined
              }
              autoComplete="off"
              spellCheck="false"
              placeholder="Search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={onInputKeyDown}
              style={{ outline: "none" }}
              className="h-[50px] w-full rounded-[12px] border border-forest/20 bg-[#FFFDF9] px-[11px] font-sans text-[14px] text-forest placeholder:text-forest/55 [&::-webkit-search-cancel-button]:appearance-none"
            />

            {ready && (
              <div
                ref={listRef}
                id="sg-search-results"
                role="listbox"
                aria-label="Search results"
                className="mt-2 max-h-[52vh] overflow-y-auto overscroll-contain border-t border-forest/10 pt-2"
              >
                {total === 0 && (
                  <p className="px-3 py-4 font-sans text-[13px] text-forest/45">
                    No matches for “{trimmed}”.
                  </p>
                )}

                {flatResults.map((result, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={result.id}
                      id={`sg-search-opt-${result.id}`}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      data-active={isActive}
                      tabIndex={-1}
                      onMouseMove={() => setActiveIndex(index)}
                      onClick={() => selectResult(result)}
                      className="group/row flex w-full flex-col gap-0.5 rounded-2xl px-3 py-2 text-left"
                    >
                      <span
                        className={`block w-full truncate font-sans text-[15px] font-semibold transition-colors group-hover/row:text-gold ${
                          isActive ? "text-gold" : "text-forest"
                        }`}
                      >
                        <Marked text={result.label} tokens={tokens} />
                      </span>
                      <span className="block w-full truncate font-sans text-[11px] uppercase tracking-[0.12em] text-forest/40">
                        {result.page}
                        {result.section ? ` · ${result.section}` : ""}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      <span className="sr-only" role="status" aria-live="polite">
        {!open || !ready
          ? ""
          : total === 0
            ? "No results"
            : `${total} result${total === 1 ? "" : "s"}`}
      </span>
    </div>
  );
}

function Marked({ text, tokens }) {
  return highlightParts(text, tokens).map((part, index) =>
    part.match ? (
      <mark key={index} className="rounded-[2px] bg-gold/25 px-[1px] text-inherit">
        {part.text}
      </mark>
    ) : (
      <span key={index}>{part.text}</span>
    )
  );
}
