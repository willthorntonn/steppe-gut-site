import { notFound } from "next/navigation";
import GutHealthSection from "../../../../views/GutHealthSection";
import { buildMetadata } from "../../../../lib/seo";

// Sub-pages of Gut Health that do not have a static route of their own.
// Only "mood" is real (it renders views/GutMood through GutHealthSection);
// diet, exercise, routine and sleep have their own folders beside this one
// and never reach here. Anything else is a real 404.
const SECTIONS = {
  mood: {
    title: "Gut and Mood - Gut Health · Steppe Gut",
    description:
      "How the gut and the brain stay in contact, and a set of ordinary daily habits people use to feel steadier",
  },
};

export function generateStaticParams() {
  return Object.keys(SECTIONS).map((section) => ({ section }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { section } = await params;
  const entry = SECTIONS[section];
  if (!entry) return {};
  return buildMetadata({ ...entry, path: `/gut-health/${section}/` });
}

export default async function GutHealthSectionPage({ params }) {
  const { section } = await params;
  if (!SECTIONS[section]) notFound();
  return <GutHealthSection />;
}
