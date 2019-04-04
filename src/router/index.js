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
      component: () => import(/* webpackChunkName: 'home' */'@/components/page/home/index.vue'),
      children: [
        {
          path: '',
          name: 'homePage',
          component: () => import(/* webpackChunkName: 'home' */'@/components/page/home/homePage.vue')
        }
      ]
    },
    {
      path: '/doctor',
      component: () => import(/* webpackChunkName: 'doctor' */'@/components/page/doctor/index.vue'),
      children: [
        {
          path: '',
          name: 'doctorPage',
          component: () => import(/* webpackChunkName: 'doctor' */'@/components/page/doctor/doctorPage.vue')
        }
      ]
    },
    {
      path: '/mall',
      component: () => import(/* webpackChunkName: 'mall' */'@/components/page/mall/index.vue'),
      children: [
        {
          path: '',
          component: () => import(/* webpackChunkName: 'mall' */'@/components/page/mall/mallPage.vue')
        }
      ]
    },
    {
      path: '/personal',
      component: () => import(/* webpackChunkName: 'personal' */'@/components/page/personal/index.vue'),
      children: [
        {
          path: '',
          component: () => import(/* webpackChunkName: 'personal' */'@/components/page/personal/personalPage.vue')
        }
      ]
    }
  ]
})
