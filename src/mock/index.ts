import Mock from 'mockjs'

// games 列表页列表查询接口 （注意增加查询搜索接口和翻页功能）
Mock.mock('/game/queryAllGames', 'post', {
  resCode: 200,
  resMsg: 'SUCCESS',
  data: {
    total: 23,
    page: 0,
    pageSize: 10,
    list: [
      {
        id: '6652d5a81ced4d56a2ec52d2264e7f93',
        name: 'sfdf',
        img: 'http://g.portus.games/image/5081020230814.jpg',
        icon: '',
        imgList: '["http://g.portus.games/image/7047120230814.jpg"]',
        type: null,
        creator: 'ghkjkjg',
        address: 'hgfhh',
        baseInfo: 'fghgg',
        detail: 'fhfh',
        remark: '',
        webRequest: '["风格","干活","","","","10"]',
        chainAddress: '0x470242e8701687f1a2f49eee531f3fe7d398660a1ae59ec2a0a8d184adc79fb5',
        gameAddress: '0x476C82681D1fCbC8bcbA31945767487617DaDdB9',
        instanceAddress: '0x48b702257F93643625CD661077b5212F96018765',
        contractAddress: '0x66D72D0795d42789eBbf34D271E6C212e3dBbA45',
        walletAddress: '0x85adfe3f629f698755c5e46fbf1d59aeeaf08068',
        creationTime: '2023-08-14 10:46:26',
        updateTime: '2023-08-16 17:51:18',
        abiJSON: 'http://g.portus.games/image/8266220230720.json',
        abiTemplateJSON: 'http://g.portus.games/image/1107820230807.json',
        status: 0
      },
      {
        id: 'c83dad3c6c294d98b5722caac28291b2',
        name: 'Salvo',
        img: 'http://g.portus.games/image/3320820230810.jpg',
        icon: '',
        imgList: '[]',
        type: null,
        creator: 'test',
        address: 'http://8.217.91.191:8080/',
        baseInfo: 'Salvo test',
        detail: 'Salvo',
        remark: 'fsfsf',
        webRequest: null,
        chainAddress: null,
        gameAddress: '0xa7327F4A6540AEfa4d5ec2F6d4Fb4E33D529235d',
        instanceAddress: '0x59C75f21E5E769374E02f2be648F33A67b59C1eF',
        contractAddress: '0x66D72D0795d42789eBbf34D271E6C212e3dBbA45',
        walletAddress: '0x215c2a7ad55ff2893cded6265782ed224e2873b5',
        creationTime: '2023-08-10 18:59:25',
        updateTime: '2023-08-10 21:49:08',
        abiJSON: 'http://g.portus.games/image/8266220230720.json',
        abiTemplateJSON: 'http://g.portus.games/image/1107820230807.json',
        status: 0
      }
    ]
  }
})

Mock.mock('/game/queryMyGames', 'post', {
  resCode: 200,
  resMsg: 'SUCCESS',
  data: {
    total: 0,
    page: 0,
    pageSize: 10,
    list: []
  }
})

Mock.mock('/distributionGame/getMyDistributionGame', 'post', {
  resCode: 200,
  resMsg: 'SUCCESS',
  data: [
    {
      id: '56767ef780b4473fbd25cbf573a6433d',
      name: '荣荣东方'
    }
  ]
})

Mock.mock('/task/taskQuery', 'post', {
  resCode: 200,
  resMsg: 'SUCCESS',
  data: {
    total: 1,
    page: 0,
    pageSize: 10,
    list: [
      {
        id: '9db0e44d0d614091ba968a9ee86c8393',
        name: 'Mint q',
        type: '2',
        chainAddress: '0x32Ff875a54b428C4e64185F3Efc5944E87AcD6cD',
        hashAddress: '0x2c01366df88cab7363985056d0fbd1284d5a2d3dc62d0b4690e138fed42aa983',
        block: '0x024f10ad',
        remark: 'Deployed',
        creationTime: '2023-08-07 21:04:07'
      }
    ]
  }
})
