import axios from './axios'

const getPopular = () => {
  return axios.get('/tags').then(res => res.data.tags)
}

export default {
  getPopular
}
