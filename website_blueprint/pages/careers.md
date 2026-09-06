# Page — Careers `/careers/`

## Summary

A single lightweight page. The reference site's careers page is a vacancy list with no vacancies and no `<h1>` — a page that exists because the footer links to it. Steppe Gut's version does one useful thing instead: it says who the company is to work for, honestly, and gives a route in when there is nothing open.

## Purpose

- **Goals:** trust
- **Audience:** prospective employees; also, in practice, journalists and investors judging the company's size and seriousness
- **Intent:** "Is there a job, and what is this place like?"
- **Primary CTA:** speculative application email
- **Secondary CTA:** *Our story* → `/our-story/`

## Layout

`PageHeader align="left"` · `container-prose` for narrative, `container-content` for the vacancy list · `section-gap` · short.

## Section order

| # | Section | Component |
|---|---|---|
| 1 | Header | `PageHeader` |
| 2 | Open roles | `CardGrid columns={2}` or an honest empty state |
| 3 | What it is like here | `TipList columns={2}` |
| 4 | Speculative applications | `MediaTextRow` compact |

---

# Copy

## 1. Header

> **Eyebrow:** Careers
> **Title (h1):** Working here
> **Lead:** We are a small team launching an unfamiliar product in a new market. That is the honest description of the job, whichever job it is.

## 2. Open roles

**With vacancies:** `CardGrid columns={2}` of `ContentCard variant="text"` — title, location, type, one-line summary, "Read the role" → a role detail page or an email link.

**Without vacancies (the launch state):**

**Component:** a `sage-tint` panel, `radius-lg`, `p-8`, `container-content`

> **Heading:** Nothing open at the moment
> **Body:** We are not currently hiring. When we are, roles will be listed here and nowhere else first. If you want to be considered when something opens, there is a note below on how to do that.

> No "we are always looking for talented people" filler. If there is nothing open, the page says so.

## 3. What it is like here

**Component:** `TipList columns={2}`

| Title | Body |
|---|---|
| Small, and it will stay small for a while | You will do things outside your job title. That is either appealing or it is not, and it is better to know now. |
| Two countries, two time zones | Production is in Mongolia, the market is Thailand, and the working day accommodates both. |
| We write things down | Decisions, reasoning, what we tried. It is how a small team avoids repeating itself. |
| We do not overclaim, internally either | The same discipline we apply to the product applies to progress reports. Bad news early is worth more than good news late. |
| Seasonal business, uneven year | Five months of production drives everything. Some months are quiet and some are not. |
| No equity story yet | We are not going to describe a compensation package we have not designed. |

## 4. Speculative applications

**Component:** compact `MediaTextRow`, no image

> **Heading:** If you want to be considered anyway
> **Body:** Email careers@steppegut.com with what you do and what you would want to work on. Two paragraphs is plenty — we would rather read something specific than a general CV. We read everything and we reply, though not always quickly.
> **CTA:** careers@steppegut.com *(mailto link)*

---

## Responsive behaviour

1 column < 640px, 2 above for both grids. Prose at 680px from `lg`.

## Accessibility notes

- One `<h1>` — "Working here". **The reference site's careers page has no `<h1>` at all**; that is a defect worth not repeating
- The empty state is a real `<section>` with a heading, not an unlabelled paragraph
- Email is a `mailto:` link with a pre-filled subject
- If a vacancy list is rendered, it is `<ul>`/`<li>`

## SEO notes

| Element | Value |
|---|---|
| `<title>` | Careers at Steppe Gut |
| Meta description | We are a small team launching fermented mare's milk in Thailand. Current openings, what it is like here, and how to apply speculatively. |
| `<h1>` | Working here |
| JSON-LD | `JobPosting` **only when a real vacancy exists**, with `datePosted`, `validThrough`, `hiringOrganization` and `jobLocation`. Emitting `JobPosting` for a nonexistent role is a structured-data violation |
| Internal links | `/our-story/`, `/contact/` |

## Developer notes

- Route `/careers/`, lazy-loaded
- **No images**
- Vacancies from `src/data/careers.js`. When the array is empty, render the empty state — do not render an empty grid
- `JobPosting` JSON-LD emitted conditionally on a non-empty array
- Reuses `PageHeader`, `CardGrid`, `ContentCard variant="text"`, `TipList`, `MediaTextRow`. No new components
- Half a day of work. Build it in the final stage
