import PullQuote from "./PullQuote";

// One chapter of the long read. Three-column asymmetric grid: a sticky folio
// rail, the reading measure held to ~66ch, and an open right margin so the
// text block sits left of centre the way a print column does.
//
// Chapters are always on cream. Forest is reserved for the plates between
// them, which is what makes the nav theme alternate down the page.
export default function Chapter({ id, numeral, folio, title, body, pullQuote }) {
  const [first, ...rest] = body;

  return (
    <article
      id={id}
      data-navtheme="light"
      className="scroll-mt-24 bg-cream"
    >
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[6rem_minmax(0,66ch)_1fr] lg:gap-x-14 lg:px-10 lg:py-32">
        <header className="mb-10 flex items-baseline gap-4 lg:sticky lg:top-28 lg:mb-0 lg:h-fit lg:flex-col lg:items-start lg:gap-3">
          <span className="font-serif text-3xl leading-none text-gold lg:text-4xl">
            {numeral}
          </span>
          <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-forest/45">
            {folio}
          </span>
        </header>

        <div>
          <h2
            className="max-w-[19ch] font-serif font-normal leading-[1.02] tracking-[-0.04em] text-forest"
            style={{
              fontSize: "clamp(2rem, 4.6vw, 3.6rem)",
              // Stops short titles dropping a single orphaned word onto line 2.
              textWrap: "balance",
            }}
          >
            {title}
          </h2>

          <p className="mt-10 font-serif text-forest/85 first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-[4.2rem] first-letter:leading-[0.74] first-letter:text-gold sm:first-letter:mr-4 sm:first-letter:text-[5rem]"
            style={{ fontSize: "clamp(1.06rem, 1.35vw, 1.2rem)", lineHeight: 1.72 }}
          >
            {first}
          </p>

          {pullQuote && <PullQuote>{pullQuote}</PullQuote>}

          {rest.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="mt-7 font-serif text-forest/85"
              style={{ fontSize: "clamp(1.06rem, 1.35vw, 1.2rem)", lineHeight: 1.72 }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
