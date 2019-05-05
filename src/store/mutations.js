import mutationTypes from '@/store/mutationTypes.js'

const mutations = {
  [mutationTypes.SET_CLINIC_INFO] (state, obj) {
    Object.keys(obj).forEach(item => {
      state.clinic[item] = obj[item]
    })
  },
  [mutationTypes.SET_SHOP_NUM] (state, val) {
    state.shopCarNum = Number(val)
  },
  [mutationTypes.SET_SHOP_MONEY] (state, val) {
    state.shopCarMoney = Number(val)
  },
  updateUserInfo (state, object) {
    state.userInfoState = object
  }
}

export default mutations
