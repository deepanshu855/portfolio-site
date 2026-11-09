import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: ".next-site",
  transpilePackages: ["three"],
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
