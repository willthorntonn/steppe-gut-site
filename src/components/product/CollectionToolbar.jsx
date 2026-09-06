import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

// The Shopify-style collection bar that sits above the products grid: a
// "Filter:" group on the left (Availability, Price) and a "Sort by:" group on
// the right, with a live result count. Rebuilt in the site's forest/cream
// palette rather than the reference's black-on-white.
//
// All three menus are real disclosure buttons (aria-expanded / aria-controls)
// with a popover panel, only one open at a time. Clicking outside or pressing
// Escape closes the open menu; the state itself lives on the Products page so
// the grid and this bar can never disagree about what is shown.

export const SORT_OPTIONS = [
  { value: "best-selling", label: "Best selling" },
  { value: "title-asc", label: "Alphabetically, A-Z" },
  { value: "title-desc", label: "Alphabetically, Z-A" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
];

function MenuButton({ id, label, value, isOpen, onToggle, align = "left", children }) {
  const panelId = `${id}-panel`;
  const wrapRef = useRef(null);

  // Close on click/tap outside this menu, or on Escape.
  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) {
        onToggle(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") onToggle(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onToggle]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => onToggle(!isOpen)}
        className="flex items-center gap-1.5 font-sans text-[17px] text-forest transition-colors hover:text-forest/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      >
        <span>{label}</span>
        {value && <span className="text-forest/70">{value}</span>}
        <ChevronDown
          size={17}
          strokeWidth={1.75}
          aria-hidden="true"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          id={panelId}
          className={`absolute top-full z-30 mt-3 w-[260px] border border-forest/15 bg-white p-4 shadow-[0_16px_40px_-16px_rgba(47,62,47,0.25)] ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default function CollectionToolbar({
  count,
  sort,
  onSortChange,
  availability,
  onAvailabilityChange,
  availabilityCounts,
  price,
  onPriceChange,
  priceCeiling,
}) {
  const idBase = useId();
  const [openMenu, setOpenMenu] = useState(null);

  const toggle = (name) => (next) => setOpenMenu(next ? name : null);

  const toggleAvailability = (key) => {
    const set = new Set(availability);
    set.has(key) ? set.delete(key) : set.add(key);
    onAvailabilityChange([...set]);
  };

  const activeSortLabel =
    SORT_OPTIONS.find((option) => option.value === sort)?.label ?? "";

  const availabilityActive = availability.length > 0;
  const priceActive = price.from !== "" || price.to !== "";

  return (
    <div className="mb-10 pb-4 lg:mb-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* -------- Filter group -------- */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <span className="font-sans text-[17px] text-forest">Filter:</span>

          <MenuButton
            id={`${idBase}-availability`}
            label="Availability"
            isOpen={openMenu === "availability"}
            onToggle={toggle("availability")}
          >
            <fieldset>
              <legend className="sr-only">Filter by availability</legend>
              <label className="flex items-center gap-2.5 py-1.5 font-sans text-[14px] text-forest">
                <input
                  type="checkbox"
                  checked={availability.includes("in-stock")}
                  onChange={() => toggleAvailability("in-stock")}
                  className="h-4 w-4 accent-forest"
                />
                In stock ({availabilityCounts.inStock})
              </label>
              <label className="flex items-center gap-2.5 py-1.5 font-sans text-[14px] text-forest">
                <input
                  type="checkbox"
                  checked={availability.includes("out-of-stock")}
                  onChange={() => toggleAvailability("out-of-stock")}
                  className="h-4 w-4 accent-forest"
                />
                Out of stock ({availabilityCounts.outOfStock})
              </label>
            </fieldset>
            {availabilityActive && (
              <button
                type="button"
                onClick={() => onAvailabilityChange([])}
                className="mt-2 font-sans text-[13px] text-forest/60 underline underline-offset-2 hover:text-forest"
              >
                Reset
              </button>
            )}
          </MenuButton>

          <MenuButton
            id={`${idBase}-price`}
            label="Price"
            isOpen={openMenu === "price"}
            onToggle={toggle("price")}
          >
            <p className="mb-3 font-sans text-[13px] text-forest/60">
              The highest price is ฿{priceCeiling.toLocaleString("en-US")}
            </p>
            <div className="flex items-center gap-3">
              <label className="flex flex-1 items-center gap-1.5 border border-forest/25 px-2.5 py-2 font-sans text-[14px] text-forest focus-within:border-forest">
                <span className="text-forest/50">฿</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min="0"
                  placeholder="From"
                  value={price.from}
                  onChange={(event) =>
                    onPriceChange({ ...price, from: event.target.value })
                  }
                  className="w-full bg-transparent outline-none placeholder:text-forest/40"
                  aria-label="Minimum price"
                />
              </label>
              <label className="flex flex-1 items-center gap-1.5 border border-forest/25 px-2.5 py-2 font-sans text-[14px] text-forest focus-within:border-forest">
                <span className="text-forest/50">฿</span>
                <input
                  type="number"
                  inputMode="numeric"
                  min="0"
                  placeholder="To"
                  value={price.to}
                  onChange={(event) =>
                    onPriceChange({ ...price, to: event.target.value })
                  }
                  className="w-full bg-transparent outline-none placeholder:text-forest/40"
                  aria-label="Maximum price"
                />
              </label>
            </div>
            {priceActive && (
              <button
                type="button"
                onClick={() => onPriceChange({ from: "", to: "" })}
                className="mt-3 font-sans text-[13px] text-forest/60 underline underline-offset-2 hover:text-forest"
              >
                Reset
              </button>
            )}
          </MenuButton>
        </div>

        {/* -------- Sort group -------- */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-2">
            <span className="font-sans text-[17px] text-forest">Sort by:</span>
            <MenuButton
              id={`${idBase}-sort`}
              label={activeSortLabel}
              align="right"
              isOpen={openMenu === "sort"}
              onToggle={toggle("sort")}
            >
              <ul className="-my-1">
                {SORT_OPTIONS.map((option) => (
                  <li key={option.value}>
                    <button
                      type="button"
                      onClick={() => {
                        onSortChange(option.value);
                        setOpenMenu(null);
                      }}
                      aria-current={option.value === sort ? "true" : undefined}
                      className={`block w-full py-2 text-left font-sans text-[14px] transition-colors hover:text-forest ${
                        option.value === sort
                          ? "font-semibold text-forest"
                          : "text-forest/70"
                      }`}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            </MenuButton>
          </div>

          <span
            aria-live="polite"
            className="font-sans text-[17px] text-forest"
          >
            {count} {count === 1 ? "product" : "products"}
          </span>
        </div>
      </div>
    </div>
  );
}
