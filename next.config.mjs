/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site: `next build` emits plain HTML/CSS/JS into ./out
  output: 'export',
  trailingSlash: true,
  images: {
    // No image optimizer in a static export; serve images as-is
    unoptimized: true,
  },
};

export default nextConfig;
