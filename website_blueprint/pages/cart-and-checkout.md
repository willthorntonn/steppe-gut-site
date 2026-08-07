# Pages — Cart, Checkout & Confirmation

Covers three routes plus one drawer: `/cart/`, `/checkout/`, `/checkout/confirmation/`, and the `CartDrawer` overlay.

## Summary

The purchase flow. **Frontend shell only** at launch, per `SG-PROJECT_SPEC.md` §4 — no backend, no payment processing. Everything below is built so that connecting a real payment provider later is a swap rather than a rebuild.

The reference site has no commerce at all, so nothing here derives from it. What is carried across from the wider structural analysis is a single principle observed throughout: **remove exits at the point of payment, and restore them immediately afterwards.**

## Purpose

- **Goals:** conversion
- **Journey question:** 7
- **Audience:** decided
- **Intent:** "Let me pay without friction"
- **Primary CTA:** varies by step

---

# 1. Cart drawer

Opened by the header cart icon and by "Add to basket" anywhere on the site. It is the default cart surface; `/cart/` exists for people who want a full page and for direct links.

| Property | Value |
|---|---|
| Component | `Drawer`, right side |
| Width | 100% < 640px · 420px above |
| Background | `cream`, `shadow-lg` |
| Backdrop | `forest/40` + `backdrop-blur-sm` |
| Entrance | Slide 260 ms `brand` easing; instant under reduced motion |
| Header | "Your basket" `h3` + close button, `aria-label="Close basket"` |
| Lines | `CartLine` per item |
| Footer | Subtotal, delivery note, "Checkout" `solid-forest` full-width, "View basket" `link-arrow` |
| Empty state | "Your basket is empty." + `Button outline-forest` "See the products" |
| A11y | Focus trapped, `Escape` closes, focus returns to the trigger, body scroll locked, `role="dialog" aria-modal="true" aria-label="Your basket"` |

**`CartLine`:** 64px product thumbnail · name (`h4`) · format (`caption`, `text-secondary`) · quantity stepper · line price · remove button (`aria-label="Remove Daily Sachets from basket"`).

**Announcements:** adding, removing and quantity changes are announced via a persistent `aria-live="polite"` region. **Do not rely on the cart badge alone** — it is off-screen for a screen-reader user and invisible to anyone not looking at the header.

---

# 2. `/cart/` — full page

| Property | Value |
|---|---|
| Header | `PageHeader align="left"` — "Your basket" |
| Layout ≥ 1024px | Two columns: lines left ~62%, `OrderSummary` right ~38%, summary `sticky top-24` |
| Layout < 1024px | Lines, then summary; summary **not** sticky (a sticky panel on a short mobile page eats the viewport) |
| Lines | Same `CartLine`, larger: 96px thumbnail |
| Empty state | Centred, `container-narrow`: heading, one line, `Button solid-forest` "See the products", plus links to `/faq/` and `/how-it-works/` |

**`OrderSummary`:** `cream-raised`, `radius-lg`, `border-subtle`, `p-6`. Rows — Subtotal · Delivery · Total (`h3`, Inter 600). Then the checkout button, then a `caption` line: "Delivery is calculated at checkout. Unopened packs can be returned within 14 days."

**Below the summary, a `CardRail`** of the other formats — "You might also want". One rail, not a wall of upsells.

> **Copy:**
> **H1:** Your basket
> **Empty heading:** Nothing in here yet
> **Empty body:** Have a look at the three formats — they all contain the same powder.

---

# 3. `/checkout/` — form shell

## Chrome

Reduced header per `01_navigation.md` §8: logo only (still linking to `/`), plus "Secure checkout" with a `lock` icon. No nav, no search, no social rail, no cart icon. Footer reduces to the legal strip.

## Layout

| Property | Value |
|---|---|
| Container | `container` capped at 1080px |
| ≥ 1024px | Form left ~58%, `OrderSummary` right ~42%, sticky |
| < 1024px | **Summary collapsed to a single expandable row at the top** ("Order total ฿— · Show details"), then the form. The summary must not push the first field below the fold |
| Steps | **One page, three titled sections.** Not a multi-step wizard |

**Why one page:** a three-step wizard adds two full page transitions and two opportunities to abandon, for a form with eleven fields. Sectioned single-page checkout measures better at this length and is far simpler to make accessible.

## Sections

**A — Contact**
| Field | Type | autocomplete |
|---|---|---|
| Email address (required) | email | `email` |
| Phone number (required) | tel | `tel` |
| — | Checkbox: "Email me about Steppe Gut" — **unchecked by default** | — |

