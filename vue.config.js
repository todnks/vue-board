const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src/')
      }
    }
  },
  devServer: {
    proxy: {
      '/': {
        target: 'https://mariadb-nodejs.herokuapp.com/api/v1'
      }
    }
  }
})
