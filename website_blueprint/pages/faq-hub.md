# Page — Frequently Asked Questions `/faq/`

## Summary

The highest-value trust page on the site for an unfamiliar product category, and the one that most directly reduces support load and pre-purchase hesitation.

The reference site's FAQ is one of the most instructive structures on it: **47 questions, presented as a category-filtered accordion on a single page, with every answer also existing at its own URL.** That dual structure is deliberate and worth copying exactly — the hub serves the browsing visitor, the individual URLs serve search, and both read from the same content.

Steppe Gut ships 34 questions across five categories at launch.

## Purpose

- **Goals:** trust, education, conversion
- **Journey questions:** all seven, in fragments
- **Audience:** the visitor with a specific unanswered objection. Frequently the last page before a purchase or a bounce
- **Intent:** "Answer my actual question"
- **Primary CTA:** *See the products* → `/products/`
- **Secondary CTA:** *Ask us something* → `/contact/`

## Layout

| Property | Value |
|---|---|
| Header | `PageHeader align="center"` with a search field |
| Body | `container-content` 940px |
| Rhythm | `section-gap` |

## Section order

| # | Section | Component | Why |
|---|---|---|---|
| 1 | Header + search | `PageHeader` + inline search | 34 questions is past the point where scanning works. Search first |
| 2 | Category filter | `FilterTabs` | Five categories, filterable, linkable via `?category=` |
| 3 | The accordion | `Accordion` | Grouped by category, deep-linkable per question |
| 4 | Still not answered | `ContactPanel` compact | The exit for the question that is not on the list |
| 5 | Closing CTA | `ClosingCTA` | |

---

# Sections

## 1. Header and search

> **Eyebrow:** Support
> **Title (h1):** Questions
> **Lead:** Thirty-four things people ask us, answered as directly as we can. If yours is not here, send it to us and we will add it.

**Search field:** `container-narrow` 520px, centred, `h-12`, `radius-full`, `border-subtle`. Placeholder: `Search questions`. Filters the accordion client-side on keystroke with a 200 ms debounce, matching question text and answer body. Result count announced via `aria-live="polite"`.

## 2. Category filter

**Component:** `FilterTabs`

**Categories:** All · Taking it · Suitability & allergens · Ingredients & nutrition · Ordering & delivery · The product & the company

Selecting a category sets `?category=taking-it` so a filtered view is linkable. "All" clears it.

## 3. The accordion

**Component:** `Accordion`, grouped under `<h2>` category headings, `allowMultiple={false}` within a group.

Each item: question as a `<button>` inside `<h3>`, answer in `Prose` at `body`, and a `Read the full answer →` link to `/faq/:slug/` where a longer version exists.

**Answer style, from `02_brand_guidelines.md` §8:** answer in the first sentence, then explain. 40–120 words. Never open with "Great question" or restate the question.

---

### Category — Taking it

| Slug | Question | Answer |
|---|---|---|
| `how-much` | How much should I take? | One sachet a day, which is 10 g. For capsules, three capsules once a day. For the pouch, one level scoop. There is no benefit to taking more, and we would rather you took one a day for a year than three a day for a month. |
| `when-to-take` | What time of day should I take it? | Whenever you will reliably remember. Morning suits most people because it attaches easily to an existing routine, but the hour matters far less than the consistency. |
| `with-or-without-food` | With food or without? | Either. Some people find it sits better with breakfast; others prefer it before. Neither is more effective. |
| `hot-water` | Can I use hot water? | You can, but it makes the taste noticeably worse above about 40 °C. Cool or room-temperature water is better, and warm water below body heat is fine on cold mornings. |
| `taste` | What does it taste like? | Faintly sour and slightly savoury — closest to thin, plain, unsweetened yoghurt. In 100 ml of water it is mild. Most people stop noticing it within a week. |
| `missed-day` | What if I miss a day? | Take the next one as normal. There is nothing to catch up on and no reason to double up. |
| `how-long` | How long until I notice something? | We are not going to give you a number. Nutritional intake works over weeks and months, we have not run a trial, and anyone offering you a specific timeline is guessing. Take it daily and judge for yourself. |
| `mix-with-other` | Can I mix it into food or drinks? | Yes. Yoghurt, cold tea and smoothies all work. See [Ways to take it](/rituals/). Avoid anything hot. |
| `with-other-supplements` | Can I take it alongside other supplements? | Generally yes, but check the totals — particularly for vitamin A, which accumulates. If you are taking a multivitamin as well, add up what you are getting. |
| `storage` | How should I store it? | Somewhere cool, dry and out of direct sunlight. Sachets need no refrigeration. Reseal the pouch after each use — moisture is what spoils the powder. |
| `shelf-life` | How long does it keep? | The best-before date is printed on every pack alongside the batch number. Once a pouch is opened, use it within three months. |
| `travel` | Can I travel with it? | Yes. Sachets travel well and the capsules travel better. Both are shelf-stable and neither needs refrigeration. |

