import { useData } from "@/app/DataProvider";
import { useI18n } from "@/hooks/useI18n";

export function Footer() {
  const { t } = useI18n();
  const { profile } = useData();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12">
      <div className="container flex flex-col items-center gap-3 text-center">
        <div className="flex items-center gap-6 text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="accent-underline text-foreground hover:text-primary"
          >
            GitHub
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="accent-underline text-foreground hover:text-primary"
          >
            LinkedIn
          </a>
        </div>
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
          © {year} {profile.name} · {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
