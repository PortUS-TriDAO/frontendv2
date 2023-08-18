import { getContract } from '@wagmi/core'
import ERC20_ABI from '@/abi/erc20.abi.json'
import PROJECT_ABI from '@/abi/project.abi.json'
import ROUTER_ABI from '@/abi/router.abi.json'
import { type addressType } from '@/types'
import { getNetwork, writeContract, WriteContractResult } from '@wagmi/core'
import { ContractAddress } from '@/constant/contracts'

export function getContracts() {
  const network = getNetwork()
  const chainId = network.chain.id
  const routerContract = {
    address: ContractAddress[chainId].router,
    abi: ROUTER_ABI
  }

  const projectContract = {
    address: ContractAddress[chainId].project,
    abi: PROJECT_ABI
  }

  return { routerContract, projectContract }
}

export function getRouterContractFunctions() {
  function createProject(
    name: string,
    symbol: string,
    rightsT: addressType,
    fundsT: addressType,
    chargeERC20: addressType,
    sharePercentage: string
  ): Promise<WriteContractResult> {
    const { routerContract } = getContracts()
    return writeContract(
      Object.assign({}, routerContract, {
        functionName: 'createProject',
        args: [name, symbol, rightsT, fundsT, chargeERC20, sharePercentage]
      })
    )
  }

  return { createProject }
}

export function getProjectContractFunctions() {
  function referrerSign(): Promise<WriteContractResult> {
    const { projectContract } = getContracts()
    return writeContract(
      Object.assign({}, projectContract, {
        functionName: 'referrerSign',
        args: []
      })
    )
  }

  return { referrerSign }
}
