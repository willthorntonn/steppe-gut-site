import { useMemo, useState } from "react";
import PageMeta from "../components/ui/PageMeta";
import Section from "../components/ui/Section";
import Container from "../components/ui/Container";
import ProductCard from "../components/product/ProductCard";
import CollectionToolbar from "../components/product/CollectionToolbar";
import {
  PRODUCTS,
  MARKETING_PRICE_BY_SLUG,
  REVIEWS_BY_SLUG,
} from "../data/products";

// The products landing page. Three formats, one row, no cross-sell logic -
// each card links straight into its own /products/:slug/ detail page where
// the actual buying decision happens (05_component_library.md §21).
//
// A Shopify-style filter/sort bar sits above the grid. Its state lives here
// so the visible count in the bar and the cards below it are computed from
// one list.

// No format is out of stock in the pre-launch catalogue; the field is read
// defensively so flipping one to `inStock: false` in data/products.js is the
// only change needed.
const isInStock = (product) => product.inStock !== false;
const amountOf = (product) => MARKETING_PRICE_BY_SLUG[product.slug]?.amount ?? 0;
const reviewsOf = (product) => REVIEWS_BY_SLUG[product.slug]?.count ?? 0;

const PRICE_CEILING = Math.max(...PRODUCTS.map(amountOf));

const SORTERS = {
  "best-selling": (a, b) => reviewsOf(b) - reviewsOf(a),
  "title-asc": (a, b) => a.name.localeCompare(b.name),
  "title-desc": (a, b) => b.name.localeCompare(a.name),
  "price-asc": (a, b) => amountOf(a) - amountOf(b),
  "price-desc": (a, b) => amountOf(b) - amountOf(a),
};

export default function Products() {
  const [sort, setSort] = useState("best-selling");
  const [availability, setAvailability] = useState([]);
  const [price, setPrice] = useState({ from: "", to: "" });

  const availabilityCounts = useMemo(
    () => ({
      inStock: PRODUCTS.filter(isInStock).length,
      outOfStock: PRODUCTS.filter((product) => !isInStock(product)).length,
    }),
    []
  );

  const visibleProducts = useMemo(() => {
    const from = price.from === "" ? null : Number(price.from);
    const to = price.to === "" ? null : Number(price.to);

    return PRODUCTS.filter((product) => {
      if (availability.length > 0) {
        const stock = isInStock(product) ? "in-stock" : "out-of-stock";
        if (!availability.includes(stock)) return false;
      }
      const amount = amountOf(product);
      if (from != null && !Number.isNaN(from) && amount < from) return false;
      if (to != null && !Number.isNaN(to) && amount > to) return false;
      return true;
    }).sort(SORTERS[sort] ?? SORTERS["best-selling"]);
  }, [sort, availability, price]);

  return (
    <>
      <PageMeta
        title="Products"
        description="Fermented mare's milk powder from Mongolia, in three formats: sachets, capsules, and a refill pouch"
      />

      {/* Top of the page: the fixed header's clearance and the open space
          the individual product pages give their format switcher, but the
          switcher itself is gone and so is the old "Three formats, one
          formula" heading block - the space is kept (trimmed a little) so
          the grid still starts below the fold rather than tight under the
          nav. The page title stays as a visually-hidden <h1> so the
          route-change focus target and the document outline still exist. */}
      <div
        data-navtheme="light"
        className="bg-cream pt-[80px] pb-5 sm:pt-[92px] sm:pb-6 lg:pt-[120px] lg:pb-7"
      >
        <h1 id="page-title" tabIndex={-1} className="sr-only">
          Products: three formats, one formula
        </h1>
      </div>

      <Section bg="white" size="sm">
        <Container>
          {/* The grid is capped inside the 2000px page measure rather than
              running the full width. The cap is sized off the product photo
              rather than picked round: at this width each column is
              (1486 - 40px of gap) / 3 = 482px, and each card spends 2 x 20px
              of its own padding, leaving a 442px photo - 30% wider than the
              340px it was at the previous 1180px cap, and 30% taller with it
              since the frame holds a fixed 4/5 aspect. Below roughly 1600px
              of usable width the page gutters take over and the cards scale
              down from here. The toolbar is inset a little further still, so
              the "Filter:" / "Sort by:" line sits within the card edges. */}
          <div className="mx-auto max-w-[1486px]">
            <div className="lg:px-6">
              <CollectionToolbar
                count={visibleProducts.length}
                sort={sort}
                onSortChange={setSort}
                availability={availability}
                onAvailabilityChange={setAvailability}
                availabilityCounts={availabilityCounts}
                price={price}
                onPriceChange={setPrice}
                priceCeiling={PRICE_CEILING}
              />
            </div>

            {visibleProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            ) : (
              <p className="py-16 text-center font-sans text-[15px] text-forest/60">
                No products match these filters.
              </p>
            )}
          </div>
        </Container>
      </Section>

      <NewsletterSignup />
    </>
  );
}

// Same layout as the reference Shopify block - centred heading, lead line,
// bordered input, solid button - rebuilt in the site's own forest/cream/gold
// palette instead of the generic black-on-grey defaults. Sits on the same
// cream as the grid above it, with no rule between the two.
function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <Section bg="cream" size="default">
      <Container width="content">
        <div className="mx-auto max-w-[500px] text-center">
          <h2 className="font-sans text-[32px] font-semibold tracking-[-0.02em] text-forest sm:text-[38px] lg:text-[44px]">
            Subscribe to our emails
          </h2>
          <p className="mx-auto mt-3 whitespace-nowrap font-sans text-base text-forest/70 lg:text-xl">
            Join our email list for exclusive offers and the latest news
          </p>

          {submitted ? (
            <p className="mt-7 font-sans text-sm font-semibold text-forest">
              You're on the list
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-7 flex flex-col gap-3"
              noValidate
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
                className="h-14 w-full border border-forest/40 bg-cream px-5 font-sans text-base text-forest placeholder:text-forest/50 focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
              <button
                type="submit"
                className="h-14 w-full bg-forest font-sans text-[15px] font-bold tracking-[0.08em] text-cream transition-colors hover:bg-forest/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                Sign up
              </button>
            </form>
          )}
        </div>
      </Container>
    </Section>
  );
}
