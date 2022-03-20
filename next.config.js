module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/linear',
        permanent: false,
      },
    ]
  },
}
