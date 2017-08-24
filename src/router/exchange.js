export default [
  {
    name: 'exchange',
    path: '/exchange',
    meta: {
      title: '食行生鲜-兑换券提货'
    },
    component: resolve => { require(['../components/exchange/exchange'], resolve) }
  },
  {
    name: 'exchangeTempPage',
    path: '/exchange/tempPage',
    meta: {
      title: '食行生鲜-兑换券提货'
    },
    component: resolve => { require(['../components/exchange/tempIndex'], resolve) }
  },
  {
    name: 'exchangeSubmit',
    path: '/exchange/submit',
    meta: {
      title: '食行生鲜-兑换券提货'
    },
    component: resolve => { require(['../components/exchange/submit'], resolve) }
  },
  {
    name: 'exchangeResult',
    path: '/exchange/result',
    meta: {
      title: '食行生鲜-兑换券提货'
    },
    component: resolve => { require(['../components/exchange/result'], resolve) }
  }
]
