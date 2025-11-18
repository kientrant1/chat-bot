import type { NextConfig } from 'next'

const instrumentedLibraries = Object.keys(
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('newrelic/lib/instrumentations')() || {}
)
const newRelicExternalPackages = Array.from(
  new Set(
    ['newrelic', ...instrumentedLibraries].filter(
      lib => lib !== 'next' // Do not externalize Next; its ESM imports rely on bundler transforms.
    )
  )
)

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      // Allow images from Google user content domain
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**', // Allows all paths on this domain
      },
    ],
  },
  serverExternalPackages: newRelicExternalPackages,
}

export default nextConfig
