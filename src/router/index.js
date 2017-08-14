import Vue from 'vue'
import VueRouter from 'vue-router'
import sign from './sign'
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
    },
    {
      path: '/sign',
      component: resolve => { require(['../components/sign'], resolve) },
      children: sign
    }
  ]
})

export default router
