import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login'
import Home from '../views/Home'
import YouFeed from '../views/YouFeed'
import TagName from '../views/TagName'
import Article from '../views/Article'
import CreateFeed from '../components/CreateFeed'
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/userProfile',
    name: 'userProfile',
    component: Register
  },
  {
    path: '/feed',
    name: 'yourFeed',
    component: YouFeed
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: TagName
  },
  {
    path: '/articles/:slug',
    name: 'article',
    component: Article
  },
  {
    path: '/articles/new',
    name: 'createArticles',
    component: CreateFeed
  },
  {
    path: '/articles/:slug/edit',
    name: 'editArticle',
    component: Register
  },
  {
    path: '/settings',
    name: 'settings',
    component: Register
  },
  {
    path: '/profiles/:slug',
    name: 'userProfile',
    component: Register
  },
  {
    path: '/profiles/:slug/favorited',
    name: 'userProfileFavorited',
    component: Register
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
