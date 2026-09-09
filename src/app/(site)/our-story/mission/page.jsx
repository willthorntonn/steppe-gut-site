import OurStoryMission from "../../../../views/OurStoryMission";
import { buildMetadata } from "../../../../lib/seo";

export const metadata = buildMetadata({
  title: "Our Mission - Our Story · Steppe Gut",
  description: "Why Steppe Gut exists: to bring an eight-hundred-year-old fermented mare's milk out of Mongolia without changing what it is",
  path: "/our-story/mission/",
});

export default function OurStoryMissionPage() {
  return <OurStoryMission />;
}
