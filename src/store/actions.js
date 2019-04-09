import mutationTypes from './mutationTypes'

const actions = {
  set_clinic_info: ({commit}, obj) => {
    commit(mutationTypes.SET_CLINIC_INFO, obj)
  }
}

export default actions
