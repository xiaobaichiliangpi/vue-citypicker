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
  },
  {
    name: 'exchangeAddress',
    path: '/exchange/submit/address',
    meta: {
      title: '选择提货地址'
    },
    component: resolve => { require(['../components/exchange/address'], resolve) }
  },
  {
    name: 'exchangeStation',
    path: '/exchange/submit/station',
    meta: {
      title: '选择自提站点'
    },
    component: resolve => { require(['../components/exchange/stationManage'], resolve) }
  },
  {
    name: 'exchangeReceiveTime',
    path: '/exchange/submit/receiveTime/:workStationId',
    meta: {
      title: '选择收货时间'
    },
    component: resolve => { require(['../components/exchange/receiveTime'], resolve) }
  }
]
