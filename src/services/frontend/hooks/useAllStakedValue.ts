import {
  getFarms,
  getMasterChefContract,
  getTotalLPWethValue,
  getWethContract,
} from "../sushi/utils";
import { useCallback, useEffect, useState } from "react";

import BigNumber from "bignumber.js";
import { Contract } from "web3-eth-contract";
import { provider } from "web3-core";
import useBlock from "./useBlock";
import useSushi from "./useSushi";
import { useWallet } from "use-wallet";

export interface StakedValue {
  tokenAmount: BigNumber;
  wethAmount: BigNumber;
  totalWethValue: BigNumber;
  tokenPriceInWeth: BigNumber;
  poolWeight: BigNumber;
}

const useAllStakedValue = () => {
  const [balances, setBalance] = useState([] as Array<StakedValue>);
  const { account } = useWallet();
  const sushi = useSushi();
  const farms = getFarms(sushi);
  const masterChefContract = getMasterChefContract(sushi);
  const wethContact = getWethContract(sushi);
  const block = useBlock();

  const fetchAllStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      farms.map(
        ({
          pid,
          lpContract,
          tokenContract,
        }: {
          pid: number;
          lpContract: Contract;
          tokenContract: Contract;
        }) =>
          getTotalLPWethValue(
            masterChefContract,
            wethContact,
            lpContract,
            tokenContract,
            pid
          )
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
