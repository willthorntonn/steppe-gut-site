"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

// Keep a live ref to a value that changes identity every render (a parent's
// inline `onClose`), so the open/focus effect can depend on `open` alone and
// not tear down + re-run - and steal focus back - on every parent re-render.
function useLatest(value) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}

// Shared centred modal. Used by the account menu's Edit Profile and Log out
// dialogs. Visual treatment matches the nav's dropdown card exactly - the
// same #FFFDF9 fill, forest/10 hairline, 3xl radius and long soft shadow -
// so an opened dialog reads as the same surface family as the menu it came
// from.
//
// Behaviour mirrors the mobile menu in Nav.jsx: Escape closes, the page
// behind is locked from scrolling while open, and focus is moved into the
// dialog on open and returned to the trigger on close. Tab is trapped inside
// the dialog. The scrim click closes; a click that starts inside the card
// and drags onto the scrim does not (guards against an accidental close when
// selecting text).
//
// Entrance uses the site's existing `animate-scale-in` / `animate-fade-in`
// keyframes, which already collapse to no motion under prefers-reduced-motion
// (see index.css).
export default function Modal({
  open,
  onClose,
  title,
  titleId: providedTitleId,
  description,
  children,
  initialFocusRef,
  maxWidth = "max-w-[520px]",
}) {
  const generatedId = useId();
  const titleId = providedTitleId ?? `${generatedId}-title`;
  const descId = description ? `${generatedId}-desc` : undefined;
  const cardRef = useRef(null);
  const pointerDownInside = useRef(false);
  // Whether the press that this release completes actually began on the scrim.
  // Without it, the mouseup of the very click that opened the dialog - whose
  // mousedown landed on the trigger, before this overlay existed - would read
  // as a bare scrim click and close the dialog the instant it appeared.
  const pointerDownSeen = useRef(false);
  const restoreFocusRef = useRef(null);
  const onCloseRef = useLatest(onClose);
  const initialFocusLatest = useLatest(initialFocusRef);

  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    document.documentElement.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = cardRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown, true);

    // Move focus in after the portal has painted. setTimeout, not
    // requestAnimationFrame: rAF is frozen while the tab is backgrounded,
    // which would strand focus outside the dialog (same reasoning as
    // RouteChange.jsx).
    const focusTimer = setTimeout(() => {
      const explicit = initialFocusLatest.current?.current;
      const card = cardRef.current;
      const target =
        (explicit && typeof explicit.focus === "function" && explicit) ||
        // A form control first (Edit Profile lands on the name field); only
        // then a button - which for the Log out dialog is Cancel, the safe
        // default for a destructive confirm.
        card?.querySelector(
          'input:not([type="file"]):not([tabindex="-1"]), textarea, select'
        ) ||
        card?.querySelector("button:not([data-modal-close])") ||
        card;
      target?.focus?.();
    }, 0);

    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown, true);
      clearTimeout(focusTimer);
      restoreFocusRef.current?.focus?.();
    };
    // Deliberately keyed on `open` only. `onClose` / `initialFocusRef` are
    // read through refs so a parent re-render (mouse parallax on the nav,
    // say) doesn't tear this down and yank focus back out of the dialog.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#181006]/45 px-5 py-10 animate-fade-in"
      onMouseDown={(event) => {
        pointerDownSeen.current = true;
        pointerDownInside.current = cardRef.current?.contains(event.target) ?? false;
      }}
      onMouseUp={(event) => {
        const wasScrimPress =
          pointerDownSeen.current &&
          event.target === event.currentTarget &&
          !pointerDownInside.current;
        pointerDownSeen.current = false;
        if (wasScrimPress) onClose();
      }}
    >
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        className={`animate-scale-in relative w-full ${maxWidth} rounded-3xl border border-forest/10 bg-[#FFFDF9] p-7 shadow-[0_24px_60px_-16px_rgba(24,16,6,0.28)] outline-none sm:p-9`}
      >
        <button
          type="button"
          data-modal-close
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-forest/60 transition-colors hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <X size={20} strokeWidth={1.75} aria-hidden="true" />
        </button>

        <h2
          id={titleId}
          className="pr-10 font-serif text-[26px] font-semibold leading-tight tracking-[-0.02em] text-forest sm:text-[30px]"
        >
          {title}
        </h2>
        {description && (
          <p id={descId} className="mt-2 font-sans text-[15px] leading-relaxed text-forest/70">
            {description}
          </p>
        )}

        <div className="mt-6">{children}</div>
      </div>
    </div>,
    document.body
  );
}
