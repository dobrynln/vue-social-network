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
          <div class="span">LIKE</div>
        </div>
        <div class="feed-middle">
          <router-link :to="{name: 'article', params: {slug: article.slug}}">
            <h1 class="title-h1">{{article.title}}</h1>
            <p class="descr-feed">{{article.description}}</p>
            <div class="feed-middle__bottom">
              <span class="descr-read">Прочитать</span>
              <ul><li>TAGS</li></ul>
            </div>
          </router-link>
        </div>
      </div>
      <app-pagination :total="total" :limit="limit" :currentPage="currentPage" :url="url" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { actionType } from "../store/feed";
import Pagintanion from '../components/Pagination'
export default {
  name: "appFeed",
  props: {
    apiFeed: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    total: 500,
    limit: 10,
    currentPage: 5,
    url: '/tags/dragons'
  }),
  computed: {
    ...mapState({
      isLoading: (state) => state.feed.isLoading,
      feed: (state) => state.feed.data,
      error: (state) => state.feed.error,
    }),
  },
  mounted() {
    this.$store.dispatch(actionType.getFeed, this.apiFeed);
  },
  components: {
    'app-pagination': Pagintanion
  }
};
</script>
