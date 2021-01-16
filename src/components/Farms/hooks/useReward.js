import { useCallback } from "react";

import { useActiveWeb3React } from "../../../services/exchange/hooks";
import { useTransactionAdder } from "../../../services/exchange/state/transactions/hooks";

import useSushi from "../../../services/frontend/hooks/useSushi";
import { getMasterChefContract } from "../../../services/frontend/sushi/utils";

const useReward = (pid, lpTokenName) => {
  const { account } = useActiveWeb3React();
  const addTransaction = useTransactionAdder();

  const sushi = useSushi();
  const masterChefContract = getMasterChefContract(sushi);

  const handleReward = useCallback(async () => {
    await masterChefContract.methods
      .deposit(pid, "0")
      .send({ from: account })
      .on("transactionHash", (tx) => {
        return addTransaction({ hash: tx }, { summary: "Harvest Rewards " + (lpTokenName && lpTokenName) });
      })
      .catch((error) => {
        if (error.message.includes("User denied")) {
          console.log("USER DENIED: HARVEST REWARDS");
          return error;
        }
        return error;
      });
  }, [account, pid, sushi]);

  return { onReward: handleReward };
};
export default useReward;
