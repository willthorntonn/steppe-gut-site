# Page — How It Works `/how-it-works/`

## Summary

The single mechanism page. Everything else on the site links here when the visitor asks "but why would this do anything?". It is deliberately one page rather than a section on five pages, so there is one canonical explanation and one URL to link to.

The reference site maintains a dedicated single-mechanism page of exactly this kind (its "increases bacteria in the gut" page), reached from the homepage, every product page and the science hub. That convergence is the point: **a category-education brand needs one page that is allowed to be the answer.**

## Purpose

- **Website goals served:** education, trust, product understanding
- **Journey questions:** 2 (why does it exist?), 5 (how does it work?), 6 (why different?)
- **Audience:** the interested sceptic. Has read the product page, is not yet persuaded, wants the argument rather than the pitch
- **User intent:** "Explain the actual mechanism to me, honestly"
- **Primary CTA:** *See the products* → `/products/`
- **Secondary CTA:** *Read the fermentation detail* → `/the-science/fermentation/`

## Layout specification

| Property | Value |
|---|---|
| Background | `cream` |
| Header | `PageHeader align="center"` |
| Body | `container-prose` 680px for narrative; `container-content` 940px for figures and steps |
| Rhythm | `section-gap`; `section-gap-lg` before the closing CTA |
| Reading time | Target 5 minutes. This page is allowed to be long |

## Section order and rationale

The page is structured as a single argument in four moves, then its own rebuttal.

| # | Section | Move |
|---|---|---|
| 1 | Header | Frames the question honestly |
| 2 | The starting material | Establishes that mare's milk is materially unusual — the argument fails without this |
| 3 | What fermentation does | The mechanism, in four steps |
| 4 | What that means for you | The consequence, stated carefully |
| 5 | Why drying preserves it | Closes the obvious hole ("surely drying destroys it?") |
| 6 | The daily part | Explains why consistency matters more than dose |
| 7 | Honest limits | The rebuttal — the page argues against itself |
| 8 | Read further | Routes to the four science articles |
| 9 | Closing CTA | The ask |

---

# Sections

## 1. Page header

> **Eyebrow:** Mechanism
> **Title (h1):** How it works
> **Lead:** A fair question about any supplement is *why would this do anything at all?* This page is our answer. It is longer than a product description and shorter than a paper, and where the evidence runs out we say so.

## 2. The starting material

**Component:** `MediaTextRow`, image left, then a `StatBand`

> **Eyebrow:** One — the milk
> **Heading:** Mare's milk is not a substitute for cow's milk
> **Body:**
> It is a different material. Mare's milk carries roughly a third of the fat of cow's milk, considerably more lactose, and a protein balance weighted toward whey rather than casein — which is why it does not curdle into a solid the way cow's milk does. It is also, unusually for a dairy, a meaningful source of vitamin C, and it contains several times the lysozyme.
>
> None of that is a claim about health. It is a description of the raw material, and it is the reason mare's milk was worth fermenting in the first place rather than simply drinking.

**StatBand (`sage-tint`, 3 stats):** *Values to be confirmed against the finished composition data before publication.*

| Value | Label |
|---|---|
| ~1% | fat, against roughly 3.5% in cow's milk |
| ~6.2% | lactose, higher than cow's milk |
| whey-dominant | protein profile, closer to human milk than to cow's |

### IMAGE PLACEHOLDER — S-1

**Purpose:** Show mare's milk as a physical substance with its own character — thin, pale, not creamy.
**Aspect ratio:** 3:2 · **Display size:** 1200 × 800 · **Loading:** lazy
**Save to:** `src/assets/science/mares-milk.{avif,webp}`
**Suggested composition:** Milk being poured from a steel pail into a shallow ceramic bowl, mid-pour, thin stream. Subject centre-left; right third quiet.
**Alt text:** `Thin pale mare's milk being poured from a steel pail into a ceramic bowl.`

```
higgsfield generate create gpt_image_2 \
  --prompt "close editorial photograph of thin pale mare's milk being poured in a slender stream from a dented steel pail into a shallow hand-thrown forest-green ceramic bowl, the milk visibly thinner and less creamy than dairy milk, caught mid-pour with a few droplets breaking off, cool overcast north light from a doorway on the left with the right third of the frame falling quiet and dark, worn dents and a milk crust visible on the pail rim, palette of warm cream deep forest green and steel grey, desaturated and muted, documentary still life, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 3:2 --resolution 2k --wait
```

## 3. What fermentation does

**Component:** `ProcessSteps`, 4 steps

> **Eyebrow:** Two — the change
> **Heading:** Four days in a wooden vessel

