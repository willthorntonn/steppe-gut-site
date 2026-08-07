import { Link } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import Picture from "../ui/Picture";
import Placeholder from "../ui/Placeholder";
import { useCart } from "../../cart/CartProvider";
import { BODY_SM, CAPTION, H4 } from "../../styles/type";

// One basket line. Quantity changes and removal both announce through the
// persistent aria-live region in CartProvider — the header badge alone is
// off-screen for a screen-reader user (cart-and-checkout.md §1).
//
// Every control here is a 44px touch target.
export default function CartLine({ product, qty }) {
  const { setQty, remove } = useCart();

  return (
    <li className="flex gap-5 border-b border-forest/12 py-7 first:pt-0">
      <div className="w-[88px] shrink-0 overflow-hidden rounded-xl bg-[#FFFDF9] sm:w-[110px]">
        {product.image ? (
          <Picture
            avif={product.image.avif}
            webp={product.image.webp}
            alt=""
            width={110}
            height={138}
            imgClassName="aspect-[4/5] w-full object-cover"
          />
        ) : (
          <Placeholder ratio="4 / 5" brief="" tone="light" className="border-0" />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-serif font-normal text-forest" style={H4}>
              <Link
                to={`/products/${product.slug}/`}
                className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                {product.name}
              </Link>
            </h3>
            <p className="mt-1 font-sans text-forest/55" style={CAPTION}>
              {product.format}
            </p>
          </div>

          <button
            type="button"
            aria-label={`Remove ${product.name} from basket`}
            onClick={() => remove(product.slug, product.name)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-forest/60 transition-colors hover:bg-forest/5 hover:text-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 pt-5">
          <div className="flex items-center rounded-full border border-forest/25">
            <button
              type="button"
              aria-label={`Decrease quantity of ${product.name}`}
              onClick={() => setQty(product.slug, qty - 1, product.name)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-forest transition-colors hover:bg-forest/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <Minus size={16} strokeWidth={1.75} />
            </button>
            <span className="w-8 text-center font-sans text-base font-semibold text-forest">
              {qty}
            </span>
            <button
              type="button"
              aria-label={`Increase quantity of ${product.name}`}
              onClick={() => setQty(product.slug, qty + 1, product.name)}
              className="flex h-11 w-11 items-center justify-center rounded-full text-forest transition-colors hover:bg-forest/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <Plus size={16} strokeWidth={1.75} />
            </button>
          </div>

          {product.price != null && (
            <p className="font-sans font-semibold text-forest" style={BODY_SM}>
              ฿{(product.price * qty).toLocaleString("en-TH")}
            </p>
          )}
        </div>
      </div>
    </li>
  );
}
