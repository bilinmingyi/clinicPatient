import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: () => import(/* webpackChunkName: 'home' */'@/components/page/home.vue'),
      children: [
        {
          path: '',
          meta: {
            currIndex: 1
          }
        }
      ]
    },
    {
      path: '/doctor',
      component: () => import(/* webpackChunkName: 'doctor' */'@/components/page/doctor.vue'),
      children: [
        {
          path: '',
          meta: {
            currIndex: 2
          }
        }
      ]
    },
    {
      path: '/mall',
      component: () => import(/* webpackChunkName: 'mall' */'@/components/page/mall.vue'),
      children: [
        {
          path: '',
          meta: {
            currIndex: 3
          }
        }
      ]
    },
    {
      path: '/personal',
      component: () => import(/* webpackChunkName: 'personal' */'@/components/page/personal.vue'),
      children: [
        {
          path: '',
          meta: {
            currIndex: 4
          }
        }
      ]
    }
  ]
})
