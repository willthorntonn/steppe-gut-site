# Page — Contact `/contact/`

## Summary

Routes enquiries to the right place. The reference site's contact page uses a structure worth copying exactly: **a two-column panel for the main consumer contact, then a departmental accordion below it.** It works because the great majority of visitors want the one general route, and the remaining minority — press, trade, careers — want a specific one and are willing to expand something to find it.

## Purpose

- **Goals:** trust
- **Journey question:** 3
- **Audience:** everyone, in small numbers
- **Intent:** "How do I reach a human?"
- **Primary CTA:** email or phone
- **Secondary CTA:** *Read the questions first* → `/faq/`

## Layout

| Property | Value |
|---|---|
| Header | `PageHeader align="left"` |
| Body | `container` for the panel, `container-content` for the accordion |
| Rhythm | `section-gap` |

## Section order

| # | Section | Component | Why |
|---|---|---|---|
| 1 | Header | `PageHeader` | Sets response expectations honestly |
| 2 | Try the FAQ first | `MediaTextRow` compact | Deflects the majority of enquiries to a faster answer. Good for the visitor, not only for the inbox |
| 3 | General enquiries | `ContactPanel` two-column | The main route: email, phone, address |
| 4 | Other departments | `Accordion` | Press, trade, careers, data requests |
| 5 | Message form | `Field` set | For people who prefer a form to an email client |
| 6 | Closing CTA | `ClosingCTA` | |

---

# Copy

## 1. Header

> **Eyebrow:** Contact
> **Title (h1):** Get in touch
> **Lead:** We answer emails within two working days. If you need something faster, phone is quicker. We are a small team, so you will usually be talking to the same person twice.

## 2. Try the FAQ first

**Component:** compact `MediaTextRow`, no image — a `sage-tint` panel instead

> **Heading:** Your question may already be answered
> **Body:** Thirty-four of the questions we get asked most are answered on one page, including allergens, how to take it, delivery and our regulatory status.
> **CTA:** Read the questions → `/faq/`

## 3. General enquiries

**Component:** `ContactPanel`, two columns with a 1px `border-subtle` divider

**Column 1 — Steppe Gut (Thailand)**
> **Email:** hello@steppegut.com *(placeholder — confirm the real address before publishing)*
> **Phone:** +66 97 251 5911
> **Hours:** Monday to Friday, 9:00–17:00 ICT
>
> **Distributed by:**
> YFamily Co., Ltd.
> 45/1 Silom, 19 Building, 4th Floor, Room 415
> Trok Weth, Silom Road, Silom Subdistrict
> Bang Rak District, Bangkok 10500

**Column 2 — S72 Strategic Co., Ltd.**
> The company behind the brand.
>
> **Email:** info@s72strategic.com
> **Phone:** +66 97 251 5911
>
> **Manufactured by:**
> Monsubi Foods LLC, Mongolia

> **Why both companies are listed:** the site names its manufacturer, importer and brand owner in several places (`02_brand_guidelines.md` §10). This is where a visitor who wants to verify any of them finds all three together.

## 4. Other departments

**Component:** `Accordion`, 5 items

| Heading | Content |
|---|---|
| Press and media | For interviews, images or product samples, email press@steppegut.com. There is a media pack with logos, product photography and company background on our [Press page](/press/). |
| Trade and stockists | If you run a pharmacy, clinic, spa or store, email trade@steppegut.com. Wholesale terms, minimum orders and lead times are on our [Trade page](/stockists/). |
| Careers | We do not currently have open vacancies. If you want to be considered when we do, email careers@steppegut.com with what you do. See [Careers](/careers/). |
| Product and batch questions | For a certificate of analysis, send us the batch number printed on your pack and we will email you the certificate for that batch. |
| Data and privacy requests | To access, correct or delete the personal data we hold about you, email privacy@steppegut.com. We respond within 30 days. See our [Privacy Policy](/legal/privacy/). |

> **All five addresses are placeholders.** Confirm each one exists and is monitored before publishing. A published address that bounces is worse than one route that works.

## 5. Message form

**Component:** `Field` set inside `container-narrow` 520px

| Field | Type | Required | autocomplete |
|---|---|---|---|
| Your name | text | yes | `name` |
| Email address | email | yes | `email` |
| What is this about? | select — General · Product question · Order · Trade · Press · Something else | yes | — |
| Order number | text | no — shown only when "Order" is selected | — |
| Message | textarea, 6 rows | yes | — |
| Consent | checkbox, unchecked by default | yes | — |

> **Consent label:** I agree that Steppe Gut may use these details to reply to me, as described in the [Privacy Policy](/legal/privacy/).
> **Submit:** Send message
> **Below the button:** We reply within two working days. If it is urgent, phone is faster.

**Success state:** the form is replaced by a confirmation with the same heading level, announced via `aria-live="polite"`, restating the two-working-day expectation. Focus moves to the confirmation.

**Error state:** a summary at the top of the form listing each error as a link to its field, plus per-field messages.

> **Until a backend exists:** disable the submit button and show a visible panel — "The form is not connected yet. Please email us at hello@steppegut.com." **Do not collect personal data into a form that goes nowhere.** Same rule as checkout.

## 6. Closing CTA

**Component:** `ClosingCTA`, shared bookend

> **Heading:** We do reply
> **Body:** And if we do not know the answer, we will say so.
> **Primary:** Read the questions → `/faq/`
> **Secondary:** See the products → `/products/`

---

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| < 1024px | `ContactPanel` stacks, horizontal divider between columns. Form full-width |
| ≥ 1024px | `ContactPanel` two columns with a vertical divider. Form at 520px, left-aligned within the container |

## Accessibility notes

- One `<h1>`. Accordion questions `<h3>`
- Postal addresses use `<address>`
- Phone numbers are `tel:` links with the number formatted for reading, not stripped of spaces in the visible text
- Email addresses are `mailto:` links
- The conditional "Order number" field must be added to the accessibility tree when revealed and announced — do not simply un-hide it silently
- Consent checkbox is **unchecked by default**. A pre-checked consent box is not consent
- Error summary at the top of the form, each entry a link to its field. This is the single most valuable form-accessibility pattern and it is routinely omitted
- Form status announced via `aria-live="polite"`

## SEO notes

| Element | Value |
|---|---|
| `<title>` | Contact Steppe Gut |
| Meta description | Email, phone and postal details for Steppe Gut in Thailand, plus routes for press, trade, careers and data requests. |
| `<h1>` | Get in touch |
| JSON-LD | `Organization` with `contactPoint` entries for customer service, sales and press, each with `contactType`, `email`, `telephone`, `areaServed: TH`, `availableLanguage: [th, en]` |
| Internal links | `/faq/`, `/press/`, `/stockists/`, `/careers/`, `/legal/privacy/` |

## Developer notes

- Route `/contact/`, lazy-loaded
- **No images**
- All company details from `src/data/company.js` — the same source as the footer, `/our-story/how-its-made/` and `/legal/terms/`
- Department routes from `src/data/contactRoutes.js`, so an address change is one edit
- Reuses `PageHeader`, `MediaTextRow`, `ContactPanel`, `Accordion`, `Field`, `ClosingCTA`. No new components
- Confirm every email address is real and monitored before publishing. Confirm the batch-certificate commitment is operationally supported (it also appears on `/our-story/how-its-made/`)
- Do not wire the form to any endpoint until there is a backend to receive it
