import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL, // Ensure Vercel picks up the env variable
  },
};

export default nextConfig;
