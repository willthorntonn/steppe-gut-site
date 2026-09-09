"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "../auth/AuthProvider";
import { api } from "../api/client";

// Order history, served by the account API in `server/`.
//
// It used to be a localStorage map keyed by email, which meant a history that
// existed in one browser and nowhere else. Now an order is a row against the
// account on the server, so signing in on a phone shows the order placed on a
// laptop, and clearing site data loses nothing.
//
// What did not change is what an order is: it records the figures it was
// charged - unit price per line, savings, total - rather than pointing at
// today's list price, so a past order does not re-price itself. What changed
// is who decides them. The browser posts slugs and quantities; the server
// prices the basket (server/catalog.js) and returns the order it stored. A
// client asking to pay 1 THB is charged the same as everyone else.

const OrdersContext = createContext(null);

export function OrdersProvider({ children }) {
  const { user, status: authStatus } = useAuth();
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | ready | error
  const [error, setError] = useState(null);

  const accountId = user?.id ?? null;

  useEffect(() => {
    // Wait for the session check: asking for orders before it answers would
    // just be a 401 for someone who turns out to be signed in.
    if (authStatus !== "ready") return undefined;
    if (!accountId) {
      setOrders([]);
      setStatus("ready");
      setError(null);
      return undefined;
    }

    let live = true;
    setStatus("loading");
    api
      .orders()
      .then((data) => {
        if (!live) return;
        setOrders(data.orders ?? []);
        setStatus("ready");
        setError(null);
      })
      .catch((failure) => {
        if (!live) return;
        setOrders([]);
        setStatus("error");
        setError(failure.message);
      });
    // Signing out mid-flight must not deliver the previous account's history.
    return () => {
      live = false;
    };
  }, [accountId, authStatus]);

  /**
   * Records a completed checkout. `draft` is `{ items: [{ slug, qty }],
   * shippingAddressId | shippingAddress, saveAddress }` - no prices, because
   * the server sets those.
   *
   * Returns the stored order, or null when there is nobody to record against:
   * a guest checkout completes, it just leaves no history behind.
   */
  const placeOrder = useCallback(
    async (draft) => {
      if (!accountId || (draft.items ?? []).length === 0) return null;
      const data = await api.placeOrder(draft);
      setOrders((current) => [data.order, ...current]);
      return data.order;
    },
    [accountId]
  );

  const value = useMemo(
    () => ({
      orders,
      placeOrder,
      signedIn: Boolean(accountId),
      loading: status === "loading",
      error,
    }),
    [orders, placeOrder, accountId, status, error]
  );

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used inside an OrdersProvider");
  }
  return context;
}
