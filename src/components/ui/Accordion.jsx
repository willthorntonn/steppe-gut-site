"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { BODY } from "../../styles/type";

// 05_component_library.md §28.
//
// The trigger is a real <button> inside an <h3>, not a clickable <div> - the
// single most commonly broken accessibility pattern on marketing sites. The
// panel is kept in the DOM and hidden with `hidden` so `aria-controls` always
// resolves to a real element.
function AccordionItem({ item, isOpen, onToggle, headingLevel: H }) {
  const id = useId();
  const triggerId = `${id}-trigger`;
  const panelId = `${id}-panel`;

  return (
    <div className="border-b border-gold/60">
      <H className="m-0">
        <button
          type="button"
          id={triggerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-start justify-between gap-6 py-6 text-left font-serif font-normal tracking-[-0.02em] text-forest transition-colors hover:text-forest/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          style={{ fontSize: "clamp(1.25rem, 1.6vw, 1.55rem)", lineHeight: 1.35 }}
        >
          <span>{item.question}</span>
          <span
            aria-hidden="true"
            className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center"
          >
            {isOpen ? (
              <Minus size={22} strokeWidth={1.5} />
            ) : (
              <Plus size={22} strokeWidth={1.5} />
            )}
          </span>
        </button>
      </H>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!isOpen}
        className="pb-8"
      >
        <p
          className="max-w-[62ch] font-sans text-forest/80"
          style={BODY}
        >
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function Accordion({
  items,
  allowMultiple = false,
  headingLevel = "h3",
}) {
  const [open, setOpen] = useState([]);

  const toggle = (id) =>
    setOpen((current) => {
      if (current.includes(id)) return current.filter((x) => x !== id);
      return allowMultiple ? [...current, id] : [id];
    });

  return (
    <div className="border-t border-gold/60">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          headingLevel={headingLevel}
          isOpen={open.includes(item.id)}
          onToggle={() => toggle(item.id)}
        />
      ))}
    </div>
  );
}
