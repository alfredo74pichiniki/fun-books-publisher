import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

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
  title: "Fun Books Publisher | Quality Coloring & Activity Books",
  description: "Publisher of premium coloring books, activity books, and educational materials. Monochrome Coloring Books, Word Search, Puzzles and more.",
  keywords: "coloring books, activity books, monochrome coloring, word search, puzzles, adult coloring, kids books",
  authors: [{ name: "Fun Books Publisher LLC" }],
  openGraph: {
    title: "Fun Books Publisher | Quality Coloring & Activity Books",
    description: "Publisher of premium coloring books, activity books, and educational materials.",
    url: "https://funbookpublisher.com",
    siteName: "Fun Books Publisher",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fun Books Publisher",
    description: "Publisher of premium coloring books and activity books.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
