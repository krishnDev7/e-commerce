/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ecommerce/ui', '@ecommerce/api-client', '@ecommerce/shared'],
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;
