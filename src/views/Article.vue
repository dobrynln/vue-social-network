<template>
  <section class="article">
    <div class="container">
      <div class="loading" v-if="isLoading">Загрузка</div>
      <div class="loading" v-if="error">error article</div>
      <div class="article-block" v-if="article">
        <div class="article-top">
          <h2 class="title-h2">{{ article.title }}</h2>
          <div class="article-top__author">
            <div class="article-top__author-left">
              <div class="image-author">
                <router-link
                  :to="{
                    name: 'userProfile',
                    params: { slug: article.author.username },
                  }"
                >
                  <img :src="article.author.image" alt="img author" />
                </router-link>
              </div>
              <div class="author-info">
                <span class="author-info__name">{{
                  article.author.username
                }}</span>
                <span class="author-info__data">{{ article.createdAt }}</span>
              </div>
              <div class="author-button">
                <router-link
                  :to="{ name: 'editArticle', params: { slug: article.slug } }"
                  >Редактировать</router-link
                >
                <button>Удалить</button>
              </div>
            </div>
          </div>
        </div>
        <div class="article-bottom">
            <p class="article-">{{article.body}}</p>
            taglist
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { actionType } from '../store/article'
export default {
  name: 'appArticle',
  computed: {
    ...mapState({
      isLoading: (state) => state.article.isLoading,
      article: (state) => state.article.data,
      error: (state) => state.article.error
    })
  },
  mounted () {
    this.$store.dispatch(actionType.getArticle, this.$route.params.slug)
  }
}
</script>
