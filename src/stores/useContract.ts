import { getContract } from '@wagmi/core'
import ERC20_ABI from '@/abi/erc20.abi.json'
import { type addressType } from '@/types'

interface IFunction {
  [functionName: string]: (...args: any[]) => {
    functionName: string
    args: any[]
  }
}

// ERC20 Contract
export const ERC20Functions: IFunction = {
  balanceOf: (address: string) => {
    return {
      functionName: 'balance',
      args: [address]
    }
  }
}
export function makeERC20Contract(contractAddress: addressType) {
  return getContract({
    address: contractAddress,
    abi: ERC20_ABI
  })
}

// PortusRouter Contract
export const RouterFunctions: IFunction = {
  createProject: (
    name: string,
    symbol: string,
    rightsT: addressType,
    fundsT: addressType,
    chargeERC20: addressType,
    sharePercentage: string
  ) => {
    return {
      functionName: 'createProject',
      args: []
    }
  }
}
