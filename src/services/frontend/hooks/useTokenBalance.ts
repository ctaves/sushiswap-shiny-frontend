import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { getBalance } from '../utils/erc20'
import { provider } from 'web3-core'
import useBlock from './useBlock'
import { useWallet } from 'use-wallet'

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  } = useWallet()
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    if (account) {
      const balance = await getBalance(ethereum as provider, tokenAddress, account)
      setBalance(new BigNumber(balance))
    }
  }, [account, ethereum, tokenAddress])

  useEffect(() => {
    if (account && ethereum) {
      fetchBalance()
    }
  }, [account, ethereum, setBalance, block, tokenAddress])

  return balance
}

export default useTokenBalance
