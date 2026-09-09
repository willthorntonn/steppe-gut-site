"use client";

import { useEffect, useState } from "react";
import Button from "../ui/Button";
import Picture from "../ui/Picture";
import { useCart } from "../../cart/CartProvider";

// 05_component_library.md §27.
//
// Triggered by an IntersectionObserver on the buy box itself, not a
// scroll-position threshold - a threshold breaks at different viewport
// heights.
//
// While hidden the bar is removed from the document entirely rather than just
// visually hidden, so its Add-to-basket button is not announced a second time
// alongside the one in the buy box.
export default function StickyBuyBar({ product, boxRef }) {
  const [visible, setVisible] = useState(false);
  const { add } = useCart();

  useEffect(() => {
    const node = boxRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [boxRef]);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-forest/12 bg-[#FFFDF9] shadow-[0_-10px_40px_-18px_rgba(47,62,47,0.28)]">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-6 py-3 sm:px-10 lg:px-14">
        <div className="flex min-w-0 items-center gap-4">
          {product.image && (
            <Picture
              avif={product.image.avif}
              webp={product.image.webp}
              alt=""
              width={40}
              height={50}
              className="hidden shrink-0 overflow-hidden rounded-md sm:block"
              imgClassName="h-12 w-10 object-cover"
            />
          )}
          <div className="hidden min-w-0 sm:block">
            <p className="truncate font-serif text-lg text-forest">
              {product.name}
            </p>
            {product.price != null && (
              <p className="font-sans text-sm font-semibold text-forest/70">
                ฿{product.price.toLocaleString("en-TH")}
              </p>
            )}
          </div>
        </div>

        <Button
          variant="forest"
          radius="2xl"
          onClick={() => add(product.slug, 1, product.name)}
          className="h-12 w-full px-8 text-[16px] sm:w-auto"
        >
          Add to basket
        </Button>
      </div>
    </div>
  );
}
