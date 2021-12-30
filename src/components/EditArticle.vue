<template>
  <section class="create-feed">
    <div class="container">
      <div class="loading" v-if="isLoading">loading</div>
      <app-create-form
        v-if="initialValues"
        :initialValues="initialValues"
        :isSubmitting="isSubmitting"
        @articleSubmiting="onSubmit"
      ></app-create-form>
    </div>
  </section>
</template>

<script>
import CreateFeedForm from '../components/CreateFeedForm'
import { mapState } from 'vuex'
import { actionTypes } from '../store/updateArticle'
export default {
  name: 'appEditFeed',
  data: () => ({}),
  computed: {
    ...mapState({
      isSubmitting: (state) => state.updateArticle.isSubmitting,
      isLoading: (state) => state.updateArticle.isLoading,
      articles: (state) => state.updateArticle.article
    }),
    initialValues () {
      if (!this.articles) {
        return null
      }
      return {
        title: this.articles.title,
        description: this.articles.description,
        body: this.articles.body,
        tagList: this.articles.tagList
      }
    }
  },
  mounted () {
    this.$store.dispatch(actionTypes.getArticle, {
      slug: this.$route.params.slug
    })
  },
  methods: {
    onSubmit (articleInput) {
      const slug = this.$route.params.slug
      console.log({ articleInput })
      this.$store
        .dispatch(actionTypes.updateArticle, { articleInput, slug })
        .then(article => {
          this.$router.push({ name: 'article', params: { slug: article.slug } })
        })
    }
  },
  components: {
    'app-create-form': CreateFeedForm
  }
}
</script>
