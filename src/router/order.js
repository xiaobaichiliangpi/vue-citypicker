export default [
  {
    name: 'orderSubmit',
    path: '/order/submit',
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
  }
]
