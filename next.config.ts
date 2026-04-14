import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable strict mode for better development experience
  reactStrictMode: true,

  // Trailing slashes for consistent routing
  trailingSlash: false,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },

  // Netlify deployment support
  output: 'standalone',

  // Clean up output for deployment
  experimental: {
    // Optimize for production builds
  },
};

export default nextConfig;
