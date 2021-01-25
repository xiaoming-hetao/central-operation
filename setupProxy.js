const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function (app) {
  app.use(createProxyMiddleware('/api', {
    target: 'http://106.54.251.66:8081',
    changeOrigin: true, //是否开启跨域
    pathRewrite: {
        '^/api': '/DevOps'
    }
  }))
}
