import GutSleep from "../../../../views/GutSleep";
import { GUT_SLEEP_META } from "../../../../content/gutSleep";
import { buildMetadata } from "../../../../lib/seo";

export const metadata = buildMetadata({
  title: GUT_SLEEP_META.title,
  description: GUT_SLEEP_META.description,
  path: "/gut-health/sleep/",
});

export default function GutSleepPage() {
  return <GutSleep />;
}
