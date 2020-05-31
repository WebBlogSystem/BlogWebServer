module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_domain,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
