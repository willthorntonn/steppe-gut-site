// End-to-end tests for the account API. The real HTTP server is started on a
// random port against a throwaway store, then driven with fetch, so what is
// tested is what the browser will actually meet - cookies, status codes and
// all. Run it with `npm run test:api`.

import assert from "node:assert/strict";
import http from "node:http";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test, { after, before } from "node:test";
import { createApp } from "../app.js";
import { createDb } from "../lib/db.js";

let server;
let base;
let dbFile;

before(async () => {
  dbFile = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "sg-api-")), "db.json");
  const db = createDb(dbFile);
  const handle = createApp(db);
  server = http.createServer((req, res) => handle(req, res));
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  fs.rmSync(path.dirname(dbFile), { recursive: true, force: true });
});

/** A tiny client that keeps one cookie jar, like one browser would. */
function client() {
  let cookie = null;
  return async function call(method, url, body) {
    const response = await fetch(`${base}${url}`, {
      method,
      headers: {
        ...(body ? { "content-type": "application/json" } : null),
        ...(cookie ? { cookie } : null),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    const setCookie = response.headers.getSetCookie?.()[0];
    if (setCookie) cookie = setCookie.split(";")[0];
    const text = await response.text();
    return { status: response.status, body: text ? JSON.parse(text) : null };
  };
}

const ANA = { name: "Ana Ruiz", email: "ana@example.com", password: "correct horse" };
const BEN = { name: "Ben Cole", email: "ben@example.com", password: "another one!!" };

test("a fresh visitor has no session", async () => {
  const call = client();
  const { status, body } = await call("GET", "/api/session");
  assert.equal(status, 200);
  assert.equal(body.user, null);
});

test("register signs the new account in and never returns the password", async () => {
  const call = client();
  const { status, body } = await call("POST", "/api/auth/register", ANA);
  assert.equal(status, 201);
  assert.equal(body.user.email, "ana@example.com");
  assert.equal(body.user.passwordHash, undefined);
  assert.deepEqual(body.user.addresses, []);
  const session = await call("GET", "/api/session");
  assert.equal(session.body.user.email, "ana@example.com");
});

test("a second account cannot take the same email", async () => {
  const call = client();
  const { status } = await call("POST", "/api/auth/register", {
    ...ANA,
    name: "Someone Else",
  });
  assert.equal(status, 409);
});

test("a short password is refused", async () => {
  const call = client();
  const { status } = await call("POST", "/api/auth/register", {
    name: "Too Short",
    email: "short@example.com",
    password: "1234567",
  });
  assert.equal(status, 400);
});

test("the password is actually checked", async () => {
  const call = client();
  const wrong = await call("POST", "/api/auth/login", {
    email: ANA.email,
    password: "not it",
  });
  assert.equal(wrong.status, 401);
  const right = await call("POST", "/api/auth/login", {
    email: ANA.email,
    password: ANA.password,
  });
  assert.equal(right.status, 200);
  assert.equal(right.body.user.name, "Ana Ruiz");
});

test("an unknown email fails the same way a wrong password does", async () => {
  const call = client();
  const missing = await call("POST", "/api/auth/login", {
    email: "nobody@example.com",
    password: ANA.password,
  });
  assert.equal(missing.status, 401);
  assert.equal(missing.body.error, "That email and password don't match an account");
});

test("orders and addresses need a session", async () => {
  const call = client();
  assert.equal((await call("GET", "/api/orders")).status, 401);
  assert.equal((await call("GET", "/api/addresses")).status, 401);
  assert.equal(
    (await call("POST", "/api/orders", { items: [{ slug: "sachet-box", qty: 1 }] })).status,
    401
  );
});

test("addresses keep exactly one default", async () => {
  const call = client();
  await call("POST", "/api/auth/login", { email: ANA.email, password: ANA.password });

  const first = await call("POST", "/api/addresses", {
    address: {
      label: "Home",
      name: "Ana Ruiz",
      line1: "45/1 Silom Road",
      city: "Bang Rak, Bangkok",
      postalCode: "10500",
      country: "Thailand",
    },
  });
  assert.equal(first.status, 200);
  assert.equal(first.body.addresses.length, 1);
  assert.equal(first.body.addresses[0].isDefault, true);

  const second = await call("POST", "/api/addresses", {
    address: { label: "Office", name: "Ana Ruiz", line1: "1 Sathorn", city: "Bangkok" },
  });
  assert.equal(second.body.addresses.filter((a) => a.isDefault).length, 1);
  assert.equal(second.body.addresses[0].isDefault, true);

  const officeId = second.body.addresses[1].id;
  const promoted = await call("POST", `/api/addresses/${officeId}/default`);
  assert.equal(promoted.body.addresses.find((a) => a.id === officeId).isDefault, true);
  assert.equal(promoted.body.addresses.filter((a) => a.isDefault).length, 1);

  const removed = await call("DELETE", `/api/addresses/${officeId}`);
  assert.equal(removed.body.addresses.length, 1);
  assert.equal(removed.body.addresses[0].isDefault, true);

  const missing = await call("DELETE", "/api/addresses/addr-nope");
  assert.equal(missing.status, 404);
});

test("an address with no name or city is refused", async () => {
  const call = client();
  await call("POST", "/api/auth/login", { email: ANA.email, password: ANA.password });
  const { status } = await call("POST", "/api/addresses", {
    address: { label: "Broken", line1: "" },
  });
  assert.equal(status, 400);
});

test("the server prices the order, not the browser", async () => {
  const call = client();
  await call("POST", "/api/auth/login", { email: ANA.email, password: ANA.password });
  const { status, body } = await call("POST", "/api/orders", {
    // A hostile client asking for a 1 THB box, and lying about the name.
    items: [{ slug: "sachet-box", qty: 2, unitPrice: 1, name: "Free box" }],
    totals: { original: 2, savings: 0, total: 2 },
  });
  assert.equal(status, 201);
  assert.equal(body.order.items[0].unitPrice, 1956);
  assert.equal(body.order.items[0].name, "Steppe Gut Sachet Box");
  assert.equal(body.order.totals.total, 3129.6);
  assert.equal(body.order.promoLabel, "Launch offer, 20% off two or more");
  assert.equal(body.order.status, "processing");
  assert.match(body.order.id, /^SG-\d+$/);
});

test("an unknown product cannot be ordered", async () => {
  const call = client();
  await call("POST", "/api/auth/login", { email: ANA.email, password: ANA.password });
  assert.equal(
    (await call("POST", "/api/orders", { items: [{ slug: "gold-bar", qty: 1 }] })).status,
    400
  );
  assert.equal((await call("POST", "/api/orders", { items: [] })).status, 400);
});

test("an order can ship to a saved address, and only to one of your own", async () => {
  const call = client();
  await call("POST", "/api/auth/login", { email: ANA.email, password: ANA.password });
  const { body: list } = await call("GET", "/api/addresses");
  const id = list.addresses[0].id;

  const ok = await call("POST", "/api/orders", {
    items: [{ slug: "pill-bottle", qty: 1 }],
    shippingAddressId: id,
  });
  assert.equal(ok.status, 201);
  assert.equal(ok.body.order.shippingAddress.line1, "45/1 Silom Road");

  const foreign = await call("POST", "/api/orders", {
    items: [{ slug: "pill-bottle", qty: 1 }],
    shippingAddressId: "addr-someone-else",
  });
  assert.equal(foreign.status, 400);
});

test("a checkout address can be saved to the account as it is used", async () => {
  const call = client();
  await call("POST", "/api/auth/login", { email: ANA.email, password: ANA.password });
  const before = (await call("GET", "/api/addresses")).body.addresses.length;
  const { body } = await call("POST", "/api/orders", {
    items: [{ slug: "sachet-bag", qty: 1 }],
    shippingAddress: { label: "Studio", name: "Ana Ruiz", line1: "9 Ekkamai", city: "Bangkok" },
    saveAddress: true,
  });
  assert.equal(body.order.shippingAddress.label, "Studio");
  const after = (await call("GET", "/api/addresses")).body.addresses;
  assert.equal(after.length, before + 1);
});

test("order numbers do not collide across accounts", async () => {
  const ana = client();
  await ana("POST", "/api/auth/login", { email: ANA.email, password: ANA.password });
  const first = await ana("POST", "/api/orders", { items: [{ slug: "sachet-box", qty: 1 }] });

  const ben = client();
  await ben("POST", "/api/auth/register", BEN);
  const second = await ben("POST", "/api/orders", { items: [{ slug: "sachet-box", qty: 1 }] });

  assert.notEqual(first.body.order.id, second.body.order.id);
});

test("one account cannot see another's orders", async () => {
  const ben = client();
  await ben("POST", "/api/auth/login", { email: BEN.email, password: BEN.password });
  const { body } = await ben("GET", "/api/orders");
  assert.equal(body.orders.length, 1);
  assert.equal(body.orders[0].items[0].slug, "sachet-box");

  const ana = client();
  await ana("POST", "/api/auth/login", { email: ANA.email, password: ANA.password });
  const mine = await ana("GET", "/api/orders");
  assert.ok(mine.body.orders.length > 1);
  // Newest first.
  const dates = mine.body.orders.map((order) => new Date(order.placedOn).getTime());
  assert.deepEqual(dates, [...dates].sort((a, b) => b - a));
});

test("changing a password needs the old one and ends other sessions", async () => {
  const phone = client();
  const laptop = client();
  await phone("POST", "/api/auth/login", { email: BEN.email, password: BEN.password });
  await laptop("POST", "/api/auth/login", { email: BEN.email, password: BEN.password });

  const wrong = await laptop("POST", "/api/account/password", {
    current: "guessing",
    next: "a new long one",
  });
  assert.equal(wrong.status, 400);

  const right = await laptop("POST", "/api/account/password", {
    current: BEN.password,
    next: "a new long one",
  });
  assert.equal(right.status, 204);

  assert.equal((await phone("GET", "/api/session")).body.user, null);
  assert.equal((await laptop("GET", "/api/session")).body.user.email, BEN.email);

  const back = await laptop("POST", "/api/auth/login", {
    email: BEN.email,
    password: "a new long one",
  });
  assert.equal(back.status, 200);
});

test("an email change is confirmed with a code the server issued", async () => {
  const call = client();
  await call("POST", "/api/auth/login", { email: BEN.email, password: "a new long one" });

  const started = await call("POST", "/api/account/email/code", {
    email: "ben.cole@example.com",
  });
  assert.equal(started.status, 200);
  assert.match(started.body.code, /^\d{6}$/);

  const wrong = await call("POST", "/api/account/email/confirm", { code: "000000" });
  assert.ok(wrong.status === 400 || wrong.status === 429);

  const retry = await call("POST", "/api/account/email/code", {
    email: "ben.cole@example.com",
  });
  const done = await call("POST", "/api/account/email/confirm", { code: retry.body.code });
  assert.equal(done.status, 200);
  assert.equal(done.body.user.email, "ben.cole@example.com");
  assert.equal(done.body.user.pendingEmail, null);

  const taken = await call("POST", "/api/account/email/code", { email: ANA.email });
  assert.equal(taken.status, 409);
});

test("notifications only accept known keys", async () => {
  const call = client();
  await call("POST", "/api/auth/login", { email: ANA.email, password: ANA.password });
  const ok = await call("PATCH", "/api/account/notifications", {
    key: "productNews",
    value: true,
  });
  assert.equal(ok.body.user.notifications.productNews, true);
  const bad = await call("PATCH", "/api/account/notifications", {
    key: "isAdmin",
    value: true,
  });
  assert.equal(bad.status, 400);
});

test("signing out ends the session", async () => {
  const call = client();
  await call("POST", "/api/auth/login", { email: ANA.email, password: ANA.password });
  assert.equal((await call("POST", "/api/auth/logout")).status, 204);
  assert.equal((await call("GET", "/api/session")).body.user, null);
  assert.equal((await call("GET", "/api/orders")).status, 401);
});

test("a cross-site write is refused", async () => {
  const response = await fetch(`${base}/api/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://evil.example" },
    body: JSON.stringify({ email: ANA.email, password: ANA.password }),
  });
  assert.equal(response.status, 403);
});

test("unknown endpoints and wrong methods answer differently", async () => {
  const call = client();
  assert.equal((await call("GET", "/api/nope")).status, 404);
  assert.equal((await call("GET", "/api/auth/login")).status, 405);
});

test("the store survives a restart", async () => {
  const reopened = createDb(dbFile);
  assert.ok(Object.keys(reopened.data.users).length >= 2);
  const someone = Object.values(reopened.data.users)[0];
  assert.match(someone.passwordHash, /^scrypt\$/);
  assert.ok(!JSON.stringify(reopened.data).includes(ANA.password));
});
