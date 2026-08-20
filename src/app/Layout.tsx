import { Footer } from "@/components/overlays/Footer";
import { Header } from "@/components/overlays/Header";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="relative">{children}</main>
      <Footer />
    </div>
  );
}
