# Template — Science Article `/the-science/:slug/`

Covers four pages: `fermentation`, `the-microbiome`, `digestion-and-absorption`, `the-gut-skin-axis`. **One template, four content records.**

## Summary

Long-form explainers, 700–1,000 words, each ending in a fixed "What we don't know yet" section. These are the pages that do the heavy lifting on `SG-PROJECT_CONTEXT.md`'s first objective — educating a market that has never heard of the category — and they are the site's main organic-search surface.

The reference site's equivalent articles follow a consistent shape: a stated question, a series of `MediaTextRow` sections answering it, a practical block, and a "discover more" rail. That shape is adopted, with the honest-limits block added as the fixed final section.

## Purpose

- **Goals:** education, trust
- **Journey questions:** varies by article — 2, 5 or 6
- **Audience:** search arrivals and curious readers, mostly not yet customers
- **Intent:** "Explain this subject to me"
- **Primary CTA:** the next article in sequence
- **Secondary CTA:** *How it works* → `/how-it-works/`

## Layout

| Property | Value |
|---|---|
| Header | `PageHeader align="left"` with breadcrumbs and a last-reviewed date |
| Body | `container-prose` 680px, `72ch`; figures at `container-content` 940px |
| Rhythm | `section-gap` between major sections; `section-gap-sm` inside |
| Reading time | Displayed in `caption` beside the date |

## Fixed section order

Every article uses this order. Variation between articles is in content, not structure — that consistency is what makes four long pages feel like a series rather than four essays.

| # | Section | Component | Fixed? |
|---|---|---|---|
| 1 | Header with date and reading time | `PageHeader` | Yes |
| 2 | The question | `Prose` lead paragraph | Yes |
| 3 | 3–5 explanatory sections | `MediaTextRow` / `Prose`, alternating | Count varies |
| 4 | One pull quote | `PullQuote` | Yes, exactly one |
| 5 | Practical takeaways | `TipList columns={2}` | Yes |
| 6 | Where Steppe Gut fits | `Prose`, 2 short paragraphs | Yes |
| 7 | What we don't know yet | `HonestLimits` | **Yes — mandatory** |
| 8 | Read next | `CardRail` of the other three articles | Yes |
| 9 | Newsletter | `NewsletterSignup variant="inline"` | Yes |

Section 6 is the only commercial content and it is deliberately placed after all the education and before the honest-limits block, so the page never ends on a sell.

---

# Content record — `fermentation`

**H1:** Fermentation
**Lead:** Milk left alone with the right bacteria for four days becomes a different material. Here is what is actually happening during those four days, and why the vessel matters more than the recipe.

**Sections:**

**What fermentation is.** Fermentation is controlled spoilage. Bacteria consume sugars and produce acids, and the acid environment they create is hostile to the organisms that would otherwise rot the food. Every fermented food — yoghurt, kimchi, bread, cheese, kumis — is the same bargain: you let one population of microbes take over so that a worse one cannot.

**What the bacteria eat.** In mare's milk, the sugar is lactose, and there is a great deal of it — more than in cow's milk. Lactic acid bacteria break it down into lactic acid, and in some traditional fermentations yeasts present alongside them also produce a small amount of alcohol and carbon dioxide, which is why fresh kumis is faintly fizzy. Our powder is made from the lactic fermentation and dried, so neither the fizz nor the alcohol survives.

**Why the pH matters.** As acid accumulates, the pH falls. Two things follow. Spoilage organisms stop being able to grow, which is the preservation effect that made this practice necessary in the first place. And the milk proteins begin to unfold — in cow's milk this produces a curd, but mare's milk is whey-dominant and low in casein, so instead of setting it simply thins and turns sour.

**Why the vessel matters.** Traditional fermentation is not inoculated from a packet. The wooden churn carries a resident culture in its grain from every batch before it, and each new batch is seeded by the vessel itself. This means the culture is specific to the household, it has been selected over years by what survives there, and it cannot be reproduced by buying a starter. It also means variation is inherent, which is why we test batches rather than assume them.

**What drying leaves behind.** Water is removed at low temperature. The vitamins, minerals, fats and the acid-modified proteins remain. The live culture does not — see [How It Works](/how-it-works/). What is in the sachet is the *product* of fermentation, not an active ferment.

