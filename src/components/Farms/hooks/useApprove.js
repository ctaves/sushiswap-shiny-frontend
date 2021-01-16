import { useCallback } from "react";
import { ethers } from "ethers";

import { useActiveWeb3React } from "../../../services/exchange/hooks";
import { useTransactionAdder } from "../../../services/exchange/state/transactions/hooks";

import useSushi from "../../../services/frontend/hooks/useSushi";
import { getMasterChefContract } from "../../../services/frontend/sushi/utils";

const useApprove = (lpContract, lpTokenName) => {
  const { account } = useActiveWeb3React();
  const addTransaction = useTransactionAdder();

  const sushi = useSushi();
  const masterChefContract = getMasterChefContract(sushi);

  const handleApprove = useCallback(async () => {
    await lpContract.methods
      // https://github.com/ethers-io/ethers.js/issues/889
      .approve(masterChefContract.options.address, ethers.constants.MaxUint256.toString())
      //.approve(masterChefContract.options.address, ethers.constants.MaxUint256)
      .send({ from: account })
      .on("transactionHash", (tx) => {
        return addTransaction({ hash: tx }, { summary: "Approve " + (lpTokenName ? lpTokenName : "") });
      })
      .catch((error) => {
        if (error.message.includes("User denied")) {
          console.log("USER DENIED: APPROVE");
          return error;
        }
        return error;
      });
  }, [account, lpContract, masterChefContract]);
  return { onApprove: handleApprove };
};
export default useApprove;
