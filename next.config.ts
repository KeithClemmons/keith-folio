import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Relative prefix so the export works from a web root and from file://.
  assetPrefix: ".",
};

export default nextConfig;
