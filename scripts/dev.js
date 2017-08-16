const WebpackDevRunner = require('freshes-man/helpers/WebpackDevRunner')
module.exports = new WebpackDevRunner({
  port: 8066,
  proxyTable: {
    '/sz': 'http://192.168.100.6:85',
    '/sh': 'http://192.168.100.6:85',
    '/wx': 'http://192.168.100.6:85',
    '/pickupcard': 'http://10.1.3.18:9011'
  }
}).run()
