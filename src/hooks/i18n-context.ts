import { createContext } from "react";
import type { Dictionary, Locale } from "@/locales";

export type { Dictionary, Locale };

export type Vars = Record<string, string | number>;

export interface I18nContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (path: string, vars?: Vars) => string;
  dictionary: Dictionary;
}

export const I18nContext = createContext<I18nContextValue | null>(null);
