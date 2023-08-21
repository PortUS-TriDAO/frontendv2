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
    },
    {
      path: '/project/list',
      name: 'ProjectList',
      component: () => import('../views/projects/ProjectList.vue')
    },
    {
      path: '/project/detail',
      name: 'ProjectDetail',
      component: () => import('../views/projects/ProjectDetail.vue')
    },
    {
      path: '/mine/tasks',
      name: 'MyTask',
      component: () => import('../views/mine/MyTask.vue')
    }
  ]
})

export default router
