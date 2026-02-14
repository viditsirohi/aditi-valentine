import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/aditi-valentine",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
