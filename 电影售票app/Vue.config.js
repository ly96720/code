module.exports = {
  devServer: {
    proxy: {
      '/jump': {
        target: 'https://m.maizuo.com',
        changeOrigin: true,
        pathRewrite: {
          '^/jump': '/'
        }
      }
    }
  }
}
