import { rest, RestHandler } from 'msw';

const handlers: RestHandler[] = [
  // 获取商业合约列表
  rest.get('/project/all', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          total: 2000,
          currentPage: 5,
          rows: [
            {
              id: 24234523421,
              icon: 'https://dashboard-assets.dappradar.com/document/8430/farmersworld-dapp-games-wax-logo-166x166_52d0d3b38e00b215ecd58e8a2c1eb4c0.png',
              name: 'Farmers World',
              briefIntro:
                'Farmers World is the first farming game to function on the NFTs platformRead more',
              minted: false,
              projectAddress: '0x2cDc5Aa88Ee23c9E1A30a0E121e0f88Fd7c860c8',
            },
            {
              id: 24234523422,
              icon: 'https://dashboard-assets.dappradar.com/document/3803/splinterlands-dapp-games-hive-logo-166x166_f0d0aff6d57ee5a24c2c49fd048ec2d2.png',
              name: 'Splinterlands',
              briefIntro: 'Splinterlands is a collectible trading card game',
              minted: true,
              projectAddress: '0x2cDc5Aa88Ee23c9E1A30a0E121e0f88Fd7c860c8',
            },
            {
              id: 24234523423,
              icon: 'https://dashboard-assets.dappradar.com/document/37718/untitledplatformer-dapp-games-37718-logo-166x166_c1126decd78b35a6a16c345c01904d47.png',
              name: 'Untitled Platformer',
              briefIntro: 'Untitled Platformer',
              minted: false,
              projectAddress: '0x2cDc5Aa88Ee23c9E1A30a0E121e0f88Fd7c860c8',
            },
            {
              id: 24234523424,
              icon: 'https://dashboard-assets.dappradar.com/document/8430/farmersworld-dapp-games-wax-logo-166x166_52d0d3b38e00b215ecd58e8a2c1eb4c0.png',
              name: 'Farmers World',
              briefIntro:
                'Farmers World is the first farming game to function on the NFTs platformRead more',
              minted: false,
              projectAddress: '0x2cDc5Aa88Ee23c9E1A30a0E121e0f88Fd7c860c8',
            },
            {
              id: 24234523425,
              icon: 'https://dashboard-assets.dappradar.com/document/8430/farmersworld-dapp-games-wax-logo-166x166_52d0d3b38e00b215ecd58e8a2c1eb4c0.png',
              name: 'Farmers World',
              briefIntro:
                'Farmers World is the first farming game to function on the NFTs platformRead more',
              minted: false,
              projectAddress: '0x2cDc5Aa88Ee23c9E1A30a0E121e0f88Fd7c860c8',
            },
            {
              id: 24234523426,
              icon: 'https://dashboard-assets.dappradar.com/document/8430/farmersworld-dapp-games-wax-logo-166x166_52d0d3b38e00b215ecd58e8a2c1eb4c0.png',
              name: 'Farmers World',
              briefIntro:
                'Farmers World is the first farming game to function on the NFTs platformRead more',
              minted: false,
              projectAddress: '0x2cDc5Aa88Ee23c9E1A30a0E121e0f88Fd7c860c8',
            },
            {
              id: 24234523427,
              icon: 'https://dashboard-assets.dappradar.com/document/8430/farmersworld-dapp-games-wax-logo-166x166_52d0d3b38e00b215ecd58e8a2c1eb4c0.png',
              name: 'Farmers World',
              briefIntro:
                'Farmers World is the first farming game to function on the NFTs platformRead more',
              minted: false,
              projectAddress: '0x2cDc5Aa88Ee23c9E1A30a0E121e0f88Fd7c860c8',
            },
          ],
        },
      }),
    );
  }),

  // 获取项目详情
  rest.get('/project/detail', (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.json({
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
            'https://dashboard-assets.dappradar.com/document/8430/farmersworld-dapp-games-wax-image1_0dde67f18f3585e4cd5f70386cc1df88.png',
          ],
        },
      }),
    );
  }),

  // mint成功以后像服务端上报数据
  rest.post('/project/mint', (req, res, ctx) => {
    const { projectId, account } = req.params;
    return res(
      ctx.json({
        success: true,
        data: 'mint success',
      }),
    );
  }),

  // 创建项目
  rest.post('/project/create', (req, res, ctx) => {
    const {
      name,
      icon,
      briefIntro,
      website,
      description,
      banner,
      token,
      symbol,
      sharePercentage,
      projectAddress,
      creatorAddress,
      nftType, // 新增字段 1： 已经Mint的NFT  2： 还未mint的NFT
    } = req.params;
    return res(
      ctx.json({
        success: true,
        data: 'project create success',
      }),
    );
  }),

  // 这个接口的list里包含SKU和SPU
  rest.get('/project/skulist', (req, res, ctx) => {
    // project id
    const { id } = req.params;
    return res(
      ctx.json({
        success: true,
        data: [
          {
            tokenId: 1,
            type: 1, // 1 表示SKU  2 表示SPU
            name: 'sphpp',
            icon: 'https://i.seadn.io/gcs/files/3dcbe2fcdb0cb1d36700f4bf38fdbb47.jpg?auto=format&dpr=1&w=136&h=136&fr=1',
          },
          {
            tokenId: 2,
            type: 1,
            name: 'sphpp',
            icon: 'https://i.seadn.io/gcs/files/3dcbe2fcdb0cb1d36700f4bf38fdbb47.jpg?auto=format&dpr=1&w=136&h=136&fr=1',
          },
          {
            tokenId: 3,
            type: 1,
            name: 'sphpp',
            icon: 'https://i.seadn.io/gcs/files/3dcbe2fcdb0cb1d36700f4bf38fdbb47.jpg?auto=format&dpr=1&w=136&h=136&fr=1',
          },
          {
            tokenId: 4,
            type: 1,
            name: 'sphpp',
            icon: 'https://i.seadn.io/gcs/files/3dcbe2fcdb0cb1d36700f4bf38fdbb47.jpg?auto=format&dpr=1&w=136&h=136&fr=1',
          },
        ],
      }),
    );
  }),

  // 点击某个具体的SKU / SPU
  rest.get('/sku/detail', (req, res, ctx) => {
    // SKU ID
    const { tokenId } = req.params;
    return res(
      ctx.json({
        success: true,
        data: {
          id: 1,
          icon: 'https://i.seadn.io/gcs/files/3dcbe2fcdb0cb1d36700f4bf38fdbb47.jpg?auto=format&dpr=1&w=136&h=136&fr=1',
          name: 'SPHPP',
          website: 'https://www.baidu.com',
          serialNumber: 10001,
          views: 200,
          favorites: 300,
          price: 0.23,
          creatorAddress: '0xksjflsjflsdfjsd',
          payToken: '0xkjslfjsdlfj', // USDT address
          briefIntro: '简介',
          description: 'SKU 介绍',
          totalMinted: 56, // Mint该商业合约的KOL人数
          totalPerfit: 28347239472394, // 该商业合约累计KOL收益
        },
      }),
    );
  }),

  // 上架SKU
  rest.post('/sku/publish', (req, res, ctx) => {
    const { projectId, tokenId, price, ddl, seller, payToken, signature } = req.params;

    return res(
      ctx.json({
        success: true,
        data: 'publish success',
      }),
    );
  }),

  // 上架SPU
  rest.post('/spu/publish', (req, res, ctx) => {
    const { name, price, description, ddl, intro, seller, payToken, icon, banner, signature } =
      req.params;
    return res(
      ctx.json({
        success: true,
        data: 'publish success',
      }),
    );
  }),
];

export default handlers;
