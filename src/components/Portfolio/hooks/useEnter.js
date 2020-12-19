import { useCallback } from "react";
import useSushi from "../../../services/frontend/hooks/useSushi";
import { useActiveWeb3React } from "../../../services/exchange/hooks";
import { enter, getXSushiStakingContract } from "../../../services/frontend/sushi/utils";
const useEnter = () => {
  const { account } = useActiveWeb3React();
  const sushi = useSushi();
  const handle = useCallback(
    async (amount) => {
      const txHash = await enter(getXSushiStakingContract(sushi), amount, account);
      console.log(txHash);
    },
    [account, sushi]
  );
  return { onEnter: handle };
};
export default useEnter;
