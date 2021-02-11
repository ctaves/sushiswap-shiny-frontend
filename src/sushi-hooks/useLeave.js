import { useCallback } from "react";
import useSushi from "../../../services/frontend/hooks/useSushi";
import { useActiveWeb3React } from "../../../services/exchange/hooks";
import { leave, getXSushiStakingContract } from "../../../services/frontend/sushi/utils";

const useLeave = () => {
  const { account } = useActiveWeb3React();
  const sushi = useSushi();
  const handle = useCallback(
    async (amount) => {
      const txHash = await leave(getXSushiStakingContract(sushi), amount, account);
      console.log(txHash);
    },
    [account, sushi]
  );
  return { onLeave: handle };
};
export default useLeave;
