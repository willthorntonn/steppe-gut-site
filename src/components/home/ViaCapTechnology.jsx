import { useEffect, useRef, useState } from "react";
import { useCountUp, useInView } from "../../hooks/useCountUp";

// Fermentation technology panel. Choreography (translateY 60 container,
// capsule slide from up-left, per-letter eyebrow stagger, count-up) kept;
// copy and imagery treatment are Steppe Gut's own, grounded in the same
// fermentation facts used in the origin sections.
//   desktop — heading + stat card on the left; capsule centred on the right
//             with two annotations flanking it, solid connectors drawing
//             toward the capsule on scroll-in.
//   mobile  — text column on the left, large capsule floating on the right,
//             solid rules (dot on the tip) extending above each label.
const CREAM = "#FCFCF7";
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const SANS = '"Inter", system-ui, sans-serif';

const OUTER_TITLE = "The fermented base";
const OUTER_BODY =
  "Mare's milk, cultured the traditional way, breaks down during fermentation. Proteins and lactose become smaller, more digestible forms your gut already knows how to use.";
const INNER_TITLE = "What makes it through intact";
const INNER_BODY =
  "Naturally present vitamin C, omega-3, lactoferrin and lysozyme all stay active through the process. They reach your gut intact, which is the one place they need to be.";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );
  useEffect(() => {
    const m = window.matchMedia(query);
    const on = () => setMatches(m.matches);
    on();
    m.addEventListener("change", on);
    // Fallback: some environments don't dispatch matchMedia change on
    // programmatic viewport changes, so re-evaluate on resize too.
    window.addEventListener("resize", on);
    return () => {
      m.removeEventListener("change", on);
      window.removeEventListener("resize", on);
    };
  }, [query]);
  return matches;
}

