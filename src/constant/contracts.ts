import type { Address } from '@/types';

export const ContractAddress = {
  1: {
    router: 'mainnet router',
    project: 'mainnet project',
  },
  80001: {
    router: '0xa256F8536d182f05b60074C36Ff0aDa6134e7197',
    bank: '0x776c6F361d7F13ad7969842A152c40fBE22AbD33',
    funds: '0xF90E849c1c48a49c5ECEAf16028aec030f72722D',
    rights: '0x34aC005A59cd4Ec5831e28Eb269AAB125b44789a',
    usdt: '0x99479872494dc582af1F7fBBE43Ea9CC6143d159',
    deployer: '0xaeAF44FA4F1b8533E5fe844D0C280dC5B8EfaD48',
    enumrate: '0x49d7cD10A99612d43ff9b155904cB2d333796E11',
    enumNft: '0x4f9b3024EbcFbac44cEA45e65f7292cFa3B570eD',
  },
  137: {
    router: '0x53A38cCd4B32Cd3dbcedc515f1171C5b3761A6e4',
    bank: '0x52efCCDb3478258aFe7D81Ded1e62482c5Cb39f9',
    funds: '0x160cce858B4e40cD71E3c38BcfB198A4f49e2Bc9',
    rights: '0x67391c17850389B4e924bBA240d5EDB3c4A23BbD',
    usdt: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    deployer: '0xae950Cb6dd6e033057F9844BD0B67c576c915A0C',
    enumrate: '0x49d7cD10A99612d43ff9b155904cB2d333796E11',
    enumNft: '0x4f9b3024EbcFbac44cEA45e65f7292cFa3B570eD',
  },
};

// 'polygon' = {
//   router: '0x8D55a9dE0A7A07ab88828dC4Ec7eF27ff7ea4CB3',
//   bank: '0xA6AebFeB0A67Dd339851e39BF0D6D64e7A858981',
//   feeManager: '0x8bDC4add043feC87bbB359a10027E35f4c546949',
//   templateManager: '0x2AD2B7d78626F51b95ac02D3f0610648B3BB5a3E',
//   fundsTemplate: '0x160cce858B4e40cD71E3c38BcfB198A4f49e2Bc9',
//   simpleRightsTemplate: '0x3D7C58d29251786f5808ef6659E0805d7D5524ac',
//   whitelistRightsTemplate: '0x67391c17850389B4e924bBA240d5EDB3c4A23BbD',
//   retailerDeployer: '0xae950Cb6dd6e033057F9844BD0B67c576c915A0C',
// };

const isProd = ['www.portus.world', 'portus.world'].includes(window.location.host);

export const SelectTokenList = isProd
  ? [
      {
        label: 'USDT',
        value: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      },
    ]
  : [
      {
        label: 'USDT',
        value: '0xB1f42b23C3eBf27b10cF89860fFB702c9e05c964',
      },
    ];

export interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
}
export const TokenList: { [chainId: number]: Token[] } = {
  80001: [
    {
      symbol: 'USDT',
      name: 'Mock USD',
      address: '0xB1f42b23C3eBf27b10cF89860fFB702c9e05c964',
      decimals: 18,
    },
  ],
  137: [
    {
      symbol: 'USDT',
      name: 'Tether USD',
      address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      decimals: 6,
    },
  ],
};

export const PayTokenMap: Record<Address, { symbol: string }> = SelectTokenList.reduce(
  (prev, item) => {
    prev[item.value] = {
      symbol: item.label,
    };
    return prev;
  },
  {},
);
