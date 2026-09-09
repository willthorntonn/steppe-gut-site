import GutRoutine from "../../../../views/GutRoutine";
import { GUT_ROUTINE_META } from "../../../../content/gutRoutine";
import { buildMetadata } from "../../../../lib/seo";

export const metadata = buildMetadata({
  title: GUT_ROUTINE_META.title,
  description: GUT_ROUTINE_META.description,
  path: "/gut-health/routine/",
});

export default function GutRoutinePage() {
  return <GutRoutine />;
}
