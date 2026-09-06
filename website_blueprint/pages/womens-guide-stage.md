# Template — Life-Stage Article `/the-science/womens-guide/:slug/`

Covers `monthly-cycle`, `perimenopause`, `menopause`. **One template, three content records.**

## Summary

Three long-form articles inside the women's guide. Structurally identical to `science-article.md`, with three differences that matter: a mandatory medical disclaimer near the top rather than only at the bottom, an "expert tips" practical block, and stricter imagery rules.

## Purpose

- **Goals:** education, trust
- **Journey questions:** 2, 5
- **Audience:** a woman in or approaching this life stage, often arriving from search, frequently frustrated by the quality of what she has already read
- **Intent:** "Explain what is happening to me, without selling me something"
- **Primary CTA:** the next life-stage article
- **Secondary CTA:** *Wellbeing* → `/wellbeing/`

## Layout

Same as `science-article.md`: `PageHeader align="left"` with breadcrumbs, last-reviewed date and reading time; `container-prose` 680px at `72ch`; figures at `container-content`.

## Fixed section order

| # | Section | Component | Fixed? |
|---|---|---|---|
| 1 | Header, date, reading time | `PageHeader` | Yes |
| 2 | **Medical disclaimer** | `sage-tint` panel, `radius-lg` | **Yes — near the top, not the bottom** |
| 3 | What is happening | `Prose` | Yes |
| 4 | What changes in digestion | `MediaTextRow` | Yes |
| 5 | Why it changes | `Prose` | Yes |
| 6 | What tends to help | `TipList columns={2}` | Yes |
| 7 | What is worth seeing a doctor about | `TipList columns={1}` | **Yes — mandatory** |
| 8 | One pull quote | `PullQuote` | Yes |
| 9 | Where Steppe Gut fits | `Prose`, 2 short paragraphs | Yes |
| 10 | What we don't know yet | `HonestLimits` | **Yes — mandatory** |
| 11 | Read next | `CardRail` | Yes |

**Section 2 sits above the fold on mobile.** On a page about a health topic, a disclaimer discovered after 900 words is not a disclaimer. Its wording is shared across all three articles from `src/data/womensGuide.js`.

> **Shared disclaimer copy:**
> This page is general information, not medical advice. It describes patterns that are common, not what is happening to you. If something has changed, or if a symptom worries you, speak to a doctor. A supplement company is not the right source of a diagnosis, and we are not going to pretend to be one.

---

# Content record — `monthly-cycle`

**H1:** Your monthly cycle
**Lead:** Digestion changes across a month, fairly predictably, for a lot of people. Here is what is going on and what tends to help.

**What is happening.** Across a typical cycle, oestrogen and progesterone rise and fall in a repeating pattern. Both affect smooth muscle, including the smooth muscle of the digestive tract, and both influence how much water the body holds. The result is that digestion behaves differently in different weeks of the same month.

**What changes in digestion.** The commonly reported pattern is slower transit and more bloating in the second half of the cycle, when progesterone is higher, and faster transit around the start of a period, when prostaglandins rise. Appetite frequently shifts too. None of this is universal, and the variation between people is considerable.

**Why it changes.** Progesterone relaxes smooth muscle, which slows the movement of food through the gut. Prostaglandins released around menstruation act on the same muscle in the opposite direction. Neither of these is a malfunction; they are the digestive consequence of hormones doing something else.

**What tends to help.**
| Title | Body |
|---|---|
| Keep fibre steady, do not spike it | A sudden increase in fibre during a bloated week usually makes it worse. Consistency across the month works better than reacting within it. |
| Drink more in the second half | Slower transit and more water retention both respond to it. |
| Gentle movement over hard training | Walking does more for gut transit than an intense session, and is easier to sustain in a low-energy week. |
| Track two or three cycles | Patterns are individual. Three months of notes will tell you more about your own than any article can. |
| Warmth genuinely helps | Not because it fixes anything, but because it relaxes the muscle that is cramping. That is a real mechanism, modestly. |
| Expect the pattern to shift with age | It will. See [Perimenopause](/the-science/womens-guide/perimenopause/). |

**Worth seeing a doctor about:** Pain that stops you doing normal things · Bleeding that is much heavier or longer than usual for you · A sudden change in a pattern that had been stable · Digestive symptoms that persist through the whole month rather than following the cycle.

**PullQuote:** It is not the same gut every week of the month.

**Where Steppe Gut fits:** It doesn't, specifically. Steppe Gut is a daily source of nutrients naturally present in mare's milk. It has no established effect on menstrual symptoms and we are not going to imply one. If it is useful here at all, it is as one steady thing in a month that is not steady.

**What we don't know yet:** Why the pattern varies so much between individuals is not well explained. Most of the research is observational and self-reported, and there is very little on whether any dietary intervention reliably changes the picture.

**Image:** reuse S-9. No new asset.

---

# Content record — `perimenopause`

**H1:** Perimenopause
**Lead:** The years of fluctuation before periods stop. Digestion often changes during them, and it is frequently the last thing anyone connects to hormones.

**What is happening.** Perimenopause is a period of increasingly irregular hormonal fluctuation, typically beginning in the forties and lasting several years. The defining feature is not decline but *variability* — levels swing more widely and less predictably than they did.

**What changes in digestion.** Commonly reported: more bloating, changes in transit in both directions, new sensitivity to foods previously tolerated, and disrupted sleep that itself affects digestion. Because the underlying hormonal pattern is irregular, the digestive pattern is irregular too, which is precisely what makes it hard to attribute to anything.

**Why it changes.** The same smooth-muscle and fluid-balance mechanisms as in a regular cycle, but without the predictable rhythm. Sleep disruption compounds it: broken sleep affects gut motility and appetite regulation independently, so two things are changing at once.

