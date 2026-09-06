# Page — Trade & Stockists `/stockists/`

## Summary

The B2B page. Pharmacies, clinics, spas, health stores and hotel retail. The reference site keeps an equivalent trade page and it is instructive mainly for what it gets right: **it sells to the buyer's problem, not the consumer's.** A retail buyer does not care about radiance; they care about margin, turn, shelf life, minimum order and whether the product moves.

Written in the same voice as the rest of the site — plain, unexaggerated — but organised around commercial facts.

## Purpose

- **Goals:** conversion (B2B), trust
- **Audience:** pharmacy owners, clinic managers, spa buyers, independent health retailers
- **Intent:** "Is this worth shelf space and what are the terms?"
- **Primary CTA:** *Request wholesale terms* → email
- **Secondary CTA:** *Download the trade pack* → PDF

## Layout

| Property | Value |
|---|---|
| Header | `PageHeader align="left"` |
| Body | `container` for rows, `container-content` for tables |
| Rhythm | `section-gap` |
| Length | Short. A buyer scans; they do not read |

## Section order

| # | Section | Component | Why |
|---|---|---|---|
| 1 | Header | `PageHeader` | States what the page is for in one line |
| 2 | The proposition | `TipList columns={2}` | Six commercial facts, scannable in fifteen seconds |
| 3 | The range | `ComparisonTable` | Formats, pack sizes, cases, shelf life |
| 4 | Terms | `Accordion` | MOQ, lead time, payment, returns, exclusivity |
| 5 | Quality and compliance | `ComparisonTable` | The testing table, reused. Buyers ask this first |
| 6 | Who it sells to | `MediaTextRow` | The consumer proposition, briefly, so the buyer can picture the customer |
| 7 | Request terms | `Field` set + trade pack download | The conversion |

---

# Copy

## 1. Header

> **Eyebrow:** Trade
> **Title (h1):** Stocking Steppe Gut
> **Lead:** Wholesale information for pharmacies, clinics, spas and independent retailers in Thailand. Terms, pack formats, lead times and compliance, on one page.

## 2. The proposition

**Component:** `TipList columns={2}`

| Title | Body |
|---|---|
| A category with no incumbent | Fermented mare's milk is effectively unrepresented in Thai retail. There is no shelf leader to displace and no price war to enter. |
| Three formats, one formula | Sachet box, capsule bottle, refill pouch. One product to explain, three price points to stock. |
| Long shelf life | 24 months unopened for sachets and capsules. Full detail in the range table below. |
| Consumer education is done for you | This site carries the full category explanation, the ingredient transparency and the FAQ. Your staff can point at it rather than learn it. |
| Batch traceability | Every pack carries its batch and season, and a certificate of analysis is available for any batch on request. |
| We do not undercut our stockists | Direct pricing on this site matches recommended retail. We are not going to compete with you on price. |

> That last row is the most persuasive item on the page. Retail buyers' first objection to a DTC brand is channel conflict, and answering it before it is raised removes the main reason to say no.

## 3. The range

**Component:** `ComparisonTable`

| | Daily Sachets | Capsules | Refill Pouch |
|---|---|---|---|
| Retail unit | 25 × 10 g box | 90 capsules | 250 g pouch |
| Case quantity | 12 boxes | 12 bottles | 6 pouches |
| Case barcode | EAN-13 | EAN-13 | EAN-13 |
| Shelf life, unopened | 24 months | 24 months | 18 months |
| Storage | Ambient, dry, out of direct sun | Ambient, dry | Ambient, dry |
| Retail unit dimensions | — | — | — |
| RRP | — | — | — |

> **All figures are to be confirmed with the client before publication.** Shelf-life and case-quantity figures published on a trade page are treated as commitments by buyers. Do not populate this table with estimates.

## 4. Terms

**Component:** `Accordion`, 6 items

| Heading | Content |
|---|---|
| Minimum order | Confirmed on application. We keep it low for a first order — the point of a first order is to find out whether it sells. |
| Lead time | Stock held in Bangkok. Normally dispatched within three working days of a confirmed order. |
| Payment terms | Pro forma on the first order. Credit terms considered after a trading history is established. |
| Returns | We take back unsold stock within 60 days of a first order, once. After that, standard terms apply. We would rather you tried it than over-committed. |
| Exclusivity | We do not offer territorial exclusivity and we do not intend to. |
| Merchandising | Shelf talkers, a counter card and product photography are available at no cost. We do not charge for point of sale. |

