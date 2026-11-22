import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  ThemeContext,
  type ResolvedTheme,
  type Theme,
  type ThemeContextValue,
} from "@/contexts/theme-context";

const STORAGE_KEY = "noir.theme";

const isTheme = (value: unknown): value is Theme =>
  value === "light" || value === "dark" || value === "system";

const readStored = (): Theme => {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isTheme(stored) ? stored : "dark";
};

const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
};

const applyTheme = (resolved: ResolvedTheme) => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", resolved === "dark");
  root.classList.toggle("light", resolved === "light");
  root.dataset.theme = resolved;
  root.style.colorScheme = resolved;
};

interface ThemeProviderProps {
  children: ReactNode;
  /**
   * Optional override for the initial theme. When set, takes precedence over
   * any value stored in localStorage (useful for tests or for forcing a
   * specific default in a root provider).
   */
  defaultTheme?: Theme;
}

export function ThemeProvider({ children, defaultTheme }: ThemeProviderProps) {
  // Lazy initializer reads localStorage on first render so the user's saved
  // choice is available immediately without a post-mount setState. On the
  // server, readStored() falls back to "dark".
  const [theme, setThemeState] = useState<Theme>(() =>
    defaultTheme ?? readStored(),
  );
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme);

  // Listen for OS-level scheme changes while "system" is active.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "light" : "dark");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const resolvedTheme: ResolvedTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    applyTheme(resolvedTheme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, theme);
    }
  }, [theme, resolvedTheme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev: Theme) => {
      const current: ResolvedTheme = prev === "system" ? systemTheme : prev;
      return current === "dark" ? "light" : "dark";
    });
  }, [systemTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
