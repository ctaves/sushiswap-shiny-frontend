import { useCallback, useEffect, useState } from "react";
import { useActiveWeb3React } from "../../../services/exchange/hooks";
import {
  getMasterChefContract,
  getWethContract,
  getFarms,
  getTotalLPWethValue,
} from "../../../services/frontend/sushi/utils";
import useSushi from "../../../services/frontend/hooks/useSushi";
import useBlock from "./useBlock";

const useAllStakedValue = () => {
  const [balances, setBalance] = useState([]);
  const { account } = useActiveWeb3React();
  const sushi = useSushi();
  const farms = getFarms(sushi);
  const masterChefContract = getMasterChefContract(sushi);
  const wethContact = getWethContract(sushi);
  const block = useBlock();
  const fetchAllStakedValue = useCallback(async () => {
    const balances = await Promise.all(
      farms.map(({ pid, lpContract, tokenContract }) =>
        getTotalLPWethValue(masterChefContract, wethContact, lpContract, tokenContract, pid)
      )
    );
    setBalance(balances);
  }, [account, masterChefContract, sushi]);
  useEffect(() => {
    if (account && masterChefContract && sushi) {
      fetchAllStakedValue();
    }
  }, [account, block, masterChefContract, setBalance, sushi]);
  return balances;
};
export default useAllStakedValue;
