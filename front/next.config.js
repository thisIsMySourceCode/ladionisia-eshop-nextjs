/** @type {import('next').NextConfig} */
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')
// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environment variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  // when `next build` or `npm run build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  // console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`)

  const env = {
    RESTURL_PRODUCTS: (() => {
      if (isDev) return 'http://localhost:3001'
      if (isProd) {
        return 'https://ladionisiaback-js-production.up.railway.app'
      }
    })(),
    RESTURL_SESSIONS: (() => {
      if (isDev) return 'http://localhost:3001'
      if (isProd) return 'https://ladionisiaback-js-production.up.railway.app'
    })(),
  }

  // next.config.js object
  return {
    env,
    reactStrictMode: true,
    swcMinify: true,
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      })
      return config
    },
  }
}
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/i,
//       issuer: /\.[jt]sx?$/,
//       use: ['@svgr/webpack'],
//     })
//     return config
//   },
//   // basePath: 'https://ladionisiaback-production.up.railway.app/products' || 'http://localhost:3001',
// }

// module.exports = nextConfig
