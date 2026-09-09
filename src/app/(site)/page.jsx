import Home from "../../views/Home";
import { buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Steppe Gut · Fermented Mare's Milk from Mongolia",
  description: "A daily fermented mare's milk supplement from the Mongolian steppe. What it is, how it is made, and what the research does and does not show",
  path: "/",
});

export default function HomePage() {
  return <Home />;
}
