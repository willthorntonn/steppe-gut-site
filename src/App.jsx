import { useEffect, useState } from "react";
import heroBgBokeh from "./hero-bg-bokeh.png";
import heroStageRock from "./hero-stage-rock.png";
import heroProductBox from "./hero-product-box-graded.png";
import threeXSachets from "./sachet-2xcutout.png";
import {
  ArrowUpRight,
  CornerUpLeft,
  Droplets,
  FlaskConical,
  Leaf,
  Menu,
  Search,
  ShoppingBag,
  Sun,
  X,
} from "lucide-react";

const BG_IMAGE = heroBgBokeh;
const AVATAR =
  "https://polo-pecan-73837341.figma.site/_assets/v11/ca8093996e970200cbcf8bde8744175e52da5a79.png";
const CAPSULE_INLINE =
  "https://polo-pecan-73837341.figma.site/_assets/v11/6a7de4fbe9c9e2315040607320a9ff5e93117bf4.png";
const PANEL1_DECOR = threeXSachets;
const PANEL3_PRODUCT =
  "https://polo-pecan-73837341.figma.site/_assets/v11/30e8f38d1f993c357a3be2721557fc899d5640fc.png";

const NAV_LINKS = ["About", "Products", "Promotions", "Contact"];

// The box is a flat cutout, so it needs a painted contact shadow to read as
// resting on the rock. Units are % of the stage wrapper, so it scales with it.
const BOX_LAYER = { width: "42%", left: "29.7%", bottom: "52.2%" };
const BOX_SHADOW_LAYER = {
  left: "33%",
  bottom: "53.4%",
  width: "35%",
  height: "4.5%",
  background:
    "radial-gradient(ellipse at center, rgba(24,16,6,0.62) 0%, rgba(24,16,6,0.30) 45%, rgba(24,16,6,0) 72%)",
  filter: "blur(5px)",
};

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
    text: "Fermented mare's milk for deep gut nourishment",
  },
  {
    Icon: Sun,
    circle: "bg-gold",
    text: "Nourishing daily radiance, from the inside out",
  },
];

