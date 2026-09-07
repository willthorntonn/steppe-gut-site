// Saved addresses. They belong to the account, not to a browser, and they are
// what the checkout reads when it offers "deliver to a saved address".
//
// Two invariants are enforced here rather than trusted from the client: an
// address always belongs to the signed-in account, and exactly one address is
// the default while any address exists.

import { randomUUID } from "node:crypto";
import { HttpError } from "../lib/http.js";
import { publicUser, requireUser } from "../lib/users.js";
import { normaliseAddress, withOneDefault } from "../lib/validate.js";

const MAX_ADDRESSES = 20;

function respond(ctx, user) {
  ctx.db.save();
  return { body: { addresses: user.addresses, user: publicUser(user) } };
}

export async function list(ctx) {
  const user = requireUser(ctx);
  return { body: { addresses: user.addresses ?? [] } };
}

export async function create(ctx) {
  const user = requireUser(ctx);
  const addresses = user.addresses ?? [];
  if (addresses.length >= MAX_ADDRESSES) {
    throw new HttpError(400, "That is as many addresses as one account can hold");
  }
  const address = {
    ...normaliseAddress(ctx.body.address ?? ctx.body),
    id: `addr-${randomUUID().slice(0, 8)}`,
    isDefault: false,
  };
  const wantsDefault = Boolean((ctx.body.address ?? ctx.body).isDefault);
  // The first address saved is the default whether it asked to be or not.
  const preferred = addresses.length === 0 || wantsDefault ? address.id : null;
  user.addresses = withOneDefault([...addresses, address], preferred);
  return respond(ctx, user);
}

export async function update(ctx) {
  const user = requireUser(ctx);
  const addresses = user.addresses ?? [];
  const index = addresses.findIndex((address) => address.id === ctx.params.id);
  if (index === -1) throw new HttpError(404, "That address is not on your account");

  const patch = normaliseAddress({ ...addresses[index], ...(ctx.body.address ?? ctx.body) });
  const next = [...addresses];
  next[index] = { ...patch, id: addresses[index].id, isDefault: addresses[index].isDefault };
  user.addresses = withOneDefault(next);
  return respond(ctx, user);
}

export async function remove(ctx) {
  const user = requireUser(ctx);
  const addresses = user.addresses ?? [];
  if (!addresses.some((address) => address.id === ctx.params.id)) {
    throw new HttpError(404, "That address is not on your account");
  }
  // Removing the default promotes whichever address is left, so the checkout
  // is never left without one to offer first.
  user.addresses = withOneDefault(
    addresses.filter((address) => address.id !== ctx.params.id)
  );
  return respond(ctx, user);
}

export async function makeDefault(ctx) {
  const user = requireUser(ctx);
  const addresses = user.addresses ?? [];
  if (!addresses.some((address) => address.id === ctx.params.id)) {
    throw new HttpError(404, "That address is not on your account");
  }
  user.addresses = withOneDefault(addresses, ctx.params.id);
  return respond(ctx, user);
}
