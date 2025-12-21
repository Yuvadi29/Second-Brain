import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ["chromadb"],

  outputFileTracingExcludes: {
    "*": [".next/export-detail.json"],
    "/api/docs": ["./.next/cache/**/*"]
  },
};

export default nextConfig;
