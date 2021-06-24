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
      '^/(auth|admin|national|regional|etablissement)/.*$': {
        target: process.env.BACKEND_URL,
        changeOrigin: true
      }
    }
  }
}
