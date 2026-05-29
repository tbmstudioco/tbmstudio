import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "assets.frame.io",
      },
      {
        protocol: "https",
        hostname: "cdn.frame.io",
      },
    ],
  },
};

export default nextConfig;
