module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '考试系统'
    }
  },
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
    config.devtool = process.env.NODE_ENV === 'development' ? 'source-map' : 'nosources-source-map'
  }
}