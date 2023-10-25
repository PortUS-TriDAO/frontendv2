import BigNumber from 'bignumber.js';
import { BigNumber as BN } from 'ethers';

export type Address = `0x${string}`;
export type BigNumberLike = BigNumber | BN | number | string | BigInt;

export * from './project';
export * from './response';