**B — Delivery**
| Field | Type | autocomplete |
|---|---|---|
| Full name (required) | text | `name` |
| Address line 1 (required) | text | `address-line1` |
| Address line 2 | text | `address-line2` |
| Sub-district (required) | text | `address-level3` |
| District (required) | text | `address-level2` |
| Province (required) | select | `address-level1` |
| Postcode (required) | text, `inputmode="numeric"` | `postal-code` |
| Delivery notes | textarea | — |

> Thai addressing uses sub-district / district / province. **Do not ship a Western city/state/zip form with the labels translated** — the field structure itself is wrong and Thai users will notice immediately.

**C — Payment**

**Frontend shell only.** Render the three intended methods as disabled radio options with official marks — PromptPay, bank transfer, credit/debit card — and a clearly visible panel:

> **Payment is not yet enabled.** This site is live ahead of launch. Submitting this form will not take payment and will not place an order. When payment goes live, this notice will be replaced.

> **This notice is mandatory.** A checkout form that accepts details and does nothing, with no explanation, is both a trust failure and a data-protection problem — do not collect real personal data into a form that goes nowhere. **Until a backend exists, the submit button is disabled and the form does not transmit anything.**

## Buttons

Submit: `Button solid-forest`, full-width, "Place order". Disabled with the notice above until payment is live. Below it, `legal`-size text: "By placing an order you agree to our [Terms](/legal/terms/) and [Privacy Policy](/legal/privacy/)."

---

# 4. `/checkout/confirmation/`

Full chrome restored — nav, footer, everything.

| Property | Value |
|---|---|
| Container | `container-narrow` 520px, centred, `pt-16 lg:pt-24` |
| Icon | 56px `check` in a `sage-tint` circle, `aria-hidden` |
| Order number | `body-lg` Inter 600, selectable |
| Next steps | `TipList columns={1}`, 3 items |
| Below | `MediaTextRow` compact → `/rituals/` |

> **H1:** Thank you
> **Body:** Your order is confirmed and we have emailed the details to you.
> **Order number:** SG-XXXXXX

**Next steps:**
| Title | Body |
|---|---|
| It will arrive in two to four working days | You will get a tracking link when it ships. |
| Start the morning after it arrives | One sachet in 100 ml of cool water. There is nothing to build up to. |
| Give it a few weeks | Take it daily and judge for yourself. We are not going to tell you when to expect anything. |

**Then:** "Ways to take it" → `/rituals/`

**Accessibility:** focus moves to the `<h1>` on load and the confirmation is announced via `aria-live`. The order number is real text, never an image.

---

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| < 640px | Drawer full-width. Cart lines stack thumbnail above details. Checkout summary collapsed to one expandable row |
| 640–1023px | Cart lines horizontal. Summary below lines, not sticky |
| ≥ 1024px | Two-column cart and checkout, summary sticky at `top-24` |

## Accessibility notes

- Every field has a real visible `<label>`. **No placeholder-as-label anywhere in this flow**
- Inputs are 16px minimum (below that, iOS zooms on focus and the layout appears to break)
- Errors: `aria-invalid`, `aria-describedby` to the message, message adjacent to the field, and a summary at the top of the form linking to each error. Never colour alone
- Required fields say "(required)" in the label text, not a bare asterisk
- Correct `autocomplete` on every field
- Touch targets ≥ 44px, including the quantity steppers and the remove buttons
- The drawer traps focus; the checkout page does not
- Cart mutations announce via `aria-live="polite"`
- **The payment-disabled notice is visible text in the document flow**, never a tooltip or a title attribute

## SEO notes

- All three routes: `<meta name="robots" content="noindex, nofollow">`
- Excluded from `sitemap.xml`
- Titles still set correctly for the browser tab and history: "Your basket · Steppe Gut", "Checkout · Steppe Gut", "Thank you · Steppe Gut"
- No structured data

## Developer notes

- Routes `/cart/`, `/checkout/`, `/checkout/confirmation/`, all lazy-loaded
- **No images** beyond product thumbnails already in `src/assets/shared/products/`
- `CartProvider` holds state in React context, persisted to `localStorage` under a versioned key so a schema change does not break an existing basket
- Cart state shape: `{ items: [{ slug, qty }], updatedAt }` — **store the slug and quantity only.** Price and name are looked up from `src/data/products.js` at render time, so a price change cannot be served from a stale basket
- `/checkout/confirmation/` is only reachable with confirmation state; a direct visit redirects to `/`
- Payment marks (PromptPay, bank, card) must be the official supplied assets, correctly sized, never redrawn
- **Do not wire the form to any endpoint, analytics event or third-party service while payment is disabled.** It collects nothing and transmits nothing until there is a backend to receive it
- When payment goes live, the only changes required are: enable the radio group, remove the notice, enable submit, and point the handler at the provider. Everything else stays
