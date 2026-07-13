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

function HorseMark({ className }) {
  return (
    <svg
      viewBox="0 0 293 280"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <g transform="translate(0.000000,280.000000) scale(0.100000,-0.100000)">
        <path d="M1450 2670 l-25 -31 -103 12 c-80 10 -127 10 -207 1 -103 -11 -263
-46 -278 -61 -4 -4 27 -19 69 -33 75 -26 76 -26 107 -8 45 26 130 47 212 54
l70 5 -73 -19 c-82 -22 -179 -70 -212 -105 l-22 -23 -34 20 c-18 11 -57 26
-85 33 -62 17 -118 54 -152 102 -22 31 -27 34 -33 19 -4 -10 -2 -53 3 -98 l9
-80 -50 -25 c-50 -25 -123 -94 -251 -238 -55 -61 -64 -76 -45 -70 56 16 110
49 198 120 92 74 142 105 192 120 15 4 3 -9 -30 -31 -30 -20 -107 -90 -170
-154 -84 -86 -125 -121 -154 -130 -54 -17 -156 -6 -222 24 -30 14 -54 21 -54
16 0 -21 108 -113 169 -143 56 -27 76 -32 141 -32 41 0 93 4 115 8 l40 9 -42
-40 c-24 -21 -43 -43 -43 -48 0 -5 7 -33 14 -62 l15 -54 -115 -256 c-133 -297
-148 -324 -206 -378 l-43 -40 0 -94 0 -95 49 -60 c27 -33 62 -84 79 -113 40
-72 64 -86 128 -78 41 6 55 3 78 -14 34 -23 78 -26 124 -6 48 20 67 47 96 138
l27 83 187 150 187 150 68 2 c37 0 87 8 111 17 58 21 57 22 74 -21 53 -136 61
-348 17 -488 -30 -96 -90 -207 -150 -283 -28 -34 -47 -62 -43 -62 25 0 117 67
170 123 145 156 182 289 159 582 l-8 100 42 104 c54 134 63 226 32 348 -11 44
-31 105 -44 134 l-23 54 -6 -130 c-7 -157 -26 -211 -100 -280 -109 -102 -251
-122 -339 -49 -44 38 -42 89 9 190 22 43 39 80 37 81 -1 1 -33 -25 -71 -58
-101 -87 -150 -117 -233 -141 -69 -20 -81 -37 -26 -38 52 0 153 -41 195 -79
l43 -38 -27 -36 c-15 -19 -62 -66 -104 -104 -167 -147 -182 -164 -231 -262
-28 -56 -57 -101 -72 -110 l-25 -16 20 30 c10 17 39 64 62 105 36 63 43 83 43
129 0 30 -3 51 -7 47 -5 -4 -42 -55 -83 -114 -111 -158 -177 -196 -204 -118
-9 23 -5 31 26 64 59 61 71 102 47 155 -26 58 -98 52 -152 -12 -32 -38 -33
-61 -7 -120 38 -83 18 -76 -56 20 -41 53 -44 62 -44 117 0 57 3 63 45 113 25
29 66 96 91 148 177 362 236 491 250 545 9 34 26 84 40 111 19 41 32 54 71 72
67 30 157 101 291 227 94 89 117 106 141 104 38 -3 58 15 73 65 12 40 32 63
150 172 l54 50 -29 -115 c-33 -132 -48 -157 -118 -199 -27 -17 -47 -36 -44
-41 3 -6 24 -13 46 -16 54 -9 37 -24 -35 -31 -31 -3 -53 -9 -49 -13 4 -5 58
-28 119 -52 241 -97 440 -272 546 -483 57 -113 80 -210 85 -360 8 -237 -30
-391 -169 -674 -111 -228 -132 -310 -108 -424 13 -62 24 -67 34 -13 11 60 76
175 132 236 30 32 106 97 168 144 124 94 168 138 223 223 79 124 114 259 115
447 0 149 15 111 25 -64 6 -130 -10 -239 -52 -342 -47 -116 -158 -243 -284
-327 -85 -56 -40 -48 93 17 259 127 402 276 462 478 19 63 24 199 11 269 l-8
40 22 -35 c32 -52 69 -155 85 -239 8 -41 16 -76 18 -78 10 -10 28 71 33 147
17 249 -146 525 -396 672 -55 33 -52 34 20 9 170 -58 355 -203 431 -338 40
-71 49 -51 19 45 -57 186 -215 348 -458 471 -96 48 -211 88 -303 106 l-65 12
65 7 c187 22 412 -80 618 -278 39 -38 72 -66 72 -61 0 18 -120 174 -190 245
-184 188 -415 313 -639 345 -84 13 -85 13 -31 15 119 4 228 -12 314 -46 40
-16 4 16 -57 50 -92 51 -209 87 -312 96 l-90 7 120 1 c111 2 168 -6 330 -43
l30 -7 -25 22 c-40 34 -168 95 -260 125 -69 22 -112 29 -225 34 -113 5 -132 8
-97 15 23 4 40 11 38 15 -3 4 -41 16 -85 26 l-80 18 -3 39 -3 38 -25 -30z
m358 -744 c151 -116 258 -274 297 -439 8 -34 15 -110 15 -168 0 -125 -22 -226
-74 -333 -52 -107 -68 -122 -41 -41 38 118 48 200 43 351 -4 123 -9 150 -38
236 -67 201 -184 350 -390 501 -14 10 10 0 53 -22 43 -23 104 -61 135 -85z
m519 -598 c-3 -8 -6 -5 -6 6 -1 11 2 17 5 13 3 -3 4 -12 1 -19z" />
      </g>
    </svg>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="animate-fade-in relative z-20 flex items-center justify-between px-5 py-4 sm:px-8 lg:px-10 lg:py-5">
      <a
        href="#"
        className="animate-slide-left delay-200 flex items-center gap-2.5 font-serif text-[30px] font-semibold tracking-[-0.05em] text-cream"
      >
        <HorseMark className="h-[30px] w-auto shrink-0 text-cream" />
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
      <h1 className="font-serif text-[43.2px] font-normal leading-[45px] tracking-[-0.05em] sm:text-[72px] sm:leading-[64.8px] md:text-[99px] md:leading-[85.5px] lg:text-[117px] lg:leading-[99px] xl:text-[139.5px] xl:leading-[112.5px]">
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
          <Word delay="delay-800">Full</Word>
        </span>
        <span className="block">
          <Word delay="delay-900">Bloom</Word>
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
      <div className="animate-fade-up delay-900 relative bg-[#ece7da] p-6 sm:p-8 lg:p-10">
        <img
          src={PANEL1_DECOR}
          alt=""
          className="pointer-events-none absolute bottom-0 right-0 w-[242px] h-auto hidden drop-shadow-2xl 1395:block 1395:bottom-auto 1395:top-1/2 1395:-translate-y-1/2"
        />
        <div className="relative flex h-full flex-col justify-between gap-8 overflow-hidden">
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
            People who've made Steppe Gut part of their morning
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
