import { useData } from "@/app/DataProvider";
import { useTheme } from "@/hooks/useTheme";
import { useI18n } from "@/hooks/useI18n";
import { LOCALE_LABELS, SUPPORTED_LOCALES, type Locale } from "@/locales";
import { useEffect, useState } from "react";

export function Header() {
  const { t, locale, setLocale } = useI18n();
  const { resolvedTheme, toggleTheme } = useTheme();
  const { profile } = useData();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { href: "#about", label: t("nav.about") },
    { href: "#skills", label: t("nav.skills") },
    { href: "#experience", label: t("nav.experience") },
    { href: "#projects", label: t("nav.projects") },
    { href: "#contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={
        "sticky top-0 z-40 transition-colors " +
        (scrolled
          ? "border-b border-border bg-background/85 backdrop-blur"
          : "border-b border-transparent bg-transparent")
      }
    >
      <div className="container flex h-14 items-center justify-between gap-4">
        <nav aria-label="Primary" className="hidden items-center gap-2 md:flex">
          {nav.map(n => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-sm px-2 py-1 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href="#top"
          className="wordmark absolute left-1/2 -translate-x-1/2 text-base font-bold text-foreground md:text-lg"
        >
          {profile.aliases[0] ?? profile.name}
        </a>

        <div className="flex items-center gap-2">
          <a
            href={profile.resume[locale]}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="hidden items-center gap-2 rounded-sm border border-primary px-3 py-1.5 text-xs font-mono uppercase tracking-[0.2em] text-primary transition hover:bg-primary hover:text-primary-foreground sm:inline-flex"
          >
            {t("nav.resume")}
            <span aria-hidden>↓</span>
          </a>

          <div
            className="hidden items-center overflow-hidden rounded-sm border border-border sm:flex"
            role="group"
            aria-label={t("a11y.selectLanguage")}
          >
            {SUPPORTED_LOCALES.map(l => {
              const active = l === locale;
              return (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLocale(l as Locale)}
                  aria-pressed={active}
                  className={
                    "px-2 py-1 text-[11px] font-mono uppercase tracking-wider transition " +
                    (active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground")
                  }
                >
                  {LOCALE_LABELS[l as Locale]}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t("a11y.toggleTheme")}
            className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border text-foreground transition hover:border-primary"
          >
            <span aria-hidden className="text-sm">
              {resolvedTheme === "dark" ? "◐" : "◑"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
