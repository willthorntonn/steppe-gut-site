"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { useCart } from "../../cart/CartProvider";
import { flyToCart } from "../../cart/flyToCart";

import applepayLogo from "../../assets/payment/applepay.png";
import googlepayLogo from "../../assets/payment/googlepay.png";
import mastercardLogo from "../../assets/payment/mastercard.png";
import promptpayLogo from "../../assets/payment/promptpay.png";
import truemoneyLogo from "../../assets/payment/truemoney.png";
import visaLogo from "../../assets/payment/visa.png";
import { PAYMENT_METHODS } from "../../data/payments";
import { MARKETING_PRICE_BY_SLUG } from "../../data/products";

// ---------------------------------------------------------------------------
// Main product layout extracted from the structure of
// https://fybellebeauty.com/products/led-light-therapy-face-mask (a Shopify
// Dawn "main-product" section): sticky media column on the left, info column
// on the right holding review count, title, sub-description, benefit list,
// price block with a save badge, urgency strip with countdown, quantity +
// add-to-cart, payment row, accordions and two short review quotes.
// This product ships as a single SKU (250 g pouch), so there is no variant
// picker - the price block sits directly under the benefit list.
//
// ISOLATION CONTRACT - read before editing:
//   * Every rule in FYBELLE_CSS below is prefixed with `.sg-fyb`, so nothing
//     here can select an element outside this component's root <div>. The site
//     nav, footer and the rest of the product template are untouched by it.
//   * `all: initial` on the root plus explicit resets inside mean the site's
//     global styles and Tailwind preflight do not bleed *in* either.
//   * No Tailwind classes are used in this file on purpose - it is a
//     self-contained block, not part of the site's design system.
//   * Images are deliberately plain-text placeholders. Nothing is generated,
//     downloaded or rendered.
// ---------------------------------------------------------------------------

// No variant picker on this page - each of the three formats gets its own
// route and its own instance of this layout, keyed by product.slug below.
// Marketing price/was/save are shared placeholders defined once in
// data/products.js (MARKETING_PRICE_BY_SLUG) so this page and the products
// grid card cannot drift apart.
const PRICE_BY_SLUG = MARKETING_PRICE_BY_SLUG;

const PACK_NOUN_BY_SLUG = {
  "sachet-bag": "pouch",
  "sachet-box": "box",
  "pill-bottle": "bottle",
};

const THUMBS_BY_SLUG = {
  "sachet-bag": ["Pouch, front", "Pouch, back panel", "Scoop + powder", "In water"],
  "sachet-box": ["Box, front", "Box, open", "Sachet + powder", "In water"],
  "pill-bottle": ["Bottle, front", "Bottle, cap off", "Capsules", "In hand"],
};

const HOW_TO_USE_INTRO_BY_SLUG = {
  "sachet-bag": "One level scoop, once a day, at the same time each day. Consistency matters more than the hour",
  "sachet-box": "One sachet, once a day, at the same time each day. Consistency matters more than the hour",
  "pill-bottle": "Three capsules, once a day, at the same time each day. Consistency matters more than the hour",
};

const IN_THE_PACK_BY_SLUG = {
  "sachet-bag": [
    "1 × 250 g resealable pouch",
    "1 × 10 g measuring scoop",
    "1 × folded how-to-take card",
  ],
  "sachet-box": [
    "1 × box of 25 individually sealed 10 g sachets",
    "1 × folded how-to-take card",
  ],
  "pill-bottle": [
    "1 × bottle of 90 capsules",
    "1 × folded how-to-take card",
  ],
};

const INGREDIENT_ROW_BY_SLUG = {
  "sachet-bag": "100% fermented mare’s milk powder",
  "sachet-box": "100% fermented mare’s milk powder",
  "pill-bottle": "Fermented mare’s milk powder, encapsulated",
};

// Tuesday 2026-11-10, 09:00 Thailand time (UTC+7) - roughly 80 days out.
const COUNTDOWN_TARGET = new Date("2026-11-10T09:00:00+07:00").getTime();

