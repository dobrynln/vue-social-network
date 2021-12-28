import { createStore } from 'vuex'
import auth from '../store/auth'
import feed from '../store/feed'
import article from '../store/article'
import popular from '../store/popular'
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
    article
  }
})
