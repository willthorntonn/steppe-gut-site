import { useParams } from "react-router-dom";
import PageMeta from "../components/ui/PageMeta";
import SectionSubNav from "../components/layout/SectionSubNav";
import NotFound from "./NotFound";
import GutMood from "./GutMood";
import { GUT_HEALTH_LINKS } from "../data/site";

// Sub-pages of Gut Health. "Gut Mood" (/gut-health/mood/) is built out in
// ./GutMood.jsx from a reference gut-health article layout; "Gut Diet",
// "Gut Exercise" and "Gut Routine" have their own routes in App.jsx and never
// reach here. The remaining sections are still scaffolded - only the section
// switcher is rendered, sat directly under the fixed header exactly as
// ProductSubNav is on a product page, with the rest of the page left
// deliberately empty until copy lands.
const SECTIONS = {
  mood: { title: "Gut and Mood", component: GutMood },
  exercise: { title: "Gut and Exercise" },
  sleep: { title: "Gut and Sleep" },
};

export default function GutHealthSection() {
  const { section } = useParams();
  const entry = SECTIONS[section];
  if (!entry) return <NotFound />;

  if (entry.component) {
    const SectionPage = entry.component;
    return <SectionPage />;
  }

  return (
    <>
      <PageMeta title={`${entry.title} - Gut Health · Steppe Gut`} noindex />

      <div
        data-navtheme="light"
        className="min-h-[calc(85*var(--vh))] bg-cream pt-[84px] sm:pt-[99px] lg:pt-[140px]"
      >
        <SectionSubNav ariaLabel="Gut Health sections" links={GUT_HEALTH_LINKS} />
      </div>
    </>
  );
}
