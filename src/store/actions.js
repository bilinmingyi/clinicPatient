import mutationTypes from './mutationTypes'
import { fetchUserInfo } from '@/fetch/api'

const actions = {
    set_clinic_info: ({ commit }, obj) => {
        commit(mutationTypes.SET_CLINIC_INFO, obj)
    },
    //获取用户的信息
    getUserInfo(store) {
        let params = {};
        fetchUserInfo(params).then(res => {
            if (res.code == 1000) {
                console.log(res)
                store.commit('updateUserInfo', res.data);
            } else {
                console.log(res);
            }
        });
    }
}

export default actions