**What tends to help.**
| Title | Body |
|---|---|
| Protect sleep first | It is the lever with the largest downstream effect and the one most likely to be disrupted. See [Rest](/wellbeing/rest/). |
| Keep a food and symptom note | New sensitivities are much easier to identify in writing than in memory. |
| Do not eliminate food groups on a hunch | Restriction reduces dietary variety, which is the thing most reliably associated with gut health. |
| Resistance training matters more now | For bone and muscle, both of which become more relevant from this point. |
| Expect it to keep changing | A strategy that works this year may not next year. That is the nature of the stage rather than a failure. |
| Ask about HRT if symptoms affect your life | It is a medical conversation, and it is a reasonable one to have. |

**Worth seeing a doctor about:** Any bleeding between periods or after sex · Symptoms that are affecting work or relationships · Persistent digestive change lasting more than a few weeks · Low mood that is not lifting.

**PullQuote:** The difficulty is the variability, not the direction.

**Where Steppe Gut fits:** As a consistent daily habit and a source of calcium, iron and B vitamins naturally present in mare's milk. Those nutrients have established general roles. Steppe Gut has no established effect on perimenopausal symptoms.

**What we don't know yet:** Whether the digestive changes reported during perimenopause are primarily hormonal, primarily driven by sleep disruption, or both, is not settled. Almost no intervention research exists that separates them.

**Image:** reuse S-10. No new asset.

---

# Content record — `menopause`

**H1:** Menopause
**Lead:** After oestrogen settles at a lower level, some things stabilise and some nutritional considerations become more important than they were.

**What is happening.** Menopause is defined as twelve consecutive months without a period. After it, oestrogen and progesterone remain at consistently low levels rather than fluctuating. For many people the volatility of perimenopause eases; what remains is a new baseline.

**What changes in digestion.** Transit tends to slow somewhat. Bloating often becomes less variable and more constant. The cyclical pattern disappears, which for many people is a relief regardless of the baseline.

**Why it changes.** Lower oestrogen affects gut motility and the composition of the gut microbiome. It also affects bone turnover and how the body handles calcium, which is why nutritional attention shifts at this stage rather than reducing.

**What tends to help.**
| Title | Body |
|---|---|
| Calcium and vitamin D become more important | Bone density declines faster after menopause. This is the clearest nutritional priority of the stage. |
| Protein intake matters more, not less | Muscle mass declines with age and protein requirements do not fall to match. |
| Resistance training is the single best intervention | For bone and muscle both. Nothing dietary substitutes for it. |
| Fibre and fluid for slower transit | The same advice as everywhere else, now more relevant. |
| Get bone density assessed if advised | A medical decision, worth raising. |
| Alcohol affects sleep more than it used to | Widely reported, and worth testing on yourself. |

**Worth seeing a doctor about:** Any bleeding after menopause — this always warrants assessment · Bone or joint pain · Persistent digestive change · Anything that has changed suddenly.

**PullQuote:** The volatility ends. The nutrition matters more.

**Where Steppe Gut fits:** Mare's milk naturally contains calcium, phosphorus, iron and vitamin C. Calcium and phosphorus contribute to the maintenance of normal bones. That is a statement about those minerals, and Steppe Gut is one of many possible sources of them — a varied diet remains the primary one.

**What we don't know yet:** How much of the post-menopausal change in the gut microbiome matters practically is an open question. There is no good evidence that any supplement, including ours, addresses it.

**Image:** reuse S-11. No new asset.

---

## Responsive behaviour

Identical to `science-article.md`. Additionally: **the disclaimer panel in §2 must be fully visible without scrolling at 360 × 640px** — verify it, and shorten the lead if it is not.

## Accessibility notes

- One `<h1>` per article. Breadcrumbs mandatory: Home / The Science / A Woman's Guide / *stage*
- The disclaimer panel is a `<section>` with `aria-labelledby`; its heading may be visually hidden but must exist
- "Worth seeing a doctor about" is a `<ul>` and must never be inside an accordion
- `PullQuote` is a `<p>`
- Dates use `<time datetime="…">`
- **No images on these pages contain a person, a body or skin.** This is an accessibility-adjacent editorial rule as much as a brand one — the pages are read by people who are frequently being sold to badly, and imagery that reads as advertising damages the writing's credibility

## SEO notes

| Article | `<title>` | Target queries |
|---|---|---|
| Monthly cycle | Your Monthly Cycle and Digestion · Steppe Gut | "period bloating", "does the menstrual cycle affect digestion", "progesterone constipation" |
| Perimenopause | Perimenopause and Digestion · Steppe Gut | "perimenopause bloating", "perimenopause digestive changes", "perimenopause sleep gut" |
| Menopause | Menopause, Digestion and Nutrition · Steppe Gut | "menopause bloating", "menopause calcium", "menopause gut health" |

- JSON-LD `Article` with `dateModified`. **Never `MedicalWebPage`** — Steppe Gut is not a medical publisher and typing the content as medical invites a standard of review it should not be inviting
- Each article links to the other two, to the guide, and to `/wellbeing/rest/` and `/wellbeing/nourish/`

## Developer notes

- Route `/the-science/womens-guide/:slug`, lazy-loaded. Unknown slug → 404
- **Zero new images.** All three reuse S-9, S-10, S-11 from the guide hub
- Content records in `src/data/womensGuide.js`, sharing `medicalDisclaimer` and `honestLimitsShared` fields with the hub
- Both `medicalDisclaimer` and `honestLimits` are **required** fields in the record type — an article must not be able to ship without either
- Reuses every component from `science-article.md`. No new components
- These three articles plus the guide hub should be reviewed together by a second person before shipping, against `02_brand_guidelines.md` §6
