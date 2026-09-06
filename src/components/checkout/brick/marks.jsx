// Payment-brand marks for the checkout replica.
//
// Drawn as small inline SVGs rather than shipped as image files: the official
// artwork for these brands is not in the repo, and these are stand-ins sized
// and coloured to sit where the real marks sit. Swap them for the official
// assets before this page ever goes in front of a customer.

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
