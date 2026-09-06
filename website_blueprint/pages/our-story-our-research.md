# Page — Our Research `/our-story/our-research/`

## Summary

The evidence page. It states, in one place, what is actually known about fermented mare's milk, what is not, what Steppe Gut has and has not done, and where regulatory registration stands.

The reference brand's equivalent page leans on ninety years of institutional research history. Steppe Gut has none, and pretending otherwise would collapse instantly. **The strategy here is inversion:** rather than manufacture credibility, publish the evidence position honestly and let the rigour of the disclosure be the credential. For a pre-launch brand in an unfamiliar category, that is not a consolation prize — it is a stronger position than a vague claim of "backed by science".

## Purpose

- **Goals:** trust, education
- **Journey questions:** 3 (why trust it?), 5 (how does it work?), 6 (why different?)
- **Audience:** the most sceptical visitor on the site — plus pharmacists, journalists, and trade buyers doing diligence
- **Intent:** "What is the actual evidence, and are you being straight with me?"
- **Primary CTA:** *How it works* → `/how-it-works/`
- **Secondary CTA:** *Ask us something* → `/contact/`

## Layout

| Property | Value |
|---|---|
| Header | `PageHeader align="left"` |
| Body | `container-prose` 680px, `72ch` measure (this is the site's longest-form reading page) |
| Tone | The least decorated page on the site. **One image maximum.** Everything else is text and tables |
| Rhythm | `section-gap` |

## Section order

| # | Section | Component | Why |
|---|---|---|---|
| 1 | Header | `PageHeader` | Frames the page as a disclosure, not a boast |
| 2 | Our position in one paragraph | `Prose` + `PullQuote` | The whole answer, before the detail, for the reader who will only read one section |
| 3 | What is reasonably established | `Prose` + `ComparisonTable` | The strongest available ground, clearly bounded |
| 4 | What is studied but unsettled | `Prose` | The honest middle |
| 5 | What is not established | `Prose` | Named explicitly, including the claims a competitor might make |
| 6 | What we have and have not done | `TipList columns={2}` | Steppe Gut's own position |
| 7 | Regulatory status | `Container prose` panel | Thai FDA, stated plainly, with a date of last update |
| 8 | How to read a supplement claim | `TipList` | Genuinely useful to the reader whether or not they buy |
| 9 | Honest limits | `HonestLimits` | |
| 10 | Closing CTA | `ClosingCTA` | |

---

# Copy

## 1. Page header

> **Eyebrow:** Evidence
> **Title (h1):** Our research
> **Lead:** We are a new company selling an unfamiliar product. This page sets out exactly what we know, what we don't, what we have tested, and what our regulatory position is. It is deliberately unflattering in places.
>
> **Last reviewed:** *(render an actual date, in `caption` / `text-tertiary`, directly beneath the lead. Update it whenever any section changes.)*

## 2. Our position in one paragraph

> **Heading:** The short version
> **Body:**
> Fermented mare's milk is a traditional food with a small and uneven research literature. What can be said with confidence is compositional: what is in the milk, and what fermentation does to it. What cannot be said with confidence is what taking it will do for any individual person. We have not run a clinical trial, we do not have one planned this year, and we are not going to imply otherwise by quoting other people's studies as though they were ours.

**PullQuote:**
> Composition is knowable. Outcomes, for now, are not.

## 3. What is reasonably established

> **Heading:** What is reasonably established
> **Body:**
> Three things sit on reasonably firm ground.
>
> **The composition of mare's milk.** It is well characterised in the dairy-science literature: lower in fat than cow's milk, higher in lactose, whey-dominant in its protein profile, and notably higher in vitamin C and lysozyme. This is not contested.
>
> **What lactic fermentation does.** The breakdown of lactose into lactic acid, the fall in pH and the partial unfolding of milk proteins are basic, well-described food chemistry. They are not specific to mare's milk and they are not in doubt.
>
> **What the individual nutrients do.** The general physiological roles of vitamin C, vitamin A, B vitamins, calcium, iron and omega-3 fatty acids are established and, in most jurisdictions, formally authorised as nutrient function statements. These are statements about the nutrient, not about our product.

**`ComparisonTable` — "What kind of statement is this?"**

| Statement | Type | Can we make it? |
|---|---|---|
| "Contains 10 g of fermented mare's milk powder per sachet" | Compositional fact | Yes |
| "Fermentation breaks down lactose into lactic acid" | Established food chemistry | Yes |
| "Vitamin C contributes to normal collagen formation" | Authorised nutrient function | Yes, attributed to the nutrient |
| "Improves skin clarity" | Product efficacy claim | **No** |
| "Clinically proven" | Product efficacy claim | **No** |
| "Boosts immunity" | Product efficacy claim | **No** |

> This table is the operational form of the claim-discipline policy in `02_brand_guidelines.md` §6. Publishing it does two things at once: it educates the reader, and it publicly commits the brand to a rule it can then be held to.

## 4. What is studied but unsettled

> **Heading:** What is studied but unsettled
> **Body:**
> There is a genuine research literature on fermented mare's milk, concentrated in Central Asia, Mongolia and parts of Eastern Europe, and it goes back decades. Much of it is small, some of it is not available in English, and the methodology varies widely.
>
> Areas where work exists but conclusions are not settled include the behaviour of lactoferrin and lysozyme after fermentation and drying, tolerance in people who react to cow's milk, and the fate of specific micronutrients through low-temperature drying.
>
> We read this literature. We are not going to summarise individual studies here and imply they say more than they do, and we are especially not going to cite a study of fresh fermented mare's milk as though it were a study of our dried powder. Those are not the same product.

## 5. What is not established

> **Heading:** What is not established
> **Body:**
> The following are not established for this product, and we will not claim them regardless of how commonly they appear on competitor packaging:
>
> - Any effect on skin appearance, clarity or ageing
> - Any effect on immune function
> - Any effect on energy levels or fatigue
> - Any effect on digestion, bloating or gut symptoms
> - Any probiotic effect. Drying ends the live culture — see [How It Works](/how-it-works/)
> - Any benefit specific to Steppe Gut as distinct from fermented dairy generally
>
> If any of these become supportable, we will publish the evidence here before we put it on a pack.

## 6. What we have and have not done

**Component:** `TipList columns={2}`

| Title | Body |
|---|---|
| We test every batch | Moisture, microbiology, macronutrients, vitamin C, heavy metals and allergens. See [How It's Made](/our-story/how-its-made/). |
| We have not run a clinical trial | None. Not one, not a pilot, and none is currently funded. |
| We have not commissioned a study | We have not paid anyone to produce research about our product. |
| We have no advisory board | If we appoint one we will publish who is on it and what they are paid. |
| We have no third-party certification | Beyond standard food-safety compliance for export and import. |
| We do not have published per-batch analysis | We intend to. Certificates are available on request in the meantime. |

## 7. Regulatory status

**Component:** `Container width="prose"` + a `sage-tint` panel, `radius-lg`, `p-8`

> **Heading:** Regulatory status
> **Body:**
> Steppe Gut is a dietary supplement. Thai FDA registration is **in progress** and is not yet issued. The import permit process is running alongside it.
>
> Until registration is issued, we describe this product as a dietary supplement, we make no health claims for it, and we do not display any registration number. When the number is issued it will appear on this page, in the footer of every page, and on the pack.
>
> **Status last updated:** *(render an actual date)*

> **Implementer note:** this panel must be trivially editable and must carry a visible date. It is the fastest-changing content on the site and the most consequential to get wrong. Put it in `src/data/regulatory.js` with a `lastUpdated` field, and surface that field in the UI.

## 8. How to read a supplement claim

**Component:** `TipList columns={1}`

> **Heading:** How to read any supplement claim, including ours
> **Sub:** This is useful whether or not you buy anything from us.

| Title | Body |
|---|---|
| Look at what the claim is about | "Vitamin C contributes to normal collagen formation" is a statement about vitamin C. "Our product improves your skin" is a statement about the product. Only the second one requires evidence about the product, and it is almost always the one that is missing. |
| Check whether the study used the same thing | A study of fresh fermented milk is not evidence about a dried powder. A study of an isolated compound is not evidence about a food containing it. |
| Check who paid for it | Manufacturer-funded studies are not worthless, but they are not independent, and the funding should be disclosed. |
| Be suspicious of a timeline | "Results in 14 days" is a marketing decision, not a finding. |
| Registration is not efficacy | A registration number means a product has met regulatory requirements for sale. It does not mean the product has been shown to work. |

## 9. Honest limits

**Component:** `HonestLimits`

> **Heading:** What we don't know yet
>
> Almost everything a customer most wants to know. Whether it will do anything for you, how long that would take, and whether it would do more than a varied diet. We do not know, and no honest reading of the current evidence would let us pretend we do.
>
> What we can tell you is what is in it, where it came from, how it was made and what it was tested for. If that is not enough for you, it is entirely reasonable not to buy it.

## 10. Closing CTA

**Component:** `ClosingCTA`, shared bookend

> **Heading:** Questions we haven't answered
> **Body:** Ask us directly. If we don't know, we will say so.
> **Primary:** Send a message → `/contact/`
> **Secondary:** How it works → `/how-it-works/`

---

## Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| < 768px | Everything single-column. Claim-type table scrolls horizontally with a sticky first column. `TipList` 1 column |
| 768–1023px | `TipList` 2 columns for §6 |
| ≥ 1024px | Prose at 680px / `72ch`. Claim table fits without scroll |

## Accessibility notes

- One `<h1>`. This is the site's most heading-dense page; verify the outline reads as a usable table of contents on its own
- The "Can we make it?" column must convey Yes/No as text, never colour alone
- The regulatory panel is a `<section>` with `aria-labelledby` pointing at its heading, so it is reachable as a landmark-adjacent region
- `PullQuote` is a `<p>`
- The `last reviewed` and `status last updated` dates use `<time datetime="…">`

## SEO notes

| Element | Value |
|---|---|
| `<title>` | Our Research — What We Know and What We Don't · Steppe Gut |
| Meta description | What is established about fermented mare's milk, what is unsettled, what we have not tested, and where Thai FDA registration stands. |
| `<h1>` | Our research |
| JSON-LD | `Article` with `dateModified` bound to the real last-reviewed date. **Do not emit `MedicalWebPage` or any health-schema type** — this is not medical content and typing it as such invites the wrong scrutiny |
| Internal links | `/how-it-works/`, `/our-story/how-its-made/`, `/products/whats-inside/`, `/contact/`, the four science articles |
| Target queries | "is fermented mare's milk proven", "fermented mare's milk research", "Steppe Gut FDA", "is mare's milk a probiotic" |
| Strategic note | This page will rank for sceptical queries. That is the intent. A sceptic who arrives here and finds a straight answer converts better than one who arrives at a sales page |

## Developer notes

- Route `/our-story/our-research/`, lazy-loaded
- **No images.** This page is deliberately plain. Do not add a stock laboratory photograph — it would undercut every word on it
- Regulatory content in `src/data/regulatory.js` with `lastUpdated`; the footer disclosure block reads the same file
- The claim-type table in §3 reads from the same source as the brand-guidelines claim tiers, so the policy and its public statement cannot drift
- Reuses `PullQuote`, `ComparisonTable`, `TipList`, `HonestLimits`, `ClosingCTA`. No new components
- **Every factual assertion on this page must be confirmed with the client before publication** — particularly §6 ("we have not run a trial", "we have no advisory board") and §7 (registration status). These are statements about the business, not copy
