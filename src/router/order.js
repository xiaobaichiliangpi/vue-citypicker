export default [
  {
    name: 'orderSubmit',
    path: '/order/submit',
    component: resolve => { require(['../components/order'], resolve) }
  }
]
