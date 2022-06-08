import { withContentlayer } from 'next-contentlayer'

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['source.unsplash.com', 'unsplash.com'],
  },
}

export default withContentlayer(nextConfig)
