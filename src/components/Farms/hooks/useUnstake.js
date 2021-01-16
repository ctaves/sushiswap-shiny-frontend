import { useCallback } from "react";
import BigNumber from "bignumber.js";

import { useActiveWeb3React } from "../../../services/exchange/hooks";
import { useTransactionAdder } from "../../../services/exchange/state/transactions/hooks";

import useSushi from "../../../services/frontend/hooks/useSushi";
import { getMasterChefContract } from "../../../services/frontend/sushi/utils";

const useUnstake = (pid, lpTokenName) => {
  const { account } = useActiveWeb3React();
  const addTransaction = useTransactionAdder();

  const sushi = useSushi();
  const masterChefContract = getMasterChefContract(sushi);

  const handleUnstake = useCallback(
    async (amount) => {
      await masterChefContract.methods
        .withdraw(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
        .send({ from: account })
        .on("transactionHash", (tx) => {
          return addTransaction({ hash: tx }, { summary: "Unstake " + (lpTokenName ? lpTokenName : "") });
        })
        .catch((error) => {
          if (error.message.includes("User denied")) {
            console.log("USER DENIED: UNSTAKE");
            return error;
          }
          return error;
        });
    },
    [account, pid, sushi]
  );

  return { onUnstake: handleUnstake };
};
export default useUnstake;
