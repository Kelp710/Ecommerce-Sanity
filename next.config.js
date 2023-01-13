/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
      return [
        {
          source: '/:path*',

          destination: 'https://api.revery.ai/:path*',
        },
      ]
    },
};