### Category — Suitability & allergens

| Slug | Question | Answer |
|---|---|---|
| `contains-milk` | Does it contain milk? | Yes. It is a dairy product made from mare's milk, and it is not suitable for anyone with a milk allergy. |
| `lactose-intolerant` | Is it suitable if I am lactose intolerant? | Possibly, but we cannot tell you. Fermentation breaks down most of the lactose, but lactose remains present and is listed as an ingredient. If you tolerate yoghurt you may tolerate this. If you react badly to dairy, speak to your doctor before trying it. |
| `vegetarian` | Is it suitable for vegetarians? | Yes. It is not suitable for vegans — it is a dairy product. |
| `gluten` | Does it contain gluten? | No gluten-containing ingredients are used. We do not hold gluten-free certification, so we do not describe it as gluten-free. If you have coeliac disease, that distinction matters and you should treat it as uncertified. |
| `nuts` | Does it contain nuts? | No nut ingredients are used. If cross-contact matters for you, write to us and we will tell you what we know about the facility. |
| `pregnancy` | Can I take it while pregnant or breastfeeding? | Speak to your doctor first. We are not able to advise on this and we are not going to pretend otherwise. |
| `children` | Can children take it? | We do not market it to children and we have no basis for a recommendation. Ask a paediatrician. |
| `medication` | Can I take it with medication? | Ask your doctor or pharmacist, particularly if you take iron or calcium supplements, or anything where mineral absorption is relevant. |
| `diabetes` | Is it suitable if I have diabetes? | It contains naturally occurring milk sugars. The figures are on [What's Inside](/products/whats-inside/). Take them to whoever manages your care rather than relying on us. |
| `halal` | Is it halal? | We do not currently hold halal certification. The product contains no alcohol and no non-dairy animal ingredients, but we are not going to describe it as halal without certification. |

### Category — Ingredients & nutrition

| Slug | Question | Answer |
|---|---|---|
| `what-is-in-it` | What is actually in it? | Fermented mare's milk powder and the components naturally present in it: lactose, whey and casein proteins, milk fat, omega-3 and omega-6 fatty acids, vitamins A, C, B1, B2 and B12, calcium, phosphorus, sodium, iron, lactoferrin and lysozyme. The full declaration is on [What's Inside](/products/whats-inside/). |
| `added-vitamins` | Are the vitamins added? | No. Everything except the capsule shell occurs naturally in mare's milk. There is no vitamin premix. |
| `added-sugar` | Does it contain added sugar? | No. The sugars declared are the lactose naturally present in milk. |
| `sweeteners-flavourings` | Are there sweeteners, flavourings or colourings? | None of any kind, natural or artificial. It tastes of fermented milk because that is all it is. |
| `calories` | How many calories are in a serving? | The figures per serving and per 100 g are published in full on [What's Inside](/products/whats-inside/). |
| `is-it-a-probiotic` | Is it a probiotic? | No. Drying at low temperature ends the live culture. What you are taking is the product of fermentation, not a live culture, and we would rather say so than let the word "fermented" imply something it does not. |
| `why-mares-milk` | Why mare's milk rather than cow's milk? | It is a materially different milk — lower in fat, higher in lactose, whey-dominant in protein, and notably higher in vitamin C and lysozyme. It is also what has traditionally been fermented on the Mongolian steppe. See [How it works](/how-it-works/). |
| `batch-variation` | Do the nutrition figures vary between batches? | Yes, somewhat. It is a seasonal product from animals on unimproved pasture, fermented in individual household vessels. Published figures are batch averages. We test every batch and can send you the certificate for yours. |

### Category — Ordering & delivery

| Slug | Question | Answer |
|---|---|---|
| `where-to-buy` | Where can I buy it? | Directly from this site, and from the retail and pharmacy partners listed on [Where to buy](/where-to-buy/). |
| `delivery-time` | How long does delivery take? | Two to four working days across Thailand. |
| `returns` | Can I return it? | Unopened packs can be returned within 14 days. We cannot accept opened food products back, which is a safety requirement rather than a policy preference. |
| `subscription` | Is there a subscription? | Not yet. We would rather get the product and the supply chain right first. |

### Category — The product & the company

| Slug | Question | Answer |
|---|---|---|
| `who-makes-it` | Who makes it? | Manufactured by Monsubi Foods LLC in Mongolia. Imported and distributed in Thailand by YFamily Co., Ltd. The brand is owned by S72 Strategic Co., Ltd. All three are named on [How it's made](/our-story/how-its-made/). |
| `fda-registration` | Is it registered with the Thai FDA? | Registration is in progress and has not yet been issued. We will publish the registration number here, in the footer and on the pack the day it is. We are not going to claim it before then. |
| `where-from` | Where does the milk come from? | Töv Province, Mongolia, from a small number of herding families, milked between June and October. See [Our story](/our-story/). |
| `health-claims` | Will it improve my skin, energy or digestion? | We do not know, and we are not going to claim it will. We can tell you what is in it, how it was made and what those nutrients are generally understood to contribute to. Our full evidence position is on [Our research](/our-story/our-research/). |

---

## 4. Still not answered

**Component:** compact `ContactPanel` in a `sage-tint` panel, `radius-lg`, `p-8`

> **Heading:** Not answered here?
> **Body:** Send us the question. If it is a good one we will add it to this page, and we will tell you if we do not know the answer.
> **CTA:** Send a message → `/contact/`

## 5. Closing CTA

**Component:** `ClosingCTA`, shared bookend

> **Heading:** Questions answered
> **Body:** The sachets are the place to start.
> **Primary:** See the products → `/products/`
> **Secondary:** How it works → `/how-it-works/`

---

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| < 640px | Search full-width. `FilterTabs` scroll horizontally with the active pill scrolled into view. Accordion full-width, `px-0` |
| 640–1023px | Tabs fit on one line at most sizes |
| ≥ 1024px | Content at 940px, accordion panels gain `px-4` |

## Accessibility notes

- One `<h1>`. Category headings `<h2>`, questions `<h3>` containing the `<button>`
- Accordion triggers carry `aria-expanded` and `aria-controls`; panels are `role="region"` with `aria-labelledby`
- The search field has a real visually-hidden `<label>`, and the result count is announced via `aria-live="polite"`
- `FilterTabs` is `role="tablist"` with `aria-selected`; the filter must also work with JavaScript disabled at the server-render level, or at minimum the full unfiltered list must be present in the DOM
- **A URL fragment matching a question id opens that item and scrolls to it on load** — required, because every FAQ link elsewhere on the site relies on it
- With 34 items, the collapsed accordion must not push the "still not answered" section below three screens on mobile. Verify

## SEO notes

| Element | Value |
|---|---|
| `<title>` | Frequently Asked Questions · Steppe Gut |
| Meta description | Thirty-four questions about fermented mare's milk answered directly — how to take it, allergens, ingredients, delivery, and where it comes from. |
| `<h1>` | Questions |
| JSON-LD | `FAQPage` with all 34 `Question`/`Answer` pairs, generated from the same data as the accordion. **Answers must be present in the initial HTML**, not injected on expand, or the markup is invalid |
| Internal links | Every FAQ answer page, `/products/`, `/products/whats-inside/`, `/how-it-works/`, `/our-story/`, `/our-story/our-research/`, `/where-to-buy/`, `/rituals/`, `/contact/` |
| Note | This page is the single largest internal-linking hub on the site. Its outbound links do more for the rest of the site's crawlability than any other page |

## Developer notes

- Route `/faq/`, lazy-loaded
- **No images on this page.** It is a utility page and imagery would slow it for no benefit
- Content in `src/data/faq.js`: `{ slug, category, question, answer, longAnswer?, related[] }`. **One array drives the hub accordion, the `FAQPage` JSON-LD, the 34 individual answer pages, and the FAQ accordions embedded on each PDP.** Four surfaces, one source
- Answers are stored as plain strings with a small set of permitted inline links, not as MDX — the same string has to render inside an accordion, inside JSON-LD (where markup is invalid) and on a standalone page
- Reuses `PageHeader`, `FilterTabs`, `Accordion`, `ContactPanel`, `ClosingCTA`. No new components
- **The `fda-registration` and `health-claims` answers must be reviewed alongside `/our-story/our-research/` whenever the regulatory position changes.** Bind them to the same `src/data/regulatory.js` values rather than duplicating the wording
