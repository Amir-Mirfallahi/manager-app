import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true }, // Required for static export
  crossOrigin: "anonymous",
  allowedDevOrigins: ["openrouter.ai"],
};

export default nextConfig;
