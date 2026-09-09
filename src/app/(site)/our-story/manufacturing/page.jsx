import OurStoryManufacturing from "../../../../views/OurStoryManufacturing";
import { buildMetadata } from "../../../../lib/seo";

export const metadata = buildMetadata({
  title: "Manufacturing Process - Our Story · Steppe Gut",
  description: "The seven steps between a mare on Mongolian grassland and a sealed sachet: fermentation, low-temperature drying, batch testing, and who manufactures it",
  path: "/our-story/manufacturing/",
});

export default function OurStoryManufacturingPage() {
  return <OurStoryManufacturing />;
}
