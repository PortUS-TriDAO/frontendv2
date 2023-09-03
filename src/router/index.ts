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
      path: '/project/list',
      name: 'ProjectList',
      component: () => import('../views/projects/ProjectList.vue')
    },
    {
      path: '/project/detail/:id',
      name: 'ProjectDetail',
      component: () => import('../views/projects/ProjectDetail.vue')
    },
    {
      path: '/mine/container',
      name: 'MineContainer',
      component: () => import('../views/mine/MineContainer.vue'),
      children: [
        {
          path: '/project/create',
          name: 'ProjectCreate',
          component: () => import('../views/projects/ProjectCreate.vue')
        },
        {
          path: '/mine/projects',
          name: 'MyProjects',
          component: () => import('../views/mine/MyProjects.vue')
        },
        {
          path: '/mine/distribution',
          name: 'MyDistribution',
          component: () => import('../views/mine/MyDistribution.vue')
        }
      ]
    }
  ]
})

export default router
