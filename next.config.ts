import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Amazon's cover of a book that has no sharp file in /public/portadas yet (catalog, src/catalogo).
    remotePatterns: [{ protocol: "https", hostname: "m.media-amazon.com", pathname: "/images/I/**" }],
  },
};

export default withNextIntl(nextConfig);
