import { useCallback, useEffect, useState } from "react";
import BigNumber from "bignumber.js";

import { useActiveWeb3React } from "../../../services/exchange/hooks";
import { getStaked, getMasterChefContract } from "../../../services/frontend/sushi/utils";

import useSushi from "../../../services/frontend/hooks/useSushi";
import useBlock from "./useBlock";

const useStakedBalance = (pid) => {
  const [balance, setBalance] = useState(new BigNumber(0));
  const { account } = useActiveWeb3React();
  const sushi = useSushi();

  const masterChefContract = getMasterChefContract(sushi);
  const block = useBlock();

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(masterChefContract, pid, account);
    setBalance(new BigNumber(balance));
  }, [account, pid, sushi]);

  useEffect(() => {
    if (account && sushi) {
      fetchBalance();
    }
  }, [account, pid, setBalance, block, sushi]);

  return balance;
};

export default useStakedBalance;
