// A neutral stand-in for photography that has not been shot or chosen yet.
// Deliberately plainer than ui/Placeholder.jsx (which renders a full
// art-direction brief inside a hatched frame): this is just a grey box
// carrying a one-line "Image: ..." description, for pages scaffolded from a
// layout reference before their real imagery exists.
export default function ImagePlaceholder({
  description,
  ratio = "3 / 2",
  rounded = "rounded-2xl",
  className = "",
  src,
  alt = "",
  imgClassName = "",
  imgStyle,
  style,
}) {
  if (src) {
    return (
      <div
        className={`w-full overflow-hidden ${rounded} ${className}`}
        style={{ aspectRatio: ratio, ...style }}
      >
        <img
          src={src}
          alt={alt}
          className={`h-full w-full object-cover ${imgClassName}`}
          style={imgStyle}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex w-full items-center justify-center border border-dashed border-forest/25 bg-forest/[0.07] px-6 text-center ${rounded} ${className}`}
      style={{ aspectRatio: ratio, ...style }}
    >
      <span className="max-w-[38ch] font-sans text-sm leading-relaxed text-forest/55">
        Image: {description}
      </span>
    </div>
  );
}
