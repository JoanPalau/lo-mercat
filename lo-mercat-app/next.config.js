/** @type {import('next').NextConfig} */

const path = require('path');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true
});

const securityHeaders = [
  // Allows to fetch data from CDN's: reduces latency
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  // Prevents XSS attacks
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  // Disable guessing conytent type, prevents XSS attacks
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  // send only the essential origin outide our website
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
];

const prod = process.env.NODE_ENV === 'production';

module.exports = withPWA({
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
  pwa: {
    disable: prod ? false : true
  },
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en', 'es', 'cat'],
    defaultLocale: 'es',
  }
});
