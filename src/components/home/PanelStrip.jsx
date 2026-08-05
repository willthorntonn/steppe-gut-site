import { useEffect, useState } from "react";
import { Droplets, FlaskConical, Leaf, Sun } from "lucide-react";
import threeXSachets from "../../sachet-2xcutout.png";
import Picture from "../ui/Picture";
import { useCountUp, useInView } from "../../hooks/useCountUp";
import panelSocialAvif from "../../assets/home/panel-social-proof.avif";
import panelSocialWebp from "../../assets/home/panel-social-proof.webp";

const PANEL1_DECOR = threeXSachets;

const CAROUSEL_CARDS = [
  {
    Icon: FlaskConical,
    circle: "bg-forest",
    text: "Backed by fermentation science and gut research",
  },
  {
    Icon: Leaf,
    circle: "bg-gold",
    text: "Pure ingredients sourced from the Mongolian steppe",
  },
  {
    Icon: Droplets,
    circle: "bg-forest",
    text: "Fermented mare's milk for daily gut health",
  },
  {
    Icon: Sun,
    circle: "bg-gold",
    text: "Whole-body radiance, starting in the gut",
  },
];

// This click-to-navigate dot-indicator carousel pattern is reused (adapted
// for product cards) by ProductCarousel.
function CardCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setActive((index) => (index + 1) % CAROUSEL_CARDS.length),
      3500
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex h-full flex-col justify-between gap-6">
      <div className="relative min-h-[110px] sm:min-h-[130px]">
        {CAROUSEL_CARDS.map(({ Icon, circle, text }, index) => (
          <div
            key={text}
            className={`flex flex-col gap-3 transition-all duration-500 ease-out sm:gap-4 ${
              index === active
                ? "translate-y-0 opacity-100"
                : "absolute inset-0 translate-y-4 opacity-0"
            }`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full sm:h-12 sm:w-12 ${circle}`}
            >
              <Icon size={20} strokeWidth={1.5} className="text-cream" />
            </div>
            <p className="font-sans text-sm font-normal leading-[1.2] tracking-[-0.03em] text-forest/80 sm:text-base lg:text-lg">
              {text}
            </p>
          </div>
        ))}
      </div>

      {/* The visible indicator stays a 2px bar; the button around it is padded
          out to a 44px touch target. -my-5 keeps that padding from adding
          height to the panel. */}
      <div className="-my-5 flex items-center gap-1.5">
        {CAROUSEL_CARDS.map((card, index) => (
          <button
            key={card.text}
            type="button"
            aria-label={`Show card ${index + 1}`}
            aria-current={index === active}
            onClick={() => setActive(index)}
            className="group flex h-11 flex-1 items-center"
          >
            <span
              className={`h-0.5 w-full rounded-full transition-colors duration-300 ${
                index === active ? "bg-forest" : "bg-forest/20"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function PanelStrip() {
  const [statRef, statInView] = useInView(0.35);
  const statCount = useCountUp(14, statInView);

  return (
    <div
      data-navtheme="light"
      className="relative z-10 grid grid-cols-1 md:auto-rows-fr md:grid-cols-3"
    >
      <div className="animate-fade-up delay-900 relative min-h-[220px] overflow-hidden bg-cream p-6 sm:p-8 lg:min-h-[260px] lg:p-10">
        {/* Narrower now the columns are equal thirds, so the decor sachet is
            scaled down and only appears once there's room for it at 1395. */}
        <img
          src={PANEL1_DECOR}
          alt=""
          className="pointer-events-none absolute -right-6 bottom-0 hidden h-auto w-[190px] drop-shadow-2xl 1395:block 1395:bottom-auto 1395:top-1/2 1395:-translate-y-1/2"
        />
        <div className="relative flex h-full flex-col justify-between gap-8 overflow-hidden">
          <p className="max-w-[350px] font-serif text-2xl font-normal leading-[1.1] tracking-[-0.05em] text-forest sm:text-[28px] lg:text-[35px]">
            Natural radiance, one sachet at a time.
          </p>
          <a
            href="#"
            className="w-fit font-sans text-base font-normal tracking-[-0.03em] text-black underline underline-offset-2 transition-opacity hover:opacity-70 lg:text-lg"
          >
            Learn More
          </a>
        </div>
      </div>

      <div className="animate-fade-up delay-1000 min-h-[220px] bg-white p-6 sm:p-8 lg:min-h-[260px]">
        <CardCarousel />
      </div>

      {/* Side by side while the panel is full width (mobile) and again once
          the column is wide enough at xl. In between, the equal-thirds column
          is too narrow for both, so the image sits above the stat. */}
      <div
        ref={statRef}
        className="animate-fade-up delay-1100 flex min-h-[220px] items-center gap-5 bg-forest p-6 sm:gap-6 sm:p-8 md:flex-col md:items-start md:justify-center md:gap-4 lg:min-h-[260px] lg:p-10 xl:flex-row xl:items-center xl:gap-7"
      >
        <Picture
          avif={panelSocialAvif}
          webp={panelSocialWebp}
          alt="Steppe Gut supplements"
          width={208}
          height={142}
          className="shrink-0"
          imgClassName="h-[82px] w-[120px] rounded-lg object-cover sm:h-[104px] sm:w-[150px] md:h-[76px] md:w-[110px] xl:h-[112px] xl:w-[160px]"
        />
        <div className="flex min-w-0 flex-col gap-1.5">
          <span className="font-sans text-2xl font-normal tracking-[-0.05em] text-cream sm:text-3xl lg:text-[35px]">
            +{statCount.toLocaleString()}K
          </span>
          <p className="max-w-[240px] font-sans text-sm font-normal leading-[1.2] text-cream/60 sm:text-base lg:text-lg">
            People drinking Steppe Gut daily
          </p>
        </div>
      </div>
    </div>
  );
}
