import en from "./en.json";
import es from "./es.json";
import ptBR from "./pt-BR.json";

export const SUPPORTED_LOCALES = ["pt-BR", "en", "es"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "pt-BR";

export type Dictionary = Record<string, unknown>;

export const dictionaries: Record<Locale, Dictionary> = {
  "pt-BR": ptBR as Dictionary,
  en: en as Dictionary,
  es: es as Dictionary,
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" &&
  (SUPPORTED_LOCALES as readonly string[]).includes(value);

const STORAGE_KEY = "noir.locale";

export const detectInitialLocale = (): Locale => {
  if (typeof window === "undefined") return DEFAULT_LOCALE;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (isLocale(stored)) return stored;

  const nav = window.navigator?.language;
  if (isLocale(nav)) return nav;

  const lower = nav?.toLowerCase();
  if (lower?.startsWith("pt")) return "pt-BR";
  if (lower?.startsWith("es")) return "es";
  if (lower?.startsWith("en")) return "en";

  return DEFAULT_LOCALE;
};
