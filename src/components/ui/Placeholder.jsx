"use client";

// Marks where real photography belongs. Renders the shot as a written brief
// inside a bordered frame rather than filling the slot with a stand-in, so
// each frame can be handed to a photographer or picture editor as-is.
const TONES = {
  light: {
    border: "border-forest/25",
    eyebrow: "text-forest/45",
    brief: "text-forest/70",
    meta: "text-forest/40",
    hatch: "rgba(38,50,38,0.045)",
  },
  dark: {
    border: "border-cream/20",
    eyebrow: "text-cream/40",
    brief: "text-cream/70",
    meta: "text-cream/35",
    hatch: "rgba(245,241,233,0.05)",
  },
};

export default function Placeholder({
  ratio = "4 / 3",
  brief,
  tone = "light",
  className = "",
  // Styles the <img> rather than its frame, so a caller can scale the photo
  // inside a frame that is being scaled by a different amount (ProcessRow
  // grows the frame and pushes the photo in slightly further on hover).
  imageClassName = "",
  image,
  alt = "",
  // Lets a frame tell the fixed nav what it is, for the stretch of scroll where
  // the nav is over it - "dark" for the Mongolia photography, which is far
  // darker than the cream sections holding it. Opt-in rather than assumed from
  // `tone`: tone is about the frame's own furniture, and a light-toned frame
  // can still hold a dark photograph. Only set on the real-photo branch; an
  // unshot frame is hatched cream and reads as the section around it.
  navTheme,
}) {
  const t = TONES[tone];

  if (image) {
    return (
      <figure
        data-navtheme={navTheme}
        className={`relative w-full overflow-hidden border ${t.border} ${className}`}
        style={{ aspectRatio: ratio }}
      >
        <img
          src={image}
          alt={alt}
          className={`h-full w-full object-cover ${imageClassName}`}
        />
      </figure>
    );
  }

  return (
    <figure
      className={`relative w-full border ${t.border} ${className}`}
      style={{
        aspectRatio: ratio,
        backgroundImage: `repeating-linear-gradient(45deg, ${t.hatch} 0 1px, transparent 1px 10px)`,
      }}
    >
      <figcaption className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
        <span
          className={`font-sans text-[11px] uppercase tracking-[0.32em] ${t.eyebrow}`}
        >
          Photography
        </span>
        <span
          className={`max-w-[38ch] font-sans text-base leading-[1.6] ${t.brief}`}
        >
          {brief}
        </span>
        <span
          className={`font-sans text-[11px] uppercase tracking-[0.22em] ${t.meta}`}
        >
          {ratio.replace(/\s/g, "")}
        </span>
      </figcaption>
    </figure>
  );
}
