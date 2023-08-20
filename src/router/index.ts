import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/project/create',
      name: 'ProjectCreate',
      component: () => import('../views/projects/ProjectCreate.vue')
    }
  ]
})

export default router
