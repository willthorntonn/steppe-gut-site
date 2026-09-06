# Page — Press `/press/`

## Summary

The media hub: press contact, downloadable media pack, company facts, and the release archive. The reference site maintains one and its structure is sound — contact and assets first, releases second. Journalists arriving here want an image and a phone number, not a narrative.

> **Structural note carried from the analysis:** the reference site runs *two* media hub pages at different URLs, one of which is an orphaned duplicate of the other. That is a real maintenance failure and a live reminder to keep this a single canonical URL.

## Purpose

- **Goals:** trust
- **Audience:** journalists, editors, bloggers
- **Intent:** "Give me assets, facts and a contact, quickly"
- **Primary CTA:** *Download the media pack*
- **Secondary CTA:** press email

## Layout

`PageHeader align="left"` · `container-content` 940px · `section-gap` rhythm · short.

## Section order

| # | Section | Component |
|---|---|---|
| 1 | Header | `PageHeader` |
| 2 | Press contact | `ContactPanel` single column |
| 3 | Media pack | `CardGrid columns={3}` of download cards |
| 4 | Company facts | `ComparisonTable` |
| 5 | Approved language | `TipList columns={1}` |
| 6 | Releases | `CardGrid columns={2}` of `ContentCard` |

---

# Copy

## 1. Header

> **Eyebrow:** Press
> **Title (h1):** Press
> **Lead:** Assets, company facts and a contact. If you need something that is not here, email us and we will send it the same day where we can.

## 2. Press contact

> **Email:** press@steppegut.com
> **Phone:** +66 97 251 5911
> **Response:** Same working day for deadline enquiries. Say so in your subject line and we will prioritise it.
> **Samples:** Available for review. Tell us the format you want and where to send it.

## 3. Media pack

**Component:** `CardGrid columns={3}` of download cards — `cream-raised`, `radius-md`, `border-subtle`, `p-6`, each with a `download` icon, a title, a `caption` line stating format and size, and a `Button outline-forest`.

| Card | Contents | Format |
|---|---|---|
| Logo pack | Circular and landscape lockups, green and gold, SVG and PNG, with clear-space guidance | ZIP, ~4 MB |
| Product photography | All three formats, high resolution, on white and on the brand set | ZIP, ~28 MB |
| Origin photography | Steppe, herders and production imagery, with usage notes | ZIP, ~34 MB |

**Below the grid:**
> All assets may be used editorially without further permission, with the credit *Steppe Gut*. Please do not alter the logo, recolour it, or place it on a background that is not in the guidance. Product imagery must not be composited to imply a health outcome.

## 4. Company facts

**Component:** `ComparisonTable`, two columns

| | |
|---|---|
| Brand | Steppe Gut |
| Product | Fermented mare's milk supplement |
| Formats | 25 × 10 g sachet box · 90 capsules · 250 g refill pouch |
| Origin | Töv Province, Mongolia. Product of Mongolia |
| Manufactured by | Monsubi Foods LLC, Mongolia |
| Imported and distributed by | YFamily Co., Ltd., Bangkok |
| Brand owner | S72 Strategic Co., Ltd. |
| Market | Thailand |
| Regulatory status | Thai FDA registration in progress. Not yet issued |
| Allergens | Contains milk |
| Founded | — *(confirm)* |

## 5. Approved language

**Component:** `TipList columns={1}`

> **Heading:** How we describe the product
> **Sub:** Provided so that coverage is accurate rather than to constrain what you write.

| Title | Body |
|---|---|
| It is a dietary supplement | Not a medicine, not a drink, not a probiotic. Please do not describe it as a probiotic — the drying process ends the live culture, and we say so on our own site. |
| We make no health claims | We describe what is in it and what those nutrients are generally understood to contribute to. We do not claim it does anything for skin, energy, immunity or digestion. |
| Registration is not complete | Thai FDA registration is in progress. Please do not report it as registered. |
| Provenance is specific | Töv Province, Mongolia, milked June to October. Not "Central Asia" and not "ancient Mongolian secret" — it is an ordinary everyday food there. |
| Our evidence position is published | It is on [Our Research](/our-story/our-research/), including what we have not tested. You are welcome to quote any of it. |

> Publishing this list is unusual and worth doing. It reduces the chance of inaccurate coverage the brand would then have to correct, and it demonstrates the same claim discipline to a journalist that the rest of the site demonstrates to a customer.

## 6. Releases

**Component:** `CardGrid columns={2}` of `ContentCard`, newest first, each with a date in `caption`.

**Empty state:** "No releases yet. When there are, they will be here." — no placeholder entries.

---

## Responsive behaviour

1 column < 640px · 2 at `sm` · 3 at `lg` for the media-pack grid; releases 1 then 2. Tables scroll horizontally below `lg`.

## Accessibility notes

- One `<h1>`
- Download buttons state format and size in their accessible names
- The facts table is a real `<table>` with `scope="row"` on the left column
- Email and phone are real `mailto:`/`tel:` links
- Empty release state is a paragraph, not an empty list

## SEO notes

- `<title>`: Press — Media Pack and Contact · Steppe Gut
- Meta description: Press contact, downloadable logo and photography packs, company facts and approved product language for Steppe Gut.
- JSON-LD: `Organization` with `contactPoint` (`contactType: "public relations"`), plus `ItemList` of releases
- **One canonical press URL.** Do not create a second one

## Developer notes

- Route `/press/`, lazy-loaded
- **No new images.** Downloads are supplied ZIPs; render them as static assets with `download` attributes
- Company facts from `src/data/company.js`; regulatory line from `src/data/regulatory.js`
- Releases from `src/data/press.js`
- Reuses `PageHeader`, `ContactPanel`, `CardGrid`, `ContentCard`, `ComparisonTable`, `TipList`, `Button`
- Check asset ZIPs are current at each release. A stale logo pack propagates into published coverage and cannot be recalled
