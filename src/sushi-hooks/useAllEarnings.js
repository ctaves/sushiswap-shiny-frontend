import { useCallback, useEffect, useState } from "react";

import { useActiveWeb3React } from "../services/exchange/hooks";
import { useMasterChefContract } from "./useContract";
import useBlock from "./useBlock";

import sushiData from "@sushiswap/sushi-data";

const useAllEarnings = () => {
  const [balances, setBalance] = useState([]);

  const { account } = useActiveWeb3React();
  const masterChefContract = useMasterChefContract();
  const block = useBlock();

  console.log("masterchef:", masterChefContract.functions);

  const fetchAllBalances = useCallback(async () => {
    const getEarned = async (masterChefContract, pid, account) => {
      return masterChefContract.functions.pendingSushi(pid, account);
    };
    const farms = await sushiData.masterchef.pools();
    const balances = await Promise.all(farms.map(({ id }) => getEarned(masterChefContract, id, account)));
    console.log("m_balances:", balances[0].toNumber());
    //const balances = await Promise.all(farms.map(({ pid }) => getEarned(masterChefContract, pid, account)));
    setBalance(balances);
  }, [account, masterChefContract]);

  useEffect(() => {
    if (account && masterChefContract) {
      fetchAllBalances();
    }
  }, [account, block, masterChefContract, setBalance]);
  return balances;
};

export default useAllEarnings;
