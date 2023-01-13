/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
      return [
        {
          source: 'https://shopsanity2.vercel.app/:path*',

          destination: 'https://api.revery.ai/:path*',
        },
      ]
    },
};
