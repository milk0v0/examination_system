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
}