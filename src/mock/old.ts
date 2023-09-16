import Mock from 'mockjs'

// 创建项目
Mock.mock(
  '/project/create',
  'post',
  (params: {
    name: string
    icon: string
    briefIntro: string
    website: string
    description: string
    banner: string
    token: string
    symbol: string
    sharePercentage: number
    projectAddress: string // 新创建项目的合约地址
    creatorAddress: string
    screenShorts: [string]
  }) => {
    return {
      success: true,
      data: 'project create success'
    }
  }
)
// 查询所有项目列表 带分/搜索
Mock.mock('/project/all', 'get', {
  success: true,
  data: {
    totalPage: 20,
    currentPage: 5,
    rows: [
      {
        id: 24234523421,
        icon: 'https://dashboard-assets.dappradar.com/document/8430/farmersworld-dapp-games-wax-logo-166x166_52d0d3b38e00b215ecd58e8a2c1eb4c0.png',
        name: 'Farmers World',
        briefIntro:
          'Farmers World is the first farming game to function on the NFTs platformRead more',
        minted: false,
        projectAddress: '0x2cDc5Aa88Ee23c9E1A30a0E121e0f88Fd7c860c8'
      },
      {
        id: 24234523422,
        icon: 'https://dashboard-assets.dappradar.com/document/3803/splinterlands-dapp-games-hive-logo-166x166_f0d0aff6d57ee5a24c2c49fd048ec2d2.png',
        name: 'Splinterlands',
        briefIntro: 'Splinterlands is a collectible trading card game',
        minted: true,
        projectAddress: '0x2cDc5Aa88Ee23c9E1A30a0E121e0f88Fd7c860c8'
      },
      {
        id: 24234523423,
        icon: 'https://dashboard-assets.dappradar.com/document/37718/untitledplatformer-dapp-games-37718-logo-166x166_c1126decd78b35a6a16c345c01904d47.png',
        name: 'Untitled Platformer',
        briefIntro: 'Untitled Platformer',
        minted: false,
        projectAddress: '0x2cDc5Aa88Ee23c9E1A30a0E121e0f88Fd7c860c8'
      },
      {
        id: 24234523424,
        icon: 'https://dashboard-assets.dappradar.com/document/8430/farmersworld-dapp-games-wax-logo-166x166_52d0d3b38e00b215ecd58e8a2c1eb4c0.png',
        name: 'Farmers World',
        briefIntro:
          'Farmers World is the first farming game to function on the NFTs platformRead more',
        minted: false,
        projectAddress: '0x2cDc5Aa88Ee23c9E1A30a0E121e0f88Fd7c860c8'
      },
      {
        id: 24234523425,
        icon: 'https://dashboard-assets.dappradar.com/document/8430/farmersworld-dapp-games-wax-logo-166x166_52d0d3b38e00b215ecd58e8a2c1eb4c0.png',
        name: 'Farmers World',
        briefIntro:
          'Farmers World is the first farming game to function on the NFTs platformRead more',
        minted: false,
        projectAddress: '0x2cDc5Aa88Ee23c9E1A30a0E121e0f88Fd7c860c8'
      },
      {
        id: 24234523426,
        icon: 'https://dashboard-assets.dappradar.com/document/8430/farmersworld-dapp-games-wax-logo-166x166_52d0d3b38e00b215ecd58e8a2c1eb4c0.png',
        name: 'Farmers World',
        briefIntro:
          'Farmers World is the first farming game to function on the NFTs platformRead more',
        minted: false,
        projectAddress: '0x2cDc5Aa88Ee23c9E1A30a0E121e0f88Fd7c860c8'
      },
      {
        id: 24234523427,
        icon: 'https://dashboard-assets.dappradar.com/document/8430/farmersworld-dapp-games-wax-logo-166x166_52d0d3b38e00b215ecd58e8a2c1eb4c0.png',
        name: 'Farmers World',
        briefIntro:
          'Farmers World is the first farming game to function on the NFTs platformRead more',
        minted: false,
        projectAddress: '0x2cDc5Aa88Ee23c9E1A30a0E121e0f88Fd7c860c8'
      }
    ]
  }
})
// 查询项目详情
Mock.mock('/project/detail', 'get', (params: { id: string }) => {
  return {
    success: true,
    data: {
      banner: 'https://dynamic-kvl-assets.dappradar.com/a831cd86241745cb81ce22a4b88b1095.png',
      icon: 'https://dashboard-assets.dappradar.com/document/8430/farmersworld-dapp-games-wax-logo-166x166_52d0d3b38e00b215ecd58e8a2c1eb4c0.png',
      name: 'Alen World',
      website: 'https://farmersworld.io/',
      briefIntro:
        'Farmers World is the first farming game to function on the NFTs platformRead more.',
      description:
        'Farmers World is the first farming game to function on the NFTs platform. Pick for yourself suitable tools, exploit various resourcesbuy land to build enormous farms, and enjoy the fascinating experiences of a farmer working in Farmers World’s Ecosystem.',
      screenShots: [
        'https://dashboard-assets.dappradar.com/document/8430/farmersworld-dapp-games-wax-image1_0dde67f18f3585e4cd5f70386cc1df88.png',
        'https://dashboard-assets.dappradar.com/document/8430/farmersworld-dapp-games-wax-image2-500x315_ae97fa670d1af1c025ce23ad1fc12856.png',
        'https://dashboard-assets.dappradar.com/document/20005/hooked-dapp-other-bsc-image2-500x315_dd3a0ade17b2cc54e0a783b6ee7fa2b4.png',
        'https://dashboard-assets.dappradar.com/document/8430/farmersworld-dapp-games-wax-image1_0dde67f18f3585e4cd5f70386cc1df88.png'
      ]
    }
  }
})

// MyGames  account: 当前账号钱包地址
Mock.mock('/mine/games', 'get', {
  success: true,
  totalPage: 5,
  currentPage: 2,
  data: [
    {
      id: 238472394, // projectId
      icon: 'https://dashboard-assets.dappradar.com/document/8430/farmersworld-dapp-games-wax-logo-166x166_52d0d3b38e00b215ecd58e8a2c1eb4c0.png',
      name: 'Farmers World',
      website: 'http://34.238.85.169/',
      amount: '10000',
      projectAddress: '0x2cDc5Aa88Ee23c9E1A30a0E121e0f88Fd7c860c8'
    }
  ]
})

// MyDistribute  account: 当前账号钱包地址
Mock.mock('/mine/distributions', 'get', {
  success: true,
  totalPage: 5,
  currentPage: 2,
  data: [
    {
      id: 238472394, // projectId
      icon: 'https://dashboard-assets.dappradar.com/document/8430/farmersworld-dapp-games-wax-logo-166x166_52d0d3b38e00b215ecd58e8a2c1eb4c0.png',
      name: 'Farmers World',
      website: 'http://34.238.85.169/',
      amount: '237482394',
      projectAddress: '0x2cDc5Aa88Ee23c9E1A30a0E121e0f88Fd7c860c8'
    }
  ]
})

// mint 成功后上报数据，后面扫块服务做容错处理
Mock.mock('/project/mint', 'post', (params: { projectId: string; account: string }) => {
  return {
    success: true,
    data: 'mint success'
  }
})

Mock.mock('/user/generateReferCode', 'post', {
  success: true,
  data: {
    referCode: 'XqxuO9rMnj885x8RAJ4bQpV4'
  }
})

Mock.mock('/user/share/statistic', 'post', {
  success: true,
  data: {
    redirectUrl: 'http://34.238.85.169/'
  }
})
