<template>
  <section class="home-page">
    <div class="container">
      <div class="block-feed">
        <div class="block-feed__left">
          <app-feed :apiFeed="apiUrl"></app-feed>
        </div>
        <div class="block-feed__right">POPULAR TAGS</div>
      </div>
    </div>
  </section>
</template>

<script>
import feed from '../components/Feed.vue'
export default {
  name: 'appHome',
  data: () => ({
    apiUrl: '/articles'
  }),
  components: {
    'app-feed': feed
  }
}
</script>
