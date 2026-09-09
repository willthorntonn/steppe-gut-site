"use client";

import { AuthProvider } from "../auth/AuthProvider";
import { CartProvider } from "../cart/CartProvider";
import { OrdersProvider } from "../orders/OrdersProvider";

// The three app-wide providers, in the order src/App.jsx nested them.
// Client-only, so the root layout can stay a server component.
export default function Providers({ children }) {
  return (
    <AuthProvider>
      <OrdersProvider>
        <CartProvider>{children}</CartProvider>
      </OrdersProvider>
    </AuthProvider>
  );
}
