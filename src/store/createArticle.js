import articleApi from '../api/article'

export const mutationTypeArticle = {
  createArticleStart: '[createArticle] start',
  createArticleSuccess: '[createArticle] success',
  createArticleFailed: '[createArticle] failed'
}
export const actionTypeArticle = {
  createArticle: '[createArticle] request'
}

export default {
  state: {
    isSubmiting: false
  },
  mutations: {
    [mutationTypeArticle.createArticleStart] (state) {
      state.isSubmiting = true
    },
    [mutationTypeArticle.createArticleSuccess] (state) {
      state.isSubmiting = false
    },
    [mutationTypeArticle.createArticleFailed] (state) {
      state.isSubmiting = false
    }
  },
  actions: {
    [actionTypeArticle.createArticle] ({ commit }, articleInput) {
      return new Promise(resolve => {
        commit(mutationTypeArticle.createArticleStart)
        articleApi.createArticle(articleInput).then(article => {
          commit(mutationTypeArticle.createArticleSuccess, article)
          resolve(article)
        }).catch(e => {
          commit(mutationTypeArticle.createArticleFailed)
          console.log('error createArticle.js ', e)
        })
      })
    }
  }
}
