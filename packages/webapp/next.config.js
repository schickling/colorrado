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
}
