import mutationTypes from './mutationTypes'
import {fetchUserInfo} from '@/fetch/api'

const actions = {
  set_clinic_info: ({commit}, obj) => {
    commit(mutationTypes.SET_CLINIC_INFO, obj)
  },
  set_shop_num: ({commit}, val) => {
    commit(mutationTypes.SET_SHOP_NUM, val)
  },
  set_shop_money: ({commit}, val) => {
    commit(mutationTypes.SET_SHOP_MONEY, val)
  },
  // 获取用户的信息
  getUserInfo (store) {
    let params = {}
    fetchUserInfo(params).then(res => {
      if (res.code === 1000) {
        store.commit('updateUserInfo', res.data)
      } else {
        console.log(res)
      }
    })
  }
}

export default actions
