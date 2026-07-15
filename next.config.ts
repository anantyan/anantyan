import type { NextConfig } from "next";

const isGithubActionsBuild = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubActionsBuild ? "/anantyan" : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
