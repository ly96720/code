module.exports = {
  devServer: {
    proxy: {
      '/my': {
        target: 'https://m.wowdsgn.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/my': '/'
        }
      }
    }
  }
}
