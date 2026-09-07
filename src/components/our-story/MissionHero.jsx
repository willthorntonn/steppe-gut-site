import { useEffect, useRef, useState } from "react";
import Container from "../ui/Container";
import ImagePlaceholder from "../ui/ImagePlaceholder";

// The /our-story/mission/ opening plate. It lands inset - sitting inside the
// normal page gutters as a rounded card - and then, over the first stretch of
// scroll, widens until it is flush with both edges of the viewport and its
// corners have squared off. The image itself never changes; only the frame
// around it opens up.
//
// The effect is scroll-position mapped rather than animated: progress is a
// pure function of scrollY, so scrolling back up closes the plate again and
// there is nothing to play or replay. That also means prefers-reduced-motion
// needs no special case - nothing moves unless the reader moves it.

// Scroll distance, in px, over which the plate goes from inset to full bleed.
const TRAVEL = 420;

// Corner radius at rest. Matches the rounded-3xl the other mission plates use.
const RADIUS = 24;

// How far the bottom edge lifts at its centre once the plate is fully open.
// The arch is cut inwards - the edge rises into the picture, leaving a vault
// of cream beneath it - so this is a bite out of the image, not a bulge. It
// runs the full width of the plate, so this depth is the only thing setting
// how taut the curve reads: shallower is wider and flatter.
const ARCH = 88;

// How far the arch runs past the plate on each side, as a multiple of the
// half-width. Above 1 the ellipse's two ends fall outside the frame and are
// clipped by the plate's edges, so the curve leaves the picture at the sides
// rather than turning back up to meet the bottom corners.
const ARCH_SPREAD = 1.4;

// Where the title block sits inside that vault, as a share of the arch's
// depth. Nothing sits in the top of the arch: the label is pulled up into the
// mouth of it, with the curve clearing the type rather than grazing it.
const ARCH_FILL = 0.8;

// Gap between the plate and the title while there is no arch to sit in. It
// fades out as the vault opens and takes over the job of spacing.
const BASE_GAP = 36;

export default function MissionHero({
  brief,
  src,
  alt,
  ratio,
  imgStyle,
  children,
}) {
  // Measures the inset plate; its own width never changes, so the gutter can
  // be derived from it on every resize without feeding back into itself.
  const plateRef = useRef(null);
  const [gutter, setGutter] = useState(0);
  const [plateWidth, setPlateWidth] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const measure = () => {
      const plate = plateRef.current;
      if (!plate) return;
      const rect = plate.getBoundingClientRect();
      if (!plate.offsetWidth) return;
      // The site renders under `html { zoom: 0.85 }`, so a rect (visual px)
      // and offsetWidth (layout px) are on different scales. Dividing by the
      // ratio between them puts the gutter back in the layout px that the
      // margins below are written in - and leaves the maths correct if the
      // zoom is ever changed or dropped.
      const scale = rect.width / plate.offsetWidth;
      // The wrapper keeps the container's width whatever the plate inside it
      // does, so its left edge is a stable measure of the gutter.
      setGutter(Math.max(0, rect.left / scale));
      setPlateWidth(plate.offsetWidth);
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setProgress(Math.min(1, Math.max(0, window.scrollY / TRAVEL)));
      });
    };

    measure();
    onScroll();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Ease-out, so the plate opens quickly off the first flick of the wheel and
  // settles into the edges rather than arriving at them at full speed.
  const eased = 1 - (1 - progress) ** 2;
  const bleed = Math.round(gutter * eased);

  // A plain rounded card at rest, squaring off as it opens.
  const openWidth = plateWidth + 2 * gutter;
  const radius = RADIUS * (1 - eased);

  // The arch itself. A concave edge is not something border-radius can
  // describe - a radius can only round a corner outwards - so it is cut with a
  // mask instead: one ellipse, as wide as the plate and ARCH deep, sitting on
  // the bottom edge and erasing what falls inside it. The two hard-adjacent
  // stops give a clean edge with just enough softness to antialias.
  const archV = ARCH * eased;
  const archRx = (openWidth / 2) * ARCH_SPREAD;
  const mask =
    archV > 0.5
      ? `radial-gradient(ellipse ${archRx}px ${archV}px at 50% 100%, transparent 0, transparent 99.4%, #000 99.7%)`
      : undefined;

  return (
    <Container width="wide">
      <div ref={plateRef}>
        <ImagePlaceholder
          description={brief}
          src={src}
          alt={alt}
          ratio={ratio}
          rounded=""
          className="will-change-[margin,mask-image]"
          imgStyle={imgStyle}
          style={{
            // ImagePlaceholder sets w-full, and an element with an explicit
            // width ignores a negative right margin - it slides sideways
            // instead of widening. Auto width is what lets the pair of
            // negative margins actually open the plate out.
            width: "auto",
            marginLeft: -bleed,
            marginRight: -bleed,
            borderRadius: radius,
            maskImage: mask,
            WebkitMaskImage: mask,
            maskRepeat: "no-repeat",
          }}
        />

        {/* Pulled up into the vault the arch leaves behind. The plate's box is
            unchanged by the mask - the cut is paint-only - so without this the
            title would sit a whole arch's depth clear of the picture. */}
        <div style={{ marginTop: BASE_GAP * (1 - eased) - archV * ARCH_FILL }}>
          {children}
        </div>
      </div>
    </Container>
  );
}
