# Steppe Gut account API

The service behind the account area: real accounts, server-side order history,
and the address book the checkout reads. Plain Node, no dependencies, no build
step.

Three things moved here from the browser:

| Was | Is now |
|---|---|
| A seeded demo account in `localStorage`, `signIn()` checking nothing | An account row with a scrypt-hashed password, checked on every sign-in |
| An order history keyed by email in one browser | Orders held per account, returned to any device that signs in |
| Saved addresses the checkout never read | Saved addresses the checkout offers, and can add to |

Payment, fulfilment and transactional email are deliberately **not** here. An
order is recorded, not charged, not shipped and not emailed.

## Running it

```bash
npm run dev:all      # the API and Vite together, which is the usual way
npm run server       # the API on its own, http://127.0.0.1:8787
npm run test:api     # the end-to-end tests, against a throwaway store
```

`npm run dev` still starts Vite alone. The account area then shows its
"could not reach the server" state, because it can't.

Vite proxies `/api` to the service (`vite.config.js`), so the browser stays on
one origin and the session cookie needs no CORS.

## Environment

| Variable | Default | What it does |
|---|---|---|
| `SG_API_PORT` | `8787` | Port to listen on |
| `SG_API_HOST` | `127.0.0.1` | Interface to bind. Localhost only by default |
| `SG_DB_FILE` | `server/data/db.json` | Where the store is written |
| `SG_ALLOWED_ORIGINS` | none | Comma-separated origins allowed to call the API from a browser. Any localhost origin is always allowed |
| `SG_SECURE_COOKIES` | `false` | `true` marks the session cookie `Secure`. Required once the site is served over https |
| `SG_ECHO_EMAIL_CODES` | `true` | `false` stops email-change codes being returned in the response |

## Endpoints

All JSON. The session is an HttpOnly cookie, so nothing carries a token by
hand.

| Method | Path | |
|---|---|---|
| GET | `/api/health` | Liveness |
| GET | `/api/session` | `{ user }` or `{ user: null }` |
| POST | `/api/auth/register` | `{ name, email, password, avatar?, promotions? }` |
| POST | `/api/auth/login` | `{ email, password }` |
| POST | `/api/auth/logout` | Ends this session |
| PATCH | `/api/account/profile` | `{ name?, avatar? }` |
| POST | `/api/account/email/code` | `{ email }`, issues a six-digit code |
| POST | `/api/account/email/confirm` | `{ code }`, changes the address |
| POST | `/api/account/password` | `{ current, next }`, ends other sessions |
| PATCH | `/api/account/notifications` | `{ key, value }` |
| GET | `/api/addresses` | The account's address book |
| POST | `/api/addresses` | `{ address }` |
| PATCH | `/api/addresses/:id` | `{ address }` |
| DELETE | `/api/addresses/:id` | |
| POST | `/api/addresses/:id/default` | |
| GET | `/api/orders` | Newest first |
| POST | `/api/orders` | `{ items: [{ slug, qty }], shippingAddressId \| shippingAddress, saveAddress? }` |
| GET | `/api/orders/:id` | One order |

A failure is `{ error }`, plus `field` when the message belongs under a
particular form field. `src/api/client.js` turns that into an `ApiError` the
forms render.

## What is enforced, and where

- **Passwords** are scrypt (`lib/passwords.js`), never stored or returned in
  any other form. `lib/users.js` has the only serialiser that leaves the
  server, so the hash cannot escape by being forgotten in a handler.
- **Sessions** are random 32-byte tokens in an HttpOnly, SameSite=Lax cookie,
  stored as SHA-256 (`lib/sessions.js`). Whoever reads the database still
  cannot sign in as anyone. Changing a password ends every other session.
- **Prices** are decided by `catalog.js`, never read from the request. A
  client that asks to pay 1 THB is charged the list price. The figures come
  from `src/checkout/demoPrices.js` so the cart, the checkout and the recorded
  order cannot drift apart.
- **Ownership**: an order or an address is only ever reachable through the
  session that owns it. Shipping to an address id that belongs to someone else
  is a 400, not a delivery.
- **Rate limits** on sign-in and password change (`lib/rateLimit.js`), in
  memory, per process.
- **Cross-site writes** are refused when the `Origin` is neither localhost nor
  in `SG_ALLOWED_ORIGINS`.

## The store

One JSON file, written atomically (`lib/db.json` via `lib/db.js`), holding
`users`, `sessions`, `orders` and a counter. It is the shape of three tables
on purpose: moving to SQLite or Postgres means replacing `lib/db.js`, not the
routes. A file that cannot be parsed is moved aside rather than overwritten.

`server/data/` is gitignored. It holds real accounts and hashed passwords, and
belongs on the machine that runs the service.

## Deploying

The site deploys to Vercel as a static SPA; this service does not go with it as
it stands. Two ways forward when the time comes:

1. Run it as a small Node service anywhere that runs Node, set
   `SG_ALLOWED_ORIGINS` to the site's origin, `SG_SECURE_COOKIES=true`, and
   point `VITE_API_URL` at it. The store should move off the JSON file first.
2. Port `routes/` to serverless functions under `api/`. `app.js` is the only
   piece that assumes a long-lived process, and it does so only for the hourly
   sweep of expired sessions.

Either way, replace the JSON store before there is more than one instance:
two processes writing one file will lose writes.

## Still missing, on purpose

Payment, stock, fulfilment beyond `processing`, transactional email, an admin
view, returns, and password reset. The last one is worth naming: there is no
"forgot password" route, because a reset needs an email to send the link to.
