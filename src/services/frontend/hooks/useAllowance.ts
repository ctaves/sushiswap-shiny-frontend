import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'
import { getAllowance } from '../utils/erc20'
import { getMasterChefContract } from '../sushi/utils'
import { provider } from 'web3-core'
import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

const useAllowance = (lpContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account } = useWallet()
  const sushi = useSushi()
  const masterChefContract = getMasterChefContract(sushi)

  const fetchAllowance = useCallback(async () => {
    if (account) {
      const allowance = await getAllowance(
        lpContract,
        account,
        masterChefContract.options.address,
      )
      setAllowance(new BigNumber(allowance))
    }

  }, [account, masterChefContract, lpContract])

  useEffect(() => {
    if (account && masterChefContract && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, masterChefContract, lpContract])

  return allowance
}

export default useAllowance
