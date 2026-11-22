import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  counter?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  align?: "left" | "center";
}

export function Section({
  id,
  counter,
  title,
  subtitle,
  children,
  align = "left",
}: SectionProps) {
  return (
    <section id={id} className="relative py-24 md:py-40">
      <div className="container">
        <header
          className={
            "grid gap-6 md:gap-10 mb-16 md:mb-24 " +
            (align === "center"
              ? "text-center justify-items-center"
              : "md:grid-cols-[180px_1fr] md:items-end")
          }
        >
          {counter ? (
            <p className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-muted-foreground">
              [{counter}]
            </p>
          ) : null}
          <div className={align === "center" ? "max-w-3xl" : ""}>
            <h2 className="wordmark text-4xl md:text-6xl font-bold text-foreground">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            ) : null}
          </div>
        </header>
        {children}
      </div>
    </section>
  );
}
