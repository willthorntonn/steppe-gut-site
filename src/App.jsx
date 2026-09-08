import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import CheckoutLayout from "./components/layout/CheckoutLayout";
import { AuthProvider, useAuth } from "./auth/AuthProvider";
import { CartProvider } from "./cart/CartProvider";
import { OrdersProvider } from "./orders/OrdersProvider";
import Home from "./pages/Home";

// Home is imported eagerly: it is the entry point, and code-splitting it
// costs the LCP budget (home.md, developer notes). Everything else is lazy,
// per SG-PROJECT_SPEC.md §13.
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const OurStory = lazy(() => import("./pages/OurStory"));
const OurStoryMission = lazy(() => import("./pages/OurStoryMission"));
const OurStoryScienceMission = lazy(() => import("./pages/OurStoryScienceMission"));
const OurStoryManufacturing = lazy(() => import("./pages/OurStoryManufacturing"));
const OurStorySection = lazy(() => import("./pages/OurStorySection"));
const GutHealth = lazy(() => import("./pages/GutHealth"));
const GutDiet = lazy(() => import("./pages/GutDiet"));
const GutExercise = lazy(() => import("./pages/GutExercise"));
const GutRoutine = lazy(() => import("./pages/GutRoutine"));
const GutSleep = lazy(() => import("./pages/GutSleep"));
const GutHealthSection = lazy(() => import("./pages/GutHealthSection"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Buy = lazy(() => import("./pages/Buy"));
const Cart = lazy(() => import("./pages/Cart"));
const Social = lazy(() => import("./pages/Social"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Confirmation = lazy(() => import("./pages/Confirmation"));
const Contact = lazy(() => import("./pages/Contact"));
const Cookies = lazy(() => import("./pages/Cookies"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const AccountOrders = lazy(() => import("./pages/AccountOrders"));
const AccountSettings = lazy(() => import("./pages/AccountSettings"));
const NotFound = lazy(() => import("./pages/NotFound"));

// A cream block the height of a viewport, so a lazy route swap does not flash
// white against the cream page or collapse the footer upward.
function RouteFallback() {
  return <div className="min-h-[calc(60*var(--vh))] bg-cream" aria-hidden="true" />;
}

// Our Story and Gut Health are the site's long-form editorial pages. This
// wrapper switches on `text-wrap: pretty` for their body copy (see
// src/index.css) so no paragraph ever breaks to leave a single orphaned word
// on its own line. A plain block wrapper - no layout or scroll effect.
function Editorial({ children }) {
  return <div className="editorial-copy">{children}</div>;
}

// Onboarding / sign-in is a modal now (components/auth/AuthModal), not a page.
// The old /sign-in/ URL is kept alive for bookmarks and external links: it
// pops the modal open and drops the visitor on the home page behind it.
function SignInRedirect() {
  const { openAuthModal } = useAuth();
  useEffect(() => {
    openAuthModal("signin");
  }, [openAuthModal]);
  return <Navigate to="/" replace />;
}

export default function App() {
  return (
    <AuthProvider>
    <OrdersProvider>
    <CartProvider>
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products/" element={<Products />} />
              <Route path="/products/:slug/" element={<ProductDetail />} />
              <Route path="/our-story/" element={<Editorial><OurStory /></Editorial>} />
              <Route path="/our-story/mission/" element={<Editorial><OurStoryMission /></Editorial>} />
              <Route
                path="/our-story/science-mission/"
                element={<Editorial><OurStoryScienceMission /></Editorial>}
              />
              <Route
                path="/our-story/manufacturing/"
                element={<Editorial><OurStoryManufacturing /></Editorial>}
              />
              <Route path="/our-story/:section/" element={<Editorial><OurStorySection /></Editorial>} />
              <Route path="/gut-health/" element={<Editorial><GutHealth /></Editorial>} />
              <Route path="/gut-health/diet/" element={<Editorial><GutDiet /></Editorial>} />
              <Route
                path="/gut-health/diet"
                element={<Navigate to="/gut-health/diet/" replace />}
              />
              <Route path="/gut-health/exercise/" element={<Editorial><GutExercise /></Editorial>} />
              <Route
                path="/gut-health/exercise"
                element={<Navigate to="/gut-health/exercise/" replace />}
              />
              <Route path="/gut-health/routine/" element={<Editorial><GutRoutine /></Editorial>} />
              <Route
                path="/gut-health/routine"
                element={<Navigate to="/gut-health/routine/" replace />}
              />
              <Route path="/gut-health/sleep/" element={<Editorial><GutSleep /></Editorial>} />
              <Route
                path="/gut-health/sleep"
                element={<Navigate to="/gut-health/sleep/" replace />}
              />
              <Route path="/gut-health/:section/" element={<Editorial><GutHealthSection /></Editorial>} />
              <Route path="/faq/" element={<FAQ />} />
              <Route path="/buy/" element={<Buy />} />
              <Route path="/social/" element={<Social />} />
              {/* The basket icon lands here; checkout is reached from the
                  cart's own "Checkout securely" button. */}
              <Route path="/cart/" element={<Cart />} />
              <Route path="/checkout/confirmation/" element={<Confirmation />} />
              <Route path="/contact/" element={<Contact />} />
              <Route path="/cookies/" element={<Editorial><Cookies /></Editorial>} />
              <Route path="/privacy/" element={<Editorial><Privacy /></Editorial>} />
              <Route path="/terms/" element={<Editorial><Terms /></Editorial>} />
              <Route path="/sitemap/" element={<Editorial><Sitemap /></Editorial>} />

              {/* Account area. Real accounts, served by the API in server/
                  (see src/auth/AuthProvider.jsx and src/api/client.js) - the
                  pages are empty until someone registers. noindex is set
                  per-page via PageMeta. Sign in / sign up are a modal
                  (components/auth/AuthModal); /sign-in/ just opens it. */}
              <Route path="/sign-in/" element={<SignInRedirect />} />
              <Route path="/account/orders/" element={<AccountOrders />} />
              <Route path="/account/settings/" element={<AccountSettings />} />

              {/* Trailing slashes are canonical throughout. These keep a
                  hand-typed or externally-linked slash-less URL working
                  instead of dropping it on the 404. */}
              <Route path="/products" element={<Navigate to="/products/" replace />} />
              <Route path="/social" element={<Navigate to="/social/" replace />} />
              <Route path="/contact" element={<Navigate to="/contact/" replace />} />
              <Route path="/cookies" element={<Navigate to="/cookies/" replace />} />
              <Route path="/privacy" element={<Navigate to="/privacy/" replace />} />
              <Route path="/terms" element={<Navigate to="/terms/" replace />} />
              <Route path="/sitemap" element={<Navigate to="/sitemap/" replace />} />
              <Route path="/sign-in" element={<Navigate to="/sign-in/" replace />} />
              <Route path="/signin" element={<Navigate to="/sign-in/" replace />} />
              <Route path="/cart" element={<Navigate to="/cart/" replace />} />
              <Route path="/our-story" element={<Navigate to="/our-story/" replace />} />
              <Route
                path="/our-story/manufacturing"
                element={<Navigate to="/our-story/manufacturing/" replace />}
              />
              {/* Old blueprint URL for the manufacturing page. */}
              <Route
                path="/our-story/how-its-made/"
                element={<Navigate to="/our-story/manufacturing/" replace />}
              />
              {/* "Our Social Mission" was removed; its content is folded into
                  the Our Story overview and Our Mission. Keep the old URLs
                  alive so links and bookmarks don't 404. */}
              <Route
                path="/our-story/social-mission/"
                element={<Navigate to="/our-story/" replace />}
              />
              <Route
                path="/our-story/social-mission"
                element={<Navigate to="/our-story/" replace />}
              />
              <Route path="/gut-health" element={<Navigate to="/gut-health/" replace />} />
              <Route path="/faq" element={<Navigate to="/faq/" replace />} />
              <Route path="/buy" element={<Navigate to="/buy/" replace />} />
              <Route path="/account" element={<Navigate to="/account/orders/" replace />} />
              <Route path="/account/" element={<Navigate to="/account/orders/" replace />} />
              <Route path="/account/orders" element={<Navigate to="/account/orders/" replace />} />
              <Route path="/account/settings" element={<Navigate to="/account/settings/" replace />} />
              {/* Old route, kept as a redirect so external links and
                  bookmarks don't 404 - the page it pointed at was split into
                  /our-story/ and /gut-health/. */}
              <Route
                path="/ingredients-sourcing/"
                element={<Navigate to="/gut-health/" replace />}
              />
              <Route
                path="/ingredients-sourcing"
                element={<Navigate to="/gut-health/" replace />}
              />

              <Route path="/checkout" element={<Navigate to="/checkout/" replace />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            <Route element={<CheckoutLayout />}>
              <Route path="/checkout/" element={<Checkout />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </CartProvider>
    </OrdersProvider>
    </AuthProvider>
  );
}
