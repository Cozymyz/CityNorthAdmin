const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  //   lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: 100,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://chengbei.site:28089/',
        // target: 'http://112.17.245.34:28089/',
        // target: 'http://117.147.19.13:28089/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }

  },

  configureWebpack: {

    externals: {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'axios': 'axios',
      'js-cookie': 'Cookies',
      'element-ui': 'ELEMENT',
      'vuex': 'Vuex'
    }

  },
  chainWebpack: config => {
    config.resolve.symlinks(true)
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@utils', resolve('src/utils'))
      .end()
  }
}
