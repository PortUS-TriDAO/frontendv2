import { rest, RestHandler } from 'msw';

const handlers: RestHandler[] = [
  // 获取商业合约列表
  rest.get('/project/all', (req, res, ctx) => {
    return res(
      ctx.json({
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

  // Mine页面 两个收益统计
  rest.get('/mine/profits', (req, res, ctx) => {
    // 当前登录KOL的地址
    const { address } = req.params;
    return res(
      ctx.json({
        success: true,
        data: {
          publishedIncome: 4234234, // 创建项目总收益
          participatedIncome: 255345345, // 参与项目总收益
        },
      }),
    );
  }),

  // 获取我提交的商业合约列表
  rest.get('/mine/submited', (req, res, ctx) => {
    const { address } = req.params;
    return res(
      ctx.json({
        success: true,
        data: {
          rows: [
            {
              tokenId: '23940234',
              name: 'ItemName',
              icon: 'https://i.seadn.io/gcs/files/3dcbe2fcdb0cb1d36700f4bf38fdbb47.jpg?auto=format&dpr=1&w=384',
              contractAddress: '0xkllksdhfjosdf',
              createTime: '823904802349',
            },
            {
              tokenId: '23940234',
              name: 'ItemName',
              icon: 'https://i.seadn.io/gcs/files/3dcbe2fcdb0cb1d36700f4bf38fdbb47.jpg?auto=format&dpr=1&w=384',
              contractAddress: '0xkllksdhfjosdf',
              createTime: '823904802349',
            },
          ],
          currentPage: 2,
          total: 1000, // 总条目数
        },
      }),
    );
  }),

  // 获取我参与的商业合约列表
  rest.get('/mine/participat', (req, res, ctx) => {
    const { address } = req.params;
    return res(
      ctx.json({
        success: true,
        data: {
          rows: [
            {
              tokenId: '23940234',
              name: 'ItemName',
              icon: 'https://i.seadn.io/gcs/files/3dcbe2fcdb0cb1d36700f4bf38fdbb47.jpg?auto=format&dpr=1&w=384',
              contractAddress: '0xkllksdhfjosdf',
              createTime: '823904802349',
            },
            {
              tokenId: '23940234',
              name: 'ItemName',
              icon: 'https://i.seadn.io/gcs/files/3dcbe2fcdb0cb1d36700f4bf38fdbb47.jpg?auto=format&dpr=1&w=384',
              contractAddress: '0xkllksdhfjosdf',
              createTime: '823904802349',
            },
          ],
          currentPage: 2,
          total: 1000, // 总条目数
        },
      }),
    );
  }),

  // 获取我参与的/创建的商业合约详情
  rest.get('/mine/commercial/detial', (req, res, ctx) => {
    const { address, tokenId } = req.params;
    return res(
      ctx.json({
        success: true,
        data: {
          tokenId,
          icon: 'https://i.seadn.io/gcs/files/3dcbe2fcdb0cb1d36700f4bf38fdbb47.jpg?auto=format&dpr=1&w=384',
          income: 2938482304,
          rights: [
            {
              name: 'ItemName',
              icon: 'https://i.seadn.io/gcs/files/3dcbe2fcdb0cb1d36700f4bf38fdbb47.jpg?auto=format&dpr=1&w=384',
              isSold: true,
            },
          ],
        },
      }),
    );
  }),
];

export default handlers;