**PullQuote:** The vessel is the recipe.

**Practical takeaways:**
| Title | Body |
|---|---|
| Sour is the point | The taste is the acid that makes it keep. A fermented dairy product that tastes of nothing has usually had something added. |
| Fermented is not the same as probiotic | A probiotic contains live organisms in known quantities. Many fermented foods, including this one after drying, do not. |
| Traditional does not mean unmeasured | The fermentation is traditional. The testing that follows it is not, and both are necessary. |
| Variation is honest | Household cultures differ. Batch figures are averages. |

**Where Steppe Gut fits:** Our powder is fermented by the families who produce the milk, in their own vessels, over four days, then dried at low temperature. We did not design the process and we do not specify the culture. See [How It's Made](/our-story/how-its-made/).

**What we don't know yet:** How much the household-to-household variation in culture affects the finished composition is not something we can currently quantify, and we do not publish per-batch analysis yet. We also cannot tell you how the fermented proteins behave once digested — the work simply has not been done on this specific product.

**Images:** hero reuses S-2 (`stirring`); one new figure — a close macro of the wooden churn's grain.

### IMAGE PLACEHOLDER — S-8
**Purpose:** Make "the vessel carries the culture" visible as a physical fact.
**Aspect ratio:** 3:2 · **Display size:** 1200 × 800 · **Loading:** lazy · **Save to:** `src/assets/science/churn-grain.{avif,webp}`
**Alt text:** `Close view of the worn, milk-darkened interior grain of a wooden churn.`
```
higgsfield generate create gpt_image_2 \
  --prompt "extreme close editorial photograph of the worn interior wooden grain of an old fermentation churn, the oak darkened and stained pale by decades of milk with the grain raised and softened by long use, one narrow band of warm light entering from above and raking across the surface leaving the lower half in deep shadow, tiny cracks and a smoothed rim edge visible, palette of warm cream aged oak brown and deep forest green shadow, desaturated, tactile material macro, subtle film grain, photographed on film, no text no logos no graphic overlays" \
  --aspect_ratio 3:2 --resolution 2k --wait
```

---

# Content record — `the-microbiome`

**H1:** The microbiome
**Lead:** Trillions of bacteria live in your gut. That much is uncontroversial. Almost everything after it is less settled than the internet suggests.

**Sections:**

**What it is.** The gut microbiome is the population of bacteria, and to a lesser extent fungi and viruses, living mainly in the large intestine. Its total mass is roughly comparable to a large organ. It ferments the fibre you cannot digest yourself, produces some vitamins as a by-product, and occupies space that other organisms would otherwise take.

**Why yours is different.** No two people's microbiomes are alike, and the differences are large — larger, between two healthy adults, than the differences in their genomes. Diet, geography, age, medication, birth method and simple chance all contribute. This is the single most important thing to understand about the field, because it is why results that hold for one population frequently do not transfer to another.

**What diet does.** Diet is the most reliable lever anyone has found, and fibre is the most reliable part of it. Bacteria that ferment plant fibre produce short-chain fatty acids, which are used by the cells lining the colon. The practical version of this is unglamorous: more plants, more different plants.

**What fermented foods do.** Fermented foods introduce microbes and their metabolic products. Whether those microbes establish themselves in a gut that already has trillions of residents is a separate question, and mostly the answer appears to be that they pass through. This is not a reason to avoid them; it is a reason to be sceptical of anything promising to "rebuild" or "reset" a microbiome.

**Why "boosting" is the wrong word.** There is no established target state. More diversity correlates with health in many studies, but correlation in this field has repeatedly failed to survive intervention trials. Any product that claims to optimise your microbiome is describing a destination nobody has agreed on.

**PullQuote:** There is no known correct microbiome to aim at.

**Practical takeaways:** Eat more different plants · Fibre matters more than any supplement · Antibiotics disturb it and it mostly recovers · Be sceptical of microbiome testing kits sold with recommendations · A varied diet outperforms every product, including ours.

**Where Steppe Gut fits:** Steppe Gut is a fermented food. It contributes nutrients. It is not a probiotic and it will not remodel your microbiome, and we would rather tell you that than let the category's vocabulary imply it.

**What we don't know yet:** Whether any specific dietary intervention reliably shifts an adult microbiome in a durable, beneficial direction remains genuinely open. Most of what is confidently marketed in this area is running well ahead of the evidence, and we include our own category in that.

**Images:** hero reuses S-5 (`culture plate`). One optional figure — no new asset required.

---

# Content record — `digestion-and-absorption`

**H1:** Digestion and absorption
**Lead:** Swallowing something is not the same as absorbing it. This is the difference between the two, and why "bioavailable" is a real word rather than a marketing one.

**Sections:**

**Digestion is disassembly.** Food is broken down mechanically and chemically into pieces small enough to cross the wall of the small intestine. Proteins become amino acids and short peptides. Fats become fatty acids. Complex sugars become simple ones. Nothing crosses intact.

**What bioavailability means.** The proportion of a nutrient that is actually absorbed and available for use. It varies with the form the nutrient is in, what it is eaten alongside, and the state of the person eating it. Iron from meat is absorbed more readily than iron from spinach; calcium absorption depends on vitamin D status. This is ordinary nutritional science, not a special property of any product.

**What competes and what helps.** Some combinations interfere — calcium and iron compete for absorption; phytates in whole grains bind minerals. Others assist — vitamin C improves absorption of non-haem iron. This is why single-nutrient thinking is usually wrong.

**Where fermentation comes in.** Fermentation carries out part of the disassembly in advance. Lactose is broken down before you consume it, which is why fermented dairy is often tolerated by people who react to fresh milk. Proteins are partly unfolded. Neither of these is a dramatic effect and neither is unique to mare's milk — it is true of yoghurt too.

**Why timing matters less than people think.** With the exception of a few specific nutrients, when you take something matters far less than whether you take it consistently. A daily habit at any hour outperforms a carefully-timed one you keep for a fortnight.

**PullQuote:** Consistency beats timing, comfortably.

**Practical takeaways:** Take it at whatever time you will actually remember · Cool water, because hot water only worsens the taste · Do not double up after a missed day · Vitamin C and iron work well together, which is convenient here · Absorption varies between people and there is no way to feel it happening.

**Where Steppe Gut fits:** The nutrients in Steppe Gut are the ones naturally present in mare's milk, arriving in a fermented form. We are not claiming an absorption advantage we have measured — we have not measured one. We are describing what fermentation is generally understood to do.

**What we don't know yet:** We have not measured the bioavailability of anything in our own product. Statements about fermentation and absorption on this page are general food science, not findings about Steppe Gut.

**Images:** hero reuses S-6 (`dispersing powder in water`). No new assets.

---

# Content record — `the-gut-skin-axis`

**H1:** The gut–skin axis
**Lead:** "Radiance from within" is our tagline. This page is where we explain how much of it is established science and how much of it is a phrase.

> **This is the highest-risk page on the site.** It sits directly on the brand's central promise, and it is the page most likely to be read closely by a regulator, a journalist or a competitor. Every sentence must be Tier A or Tier B per `02_brand_guidelines.md` §6. **Nothing on this page may state or imply that Steppe Gut affects skin.**

**Sections:**

**Where the idea comes from.** The observation that skin conditions and digestive conditions frequently occur together is old and reasonably robust. People with inflammatory bowel conditions have higher rates of certain skin conditions; some skin conditions respond to dietary change. Something connects them.

**What the proposed mechanisms are.** Three are commonly described: the gut's role in absorbing the nutrients skin is built from; immune signalling that originates in gut tissue and acts systemically; and the influence of gut bacteria on inflammation. Each is plausible. Each is also studied at very different levels of rigour, and none of them supports a simple "fix your gut, fix your skin" conclusion.

**What is genuinely established.** That certain nutrients are required for normal skin structure and function is not in dispute — vitamin C contributes to normal collagen formation, vitamin A contributes to the maintenance of normal skin, and severe deficiency of either produces visible skin effects. These are statements about nutrients, and they are the ground the phrase "from within" actually stands on.

**What is not.** That improving a diet already adequate in those nutrients produces visible skin change is not established. That any specific food or supplement improves skin appearance in a healthy adult is not established. That we can predict who would respond, or how long it would take, is not established.

**Why we still use the phrase.** "Natural radiance from within" describes what we think the product is *for* — nourishment rather than topical correction. It is a statement of intent and category, not a claim of effect, and we have written this page so that the distinction is available to anyone who wants to check it.

**PullQuote:** The connection is real. The shortcut is not.

**Practical takeaways:** Skin reflects overall nutrition over months, not days · Sleep and sun exposure outweigh almost any dietary change · Be sceptical of any before-and-after · Deficiency causes visible problems; surplus does not cause visible benefits · No supplement replaces a varied diet.

**Where Steppe Gut fits:** Steppe Gut contains vitamin C and vitamin A, naturally present in mare's milk. Those nutrients have established roles in normal skin function. We are not claiming, and will not claim, that taking Steppe Gut will change how your skin looks.

**What we don't know yet:** Almost all of it. The gut–skin axis is an area of active research with far more hypothesis than conclusion. We have run no studies of our own on this or anything else, and if you encounter a brand in this category speaking confidently about skin outcomes, the confidence is not coming from the evidence.

**Images:** hero reuses S-7. No new assets. **Do not add skin imagery, faces, or anything resembling a cosmetic advertisement to this page.**

---

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| < 768px | Single column throughout. `MediaTextRow` stacks image-first. `TipList` 1 column. `CardRail` shows 1.2 cards. Pull quote at `h2` size |
| 768–1023px | Media rows side-by-side, alternating. `TipList` 2 columns |
| ≥ 1024px | Prose at 680px / `72ch`; figures break out to 940px. Rail arrows appear |

## Accessibility notes

- One `<h1>` per article. Section headings `<h2>`, `TipList` titles `<h3>`
- `PullQuote` is a `<p>` and must not enter the outline
- `HonestLimits` heading is a real `<h2>` — it is a section, not a footnote
- Last-reviewed date uses `<time datetime="…">`
- Reading time is `caption`, `text-tertiary`, and stated as a range rather than a false precision ("about 6 minutes")
- These are the longest pages on the site; the heading outline must stand alone as navigation
- All figures carry real alt text — none of the images on these pages is decorative

## SEO notes

| Article | `<title>` | Target queries |
|---|---|---|
| Fermentation | Fermentation — What Four Days Does to Milk · Steppe Gut | "what is fermentation in milk", "how does kumis ferment", "is fermented milk probiotic" |
| The microbiome | The Gut Microbiome, Explained Plainly · Steppe Gut | "what is the gut microbiome", "can you improve your microbiome", "microbiome diversity diet" |
| Digestion & absorption | Digestion and Absorption — What Bioavailable Means · Steppe Gut | "what does bioavailable mean", "nutrient absorption supplements", "when to take supplements" |
| Gut–skin axis | The Gut–Skin Axis — What Is and Isn't Established · Steppe Gut | "gut skin axis", "does gut health affect skin", "supplements for skin evidence" |

- JSON-LD `Article` per page with `dateModified` bound to the real last-reviewed date, `author: Organization`
- Each article links to the other three plus `/how-it-works/` and `/our-story/our-research/`
- Canonical self. **No thin duplication** — the four articles must not share paragraphs

## Developer notes

- Route `/the-science/:slug`, lazy-loaded. Unknown slug → 404
- Content in `src/content/science/*.mdx` or a `src/data/scienceArticles.js` record, rendered through `Prose`
- Record shape: `{ slug, title, lead, lastReviewed, readingTime, sections[], pullQuote, takeaways[], steppeGutFits, honestLimits, heroImage, alt, readNext[] }`
- **`honestLimits` is a required field.** Make it non-optional in the type/schema so an article physically cannot ship without it. This is the cheapest possible enforcement of the site's most important editorial rule
- Only one new image across all four articles (S-8). Everything else reuses assets from the hub and `/how-it-works/`
- Reuses `PageHeader`, `MediaTextRow`, `Prose`, `PullQuote`, `TipList`, `HonestLimits`, `CardRail`, `ContentCard`, `NewsletterSignup`. No new components
- The gut–skin article must be reviewed against `02_brand_guidelines.md` §6 by a second person before it ships. It is the one page where a careless verb creates a regulatory exposure
