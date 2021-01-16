import { useCallback } from "react";

import { useActiveWeb3React } from "../../../services/exchange/hooks";

import useSushi from "../../../services/frontend/hooks/useSushi";
import { approve, getMasterChefContract } from "../../../services/frontend/sushi/utils";

const useApprove = (lpContract) => {
  const { account } = useActiveWeb3React();
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
