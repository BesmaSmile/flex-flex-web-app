import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
  images: {
    remotePatterns: [new URL('https://image.tmdb.org/t/p/w500/**')],
  },
  output: "standalone",
};

export default nextConfig;
