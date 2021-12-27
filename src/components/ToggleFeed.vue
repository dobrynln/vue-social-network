<template>
  <div class="feed-toggle">
    <ul class="ul-feed">
      <li class="item-feed" v-if="isLoginUser">
        <router-link :to="{ name: 'yourFeed' }" :class="{'active-link': routerName === 'yourFeed'}">Мои новости</router-link>
      </li>
      <li class="item-feed">
        <router-link :to="{ name: 'home' }" :class="{'active-link': routerName === 'home'}">Все новости</router-link>
      </li>
      <li class="item-feed" v-if="tagName">
        <router-link :to="{ name: 'tag' }" :class="{'active-link': routerName === 'tag'}">{{tagName}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {gettersType} from '../store/auth'
export default {
  name: "appToggleFeed",
  props: {
    tagName: {
      type: String,
      required: false,
    },
  },
  computed: {
      ...mapGetters({
          isLoginUser: gettersType.inLoggedIn
      }),
      routerName() {
          return this.$route.name
      }
  },
  mounted() {
      console.log(this.$route.name)
  }
};
</script>
