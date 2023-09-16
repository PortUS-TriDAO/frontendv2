import { rest, RestHandler } from 'msw'

const handlers: RestHandler[] = [
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
    )
  }),

  rest.post('/project/create', (req: any, res, ctx) => {
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
      creatorAddress
    } = req.body
    return res(
      ctx.json({
        success: true,
        data: 'project create success'
      })
    )
  })
]

export default handlers
