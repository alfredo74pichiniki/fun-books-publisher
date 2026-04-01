import type { ReactNode } from "react";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <ScrollProgress />
      <Header />
      <main>{children}</main>
      <Footer />
    </SmoothScrollProvider>
  );
}
