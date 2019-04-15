import Vue from 'vue'
import Vuex from 'vuex'

import actions from '@/store/actions.js'
import getters from '@/store/getters.js'
import mutations from '@/store/mutations.js'

Vue.use(Vuex)
const state = {
    clinic: {
        id: '',
        name: '',
        customerPhone: '',
        provinceName: '',
        provinceCode: '',
        cityName: '',
        cityCode: '',
        countyName: '',
        countyCode: '',
        address: '',
        logo: ''
    },
    userInfoState: {} //客户信息
}

const store = new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})

if (module.hot) {
    module.hot.accept(['./mutations'], () => {
        // 获取更新后的模块
        // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
        const newMutations = require('./mutations').default
            // 加载新模块
        store.hotUpdate({
            mutations: newMutations
        })
    })
}

export default store