import { DataProvider } from "@/app/DataProvider";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { I18nProvider } from "@/hooks/useI18n";
import type { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider defaultTheme="dark">
      <I18nProvider>
        <DataProvider>{children}</DataProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
