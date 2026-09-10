"use client";

import { createContext, useContext, useMemo } from "react";
import { DEFAULT_LOCALE, localeMeta } from "./config";
import { localizeModule } from "./localize";

// Every view in src/views is a client component, so the locale and its
// dictionary are carried in React context rather than read per-component on
// the server. The root layout resolves the locale once and hands both down.
//
// For `en` the dictionary is empty and nothing is sent over the wire: English
// lives inline at the call sites as the fallback argument to t(), which is
// also what makes a partly-translated language render as a mixed page instead
// of a page full of missing-key placeholders.

const I18nContext = createContext({ locale: DEFAULT_LOCALE, dict: {} });

export default function I18nProvider({ locale, dict, children }) {
  const value = useMemo(
    () => ({ locale: locale ?? DEFAULT_LOCALE, dict: dict ?? {} }),
    [locale, dict]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useLocale() {
  return useContext(I18nContext).locale;
}

export function useLocaleMeta() {
  return localeMeta(useContext(I18nContext).locale);
}

/**
 * Translate one interface string.
 *
 *   const t = useT();
 *   t("cart.empty", "Your cart is empty")
 *   t("cart.count", "{n} items", { n: 3 })
 *
 * The English text is the second argument rather than a lookup in an `en`
 * dictionary. That keeps the readable copy at the call site, means no key can
 * ever render raw to an English visitor, and lets a component be wired for
 * translation without touching a dictionary file first.
 */
export function useT() {
  const { dict } = useContext(I18nContext);

  return useMemo(
    () =>
      function t(key, english, vars) {
        const template = dict[key] ?? english ?? key;
        if (!vars) return template;
        return template.replace(/\{(\w+)\}/g, (match, name) =>
          name in vars ? String(vars[name]) : match
        );
      },
    [dict]
  );
}

/**
 * Localise a whole content module from src/content or src/data.
 *
 *   import * as homeContent from "../../content/home";
 *   const { ORIGIN } = useContent("home", homeContent);
 *
 * The module keeps its English strings, its images, its hrefs and its shape.
 * Only the strings the dictionary has an entry for are swapped.
 */
export function useContent(namespace, module) {
  const { dict } = useContext(I18nContext);
  return useMemo(
    () => localizeModule(namespace, module, dict),
    [namespace, module, dict]
  );
}
