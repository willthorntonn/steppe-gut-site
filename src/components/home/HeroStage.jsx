import heroStageRock from "../../hero-stage-rock.png";
import heroProductBox from "../../hero-product-box-graded.png";

// The box is a flat cutout, so it needs a painted contact shadow to read as
// resting on the rock. Units are % of the stage wrapper, so it scales with it.
const BOX_LAYER = { width: "39%", left: "31.2%", bottom: "52.2%" };
const BOX_SHADOW_LAYER = {
  left: "34.25%",
  bottom: "53.4%",
  width: "32.5%",
  height: "4.18%",
  background:
    "radial-gradient(ellipse at center, rgba(24,16,6,0.62) 0%, rgba(24,16,6,0.30) 45%, rgba(24,16,6,0) 72%)",
  filter: "blur(5px)",
};

// Desktop-only: box grows 25% independently of the stump's own 15% growth
// (its footprint is scaled by 1.25/1.15 against the bigger wrapper), and both
// keep their bottom-right corner fixed - width increases while `left`
// shrinks by the same amount, so the box grows toward the top-left from the
// same point on the stump rather than drifting outward from its center.
const DESKTOP_BOX_LAYER = { width: "49.9%", left: "23.75%", bottom: "52.2%" };
const DESKTOP_BOX_SHADOW_LAYER = {
  ...BOX_SHADOW_LAYER,
  left: "28.05%",
  width: "41.57%",
  height: "5.35%",
};

export function HeroStageMobile() {
  return (
    <div className="relative z-0 flex justify-center lg:hidden">
      <div className="animate-scale-in delay-800 relative -mb-[224px] w-[224%] max-w-[1610px] shrink-0 drop-shadow-2xl sm:-mb-[273px] sm:w-[188%]">
        <img
          src={heroStageRock}
          alt=""
          className="h-auto w-full object-contain"
        />
        <div className="absolute" style={BOX_SHADOW_LAYER} />
        <img
          src={heroProductBox}
          alt="Steppe Gut fermented mare's milk box"
          className="animate-scale-in delay-1000 absolute h-auto"
          style={BOX_LAYER}
        />
      </div>
    </div>
  );
}

export function HeroStageDesktop() {
  return (
    <div
      className="animate-scale-in delay-700 pointer-events-none absolute z-0 hidden lg:block"
      style={{
        // Width only - the rock PNG is a true 1:1 square (1024x1024) and
        // the <img> below is sized by its own intrinsic ratio (`w-full
        // h-auto`), so the stage's height already comes out square as a
        // side effect of wrapping that image; giving the wrapper its own
        // independent height (e.g. via `aspectRatio` + `maxHeight`) decouples
        // it from where the rock actually renders and throws off every
        // BOX_LAYER percentage below, which is anchored against this
        // wrapper's box.
        //
        // Sized as a percentage of the hero box itself (the positioning
        // container) rather than the viewport, so it tracks the box's
        // actual rendered width at every desktop size - including past the
        // box's own max-width cap. `78vh` is the safety net for short/wide
        // viewports: since height equals width here, this is what stops the
        // product from growing tall enough to crowd the top of the box.
        width: "min(73.02%, 98.20vh)",
        bottom: "-41.03%",
        right: "-7.85%",
      }}
    >
      <img src={heroStageRock} alt="" className="h-auto w-full object-contain" />
      <div className="absolute" style={DESKTOP_BOX_SHADOW_LAYER} />
      <img
        src={heroProductBox}
        alt=""
        className="animate-scale-in delay-900 absolute h-auto"
        style={DESKTOP_BOX_LAYER}
      />
    </div>
  );
}
