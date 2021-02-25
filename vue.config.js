const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/test/' 
    : '/',
  lintOnSave: 'warning', // 保存代码时，eslint仅警告而不报错
  devServer: {
    proxy: 'https://git1997.top:3030'
  },
  configureWebpack: {
    // 把这些依赖单独拎出来，不放到chunk-vendors.js一起打包
    externals: {
      'vue': 'Vue',
      'vue-router': 'VueRouter'
    }
  },
  // 链式操作webpack，在默认配置上进行修改
  chainWebpack: config => {
    // 配置别名
    config.resolve.alias
    .set('@', path.resolve(__dirname, 'src'))
    .set('~c', path.resolve(__dirname, 'src', 'components'))
    .set('~v', path.resolve(__dirname, 'src', 'views'))
  }
}