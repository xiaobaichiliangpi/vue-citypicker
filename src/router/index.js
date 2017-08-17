import Vue from 'vue'
import VueRouter from 'vue-router'
import order from './order'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'homepage',
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

router.beforeEach((to, from, next) => {
  if (/micromessenger/.test(navigator.userAgent.toLowerCase())) {
    next()
    // window.open('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa3861f732ba9f532&redirect_uri=http://wechat-1.34580.com/auth&response_type=code&scope=snsapi_base&state=https://wechat.34580.com|my#wechat_redirect', '_self')
  } else {
    next()
  }
})

export default router