function StaggeredLabel({ text, inView }) {
  return (
    <span aria-label={text}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          aria-hidden
          style={{ opacity: inView ? 1 : 0, transition: `opacity 350ms ease ${i * 45}ms` }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

// Solid rule (optional dot on the tip) that grows from `anchor` to `grow`
// length when scrolled into view.
function AnimatedLine({
  dot = false,
  anchor = "left",
  grow = "100%",
  delay = 0,
  className = "",
}) {
  const [ref, inView] = useInView(0.8);
  return (
    <div ref={ref} className={`relative h-2 ${className}`}>
      <div
        className="absolute top-1/2 -translate-y-1/2"
        style={{
          [anchor]: 0,
          width: inView ? grow : "0px",
          height: "1px",
          background: CREAM,
          transition: `width 1000ms ${EASE} ${delay}ms`,
        }}
      >
        {dot && (
          <span
            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
            style={{ background: CREAM, [anchor === "left" ? "right" : "left"]: "-4px" }}
          />
        )}
      </div>
    </div>
  );
}

function Eyebrow({ inView }) {
  return (
    <p
      className="flex items-center gap-2.5 text-[13px] uppercase tracking-[0.2em]"
      style={{ color: CREAM, fontFamily: SANS }}
    >
      <span
        aria-hidden
        className="inline-block h-2 w-2 rounded-full"
        style={{ background: CREAM, opacity: inView ? 1 : 0, transition: "opacity 350ms ease" }}
      />
      <StaggeredLabel text="FERMENTATION TECHNOLOGY" inView={inView} />
    </p>
  );
}

function Heading({ className = "" }) {
  return (
    <h2
      className={`tracking-[-0.02em] ${className}`}
      style={{ color: CREAM, fontFamily: SANS, fontWeight: 350 }}
    >
      Fermented mare's milk does what synthetic vitamins can't.
    </h2>
  );
}

function Annotation({ title, body }) {
  return (
    <div>
      <h3
        className="text-[13px] font-medium uppercase tracking-[0.03em]"
        style={{ color: CREAM, fontFamily: SANS }}
      >
        {title}
      </h3>
      <p
        className="mt-3 text-[14px] leading-[1.5]"
        style={{ color: CREAM, fontFamily: SANS, fontWeight: 350 }}
      >
        {body}
      </p>
    </div>
  );
}

// Absolutely-positioned capsule video that slides in from up-left on reveal.
// mix-blend-screen drops the video's dark background (the .mp4 has no alpha).
function CapsuleStage({ videoRef, inView, className = "", style, offset = 60 }) {
  const base = style.transform || "";
  return (
    <div
      className={`pointer-events-none absolute ${className}`}
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? base : `${base} translate(-${offset}px, -${offset}px)`.trim(),
        transition: `transform 1000ms ${EASE} 150ms, opacity 700ms ${EASE} 150ms`,
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="h-full w-full object-contain mix-blend-screen"
        style={{ filter: "brightness(2.5) saturate(0)" }}
        aria-label="A two-part capsule opening to release fine ivory Steppe Gut powder"
      >
        <source src="/viacap/capsule.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

function StatCard({ innerRef, inView, count, className = "" }) {
  return (
    <div
      ref={innerRef}
      className={`rounded-[22px] border p-5 sm:p-6 ${className}`}
      style={{
        borderColor: "rgba(252,252,247,0.3)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 700ms ${EASE}, transform 700ms ${EASE}`,
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <p
          className="max-w-[380px] text-[clamp(1.1rem,1.6vw,1.4rem)] leading-[1.35]"
          style={{ color: CREAM, fontFamily: SANS, fontWeight: 350 }}
        >
          <span
            className="mr-2.5 inline-block whitespace-nowrap rounded-full border px-3 py-0.5 align-[0.12em] text-[13px]"
            style={{ borderColor: "rgba(252,252,247,0.5)" }}
          >
            SG&#8209;01
          </span>
          Delivered by Fermentation°
        </p>
        <span
          className="text-[clamp(2.6rem,4vw,3.6rem)] leading-none tabular-nums"
          style={{ color: CREAM, fontFamily: SANS, fontWeight: 350 }}
        >
          {count}
        </span>
      </div>
    </div>
  );
}

function Lacto() {
  return (
    <p className="mt-5 text-[13px]" style={{ color: CREAM, fontFamily: SANS, fontWeight: 350 }}>
      °Naturally occurring in fermented mare's milk
    </p>
  );
}

function MobileLayout({ panelInView, cardRef, cardInView, count, videoRef }) {
  const label = "text-[13px] font-medium uppercase tracking-[0.03em]";
  const body = "mt-4 text-[14px] leading-[1.5]";
  return (
    <div>
      <Eyebrow inView={panelInView} />
      <Heading className="mt-8 text-[clamp(1.9rem,7vw,2.5rem)] leading-[1.12]" />

      <div className="relative mt-16 min-h-[440px]">
        <div className="w-[56%]">
          <AnimatedLine dot grow="100%" />
          <h3 className={`mt-6 ${label}`} style={{ color: CREAM, fontFamily: SANS }}>
            {OUTER_TITLE}
          </h3>
          <p className={body} style={{ color: CREAM, fontFamily: SANS, fontWeight: 350 }}>
            {OUTER_BODY}
          </p>

          <AnimatedLine dot grow="100%" delay={150} className="mt-14" />
          <h3 className={`mt-6 ${label}`} style={{ color: CREAM, fontFamily: SANS }}>
            {INNER_TITLE}
          </h3>
          <p className={body} style={{ color: CREAM, fontFamily: SANS, fontWeight: 350 }}>
            {INNER_BODY}
          </p>
        </div>

        <CapsuleStage
          videoRef={videoRef}
          inView={panelInView}
          className="top-1/2"
          style={{
            left: "80%",
            width: "clamp(320px, 118vw, 540px)",
            height: "clamp(320px, 118vw, 540px)",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      <StatCard innerRef={cardRef} inView={cardInView} count={count} className="mt-12" />
      <Lacto />
    </div>
  );
}

function DesktopLayout({ panelInView, cardRef, cardInView, count, videoRef }) {
  return (
    <div className="grid grid-cols-[minmax(0,44%)_minmax(0,56%)] gap-12">
      <div className="flex flex-col">
        <Eyebrow inView={panelInView} />
        <Heading className="mt-8 max-w-[520px] text-[clamp(2.1rem,3vw,3rem)] leading-[1.12]" />
        <StatCard
          innerRef={cardRef}
          inView={cardInView}
          count={count}
          className="mt-10 max-w-[500px]"
        />
        <Lacto />
      </div>

      <div className="relative min-h-[560px]">
        {/* Capsule sized well clear of the annotation columns on either side
            (~34% wide each) so its connector lines never cross the pill. */}
        <CapsuleStage
          videoRef={videoRef}
          inView={panelInView}
          className="left-1/2 top-1/2"
          style={{
            width: "clamp(280px, 26vw, 380px)",
            height: "clamp(280px, 26vw, 380px)",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div className="absolute left-0 top-2 w-[34%]">
          <Annotation title={OUTER_TITLE} body={OUTER_BODY} />
          <AnimatedLine dot grow="55%" className="mt-5" />
        </div>
        <div className="absolute bottom-2 right-0 w-[34%]">
          <AnimatedLine dot anchor="right" grow="55%" delay={150} className="mb-5" />
          <Annotation title={INNER_TITLE} body={INNER_BODY} />
        </div>
      </div>
    </div>
  );
}

export default function ViaCapTechnology() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [panelRef, panelInView] = useInView(0.15);
  const [cardRef, cardInView] = useInView(0.55);
  const count = useCountUp(18, cardInView, 1400);
  const videoRef = useRef(null);

  useEffect(() => {
    if (panelInView) videoRef.current?.play().catch(() => {});
  }, [panelInView]);

  const props = { panelInView, cardRef, cardInView, count, videoRef };

  return (
    <section
      id="fermentation-technology"
      data-navtheme="dark"
      className="relative overflow-hidden px-2 py-2 sm:px-3 sm:py-3"
      style={{
        backgroundImage: "url(/viacap/viacapbg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        ref={panelRef}
        className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[28px] px-6 py-11 sm:px-10 sm:py-14 lg:px-14 lg:py-16"
        style={{
          background: "rgba(46, 72, 34, 0.38)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
        }}
      >
        <div
          style={{
            transform: panelInView ? "translateY(0)" : "translateY(60px)",
            transition: `transform 900ms ${EASE}`,
          }}
        >
          {isDesktop ? <DesktopLayout {...props} /> : <MobileLayout {...props} />}
        </div>
      </div>
    </section>
  );
}
