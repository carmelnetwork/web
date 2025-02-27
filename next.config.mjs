import path from 'path'
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const  nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  transpilePackages: ["@carmel/core"],
  webpack(webpackConfig) {
    console.log(path.resolve("./node_modules/@carmel/core"))
    webpackConfig.resolve.alias["@carmel/core"] = path.resolve("./node_modules/@carmel/core");
    return {
      ...webpackConfig,
    }
  },
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/*/**',
      },
      {
        protocol: 'https',
        hostname: 'files.carmel.city',
        port: '',
        pathname: '/*/**',
      },
    ],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})
 
export default withMDX(nextConfig)
