import axios from 'axios'
import { getItem } from '../localHelpers/helpersStorage'
// import {getItem} from '../localHelpers/helpersStorage'

axios.defaults.baseURL = 'https://conduit.productionready.io/api'

axios.interceptors.request.use(config => {
  const token = getItem('accessToken')
  const authorization = token ? `Token ${token}` : ''
  config.headers.authorization = authorization
  return config
})

export default axios
