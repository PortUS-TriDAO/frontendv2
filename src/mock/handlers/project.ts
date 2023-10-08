import { rest, RestHandler } from 'msw';

const handlers: RestHandler[] = [
  // 获取商业合约列表
  rest.get('/project/all', (req, res, ctx) => {
    const { keyword } = req.params;
    return res(
      ctx.json({
        success: true,
        data: {
          total: 2000,
          currentPage: 5,
          rows: [
            {
              projectId: 24234523421,
              avatar:
                'https://dashboard-assets.dappradar.com/document/8430/farmersworld-dapp-games-wax-logo-166x166_52d0d3b38e00b215ecd58e8a2c1eb4c0.png',
              name: 'Farmers World',
              briefIntro:
                'Farmers World is the first farming game to function on the NFTs platformRead more',
            },
          ],
        },
      }),
    );
  }),

  // 获取项目详情
  rest.get('/project/detail', (req, res, ctx) => {
    const { projectId } = req.params;
    return res(
      ctx.json({
        success: true,
        data: {
          cover: 'https://dynamic-kvl-assets.dappradar.com/a831cd86241745cb81ce22a4b88b1095.png',
          avatar:
            'https://dashboard-assets.dappradar.com/document/8430/farmersworld-dapp-games-wax-logo-166x166_52d0d3b38e00b215ecd58e8a2c1eb4c0.png',
          projectName: 'Alen World',
          website: 'https://farmersworld.io/',
          briefIntro:
            'Farmers World is the first farming game to function on the NFTs platformRead more.',
          description:
            'Farmers World is the first farming game to function on the NFTs platform. Pick for yourself suitable tools, exploit various resourcesbuy land to build enormous farms, and enjoy the fascinating experiences of a farmer working in Farmers World’s Ecosystem.',
          rights: 1000,
          righted: 50,
          payToken: '0x2cDc5Aa88Ee23c9E1A30a0E121e0f88Fd7c860c8',
          minted: false,
          rows: [
            {
              // 商业合约列表数据
              contractName: '',
              sharePercentage: 20,
              briefIntro: '',
              quantity: 1000,
              rights: 50000,
              righted: 300,
            },
          ],
        },
      }),
    );
  }),
  // 查询商业合约详情
  rest.get('/project/business/detail', (req, res, ctx) => {
    const { businessContractAddress, chainId } = req.params;

    return res(
      ctx.json({
        success: true,
        data: {
          contractName: 'sjkflsjf',
          briefIntro: 'skjdfklsjflsd',
          rights: 5000,
          righted: 30,
          payToken: '0xkljsldfjlsdf',
          description: 'sajflsdkjflsdjfl',
          rows: [], // SKU/SPU 列表
        },
      }),
    );
  }),

  // TODO: 添加分页  NFT合约详情页面
  rest.get('/project/nft/list', (req, res, ctx) => {
    const { businessContractAddress } = req.params;
    return res(
      ctx.json({
        success: true,
        data: {
          rows: [
            // SKU 挂单列表
            {
              tokenId: 239402,
              name: 'kjlsfjsdf',
              avatar: 'skldfjlsdkfj',
            },
          ],
        },
      }),
    );
  }),

  // SKU 详情
  rest.get('/project/sku/detail', (req, res, ctx) => {
    const { tokenId } = req.params;
    return res(
      ctx.json({
        success: true,
        data: {
          nftName: 'klsjdfljsldf',
          avatar: 'sdjfklsdfjsdlf',
          price: 982347234,
          payToken: 'slkdjflsdfjsdl',
          isSalesEnd: false,
          briefIntro: 'jsdklfjsdlfjs',
          description: 'slkdfjlsdfjsdlfj',
        },
      }),
    );
  }),
  // SPU详情  @Notice：这里正常返回SPU能拿到的数据，找不到和哪个页面对应了
  rest.get('/project/spu/detail', (req, res, ctx) => {}),

  // mint成功以后像服务端上报数据
  rest.post('/project/mint', (req, res, ctx) => {
    const { projectId, creatorAddress } = req.params;
    return res(
      ctx.json({
        success: true,
        data: 'mint success',
      }),
    );
  }),

  // TODO： 添加签名
  // 创建项目第一步，提交基础信息
  rest.post('/project/create/step1', (req, res, ctx) => {
    const { projectName, briefIntro, website, description, avatar, cover, creatorAddress } =
      req.params;
    return res(
      ctx.json({
        success: true,
        data: {
          projectId: 23487029384,
        },
      }),
    );
  }),

  // 创建项目第二步，提交商业合约相关信息
  rest.post('/project/create/step2', (req, res, ctx) => {
    const {
      projectId,
      contractName,
      sharePercentage,
      briefIntro,
      payToken,
      description,
      rightQuantity,
      businessContractAddress,
    } = req.params;

    return res(
      ctx.json({
        success: true,
        data: 'save project info success',
      }),
    );
  }),
  // 对应NFT adderss NFT type 页面。创建NFT售卖合约成功以后通知后端合约地址
  rest.post('/project/contract/deploy', (req, res, ctx) => {
    const { nftAddress, nftType, contractAddress } = req.params;

    return res(
      ctx.json({
        success: true,
        data: 'contract deploy success',
      }),
    );
  }),

  // 上架SKU
  rest.post('/sku/publish', (req, res, ctx) => {
    // nftType: 1: mined 2: unmint
    const {
      projectId,
      nftAddress,
      nftType,
      tokenId,
      price,
      ddl,
      seller, // 卖家账号
      payToken,
      signature,
    } = req.params;

    return res(
      ctx.json({
        success: true,
        data: 'publish success',
      }),
    );
  }),

  // 上架SPU
  rest.post('/spu/publish', (req, res, ctx) => {
    // nftType: 1: mined 2: unmint
    const {
      projectId,
      nftName,
      nftAddress,
      nftType,
      price,
      ddl,
      seller,
      payToken,
      briefIntro,
      description,
      nftQuantity,
      avatar,
      image,
      cover,
      signature,
    } = req.params;
    return res(
      ctx.json({
        success: true,
        data: 'publish success',
      }),
    );
  }),

  // project详情页里请求的SKU/SPU列表，包含SKU和SPU
  rest.get('/project/skulist', (req, res, ctx) => {
    // 如果传了tokenId，把有tokenId的排除掉。没传则查询全部
    const { projectId, tokenId } = req.params;
    return res(
      ctx.json({
        success: true,
        data: {
          rows: [
            {
              tokenId: 1,
              nftType: 1, // 1 表示SKU  2 表示SPU
              name: 'sphpp',
              icon: 'https://i.seadn.io/gcs/files/3dcbe2fcdb0cb1d36700f4bf38fdbb47.jpg?auto=format&dpr=1&w=136&h=136&fr=1',
            },
            {
              tokenId: 2,
              nftType: 1,
              name: 'sphpp',
              icon: 'https://i.seadn.io/gcs/files/3dcbe2fcdb0cb1d36700f4bf38fdbb47.jpg?auto=format&dpr=1&w=136&h=136&fr=1',
            },
          ],
        },
      }),
    );
  }),
];

export default handlers;
