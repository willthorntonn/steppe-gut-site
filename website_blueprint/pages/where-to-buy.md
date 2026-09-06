# Page — Where to Buy `/where-to-buy/`

## Summary

The commercial hub reached from the primary nav's "Buy" item. Its job is to route to whichever purchase channel the visitor prefers — direct, marketplace, or physical retail — without pushing any of them.

The reference site's equivalent is purely a retailer list, because that brand sells only through retail. Steppe Gut sells direct as well, so this page carries both: **buy direct first, then everywhere else.** Direct comes first because it is the only channel where the education this site has done travels with the purchase.

## Purpose

- **Goals:** conversion
- **Journey question:** 7
- **Audience:** decided, or nearly
- **Intent:** "Where do I get it?"
- **Primary CTA:** *See the products* → `/products/`
- **Secondary CTA:** retailer links

## Layout

| Property | Value |
|---|---|
| Header | `PageHeader align="center"` |
| Body | `container-content` 940px |
| Rhythm | `section-gap` |

## Section order

| # | Section | Component |
|---|---|---|
| 1 | Header | `PageHeader` |
| 2 | Buy direct | `CardGrid columns={3}` of `ProductCard` |
| 3 | Online marketplaces | `RetailerGrid` |
| 4 | Pharmacies and stores | `RetailerGrid` + note |
| 5 | Delivery and returns | `Accordion` |
| 6 | Trade enquiries | `MediaTextRow` compact |
| 7 | Closing CTA | `ClosingCTA` |

---

# Copy

## 1. Header

> **Eyebrow:** Buy
> **Title (h1):** Where to buy
> **Lead:** Direct from us, from a marketplace, or from a pharmacy. The price is the same wherever you buy it — we do not run channel-specific pricing.

## 2. Buy direct

**Component:** `CardGrid columns={3}` of `ProductCard` — the same three cards as `/products/`, reading from the same data.

> **Heading:** Direct from us
> **Sub:** Two to four working days across Thailand.

## 3. Online marketplaces

**Component:** `RetailerGrid` — a grid of logo tiles

| Property | Value |
|---|---|
| Grid | 2 cols < 640px · 3 at `sm` · 4 at `lg`, `gap-4` |
| Tile | `cream-raised`, `radius-md`, `border-subtle`, `aspect-[3/2]`, logo centred at `max-h-[40px]`, greyscale at rest going to full colour on hover |
| Link | Whole tile is an `<a>`, `target="_blank" rel="noopener noreferrer"`, `aria-label="Buy Steppe Gut on <retailer> (opens in a new tab)"` |

> **Heading:** Online marketplaces
> **Sub:** Listed here once each store is live. *(Render only the channels that actually exist — an empty or placeholder tile is worse than a shorter list.)*

**Placeholder set to populate:** Shopee · Lazada · LINE Shopping

## 4. Pharmacies and stores

**Component:** `RetailerGrid` + a note

> **Heading:** Pharmacies and stores
> **Sub:** Physical retail is being confirmed. When a store stocks us it will be listed here with its branches.
>
> **Note:** We are not going to list a retailer before they are stocking us. If this section is empty, it is empty because it is true.

> That note replaces the usual "coming soon to a store near you" pattern. It costs nothing and it is consistent with the rest of the site's refusal to claim things in advance.

## 5. Delivery and returns

**Component:** `Accordion`, 5 items

| Question | Answer |
|---|---|
| How long does delivery take? | Two to four working days anywhere in Thailand. Bangkok is usually two. |
| How much is delivery? | A flat rate per order, shown at checkout before payment. Free above a threshold, also shown at checkout. |
| Can I return it? | Unopened packs within 14 days, in resalable condition. We cannot accept opened food products back — that is a safety requirement rather than a policy choice. |
| What if it arrives damaged? | Photograph it and email us. We will replace it, and we will not ask you to return the damaged pack. |
| Do you ship outside Thailand? | Not at present. |

## 6. Trade enquiries

**Component:** compact `MediaTextRow`

> **Eyebrow:** Trade
> **Heading:** Stocking Steppe Gut
> **Body:** If you run a pharmacy, clinic, spa or store and want to carry it, there is a page with the wholesale detail.
> **CTA:** Trade and stockists → `/stockists/`

## 7. Closing CTA

**Component:** `ClosingCTA`, shared bookend

> **Heading:** Start with the sachets
> **Body:** Twenty-five mornings, delivered.
> **Primary:** See the products → `/products/`
> **Secondary:** Read the questions → `/faq/`

---

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| < 640px | Product grid 1 column. Retailer tiles 2 across. Accordion full-width |
| 640–1023px | Product grid 2 columns, retailer tiles 3 across |
| ≥ 1024px | Product grid 3 columns, retailer tiles 4 across |

## Accessibility notes

- One `<h1>`
- **Greyscale-at-rest retailer logos must still meet contrast against the tile background**, and hover-to-colour must not be the only way to identify a retailer — each tile carries the retailer name as visible text beneath the logo, not only in the `aria-label`
- External links announce that they open in a new tab, in the accessible name
- Accordion triggers are `<button>` inside `<h3>`
- If a section has no retailers, render the honest note rather than an empty grid — an empty `<ul>` announced as a list of zero items is confusing

## SEO notes

| Element | Value |
|---|---|
| `<title>` | Where to Buy Steppe Gut in Thailand |
| Meta description | Buy Steppe Gut fermented mare's milk direct, or from listed marketplaces and pharmacies. Delivery in two to four working days across Thailand. |
| `<h1>` | Where to buy |
| JSON-LD | `ItemList` of the three products. Add `Organization` with `areaServed: TH` |
| Internal links | `/products/` and 3 PDPs, `/stockists/`, `/faq/` |
| Target queries | "buy fermented mare's milk Thailand", "Steppe Gut where to buy", "mare's milk supplement Bangkok" |

## Developer notes

- Route `/where-to-buy/`, lazy-loaded
- **No new images.** Product cards reuse the shared product assets; retailer logos are supplied SVGs
- Retailer list in `src/data/retailers.js`: `{ name, logo, url, type: 'marketplace' | 'pharmacy', live: boolean }`. **Only render entries where `live === true`**
- Delivery and returns content is shared with `/faq/` (Ordering & delivery category) and `/legal/terms/` — source from `src/data/delivery.js`
- Reuses `PageHeader`, `CardGrid`, `ProductCard`, `Accordion`, `MediaTextRow`, `ClosingCTA`. `RetailerGrid` is the only new component and it is trivial
- Do not build this page before the direct-purchase flow exists, or its primary section is a dead end
