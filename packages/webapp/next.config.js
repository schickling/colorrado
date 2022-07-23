module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/additive',
        permanent: false,
      },
    ]
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    // Important: return the modified config
    config.module.rules.push({
      test: /\.glsl$/i,
      use: 'raw-loader',
    })
    return config
  },
}
