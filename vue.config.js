module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://39.107.93.216:9010',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
}