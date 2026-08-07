import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import CheckoutLayout from "./components/layout/CheckoutLayout";
import { CartProvider } from "./cart/CartProvider";
import Home from "./pages/Home";

// Home is imported eagerly: it is the entry point, and code-splitting it
// costs the LCP budget (home.md, developer notes). Everything else is lazy,
// per SG-PROJECT_SPEC.md §13.
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const IngredientsSourcing = lazy(() => import("./pages/IngredientsSourcing"));
const Social = lazy(() => import("./pages/Social"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Confirmation = lazy(() => import("./pages/Confirmation"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

// A cream block the height of a viewport, so a lazy route swap does not flash
// white against the cream page or collapse the footer upward.
function RouteFallback() {
  return <div className="min-h-[60vh] bg-cream" aria-hidden="true" />;
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products/" element={<Products />} />
              <Route path="/products/:slug/" element={<ProductDetail />} />
              <Route
                path="/ingredients-sourcing/"
                element={<IngredientsSourcing />}
              />
              <Route path="/social/" element={<Social />} />
              <Route path="/cart/" element={<Cart />} />
              <Route path="/checkout/confirmation/" element={<Confirmation />} />
              <Route path="/contact/" element={<Contact />} />

              {/* Trailing slashes are canonical throughout. These keep a
                  hand-typed or externally-linked slash-less URL working
                  instead of dropping it on the 404. */}
              <Route path="/products" element={<Navigate to="/products/" replace />} />
              <Route path="/social" element={<Navigate to="/social/" replace />} />
              <Route path="/contact" element={<Navigate to="/contact/" replace />} />
              <Route path="/cart" element={<Navigate to="/cart/" replace />} />
              <Route
                path="/ingredients-sourcing"
                element={<Navigate to="/ingredients-sourcing/" replace />}
              />

              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Checkout drops the nav and footer to remove exit paths
                (01_navigation.md §8), so it sits outside the main layout. */}
            <Route element={<CheckoutLayout />}>
              <Route path="/checkout/" element={<Checkout />} />
              <Route path="/checkout" element={<Navigate to="/checkout/" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </CartProvider>
  );
}
