module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath: 'index.html',
  productionSourceMap: false,
  devServer: {
    proxy: {
      '^/backend/.*$': {
        target: process.env.VUE_APP_BACKEND_URL,
        pathRewrite: { '^/backend': '' },
        changeOrigin: true
      }
    }
  }
}
