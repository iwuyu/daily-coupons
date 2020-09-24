module.exports = {
  configureWebpack: {
    resolve: {
      /* 配置别名 */
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    },
    devServer: {
      disableHostCheck: true,
      open: false,  // 编译完成是否打开网页
      host: '0.0.0.0',  // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
      port: 8080,  // 访问端口
      https: false,  // 编译失败时刷新页面
      hot: true,  // 开启热加载
      hotOnly: false,
      proxy: {  // 设置代理
        '/api': {
          target: 'http://172.17.143.169:3000', // API服务器地址 
          changeOrigin: true, //这里设置是否跨域
          pathRewrite: {
            '^/api': ''
          }
        }
      },
    },
  }
}