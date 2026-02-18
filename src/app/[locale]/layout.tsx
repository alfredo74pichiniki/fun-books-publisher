import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Playfair_Display, Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OrganizationJsonLd } from "@/components/JsonLd";
import { MetaPixel } from "@/components/MetaPixel";
import "../globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fun Books Publisher | Premium Books for Creative Minds",
  description:
    "Publisher of premium coloring books, puzzle books, and educational guides. Available worldwide on Amazon.",
  keywords:
    "coloring books, puzzle books, activity books, educational books, wellness, monochrome coloring, Fun Books Publisher",
  authors: [{ name: "Fun Books Publisher" }],
  openGraph: {
    title: "Fun Books Publisher | Premium Books for Creative Minds",
    description:
      "Coloring books, brain puzzles, and educational guides — crafted for adults, kids, and curious minds.",
    url: "https://funbookspublisher.com",
    siteName: "Fun Books Publisher",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fun Books Publisher",
    description:
      "Premium coloring books, puzzles, and educational materials. Available on Amazon.",
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
    <html lang={locale} className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <OrganizationJsonLd />
      </head>
      <body className="antialiased bg-navy-950 text-white">
        <MetaPixel />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SmoothScrollProvider>
            <ScrollProgress />
            <Header />
            <main>{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
