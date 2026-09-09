// Placing an order.
//
// This is the only account write that does not go straight from the browser to
// the database, and the reason is price. What the browser is allowed to decide
// is which products, how many, and where to deliver. Price, promotion, order
// number, date and status are decided here: a basket that asks to pay 1 THB is
// priced at the same rate as everyone else.
//
// Two clients are used on purpose. The session-bound one answers "who is
// asking" under the same row-level security as the browser. The service one
// writes the row, because `orders` has no insert policy - there is deliberately
// no way to write an order from the browser at all.

import { NextResponse } from "next/server";
import { supabaseServer, supabaseAdmin } from "../../../lib/supabase/server";
import { CURRENCY, priceBasket } from "../../../../server/catalog.js";
import { HttpError } from "../../../../server/lib/http.js";
import { normaliseAddress } from "../../../../server/lib/validate.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function refusal(error) {
  if (error instanceof HttpError) {
    return NextResponse.json(
      { error: error.message, ...(error.details ?? {}) },
      { status: error.status }
    );
  }
  // An unexpected failure is logged in full and reported as one line. The
  // visitor gets no stack trace and no internal detail.
  console.error("[api/orders]", error);
  return NextResponse.json({ error: "Something went wrong at our end" }, { status: 500 });
}

export async function POST(request) {
  try {
    const supabase = await supabaseServer();
    const { data: auth } = await supabase.auth.getUser();
    const user = auth?.user;
    if (!user) throw new HttpError(401, "Sign in to continue");

    let body;
    try {
      body = await request.json();
    } catch {
      throw new HttpError(400, "That request could not be read");
    }

    const priced = priceBasket(body.items);
    const admin = supabaseAdmin();

    // Where it goes. Either one of the account's saved addresses by id, or an
    // address typed into the checkout - which can be saved to the account in
    // the same request, which is how the checkout fills the address book.
    let shippingAddress = null;

    if (body.shippingAddressId) {
      // Read through the session client, so an address id belonging to someone
      // else is simply not found rather than quietly shipped to.
      const { data: saved } = await supabase
        .from("addresses")
        .select("*")
        .eq("id", body.shippingAddressId)
        .maybeSingle();
      if (!saved) throw new HttpError(400, "That address is not on your account");
      shippingAddress = publicAddress(saved);
    } else if (body.shippingAddress) {
      shippingAddress = normaliseAddress(body.shippingAddress);
      if (body.saveAddress) {
        const { data: stored, error } = await supabase
          .from("addresses")
          .insert({
            user_id: user.id,
            label: shippingAddress.label,
            name: shippingAddress.name,
            line1: shippingAddress.line1,
            line2: shippingAddress.line2,
            city: shippingAddress.city,
            postal_code: shippingAddress.postalCode,
            country: shippingAddress.country,
            phone: shippingAddress.phone,
            is_default: false,
          })
          .select()
          .single();
        // Failing to file the address is not a reason to lose the order: the
        // order still records where it is going, it just is not saved for
        // next time.
        if (!error) shippingAddress = publicAddress(stored);
        else console.error("[api/orders] address not saved", error);
      }
    }

    const { data: order, error } = await admin
      .from("orders")
      .insert({
        user_id: user.id,
        // Every order starts here. Nothing moves one on to shipped or
        // delivered yet, because nothing ships it.
        status: "processing",
        currency: CURRENCY,
        // The price charged, recorded on the line. A past order does not
        // re-price itself when list prices move.
        items: priced.lines,
        totals: priced.totals,
        promo_label: priced.promoLabel,
        // A copy, not a reference: deleting the saved address later must not
        // rewrite where this order went.
        shipping_address: shippingAddress,
      })
      .select()
      .single();
    if (error) throw error;

    return NextResponse.json(
      {
        order: {
          id: order.id,
          placedOn: order.placed_on,
          status: order.status,
          currency: order.currency,
          items: order.items,
          totals: order.totals,
          promoLabel: order.promo_label ?? null,
          shippingAddress: order.shipping_address ?? null,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return refusal(error);
  }
}

function publicAddress(row) {
  return {
    id: row.id,
    label: row.label,
    name: row.name,
    line1: row.line1,
    line2: row.line2 ?? "",
    city: row.city,
    postalCode: row.postal_code ?? "",
    country: row.country ?? "",
    phone: row.phone ?? "",
    isDefault: Boolean(row.is_default),
  };
}
