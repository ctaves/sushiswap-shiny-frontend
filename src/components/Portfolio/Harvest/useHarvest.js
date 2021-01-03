import { useCallback } from "react";
import useSushi from "../../../services/frontend/hooks/useSushi";
import { useActiveWeb3React } from "../../../services/exchange/hooks";
import { harvest, getMasterChefContract } from "../../../services/frontend/sushi/utils";
import { useTransactionAdder } from "../../../services/exchange/state/transactions/hooks";

const useHarvest = (pid, name) => {
  const { account } = useActiveWeb3React();
  const sushi = useSushi();
  const masterChefContract = getMasterChefContract(sushi);
  const addTransaction = useTransactionAdder();

  const handleReward = useCallback(async () => {
    await masterChefContract.methods
      .deposit(pid, "0")
      .send({ from: account })
      .on("transactionHash", (tx) => {
        console.log("TX:", tx);
        return addTransaction(
          { hash: tx },
          {
            summary: "Harvest Rewards " + name,
          }
        );
        // addTransaction(tx, {
        //   summary: "Harvest ",
        // });
      })
      .catch((error) => {
        if (error.message.includes("User denied")) {
          console.log("USER DENIED....");
          // User denied transaction signature on MetaMask.
          return error;
        }
        console.debug("Failed to approve token", error);
        return error;
      });
  }, [account, pid, sushi]);
  return { onReward: handleReward };
};
export default useHarvest;
