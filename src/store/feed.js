import feedApi from '../api/feed'

export const mutationsType = {
  getFeedStart: '[feed] feed start',
  getFeedSuccess: '[feed] feed success',
  getFeedFailed: '[feed] feed failed'
}
export const actionType = {
  getFeed: '[feed] get feed'
}
export default {
  state: {
    data: null,
    isLoading: false,
    error: null
  },
  mutations: {
    [mutationsType.getFeedStart] (state) {
      state.isLoading = true
      state.data = null
    },
    [mutationsType.getFeedSuccess] (state, payload) {
      state.isLoading = false
      state.data = payload
    },
    [mutationsType.getFeedFailed] (state) {
      state.isLoading = false
    }
  },
  actions: {
    [actionType.getFeed] ({ commit }, apiUrl) {
      return new Promise(resolve => {
        commit(mutationsType.getFeedStart)
        feedApi.getFeed(apiUrl).then(res => {
          commit(mutationsType.getFeedSuccess, res.data)
          resolve(res.data)
        }).catch(() => {
          commit(mutationsType.getFeedFailed)
        })
      })
    }
  },
  getters: {

  }
}
