import type { Address } from './base';

/**
 * 项目列表行数据
 */
export interface ProjectData {
  projectId: number;
  id: number;
  avatar: string;
  name: string;
  projectName: string;
  briefIntro: string;
}

/**
 * 项目详情
 */
export interface ProjectDetailData {
  createdAt: number;
  creatorAddress: string;
  cover: string;
  avatar: string;
  projectName: string;
  website: string;
  twitter: string;
  discord: string;
  instagram: string;
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
  whitelistCount: number;
  airdropCount: number;
  contractAddress: Address;
  payToken: Address;
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
  contractAddress: Address | undefined; // business contract address
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
  nftName: string;
  avatar: string;
  imgUrl: string;
  briefIntro: string;
  description: string;
  ddl: number;
  isHide: number;
  isSold: number;
  payToken: Address;
  price: number;
  retailAddress: Address;
  seller: Address;
  signature: string;
  tokenId: number;
  nftAddress: string;
  sellAmount: number;
  //
  bizId: number;
  retailId: number;
}

export interface SpuData extends SkuData {
  nftQuantity: number;
  cover: string;
}

export interface SkuSpuData extends SpuData {
  isSku: boolean;
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

export interface TicketInfo {
  id: number;
  owner: string;
  ticketStatus: number;
  ticketToken: string;
  imgUrl?: string;
  nftName: string;
  payToken: string;
  price: number;
  contractAddress: string;
  tokenId: number;
  nftType: number;
  briefIntro: string;
}
