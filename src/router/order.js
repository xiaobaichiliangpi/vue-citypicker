export default [
  {
    name: 'orderSubmit',
    path: '/order/submit',
    meta: {
      title: '提交订单'
    },
    component: resolve => { require(['../components/order/order'], resolve) }
  },
  {
    name: 'orderAddress',
    path: '/order/address',
    component: resolve => { require(['../components/order/address'], resolve) }
  },
  {
    name: 'orderInvoices',
    path: '/order/invoices',
    component: resolve => { require(['../components/order/invoices'], resolve) }
  },
  {
    name: 'createInvoices',
    path: '/order/invoices/create',
    component: resolve => { require(['../components/order/createInvoices'], resolve) }
  },
  {
    name: 'uploadInvoices',
    path: '/order/invoices/upload',
    component: resolve => { require(['../components/order/upload'], resolve) }
  },
  {
    name: 'sendCommission',
    path: '/order/invoices/sendcommission',
    component: resolve => { require(['../components/order/sendCommission'], resolve) }
  },
  {
    name: 'orderList',
    path: '/order/list',
    meta: {
      title: '我的提货卡订单'
    },
    component: resolve => { require(['../components/order/list'], resolve) }
  }
]
