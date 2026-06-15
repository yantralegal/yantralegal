import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/divorce',
        destination: '/family-law',
        permanent: true,
      },
      {
        source: '/divorce/:path*',
        destination: '/family-law/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
