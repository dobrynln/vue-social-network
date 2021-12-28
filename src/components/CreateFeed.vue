<template>
  <section class="create-feed">
    <div class="container">
      <app-create-form :initialValues="initialValues" :isSubmiting="isSubmiting" @articleSubmiting="onSubmit"></app-create-form>
    </div>
  </section>
</template>

<script>
import CreateFeedForm from '../components/CreateFeedForm'
import { mapState } from 'vuex'
import { actionTypeArticle } from '../store/createArticle'
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
      isSubmiting: state => state.createArticle.isSubmiting
    })
  },
  methods: {
    onSubmit (data) {
      console.log(data)
      this.$store.dispatch(actionTypeArticle.createArticle, data).then(article => {
        this.$router.push({ name: 'article', params: { slug: article.slug } })
      })
    }
  },
  components: {
    'app-create-form': CreateFeedForm
  }
}
</script>
