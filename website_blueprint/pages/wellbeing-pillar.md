# Template — Wellbeing Pillar `/wellbeing/:slug/`

Covers `nourish`, `rest`, `movement`, `calm`, `ritual`. **One template, five content records.**

## Summary

Practical, 400–600 word pages. Shorter and warmer than the science articles, and written to be *acted on* rather than believed. Each one ends by pointing at the underlying mechanism page in `/the-science/`, so the two hubs reinforce rather than duplicate each other.

## Purpose

- **Goals:** education, trust
- **Journey questions:** 2, 5
- **Audience:** a reader looking for something useful today
- **Intent:** "What should I actually do?"
- **Primary CTA:** the next pillar
- **Secondary CTA:** the related science article

## Layout

| Property | Value |
|---|---|
| Header | `PageHeader align="left"` with breadcrumbs |
| Body | `container-prose` 680px; one `MediaTextRow` at `container` width |
| Rhythm | `section-gap-sm` inside, `section-gap` between |
| Length | 400–600 words. **Do not pad these to match the science pages** |

## Fixed section order

| # | Section | Component |
|---|---|---|
| 1 | Header | `PageHeader` |
| 2 | The point, in one paragraph | `Prose` lead |
| 3 | Why it affects your gut | `MediaTextRow` |
| 4 | Six things that help | `TipList columns={2}` |
| 5 | What is oversold | `Prose`, 1 short paragraph |
| 6 | The related science | `Prose` + `Button link-arrow` |
| 7 | Read next | `CardRail` of the other four pillars |
| 8 | Newsletter | `NewsletterSignup variant="inline"` |

Section 5 — "what is oversold" — is the section that distinguishes these pages from every other wellness listicle. It is mandatory.

---

# Content record — `nourish`

**H1:** Nourish
**Lead:** Most dietary advice about gut health reduces to one instruction: eat a wider range of plants. Everything else is refinement.

**Why it affects your gut.** The bacteria in your large intestine live on the parts of food you cannot digest — principally plant fibre. Different bacteria ferment different fibres, so a narrow diet supports a narrow population and a varied one supports a varied population. This is the most consistently reproduced finding in the field.

**Six things that help:**
| Title | Body |
|---|---|
| Count plant types, not portions | Different vegetables, fruits, grains, nuts, seeds, herbs and pulses across a week. Thirty is a commonly cited target; the direction matters more than the number. |
| Increase fibre slowly | A sudden jump produces bloating and makes people conclude fibre disagrees with them. It usually does not; the speed did. |
| Include fermented foods | Yoghurt, kimchi, miso, kefir. Not because they colonise anything, but because they add variety and their fermentation products are useful. |
| Do not fear whole grains | They are among the best fibre sources available and are frequently cut for no good reason. |
| Drink enough water | Fibre without fluid makes transit worse, not better. |
| Eat the skins and the stalks | Most of the fibre is in the parts that get thrown away. |

**What is oversold.** Almost every "gut-healing" protocol, elimination diet and microbiome test sold with personalised recommendations. Elimination reduces dietary variety, which is the opposite of the one thing that reliably helps. If you are eliminating foods, it should be with a clinician and for a reason.

**Related science:** [The microbiome](/the-science/the-microbiome/)
**Image:** W-1

---

# Content record — `rest`

**H1:** Rest
**Lead:** Sleep and digestion affect each other in both directions, and sleep is usually the easier one to change.

**Why it affects your gut.** Gut motility follows a daily rhythm, and that rhythm is set partly by your sleep–wake cycle. Disrupted or irregular sleep changes transit time and appetite regulation. It also raises cortisol, which affects digestion independently. People who improve their sleep frequently report digestive change without altering their diet at all.

**Six things that help:**
| Title | Body |
|---|---|
| Consistent times beat total hours | Going to bed and getting up at the same times matters more than the number in between. |
| Morning daylight | Ten minutes outside early sets the clock more effectively than anything you do at night. |
| Stop eating a few hours before bed | Lying down on a full stomach affects both sleep quality and digestion. |
| Alcohol reliably worsens sleep quality | Even when it shortens the time to fall asleep. This is well established and widely ignored. |
| Cool and dark | Both are more effective than most sleep products sold. |
| Do not chase a perfect night | Sleep anxiety is itself a major cause of poor sleep. One bad night is not a problem. |

**What is oversold.** Sleep-tracking devices marketed as diagnostic, and supplements sold for sleep on evidence that is thin at best. Melatonin has genuine, narrow uses; most of what is sold alongside it does not.

**Related science:** [The gut–skin axis](/the-science/the-gut-skin-axis/) and [The microbiome](/the-science/the-microbiome/)
**Image:** W-2

---

# Content record — `movement`

**H1:** Movement
**Lead:** Ordinary daily movement does more for digestion than occasional hard exercise. This is convenient, because it is also easier.

**Why it affects your gut.** Physical activity increases gut motility and appears to be associated with greater microbial diversity, independently of diet. The effect is reasonably robust for moderate regular activity and less clear for intense training, which at high volumes can cause digestive problems of its own.

**Six things that help:**
| Title | Body |
|---|---|
| Walk after meals | Ten to fifteen minutes measurably affects how quickly a meal moves through you. |
| Movement beats exercise | Standing, stairs, walking to things. It accumulates and it does not require a decision. |
| Consistency over intensity | Four moderate sessions a week outperform one hard one, for this and for most things. |
| Resistance training matters increasingly with age | For muscle and bone. Not primarily a gut intervention, but the most valuable habit on this list overall. |
| Do not train hard on a full stomach | Blood flow is diverted away from digestion. This is the most common cause of exercise-related gut symptoms. |
| Something you will keep doing | The best form of exercise is the one that survives a busy month. |

