import OurStoryScienceMission from "../../../../views/OurStoryScienceMission";
import { buildMetadata } from "../../../../lib/seo";

export const metadata = buildMetadata({
  title: "Our Science Mission - Our Story · Steppe Gut",
  description: "What is established about fermented mare's milk, what we do not claim, and what every batch is tested for",
  path: "/our-story/science-mission/",
});

export default function OurStoryScienceMissionPage() {
  return <OurStoryScienceMission />;
}
