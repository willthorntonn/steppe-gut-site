import sharp from "sharp";
import fs from "fs";
import path from "path";

const ROOT = "/Users/willthornton/steppe-gut-site";
const usedIds = new Set();

const jobs = [
  // sleep-bed replacements (portrait 4/5)
  { file: "gut-health/sleep-bed-2.webp", query: "unmade bed window morning light", orientation: "portrait" },
  { file: "gut-health/sleep-bed-3.webp", query: "bed window dawn blue light", orientation: "portrait" },
  { file: "gut-health/sleep-bed-4.webp", query: "bedroom window sunrise quiet", orientation: "portrait" },
  { file: "gut-health/sleep-bed-5.webp", query: "unmade bed blue morning light", orientation: "portrait" },
  { file: "gut-health/sleep-bed-6.webp", query: "bed sheets window early morning", orientation: "portrait" },

  // routine-notebook replacements
  { file: "gut-health/routine-notebook-2.webp", query: "handwritten notebook desk coffee cup", orientation: "portrait" },
  { file: "gut-health/routine-notebook-3.webp", query: "notebook planner cup desk", orientation: "portrait" },
  { file: "gut-health/routine-notebook-4.webp", query: "notebook schedule handwriting desk", orientation: "portrait" },
  { file: "gut-health/routine-notebook-5.webp", query: "notebook journal desk morning light", orientation: "portrait" },
  { file: "gut-health/routine-notebook-6.webp", query: "planner notebook cup table", orientation: "portrait" },

  // exercise-path replacements
  { file: "gut-health/exercise-path-2.webp", query: "person walking tree lined path", orientation: "portrait" },
  { file: "gut-health/exercise-path-3.webp", query: "walking forest path dappled light", orientation: "portrait" },
  { file: "gut-health/exercise-path-4.webp", query: "person walking outdoor trail", orientation: "portrait" },
  { file: "gut-health/exercise-path-5.webp", query: "walking path afternoon sun", orientation: "portrait" },
  { file: "gut-health/exercise-path-6.webp", query: "person walking quiet path back view", orientation: "portrait" },

  // mood-kitchen-table replacements
  { file: "gut-health/mood-kitchen-table-2.webp", query: "person kitchen table morning coffee window", orientation: "portrait" },
  { file: "gut-health/mood-kitchen-table-3.webp", query: "person sitting kitchen table window light", orientation: "portrait" },
  { file: "gut-health/mood-kitchen-table-4.webp", query: "morning coffee kitchen table person thinking", orientation: "portrait" },

  // diet-vegetables-grains replacements (landscape 16/9)
  { file: "gut-health/diet-vegetables-grains-2.webp", query: "vegetables whole grains table overhead", orientation: "landscape" },
  { file: "gut-health/diet-vegetables-grains-3.webp", query: "vegetables grains pulses spread linen", orientation: "landscape" },

  // story-vessel replacements
  { file: "story/story-vessel-2.webp", query: "wooden barrel fermentation vessel interior", orientation: "portrait" },
  { file: "story/story-vessel-3.webp", query: "wooden vessel liquid surface light paddle", orientation: "landscape" },

  // story-milking replacement
  { file: "story/story-milking-2.webp", query: "milking mare horse hands grassland", orientation: "landscape" },

  // ways-with-food replacement (square-ish)
  { file: "gut-health/ways-with-food-2.webp", query: "bowl yogurt spoon table", orientation: "squarish" },

  // ways-morning replacement
  { file: "gut-health/ways-morning-2.webp", query: "glass water windowsill morning light", orientation: "squarish" },

  // ways-evening replacement
  { file: "gut-health/ways-evening-2.webp", query: "warm cup hands lamplight evening", orientation: "squarish" },

  // routine-doorway-morning replacement
  { file: "gut-health/routine-doorway-morning-2.webp", query: "person doorway morning sun cup", orientation: "portrait" },

  // routine-bedside-lamp replacement
  { file: "gut-health/routine-bedside-lamp-2.webp", query: "bedside table lamp glass water night", orientation: "portrait" },

  // microbiome-spoon replacement
  { file: "gut-health/microbiome-spoon-2.webp", query: "spoon liquid macro bubbles light", orientation: "portrait" },
];

async function searchUnsplash(query, orientation) {
  const orientParam = orientation === "squarish" ? "squarish" : orientation;
  const url = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=12&orientation=${orientParam}`;
  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`search failed ${res.status} for ${query}`);
  const data = await res.json();
  return data.results || [];
}

async function run() {
  const credits = [];
  for (const job of jobs) {
    const outPath = path.join(ROOT, "src/assets", job.file);
    if (fs.existsSync(outPath)) {
      console.log(`SKIP exists ${job.file}`);
      continue;
    }
    let results;
    try {
      results = await searchUnsplash(job.query, job.orientation);
    } catch (e) {
      console.log(`ERROR search ${job.file}: ${e.message}`);
      continue;
    }
    const pick = results.find(
      (r) => !usedIds.has(r.id) && r.urls && r.urls.raw && !r.urls.raw.includes("plus.unsplash.com")
    );
    if (!pick) {
      console.log(`NO RESULT for ${job.file} (query: ${job.query})`);
      continue;
    }
    usedIds.add(pick.id);
    const isPortrait = job.orientation === "portrait";
    const wParam = isPortrait ? "w=1200" : "w=1800";
    const rawUrl = `${pick.urls.raw}&${wParam}&q=85&fm=jpg&fit=max`;
    const imgRes = await fetch(rawUrl);
    if (!imgRes.ok) {
      console.log(`ERROR download ${job.file}: ${imgRes.status}`);
      continue;
    }
    const buf = Buffer.from(await imgRes.arrayBuffer());
    await sharp(buf).webp({ quality: 80 }).toFile(outPath);
    const photographer = pick.user?.name || "Unknown";
    const photoUrl = `https://unsplash.com/photos/${pick.id}`;
    credits.push({ file: job.file, photographer, photoUrl });
    console.log(`OK ${job.file} <- ${photographer} ${photoUrl}`);
  }
  fs.writeFileSync(
    "/private/tmp/claude-502/-Users-willthornton-steppe-gut-site/aaf2bdac-5bc0-4d33-a509-9312a872e579/scratchpad/credits.json",
    JSON.stringify(credits, null, 2)
  );
}

run();
