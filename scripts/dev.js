const WebpackDevRunner = require('freshes-man/helpers/WebpackDevRunner')
module.exports = new WebpackDevRunner({
  port: 8066,
  proxyTable: {
    '/sz': 'http://192.168.100.10:85',
    '/sh': 'http://192.168.100.6:85',
    '/wx': 'http://192.168.100.6:85',
    '/pickupcard': 'http://sy-suz-srv31.suiyi.com.cn:9010'
  },
  assetsPublicPath: '/'
}).run()
