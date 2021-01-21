import { getMasterChefContract, getStaked } from "../sushi/utils";
import { useCallback, useEffect, useState } from "react";

import BigNumber from "bignumber.js";
import useBlock from "./useBlock";
import useSushi from "./useSushi";
import { useWallet } from "use-wallet";

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0));
  const { account } = useWallet();
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
