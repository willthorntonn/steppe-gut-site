import { notFound } from "next/navigation";
import ProductDetail from "../../../../views/ProductDetail";
import { PRODUCTS, PRODUCT_BY_SLUG } from "../../../../data/products";
import { buildMetadata } from "../../../../lib/seo";

// The three SKUs are known at build time; anything else is a real 404 (an
// empty product page returning 200 is worse than an error - not-found.md).
export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = PRODUCT_BY_SLUG[slug];
  if (!product) return {};
  return buildMetadata({
    title: `${product.name} - Fermented Mare's Milk · Steppe Gut`,
    description: `${product.formatLong} of fermented mare's milk powder from Mongolia. Full ingredients, allergen information and how to take it.`,
    path: `/products/${slug}/`,
  });
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  if (!PRODUCT_BY_SLUG[slug]) notFound();
  return <ProductDetail />;
}
