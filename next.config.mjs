/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      'raw.githubusercontent.com',
      'res.cloudinary.com',
      'dx41nk9nsacii.cloudfront.net',
      'ocrealbucket.s3.amazonaws.com',
      'ocrealstoragebucket.s3.eu-north-1.amazonaws.com',
      'imagecdn.realty.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'dx41nk9nsacii.cloudfront.net',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'ocrealbucket.s3.amazonaws.comt',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'imagecdn.realty.com',
        port: ''
      },
    ]
  },
  transpilePackages: ['lucide-react'],
  reactStrictMode: true,
  swcMinify: true,
  future: {
    webpack5: true
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.pdf$/,
      use: 'file-loader'
    })
    return config
  }
}

export default nextConfig
