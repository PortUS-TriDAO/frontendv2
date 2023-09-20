import { rest, RestHandler } from 'msw';

const handlers: RestHandler[] = [
  rest.get('/mine/distributions', (req, res, ctx) => {
    const { kolAddress } = req.params;
    return res(
      ctx.json({
        success: true,
        data: {
          totalPage: 100,
          currentPage: 1,
          rows: [
            {
              id: 238472394, // projectId
              icon: 'https://dashboard-assets.dappradar.com/document/8430/farmersworld-dapp-games-wax-logo-166x166_52d0d3b38e00b215ecd58e8a2c1eb4c0.png',
              name: 'Farmers World',
              website: 'http://34.238.85.169/',
              amount: '237482394',
              projectAddress: '0x2cDc5Aa88Ee23c9E1A30a0E121e0f88Fd7c860c8',
            },
          ],
        },
      }),
    );
  }),
  rest.get('/mine/games', (req, res, ctx) => {
    const { creatorAddress } = req.params;
    return res(
      ctx.json({
        success: true,
        data: {
          total: 100,
          currentPage: 1,
          rows: [
            {
              id: 238472394, // projectId
              icon: 'https://dashboard-assets.dappradar.com/document/8430/farmersworld-dapp-games-wax-logo-166x166_52d0d3b38e00b215ecd58e8a2c1eb4c0.png',
              name: 'Farmers World',
              website: 'http://34.238.85.169/',
              amount: '10000',
              projectAddress: '0x2cDc5Aa88Ee23c9E1A30a0E121e0f88Fd7c860c8',
            },
          ],
        },
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
  rest.get('/mine/business/detial', (req, res, ctx) => {
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
