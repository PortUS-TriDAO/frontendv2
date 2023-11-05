import BN from 'bignumber.js';
import BigNumber from 'bignumber.js';

export type BigNumberLike = number | string | BigNumber;

export function toBN(n: BigNumberLike) {
  return new BN(n);
}

export function extendsDecimals(num: BigNumberLike, decimals: number = 18): BN {
  return toBN(num).multipliedBy(toBN(10).pow(decimals));
}
