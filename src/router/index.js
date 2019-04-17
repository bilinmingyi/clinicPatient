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
        },
        {
          path: 'chatRoom',
          name: 'chatRoom',
          component: () => import(/* webpackChunName: 'chatRoom' */'@/components/page/home/chatRoom.vue')
        },
        {
          path: 'articleDetail/:id',
          name: 'articleDetail',
          component: () => import(/* webpackChunName: 'chatRoom' */'@/components/page/home/articleDetail.vue'),
          props: true
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
        },
        {
          path: 'detail/:id',
          component: () => import(/* webpackChunkName: 'doctor' */'@/components/page/doctor/doctorDetail.vue'),
          props: true
        },
        {
          path: 'appointSure',
          name: 'appointSure',
          component: () => import(/* webpackChunkName: 'doctor' */'@/components/page/doctor/appointSure.vue'),
          props: (route) => route.query
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
          name: 'personal',
          component: () => import(/* webpackChunkName: 'personal' */'@/components/page/personal/personalPage.vue')
        },
        {
          path: 'patientListPage',
          name: 'patientListPage',
          component: () => import(/* webpackChunkName: 'personal' */'@/components/page/personal/patientListPage.vue')
        },
        {
          path: 'editPatient',
          name: 'editPatient',
          component: () => import(/* webpackChunkName: 'personal' */'@/components/page/personal/editPatient.vue')
        },
        {
          path: 'editPerson',
          name: 'editPerson',
          component: () => import(/* webpackChunkName: 'personal' */'@/components/page/personal/editPerson.vue')
        },
        {
          path: 'editPhone',
          name: 'editPhone',
          props: (route) => route.query,
          component: () => import(/* webpackChunkName: 'personal' */'@/components/page/personal/modifyPhone.vue')
        },
        {
          path: 'recipeListPage',
          name: 'recipeListPage',
          component: () => import(/* webpackChunkName: 'personal' */'@/components/page/personal/recipeListPage.vue')
        },
        {
          path: 'recipeListPage/recipeOrderDetail',
          name: 'recipeOrderDetail',
          component: () => import(/* webpackChunkName: 'personal' */'@/components/page/personal/recipeOrderDetail.vue'),
          props: (route) => route.query
        },
        {
          path: 'appointListPage',
          name: 'appointListPage',
          component: () => import(/* webpackChunkName: 'personal' */'@/components/page/personal/appointListPage.vue')
        },
        {
          path: 'appointListPage/appointOrderDetail',
          name: 'appointOrderDetail',
          component: () => import(/* webpackChunkName: 'personal' */'@/components/page/personal/appointOrderDetail.vue'),
          props: (route) => route.query
        }
      ]
    }
  ]
})
