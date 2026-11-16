import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Gift pages and their PDFs are for readers who have the book (the address is printed inside it).
  // Nothing on the site links to them, and search engines are told not to list them.
  async headers() {
    const fuera = [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }];
    return [
      { source: "/bonus/:path*", headers: fuera },
      { source: "/es/bonus/:path*", headers: fuera },
      { source: "/downloads/:path*", headers: fuera },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Amazon's cover of a book that has no sharp file in /public/portadas yet (catalog, src/catalogo).
    remotePatterns: [{ protocol: "https", hostname: "m.media-amazon.com", pathname: "/images/I/**" }],
  },
};

export default withNextIntl(nextConfig);
