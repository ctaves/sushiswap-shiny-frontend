import { getEarned, getFarms, getMasterChefContract } from '../sushi/utils'
import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { provider } from 'web3-core'
import useBlock from './useBlock'
import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account } = useWallet()
  const sushi = useSushi()
  const farms = getFarms(sushi)
  const masterChefContract = getMasterChefContract(sushi)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(masterChefContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, masterChefContract, sushi])

  useEffect(() => {
    if (account && masterChefContract && sushi) {
      fetchAllBalances()
    }
  }, [account, block, masterChefContract, setBalance, sushi])

  return balances
}

export default useAllEarnings
