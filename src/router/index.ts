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
      name: 'BusinessDetail',
      component: () => import('../views/v3/project/BusinessDetail.vue'),
    },
    {
      path: '/nft/:nftAddress',
      name: 'NftDetail',
      component: () => import('../views/v3/project/NftDetail.vue'),
    },
    {
      path: '/nft/:nftAddress/:tokenId',
      name: 'SkuList',
      component: () => import('../views/v3/project/SkuDetail.vue'),
    },
    {
      path: '/spu/:skuId',
      name: 'SpuList',
      component: () => import('../views/v3/project/Spu.vue'),
    },
    {
      path: '/mine/container',
      name: 'MineContainer',
      component: () => import('../views/mine/MineContainer.vue'),
      children: [
        {
          path: '/mine/submitted/:projectId?',
          name: 'Submitted',
          component: () => import('../views/mine/Submitted.vue'),
        },
        {
          path: '/mine/participated',
          name: 'Participated',
          component: () => import('../views/mine/Participated.vue'),
        },
        {
          path: '/mine/store',
          name: 'Store',
          component: () => import('../views/mine/Store.vue'),
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
        {
          path: '/mine/business/list',
          name: 'MyBusinessContractList',
          component: () => import('../views/mine/BusinessContractList.vue'),
        },
      ],
    },
    {
      path: '/project/create/step1/:projectId?',
      name: 'CreateProjectStep1',
      component: () => import('../views/projects/CreateProjectStep1.vue'),
    },
    {
      path: '/project/create/step2',
      name: 'CreateProjectStep2',
      component: () => import('../views/projects/CreateProjectStep2.vue'),
    },
    {
      path: '/project/submitsuccess/:projectId',
      name: 'SubmitSuccess',
      component: () => import('../components/SubmitSuccess.vue'),
    },
    {
      path: '/project/publish/sku/:projectId/:businessContractAddress',
      name: 'PublishSku',
      component: () => import('../views/projects/PublishSku.vue'),
    },
    {
      path: '/project/publish/spu/:projectId/:businessContractAddress',
      name: 'PublishSpu',
      component: () => import('../views/projects/PublishSpu.vue'),
    },
    {
      path: '/project/addnft/success',
      name: 'AddNftSuccess',
      component: () => import('../components/AddNftSuccess.vue'),
    },
    {
      path: '/project/mint/success',
      name: 'MintSuccess',
      component: () => import('../components/MintSuccess.vue'),
    },
  ],
});

export default router;
