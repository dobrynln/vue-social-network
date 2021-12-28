import PopularApi from '../api/popularTags'

export const mutationsType = {
  getPopularStart: '[tags] tags start',
  getPopularSuccess: '[tags] tags success',
  getPopularFailed: '[tags] tags failed'
}
export const actionType = {
  getPopular: '[tags] get tags'
}
export default {
  state: {
    data: null,
    isLoading: false,
    error: null
  },
  mutations: {
    [mutationsType.getPopularStart] (state) {
      state.isLoading = true
      state.data = null
    },
    [mutationsType.getPopularSuccess] (state, payload) {
      state.isLoading = false
      state.data = payload
    },
    [mutationsType.getPopularFailed] (state) {
      state.isLoading = false
    }
  },
  actions: {
    [actionType.getPopular] ({ commit }) {
      return new Promise(resolve => {
        commit(mutationsType.getPopularStart)
        PopularApi.getPopular().then(tags => {
          commit(mutationsType.getPopularSuccess, tags)
          resolve(tags)
        }).catch(() => {
          commit(mutationsType.getPopularFailed)
        })
      })
    }
  },
  getters: {

  }
}
