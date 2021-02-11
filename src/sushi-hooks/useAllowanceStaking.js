import { useCallback, useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import useSushi from "../../../services/frontend/hooks/useSushi";
import { useActiveWeb3React } from "../../../services/exchange/hooks";
import { getAllowance } from "../../../services/frontend/utils/erc20";
import { getSushiContract, getXSushiStakingContract } from "../../../services/frontend/sushi/utils";

const useAllowanceStaking = () => {
  const [allowance, setAllowance] = useState(new BigNumber(0));
  const { account } = useActiveWeb3React();
  const sushi = useSushi();
  const lpContract = getSushiContract(sushi);
  const stakingContract = getXSushiStakingContract(sushi);
  //console.log("StakingContract:", sushi, lpContract, stakingContract);
  const fetchAllowance = useCallback(async () => {
    if (account) {
      const allowance = await getAllowance(lpContract, account, stakingContract.options.address);
      setAllowance(new BigNumber(allowance));
    }
  }, [account, stakingContract, lpContract]);
  useEffect(() => {
    if (account && stakingContract && lpContract) {
      fetchAllowance();
    }
    let refreshInterval = setInterval(fetchAllowance, 10000);
    return () => clearInterval(refreshInterval);
  }, [account, stakingContract, lpContract]);
  return allowance;
};

export default useAllowanceStaking;