## 5. Quality and compliance

**Component:** `ComparisonTable` — **reuse the testing table from `/our-story/how-its-made/` §3.** Do not rewrite it.

**Above the table:**
> Every batch is tested before release in Mongolia and again on import.

**Below the table:**
> **Regulatory status:** Thai FDA registration is in progress and has not yet been issued. We will not supply trade stock ahead of registration, and we will publish the registration number here and on the pack the day it is issued. If a supplier tells you their registration is complete, ask for the number.

> That last sentence is aimed squarely at a buyer's own risk. It is honest, it is useful to them, and it quietly differentiates.

## 6. Who it sells to

**Component:** `MediaTextRow`, image left (reuse a product asset)

> **Eyebrow:** The customer
> **Heading:** Who buys it
> **Body:**
> Women in their thirties and forties, already spending on skincare and supplements, who want something with a clear origin and a full ingredient declaration. They tend to research before buying, which is why this site is built the way it is.
>
> The sachet box is the entry format and the one to stock first.
>
> **CTA:** See the consumer site → `/products/`

## 7. Request terms

**Component:** `Field` set inside `container-narrow` 520px, plus a download

| Field | Type | Required |
|---|---|---|
| Business name | text | yes |
| Contact name | text | yes |
| Email address | email | yes |
| Phone number | tel | yes |
| Type of business | select — Pharmacy · Clinic · Spa · Health store · Hotel/resort · Other | yes |
| Number of locations | number | no |
| Message | textarea | no |

> **Heading:** Request wholesale terms
> **Body:** Tell us a little about your business and we will send the trade price list and terms.
> **Submit:** Request terms
> **Below:** Or email trade@steppegut.com directly.

**Trade pack download:** `Button outline-forest` — "Download the trade pack (PDF, 2.4 MB)". State the format and size in the label; a buyer on mobile data deserves to know before they tap.

---

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| < 768px | `TipList` 1 column. Both tables scroll horizontally, first column sticky. Form full-width |
| 768–1023px | `TipList` 2 columns. Tables still scroll |
| ≥ 1024px | Tables fit at `container-content`. Form at 520px |

## Accessibility notes

- One `<h1>`. `TipList` and accordion headings `<h3>`
- Both tables are real `<table>`s with `<caption>` and `scope`; scroll wrappers are focusable named regions
- Download link states file type and size in its accessible name
- Form follows the standard pattern: visible labels, error summary at the top, `aria-live` status
- Do not wire the form to an endpoint until a backend exists — same rule as `/contact/` and `/checkout/`

## SEO notes

| Element | Value |
|---|---|
| `<title>` | Trade & Stockists — Wholesale Enquiries · Steppe Gut |
| Meta description | Wholesale information for Thai pharmacies, clinics, spas and retailers: pack formats, case quantities, shelf life, terms and compliance. |
| `<h1>` | Stocking Steppe Gut |
| JSON-LD | `Organization` with a `contactPoint` of `contactType: "sales"` |
| Internal links | `/products/`, `/our-story/how-its-made/`, `/products/whats-inside/`, `/contact/` |
| Target queries | "fermented mare's milk wholesale Thailand", "supplement distributor Bangkok", "Steppe Gut trade" |
| Note | Low volume, high value. This page will get very little traffic and the traffic it gets is worth more than any other page's |

## Developer notes

- Route `/stockists/`, lazy-loaded
- **No new images** — reuse existing product photography
- Testing table content from `src/data/testing.js`, shared with `/our-story/how-its-made/`
- Range table from `src/data/products.js` extended with `caseQty`, `shelfLife`, `barcode` fields
- Regulatory wording from `src/data/regulatory.js`
- The trade pack PDF is a supplied asset. **Check it is not stale before each release** — a PDF with last year's pricing is a common and expensive oversight
- Reuses `PageHeader`, `TipList`, `ComparisonTable`, `Accordion`, `MediaTextRow`, `Field`, `Button`. No new components
- Confirm every figure in §3 and every term in §4 with the client before publishing
