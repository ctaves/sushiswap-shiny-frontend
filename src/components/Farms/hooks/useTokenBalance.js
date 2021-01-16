import { useCallback, useEffect, useState } from "react";
import BigNumber from "bignumber.js";

import { useActiveWeb3React } from "../../../services/exchange/hooks";
import { getBalance } from "../../../services/frontend/utils/erc20";
import useBlock from "./useBlock";

const useTokenBalance = (tokenAddress) => {
  const [balance, setBalance] = useState(new BigNumber(0));
  const { account } = useActiveWeb3React();
  const { ethereum } = window;
  const block = useBlock();

  const fetchBalance = useCallback(async () => {
    const balance = await getBalance(ethereum, tokenAddress, account);
    setBalance(new BigNumber(balance));
  }, [account, ethereum, tokenAddress]);

  useEffect(() => {
    if (account && ethereum) {
      fetchBalance();
    }
  }, [account, ethereum, setBalance, block, tokenAddress]);
  return balance;
};

export default useTokenBalance;
