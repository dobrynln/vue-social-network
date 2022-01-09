import axios from './axios'

const register = (credentials) => {
  return axios.post('/users', { user: credentials })
}
const login = (credentials) => {
  return axios.post('/users/login', { user: credentials })
}
const getUser = () => {
  return axios.get('/user')
}
const updateUser = userInputs => {
  return axios.put('/user', { user: userInputs }).then(res => res.data.user)
}
export default {
  register,
  login,
  getUser,
  updateUser
}
