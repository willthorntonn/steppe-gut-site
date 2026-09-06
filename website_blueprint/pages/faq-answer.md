# Template — FAQ Answer `/faq/:slug/`

34 pages, one template. Generated from the same `src/data/faq.js` array as the hub.

## Summary

Each FAQ question gets its own URL. This is not redundancy — it is the single highest-leverage SEO structure available to a brand in an unfamiliar category, because the questions people type into search *are* the questions on this list, phrased almost identically.

The reference site does exactly this with 47 questions, and those pages are among its strongest search entry points.

## Purpose

- **Goals:** education, trust, conversion
- **Journey question:** varies
- **Audience:** a search arrival with one specific question and no knowledge of the brand
- **Intent:** "Answer this one thing"
- **Primary CTA:** varies by answer — the most relevant deeper page
- **Secondary CTA:** *All questions* → `/faq/`

## Layout

| Property | Value |
|---|---|
| Header | `PageHeader align="left"`, breadcrumbs Home / Questions / *question* |
| Body | `container-prose` 680px |
| Length | 100–300 words. **Longer than the accordion answer, shorter than an article** |
| Images | None |

## Fixed section order

| # | Section | Component | Notes |
|---|---|---|---|
| 1 | Question as `<h1>` | `PageHeader` | The `<h1>` is the question verbatim, phrased as a user would type it |
| 2 | The short answer | `Prose`, first paragraph, `body-lg` | **The answer must be complete in the first sentence.** A search arrival must not have to read further to get it |
| 3 | The longer explanation | `Prose`, 1–3 paragraphs | Context, caveats, why |
| 4 | Related questions | `CardGrid columns={2}`, text-only cards | 2–4 sibling questions |
| 5 | Where to go next | `MediaTextRow` compact, or a `Button link-arrow` | One route to the relevant depth page |
| 6 | All questions | `Button outline-forest` | Back to `/faq/` |

**Section 2 is a hard rule.** These pages exist because someone asked a direct question. Burying the answer under a preamble wastes the only thing the page is for.

---

## Worked example — `/faq/is-it-a-probiotic/`

**Breadcrumbs:** Home / Questions / Is it a probiotic?

**H1:** Is Steppe Gut a probiotic?

**Short answer:**
> No. Steppe Gut is a fermented food, not a probiotic. The low-temperature drying that makes the powder shelf-stable also ends the live culture, so what is in the sachet is the product of fermentation rather than a population of living organisms.

**Longer explanation:**
> A probiotic, properly defined, contains live micro-organisms in a known quantity, shown to survive to the point where they are meant to act. That is a specific and demanding definition, and most fermented foods do not meet it — including this one, and including a great many products sold as though they did.
>
> What fermentation leaves behind is still meaningful: lactose broken down, proteins partly unfolded, and the nutrients naturally present in mare's milk in a modified form. That is the argument for the product, and it is a modest one. It is set out in full on [How it works](/how-it-works/).
>
> We volunteer this because the word "fermented" is routinely used to imply "probiotic" in this category, and we would rather answer the question honestly than benefit from the confusion.

**Related questions:** What is actually in it? · Why mare's milk rather than cow's milk? · Will it improve my skin, energy or digestion?

**Where to go next:** Read how it works → `/how-it-works/`

---

## Worked example — `/faq/lactose-intolerant/`

**H1:** Is Steppe Gut suitable if I am lactose intolerant?

**Short answer:**
> Possibly, but we cannot tell you for certain, and you should treat it as a dairy product. Fermentation breaks down most of the lactose in mare's milk, but not all of it — lactose remains present and is declared in the ingredients.

**Longer explanation:**
> Lactose intolerance is a matter of degree rather than a binary. Many people who react to fresh milk tolerate yoghurt and other fermented dairy comfortably, because fermentation has already broken much of the lactose down. Steppe Gut is in the same category, and mare's milk starts with more lactose than cow's milk, so "most of it is broken down" still leaves a real amount.
>
> The practical guidance: if you tolerate plain yoghurt, you will probably tolerate this. If you react to dairy generally, or if you have a milk allergy rather than lactose intolerance, do not take it — a milk allergy is a different and more serious thing, and this product contains milk.
>
> The declared figures are on [What's inside](/products/whats-inside/). If you are unsure, take them to your doctor rather than to us.

**Related questions:** Does it contain milk? · What is actually in it? · Is it a probiotic?

**Where to go next:** See the full ingredients → `/products/whats-inside/`

---

## Copy rules for all 34

| Rule | Detail |
|---|---|
| The `<h1>` is the question | Phrased as a person would type it into a search box, including the brand name where natural ("Is Steppe Gut a probiotic?") |
| Answer in sentence one | No preamble. No "That's a great question" |
| Say "we don't know" where true | On timelines, health outcomes, medical suitability. See `02_brand_guidelines.md` §6 |
| Route medical questions to a doctor | Explicitly, without hedging, on every suitability answer |
| One outbound depth link minimum | These pages are the site's largest source of internal links |
| Never sell | The CTA is a route to information. The only commercial link is in the footer |

---

## Responsive behaviour

Single column throughout. Related-question cards: 1 column < 640px, 2 above. Prose at 680px from `lg`.

## Accessibility notes

- One `<h1>` — the question
- Breadcrumbs mandatory. This is the deepest, most-likely-to-be-landed-on page type on the site, and without breadcrumbs a search arrival has no route anywhere
- Related-question cards are `<ul>`/`<li>`, one `<a>` each
- No images, so no alt decisions
- The pages are short — verify the footer does not sit above the fold on a large desktop, which looks broken. Set a `min-height` on `<main>` of `60vh`

## SEO notes

| Element | Value |
|---|---|
| `<title>` | *The question verbatim* · Steppe Gut |
| Meta description | The first two sentences of the short answer |
| `<h1>` | The question verbatim |
| Canonical | Self. **The hub is not canonical for these pages, and these are not canonical for the hub.** They are different resources: one browses, one answers |
| JSON-LD | `QAPage` with a single `Question` and `acceptedAnswer`. **Not `FAQPage`** — `FAQPage` is for a page of many questions, `QAPage` is for one, and using the wrong one is a common structured-data error |
| Duplicate-content risk | Real, and managed by the answer here being a genuinely expanded version rather than the accordion string repeated. **If a question has no meaningful long answer, do not give it its own page** — link the hub anchor instead |
| Target queries | The question itself. These pages target long-tail informational intent almost exclusively |

## Developer notes

- Route `/faq/:slug`, lazy-loaded. Unknown slug → 404
- **Zero images across all 34 pages**
- Generated from `src/data/faq.js`. A record needs a `longAnswer` field to get its own page; records without one render only in the hub accordion and their links point to `/faq/#slug` instead
- **Enforce this in code:** the route should 404, and the sitemap should omit the URL, for any slug without a `longAnswer`. Otherwise the site ships 34 pages of which several are near-duplicates of the hub — which is exactly the thin-content pattern to avoid
- `related[]` is authored per record, not auto-generated by category. Hand-picked related questions are far more useful than same-category ones
- Reuses `PageHeader`, `Prose`, `CardGrid`, `ContentCard variant="text"`, `Button`. No new components
- Include every published FAQ answer URL in `sitemap.xml`
