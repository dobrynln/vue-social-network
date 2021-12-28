<template>
  <section class="article">
    <div class="container">
      <div class="loading" v-if="isLoading">Загрузка</div>
      <div class="error" v-if="error">error article</div>
    </div>
    <div class="article-block" v-if="article">
      <div class="article-top">
        <div class="container">
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
              <div class="author-button" v-if="isAuthor">
                <router-link
                  :to="{ name: 'editArticle', params: { slug: article.slug } }"
                  class="edit-article"> <v-icon left>mdi-pencil-outline</v-icon> Редактировать</router-link
                >
                <button class="delete-article" @click="deleteArticle"> <v-icon left>mdi-delete-circle</v-icon> Удалить</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="article-bottom">
          <p class="article-">{{ article.body }}</p>
          taglist
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { actionType } from '../store/article'
import { gettersType } from '../store/auth'
export default {
  name: 'appArticle',
  computed: {
    ...mapState({
      isLoading: (state) => state.article.isLoading,
      article: (state) => state.article.data,
      error: (state) => state.article.error
    }),
    ...mapGetters({
      currentUser: gettersType.currentUser
    }),
    isAuthor () {
      if (!this.currentUser || !this.article) {
        return false
      }
      return this.currentUser.username === this.article.author.username
    }
  },
  mounted () {
    this.$store.dispatch(actionType.getArticle, this.$route.params.slug)
    console.log(this.article)
  },
  methods: {
    deleteArticle () {
      this.$store.dispatch(actionType.deleteArticle, this.$route.params.slug).then(() => {
        this.$router.push({ name: 'home' })
      })
    }
  }
}
</script>
