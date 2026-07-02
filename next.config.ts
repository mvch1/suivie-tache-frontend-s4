import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    allowedDevOrigins: [
      "http://localhost:3000",     
      "http://192.168.100.3:3000",
      "http://192.168.100.72:3000", // optional, if accessing from phone
    ],
  },
};

export default nextConfig;
