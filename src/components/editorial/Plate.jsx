import Placeholder from "../ui/Placeholder";

// Full-width image plate sitting between chapters. Dark plates carry the
// forest background and flip the nav theme, which is what gives the long
// read its section rhythm.
//
// `width: "portrait"` narrows the frame. A tall ratio run at the full 1240px
// measure would stand over 1500px high and swallow the page, so portrait
// plates are held to a column instead.
const WIDTHS = {
  full: "max-w-[1240px]",
  portrait: "max-w-[620px]",
};

export default function Plate({
  ratio,
  brief,
  tone = "light",
  caption,
  width = "full",
  image,
  alt,
}) {
  const dark = tone === "dark";
  return (
    <section
      data-navtheme={dark ? "dark" : "light"}
      className={dark ? "bg-forest" : "bg-cream"}
    >
      <div
        className={`px-5 sm:px-8 lg:px-10 ${
          dark ? "py-16 lg:py-24" : "py-10 lg:py-14"
        }`}
      >
        <div className={`mx-auto ${WIDTHS[width] ?? WIDTHS.full}`}>
          <Placeholder ratio={ratio} brief={brief} tone={tone} image={image} alt={alt} />
          {caption && (
            <p
              className={`mt-4 max-w-[52ch] font-sans text-xs leading-[1.6] ${
                dark ? "text-cream/45" : "text-forest/45"
              }`}
            >
              {caption}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
