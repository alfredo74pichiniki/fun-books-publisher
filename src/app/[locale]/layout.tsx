import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { OrganizationJsonLd } from "@/components/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://funbookpublisher.com"),
  title: "Fun Books Publisher | Activity books for adults, seniors and kids",
  description:
    "Coloring books, mystery puzzles, large print word searches and memory games, and screen-free books for kids. Sold on Amazon.",
  keywords:
    "coloring books, puzzle books, activity books, educational books, wellness, monochrome coloring, Fun Books Publisher",
  authors: [{ name: "Fun Books Publisher" }],
  openGraph: {
    title: "Fun Books Publisher | Activity books for adults, seniors and kids",
    description:
      "Coloring books, puzzle books and workbooks for adults, seniors and kids. Sold on Amazon.",
    url: "https://funbookpublisher.com",
    siteName: "Fun Books Publisher",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fun Books Publisher",
    description:
      "Coloring books, puzzle books and workbooks. Sold on Amazon.",
  },
};

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <OrganizationJsonLd />
      </head>
      <body className="antialiased bg-navy-950 text-white">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
