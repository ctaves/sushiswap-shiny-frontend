import { approve, getMasterChefContract } from "../sushi/utils";

import { Contract } from "web3-eth-contract";
import { provider } from "web3-core";
import { useCallback } from "react";
import useSushi from "./useSushi";
import { useWallet } from "use-wallet";

const useApprove = (lpContract: Contract) => {
  const { account } = useWallet();
  const sushi = useSushi();
  const masterChefContract = getMasterChefContract(sushi);

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account);
      return tx;
    } catch (e) {
      console.log(e);
      return false;
    }
  }, [account, lpContract, masterChefContract]);

  return { onApprove: handleApprove };
};

export default useApprove;
