import { useCallback } from "react";
import useSushi from "../../../services/frontend/hooks/useSushi";
import { useActiveWeb3React } from "../../../services/exchange/hooks";
import { approve, getSushiContract, getXSushiStakingContract } from "../../../services/frontend/sushi/utils";
const useApproveStaking = () => {
  const { account } = useActiveWeb3React();
  const sushi = useSushi();
  const lpContract = getSushiContract(sushi);
  const contract = getXSushiStakingContract(sushi);
  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, contract, account);
      return tx;
    } catch (e) {
      return false;
    }
  }, [account, lpContract, contract]);
  return { onApprove: handleApprove };
};
export default useApproveStaking;
