import OurStory from "../../../views/OurStory";
import { buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: "Our Story · Steppe Gut",
  description: "The steppe, the season and the people behind Steppe Gut's fermented mare's milk, and who makes the finished pack",
  path: "/our-story/",
});

export default function OurStoryPage() {
  return <OurStory />;
}
