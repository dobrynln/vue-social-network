import articleApi from '@/api/article'

export const mutationTypes = {
  updateArticleStart: '[editArticle] Update article start',
  updateArticleSuccess: '[editArticle] Update article success',
  updateArticleFailure: '[editArticle] Update article failure',

  getArticleStart: '[editArticle] Get article start',
  getArticleSuccess: '[editArticle] Get article success',
  getArticleFailure: '[editArticle] Get article failure'
}

export const actionTypes = {
  updateArticle: '[editArticle] Create article',
  getArticle: '[editArticle] Get article'
}
export default {
  state: {
    isSubmitting: false,
    isLoading: false,
    article: null
  },
  mutations: {
    [mutationTypes.updateArticleStart] (state) {
      state.isSubmitting = true
    },
    [mutationTypes.updateArticleSuccess] (state) {
      state.isSubmitting = false
    },
    [mutationTypes.updateArticleFailure] (state) {
      state.isSubmitting = false
    },
    [mutationTypes.getArticleStart] (state) {
      state.isLoading = true
    },
    [mutationTypes.getArticleSuccess] (state, payload) {
      state.isLoading = false
      state.article = payload
    },
    [mutationTypes.getArticleFailure] (state) {
      state.isLoading = false
    }
  },
  actions: {
    [actionTypes.updateArticle] ({ commit }, { slug, articleInput }) {
      return new Promise(resolve => {
        commit(mutationTypes.updateArticleStart)
        articleApi
          .updateArticle(slug, articleInput)
          .then(article => {
            commit(mutationTypes.updateArticleSuccess, article)
            resolve(article)
          })
          .catch(() => {
            commit(
              mutationTypes.updateArticleFailure
            )
          })
      })
    },
    [actionTypes.getArticle] ({ commit }, { slug }) {
      return new Promise(resolve => {
        commit(mutationTypes.getArticleStart)
        articleApi
          .getArticle(slug)
          .then(article => {
            commit(mutationTypes.getArticleSuccess, article)
            resolve(article)
          })
          .catch(() => {
            commit(mutationTypes.getArticleFailure)
          })
      })
    }
  }
}
