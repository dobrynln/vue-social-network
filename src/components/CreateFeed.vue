<template>
  <section class="create-feed">
    <div class="container">
      <app-create-form :initialValues="initialValues" :isSubmitting="isSubmitting" @articleSubmiting="onSubmit"></app-create-form>
    </div>
  </section>
</template>

<script>
import CreateFeedForm from '../components/CreateFeedForm'
import { mapState } from 'vuex'
import { actionTypes } from '../store/createArticle'
export default {
  name: 'appCreateFeed',
  data: () => ({
    initialValues: {
      title: '',
      description: '',
      body: '',
      tagList: []
    }
  }),
  computed: {
    ...mapState({
      isSubmitting: state => state.createArticle.isSubmitting
    })
  },
  methods: {
    onSubmit (articleInput) {
      console.log('create', { articleInput })
      this.$store.dispatch(actionTypes.createArticle, { articleInput }).then(article => {
        this.$router.push({ name: 'article', params: { slug: article.slug } })
      })
    }
  },
  components: {
    'app-create-form': CreateFeedForm
  }
}
</script>
