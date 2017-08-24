import Vue from 'vue'
import VueRouter from 'vue-router'
import order from './order'
import exchange from './exchange'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'homepage',
      meta: {
        title: '食行生鲜兑换券'
      },
      component: resolve => { require(['../components/home'], resolve) }
    },
    {
      path: '/order',
      component: resolve => { require(['../components/order'], resolve) },
      children: order
    },
    {
      path: '/exchange',
      component: resolve => { require(['../components/exchange'], resolve) },
      children: exchange
    }
  ]
})

router.afterEach(route => {
  // 不同的页面修改不同的页面标题
  document.title = route && route.meta && route.meta.title
    ? route.meta.title
    : Vue.env.get('APP_NAME')
})

export default router
