/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.cssLoaders = {
      styles: {
        loader: 'style-loader',
        options: {
          injectType: 'styleTag',
        },
      },
    };
    return config;
  },
};

module.exports = nextConfig;
