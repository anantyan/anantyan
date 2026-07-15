import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/anantyan",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
