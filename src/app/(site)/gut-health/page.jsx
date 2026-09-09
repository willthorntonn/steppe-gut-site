import GutHealth from "../../../views/GutHealth";
import { buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: "Gut Health · Steppe Gut",
  description: "How Steppe Gut's fermented mare's milk sits alongside diet, routine, mood, movement and sleep, and where each of those is covered in more detail",
  path: "/gut-health/",
});

export default function GutHealthPage() {
  return <GutHealth />;
}
