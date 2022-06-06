const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap: false,
  lintOnSave: false,
  // transpileDependencies: true
  //配置代理跨域
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://39.98.123.211:8416',
        target: 'http://gmall-h5-api.atguigu.cn',
      },
    },
  },
})
