import { Link } from "react-router-dom";
import { useCountUp, useInView } from "../../hooks/useCountUp";
import { useAuth } from "../../auth/AuthProvider";

// Supporter counter, sitting directly under the hero. Everyone who drinks
// Steppe Gut is a Steppe Soldier; the bar tracks the Steppe Army against a
// 10,000 goal.
//
// SUPPORTERS is the one place the live figure is set. Point it at real data
// when there's an endpoint to read from; nothing else needs to change.
const SUPPORTERS = 6432;
const GOAL = 10000;

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const CTA_CLASS =
  "inline-flex h-14 w-full shrink-0 items-center justify-center rounded-2xl border border-forest bg-forest px-8 text-center font-sans text-[21px] font-bold tracking-[-0.02em] text-cream transition-colors hover:bg-cream hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:w-auto lg:h-16 lg:px-11 lg:text-[26px]";

export default function SteppeArmyProgress() {
  const { user, openAuthModal } = useAuth();
  const [ref, inView] = useInView(0.3);
  const count = useCountUp(SUPPORTERS, inView, 1800);
  const pct = Math.min((SUPPORTERS / GOAL) * 100, 100);
  const remaining = Math.max(GOAL - SUPPORTERS, 0);

  return (
    <section
      id="steppe-army"
      data-navtheme="light"
      className="scroll-mt-28 bg-cream"
    >
      <div
        ref={ref}
        className="mx-auto max-w-[2000px] px-6 pb-8 pt-8 sm:px-10 sm:pb-10 sm:pt-10 lg:px-14 lg:pb-12 lg:pt-12"
      >
        {/* Ran between two hairline rules until the home page dropped its
            dividers; the padding stays so the block keeps its own breathing
            room now that nothing draws its edges. */}
        <div className="py-10 sm:py-12 lg:py-14">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div className="min-w-0">
              <h2
                className="max-w-[20ch] font-serif font-normal leading-[1.04] tracking-[-0.04em] text-forest"
                style={{ fontSize: "clamp(2.45rem, 5.2vw, 4.9rem)" }}
              >
                Ten thousand Steppe Soldiers
              </h2>
              <p
                className="mt-5 max-w-[46ch] font-sans text-forest/75"
                style={{ fontSize: "clamp(1.2rem, 1.6vw, 1.5rem)", lineHeight: 1.65 }}
              >
                {user
                  ? "You're one of them. Bring a friend and you both save 15%"
                  : "10,000 Steppe Soldiers. Will you join them?"}
              </p>
            </div>

            {/* Signed out: opens the onboarding modal (components/auth/
                AuthModal). Signed in: the visitor is already a Steppe Soldier,
                so the button turns into the referral prompt and points at the
                recruit section of their account. */}
            {user ? (
              <Link to="/account/settings/#recruit" className={CTA_CLASS}>
                Recruit a friend for 15% off
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal("create")}
                className={CTA_CLASS}
              >
                Become a Steppe Soldier
              </button>
            )}
          </div>

          <div className="mt-10 lg:mt-12">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <p className="font-serif tabular-nums text-forest">
                <span
                  className="tracking-[-0.03em]"
                  style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", lineHeight: 1 }}
                >
                  {count.toLocaleString("en-GB")}
                </span>
                <span className="ml-3 font-sans text-sm uppercase tracking-[0.26em] text-forest/55 lg:text-base">
                  Steppe Soldiers
                </span>
              </p>
              <p className="font-sans text-sm uppercase tracking-[0.26em] text-forest/55 lg:text-base">
                Goal {GOAL.toLocaleString("en-GB")}
              </p>
            </div>

            <div
              role="progressbar"
              aria-valuenow={SUPPORTERS}
              aria-valuemin={0}
              aria-valuemax={GOAL}
              aria-label={`${SUPPORTERS.toLocaleString("en-GB")} of ${GOAL.toLocaleString("en-GB")} Steppe Soldiers`}
              className="mt-6 h-2.5 w-full overflow-hidden rounded-full bg-forest/12"
            >
              <div
                className="h-full rounded-full bg-forest"
                style={{
                  width: inView ? `${pct}%` : "0%",
                  transition: `width 1800ms ${EASE}`,
                }}
              />
            </div>

            <p className="mt-5 font-sans text-sm uppercase tracking-[0.26em] text-forest/45 lg:text-base">
              {remaining.toLocaleString("en-GB")} places left
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
