import { useEffect, useId, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// The FAQ accordion. Its visual treatment and behaviour are lifted straight
// from the individual product pages' accordion (the "How to Use" /
// "Specification" / "Contraindications" stack in
// src/components/product/FybelleLayout.jsx), so a question row reads exactly
// like one of those rows:
//
//   · a hairline stack - a top border on the group, a bottom border on every
//     row (border #dcd6c8), no rounded corners, no filled panel
//   · the trigger is a full-width flex row, question left, chevron right,
//     22px vertical padding, 21px / 700 forest text
//   · the chevron is that layout's exact SVG (viewBox 0 0 20 20, path
//     "M5 7.5L10 12.5L15 7.5", strokeWidth 1.8), rotating 180deg on open with
//     a `transition-transform` / 200ms ease
//   · the open panel is plain text - 14.5px / 400, colour #4a5245, ~10px
//     between blocks, decimal/disc lists indented 20px
//
// Behaviour matches that layout too: single-open (opening a row closes the
// one already open), and the panel is only mounted while open. Pass
// allowMultiple to let several stay open at once.
//
// The trigger is a real <button> inside an <h3> so the questions are a proper
// heading list, and a #question-id in the URL opens and scrolls to that row
// so FAQ links from elsewhere on the site land on an open answer.

const LINK_RE = /\[([^\]]+)\]\((\/[^)]*)\)/g;

// Turns the one permitted inline form, [label](/route/), into a Link. Anything
// else in the string is passed through as text. Used by both the paragraph
// and the step renderers so an answer reads the same in either shape.
function renderInline(text, keyPrefix) {
  const nodes = [];
  let lastIndex = 0;
  let match;
  LINK_RE.lastIndex = 0;
  while ((match = LINK_RE.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    nodes.push(
      <Link
        key={`${keyPrefix}-${match.index}`}
        to={match[2]}
        className="text-forest underline underline-offset-[3px] hover:text-forest/70"
      >
        {match[1]}
      </Link>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

// Renders a plain answer string, blank lines becoming separate paragraphs.
function AnswerText({ text }) {
  const paragraphs = text.split(/\n{2,}/);
  return (
    <div className="space-y-2.5 font-sans text-[18px] leading-relaxed text-[#6b6b6b]">
      {paragraphs.map((para, pIndex) => (
        <p key={pIndex}>{renderInline(para, `p${pIndex}`)}</p>
      ))}
    </div>
  );
}

// The bulleted step list. Each step is either a string or { title, body }.
function AnswerSteps({ steps }) {
  return (
    <ol className="list-decimal space-y-1.5 pl-5 font-sans text-[18px] leading-relaxed text-[#6b6b6b] marker:text-[#6b6b6b]/60">
      {steps.map((step, index) =>
        typeof step === "string" ? (
          <li key={index}>{renderInline(step, `s${index}`)}</li>
        ) : (
          <li key={index}>
            <span className="font-semibold text-forest">{step.title}</span>
            {step.body ? <span>, {renderInline(step.body, `s${index}`)}</span> : null}
          </li>
        )
      )}
    </ol>
  );
}

function FaqRow({ item, isOpen, onToggle }) {
  const id = useId();
  const triggerId = `${id}-trigger`;
  const panelId = `${id}-panel`;

  return (
    <div id={item.id} className="scroll-mt-28 border-b border-[#dcd6c8]">
      <h3 className="m-0">
        <button
          type="button"
          id={triggerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center gap-4 py-[22px] text-left font-sans text-[21px] font-bold text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <span className="flex-1">{item.question}</span>
          <svg
            viewBox="0 0 20 20"
            aria-hidden="true"
            className={`h-5 w-5 shrink-0 text-forest transition-transform duration-200 ease-[ease] ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </h3>

      {isOpen && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={triggerId}
          className="pb-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1.5"
        >
          {item.steps ? (
            <AnswerSteps steps={item.steps} />
          ) : (
            <AnswerText text={item.answer} />
          )}
        </div>
      )}
    </div>
  );
}

export default function FaqAccordion({
  items,
  allowMultiple = false,
  className = "",
}) {
  const { hash } = useLocation();
  const [open, setOpen] = useState([]);

  // A #question-id in the URL opens that item and scrolls to it, so FAQ
  // links from elsewhere on the site land on an answer that is already open.
  useEffect(() => {
    const target = hash.replace(/^#/, "");
    if (!target) return;
    if (!items.some((item) => item.id === target)) return;
    setOpen((current) => (current.includes(target) ? current : [...current, target]));
    const node = document.getElementById(target);
    if (node) node.scrollIntoView({ block: "start" });
  }, [hash, items]);

  const toggle = (id) =>
    setOpen((current) => {
      if (current.includes(id)) return current.filter((x) => x !== id);
      return allowMultiple ? [...current, id] : [id];
    });

  return (
    <div className={`border-t border-[#dcd6c8] ${className}`}>
      {items.map((item) => (
        <FaqRow
          key={item.id}
          item={item}
          isOpen={open.includes(item.id)}
          onToggle={() => toggle(item.id)}
        />
      ))}
    </div>
  );
}
