import { useCallback, useEffect, useState } from "react";
import BigNumber from "bignumber.js";

import { useActiveWeb3React } from "../../../services/exchange/hooks";

import useSushi from "../../../services/frontend/hooks/useSushi";
import { getAllowance } from "../../../services/frontend/utils/erc20";
import { getMasterChefContract } from "../../../services/frontend/sushi/utils";

const useAllowance = (lpContract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0));
  const { account } = useActiveWeb3React();

  const sushi = useSushi();
  const masterChefContract = getMasterChefContract(sushi);

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(lpContract, account, masterChefContract.options.address);
    setAllowance(new BigNumber(allowance));
  }, [account, masterChefContract, lpContract]);

  useEffect(() => {
    if (account && masterChefContract && lpContract) {
      fetchAllowance();
    }
    let refreshInterval = setInterval(fetchAllowance, 10000);
    return () => clearInterval(refreshInterval);
  }, [account, masterChefContract, lpContract]);

  return allowance;
};

export default useAllowance;
