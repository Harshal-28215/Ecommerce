import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    
};
module.exports = {
    experimental: {
      serverActions: {
        bodySizeLimit: '2mb',
      },
    },
  }

export default nextConfig;