| Step | Title | Body |
|---|---|---|
| One | The cultures go to work | Fresh milk is poured into a wooden churn that already carries its own established culture from previous batches. Nothing is inoculated from a packet. |
| Two | Lactose is broken down | The bacteria consume the milk sugar and produce lactic acid. This is what makes the liquid turn faintly sour, and it is what drops the pH enough for the milk to keep. |
| Three | Proteins loosen | The falling pH partly unfolds the milk proteins. They do not curdle into solids the way cow's milk does, because there is comparatively little casein to curdle — instead the structure simply opens up. |
| Four | It is stirred, repeatedly | By hand, many times a day, for four days. The agitation keeps the culture distributed and the fat from separating. It is unglamorous and it is the part that cannot be shortened. |

### IMAGE PLACEHOLDER — S-2

**Purpose:** The four-day stir. Labour, not laboratory.
**Aspect ratio:** 3:2 · **Display size:** 1200 × 800 · **Loading:** lazy
**Save to:** `src/assets/science/stirring.{avif,webp}`
**Suggested composition:** Hands on a long wooden plunger inside a churn, mid-stroke, slight motion blur on the hands only. No face.
**Alt text:** `Hands working a wooden plunger inside a fermentation churn.`

```
higgsfield generate create gpt_image_2 \
  --prompt "close documentary photograph of a pair of weathered hands working a long worn wooden plunger up and down inside a tall oak fermentation churn, slight natural motion blur on the hands while the vessel stays sharp, no face visible, dim interior of a Mongolian ger with warm amber light entering from a low doorway on the right, milk splashed on the wooden rim and a wool sleeve pushed back at the wrist, palette of deep forest green warm cream and aged gold, desaturated, unglamorous honest labour, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 3:2 --resolution 2k --wait
```

## 4. What that means for you

**Component:** `Container width="prose"` + `Prose`

> **Eyebrow:** Three — the consequence
> **Heading:** The work is already partly done
> **Body:**
> Digestion is, in large part, a process of taking food apart. Fermentation carries out some of that work before you ever swallow it: the lactose is largely broken down, and the proteins are partly unfolded.
>
> The nutrients themselves are the ones that were in the milk to begin with — vitamin C, vitamin A, B vitamins, calcium, phosphorus, iron, omega-3 and omega-6 fatty acids, lactoferrin, lysozyme. Fermentation does not add them. What it changes is the state they arrive in.
>
> This is the whole argument, and it is a modest one. We are not claiming a mechanism nobody has described before. We are claiming that a traditional preparation method does something specific and describable to a specific and unusual milk.

**Followed by a `PullQuote`:**
> Nothing is added. Something is taken apart.

## 5. Why drying preserves it

**Component:** `MediaTextRow`, image right

> **Eyebrow:** Four — the powder
> **Heading:** Why it is a powder and not a bottle
> **Body:**
> Fermented mare's milk does not travel. It is a live, sour liquid with a shelf life measured in days, and there is no version of shipping it from Töv Province to Bangkok that ends well.
>
> So it is dried — at low temperature, which removes water without cooking the material. The vitamins, minerals, fats and proteins remain. What does not survive drying is the live culture itself, and we would rather say that plainly than let the word "fermented" imply something it does not.
>
> What you are taking is the *product* of fermentation, not a live culture. If a live probiotic is what you are looking for, this is not that, and there are products that are.

> **This section is the most important paragraph on the page.** Volunteering the limitation before anyone asks is worth more than any claim the page could otherwise make. Do not soften it in editing.

### IMAGE PLACEHOLDER — S-3

**Purpose:** The transition from liquid to powder, shown as a material fact.
**Aspect ratio:** 3:2 · **Display size:** 1200 × 800 · **Loading:** lazy
**Save to:** `src/assets/science/drying.{avif,webp}`
**Suggested composition:** A shallow steel tray of pale dried milk solids, cracked into plates like dried earth, one corner lifted. Hard raking light.
**Alt text:** `Pale dried milk solids cracked into plates in a shallow steel tray.`

```
higgsfield generate create gpt_image_2 \
  --prompt "overhead macro editorial photograph of pale ivory dried milk solids in a shallow dented steel tray, the surface cracked into irregular plates like dried earth with one corner lifted and beginning to crumble, hard warm golden light raking low across the surface from the right throwing long shadows into every crack, dust and a few loose flakes on the tray edge, palette of warm cream steel grey and deep forest green shadow, desaturated, precise material still life, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 3:2 --resolution 2k --wait
```

## 6. The daily part

**Component:** `Container width="prose"` + `Prose` + `TipList columns={1}`

> **Eyebrow:** Five — the habit
> **Heading:** Why it is a daily thing
> **Body:**
> Nutritional intake works cumulatively. A single serving of anything is, in almost every case, unremarkable; what changes anything is what you do most days for months.
>
> That is why this is sold in twenty-five-day boxes rather than as a course or a cure, and why we are not going to tell you when you will notice something. We do not know, and neither does anyone selling you a number.