**What is oversold.** Exercise as a solution to persistent digestive symptoms. It helps at the margin; it does not resolve a condition, and framing it that way puts the blame on the person rather than on the problem.

**Related science:** [Digestion and absorption](/the-science/digestion-and-absorption/)
**Image:** W-3

---

# Content record — `calm`

**H1:** Calm
**Lead:** The connection between stress and digestion is one of the better-established things in this whole section — and one of the hardest to act on.

**Why it affects your gut.** The gut has its own extensive nervous system, connected directly to the brain. Stress changes gut motility, secretion and sensitivity, which is why anxiety produces immediate and unmistakable digestive effects in most people. This is not psychosomatic in the dismissive sense; it is a physical pathway.

**Six things that help:**
| Title | Body |
|---|---|
| Slow breathing, done briefly and often | Among the few interventions with a plausible mechanism and reasonable evidence. Five minutes is enough to be worth doing. |
| Time outdoors | Consistently associated with lower stress markers, and it is not clear that the mechanism matters. |
| Reduce decisions, not just tasks | Decision load is a large and underrated component of feeling stretched. |
| Protect one unstructured hour | More useful than a shorter, scheduled "wellness" activity. |
| Name what is not changeable | A great deal of stress advice implies all stress is optional. Distinguishing what you can change from what you cannot is itself useful. |
| Talk to someone | Not a supplement recommendation. A real one. |

**What is oversold.** Adaptogens, "cortisol-balancing" supplements, and almost everything sold on the promise of managing stress chemically. If stress is affecting your life, the interventions with evidence behind them are behavioural and sometimes clinical.

**Related science:** [The microbiome](/the-science/the-microbiome/)
**Image:** W-4

---

# Content record — `ritual`

**H1:** Ritual
**Lead:** The reason any of this works is repetition. That is unglamorous, and it is the entire mechanism.

**Why it affects your gut.** The gut runs on a circadian rhythm. Eating, sleeping and moving at roughly consistent times reinforces it; irregularity disrupts it. Beyond the biology, consistency is simply what makes a small effect accumulate into a noticeable one — a habit kept for six months does something a habit kept for three weeks cannot.

**Six things that help:**
| Title | Body |
|---|---|
| Attach it to something existing | New habits survive when they are stapled to an established one. After you fill the kettle, not "in the morning". |
| Same time, roughly | Precision is not required. Regularity is. |
| Make the first step trivially small | The barrier to starting is the thing that determines whether it happens. |
| Leave it where you will see it | Visible beats remembered. |
| A missed day is not a failed habit | It becomes one only if the second day is missed too. |
| Measure in months | Ask again in three months, not in three days. |

**What is oversold.** Elaborate morning routines. A twelve-step routine will not survive a difficult week; a one-step one will. The routines that work are almost always shorter than the ones that get written about.

**Related science:** [How it works](/how-it-works/)
**Image:** W-5

---

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| < 768px | Single column. `MediaTextRow` stacks image-first. `TipList` 1 column. `CardRail` 1.2 cards |
| 768–1023px | Media row side-by-side. `TipList` 2 columns |
| ≥ 1024px | Prose at 680px. Rail arrows appear |

## Accessibility notes

- One `<h1>` per page. `TipList` titles `<h3>`
- Breadcrumbs: Home / Wellbeing / *pillar*
- The `calm` page's "talk to someone" item should link to a real, appropriate Thai support resource if one is agreed with the client — **do not ship a generic placeholder link on this item**. If no resource is agreed, keep the sentence and omit the link
- `CardRail` is a keyboard-scrollable named region

## SEO notes

| Pillar | `<title>` | Target queries |
|---|---|---|
| Nourish | Nourish — Eating for Gut Health · Steppe Gut | "foods for gut health", "how much fibre", "30 plants a week" |
| Rest | Rest — Sleep and Digestion · Steppe Gut | "sleep and gut health", "does poor sleep cause bloating" |
| Movement | Movement — Exercise and Digestion · Steppe Gut | "exercise gut health", "walking after meals digestion" |
| Calm | Calm — Stress and the Gut · Steppe Gut | "stress and digestion", "gut brain connection stress" |
| Ritual | Ritual — Why Consistency Works · Steppe Gut | "daily supplement routine", "building a health habit" |

- JSON-LD `Article` per page with `dateModified`
- Each links to the other four, its related science article, and `/wellbeing/`
- These pages target informational queries and should **not** carry a product CTA above the fold. The commercial link belongs at the foot, if anywhere

## Developer notes

- Route `/wellbeing/:slug`, lazy-loaded. Unknown slug → 404
- **Zero new images** — all five reuse W-1 … W-5 from the hub
- Records in `src/data/wellbeing.js`: `{ slug, title, lead, why, tips[6], oversold, relatedScience, image, alt }`
- `oversold` is a **required** field. It is the section that gives these pages their voice, and it will be the first thing dropped under deadline pressure if it is optional
- Reuses `PageHeader`, `MediaTextRow`, `TipList`, `Prose`, `CardRail`, `ContentCard`, `NewsletterSignup`. No new components
- Keep them short. If a pillar page runs past 700 words, cut it rather than justify it
