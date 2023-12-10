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
    deployer: '0x67B64D54C5bf7E4CFBC17c25Dbd3D1B16c6A16C9',
  },
};

export const SelectTokenList = [
  {
    label: 'USDT',
    value: '0xB1f42b23C3eBf27b10cF89860fFB702c9e05c964',
  },
];

export const PayTokenMap: Record<Address, { symbol: string }> = SelectTokenList.reduce(
  (prev, item) => {
    prev[item.value] = {
      symbol: item.label,
    };
    return prev;
  },
  {},
);