function Word({ delay, dim = false, children }) {
  return (
    <span className="animate-word-reveal">
      <span className={`${delay} ${dim ? "text-cream/45" : "text-cream"}`}>
        {children}
      </span>
    </span>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="animate-fade-in relative z-20 flex items-center justify-between px-5 py-4 sm:px-8 lg:px-10 lg:py-5">
      <a
        href="#"
        className="animate-slide-left delay-200 font-serif text-[30px] font-semibold tracking-[-0.05em] text-cream"
      >
        Steppe Gut
      </a>

      <div className="animate-fade-in delay-400 hidden items-center gap-6 md:flex lg:gap-10">
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            className="font-sans text-[18px] font-semibold text-cream/90 transition-colors hover:text-cream"
          >
            {link}
          </a>
        ))}
      </div>

      <div className="animate-slide-right delay-300 flex items-center gap-3 sm:gap-4 lg:gap-5">
        <button
          type="button"
          aria-label="Search"
          className="text-cream transition-colors hover:text-cream/70"
        >
          <Search size={20} strokeWidth={1.5} />
        </button>
        <button
          type="button"
          aria-label="Shopping bag"
          className="text-cream transition-colors hover:text-cream/70"
        >
          <ShoppingBag size={20} strokeWidth={1.5} />
        </button>
        <button
          type="button"
          aria-label="Returns"
          className="text-cream transition-colors hover:text-cream/70"
        >
          <CornerUpLeft size={20} strokeWidth={1.5} />
        </button>
        <img
          src={AVATAR}
          alt="Account"
          className="h-8 w-8 rounded-full object-cover lg:h-10 lg:w-10"
        />
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
          className="relative z-40 text-cream md:hidden"
        >
          {menuOpen ? (
            <X size={24} strokeWidth={1.5} />
          ) : (
            <Menu size={24} strokeWidth={1.5} />
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-8 bg-forest/90 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              onClick={() => setMenuOpen(false)}
              className="font-sans text-2xl font-semibold text-cream"
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative z-10 flex flex-1 flex-col justify-center px-5 py-10 sm:px-8 lg:px-10">
      <h1 className="font-serif text-[48px] font-normal leading-[50px] tracking-[-0.05em] sm:text-[80px] sm:leading-[72px] md:text-[110px] md:leading-[95px] lg:text-[130px] lg:leading-[110px] xl:text-[155px] xl:leading-[125px]">
        <span className="block">
          <Word delay="delay-300">The</Word> <Word delay="delay-400">Radiance</Word>{" "}
          <Word delay="delay-500" dim>
            of
          </Word>
        </span>
        <span className="block">
          <Word delay="delay-600" dim>
            Nature
          </Word>{" "}
          <Word delay="delay-700" dim>
            in
          </Word>{" "}
          <Word delay="delay-800">Every</Word>
        </span>
        <span className="block">
          <Word delay="delay-900">Capsule</Word>
          <img
            src={CAPSULE_INLINE}
            alt=""
            className="animate-scale-in delay-1000 ml-2 hidden w-auto align-middle sm:inline-block lg:ml-4"
            style={{ height: "clamp(60px, 10vw, 160px)" }}
          />
        </span>
      </h1>

      <div className="animate-fade-up delay-600 mt-8 flex flex-col gap-5 sm:mt-12 sm:flex-row sm:items-center sm:gap-8 lg:mt-[75px] lg:gap-[50px]">
        <button
          type="button"
          className="flex h-14 w-full items-center justify-center gap-2 rounded-md bg-forest font-sans text-base font-semibold tracking-[-0.03em] text-cream transition-colors hover:bg-forest/85 sm:h-16 sm:w-[240px] sm:text-lg md:w-[280px] md:text-xl lg:h-[72px] lg:w-[310px] lg:text-2xl"
        >
          Explore Now
          <ArrowUpRight size={22} strokeWidth={1.5} />
        </button>
        <p className="max-w-[310px] font-sans text-sm font-normal leading-[1.45] tracking-[-0.03em] text-cream sm:text-base lg:text-lg">
          Nourish your gut with fermented mare's milk, restoring natural
          radiance from within.
        </p>
      </div>
    </section>
  );
}

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

      <div className="flex items-center gap-1.5">
        {CAROUSEL_CARDS.map((card, index) => (
          <button
            key={card.text}
            type="button"
            aria-label={`Show card ${index + 1}`}
            onClick={() => setActive(index)}
            className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${
              index === active ? "bg-forest" : "bg-forest/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function PanelStrip() {
  return (
    <div className="relative z-10 grid grid-cols-1 md:grid-cols-[2fr_1fr_2fr]">
      <div className="animate-fade-up delay-900 relative overflow-hidden bg-cream p-6 sm:p-8 lg:p-10">
        <img
          src={PANEL1_DECOR}
          alt=""
          className="pointer-events-none absolute -bottom-2 -right-4 h-[72%] w-auto mix-blend-multiply"
        />
        <div className="relative flex h-full flex-col justify-between gap-8">
          <p className="max-w-[350px] font-serif text-2xl font-normal leading-[1.1] tracking-[-0.05em] text-forest sm:text-[28px] lg:text-[35px]">
            Start your personal path to natural radiance
          </p>
          <a
            href="#"
            className="w-fit font-sans text-base font-normal tracking-[-0.03em] text-forest underline underline-offset-2 transition-opacity hover:opacity-70 lg:text-lg"
          >
            Learn More
          </a>
        </div>
      </div>

      <div className="animate-fade-up delay-1000 bg-cream p-6 sm:p-8">
        <CardCarousel />
      </div>

      <div className="animate-fade-up delay-1100 flex items-center gap-5 bg-forest p-6 sm:gap-6 sm:p-8 lg:gap-8 lg:p-10">
        <img
          src={PANEL3_PRODUCT}
          alt="Steppe Gut supplements"
          className="h-[82px] w-[120px] shrink-0 rounded-lg object-cover sm:h-[110px] sm:w-[160px] lg:h-[142px] lg:w-[208px]"
        />
        <div className="flex flex-col gap-1.5">
          <span className="font-sans text-2xl font-normal tracking-[-0.05em] text-cream sm:text-3xl lg:text-[35px]">
            +14K
          </span>
          <p className="max-w-[240px] font-sans text-sm font-normal leading-[1.2] text-cream/60 sm:text-base lg:text-lg">
            Women embracing natural radiance from within
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div
      className="relative flex min-h-screen flex-col overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${BG_IMAGE}')` }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 100% 0%, rgba(24,16,6,0.55) 0%, rgba(24,16,6,0.28) 40%, rgba(24,16,6,0) 70%)",
        }}
      />
      <Navbar />
      <Hero />

      <div className="relative z-0 flex justify-center lg:hidden">
        <div className="animate-scale-in delay-800 relative -mb-[160px] w-[160%] max-w-[1150px] shrink-0 drop-shadow-2xl sm:-mb-[195px] sm:w-[134%]">
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

      <PanelStrip />

      <div
        className="animate-scale-in delay-700 pointer-events-none absolute z-0 hidden lg:block"
        style={{
          // The stage is square, so the box's top edge tracks its width:
          // boxTop = stageBottom - 0.889 * width. The 1024px cap keeps a gap
          // under the navbar on ultrawide screens; the right cap stops the
          // box itself from being clipped off the viewport.
          width: "clamp(530px, 71vw, 1024px)",
          bottom: "-6%",
          right: "clamp(-280px, -17.8vw, -89px)",
        }}
      >
        <img src={heroStageRock} alt="" className="h-auto w-full object-contain" />
        <div className="absolute" style={BOX_SHADOW_LAYER} />
        <img
          src={heroProductBox}
          alt=""
          className="animate-scale-in delay-900 absolute h-auto"
          style={BOX_LAYER}
        />
      </div>
    </div>
  );
}
