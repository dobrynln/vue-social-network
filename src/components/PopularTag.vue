<template>
  <div class="block-popular">
    <div class="isloading" v-if="isLoading">loading tags</div>
    <div class="error-tag" v-if="error">error tag</div>
    <div class="block-popular__tags" v-if="tags">
      <div class="block-popular__tags-item" v-for="tag in tags" :key="tag">
        <router-link :to="{name: 'tag', params: {slug: tag}}">
          {{ tag }}
        </router-link>
      </div>
        <div v-if="tags.length ===  0 && !isLoading">not tags</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { actionType } from '../store/popular'
export default {
  computed: {
    ...mapState({
      isLoading: (state) => state.popular.isLoading,
      tags: (state) => state.popular.data,
      error: (state) => state.popular.error
    })
  },
  mounted () {
    this.$store.dispatch(actionType.getPopular)
  }
}
</script>
