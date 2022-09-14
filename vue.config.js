module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/exam': {
        target: 'http://39.107.93.216:9010'
      }
    },
    overlay: {
      warning: false,
      errors: false
    }
  },
  configureWebpack: config => {
    config.devtool = process.env.NODE_ENV === 'production' ? 'nosources-source-map' : 'source-map'
  }
}