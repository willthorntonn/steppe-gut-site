"use client";

import Image from "next/image";
import promptpayLogo from "../../../assets/payment/promptpay.png";

// Payment-brand marks for the checkout replica.
//
// Drawn as small inline SVGs rather than shipped as image files: the official
// artwork for these brands is not in the repo, and these are stand-ins sized
// and coloured to sit where the real marks sit. Swap them for the official
// assets before this page ever goes in front of a customer.
//
// PromptPay is the exception - its official logo is already in the repo
// (also used by FybelleLayout's payment chips), so it's the real mark rather
// than a drawn stand-in.

const BOX = "inline-block shrink-0 rounded-[3px]";

export function VisaMark() {
  return (
    <svg viewBox="0 0 38 24" className={`${BOX} h-6 w-[38px]`} aria-hidden="true">
      <rect width="38" height="24" rx="3" fill="#fff" stroke="#E5E5E5" />
      <text
        x="19"
        y="16.5"
        textAnchor="middle"
        fontFamily="Helvetica, Arial, sans-serif"
        fontSize="10"
        fontWeight="700"
        fontStyle="italic"
        fill="#1A1F71"
        letterSpacing="0.4"
      >
        VISA
      </text>
    </svg>
  );
}

export function MastercardMark() {
  return (
    <svg viewBox="0 0 38 24" className={`${BOX} h-6 w-[38px]`} aria-hidden="true">
      <rect width="38" height="24" rx="3" fill="#fff" stroke="#E5E5E5" />
      <circle cx="15.5" cy="12" r="6.5" fill="#EB001B" />
      <circle cx="22.5" cy="12" r="6.5" fill="#F79E1B" fillOpacity="0.9" />
    </svg>
  );
}

export function AmexMark() {
  return (
    <svg viewBox="0 0 38 24" className={`${BOX} h-6 w-[38px]`} aria-hidden="true">
      <rect width="38" height="24" rx="3" fill="#1F72CD" />
      <text
        x="19"
        y="11"
        textAnchor="middle"
        fontFamily="Helvetica, Arial, sans-serif"
        fontSize="6.5"
        fontWeight="700"
        fill="#fff"
      >
        AMER
      </text>
      <text
        x="19"
        y="18"
        textAnchor="middle"
        fontFamily="Helvetica, Arial, sans-serif"
        fontSize="6.5"
        fontWeight="700"
        fill="#fff"
      >
        EX
      </text>
    </svg>
  );
}

export function PromptPayMark() {
  return (
    <span
      className={`${BOX} relative flex h-6 w-[38px] items-center justify-center border border-[#E5E5E5] bg-white px-1`}
    >
      <Image
        src={promptpayLogo}
        alt=""
        aria-hidden="true"
        fill
        className="object-contain p-[3px]"
      />
    </span>
  );
}

export function ShopPayMark() {
  return (
    <span
      aria-hidden="true"
      className="font-sans text-[17px] font-bold italic tracking-[-0.04em] text-[#5A31F4]"
    >
      shop
    </span>
  );
}

export function PayPalMark() {
  return (
    <span aria-hidden="true" className="font-sans text-[15px] font-bold italic">
      <span className="text-[#253B80]">Pay</span>
      <span className="text-[#179BD7]">Pal</span>
    </span>
  );
}

export function KlarnaMark() {
  return (
    <span
      aria-hidden="true"
      className="rounded-[4px] bg-[#FFB3C7] px-1.5 py-0.5 font-sans text-[11px] font-bold text-black"
    >
      Klarna
    </span>
  );
}

export function TruemedMark() {
  return (
    <span
      aria-hidden="true"
      className="flex h-6 w-8 items-center justify-center rounded-[4px] bg-[#123B36]"
    >
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5">
        <circle cx="8" cy="8" r="7" fill="none" stroke="#fff" strokeWidth="1.3" />
        <path d="M8 1a7 7 0 0 0 0 14" fill="none" stroke="#fff" strokeWidth="1.3" />
        <path d="M1.6 5.5h12.8M1.6 10.5h12.8" stroke="#fff" strokeWidth="1.3" />
      </svg>
    </span>
  );
}

/** The big purple Shop Pay express button. */
export function ShopPayButton() {
  return (
    <button
      type="button"
      className="flex h-[50px] w-full items-center justify-center rounded-[10px] bg-[#5A31F4] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
    >
      <span className="sr-only">Pay with Shop Pay</span>
      <span
        aria-hidden="true"
        className="font-sans text-[21px] font-bold italic tracking-[-0.04em] text-white"
      >
        shop
      </span>
    </button>
  );
}

/** The big yellow PayPal express button. */
export function PayPalButton() {
  return (
    <button
      type="button"
      className="flex h-[50px] w-full items-center justify-center rounded-[10px] bg-[#FFC439] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
    >
      <span className="sr-only">Pay with PayPal</span>
      <span aria-hidden="true" className="font-sans text-[21px] font-bold italic">
        <span className="text-[#253B80]">Pay</span>
        <span className="text-[#179BD7]">Pal</span>
      </span>
    </button>
  );
}

function AppleGlyph() {
  return (
    <svg viewBox="0 0 17 20" className="h-[18px] w-[15px]" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.06 6.87c-.1.08-1.86 1.07-1.86 3.28 0 2.55 2.24 3.46 2.31 3.48-.01.06-.36 1.23-1.19 2.43-.74 1.05-1.51 2.1-2.69 2.1-1.16 0-1.55-.69-2.89-.69-1.32 0-1.78.71-2.85.71-1.15 0-1.96-1.03-2.75-2.08-1.05-1.42-1.94-3.65-1.97-5.8-.02-1.13.22-2.24.79-3.18.79-1.29 2.2-2.16 3.73-2.19 1.13-.02 2.15.75 2.83.75.65 0 1.94-.92 3.34-.79.57.02 2.18.23 3.2 1.72zM11.1 3.35c.58-.68.97-1.63.87-2.6-.83.04-1.85.55-2.45 1.24-.53.6-1 1.58-.87 2.5.9.08 1.86-.46 2.45-1.14z"
      />
    </svg>
  );
}

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 18 18" className="h-[18px] w-[18px]" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.91c1.7-1.57 2.69-3.87 2.69-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.81.54-1.84.86-3.05.86-2.34 0-4.33-1.58-5.04-3.71H.96v2.33A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.96 10.71a5.4 5.4 0 0 1 0-3.42V4.96H.96a9 9 0 0 0 0 8.08l3-2.33Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58A9 9 0 0 0 .96 4.96l3 2.33C4.67 5.16 6.66 3.58 9 3.58Z"
      />
    </svg>
  );
}

/** The Apple Pay express button, white with a black outline and black text. */
export function ApplePayButton() {
  return (
    <button
      type="button"
      className="flex h-[47.6px] w-full items-center justify-center gap-1.5 rounded-[12px] border border-black bg-white text-black transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      <span className="sr-only">Pay with Apple Pay</span>
      <AppleGlyph />
      <span aria-hidden="true" className="font-sans text-[19px] font-medium">
        Pay
      </span>
    </button>
  );
}

/** The Google Pay express button, white with a grey outline. */
export function GooglePayButton() {
  return (
    <button
      type="button"
      className="flex h-[47.6px] w-full items-center justify-center gap-1.5 rounded-[12px] border border-forest/20 bg-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      <span className="sr-only">Pay with Google Pay</span>
      <GoogleGlyph />
      <span aria-hidden="true" className="font-sans text-[19px] font-medium text-[#3C4043]">
        Pay
      </span>
    </button>
  );
}
