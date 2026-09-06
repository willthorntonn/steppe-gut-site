# Page — Journal `/journal/`

## Summary

Long-form editorial. This is Steppe Gut's replacement for the reference site's seasonal campaign landing pages — a set of eight one-off pages (winter guide, summer festival, BBQ tips, long-haul travel, and so on) that share one template and exist to give social campaigns somewhere to land.

**Why campaign pages are not replicated:** they are calendar-driven, and a pre-launch brand has no calendar. More importantly, they age badly — a "summer" page is wrong for nine months of the year, and a site with eight visibly stale pages looks abandoned. The Journal carries the same structural role (a home for editorial that is not product, science or lifestyle advice) with evergreen content that does not expire.

## Purpose

- **Goals:** brand storytelling, education, trust
- **Journey questions:** 2, 4
- **Audience:** returning visitors, newsletter subscribers, people who like the brand and want more of it
- **Intent:** "Something interesting to read"
- **Primary CTA:** an article
- **Secondary CTA:** newsletter signup

## Layout

`PageHeader align="center"` · `container` 1280px · `section-gap`.

## Section order

| # | Section | Component |
|---|---|---|
| 1 | Header | `PageHeader` |
| 2 | Latest | `FeaturedStoryCard` |
| 3 | Filter | `FilterTabs` |
| 4 | Archive | `CardGrid columns={3}` of `ContentCard` |
| 5 | Newsletter | `NewsletterSignup` |

---

# Copy

## 1. Header

> **Eyebrow:** Journal
> **Title (h1):** Journal
> **Lead:** Longer pieces about the steppe, the season, fermentation and the people we buy from. Published when there is something worth writing, which is not often.

> "Published when there is something worth writing, which is not often" sets the expectation that a sparse archive is intentional. It is the sentence that lets the Journal have four posts without looking neglected.

## 2. Latest

**Component:** `FeaturedStoryCard`, badge reading "Latest"

## 3. Filter

**Component:** `FilterTabs` — All · From the steppe · On fermentation · Notes from the company

Three categories only. More would imply more content than exists.

## 4. Archive

**Component:** `CardGrid columns={3}` of `ContentCard`, newest first, each with a date and reading time in `meta`.

**Launch article set (four pieces):**

| Category | Title | Excerpt |
|---|---|---|
| From the steppe | Five months, and then nothing | What a seasonal production year actually looks like from the inside — including the seven months when there is no product to make. |
| On fermentation | The vessel is the recipe | Why traditional fermentation cannot be reproduced from a starter culture, and what that means for a company trying to buy it consistently. |
| Notes from the company | Why we published what we don't know | The reasoning behind the honest-limits sections on every science page, and what happened when we showed them to people. |
| From the steppe | What we got wrong in the first year | Assumptions about supply, packaging and shelf life that did not survive contact with a Mongolian winter. |

> The fourth piece is the most valuable one on the list. A company willing to publish its own errors is doing something no competitor in this category does, and it costs nothing but nerve.

**Empty state:** "Nothing published yet." No placeholder cards.

## 5. Newsletter

**Component:** `NewsletterSignup` — the same block as the footer, reused inline. Copy per `01_navigation.md` §7.2.

---

## Responsive behaviour

1 column < 640px · 2 at `sm` · 3 at `lg`. `FeaturedStoryCard` badge shrinks below `lg`. `FilterTabs` scroll horizontally on mobile.

## Accessibility notes

- One `<h1>`. Card titles `<h3>`
- `FilterTabs` is `role="tablist"`; filtering updates `?category=` and announces the count via `aria-live`
- Dates as `<time datetime>`
- Grid is `<ul>`/`<li>`, one `<a>` per card

## SEO notes

- `<title>`: Journal · Steppe Gut
- Meta description: Longer pieces about the Mongolian steppe, fermentation, and running a seasonal supply chain.
- JSON-LD: `Blog` + `ItemList`
- `/journal/` and `/journal/:slug/` in `sitemap.xml`; an RSS feed at `/journal/feed.xml` is cheap and worth shipping
- Do not chase keywords here. The Journal exists for people who already know the brand

## Developer notes

- Route `/journal/`, lazy-loaded
- Article images come from each article's own hero — **the index generates no new assets of its own**
- Records in `src/data/journal.js` or `src/content/journal/*.mdx`
- Reuses `PageHeader`, `FeaturedStoryCard`, `FilterTabs`, `CardGrid`, `ContentCard`, `NewsletterSignup`. No new components
- Build in the final stage. **Do not ship this page with fewer than three articles** — a one-post blog is worse than no blog
