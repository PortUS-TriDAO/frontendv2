import BigNumber from 'bignumber.js'
import { BigNumber as BN } from 'ethers'

export type addressType = `0x${string}`
export type BigNumberLike = BigNumber | BN | number | string | BigInt
