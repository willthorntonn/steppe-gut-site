# Handoff: Stripe live activation + phone change

## Done (uncommitted, branch `next-migration`)
- Phone changed site-wide to `+66 92-442-4045` (href `+66924424045`): `src/data/site.js`, `src/views/Privacy.jsx`, `website_blueprint/pages/*.md`.

## Stripe state
- Live account `acct_1UE70gLzIVp3h582` ("Steppe Gut"), driven via Claude in Chrome (user's own logged-in Chrome; tab id may be stale, call `tabs_context_mcp` first).
- Page: `https://dashboard.stripe.com/acct_1UE70gLzIVp3h582/account/onboarding/company` (Business details).
- Filled but NOT submitted: Y Family Co., Ltd.; TIN and company reg no. 0105565114721; 45/1 Silom, 19 Building, 4th Floor, Room 415 / Trok Weth, Silom Road, Silom Subdistrict; Bangkok; Bangkok province; 10500; phone +66 92 442 4045; www.steppegut.com. The user rejected my Continue click; ask before clicking it. Re-fill if the form was reset.
- Draft "products or services" text (supplement, no medical claims): fermented mare's milk powder, gut-health food supplement from Mongolia, sold online as 25 x 10 g sachet box, 90-capsule bottle, 250 g refill pouch; one-time physical goods; card and PromptPay at www.steppegut.com; made by Monsubi Foods LLC, sold by Y Family Co., Ltd.

## Rules for this task
- Do not type passwords, personal ID numbers, or the bank account number/holder name. Hand those to the user and wait for "done". The user holds the Kasikornbank details (holder is "MRS. MUNAR @ HLA HLA WIN", which does not match the company; Stripe may flag it, so the user should confirm it is intended).
- The classifier blocked "Switch to live account"; the user did that themselves.
- Remaining wizard steps: Account representative and Business owners (personal ID, user), Products or services, Public details, Statement descriptor, Add your bank (user), 2FA, Review and submit (user).

## After activation
- Replace the test keys in `.env.local` (`STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`) with live ones. The user pastes them; do not print their values.
- Create a live webhook endpoint pointing at `/api/stripe/webhook`.
- All `price` values in `src/data/products.js` are `null`, so set real prices before Stripe's review or any live sale.
