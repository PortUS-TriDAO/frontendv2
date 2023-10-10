import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/home/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/project/list',
      name: 'ProjectList',
      // component: () => import('../views/projects/ProjectList.vue'),
      component: () => import('../views/v3/project/ProjectList.vue'),
    },
    {
      path: '/project/:id',
      name: 'ProjectDetail',
      // component: () => import('../views/projects/ProjectDetail.vue'),
      component: () => import('../views/v3/project/ProjectDetail.vue'),
    },
    {
      path: '/project/:id/:businessId',
      name: 'ProjectDetail',
      component: () => import('../views/v3/project/BusinessDetail.vue'),
    },
    {
      path: '/mine/container',
      name: 'MineContainer',
      component: () => import('../views/mine/MineContainer.vue'),
      children: [
        {
          path: '/project/create',
          name: 'ProjectCreate',
          component: () => import('../views/projects/ProjectCreate.vue'),
        },
        {
          path: '/mine/projects',
          name: 'MyProjects',
          component: () => import('../views/mine/MyProjects.vue'),
        },
        {
          path: '/mine/distribution',
          name: 'MyDistribution',
          component: () => import('../views/mine/MyDistribution.vue'),
        },
      ],
    },
    {
      path: '/project/create/step1',
      name: 'CreateProjectStep1',
      component: () => import('../views/mine/CreateProjectStep1.vue'),
    },
    {
      path: '/project/create/step2',
      name: 'CreateProjectStep2',
      component: () => import('../views/mine/CreateProjectStep2.vue'),
    },
    {
      path: '/project/createsuccess',
      name: 'CreateSuccess',
      component: () => import('../views/projects/components/CreateSuccess.vue'),
    },
  ],
});

export default router;
