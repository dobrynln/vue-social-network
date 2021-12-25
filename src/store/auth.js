import authApi from '../api/auth'
import { setItem } from '../localHelpers/helpersStorage'

export const mutationsType = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailed: '[auth] registerFailed',

  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailed: '[auth] loginFailed',

  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFailed: '[auth] getCurrentUserFailed'
}
export const actionType = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser'
}
export const gettersType = {
  currentUser: '[auth] currentUser',
  inLoggedIn: '[auth] inLoggedIn',
  inAnonim: '[auth] inAnonim'
}
export default {
  state: {
    isSubmitting: false,
    currentUser: null,
    inLoggedIn: null,
    isLoading: true
  },
  mutations: {
    [mutationsType.registerStart] (state) {
      state.isSubmitting = true
    },
    [mutationsType.registerSuccess] (state, payload) {
      state.isSubmitting = false
      state.currentUser = payload
      state.inLoggedIn = true
    },
    [mutationsType.registerFailed] (state) {
      state.isSubmitting = false
    },
    [mutationsType.loginStart] (state) {
      state.isSubmitting = true
    },
    [mutationsType.loginSuccess] (state, payload) {
      state.isSubmitting = false
      state.currentUser = payload
      state.inLoggedIn = true
    },
    [mutationsType.loginFailed] (state) {
      state.isSubmitting = false
    },
    [mutationsType.getCurrentUserStart] (state) {
      state.isLoading = true
    },
    [mutationsType.getCurrentUserSuccess] (state, payload) {
      state.isLoading = false
      state.currentUser = payload
      state.inLoggedIn = true
    },
    [mutationsType.getCurrentUserFailed] (state) {
      state.isLoading = false
      state.inLoggedIn = false
      state.currentUser = null
    }
  },
  actions: {
    [actionType.register] ({ commit }, credentials) {
      return new Promise((resolve) => {
        commit(mutationsType.registerStart)
        authApi.register(credentials)
          .then((res) => {
            commit(mutationsType.registerSuccess, res.data.user)
            setItem('accessToken', res.data.user.token)
            console.log(setItem('accessToken', res.data.user.token))
            resolve(res.data)
          }).catch(e => {
            commit(mutationsType.registerFailed)
            console.log(e)
          })
      })
    },
    [actionType.login] ({ commit }, credentials) {
      return new Promise((resolve) => {
        commit(mutationsType.loginStart)
        authApi.login(credentials)
          .then((res) => {
            commit(mutationsType.loginSuccess, res.data.user)
            resolve(res.data)
          }).catch(e => {
            commit(mutationsType.loginFailed)
            console.log(e)
          })
      })
    },
    [actionType.getCurrentUser] ({ commit }) {
      return new Promise((resolve) => {
        commit(mutationsType.getCurrentUserStart)
        authApi.getUser()
          .then((res) => {
            commit(mutationsType.getCurrentUserSuccess, res.data.user)
            resolve(res.data.user)
          }).catch(e => {
            commit(mutationsType.getCurrentUserFailed)
            console.log(e)
          })
      })
    }
  },
  getters: {
    [gettersType.inLoggedIn]: state => {
      return Boolean(state.inLoggedIn)
    },
    [gettersType.currentUser]: state => {
      return state.currentUser
    },
    [gettersType.inAnonim]: state => {
      return state.inLoggedIn === false
    }

  },
  modules: {}
}
