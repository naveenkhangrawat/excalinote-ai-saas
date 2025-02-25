import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.unsplash.com'],
    remotePatterns: [
        {
            hostname: 'images.unsplash.com',
        }
    ],
    localPatterns: [
        {
            pathname: '/**',
            search: ''
        }
    ]
}
};

export default nextConfig;
