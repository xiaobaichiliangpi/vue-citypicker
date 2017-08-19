import Vue from 'vue'
import VueRouter from 'vue-router'
import order from './order'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'homepage',
      meta: {
        title: '食行生鲜提货卡'
      },
      component: resolve => { require(['../components/home'], resolve) }
    },
    {
      path: '/order',
      component: resolve => { require(['../components/order'], resolve) },
      children: order
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
