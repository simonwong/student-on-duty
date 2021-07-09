// eslint-disable-next-line import/no-extraneous-dependencies
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  webpack: (
    config /* , { buildId, dev, isServer, defaultLoaders, webpack } */,
  ) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json',
      }),
    )

    // Important: return the modified config
    return config
  },
  async rewrites() {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          // destination: 'http://localhost:3000/:path*', // Proxy to Backend
          destination: 'https://onduty.wangsijie.top/api/:path*', // Proxy to Backend
        },
      ]
    }
    return []
  },
}
