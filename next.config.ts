import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.50.173"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "iprsoftwaremedia.com",
        pathname: "/219/files/**",
      },
    ],
  },
};

export default nextConfig;
