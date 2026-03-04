/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@/components/Header'] = '@/components/Header.js';
    config.resolve.alias['@/components/Footer'] = '@/components/Footer.js';
    return config;
  },
};

module.exports = nextConfig;
