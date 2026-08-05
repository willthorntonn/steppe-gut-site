// AVIF-first responsive image: <source type="image/avif"> over a WebP <img>
// fallback. Explicit width/height keep layout stable before the file loads;
// everything on the homepage below the hero is lazy by default.
export default function Picture({
  avif,
  webp,
  alt,
  width,
  height,
  className = "",
  imgClassName = "",
  loading = "lazy",
  sizes,
}) {
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={avif} sizes={sizes} />
      <img
        src={webp}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        sizes={sizes}
        className={imgClassName}
      />
    </picture>
  );
}
