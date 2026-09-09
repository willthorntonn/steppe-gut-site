import GutDiet from "../../../../views/GutDiet";
import { buildMetadata } from "../../../../lib/seo";

export const metadata = buildMetadata({
  title: "Gut and Diet - Gut Health · Steppe Gut",
  description: "Where a fermented mare's milk fits in an ordinary week of eating: fibre, prebiotic plants, fermented foods and hydration",
  path: "/gut-health/diet/",
});

export default function GutDietPage() {
  return <GutDiet />;
}
