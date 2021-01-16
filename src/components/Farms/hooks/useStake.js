import { useCallback } from "react";
import BigNumber from "bignumber.js";

import { useActiveWeb3React } from "../../../services/exchange/hooks";
import { useTransactionAdder } from "../../../services/exchange/state/transactions/hooks";

import useSushi from "../../../services/frontend/hooks/useSushi";
import { getMasterChefContract } from "../../../services/frontend/sushi/utils";

const useStake = (pid, lpTokenName) => {
  const { account } = useActiveWeb3React();
  const addTransaction = useTransactionAdder();

  const sushi = useSushi();
  const masterChefContract = getMasterChefContract(sushi);

  const handleStake = useCallback(
    async (amount) => {
      await masterChefContract.methods
        .deposit(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
        .send({ from: account })
        .on("transactionHash", (tx) => {
          return addTransaction({ hash: tx }, { summary: "Stake " + (lpTokenName && lpTokenName) });
        })
        .catch((error) => {
          if (error.message.includes("User denied")) {
            console.log("USER DENIED: STAKE");
            return error;
          }
          return error;
        });
    },
    [account, pid, sushi]
  );
  return { onStake: handleStake };
};
export default useStake;
