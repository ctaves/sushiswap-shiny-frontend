import { useCallback, useEffect, useState } from "react";
import { toChecksumAddress } from "web3-utils";
//import { useActiveWeb3React } from "../../../services/exchange/hooks";
import { getEarned, getMasterChefContract, getFarms } from "../../../services/frontend/sushi/utils";
import useSushi from "../../../services/frontend/hooks/useSushi";
import useBlock from "./useBlock";
//import useBlock from "../../../services/frontend/hooks/useBlock";
import sushiData from "@sushiswap/sushi-data";

const useAllEarnings = (account) => {
  const [balances, setBalance] = useState([]);
  //const { account } = useActiveWeb3React();
  account = toChecksumAddress(account);
  const sushi = useSushi();
  //const farms = getFarms(sushi);
  const masterChefContract = getMasterChefContract(sushi);
  const block = useBlock();
  const fetchAllBalances = useCallback(async () => {
    const farms = await sushiData.masterchef.pools();
    const balances = await Promise.all(farms.map(({ id }) => getEarned(masterChefContract, id, account)));
    //const balances = await Promise.all(farms.map(({ pid }) => getEarned(masterChefContract, pid, account)));
    setBalance(balances);
  }, [account, masterChefContract, sushi]);

  useEffect(() => {
    if (account && masterChefContract && sushi) {
      fetchAllBalances();
    }
  }, [account, block, masterChefContract, setBalance, sushi]);
  return balances;
};

export default useAllEarnings;