**TipList, 3 items:**

| Title | Body |
|---|---|
| Same time each day | The hour matters far less than the consistency. Attach it to something you already do without thinking. |
| Cool water | Room temperature or cooler. Hot water will not harm it, but it makes the taste worse and there is no reason to. |
| A missed day is a missed day | There is nothing to catch up on and no reason to double a dose. Take the next one as normal. |

## 7. Honest limits

**Component:** `HonestLimits`

> **Heading:** What we don't know yet
>
> The evidence base for fermented mare's milk is thin. Most of the published work is small-scale, much of it is decades old, and very little of it has looked at the outcomes people actually ask us about.
>
> We can describe what is in the powder and what fermentation does to it. We cannot tell you what it will do for you, we have not run a trial of our own, and drying removes the live culture — so this is not a probiotic and we do not describe it as one.
>
> Thai FDA registration is in progress. We will publish the details here on the day they are issued.

## 8. Read further

**Component:** `CardGrid columns={2}` of `ContentCard`

> **Heading:** If you want more detail

| Eyebrow | Title | Excerpt | Href |
|---|---|---|---|
| The Science | Fermentation | What the bacteria are actually doing over four days, and why the vessel matters. | `/the-science/fermentation/` |
| The Science | The microbiome | What the gut microbiome is, why it varies so much between people, and what food has to do with it. | `/the-science/the-microbiome/` |
| The Science | Digestion and absorption | How a nutrient gets from a glass of water to somewhere it can be used. | `/the-science/digestion-and-absorption/` |
| The Science | The gut–skin axis | The connection behind the phrase "radiance from within", and how much of it is established. | `/the-science/the-gut-skin-axis/` |

## 9. Closing CTA

**Component:** `ClosingCTA`, shared bookend

> **Heading:** That is the whole argument
> **Body:** If it holds up for you, the sachets are the place to start.
> **Primary:** See the products → `/products/`
> **Secondary:** Where it comes from → `/our-story/`

---

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| < 768px | Everything single-column. `ProcessSteps` fully stacked, numerals reduce to `display-2` size. `StatBand` 2 columns with the third wrapping. Pull quote at `h2` size |
| 768–1023px | Media rows side-by-side. `StatBand` 3 across |
| ≥ 1024px | `ProcessSteps` gains its vertical `gold/30` connector rule in the gutter. Prose at 680px, figures at 940px |

## Accessibility notes

- One `<h1>`. Each numbered step is `<h3>` within the `<ol>`; the large decorative numerals are `aria-hidden` and the ordinal is repeated in the heading text ("One — The cultures go to work")
- `PullQuote` is a `<p>`, not a heading — it must not enter the document outline
- `StatBand` count-up renders final values immediately under `prefers-reduced-motion`
- The page is long; verify the heading outline reads as a coherent table of contents on its own, because that is how a screen-reader user will navigate it
- All images here are informational and carry real alt text. None is decorative

## SEO notes

| Element | Value |
|---|---|
| `<title>` | How It Works — Fermented Mare's Milk Explained · Steppe Gut |
| Meta description | What mare's milk is, what four days of fermentation does to it, why it is sold as a powder, and what the evidence does and does not show. |
| `<h1>` | How it works |
| JSON-LD | `Article` with `headline`, `datePublished`, `dateModified`, `author: Organization`. Also `HowTo` is **not** appropriate here — this explains a mechanism, it does not instruct the reader to perform one |
| Internal links | 4 science articles, `/products/`, `/our-story/`, `/products/whats-inside/` |
| Target queries | "what is fermented mare's milk", "how is kumis made", "mare's milk vs cow's milk", "is fermented mare's milk a probiotic" |
| Note | The honest-limits section targets "is fermented mare's milk a probiotic" — a query with real volume and a genuine answer of "no". Being the site that answers it correctly is worth more than the traffic a wrong answer would capture |

## Developer notes

- Route `/how-it-works/`, lazy-loaded
- Reuses `MediaTextRow`, `ProcessSteps`, `StatBand`, `PullQuote`, `TipList`, `HonestLimits`, `CardGrid`, `ContentCard`, `ClosingCTA`. **No new components**
- Three new images (S-1, S-2, S-3). All `generate create`, no product in frame
- `ProcessSteps` is first built here — build it generically, because `/our-story/how-its-made/` reuses it with seven steps
- The `StatBand` figures in §2 are composition comparisons that must be verified against a real source before publication. If they cannot be sourced, **cut the StatBand entirely** rather than shipping approximate figures on the page whose entire value is precision
- Add a "Last reviewed" date beneath the `<h1>` in `caption`/`text-tertiary`, updated whenever the evidence section changes. Cheap, and it signals maintenance on a page that makes evidentiary claims
