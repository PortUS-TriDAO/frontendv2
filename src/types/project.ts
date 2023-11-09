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
  id: number;
  // bizId: number;
  contractName: string;
  sharePercentage: number;
  briefIntro: string;
  quantity: number;
  rightQuantity: number;
  rightMinted: number;
  contractAddress: Address;
}

export interface BusinessDetailData {
  retailId: number;
  contractName: string;
  briefIntro: string;
  sharePercentage: number;
  rightQuantity: number;
  rightMinted: number;
  payToken: Address;
  description: string;
  contractAddress: Address | undefined;
  // nft contract list
  // rows: NftContractData[];
  retailContracts: NftContractData[];
}

export enum NftType {
  SKU = 1,
  SPU = 2,
}

export interface NftContractData {
  nftAddress: Address;
  avatar: string;
  nftID: string;
  name: string;
  nftType: NftType;
  bizId: number;
  retailAddress: Address;
  id: number;
}

export interface SkuData {
  id: number;
  name: string;
  avatar: string;
  // isSalesEnd: boolean;
  briefIntro: string;
  description: string;
  //
  // deadline: number;
  // retailerAddress: Address;
  //
  ddl: number;
  isHide: number;
  payToken: Address;
  price: number;
  retailAddress: Address;
  seller: Address;
  signature: string;
  tokenId: number;
}

export interface SpuData {
  id: number;
  name: string;
  avatar: string;
  briefIntro: string;
  cover: string;
  ddl: number;
  description: string;
  image: string;
  isHide: number;
  nftQuantity: number;
  payToken: Address;
  price: number;
  retailAddress: Address;
  seller: Address;
  signature: string;
}

export interface RightData {
  id: number;
  projectId: number;
  bizId: number;
  kolAddress: string;
  rightId: number;
}

export interface PrimaryProjectInfo {
  avatar: string;
  chain: string;
  briefIntro: string;
  name: string;
  items: number; // 这里还不清楚是指什么的数量
  sharePercentage: number;
  projectAddress: string;
  projectId: number;
  bizId: number;
}
