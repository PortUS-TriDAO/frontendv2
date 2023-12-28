import BN from 'bignumber.js';
import BigNumber from 'bignumber.js';

export type BigNumberLike = number | string | BigNumber;

export function toBN(n: BigNumberLike) {
  return new BN(n);
}

const isProd = ['www.portus.world', 'portus.world'].includes(window.location.host);

export function extendsDecimals(num: BigNumberLike): BN {
  // TODO: 临时配置生产环境Decimals为6位，之后在订正为配置
  return toBN(num).multipliedBy(toBN(10).pow(isProd ? 6 : 18));
}
// export function extendsDecimals(num: BigNumberLike, decimals: number = 18): BN {
//   // TODO: 临时配置生产环境Decimals为6位，之后在订正为配置
//   return toBN(num).multipliedBy(toBN(10).pow(decimals));
// }
