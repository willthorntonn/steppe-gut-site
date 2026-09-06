# Template — Legal Pages

Covers four routes, one template: `/legal/terms/`, `/legal/privacy/`, `/legal/cookies/`, `/legal/promotions/`.

## Summary

Plain-prose legal documents. The reference site runs four equivalent pages and its version has two defects worth avoiding: **three of the four have no `<h1>`**, and one of them exists at two URLs. Steppe Gut ships one canonical URL per document, each with a proper heading structure.

The tone follows the rest of the site: plain English first, legally correct throughout. A legal page a customer can actually read is a trust asset, not just a compliance obligation.

## Purpose

- **Goals:** trust, compliance
- **Audience:** the cautious customer, the data-conscious visitor, and regulators
- **Intent:** "What am I agreeing to?"
- **Primary CTA:** none. These pages do not sell
- **Secondary CTA:** `/contact/`

## Layout

| Property | Value |
|---|---|
| Header | `PageHeader align="left"` with a last-updated date |
| Body | `container-prose` 680px |
| Type | `body` (16px), not `body-lg` — these are reference documents, read in fragments |
| Rhythm | `section-gap-sm` between numbered sections |
| Images | **None** |

## Fixed structure

| # | Element | Spec |
|---|---|---|
| 1 | `<h1>` | The document title. **Exactly one, on every page** |
| 2 | Last updated | `<time datetime>` in `caption` / `text-tertiary`, directly beneath the `<h1>` |
| 3 | Plain-English summary | A `sage-tint` panel, `radius-lg`, `p-6`, before the legal text. 3–5 bullet points |
| 4 | Contents | An anchor list of the numbered sections, on pages with more than six sections |
| 5 | Numbered sections | `<h2>` per section, numbered in the heading text ("1. Who we are") |
| 6 | Contact | A closing section naming the responsible party and how to reach them |

**Element 3 is the one that matters.** A short, honest summary above the legal text is the difference between a page that builds trust and one that signals that trust is not expected.

---

# `/legal/terms/` — Terms & Conditions

**H1:** Terms and conditions

**Plain-English summary:**
- These terms cover buying from this website and using it.
- We are S72 Strategic Co., Ltd. The product is imported and distributed in Thailand by YFamily Co., Ltd.
- You can return unopened packs within 14 days. We cannot take back opened food.
- This is a dietary supplement, not a medicine, and nothing on this site is medical advice.
- Thai law applies.

**Sections:** 1. Who we are · 2. About these terms · 3. Using this website · 4. Ordering · 5. Prices and payment · 6. Delivery · 7. Cancellation and returns · 8. The product · 9. Our liability · 10. Intellectual property · 11. Changes to these terms · 12. Governing law · 13. Contact

**Section 8 must contain, verbatim:**
> Steppe Gut is a dietary supplement. It is not a medicine and is not intended to diagnose, treat, cure or prevent any disease. It should not be used as a substitute for a varied and balanced diet. It contains milk. Thai FDA registration is in progress; registration details will be published on this site once issued. Nothing on this website is medical advice, and you should consult a qualified professional about any health concern.

# `/legal/privacy/` — Privacy Policy

**H1:** Privacy policy

**Plain-English summary:**
- We collect what we need to sell you something and reply to you. Nothing else.
- We do not sell your data to anyone, ever.
- You can ask us what we hold, correct it, or have it deleted. Email privacy@steppegut.com and we will respond within 30 days.
- We use analytics only if you agree to it, and the site works fine if you do not.
- Payment card details are handled by our payment provider and never reach us.

**Sections:** 1. Who we are and how to reach us · 2. What we collect · 3. Why we collect it and our lawful basis · 4. Who we share it with · 5. How long we keep it · 6. Where it is stored · 7. Your rights · 8. Cookies · 9. Children · 10. Changes · 11. Complaints

