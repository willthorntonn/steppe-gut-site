# Page — Sitemap `/sitemap/`

## Summary

A human-readable index of every page on the site. Cheap to build, genuinely useful on a site this deep, and — because it is generated from the same route data as the navigation — self-maintaining.

The reference site keeps one and links it from the footer. Its version has no `<h1>`, which is the one thing not to copy.

## Purpose

- **Goals:** trust (a site that shows you everything has nothing hidden)
- **Audience:** anyone who cannot find something; also search crawlers
- **Intent:** "Show me everything"
- **Primary CTA:** none

## Layout

| Property | Value |
|---|---|
| Header | `PageHeader align="left"` |
| Body | `container-content` 940px |
| Grid | 1 column < 640px · 2 at `sm` · 3 at `lg`, `gap-10` |
| Rhythm | `section-gap-sm` |
| Images | None |

## Structure

One column group per top-level section. Within each, an `<h2>` linking the section hub, then a `<ul>` of its children, with third-level children nested one level.

| Group | Contents |
|---|---|
| **Products** | All products · Daily Sachets · Capsules · Refill Pouch · What's Inside · Where to Buy |
| **How it works** | How It Works |
| **Our Story** | Our Story · The Steppe · How It's Made · Land & Herders · Our Research |
| **The Science** | The Science · Fermentation · The Microbiome · Digestion & Absorption · The Gut–Skin Axis · A Woman's Guide *(→ Your Monthly Cycle · Perimenopause · Menopause)* |
| **Wellbeing** | Wellbeing · Nourish · Rest · Movement · Calm · Ritual · Nutrients *(→ the six nutrient pages)* · Ways to Take It *(→ the six rituals)* |
| **Questions** | FAQ · *(all published FAQ answer pages, grouped by category)* |
| **Journal** | Journal · *(all articles)* |
| **Company** | Contact · Trade & Stockists · Press *(→ releases)* · Careers |
| **Legal** | Terms · Privacy · Cookies · Promotion Terms |

`/cart/`, `/checkout/`, `/checkout/confirmation/` and `/404` are excluded — they are not destinations.

## Copy

> **Eyebrow:** Index
> **Title (h1):** Sitemap
> **Lead:** Every page on this site, in one list. If something is not here, it does not exist.

**At the foot, in `caption` / `text-tertiary`:**
> There is also a machine-readable [XML sitemap](/sitemap.xml) for search engines.

## Styling

| Element | Spec |
|---|---|
| Group heading | `<h2>`, `h4` token, `forest`, with a 1px `gold` rule beneath, `mb-4` |
| Links | Inter 400, `body-sm`, `line-height 2`, `forest`; hover → 1px `gold` underline |
| Nested items | 16px indent, `text-secondary`, with a 4px `sage` square marker |

## Responsive behaviour

1 column < 640px · 2 at `sm` · 3 at `lg`. Groups flow naturally; **do not force equal column heights** — a balanced-columns layout reorders the groups visually and breaks the alphabetical/structural logic a reader is following.

## Accessibility notes

- One `<h1>` — "Sitemap"
- Each group is a `<nav>` with `aria-labelledby` pointing at its `<h2>`, or a `<section>` if a page of nine `<nav>` landmarks is judged too noisy. **Pick one and be consistent** — nine unlabelled navs is worse than none
- All lists are real `<ul>`/`<li>` with correct nesting
- Current page, if the visitor is somehow here, is not marked — this page is an index, not navigation state
- Link line-height of 2 gives adequate touch spacing on mobile without needing extra padding

## SEO notes

| Element | Value |
|---|---|
| `<title>` | Sitemap · Steppe Gut |
| Meta description | Every page on the Steppe Gut website, in one list. |
| `<h1>` | Sitemap |
| Robots | Index. This page is a legitimate internal-link hub |
| JSON-LD | None |
| Note | Distinct from `/sitemap.xml`, which is generated separately for crawlers. Both should exist, and this page should link to that one |

## Developer notes

- Route `/sitemap/`, lazy-loaded
- **Generated from the same route manifest that drives the navigation and `sitemap.xml`** — `src/data/routes.js`. This is the whole point: a hand-maintained sitemap page goes stale within a month, and a stale sitemap is a worse signal than no sitemap
- FAQ answer pages are included **only where a `longAnswer` exists** — matching the rule in `faq-answer.md`, so this page never links to a 404
- Retailer, press and journal entries render only when their data arrays are non-empty
- Reuses `PageHeader`, `Container`. No new components
- Half an hour of work once `routes.js` exists. Build it in the final stage
