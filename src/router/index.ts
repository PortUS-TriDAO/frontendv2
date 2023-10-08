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
      component: () => import('../views/projects/ProjectList.vue'),
    },
    {
      path: '/project/detail/:id',
      name: 'ProjectDetail',
      component: () => import('../views/projects/ProjectDetail.vue'),
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
      component: () => import('../views/projects/CreateProjectStep1.vue'),
    },
    {
      path: '/project/create/step2',
      name: 'CreateProjectStep2',
      component: () => import('../views/projects/CreateProjectStep2.vue'),
    },
    {
      path: '/project/submitsuccess',
      name: 'SubmitSuccess',
      component: () => import('../views/projects/SubmitSuccess.vue'),
    },
    {
      path: '/project/publish/sku',
      name: 'PublishSku',
      component: () => import('../views/projects/PublishSku.vue'),
    },
    {
      path: '/project/publish/spu',
      name: 'PublishSpu',
      component: () => import('../views/projects/PublishSpu.vue'),
    },
    {
      path: '/project/addnft/success',
      name: 'AddNftSuccess',
      component: () => import('../views/projects/AddNftSuccess.vue'),
    },
  ],
});

export default router;
