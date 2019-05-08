import mutationTypes from './mutationTypes'

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
  set_user_info: ({commit}, obj) => {
    commit(mutationTypes.SET_USER_INFOR, obj)
  }
}

export default actions
