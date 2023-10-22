import { rest, RestHandler } from 'msw';

const handlers: RestHandler[] = [
  // UP
  rest.post('/mine/nft/up', (req, res, ctx) => {
    const { tokenId, signature } = req.params;
    return res(
      ctx.json({
        success: true,
        data: 'up success',
      }),
    );
  }),
  // down
  rest.post('/mine/nft/down', (req, res, ctx) => {
    const { tokenId, signature } = req.params;
    return res(
      ctx.json({
        success: true,
        data: 'down success',
      }),
    );
  }),
  // 获取我提交的项目列表
  rest.get('/mine/submitted/list', (req, res, ctx) => {
    const { account, pageNumber, pageSize } = req.params;
    return res(
      ctx.json({
        success: true,
        data: {
          total: 1000,
          currentPage: 1,
          rows: [
            {
              projectId: 423423234234,
              avatar:
                'https://dashboard-assets.dappradar.com/document/8430/farmersworld-dapp-games-wax-logo-166x166_52d0d3b38e00b215ecd58e8a2c1eb4c0.png',
              cover:
                'https://dashboard-assets.dappradar.com/document/8430/farmersworld-dapp-games-wax-logo-166x166_52d0d3b38e00b215ecd58e8a2c1eb4c0.png',
              name: 'Farmers World',
              briefIntro: 'sklfjslfj',
              businessContracts: [
                '0x2cDc5Aa88Ee23c9E1A30a0E121e0f88Fd7c860c8',
                '0x2cDc5Aa88Ee23c9E1A30a0E121e0f88Fd7c860c8',
              ],
            },
          ],
        },
      }),
    );
  }),
  // 点击某个具体的Project，列出该project下所有商业合约
  rest.get('/mine/project/bussiness/list', (req, res, ctx) => {
    const { projectId } = req.params;
    return res(
      ctx.json({
        success: true,
        data: {
          rows: [
            {
              businessContractAddress: '0x2cDc5Aa88Ee23c9E1A30a0E121e0f88Fd7c860c8',
              contractName: 'lksadjflsdf',
              briefIntro: 'kjsflsdfj',
              sharePercentage: 10,
              rights: 1000,
              righted: 10,
              balance: 203497823048,
            },
          ],
        },
      }),
    );
  }),

  // 点击某个具体的商业合约，列出所有的NFT合约列表
  rest.get('/mine/bussiness/nftcontract/list', (req, res, ctx) => {
    const { businessContractAddress } = req.params;
    return res(
      ctx.json({
        success: true,
        data: {
          rows: [
            {
              nftAddress: '0x2cDc5Aa88Ee23c9E1A30a0E121e0f88Fd7c860c8',
              nftType: 1,
              avatar: '', // NFT 图片地址
            },
            {
              nftAddress: '0x2cDc5Aa88Ee23c9E1A30a0E121e0f88Fd7c860c8',
              nftType: 2,
              avatar: '',
            },
          ],
        },
      }),
    );
  }),

  // 获取某个NFT下所有的token列表
  rest.get('/mine/nftcontract/token/list', (req, res, ctx) => {
    // 返回除了当前tokenId以外的其他NFT列表
    const { nftAddress } = req.params;
    return res(
      ctx.json({
        success: true,
        data: {
          rows: [
            {
              nftName: '',
              nftIntro: '',
              price: '',
              tokenId: 938423,
              nftAddress: '0x2cDc5Aa88Ee23c9E1A30a0E121e0f88Fd7c860c8',
              hasSold: false,
            },
          ],
        },
      }),
    );
  }),

  // 获取NFT 详情
  rest.get('/mine/nft/detail', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          nftAddress: 'slkdjflsdf',
          briefIntro: 'sdjflsdkfjsdf',
          price: 234234,
          payToken: 'sldkjflsdfj',
          description: 'sdkjflsdkfjl',
        },
      }),
    );
  }),
  // 获取我参与的商业合约列表
  rest.get('/mine/participat/list', (req, res, ctx) => {
    const { account, pageNumber, pageSize } = req.params;
    return res(
      ctx.json({
        success: true,
        data: {
          rows: [
            {
              projectId: 2342324,
              avatar:
                'https://i.seadn.io/gcs/files/3dcbe2fcdb0cb1d36700f4bf38fdbb47.jpg?auto=format&dpr=1&w=384',
              projectName: 'sklflsdfsdfsdkf',
              briefIntro: 'skljdflsdkfjsdf',
            },
          ],
          currentPage: 2,
          total: 1000, // 总条目数
        },
      }),
    );
  }),
  // 获取我参与的项目下的商业合约列表
  rest.get('/mine/business/list', (req, res, ctx) => {
    const { account, projectId } = req.params;
    return res(
      ctx.json({
        success: true,
        data: {
          rows: [
            {
              contractName: 'sdfsdafasf',
              briefIntro: 'sfdsdfsdfsdf',
              balance: 23424234,
            },
          ],
        },
      }),
    );
  }),
  // 获取某个商业合约详情
  rest.get('/mine/business/detail', (req, res, ctx) => {
    const { businessContractAddress } = req.params;
    return res(
      ctx.json({
        success: true,
        data: {
          contractName: 'lksjdflksdjf',
          briefIntro: 'sldfjsdlf',
          rights: 1999,
          righted: 50,
          payToken: 'lksdjfljsadfl',
          description: 'jskldfjlsdjfsdaf',
          rows: [
            {
              avatar: 'skldjflsdfjlsdf',
              nftAddress: 'lskjflsdfjsdklf',
              tokenId: 2390482304,
            },
          ],
        },
      }),
    );
  }),
];

export default handlers;

// project {
//   bussiness  -> V1 project {
//       NFT (minted/unminted)
//   }
// }
