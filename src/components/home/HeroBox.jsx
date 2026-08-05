import heroBgBokeh from "../../hero-bg-bokeh.png";
import Hero from "./Hero";
import { HeroStageMobile, HeroStageDesktop } from "./HeroStage";

// The page opens on a boxed hero: one rounded, inset container holding the
// whole opening statement, with the page background visible around it on all
// four sides. The hero's own content is unchanged — it has simply been moved
// off the full-bleed viewport and into the box.
//
// Two nav themes are declared here on purpose. The cream gutter is what sits
// under the nav at rest, so the nav reads forest-on-cream before any scroll;
// once the box itself passes under the bar, the inner dark theme wins (Nav
// samples the last matching ancestor) and the pills flip back to cream.
export default function HeroBox() {
  return (
    <section
      data-navtheme="light"
      className="bg-cream px-3 pb-3 pt-[96px] sm:px-5 sm:pb-4 sm:pt-[108px] lg:px-6 lg:pb-5 lg:pt-[174px]"
    >
      {/* Capped at the same 1600px measure as every other section, rather
          than the box's own full-bleed default: past that width the box's
          height was already pinned near its own min-height ceiling, so an
          uncapped box on an ultra-wide screen turned into a long shallow
          strip with a dead gap between the copy and the stage. Sharing one
          container width site-wide also keeps the hero's edges lined up
          with the sections below it instead of over- or under-hanging them. */}
      <div
        data-navtheme="dark"
        className="relative mx-auto flex min-h-[595px] max-w-[2000px] flex-col justify-center overflow-hidden rounded-[20px] bg-forest bg-cover bg-center bg-no-repeat sm:min-h-[680px] sm:rounded-[26px] lg:min-h-[min(918px,calc(100vh-120px))] lg:rounded-[32px]"
        style={{ backgroundImage: `url('${heroBgBokeh}')` }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 100% 0%, rgba(24,16,6,0.55) 0%, rgba(24,16,6,0.28) 40%, rgba(24,16,6,0) 70%)",
          }}
        />
        <Hero />
        <HeroStageMobile />
        <HeroStageDesktop />
      </div>
    </section>
  );
}
