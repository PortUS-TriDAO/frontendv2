import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/home/HomeView.vue';

const mimeProjectList = () => import('../views/mine/MineProjectList.vue');
const MineProjectDetail = () => import('../views/mine/MineProjectDetail.vue');
const MineBusinessDetail = () => import('../views/mine/MineBusinessDetail.vue');
const mimeMineNftDetail = () => import('../views/mine/MineNftDetail.vue');
const mimeMineSpuDetail = () => import('../views/mine/MineSpu.vue');
const MineSkuDetail = () => import('../views/mine/MineSkuDetail.vue');

const getMinePath = (scenes: 'submitted' | 'participated' | 'store') => {
  const capitalizedName = scenes.charAt(0).toUpperCase() + scenes.slice(1);
  return [
    {
      // MineTokenDetail
      path: `/mine/${scenes}/sku/:retailId/:skuId`,
      name: `Mine${capitalizedName}SkuDetail`,
      component: MineSkuDetail,
      meta: {
        scenes,
      },
    },
    {
      // MineSpuDetail
      path: `/mine/${scenes}/spu/:retailId/:spuId`,
      name: `Mine${capitalizedName}SpuDetail`,
      component: mimeMineSpuDetail,
      meta: {
        scenes,
      },
    },
    {
      // MineNftDetail
      path: `/mine/${scenes}/nftdetail/:id`,
      // path: `/mine/${scenes}/nftdetail/:nftAddress/:projectId/:businessContractAddress?`,
      name: `Mine${capitalizedName}NftDetail`,
      component: mimeMineNftDetail,
      meta: {
        scenes,
      },
    },
    {
      // MineBusinessDetail
      path: `/mime/${scenes}/:projectId/:businessId`,
      name: `Mine${capitalizedName}BusinessDetail`,
      component: MineBusinessDetail,
      meta: {
        scenes,
      },
    },
    {
      // MineProjectDetail
      path: `/mine/${scenes}/:projectId`,
      name: `Mine${capitalizedName}ProjectDetail`,
      component: MineProjectDetail,
      meta: {
        scenes,
      },
    },
    {
      // MineProjectList
      path: `/mine/${scenes}`,
      name: `Mine${capitalizedName}ProjectList`,
      component: mimeProjectList,
      meta: {
        scenes,
      },
    },
  ];
};

const mineChildren = [
  ...getMinePath('submitted'),
  ...getMinePath('participated'),
  ...getMinePath('store'),
];

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
      path: '/project/:projectId/:bizId',
      name: 'BusinessDetail',
      component: () => import('../views/v3/project/BusinessDetail.vue'),
    },
    {
      path: '/nft/:retailId/:nftType',
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
      children: mineChildren,
    },
    {
      path: '/project/create/step1/:projectId?',
      name: 'CreateProjectStep1',
      component: () => import('../views/projects/CreateProjectStep1.vue'),
    },
    {
      path: '/project/create/step2/:projectId',
      name: 'CreateProjectStep2',
      component: () => import('../views/projects/CreateProjectStep2.vue'),
    },
    {
      path: '/project/submitsuccess/:projectId/:bizId',
      name: 'SubmitSuccess',
      component: () => import('../components/SubmitSuccess.vue'),
    },
    {
      path: '/project/publish/sku/:projectId/:bizId/:nftAddress/:retailAddress/:retailId',
      name: 'PublishSku',
      component: () => import('../views/projects/PublishSku.vue'),
    },
    {
      path: '/project/publish/spu/:projectId/:bizId/:nftAddress/:retailAddress/:retailId',
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
    // store
    {
      path: '/store/:storeId/projects',
      name: 'StoreProjectList',
      component: () => import('../views/store/ProjectList.vue'),
    },
    {
      path: '/store/:storeId/project/:projectId',
      name: 'StoreProjectDetail',
      component: () => import('../views/store/ProjectDetail.vue'),
    },
    {
      path: '/store/:storeId/project/:projectId/:businessId',
      name: 'StoreBusinessDetail',
      component: () => import('../views/store/BusinessDetail.vue'),
    },
    {
      path: '/store/:storeId/nft/:nftAddress',
      name: 'StoreNftDetail',
      component: () => import('../views/store/NftDetail.vue'),
    },
    {
      path: '/store/:storeId/nft/:nftAddress/:tokenId',
      name: 'StoreSkuList',
      component: () => import('../views/store/SkuDetail.vue'),
    },
    // {
    //   path: '/spu/:skuId',
    //   name: 'StoreSpuList',
    //   component: () => import('../views/store/Spu.vue'),
    // },
  ],
});

export default router;
