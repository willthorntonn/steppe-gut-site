import PageHeader from "../components/ui/PageHeader";
import PageMeta from "../components/ui/PageMeta";
import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import CartLine from "../components/cart/CartLine";
import OrderSummary from "../components/cart/OrderSummary";
import ProductCard from "../components/product/ProductCard";
import { useCart } from "../cart/CartProvider";
import { PRODUCTS, PRODUCT_BY_SLUG } from "../data/products";
import { BODY, H2 } from "../styles/type";

// cart-and-checkout.md §2.
//
// There is no CartDrawer: with a four-item nav and a cart page one click
// away, a drawer would be a second implementation of the same list to keep in
// sync. The header cart icon links straight here.
export default function Cart() {
  const { items } = useCart();

  const lines = items
    .map((item) => ({ product: PRODUCT_BY_SLUG[item.slug], qty: item.qty }))
    // A slug that no longer exists in products.js is dropped rather than
    // crashing the page — a basket can outlive a product in localStorage.
    .filter((line) => line.product);

  const suggestions = PRODUCTS.filter(
    (product) => !items.some((item) => item.slug === product.slug)
  );

  return (
    <>
      <PageMeta title="Your basket · Steppe Gut" noindex />

      <PageHeader title="Your basket" />

      {lines.length === 0 ? (
        <Section size="sm">
          <Container width="narrow">
            <h2 className="font-serif font-normal text-forest" style={H2}>
              Nothing in here yet
            </h2>
            <p
              className="mt-7 max-w-[46ch] font-serif text-forest/75"
              style={BODY}
            >
              Have a look at the three formats — they all contain the same
              powder.
            </p>
            <Button
              to="/products/"
              variant="forest"
              radius="2xl"
              size="default"
              className="mt-10"
            >
              See the products
            </Button>
          </Container>
        </Section>
      ) : (
        <>
          <Section size="sm">
            <Container width="content">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-[62fr_38fr] lg:gap-16">
                <ul className="list-none">
                  {lines.map((line) => (
                    <CartLine
                      key={line.product.slug}
                      product={line.product}
                      qty={line.qty}
                    />
                  ))}
                </ul>

                {/* Sticky only at lg — a sticky panel on a short mobile page
                    eats the viewport. */}
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <OrderSummary ctaLabel="Checkout" ctaTo="/checkout/" />
                </div>
              </div>
            </Container>
          </Section>

          {suggestions.length > 0 && (
            <Section size="default">
              <Container width="content">
                <h2
                  className="mb-12 max-w-[18ch] font-serif font-normal text-forest"
                  style={H2}
                >
                  You might also want
                </h2>
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {suggestions.map((product) => (
                    <li key={product.slug}>
                      <ProductCard product={product} className="h-full" />
                    </li>
                  ))}
                </ul>
              </Container>
            </Section>
          )}
        </>
      )}
    </>
  );
}
