import BN from 'bignumber.js';

export function toBN(n: number | string) {
  return new BN(n);
}
