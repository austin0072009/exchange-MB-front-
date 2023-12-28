module.exports = {
  lintOnSave: false,
  devServer: {
    overlay: {
      warning: false,
      errors: false,
    },
  
  
    open: true, //配置自动启动浏览器
    proxy: {
      "/api": {
        target: "https://www.jpex-exchange.com",
        changeOrigin: true, //是否跨域
        ws: true, // proxy websockets,
        pathRewrite: {
          //重写路径
          "^/api": "",
        },
      },
      "/images/currency": {
        target: "https://www.jpex-exchange.com/images/currency",
        changeOrigin: true, //是否跨域
        ws: true, // proxy websockets,
        pathRewrite: {
          //重写路径
          "^/images/currency": "",
        },
      },
    },
 },
  publicPath: "./",
  productionSourceMap: false,
};