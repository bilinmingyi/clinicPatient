import mutationTypes from '@/store/mutationTypes.js'

const mutations = {
    [mutationTypes.SET_CLINIC_INFO](state, obj) {
        Object.keys(obj).forEach(item => {
            state.clinic[item] = obj[item]
        })
    },
    updateUserInfo(state, object) {
        state.userInfoState = object;
    }
}

export default mutations