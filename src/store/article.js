import articleApi from '../api/article'

export const mutationsType = {
  getArticleStart: '[article] article start',
  getArticleSuccess: '[article] article success',
  getArticleFailed: '[article] article failed',

  deleteArticleStart: '[article] article start',
  deleteArticleSuccess: '[article] article success',
  deleteArticleFailed: '[article] article failed'
}
export const actionType = {
  getArticle: '[article] get article',
  deleteArticle: '[article] delete article'
}
export default {
  state: {
    data: null,
    isLoading: false,
    error: null
  },
  mutations: {
    [mutationsType.getArticleStart] (state) {
      state.isLoading = true
      state.data = null
    },
    [mutationsType.getArticleSuccess] (state, payload) {
      state.isLoading = false
      state.data = payload
    },
    [mutationsType.getArticleFailed] (state) {
      state.isLoading = false
    },
    [mutationsType.deleteArticleStart] (state) {
      state.isLoading = true
    },
    [mutationsType.deleteArticleSuccess] (state, payload) {
      state.isLoading = false
      state.data = payload
    },
    [mutationsType.deleteArticleFailed] (state) {
      state.isLoading = false
    }
  },
  actions: {
    [actionType.getArticle] ({ commit }, slug) {
      return new Promise((resolve) => {
        commit(mutationsType.getArticleStart)
        articleApi
          .getArticle(slug)
          .then((article) => {
            commit(mutationsType.getArticleSuccess, article)
            resolve(article)
          })
          .catch(() => {
            commit(mutationsType.getArticleFailed)
          })
      })
    },
    [actionType.deleteArticle] ({ commit }, slug) {
      return new Promise((resolve) => {
        commit(mutationsType.deleteArticleStart)
        articleApi
          .deleteArticle(slug)
          .then(() => {
            commit(mutationsType.deleteArticleSuccess)
            resolve()
          })
          .catch((e) => {
            commit(mutationsType.deleteArticleFailed)
            console.log('not delete', e)
          })
      })
    }
  },
  getters: {}
}
