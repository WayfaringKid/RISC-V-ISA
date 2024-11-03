/** @type {import('next').NextConfig} */

// next.config.js
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 完全忽略 ESLint 错误
  },
};

module.exports = nextConfig;
