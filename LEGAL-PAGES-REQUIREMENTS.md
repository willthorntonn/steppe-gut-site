# Legal Pages — Information Needed

Covers the Privacy Policy, Terms and Conditions, and Cookie Policy.

Context: Steppe Gut exports fermented mare's milk supplement from Mongolia, office based in
Thailand, ships worldwide.

Not legal advice. This is a checklist of inputs required before the pages can be drafted and
reviewed.

---

## 1. What we handle ourselves (no input needed)

We can produce all of this from the site and the tech stack without asking anyone:

- Page structure and standard clauses for all three documents
- How personal data is collected (checkout, account signup, newsletter, contact form, cookies,
  social channels)
- Data-subject rights wording (access, rectification, erasure, portability, restriction,
  objection, withdraw consent) and how to exercise them
- Lawful-basis mapping for each processing purpose
- Retention approach and standard wording
- Security-measures statement
- Children / age statement
- Health and product disclaimers (food supplement not medicine, not intended to diagnose or
  treat, consult a doctor, do not exceed dose) — final allergen and dose figures come from Sagar
- Consumer rights, faulty goods, limitation of liability, force majeure, IP, user-generated
  content licence, and all other Terms boilerplate
- Website hosting and CDN provider
- Cookie consent banner / tool selection and setup
- Analytics tools
- Advertising and pixel platforms
- Ecommerce platform
- Reviews app
- Helpdesk / CRM / support tool
- Full cookie audit (name, provider, purpose, category, duration, first or third party) from the
  deployed site
- "Last updated" date handling on each page

---

## 2. What Sagar and others need to provide

Facts and decisions we cannot produce ourselves.

### Company and legal identity

- Official registered legal entity name(s) for "Steppe Gut"
- One entity or two (Mongolia exporter plus a separate Thailand entity), and which one sells to
  customers and is the data controller
- Country of registration and company registration number for each entity
- Registered office / principal business address (Thailand, plus Mongolia entity address if
  separate)
- Public trading name confirmation ("Steppe Gut")
- Tax / VAT registration number(s) and jurisdiction

### Contact

- Customer support email
- Privacy / legal contact email (can be the same)
- Phone number and postal address for formal legal notices
- Name or job title of the person responsible for data protection

### Product and compliance

- Manufacturer / producer name and address (for the label and Terms)
- Full ingredient and allergen statement (mare's milk / dairy wording)
- Recommended daily dose and usage warnings (pregnancy, medication, age)
- Any market approvals or food-supplement / novel-food registration status for the countries
  shipped to

### Logistics and commercial decisions

- ~~Fulfilment, freight and courier partners used for worldwide shipping~~ — EMS and DHL
  (international), Flash Express and Lalamove (domestic, Thailand). Reflected in
  `src/views/Terms.jsx` ("Delivery") and `src/data/faq.js`.
- Payment processor(s) in use
- Governing law and jurisdiction for the Terms (Thailand, Mongolia, England, or other)
- Which entity is named as the seller / contracting party
- Currency prices are shown in, and whether prices include or exclude tax
- ~~Who pays import duties, customs and taxes on international orders (customer or company)~~ —
  customer. Reflected in `src/views/Terms.jsx` and `src/data/faq.js`.
- ~~List of countries shipped to, or any excluded countries~~ — domestic (Thailand) and
  international, no exclusions given. Reflected in `src/data/faq.js`. Note: checkout
  (`src/components/checkout/CheckoutForm.jsx`) is still hard-coded to Thailand-only addresses;
  opening it up to international orders is a separate build (country selector, address formats,
  shipping-cost logic), not yet done.
- ~~Returns and refund policy for an opened or sealed consumable: returns accepted or not, who
  pays return shipping, refund window~~ — 7-day window; pack must be unopened and sealed, or
  opened with photo/video evidence of a quality or damage issue; customer pays return shipping.
  Reflected in `src/views/Terms.jsx` ("Cancellation and returns") and `src/data/faq.js`.
- Whether subscriptions are sold, and the billing and cancellation terms if so
- Minimum age to purchase or use the product

Delivery timeframes: domestic 2-5 working days, international 2-4 weeks. Failed/delayed delivery
policy (trace with courier, then reship or refund if confirmed lost) is a standard policy for this
product type, not a business decision Will supplied — flagged for his review, now applied.

Pre-dispatch cancellation right: customers can cancel for any reason any time before dispatch,
full refund — standard practice for this product type, now applied to `src/views/Terms.jsx` and
`src/data/faq.js`. Thai consumer law gives no further mandatory minimum right (cooling-off or
otherwise) for this type of product beyond the policy above, so the Terms page states the returns
policy as the company's own, not a statutory entitlement.

---

## 3. Sagar list — titles only

- Official registered legal entity name(s)
- One entity or two, and which one sells
- Country of registration and company registration number
- Registered office / business address
- Public trading name confirmation
- Tax / VAT registration number(s) and jurisdiction
- Customer support email
- Privacy / legal contact email
- Phone number and postal address for legal notices
- Person responsible for data protection
- Manufacturer / producer name and address
- Full ingredient and allergen statement
- Recommended daily dose and usage warnings
- Market approvals / food-supplement registration status
- Fulfilment, freight and courier partners
- Payment processor(s)
- Governing law and jurisdiction
- Entity named as seller / contracting party
- Currency and tax-inclusive or exclusive pricing
- Responsibility for import duties and customs
- Countries shipped to / excluded countries
- Returns and refund policy for consumables
- Subscriptions: yes or no, plus billing and cancellation terms
- Minimum age to purchase or use
