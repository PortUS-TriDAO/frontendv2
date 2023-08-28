import { getContract } from '@wagmi/core'
import ERC20_ABI from '@/abi/erc20.abi.json'
import PROJECT_ABI from '@/abi/project.abi.json'
import ROUTER_ABI from '@/abi/router.abi.json'
import type { Address } from '@/types'
import {
  getNetwork,
  getAccount,
  writeContract,
  type WriteContractResult,
  readContract
} from '@wagmi/core'
import { ContractAddress } from '@/constant/contracts'
import type { ContractInterface } from 'ethers'

interface IContractCall {
  address: Address
  abi: ContractInterface
  functionName: string
  args: any[]
}

export function getContracts() {
  const network = getNetwork()
  const chainId = network.chain.id
  const routerContract = {
    address: ContractAddress[chainId].router,
    abi: ROUTER_ABI
  }

  return { routerContract }
}

export function getRouterContractFunctions() {
  function createProject(
    name: string,
    symbol: string,
    chargeERC20: Address,
    sharePercentage: string
  ): Promise<WriteContractResult> {
    const network = getNetwork()
    const { rights, funds } = ContractAddress[network.chain.id]
    const { routerContract } = getContracts()
    return writeContract({
      ...routerContract,
      functionName: 'createProject',
      args: [name, symbol, rights, funds, chargeERC20, sharePercentage]
    })
  }

  async function getProjectAddress() {
    const { address } = getAccount()
    const { routerContract } = getContracts()
    const count = (await readContract({
      ...routerContract,
      functionName: 'getCountOfProjects',
      args: [address]
    })) as BigInt

    const length = count > 0n ? count - 1n : 0n
    const projectAddress = await readContract({
      ...routerContract,
      functionName: 'projectsOfCreator',
      args: [address, 0]
    })
    console.log({ projectAddress })
    return projectAddress
  }

  return { createProject, getProjectAddress }
}

export function getProjectContractFunctions() {
  async function referrerSign(projectAddress: Address) {
    const params: IContractCall = {
      address: projectAddress,
      abi: PROJECT_ABI,
      functionName: 'referrerSign',
      args: []
    }
    return writeContract(params)
  }

  return { referrerSign }
}
