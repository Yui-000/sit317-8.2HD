import { createRouter, createWebHistory } from 'vue-router'

import LoadingPage from '../views/LoadingPage.vue'
import Home from '../views/Home.vue'
import AddFood from '../views/AddFood.vue'
import Recipe from '../views/Recipe.vue'
import Settings from '../views/Settings.vue'

const routes = [
  { path: '/', component: LoadingPage },
  { path: '/home', component: Home },
  { path: '/add', component: AddFood },
  { path: '/recipe', component: Recipe },
  { path: '/settings', component: Settings }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 