// Validates every dictionary against the English key set.
//
//   node scripts/i18n-check.mjs
//
// Exits non-zero on any error, so it can gate a deploy. What it catches:
//
//   dead key       - a key no longer present in src/content or src/data, or a
//                    typo. These are the dangerous ones: the page renders in
//                    English and nothing warns you.
//   brand term     - "Steppe Gut" and friends missing from a translation whose
//                    English carried them.
//   corrupt char   - U+FFFD, which is what a mis-encoded paste leaves behind.
//   legal name     - a registered company name that has been translated.
//
// It also prints per-locale coverage, which is the honest measure of how far
// the translation actually got.

import { execFileSync } from "node:child_process";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { BRAND_TERMS } from "../src/i18n/brand.js";
import { LOCALE_CODES, DEFAULT_LOCALE } from "../src/i18n/config.js";

const ROOT = path.resolve(import.meta.dirname, "..");

// Keys that must never appear in any dictionary. A registered company name is
// the name on the paperwork in every language.
const FORBIDDEN_KEYS = [
  "site.COMPANY.brandOwner.name",
  "site.COMPANY.manufacturer.name",
  "site.COMPANY.importer.name",
];

const english = JSON.parse(
  execFileSync("node", [path.join(ROOT, "scripts/i18n-extract.mjs"), "--json"], {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  })
);
const englishKeys = new Set(Object.keys(english));

let errors = 0;
const fail = (locale, message) => {
  errors++;
  console.error(`  ✗ [${locale}] ${message}`);
};

console.log(`English source: ${englishKeys.size} translatable keys\n`);

for (const locale of LOCALE_CODES) {
  if (locale === DEFAULT_LOCALE) continue;

  const file = path.join(ROOT, "src/i18n/messages", `${locale}.js`);
  const dict = (await import(pathToFileURL(file).href)).default ?? {};
  const entries = Object.entries(dict);

  for (const [key, value] of entries) {
    if (!englishKeys.has(key)) {
      fail(locale, `dead key, not in the English source: ${key}`);
      continue;
    }
    if (FORBIDDEN_KEYS.includes(key)) {
      fail(locale, `registered company name must not be translated: ${key}`);
    }
    if (typeof value !== "string" || !value.trim()) {
      fail(locale, `empty translation: ${key}`);
      continue;
    }
    if (value.includes("�")) {
      fail(locale, `corrupt character (U+FFFD) in: ${key}`);
    }
    for (const term of BRAND_TERMS) {
      if (english[key].includes(term) && !value.includes(term)) {
        fail(locale, `brand term "${term}" lost in: ${key}`);
      }
    }
  }

  const pct = ((entries.length / englishKeys.size) * 100).toFixed(0);
  console.log(
    `${locale}  ${String(entries.length).padStart(4)} / ${englishKeys.size} keys  ${String(pct).padStart(3)}%`
  );
}

console.log();
if (errors) {
  console.error(`${errors} problem${errors === 1 ? "" : "s"} found`);
  process.exit(1);
}
console.log("no problems found");
