<template>
  <v-app>
    <v-main>
      <app-navbar />
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'
import { actionType } from './store/auth'
export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    'app-navbar': NavBar
  },
  mounted () {
    this.$store.dispatch(actionType.getCurrentUser)
  }
}
</script>
<style lang="less">
@import "./style/main.less";
</style>
