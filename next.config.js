// eslint-disable-next-line import/no-extraneous-dependencies
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  webpack: (
    config /* , { buildId, dev, isServer, defaultLoaders, webpack } */,
  ) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(new TsconfigPathsPlugin({}))

    // Important: return the modified config
    return config
  },
}
