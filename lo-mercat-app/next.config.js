/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true
  }
})


  // previous command here

