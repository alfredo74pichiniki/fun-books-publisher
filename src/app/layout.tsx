import type { ReactNode } from "react";

// Root layout: minimal shell. The [locale]/layout.tsx handles providers.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
