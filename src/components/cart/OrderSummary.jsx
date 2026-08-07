import Button from "../ui/Button";
import { BODY_SM, CAPTION, H4 } from "../../styles/type";
import { PRODUCT_BY_SLUG } from "../../data/products";
import { useCart } from "../../cart/CartProvider";

/**
 * Subtotal is only meaningful once prices exist. While every product's price
 * is null (see data/products.js), the summary states that plainly instead of
 * rendering "฿0" or "฿—" — a zero total on a basket with items in it is a
 * bug's worth of confusion, and a dash is the placeholder price that
 * products-collection.md §2 rules out.
 */
export default function OrderSummary({ ctaLabel, ctaTo, children }) {
  const { items } = useCart();

  const priced = items.every(
    (item) => PRODUCT_BY_SLUG[item.slug]?.price != null
  );
  const subtotal = priced
    ? items.reduce(
        (total, item) => total + PRODUCT_BY_SLUG[item.slug].price * item.qty,
        0
      )
    : null;
  const count = items.reduce((total, item) => total + item.qty, 0);

  return (
    <div className="rounded-2xl border border-forest/12 bg-[#FFFDF9] p-7">
      <h2 className="font-serif font-normal text-forest" style={H4}>
        Summary
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="font-sans text-forest/70" style={BODY_SM}>
            Items
          </dt>
          <dd className="font-sans font-semibold text-forest" style={BODY_SM}>
            {count}
          </dd>
        </div>

        <div className="flex items-baseline justify-between gap-4 border-t border-forest/12 pt-4">
          <dt className="font-sans text-forest/70" style={BODY_SM}>
            Subtotal
          </dt>
          <dd className="font-sans font-semibold text-forest" style={BODY_SM}>
            {subtotal == null
              ? "Not published yet"
              : `฿${subtotal.toLocaleString("en-TH")}`}
          </dd>
        </div>
      </dl>

      {subtotal == null && (
        <p className="mt-5 font-sans text-forest/60" style={CAPTION}>
          We have not published prices yet. You can keep a basket, but nothing
          can be totalled or paid for until they are set.
        </p>
      )}

      {ctaTo && (
        <Button
          to={ctaTo}
          variant="forest"
          radius="2xl"
          className="mt-7 h-13 w-full py-4 text-[17px]"
        >
          {ctaLabel}
        </Button>
      )}

      {children}

      <p className="mt-5 font-sans text-forest/55" style={CAPTION}>
        Delivery is calculated at checkout. Unopened packs can be returned
        within 14 days.
      </p>
    </div>
  );
}
