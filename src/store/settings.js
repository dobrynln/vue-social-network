import { mutationsType as mutationsTypeAuth } from '../store/auth'
export default {
  state: {
    isSubmitting: false
  },
  mutations: {
    [mutationsTypeAuth.updateCurrentUserStart] (state) {
      state.isSubmitting = true
    },
    [mutationsTypeAuth.updateCurrentUserSuccess] (state) {
      state.isSubmitting = false
    },
    [mutationsTypeAuth.updateCurrentUserFailed] (state) {
      state.isSubmitting = false
    }
  }
}
