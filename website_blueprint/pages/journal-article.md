# Template — Journal Article `/journal/:slug/`

## Summary

Long-form editorial, 800–1,500 words. The most typographically ambitious template on the site and the only one where the writing is allowed to be the point rather than the vehicle.

## Purpose

- **Goals:** brand storytelling, trust
- **Journey questions:** 2, 4
- **Audience:** people who already like the brand
- **Intent:** "Read something good"
- **Primary CTA:** newsletter signup
- **Secondary CTA:** the next article

## Layout

| Property | Value |
|---|---|
| Opening | Full-bleed hero image, then title beneath it in `container-prose` — **not** overlaid. Editorial pieces earn a quiet title treatment |
| Body | `container-prose` 680px at `72ch` |
| Figures | Break out to `container-content` 940px; occasionally full-bleed |
| Rhythm | `section-gap-sm` between sections; generous paragraph spacing |
| Type | `body-lg` (19px desktop), line-height 1.72. The most comfortable reading setting on the site |

## Fixed section order

| # | Section | Component |
|---|---|---|
| 1 | Full-bleed hero image | `Figure` full-bleed |
| 2 | Eyebrow, `<h1>`, standfirst, date, reading time | `PageHeader align="left"` |
| 3 | Body — 4–8 sections with `<h2>` subheads | `Prose` |
| 4 | 1–3 inline figures | `Figure` |
| 5 | One pull quote | `PullQuote` |
| 6 | Author note | `Prose`, `caption` |
| 7 | Read next | `CardRail` |
| 8 | Newsletter | `NewsletterSignup variant="inline"` |

---

## Copy rules

| Rule | Detail |
|---|---|
| Standfirst carries the piece | 2–3 sentences. A reader should be able to decide from it alone |
| First person plural is permitted here | "We assumed…", "We got this wrong". The only template on the site where the company speaks as a *we* with a viewpoint |
| Specificity over sentiment | A named month, a real number, an actual thing that happened. This is what separates a journal from a brand blog |
| No product mention above the halfway point | And at most one anywhere. The Journal is not a sales channel |
| No claims | Same discipline as everywhere else. An essay is not an exemption |
| Admit error where there was one | The most valuable thing this template can publish |

## Author note

A short paragraph at the foot, in `caption` / `text-secondary`, above a 1px `border-subtle`:

> Written by the Steppe Gut team. If we have got something wrong here, tell us at hello@steppegut.com and we will correct it and say that we did.

**This appears on every article.** It is the same correction commitment made on `/the-science/`, applied to editorial.

---

## Worked example — `what-we-got-wrong-in-the-first-year`

**Eyebrow:** From the steppe · *date* · about 8 minutes

**H1:** What we got wrong in the first year

**Standfirst:**
> We planned a supply chain on a spreadsheet and then took it to Töv Province in October. Three of our assumptions did not survive the trip, and one of them we did not discover until the following spring.

**Sections:** The season is shorter than the data said · Fermentation is not a process we can specify · The packaging decision we could not solve · What we changed, and what we simply accepted

**PullQuote:** We had budgeted for a supply chain. What we had was a relationship with eleven families and a weather forecast.

**Images:** reuse `src/assets/story/*` — O-2, O-3, O-10. **No new assets.**

---

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| < 768px | Hero `aspect-[4/3]` to preserve height on a narrow screen. Prose full-width at 20px padding. Figures full-width |
| 768–1023px | Hero `aspect-[16/9]`. Prose at 640px |
| ≥ 1024px | Prose at 680px. Figures break out to 940px. Pull quote at `display-2` |

## Accessibility notes

- One `<h1>`. Subheads `<h2>` — with 4–8 of them, the outline must work as a table of contents
- Breadcrumbs: Home / Journal / *title*
- The hero is **informational** here, not decorative — it carries real alt text
- `PullQuote` is a `<p>` unless it quotes an identified person, in which case `<blockquote>` with `<cite>`
- Date as `<time datetime>`
- Reading time stated as a range ("about 8 minutes")
- Figure captions are `<figcaption>`, and must not duplicate the alt text — the alt describes the image, the caption adds information

## SEO notes

- `<title>`: *Article title* · Steppe Gut Journal
- Meta description: the standfirst, trimmed to ~155 characters
- JSON-LD `Article` with `headline`, `datePublished`, `dateModified`, `author`, `image`, `wordCount`
- OG image: the hero, 1200 × 630 crop
- Canonical self. Links to `/journal/`, 2–3 other articles, and at most one product or story page

## Developer notes

- Route `/journal/:slug`, lazy-loaded. Unknown slug → 404
- Content as MDX in `src/content/journal/`, rendered through `Prose`, with frontmatter `{ title, standfirst, date, category, readingTime, heroImage, alt, readNext[] }`
- **Reuse existing story and science imagery wherever possible.** A journal piece is not a reason to commission a new shoot; the article set above needs zero new assets
- Reuses `Figure`, `PageHeader`, `Prose`, `PullQuote`, `CardRail`, `ContentCard`, `NewsletterSignup`. No new components
- This template has the most generous typography on the site. If `Prose` needs a `size="editorial"` variant to get there, add it here rather than overriding styles locally
