<template>
    <button class="favorited" @click="handleLike" :class="{'active-favorited': isFavoriteCount}">
        <v-icon>mdi-cards-heart</v-icon>
        <span>{{}}</span>
        <span class="count-favorited">{{isFavoriteCount}}</span>
    </button>
</template>

<script>
import { actionsTypeFavorites } from '../store/favorites'
export default {
  name: 'appFavorites',
  props: {
    Favorites: {
      type: Boolean,
      required: true
    },
    FeedSlug: {
      type: String,
      required: true
    },
    FavoritedCount: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isFavoriteCount: this.FavoritedCount,
      isFavorites: this.Favorites
    }
  },
  methods: {
    handleLike () {
      this.$store.dispatch(actionsTypeFavorites.addToFavorites, {
        slug: this.FeedSlug,
        isFavorited: this.isFavoriteCount
      })
      if (this.isFavoriteCount) {
        this.isFavoriteCount--
      } else {
        this.isFavoriteCount++
      }
    }
  }
}
</script>
