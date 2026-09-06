# Page — Find Your Ritual `/quiz/`

## Summary

A short self-assessment that ends in a format recommendation. The reference site runs an equivalent "gut microbiota quiz" positioned as an expert-built educational tool, and the pattern is a good one — a quiz is the highest-engagement, highest-conversion device available for an unfamiliar product, because it converts a passive read into a decision.

**With one hard constraint:** Steppe Gut's quiz recommends a *format*, never a health outcome. A quiz that asks about symptoms and returns a product is a diagnostic claim, and this brand does not make those.

## Purpose

- **Goals:** conversion, education, product understanding
- **Journey questions:** 1, 7
- **Audience:** interested but undecided, usually between formats
- **Intent:** "Just tell me which one to get"
- **Primary CTA:** the recommended product
- **Secondary CTA:** *See all three* → `/products/`

## Layout

| Property | Value |
|---|---|
| Container | `container-narrow` 520px throughout — a quiz is a single column of attention |
| Background | `cream` |
| Steps | One question per screen, 5 questions |
| Progress | A thin `gold` bar at the top of the card plus "Question 3 of 5" as text |
| Card | `cream-raised`, `radius-lg`, `shadow-md`, `p-8` |
| Transition | Fade + 8px slide, 200 ms; instant under reduced motion |

## Flow

Intro → Q1 … Q5 → Result

---

# Copy

## Intro

> **Eyebrow:** Two minutes
> **H1:** Find your ritual
> **Lead:** Five questions about your mornings, not your health. At the end we will tell you which of the three formats is likely to suit you — and if the answer is "none of them yet", we will say that too.
> **CTA:** Start

**Below the button, in `caption` / `text-tertiary`:**
> This is not a health assessment and we will not ask you about symptoms. It is a way of choosing between a box of sachets, a bottle of capsules and a pouch.

> That disclaimer is placed *before* the quiz starts, not after. It sets the frame and removes any implication that a health judgement is coming.

---

## The five questions

**Q1 — What are your mornings like?**
- I have a routine and I keep it
- Some days yes, some days no
- Every morning is different

**Q2 — How do you feel about the taste of plain yoghurt?**
- Fine, I eat it regularly
- I can take it or leave it
- I would rather not

**Q3 — How often are you away from home?**
- Rarely
- A few times a month
- Constantly

**Q4 — Have you taken a daily supplement before?**
- Yes, and I kept it up
- Yes, and I stopped
- No, this would be the first

**Q5 — How much does packaging waste matter to you?**
- A lot
- Somewhat
- Not much

**Every question is about behaviour, preference or logistics. None is about health, symptoms or the body.** This is the rule that keeps the quiz on the right side of `02_brand_guidelines.md` §6.

---

## Results

Three outcomes, plus one honest fourth.

### Result A — Daily Sachets
> **Heading:** Start with the sachets
> **Body:** Portioned, easy to travel with, and the format most people begin on. Twenty-five mornings is long enough to find out whether the habit sticks before you commit to anything larger.
> **CTA:** See the Daily Sachets → `/products/daily-sachets/`

### Result B — Capsules
> **Heading:** The capsules will suit you better
> **Body:** Same powder, no taste, nothing to mix. If the flavour is the thing standing in the way, this removes it — and they travel better than anything else we make.
> **CTA:** See the Capsules → `/products/capsules/`

### Result C — Refill Pouch
> **Heading:** Go straight to the pouch
> **Body:** You already have the routine and you would rather not add twenty-five wrappers a month to it. One scoop, same as one sachet, about a third of the packaging.
> **CTA:** See the Refill Pouch → `/products/pouch/`

### Result D — Not yet
Returned when Q4 is "yes, and I stopped" **and** Q1 is "every morning is different".

> **Heading:** Maybe not yet
> **Body:** From your answers, a daily supplement is likely to end up in a drawer, and we would rather say so than sell you one. Come back when a morning routine is easier to keep — or read the science first and decide from there.
> **CTA:** Read how it works → `/how-it-works/`
> **Secondary:** See the products anyway → `/products/`

> **Result D is the reason this quiz is worth building.** A quiz that always sells is recognised as a sales funnel; one that occasionally declines is recognised as advice. It will cost a small number of conversions and buy a disproportionate amount of credibility.

---

## Below every result

- One line: "The formula is the same in all three. You can change format at any time."
- `NewsletterSignup variant="inline"`
- `Button ghost` — "Start again"

**No email gate.** The result is shown immediately and unconditionally. Gating a result behind an email address is the single most common way to make a quiz feel like a trick, and it would contradict everything else on this site.

---

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| < 640px | Card full-width at 20px margins. Options full-width, `min-h-[56px]`, stacked, 12px gap |
| ≥ 640px | Card at 520px, centred. Options remain full-width within the card |
| ≥ 1024px | Unchanged. **Do not widen the quiz on desktop** — a single column is the correct form for it at every size |

## Accessibility notes

- One `<h1>` — "Find your ritual" — persisting across all steps. **Question headings are `<h2>`, not `<h1>`**; the page does not become a new document per step
- Each question is a `<fieldset>` with a `<legend>` carrying the question text; options are real `<input type="radio">` with `<label>`, never clickable `<div>`s
- Step changes move focus to the new question's `<legend>` and announce "Question 3 of 5" via `aria-live="polite"`
- Progress is a `<progress>` element or `role="progressbar"` with `aria-valuenow`/`aria-valuemin`/`aria-valuemax`, **plus** the text "Question 3 of 5" — never the bar alone
- Back navigation is available at every step and preserves the previous answer
- Options are ≥ 44px tall and selectable by keyboard with arrow keys within the group
- The result is announced via `aria-live` and focus moves to the result heading
- Under `prefers-reduced-motion`, steps change instantly with no transition

## SEO notes

| Element | Value |
|---|---|
| `<title>` | Find Your Ritual — Which Format Suits You · Steppe Gut |
| Meta description | Five questions about your mornings, not your health, ending in a recommendation between sachets, capsules and the refill pouch. |
| `<h1>` | Find your ritual |
| Robots | Index the intro. **`noindex` on any result-state URL** — thin, duplicative, and not a useful search destination |
| JSON-LD | None. `Quiz` schema is for educational assessments and does not apply |
| Internal links | 3 PDPs, `/products/`, `/how-it-works/` |

## Developer notes

- Route `/quiz/`, lazy-loaded
- **No images.** A quiz with decorative imagery per question is slower and no more persuasive
- State held in component state. **Result state must be reflected in a URL fragment** (`#result-capsules`) so a result survives a refresh and can be shared — but the fragment is `noindex`, and no answers are ever put in a query string
- Scoring logic in `src/data/quiz.js`, kept separate from the component: `{ questions[], scoring(answers) → resultKey }`. It will be tuned after launch and should be editable without touching the UI
- **No answer data is transmitted anywhere** unless analytics consent has been given, and even then only the aggregate result key — never the individual answers
- Reuses `Container`, `Button`, `Field`, `NewsletterSignup`. `QuizFlow` is the only new component
- Build in the final stage. This is a nice-to-have, and it must not delay the pages that carry the education
