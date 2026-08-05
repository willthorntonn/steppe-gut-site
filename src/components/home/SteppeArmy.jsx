// Box-out. In a print long read this is the ruled sidebar that sits apart
// from the running text, and that is exactly the weight this belongs at: a
// contained aside, not a chapter and not the page's frame.
export default function SteppeArmy() {
  return (
    <section
      id="steppe-army"
      data-navtheme="light"
      className="scroll-mt-24 bg-cream"
    >
      <div className="mx-auto max-w-[1240px] px-5 pb-24 sm:px-8 sm:pb-28 lg:px-10 lg:pb-36">
        <div className="border border-forest/25 bg-forest/[0.03] px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold">
            Sidebar
          </p>

          <h2
            className="mt-6 max-w-[18ch] font-serif font-normal leading-[1.06] tracking-[-0.035em] text-forest"
            style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)" }}
          >
            The Steppe Army
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
            <p
              className="max-w-[54ch] font-serif text-forest/80"
              style={{ fontSize: "clamp(1.02rem, 1.3vw, 1.15rem)", lineHeight: 1.72 }}
            >
              People who drink Steppe Gut every morning are Steppe Soldiers,
              and together they&apos;re the Steppe Army. There&apos;s nothing
              to sign, nothing extra to pay and no tier to reach. You&apos;re
              in from the first morning you start.
            </p>
            <a
              href="#"
              className="w-fit shrink-0 font-sans text-sm uppercase tracking-[0.2em] text-forest underline underline-offset-8 transition-colors hover:text-gold"
            >
              What it stands for
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
