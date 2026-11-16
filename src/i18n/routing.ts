import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // Always English unless the address says /es: most readers are in the US and most books are in English.
  // No guessing from the browser language or from a cookie (a Spanish browser was sent to /es on every link).
  localeDetection: false,
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
