import articleApi from '@/api/article'

export const mutationTypes = {
  createArticleStart: '[createArticle] Create article start',
  createArticleSuccess: '[createArticle] Create article success',
  createArticleFailure: '[createArticle] Create article failure'
}

export const actionTypes = {
  createArticle: '[createArticle] Create article'
}

export default {
  state: {
    isSubmitting: false
  },
  mutations: {
    [mutationTypes.createArticleStart] (state) {
      state.isSubmitting = true
    },
    [mutationTypes.createArticleSuccess] (state) {
      state.isSubmitting = false
    },
    [mutationTypes.createArticleFailure] (state) {
      state.isSubmitting = false
    }
  },
  actions: {
    [actionTypes.createArticle] ({ commit }, { articleInput }) {
      return new Promise(resolve => {
        commit(mutationTypes.createArticleStart)
        articleApi
          .createArticle(articleInput)
          .then(article => {
            commit(mutationTypes.createArticleSuccess, article)
            resolve(article)
          })
          .catch(() => {
            commit(
              mutationTypes.createArticleFailure
            )
          })
      })
    }
  }
}
