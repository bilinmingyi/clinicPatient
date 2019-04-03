// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import filters from './assets/js/fliters'
import components from './assets/js/components'
import store from './store/index'
// import './assets/css/reset.css'

// 配置Vue脚手架移动适配--rem
import 'lib-flexible/flexible'

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Object.keys(components).forEach((key) => {
  Vue.component(key, components[key])
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
