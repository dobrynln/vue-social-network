import favApi from '../api/favorites'

export const mutationsTypeFavorites = {
  addToFavoritesStart: '[Favorites] start',
  addToFavoritesSuccess: '[Favorites] success',
  addToFavoritesFailed: '[Favorites] failed'
}
export const actionsTypeFavorites = {
  addToFavorites: '[Favorites] add to Favorites'
}
export default {
  mutations: {
    [mutationsTypeFavorites.addToFavoritesStart] () {},
    [mutationsTypeFavorites.addToFavoritesSuccess] () {},
    [mutationsTypeFavorites.addToFavoritesFailed] () {}
  },
  actions: {
    [actionsTypeFavorites.addToFavorites] ({ commit }, { slug, isFavorited }) {
      return new Promise(resolve => {
        commit(mutationsTypeFavorites.addToFavoritesStart)
        const promise = isFavorited ? favApi.removeToFavorites(slug) : favApi.addToFavorites(slug)
        promise.then(article => {
          commit(mutationsTypeFavorites.addToFavoritesSuccess, article)
          resolve(article)
        }).catch((e) => {
          console.log('error favorires js', e)
          commit(mutationsTypeFavorites.addToFavoritesFailed)
        })
      })
    }
  }
}
