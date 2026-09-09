"use client";

import { useState } from "react";
import Link from "next/link";

// The "Our Mission" circle on the Our Story hub. It sits over the top-left of
// the steppe plate, inset from the left edge and dropped so most of the disc
// rests on the picture with just its crown breaking above onto the cream. It
// runs at roughly a tenth of the viewport width - big enough to read as the
// page's focal element rather than as a sticker on the corner of a photo.
//
// The disc is a link through to /our-story/mission/. On hover it swells
// slightly and a handful of smaller discs push out from behind it, past its
// perimeter; those are decorative. The section's own "Find out more" button
// leads to the same place.

// Diameter. `--vw` rather than plain vw because the site renders under
// `html { zoom: 0.85 }` (see index.css) - 10.4 * --vw really is 10.4% of the
// window, where 10.4vw would come out a fifth too wide.
const DIAMETER = "clamp(4.4rem, calc(10.4 * var(--vw)), 11.2rem)";

// The bubbles, in units of the main disc's diameter: `size` is their own
// diameter, `x`/`y` where their centre lands relative to the disc's centre.
// Anything past 0.5 sits outside the perimeter. They are weighted to the top
// and right so the leftmost ones cannot reach the viewport edge on a phone.
const BUBBLES = [
  { size: 0.2, x: 0.6, y: -0.42, delay: 0 },
  { size: 0.15, x: -0.52, y: -0.34, delay: 55 },
  { size: 0.13, x: 0.48, y: 0.54, delay: 90 },
  { size: 0.1, x: -0.28, y: 0.58, delay: 130 },
];

// How far in from their hover position the bubbles start, as a share of that
// offset. They are tucked under the disc at rest, not sitting on it.
const TUCK = 0.42;

export default function MissionBadge({ className = "" }) {
  const [open, setOpen] = useState(false);

  const bubbleTransform = (bubble) => {
    const reach = open ? 1 : TUCK;
    return [
      "translate(-50%, -50%)",
      `translate(calc(var(--badge) * ${bubble.x * reach}), calc(var(--badge) * ${
        bubble.y * reach
      }))`,
      `scale(${open ? 1 : 0.35})`,
    ].join(" ");
  };

  return (
    <Link
      href="/our-story/mission/"
      aria-label="Our Mission"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      style={{ "--badge": DIAMETER, width: "var(--badge)", height: "var(--badge)" }}
      className={`absolute z-10 block rounded-full outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${className}`}
    >
      {BUBBLES.map((bubble) => (
        <span
          key={`${bubble.x},${bubble.y}`}
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 rounded-full bg-forest transition-[transform,opacity] duration-500 ease-out"
          style={{
            width: `calc(var(--badge) * ${bubble.size})`,
            height: `calc(var(--badge) * ${bubble.size})`,
            transform: bubbleTransform(bubble),
            opacity: open ? 1 : 0,
            transitionDelay: `${open ? bubble.delay : 0}ms`,
          }}
        />
      ))}

      <span
        className="absolute inset-0 flex items-center justify-center rounded-full bg-forest px-[12%] text-center font-sans font-semibold uppercase leading-tight tracking-[0.16em] text-cream transition-transform duration-500 ease-out"
        style={{
          fontSize: "clamp(0.72rem, calc(1.45 * var(--vw)), 1.2rem)",
          transform: open ? "scale(1.07)" : "scale(1)",
        }}
      >
        Our Mission
      </span>
    </Link>
  );
}
