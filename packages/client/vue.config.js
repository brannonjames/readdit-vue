module.exports = {
  devServer: {
    proxy: 'http://localhost:4566'
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "src/theme.scss";'
      }
    }
  }
}
