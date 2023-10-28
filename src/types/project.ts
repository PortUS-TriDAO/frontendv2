import type { Address } from './base';

/**
 * 项目列表行数据
 */
export interface ProjectData {
  projectId: number;
  avatar: string;
  name: string;
  briefIntro: string;
}

/**
 * 项目详情
 */
export interface ProjectDetailData {
  cover: string;
  avatar: string;
  projectName: string;
  website: string;
  /**
   * 介绍
   */
  briefIntro: string;
  /**
   * 详细描述
   */
  description: string;
  rights: number;
  righted: number;
  payToken: Address;
  projectAddress: Address;
  minted: boolean;
  rows: BusinessData[];
}

/**
 * 商业合约列表数据
 */
export interface BusinessData {
  businessId: number;
  contractName: string;
  sharePercentage: number;
  briefIntro: string;
  quantity: number;
  rights: number;
  righted: number;
}

export interface BusinessDetailData {
  contractName: string;
  briefIntro: string;
  sharePercentage: number;
  rights: number;
  righted: number;
  payToken: Address;
  description: string;
  // nft contract list
  rows: SkuData[];
}

export interface NftContractData {
  nftAddress: Address;
  avatar: string;
  nftID: string;
  nftName: string;
}

export interface SkuData {
  tokenId: number;
  nftName: string;
  avatar: string;
  price: number;
  payToken: Address;
  isSalesEnd: boolean;
  briefIntro: string;
  description: string;
}