**Must comply with Thailand's Personal Data Protection Act (PDPA).** Sections 3 (lawful basis), 7 (data-subject rights) and 11 (complaints, including the right to complain to the PDPC) are PDPA requirements, not optional. **This document must be reviewed by a Thai-qualified lawyer before publication** — it is the one page on this site where a drafting error creates a statutory liability rather than a reputational one.

# `/legal/cookies/` — Cookie Policy

**H1:** Cookie policy

**Plain-English summary:**
- Some cookies are needed for the site to work. Those are always on.
- Everything else — analytics, anything from a social platform — is off until you turn it on.
- You can change your mind at any time using the link at the bottom of this page.
- We do not use advertising cookies.

**Sections:** 1. What cookies are · 2. Essential cookies · 3. Analytics cookies · 4. Third-party cookies · 5. Managing your preferences · 6. Changes

**Sections 2–4 each carry a table:** cookie name · purpose · provider · duration · type. Populate from the real cookie inventory, not from a template.

**At the foot:** a `Button outline-forest` — "Change your cookie preferences" — reopening the consent manager. **This must actually work.** A cookie policy with a dead preferences button is a compliance failure and an easily-noticed one.

# `/legal/promotions/` — Promotion Terms

**H1:** Promotion terms

**Plain-English summary:**
- Terms for competitions and promotions we run, listed newest first.
- Entering means you accept the terms for that specific promotion.
- Past promotions stay on this page so the terms remain checkable after they close.

**Structure:** an `Accordion`, one item per promotion, newest first, each with a date range in the heading. Each contains: eligibility · how to enter · dates · prize · selection and notification · publicity · data handling (linking `/legal/privacy/`) · the promoter's name and address.

**Empty state:** "No promotions are running at the moment. Past promotion terms will remain on this page after they close."

> Keeping closed promotions accessible rather than deleting them is a small, cheap credibility signal, and it is what the reference site does — the one structural decision on its legal pages worth copying outright.

---

## Responsive behaviour

Single column at every breakpoint. Prose at 680px from `lg`. Cookie tables scroll horizontally below `lg` with a focusable wrapper. Promotion accordion full-width.

## Accessibility notes

- **One `<h1>` per page.** The reference site's terms, privacy and sitemap pages have none — a defect this template exists partly to avoid
- Numbered sections use `<h2>` with the number in the heading text, so the number is announced
- The anchor contents list is a `<nav aria-label="On this page">` containing a `<ul>`
- Cookie tables are real `<table>`s with `<caption>` and `scope`
- Last-updated dates use `<time datetime>`
- Long documents: verify the heading outline works as standalone navigation
- The cookie-preferences button is a real `<button>` with an accessible name, not a styled link

## SEO notes

| Element | Value |
|---|---|
| `<title>` | Terms and Conditions · Steppe Gut *(pattern per page)* |
| Meta description | Plain-English summary sentence for each document |
| Robots | **Index, do not noindex.** Legal pages are a legitimacy signal to both users and search engines |
| JSON-LD | None |
| Canonical | Self, one URL per document. **Do not create a second cookie-policy URL** — the reference site has exactly this duplication and it is pure maintenance debt |
| Internal links | `/contact/`, and cross-links between the four |

## Developer notes

- Routes `/legal/terms/`, `/legal/privacy/`, `/legal/cookies/`, `/legal/promotions/`, all lazy-loaded
- **Redirect any legacy flat paths** (`/terms/`, `/privacy/`, `/cookies/`) to the `/legal/` versions with a 301, so only one URL per document is ever live
- Content as MDX in `src/content/legal/`, rendered through `Prose`, with frontmatter `{ title, lastUpdated, summary[] }`
- `lastUpdated` is **required** in frontmatter and rendered in the UI
- Company details from `src/data/company.js`; regulatory wording from `src/data/regulatory.js`
- Cookie tables generated from the real consent-manager configuration where possible, so the policy cannot drift from what the site actually sets
- Reuses `PageHeader`, `Prose`, `Accordion`, `ComparisonTable`, `Button`. No new components
- **The privacy policy requires Thai legal review before publication.** The others should be reviewed too; privacy is the one that is not optional
