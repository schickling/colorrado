module.exports = {
	async redirects() {
    return [
      {
        source: '/',
        destination: '/simple',
        permanent: false,
      },
    ]
  },
}