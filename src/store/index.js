import { createStore } from 'vuex'
import auth from '../store/auth'
import feed from '../store/feed'
import article from '../store/article'
import popular from '../store/popular'
import createArticle from '../store/createArticle'
export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    feed,
    popular,
    createArticle,
    article
  }
})
