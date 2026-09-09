import GutExercise from "../../../../views/GutExercise";
import { GUT_EXERCISE_META } from "../../../../content/gutExercise";
import { buildMetadata } from "../../../../lib/seo";

export const metadata = buildMetadata({
  title: GUT_EXERCISE_META.title,
  description: GUT_EXERCISE_META.description,
  path: "/gut-health/exercise/",
});

export default function GutExercisePage() {
  return <GutExercise />;
}
