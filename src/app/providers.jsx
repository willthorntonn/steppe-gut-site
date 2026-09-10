"use client";

import { AuthProvider } from "../auth/AuthProvider";
import { CartProvider } from "../cart/CartProvider";
import { OrdersProvider } from "../orders/OrdersProvider";
import I18nProvider from "../i18n/I18nProvider";

// The three app-wide providers, in the order src/App.jsx nested them, plus
// the locale. I18nProvider is outermost because it holds no state of its own
// (the layout resolves the locale on the server and passes it in) and because
// the other three may eventually want to read the active language.
// Client-only, so the root layout can stay a server component.
export default function Providers({ locale, dict, children }) {
  return (
    <I18nProvider locale={locale} dict={dict}>
      <AuthProvider>
        <OrdersProvider>
          <CartProvider>{children}</CartProvider>
        </OrdersProvider>
      </AuthProvider>
    </I18nProvider>
  );
}
