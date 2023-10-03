/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "cdn.stablediffusionapi.com",
      "pub-8b49af329fae499aa563997f5d4068a4.r2.dev",
      "pub-3626123a908346a7a8be8d9295f44e26.r2.dev",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
