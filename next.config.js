/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
      return [
        {
          source: '/api/:path*',

          destination: 'https://api.revery.ai/console/v1/:path*',
        },
      ]
    },
};
