"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { useLocale } from "../../i18n/I18nProvider";
import { LOCALES, LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE } from "../../i18n/config";

// English / ไทย picker in the header icon cluster, sitting between the basket
// and the go-back arrow. It opens the same way as the account menu next to it:
// hover-open on the wrapper with an invisible pt-5 bridge down to the card,
// plus a click toggle for touch and keyboard.
//
// Choosing a language writes NEXT_LOCALE, which middleware.js ranks above the
// browser's Accept-Language, then asks the server to re-render. The URL does
// not change, so the visitor stays exactly where they were on the page.
//
// Each row is written in its own script and carries its country's flag, so a
// visitor who cannot read the language currently showing can still find the
// one they want.

// Native flag emoji per locale - Apple renders these as the real flags. They
// sit at the right edge of each row, all in the same horizontal position
// because the label takes the remaining width.
const FLAG_EMOJI = { en: "🇬🇧", th: "🇹🇭" };

export default function LanguageSwitcher({ iconInk = "" }) {
  const locale = useLocale();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const closeTimer = useRef(null);

  // Same 1-2px mouse-tracking parallax the Products and account dropdowns use:
  // the card leans a hair toward the pointer as it moves across the wrapper.
  const wrapRef = useRef(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

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

  const choose = (code) => {
    setOpen(false);
    if (code === locale || pending) return;
    document.cookie = `${LOCALE_COOKIE}=${code}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
    startTransition(() => router.refresh());
  };

  return (
    <div
      ref={wrapRef}
      className="relative hidden sm:block"
      onMouseEnter={() => {
        clearTimeout(closeTimer.current);
        setOpen(true);
      }}
      onMouseLeave={() => {
        closeTimer.current = setTimeout(() => setOpen(false), 80);
      }}
      onMouseMove={handleMouseMove}
    >
      <button
        type="button"
        aria-label="Language / ภาษา"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-busy={pending || undefined}
        onClick={() => setOpen((v) => !v)}
        className={`flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${iconInk}`}
      >
        <Globe strokeWidth={1.5} className="h-6 w-6 1395:h-[37px] 1395:w-[37px]" />
      </button>

      {open && (
        // pt-5 is the invisible hover bridge, exactly as the account menu:
        // the pointer never leaves this wrapper crossing the gap to the card.
        <div className="absolute right-0 top-full z-[60] w-max pt-5">
          <div
            role="menu"
            aria-label="Language / ภาษา"
            className="min-w-[150px] rounded-3xl border border-forest/10 bg-[#FFFDF9] p-2 shadow-[0_24px_60px_-16px_rgba(24,16,6,0.28)] transition-transform duration-150 ease-out"
            style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}
          >
            {LOCALES.map(({ code, label }) => {
              const active = code === locale;
              return (
                <button
                  key={code}
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  lang={code}
                  onClick={() => choose(code)}
                  className="group/row flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left"
                >
                  <span
                    className={`flex-1 font-sans text-[15px] font-semibold transition-colors group-hover/row:text-gold ${
                      active ? "text-gold" : "text-forest"
                    }`}
                  >
                    {label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-[18px] leading-none"
                  >
                    {FLAG_EMOJI[code]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
