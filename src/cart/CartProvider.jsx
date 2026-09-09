"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// Cart state. Frontend only - nothing here talks to a server, because there
// is no backend yet (cart-and-checkout.md, developer notes).
//
// Only `{ slug, qty }` is stored. Name, format and price are looked up from
// src/data/products.js at render time, so a stale basket can never serve an
// out-of-date price or a renamed product.
const STORAGE_KEY = "steppe-gut.cart.v1";

const CartContext = createContext(null);

function readStored() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed?.items)) return [];
    // Defensive: a hand-edited or partially-written value must not crash the
    // whole app on boot.
    return parsed.items.filter(
      (item) => typeof item?.slug === "string" && Number.isFinite(item?.qty)
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  // Empty on the server and on the first client render, then filled from
  // localStorage once mounted - reading it during render would make the
  // server and the client disagree about the basket badge at hydration.
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setItems(readStored());
    setLoaded(true);
  }, []);
  // Mirrored into an aria-live region by CartAnnouncer, so cart changes are
  // announced rather than only reflected in the header badge - which is
  // off-screen for a screen-reader user (cart-and-checkout.md §1).
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    // Not before the stored basket has been read, or the empty first render
    // would overwrite it.
    if (!loaded) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ items, updatedAt: Date.now() })
      );
    } catch {
      // A full or blocked storage quota is not a reason to break the cart.
    }
  }, [items, loaded]);

  const add = useCallback((slug, qty = 1, name = "Item") => {
    setItems((current) => {
      const existing = current.find((item) => item.slug === slug);
      if (existing) {
        return current.map((item) =>
          item.slug === slug ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...current, { slug, qty }];
    });
    setAnnouncement(`${name} added to your basket.`);
  }, []);

  const setQty = useCallback((slug, qty, name = "Item") => {
    setItems((current) =>
      qty <= 0
        ? current.filter((item) => item.slug !== slug)
        : current.map((item) => (item.slug === slug ? { ...item, qty } : item))
    );
    setAnnouncement(
      qty <= 0 ? `${name} removed from your basket.` : `${name} quantity ${qty}.`
    );
  }, []);

  const remove = useCallback((slug, name = "Item") => {
    setItems((current) => current.filter((item) => item.slug !== slug));
    setAnnouncement(`${name} removed from your basket.`);
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(
    () => items.reduce((total, item) => total + item.qty, 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, count, add, setQty, remove, clear, announcement }),
    [items, count, add, setQty, remove, clear, announcement]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return context;
}

/** Persistent polite live region. Rendered once, in the layout shell. */
export function CartAnnouncer() {
  const { announcement } = useCart();
  return (
    <div aria-live="polite" className="sr-only">
      {announcement}
    </div>
  );
}
