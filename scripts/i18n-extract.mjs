// Emits the flat key -> English-string map for every content module, which is
// exactly the key set src/i18n/localize.js will look up at render time.
//
// Dictionaries are written against this output rather than by hand, because a
// key that does not match the path the localiser walks to is a silent no-op:
// the page renders in English and nothing warns you.
//
//   node scripts/i18n-extract.mjs            # summary to stdout
//   node scripts/i18n-extract.mjs --json     # the full map
//   node scripts/i18n-extract.mjs --json home story   # only those namespaces
//
// The content modules import images, which Node cannot load. Each module is
// rewritten to a temp file first with those imports replaced by a plain
// string, which is enough because image paths are never translatable anyway.

import { mkdtemp, readFile, writeFile, rm } from "node:fs/promises";
import { readdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCES = [
  { dir: path.join(ROOT, "src/content"), skip: [] },
  { dir: path.join(ROOT, "src/data"), skip: ["countryFields.js", "orders.js", "payments.js"] },
];

const ASSET_IMPORT = /^\s*import\s+(\w+)\s+from\s+["'][^"']+\.(?:png|jpe?g|webp|avif|svg|gif|mp4|webm)["'];?\s*$/gm;
const RELATIVE_IMPORT = /^\s*import\s+([^;]+?)\s+from\s+["'](\.[^"']+)["'];?\s*$/gm;

// Mirrors NON_TRANSLATABLE_KEYS and VALUE_LIKE in src/i18n/localize.js. Kept
// in step by scripts/i18n-check.mjs, which fails if the two drift apart.
const NON_TRANSLATABLE_KEYS = new Set([
  "id", "key", "slug", "href", "to", "path", "src", "image", "img", "icon",
  "video", "poster", "ratio", "brief", "color", "colour", "bg", "className",
  "class", "variant", "tone", "align", "type", "code", "sku", "currency",
  "email", "tel", "url",
  "step", "numeral", "phone", "phoneHref", "legalName", "registration",
  "avif", "webp", "png", "jpg", "jpeg",
]);
const VALUE_LIKE = /^(?:[#/]|https?:|mailto:|tel:|data:|[a-z0-9-]+\.(?:png|jpe?g|webp|avif|svg|mp4|webm)$)/i;
const NO_LETTERS = /^[^\p{L}]+$/u;

function isTranslatable(key, value) {
  return (
    typeof value === "string" &&
    value.trim() !== "" &&
    !NON_TRANSLATABLE_KEYS.has(key) &&
    !NON_TRANSLATABLE_KEYS.has(key.toLowerCase()) &&
    !VALUE_LIKE.test(value.trim()) &&
    !NO_LETTERS.test(value.trim())
  );
}

function walk(node, out, keyPath) {
  if (Array.isArray(node)) {
    node.forEach((item, i) => walk(item, out, `${keyPath}.${i}`));
    return;
  }
  if (node && typeof node === "object") {
    if (Object.getPrototypeOf(node) !== Object.prototype) return;
    for (const [key, value] of Object.entries(node)) {
      const childPath = keyPath ? `${keyPath}.${key}` : key;
      if (isTranslatable(key, value)) out[childPath] = value;
      else if (value && typeof value === "object") walk(value, out, childPath);
    }
  }
}

/**
 * Rewrite `file` (and, recursively, every module it imports) into `scratch`
 * with asset imports stubbed out, and return the path to the rewritten copy.
 *
 * Recursion is the point: a content module imports a sibling data module which
 * imports its own product photography, so stubbing only the entry file leaves
 * an .avif import one level down that Node still cannot load.
 */
async function stubModule(file, scratch, cache = new Map()) {
  const cached = cache.get(file);
  if (cached) return cached;

  const temp = path.join(
    scratch,
    `${path.basename(path.dirname(file))}-${path.basename(file, ".js")}.mjs`
  );
  // Recorded before the recursive walk so an import cycle terminates.
  cache.set(file, temp);

  const source = await readFile(file, "utf8");
  const rewrites = [];

  let stubbed = source.replace(
    ASSET_IMPORT,
    (_m, name) => `const ${name} = "asset:${name}";`
  );

  stubbed = stubbed.replace(RELATIVE_IMPORT, (match, names, spec) => {
    let abs = path.resolve(path.dirname(file), spec);
    // The app is bundled, so these are written without an extension the way
    // webpack resolves them. Node needs the real filename.
    if (!path.extname(abs)) abs += ".js";
    const token = `__SG_IMPORT_${rewrites.length}__`;
    rewrites.push({ token, abs, names });
    return `import ${names} from "${token}";`;
  });

  for (const { token, abs } of rewrites) {
    const child = await stubModule(abs, scratch, cache);
    stubbed = stubbed.replace(token, pathToFileURL(child).href);
  }

  await writeFile(temp, stubbed, "utf8");
  return temp;
}

async function loadModule(file, scratch) {
  const temp = await stubModule(file, scratch);
  return import(pathToFileURL(temp).href);
}

async function main() {
  const args = process.argv.slice(2);
  const asJson = args.includes("--json");
  const only = args.filter((a) => !a.startsWith("--"));

  const scratch = await mkdtemp(path.join(tmpdir(), "sg-i18n-"));
  const all = {};
  const perNamespace = {};

  try {
    for (const { dir, skip } of SOURCES) {
      const files = (await readdir(dir))
        .filter((f) => f.endsWith(".js") && !skip.includes(f))
        .sort();

      for (const file of files) {
        const namespace = path.basename(file, ".js");
        if (only.length && !only.includes(namespace)) continue;

        const mod = await loadModule(path.join(dir, file), scratch);
        const out = {};
        for (const [exportName, value] of Object.entries(mod)) {
          if (isTranslatable(exportName, value)) out[`${namespace}.${exportName}`] = value;
          else walk(value, out, `${namespace}.${exportName}`);
        }
        perNamespace[namespace] = out;
        Object.assign(all, out);
      }
    }
  } finally {
    await rm(scratch, { recursive: true, force: true });
  }

  if (asJson) {
    process.stdout.write(JSON.stringify(all, null, 2) + "\n");
    return;
  }

  let totalKeys = 0;
  let totalWords = 0;
  for (const [namespace, entries] of Object.entries(perNamespace)) {
    const keys = Object.keys(entries).length;
    const words = Object.values(entries).reduce(
      (n, s) => n + s.trim().split(/\s+/).length,
      0
    );
    totalKeys += keys;
    totalWords += words;
    console.log(`${namespace.padEnd(18)} ${String(keys).padStart(5)} keys  ${String(words).padStart(6)} words`);
  }
  console.log("".padEnd(46, "-"));
  console.log(`${"total".padEnd(18)} ${String(totalKeys).padStart(5)} keys  ${String(totalWords).padStart(6)} words`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
