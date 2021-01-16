import { useCallback } from "react";

import { useActiveWeb3React } from "../../../services/exchange/hooks";

import useSushi from "../../../services/frontend/hooks/useSushi";
import { stake, getMasterChefContract } from "../../../services/frontend/sushi/utils";

const useStake = (pid) => {
  const { account } = useActiveWeb3React();
  const sushi = useSushi();
  const handleStake = useCallback(
    async (amount) => {
      const txHash = await stake(getMasterChefContract(sushi), pid, amount, account);
      console.log(txHash);
    },
    [account, pid, sushi]
  );
  return { onStake: handleStake };
};
export default useStake;
