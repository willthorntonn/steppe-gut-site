// Dictionary loading, one bundle per locale.
//
// The map is written out longhand rather than built from LOCALE_CODES because
// webpack needs a literal import specifier to split each language into its own
// chunk. A visitor is sent at most one dictionary.
//
// `en` has no entry on purpose. English strings live inline in the components
// as the fallback argument to t(), and inside src/content as the source of
// truth, so an English visitor downloads no dictionary at all.

const LOADERS = {
  th: () => import("./th"),
};

/**
 * @param {string} locale
 * @returns {Promise<Record<string,string>>} flat path to translation map
 */
export async function loadDictionary(locale) {
  const loader = LOADERS[locale];
  if (!loader) return {};

  try {
    const mod = await loader();
    return mod.default ?? {};
  } catch (error) {
    // A missing or malformed dictionary must not take the page down. English
    // is always a correct answer, just not the preferred one.
    console.error(`[i18n] could not load the "${locale}" dictionary`, error);
    return {};
  }
}
