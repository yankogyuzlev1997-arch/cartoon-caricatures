import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  poweredByHeader: false,
  distDir: 'work/next-cache-disabled',
  images: { formats: ['image/avif','image/webp'] },
};
export default nextConfig;
