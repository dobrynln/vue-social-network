<template>
  <section class="home-page">
    <div class="container">
      <div class="block-feed">
        <div class="block-feed__left">
          <app-toggle-feed :tagName="tagName" />
          <app-feed :apiFeed="apiUrl"></app-feed>
        </div>
        <div class="block-feed__right">POPULAR TAGS
          <app-popular-tag />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import feed from '../components/Feed.vue'
import PopularTag from '../components/PopularTag.vue'
import ToggleFeed from '../components/ToggleFeed'
export default {
  name: 'appYouFeed',
  computed: {
    tagName () {
      return this.$route.params.slug
    },
    apiUrl () {
      return (`/articles?tag=${this.tagName}`)
    }
  },
  mounted () {
    console.log(this.tagName)
  },
  components: {
    'app-feed': feed,
    'app-popular-tag': PopularTag,
    'app-toggle-feed': ToggleFeed
  }
}
</script>
