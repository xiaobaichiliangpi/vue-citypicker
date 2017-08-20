export default [
  {
    name: 'orderSubmit',
    path: '/orderSubmit',
    meta: {
      title: '提交订单'
    },
    component: resolve => { require(['../components/order/order'], resolve) }
  },
  {
    name: 'orderAddress',
    path: '/order/address',
    meta: {
      title: '添加收货信息'
    },
    component: resolve => { require(['../components/order/address'], resolve) }
  },
  {
    name: 'orderInvoices',
    path: '/order/invoices',
    meta: {
      title: '发票'
    },
    component: resolve => { require(['../components/order/invoices'], resolve) }
  },
  {
    name: 'createInvoices',
    path: '/order/invoices/create',
    meta: {
      title: '单位信息'
    },
    component: resolve => { require(['../components/order/createInvoices'], resolve) }
  },
  {
    name: 'uploadInvoices',
    path: '/order/invoices/upload',
    meta: {
      title: '上传证书'
    },
    component: resolve => { require(['../components/order/upload'], resolve) }
  },
  {
    name: 'sendCommission',
    path: '/order/invoices/sendcommission',
    meta: {
      title: '委托书模板'
    },
    component: resolve => { require(['../components/order/sendCommission'], resolve) }
  },
  {
    name: 'orderList',
    path: '/order/list',
    meta: {
      title: '我的提货卡订单'
    },
    component: resolve => { require(['../components/order/list'], resolve) }
  },
  {
    name: 'orderResult',
    path: '/order/result/:orderId',
    meta: {
      title: '提货卡订单下单结果'
    },
    component: resolve => { require(['../components/order/orderResult'], resolve) }
  },
  {
    name: 'orderExpress',
    path: '/order/express/:orderId',
    meta: {
      title: '配送信息'
    },
    component: resolve => { require(['../components/order/orderExpress'], resolve) }
  },
  {
    name: 'orderInvoice',
    path: '/order/invoice/:orderId',
    meta: {
      title: '发票信息'
    },
    component: resolve => { require(['../components/order/orderInvoice'], resolve) }
  },
  {
    name: 'orderProduct',
    path: '/order/product/:orderId',
    meta: {
      title: '商品清单'
    },
    component: resolve => { require(['../components/order/orderProduct'], resolve) }
  },
  {
    name: 'errorPay',
    path: '/order/errorPay',
    meta: {
      title: '支付失败'
    },
    component: resolve => { require(['../components/order/errorPay'], resolve) }
  }
]
