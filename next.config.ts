import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
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
