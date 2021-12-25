<template>
  <header class="header">
    <div class="container">
      <div class="menu-header">
        <div class="menu-header__left">
          <v-app-bar-nav-icon
            @click.stop="openNavBar()"
            class="d-xl-none d-lg-none d-md-none"
          ></v-app-bar-nav-icon>
          <router-link class="nav-list__item-link" :to="{ name: 'home' }">
            <span class="title-social"
              >Dobrynin <span>social</span></span
            ></router-link
          >
        </div>
        <v-navigation-drawer
          v-model="isNavBar"
          disable-resize-watcher
          absolute
          bottom
          temporary
        >
          <ul class="nav-list">
            <template v-if="inLoggedIn">
              <li class="nav-list__item">
                <router-link
                  class="nav-list__item-link mr-2"
                  :to="{ name: 'home' }"
                  >Главная</router-link
                >
              </li>
              <li class="nav-list__item mr-2">
                <router-link class="nav-list__item-link" :to="{ name: 'home' }">
                  Новый пост
                </router-link>
              </li>
              <li class="nav-list__item mr-2">
                <router-link class="nav-list__item-link" :to="{ name: 'home' }">
                  Настройки
                </router-link>
              </li>
              <li class="nav-list__item">
                <router-link
                  class="nav-list__item-link"
                  :to="{ name: 'home', params: { slug: currentUser.username } }"
                >
                  <img :src="currentUser.image" class="img-user ml-2" alt="img profile" />{{
                    currentUser.username
                  }}</router-link
                >
              </li>
            </template>
            <template v-if="inAnonim">
              <li class="nav-list__item mr-2">
                <router-link class="nav-list__item-link" :to="{ name: 'login' }"
                  >Авторизация</router-link
                >
              </li>
              <li class="nav-list__item">
                <router-link
                  class="nav-list__item-link"
                  :to="{ name: 'register' }"
                  >Регистрация</router-link
                >
              </li>
            </template>
          </ul>
        </v-navigation-drawer>
        <nav class="nav-header hidden-sm-and-down hidden-xs-and-down">
          <ul class="nav-list">
            <template v-if="inLoggedIn">
              <li class="nav-list__item">
                <router-link
                  class="nav-list__item-link mr-2"
                  :to="{ name: 'home' }"
                  >Главная</router-link
                >
              </li>
              <li class="nav-list__item mr-2">
                <router-link class="nav-list__item-link" :to="{ name: 'home' }">
                  Новый пост
                </router-link>
              </li>
              <li class="nav-list__item mr-2">
                <router-link class="nav-list__item-link" :to="{ name: 'home' }">
                  Настройки
                </router-link>
              </li>
              <li class="nav-list__item">
                <router-link
                  class="nav-list__item-link"
                  :to="{ name: 'home', params: { slug: currentUser.username } }"
                >
                  <img :src="currentUser.image" class="img-user ml-2" alt="img profile" />{{
                    currentUser.username
                  }}</router-link
                >
              </li>
            </template>
            <template v-if="!inLoggedIn">
              <li class="nav-list__item mr-2">
                <router-link class="nav-list__item-link" :to="{ name: 'login' }"
                  >Авторизация</router-link
                >
              </li>
              <li class="nav-list__item">
                <router-link
                  class="nav-list__item-link"
                  :to="{ name: 'register' }"
                  >Регистрация</router-link
                >
              </li>
            </template>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import { gettersType } from '../store/auth'
import { mapGetters } from 'vuex'
export default {
  name: 'app-navbar',
  data: () => ({
    isNavBar: false
  }),
  methods: {
    openNavBar () {
      this.isNavBar = !this.isNavBar
      if (this.isNavBar === true) {
        document.querySelector('body').addEventListener('click', () => {
          this.isNavBar = false
        })
      }
    }
  },
  computed: {
    ...mapGetters({
      currentUser: gettersType.currentUser,
      inLoggedIn: gettersType.inLoggedIn,
      inAnonim: gettersType.inAnonim
    })
  }
}
</script>
