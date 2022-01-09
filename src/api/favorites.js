import axios from './axios'

const addToFavorites = slug => {
  return axios.post(`/articles/${slug}/favorite`).then(res => res.data.article)
}
const removeToFavorites = slug => {
  return axios.delete(`/articles/${slug}/favorite`).then(res => res.data.article)
}

export default {
  addToFavorites,
  removeToFavorites
}
