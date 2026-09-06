# Template — Press Release `/press/:slug/`

## Summary

Individual press releases. A deliberately plain template — a release is a document, not a landing page.

## Purpose

- **Goals:** trust
- **Audience:** journalists, and occasionally customers arriving from a link
- **Intent:** "Read the announcement and get the contact"
- **Primary CTA:** press contact
- **Secondary CTA:** *All press* → `/press/`

## Layout

| Property | Value |
|---|---|
| Header | `PageHeader align="left"`, breadcrumbs Home / Press / *title* |
| Body | `container-prose` 680px |
| Images | One optional hero, plus a downloadable image pack link. No decorative imagery |
| Rhythm | `section-gap-sm` — this is a document |

## Fixed section order

| # | Section | Component | Notes |
|---|---|---|---|
| 1 | Eyebrow: "Press release" + date | `PageHeader` | Date as `<time datetime>` |
| 2 | Headline as `<h1>` | `PageHeader` | Factual, not promotional |
| 3 | Standfirst | `Prose` lead, `body-lg` | One or two sentences carrying the whole story |
| 4 | Body | `Prose` | 300–600 words, inverted pyramid |
| 5 | Quote | `PullQuote` | Attributed, with name and role |
| 6 | Notes to editors | `TipList columns={1}` | Boilerplate company facts |
| 7 | Press contact | `ContactPanel` compact | Repeated on every release |
| 8 | Images for this release | `Button outline-forest` | Direct download |
| 9 | More releases | `CardGrid columns={2}` | |

**Section 6 is boilerplate and identical on every release** — the same five facts, sourced from `src/data/company.js`. A journalist expects to find it and expects it not to vary.

---

# Worked example

**Eyebrow:** Press release · *date*

**H1:** Steppe Gut brings fermented mare's milk to Thailand

**Standfirst:**
> Steppe Gut, a supplement made from fermented mare's milk sourced in Töv Province, Mongolia, launches in Thailand this year in three formats. The company says Thai FDA registration is in progress and will not be claimed until issued.

**Body:**
> Fermented mare's milk is an everyday food across Mongolia, where mares are milked on open grassland between June and October and the milk is fermented in wooden vessels over several days. It is almost unknown outside the region, largely because the fresh product spoils within days and no supply chain existed to move it.
>
> Steppe Gut buys fermented milk directly from a small number of herding families in Töv Province, at a price agreed before each season begins. The milk is dried at low temperature in Mongolia, tested, and exported as a powder in three formats: a 25-day sachet box, a 90-capsule bottle and a 250 g refill pouch.
>
> The company has taken an unusually restrictive position on claims. Its website publishes a page setting out what is and is not established about fermented mare's milk, states that the product is not a probiotic because low-temperature drying ends the live culture, and declines to give a timeline for any effect.
>
> "The category is unfamiliar here, and the temptation is to fill that gap with confident language," a company spokesperson said. "We would rather publish what we don't know and let people decide."
>
> Steppe Gut is manufactured by Monsubi Foods LLC in Mongolia and imported by YFamily Co., Ltd. of Bangkok. The brand is owned by S72 Strategic Co., Ltd.

**PullQuote:**
> We would rather publish what we don't know and let people decide.
> — *name, role*

**Notes to editors (boilerplate):**
| | |
|---|---|
| About Steppe Gut | A dietary supplement made from fermented mare's milk sourced in Töv Province, Mongolia. Available in three formats. |
| Origin | Product of Mongolia. Manufactured by Monsubi Foods LLC. |
| Thailand | Imported and distributed by YFamily Co., Ltd., Bangkok. Brand owned by S72 Strategic Co., Ltd. |
| Regulatory | Thai FDA registration is in progress and has not been issued. The product is a dietary supplement and no health claims are made for it. |
| Allergens | Contains milk. |

**Press contact:** press@steppegut.com · +66 97 251 5911

---

## Copy rules

| Rule | Detail |
|---|---|
| Headline is factual | What happened, not why it is exciting |
| Standfirst carries the story | A journalist should be able to file from it alone |
| Inverted pyramid | Most important first. Assume they stop reading at any point |
| Quotes are attributed to a named person and role | An unattributed quote is not usable |
| **The regulatory line appears in every release** | Non-negotiable. It travels with the story |
| No claims | The same claim discipline as the rest of the site, applied to a document that will be reproduced verbatim |

---

## Responsive behaviour

Single column throughout. Prose at 680px from `lg`. Release cards 1 column then 2.

## Accessibility notes

- One `<h1>` — the headline
- Date as `<time datetime="…">`
- `PullQuote` is a `<blockquote>` here (unlike elsewhere on the site) because it is a genuine attributed quotation, with `<cite>` for the attribution
- Breadcrumbs mandatory
- Download link states format and size
- Notes-to-editors is a definition-style table with `scope="row"`

## SEO notes

- `<title>`: *Headline* · Steppe Gut Press
- JSON-LD `NewsArticle` with `headline`, `datePublished`, `publisher`, `image`
- Canonical self
- Links to `/press/`, `/our-story/`, `/our-story/our-research/`
- Include in `sitemap.xml`

## Developer notes

- Route `/press/:slug`, lazy-loaded. Unknown slug → 404
- Records in `src/data/press.js`: `{ slug, date, headline, standfirst, body, quote: {text, name, role}, imagePack?, heroImage? }`
- **Notes-to-editors is rendered from `src/data/company.js` and `src/data/regulatory.js`, never authored per release.** This guarantees the regulatory line is current in every release, including old ones — which matters, because journalists find old releases
- No new components
- Reuses `PageHeader`, `Prose`, `PullQuote`, `TipList`, `ContactPanel`, `CardGrid`, `Button`