function getCountdownParts(now) {
  const diff = Math.max(0, COUNTDOWN_TARGET - now);
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return [
    { value: pad(days), unit: "d" },
    { value: pad(hours), unit: "h" },
    { value: pad(minutes), unit: "m" },
    { value: pad(seconds), unit: "s" },
  ];
}

// The four compositional bullets already live per-product in products.js
// (format-specific line, then three shared lines). A fifth, pack-level line
// is appended here so the list matches the original five-item shape.
function getBenefits(product) {
  return [
    ...product.bullets,
    `${product.servings} servings per ${PACK_NOUN_BY_SLUG[product.slug]}`,
  ];
}

function getAccordions(product) {
  const packNoun = PACK_NOUN_BY_SLUG[product.slug];
  return [
    {
      id: "how-to-use",
      title: "How to Use",
      body: (
        <>
          <p>{HOW_TO_USE_INTRO_BY_SLUG[product.slug]}</p>
          <p>
            <strong>How to use:</strong>
          </p>
          <ol>
            {product.howToTake.map((step) => (
              <li key={step.title}>{step.body}</li>
            ))}
          </ol>
        </>
      ),
    },
    {
      id: "specification",
      title: "Specification",
      body: (
        <dl>
          <div>
            <dt>Format:</dt>
            <dd>{product.formatLong}</dd>
          </div>
          <div>
            <dt>Servings:</dt>
            <dd>
              {product.servings} × {product.servingSize}
            </dd>
          </div>
          <div>
            <dt>Ingredient:</dt>
            <dd>{INGREDIENT_ROW_BY_SLUG[product.slug]}</dd>
          </div>
          <div>
            <dt>Fermentation:</dt>
            <dd>Four days, own cultures, then low-temperature dried</dd>
          </div>
          <div>
            <dt>Origin:</dt>
            <dd>Töv Province, Mongolia · milked June to October</dd>
          </div>
          <div>
            <dt>Storage:</dt>
            <dd>Cool, dry, out of direct sunlight. No refrigeration needed</dd>
          </div>
        </dl>
      ),
    },
    {
      id: "in-the-box",
      title: `What's in the ${packNoun}`,
      body: (
        <ul>
          {IN_THE_PACK_BY_SLUG[product.slug].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ),
    },
    {
      id: "contraindications",
      title: "Contraindications",
      body: (
        <>
          <p>
            <strong>{product.allergen}.</strong> Fermentation breaks down most
            of the lactose, but not all of it. If you react to yoghurt, you
            may react to this
          </p>
          <p>
            <strong>Speak to your doctor first</strong> if you are pregnant,
            planning to become pregnant, or breastfeeding. We are not able to
            advise on this
          </p>
          <p>
            This product is a dietary supplement and is not intended to
            diagnose, treat, cure or prevent any disease
          </p>
        </>
      ),
    },
  ];
}

// Each logo is pre-normalised to a 288x180 canvas (the chip's 1.6 aspect) with
// its own brand background baked in and the mark optically scaled, so the row
// reads as one set despite the sources having wildly different framing. Badges
// that shipped with their own border (Apple Pay, Google Pay, PromptPay) had it
// stripped during that pass - the chip supplies the border instead.
const LOGO_BY_ID = {
  visa: visaLogo,
  promptpay: promptpayLogo,
  applepay: applepayLogo,
  googlepay: googlepayLogo,
  truemoney: truemoneyLogo,
  mastercard: mastercardLogo,
};

const PAYMENTS = PAYMENT_METHODS.map((m) => ({
  ...m,
  src: LOGO_BY_ID[m.id],
}));

const FYBELLE_CSS = `
.sg-fyb {
  all: initial;
  display: block;
  box-sizing: border-box;
  width: 100%;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #2F3E2F;
  background: #ffffff;
  -webkit-font-smoothing: antialiased;
}
.sg-fyb *, .sg-fyb *::before, .sg-fyb *::after { box-sizing: border-box; }
.sg-fyb p, .sg-fyb h1, .sg-fyb h2, .sg-fyb h3, .sg-fyb ul, .sg-fyb ol,
.sg-fyb dl, .sg-fyb dd, .sg-fyb figure { margin: 0; padding: 0; }
.sg-fyb ul, .sg-fyb ol { list-style: none; }
.sg-fyb button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; }

.sg-fyb__wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 20px 64px;
  display: grid;
  /* minmax(0, ...) not plain 1fr: a 1fr track keeps an auto minimum, so the
     thumbnail strip's min-content would push the column past the viewport
     instead of scrolling inside itself. */
  grid-template-columns: minmax(0, 1fr);
  gap: 32px;
}
@media (min-width: 900px) {
  .sg-fyb__wrap { grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); gap: 56px; padding: 28px 24px 88px; }
}

/* ---- media column ---------------------------------------------------- */
.sg-fyb__media { align-self: start; min-width: 0; }
@media (min-width: 900px) { .sg-fyb__media { position: sticky; top: 24px; } }

.sg-fyb__stage {
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;
  border: 1px dashed #c9c6bf;
  border-radius: 12px;
  background: #f6f4f0;
  color: #6a655c;
  font-size: 14px;
  letter-spacing: 0.02em;
}
.sg-fyb__thumbs { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; margin-top: 12px; }
.sg-fyb button.sg-fyb__thumb {
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 6px;
  font-size: 11px;
  line-height: 1.25;
  color: #6a655c;
  border: 1px solid #d3cfc3;
  border-radius: 14px;
  background: #faf9f6;
  box-shadow: 0 1px 3px rgba(28, 28, 28, 0.06);
  transition: border-color .15s ease, box-shadow .15s ease;
}
.sg-fyb button.sg-fyb__thumb[aria-current="true"] { border-color: #2F3E2F; border-width: 2px; color: #2F3E2F; box-shadow: 0 2px 6px rgba(28, 28, 28, 0.1); }

/* ---- info column ----------------------------------------------------- */
.sg-fyb__info > * + * { margin-top: 24px; }
.sg-fyb__reviews { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #6a6f5f; }
.sg-fyb__stars { color: #D4AF37; letter-spacing: 2px; }
h1.sg-fyb__title {
  font-family: "EB Garamond", Georgia, serif;
  font-size: 32px;
  line-height: 1.15;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: #2F3E2F;
  margin-top: 20px;
}
@media (min-width: 900px) { .sg-fyb__title { font-size: 40px; } }
p.sg-fyb__lede { font-size: 16px; line-height: 1.6; color: #4a5245; margin-top: 18px; margin-bottom: 0; }
ul.sg-fyb__benefits { display: grid; gap: 12px; font-size: 17px; margin-top: 14px; }
.sg-fyb__benefits li { display: flex; gap: 10px; align-items: flex-start; }
.sg-fyb__tick {
  flex: 0 0 auto;
  width: 21px; height: 21px;
  border-radius: 50%;
  background: #3F5A38;
  color: #ffffff;
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 13px; line-height: 1;
  margin-top: 2px;
}

.sg-fyb__label { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: #6a6f5f; }

.sg-fyb__price {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 12px;
  padding: 20px 0;
  border-top: 1px solid #dcd6c8;
  border-bottom: 1px solid #dcd6c8;
  margin: 22px 0;
}
.sg-fyb__price-now { font-family: "EB Garamond", Georgia, serif; font-size: 28px; font-weight: 600; color: #2F3E2F; }
.sg-fyb__price-was { font-size: 17px; color: #948d7c; text-decoration: line-through; }
.sg-fyb__save {
  align-self: center;
  font-size: 12px; font-weight: 700; letter-spacing: 0.05em;
  padding: 5px 10px; border-radius: 8px; background: #C0392B; color: #F5F1E9;
}

.sg-fyb__urgency { margin-top: 13px; }
.sg-fyb__urgency-top { display: flex; align-items: center; gap: 10px; font-size: 17px; font-weight: 400; color: #2F3E2F; }
.sg-fyb__urgency-top strong { font-weight: 700; }
.sg-fyb__dot {
  position: relative;
  width: 13px; height: 13px; border-radius: 50%; flex: 0 0 auto;
  border: 2px solid #C0392B;
  animation: sg-fyb-pulse 1.8s ease-in-out infinite;
}
.sg-fyb__dot::after {
  content: "";
  position: absolute;
  top: 50%; left: 50%;
  width: 5px; height: 5px;
  border-radius: 50%;
  background: #C0392B;
  transform: translate(-50%, -50%);
}
@keyframes sg-fyb-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
.sg-fyb__urgency-sub { font-size: 16px; color: #2F3E2F; margin-top: 6px; }
.sg-fyb__timer-box {
  margin-top: 12px;
  padding: 10px 12px 11px;
  background: #f4f2ee;
  border-top: 1px solid #dcd6c8;
  border-bottom: 1px solid #dcd6c8;
}
.sg-fyb__timer-label {
  margin: 0;
  text-align: center;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #2F3E2F;
}
.sg-fyb__timer {
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 8px;
  margin-top: 6px;
  font-variant-numeric: tabular-nums;
}
.sg-fyb__timer-unit { display: flex; align-items: baseline; gap: 3px; }
.sg-fyb__timer-unit strong {
  font-family: "EB Garamond", Georgia, serif;
  font-size: 25px; line-height: 1; font-weight: 600; color: #2F3E2F;
}
.sg-fyb__timer-unit span { font-size: 12px; font-weight: 500; color: #6a6f5f; }
.sg-fyb__timer-sep { font-family: "EB Garamond", Georgia, serif; font-size: 19px; color: #a9a498; }

.sg-fyb__buy { display: flex; flex-direction: column; gap: 12px; align-items: stretch; margin-top: 22px; }
.sg-fyb button.sg-fyb__atc {
  width: 100%;
  min-height: 62px;
  border-radius: 8px;
  background: #2F3E2F;
  color: #F5F1E9;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: background-color .15s ease;
}
.sg-fyb button.sg-fyb__atc:hover { background: #263226; }

.sg-fyb__pay { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 22px; justify-content: center; }
.sg-fyb__pay-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  aspect-ratio: 1.6;
  padding: 6px 8px;
  border-radius: 8px;
  border: 1px solid rgba(28, 28, 28, 0.12);
  overflow: hidden;
  background: #ffffff;
  box-sizing: border-box;
}
.sg-fyb__pay-badge--applepay { border-color: #000000; }
.sg-fyb__pay-badge img {
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
}

/* ---- accordions ------------------------------------------------------ */
.sg-fyb__acc { border-top: 1px solid #dcd6c8; margin-top: 28px; }
.sg-fyb__acc-item { border-bottom: 1px solid #dcd6c8; }
.sg-fyb button.sg-fyb__acc-btn {
  width: 100%; display: flex; justify-content: space-between; align-items: center;
  gap: 16px; padding: 18px 0; font-size: 19px; font-weight: 700; text-align: left; color: #2F3E2F;
}
.sg-fyb__acc-sign {
  flex: 0 0 auto; width: 18px; height: 18px; color: #2F3E2F;
  transition: transform .2s ease;
}
.sg-fyb__acc-sign--open { transform: rotate(180deg); }
.sg-fyb__acc-panel { padding: 0 0 20px; font-size: 14.5px; font-weight: 400; color: #4a5245; }
.sg-fyb__acc-panel > * + * { margin-top: 10px; }
.sg-fyb__acc-panel ol { list-style: decimal; padding-left: 20px; }
.sg-fyb__acc-panel ol li, .sg-fyb__acc-panel ul li { margin-top: 6px; }
.sg-fyb__acc-panel ul { list-style: disc; padding-left: 20px; }
.sg-fyb__acc-panel dl > div { display: flex; gap: 8px; padding: 5px 0; border-bottom: 1px solid #f0ede2; }
.sg-fyb__acc-panel dt { font-weight: 600; flex: 0 0 40%; }

/* ---- entrance --------------------------------------------------------
   The same load-in the homepage uses (index.css: fadeUp / slideInLeft /
   slideInRight, 0.8s cubic-bezier(0.16, 1, 0.3, 1), stepped delays): media
   column in from the left, info column stepping up underneath it.

   Written as local keyframes rather than the site's .animate-* utilities
   because this block deliberately uses no Tailwind and no global CSS - see
   the ISOLATION CONTRACT at the top of this file.

   Purely decorative: every element is already in its final position, so the
   universal reduced-motion rule in index.css (animation-duration: 1ms) lands
   them visible rather than stuck at opacity 0. */
@keyframes sg-fyb-rise {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: none; }
}
@keyframes sg-fyb-in-left {
  from { opacity: 0; transform: translateX(-32px); }
  to { opacity: 1; transform: none; }
}

.sg-fyb__stage { animation: sg-fyb-in-left .8s cubic-bezier(0.16, 1, 0.3, 1) both; }
.sg-fyb button.sg-fyb__thumb { animation: sg-fyb-rise .7s cubic-bezier(0.16, 1, 0.3, 1) both; }
.sg-fyb button.sg-fyb__thumb:nth-child(1) { animation-delay: .18s; }
.sg-fyb button.sg-fyb__thumb:nth-child(2) { animation-delay: .24s; }
.sg-fyb button.sg-fyb__thumb:nth-child(3) { animation-delay: .30s; }
.sg-fyb button.sg-fyb__thumb:nth-child(4) { animation-delay: .36s; }

/* One step per block down the info column - reviews, title, lede, benefits,
   price, urgency, buy, payment row, accordions. */
.sg-fyb__info > * { animation: sg-fyb-rise .7s cubic-bezier(0.16, 1, 0.3, 1) both; }
.sg-fyb__info > *:nth-child(1) { animation-delay: .10s; }
.sg-fyb__info > *:nth-child(2) { animation-delay: .17s; }
.sg-fyb__info > *:nth-child(3) { animation-delay: .24s; }
.sg-fyb__info > *:nth-child(4) { animation-delay: .31s; }
.sg-fyb__info > *:nth-child(5) { animation-delay: .38s; }
.sg-fyb__info > *:nth-child(6) { animation-delay: .45s; }
.sg-fyb__info > *:nth-child(7) { animation-delay: .52s; }
.sg-fyb__info > *:nth-child(8) { animation-delay: .59s; }
.sg-fyb__info > *:nth-child(9) { animation-delay: .66s; }

/* Add-to-cart lifts on hover, matching the homepage cards' 450ms ease-out. */
.sg-fyb button.sg-fyb__atc {
  transition: background-color .15s ease, transform .45s cubic-bezier(0, 0, 0.2, 1), box-shadow .45s cubic-bezier(0, 0, 0.2, 1);
}
.sg-fyb button.sg-fyb__atc:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 34px -18px rgba(38, 50, 38, 0.55);
}
.sg-fyb__pay-badge { transition: transform .3s cubic-bezier(0, 0, 0.2, 1); }
.sg-fyb__pay-badge:hover { transform: translateY(-3px); }

@media (prefers-reduced-motion: reduce) {
  .sg-fyb * { transition: none !important; }
}
`;

export default function FybelleLayout({ product }) {
  // Closed on load - an accordion that opens itself before the visitor has
  // asked a question reads as broken, not helpful.
  const [openId, setOpenId] = useState(null);
  const [activeThumb, setActiveThumb] = useState(0);
  const [countdown, setCountdown] = useState(() => getCountdownParts(Date.now()));
  const { add } = useCart();
  const atcRef = useRef(null);

  const handleAddToCart = () => {
    // The basket is the source of truth, so it is updated first and
    // unconditionally - flyToCart() is decoration and returns false without
    // complaint when it cannot run (reduced motion, no basket in the DOM).
    add(product.slug, 1, product.name);
    // Same asset the nav mega-menu uses for this SKU.
    flyToCart(atcRef.current, product.thumb.webp);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setCountdown(getCountdownParts(Date.now()));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const price = PRICE_BY_SLUG[product.slug];
  const thumbs = THUMBS_BY_SLUG[product.slug];
  const benefits = getBenefits(product);
  const accordions = getAccordions(product);

  return (
    <div className="sg-fyb">
      {/* Scoped stylesheet. Every selector is under `.sg-fyb`, so it cannot
          reach the nav, the footer, or anything else on the page. */}
      <style>{FYBELLE_CSS}</style>

      <div className="sg-fyb__wrap">
        {/* ------------------------------ media ------------------------- */}
        <div className="sg-fyb__media">
          <div className="sg-fyb__stage">
            [ PRODUCT IMAGE PLACEHOLDER: {product.name}, {product.format},
            front three-quarter view ]
          </div>
          <div className="sg-fyb__thumbs">
            {thumbs.map((label, index) => (
              <button
                key={label}
                type="button"
                className="sg-fyb__thumb"
                aria-current={index === activeThumb ? "true" : undefined}
                onClick={() => setActiveThumb(index)}
              >
                [{label}]
              </button>
            ))}
          </div>
        </div>

        {/* ------------------------------ info -------------------------- */}
        <div className="sg-fyb__info">
          <div className="sg-fyb__reviews">
            <span className="sg-fyb__stars" aria-hidden="true">
              ★★★★★
            </span>
            <span>124 reviews</span>
          </div>

          <h1 className="sg-fyb__title">{product.name}</h1>

          <p className="sg-fyb__lede">{product.paragraph}</p>

          <ul className="sg-fyb__benefits">
            {benefits.map((item) => (
              <li key={item}>
                <span className="sg-fyb__tick" aria-hidden="true">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>


          <div className="sg-fyb__price">
            <span className="sg-fyb__price-now">{price.price}</span>
            <span className="sg-fyb__price-was">{price.was}</span>
            <span className="sg-fyb__save">{price.save}</span>
          </div>

          <div className="sg-fyb__urgency">
            <p className="sg-fyb__urgency-top">
              <span className="sg-fyb__dot" aria-hidden="true" />
              Live: <strong>Launch day discount!</strong>
            </p>
            <p className="sg-fyb__urgency-sub">
              Limited time: for the first 100 customers
            </p>
            <div className="sg-fyb__timer-box">
              <p className="sg-fyb__timer-label">Offer ends in</p>
              <div className="sg-fyb__timer">
                {countdown.map((part, index) => (
                  <Fragment key={part.unit}>
                    {index > 0 && (
                      <span className="sg-fyb__timer-sep" aria-hidden="true">
                        :
                      </span>
                    )}
                    <span className="sg-fyb__timer-unit">
                      {/* Server-rendered now, so the seconds the server saw
                          and the seconds the browser sees differ by the
                          transfer time. The interval above corrects it a
                          beat later; this stops React reporting the
                          difference as a hydration mismatch. */}
                      <strong suppressHydrationWarning>{part.value}</strong>
                      <span>{part.unit}</span>
                    </span>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="sg-fyb__buy">
            <button
              type="button"
              ref={atcRef}
              className="sg-fyb__atc"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>

          <div className="sg-fyb__pay">
            {PAYMENTS.map((method) => (
              <span
                key={method.id}
                className={`sg-fyb__pay-badge${
                  method.id === "applepay" ? " sg-fyb__pay-badge--applepay" : ""
                }`}
              >
                <img src={method.src} alt={method.label} loading="lazy" />
              </span>
            ))}
          </div>

          <div className="sg-fyb__acc">
            {accordions.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id} className="sg-fyb__acc-item">
                  <button
                    type="button"
                    className="sg-fyb__acc-btn"
                    aria-expanded={isOpen}
                    aria-controls={`sg-fyb-panel-${item.id}`}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                  >
                    {item.title}
                    <svg
                      className={`sg-fyb__acc-sign${isOpen ? " sg-fyb__acc-sign--open" : ""}`}
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {isOpen && (
                    <div
                      id={`sg-fyb-panel-${item.id}`}
                      className="sg-fyb__acc-panel"
                    >
                      {item.body}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
