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
  }
]
