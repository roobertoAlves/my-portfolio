import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  detectInitialLocale,
  dictionaries,
  SUPPORTED_LOCALES,
} from "@/locales";
import {
  I18nContext,
  type Dictionary,
  type I18nContextValue,
  type Locale,
} from "@/hooks/i18n-context";

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(detectInitialLocale);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem("noir.locale", locale);
    }
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    if (!(SUPPORTED_LOCALES as readonly string[]).includes(next)) return;
    setLocaleState(next);
  }, []);

  const dictionary = (dictionaries[locale] ??
    dictionaries[DEFAULT_LOCALE]) as Dictionary;

  const t = useCallback(
    (path: string, vars?: Record<string, string | number>): string => {
      const value = getByPath(dictionary, path);
      if (typeof value === "string") return interpolate(value, vars);
      if (Array.isArray(value)) return value.map(String).join("\n");
      return path;
    },
    [dictionary]
  );

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, t, dictionary }),
    [locale, setLocale, t, dictionary]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

const getByPath = (obj: unknown, path: string): unknown => {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (
      acc &&
      typeof acc === "object" &&
      key in (acc as Record<string, unknown>)
    ) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
};

const interpolate = (
  template: string,
  vars?: Record<string, string | number>
): string => {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = vars[key];
    return value === undefined || value === null ? `{${key}}` : String(value);
  });
};
