/** @type {import('next').NextConfig} */
const nextPWA = require('next-pwa');

const withPWA = nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
}

module.exports = withPWA(nextConfig)
