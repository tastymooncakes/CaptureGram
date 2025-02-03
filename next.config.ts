import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.numbersprotocol.io",
      },
      {
        protocol: "https",
        hostname: "**.numbersprotocol.net",
      }
    ],
  },
};

export default nextConfig;
