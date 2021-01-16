import { useCallback } from "react";

import { useActiveWeb3React } from "../../../services/exchange/hooks";

import useSushi from "../../../services/frontend/hooks/useSushi";
import { unstake, getMasterChefContract } from "../../../services/frontend/sushi/utils";

const useUnstake = (pid) => {
  const { account } = useActiveWeb3React();
  const sushi = useSushi();
  const masterChefContract = getMasterChefContract(sushi);

  const handleUnstake = useCallback(
    async (amount) => {
      const txHash = await unstake(masterChefContract, pid, amount, account);
      console.log(txHash);
    },
    [account, pid, sushi]
  );

  return { onUnstake: handleUnstake };
};
export default useUnstake;
