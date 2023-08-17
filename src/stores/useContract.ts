import { getContract } from '@wagmi/core'
import ERC20_ABI from '@/abi/erc20.abi.json'
import PROJECT_ABI from '@/abi/project.abi.json'
import ROUTER_ABI from '@/abi/router.abi.json'
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
      args: [name, symbol, rightsT, fundsT, chargeERC20, sharePercentage]
    }
  }
}

export function makeRouterContract(contractAddress: addressType) {
  return getContract({
    address: contractAddress,
    abi: ROUTER_ABI
  })
}

export const ProjectFunctions: IFunction = {
  charge: (erc20: addressType, amount: string, referralToken: number | string) => {
    return {
      functionName: 'charge',
      args: [erc20, amount, referralToken]
    }
  },
  // KOL mint 权益NFT
  referrerSign: () => {
    return {
      functionName: 'referrerSign',
      args: []
    }
  },
  // KOL Withdraw
  referrerWithdraw: (referralToken: string | number) => {
    return {
      functionName: 'referrerWithdraw',
      args: [referralToken]
    }
  }
}
export function makeProjectContract(contractAddress: addressType) {
  return getContract({
    address: contractAddress,
    abi: PROJECT_ABI
  })
}
