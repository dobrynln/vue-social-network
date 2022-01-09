<template>
  <div>
    <div v-if="isLoading">Идет загрузка...</div>
    <div v-if="error">Ошибка</div>
    <div class="feed-block" v-if="feed">
      <div
        class="feed-block__item"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
        <div class="feed-top">
          <div class="feed-top__left">
            <router-link
              :to="{ name: 'userProfile', params: { slug: article.author.username } }"
              class="link-router"
            >
              <img
                :src="article.author.image"
                alt="img author"
                class="img-author"
              />
            </router-link>
            <div class="feed-top__right">
              <router-link
                :to="{
                  name: 'userProfile',
                  params: { slug: article.author.username },
                }"
                class="link-router"
              >
                <span class="username-feed">{{ article.author.username }}</span>
                <span class="data-article">{{ article.createdAt }}</span>
              </router-link>
            </div>
          </div>
          <app-favorites :Favorites="article.favorited" :FeedSlug="article.slug" :FavoritedCount="article.favoritesCount"></app-favorites>
        </div>
        <div class="feed-middle">
          <router-link :to="{name: 'article', params: {slug: article.slug}}">
            <h1 class="title-h1">{{article.title}}</h1>
            <p class="descr-feed">{{article.description}}</p>
            <div class="feed-middle__bottom">
              <span class="descr-read">Прочитать</span>
              <app-tag-list :tags="article.tagList"></app-tag-list>
            </div>
          </router-link>
        </div>
      </div>
      <app-pagination :total="feed.articlesCount" :limit="limit" :currentPage="currentPage" :url="baseUrl" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { actionType } from '../store/feed'
import Pagintanion from '../components/Pagination'
import { limit } from '../localHelpers/varbs'
import { stringify, parseUrl } from 'query-string'
import TagList from '../components/TagList'
import FavoritesFeed from '../components/FavoritesFeed.vue'
export default {
  name: 'appFeed',
  props: {
    apiFeed: {
      type: String,
      required: true
    }
  },
  data: () => ({
    limit,
    url: '/'
  }),
  computed: {
    ...mapState({
      isLoading: (state) => state.feed.isLoading,
      feed: (state) => state.feed.data,
      error: (state) => state.feed.error
    }),
    currentPage () {
      return Number(this.$route.query.page || '1')
    },
    baseUrl () {
      return this.$route.path
    },
    offset () {
      return this.currentPage * this.limit - this.limit
    }
  },
  watch: {
    currentPage () {
      this.getFeedRequest()
    }
  },
  mounted () {
    this.getFeedRequest()
  },
  methods: {
    getFeedRequest () {
      const urlParsed = parseUrl(this.apiFeed)
      const stringifiParams = stringify({
        limit,
        offset: this.offset,
        ...urlParsed.query
      })
      const apiParams = `${urlParsed.url}?${stringifiParams}`
      console.log(stringifiParams, stringify)
      this.$store.dispatch(actionType.getFeed, apiParams)
    }
  },
  components: {
    'app-pagination': Pagintanion,
    'app-tag-list': TagList,
    'app-favorites': FavoritesFeed
  }
}
</script>
