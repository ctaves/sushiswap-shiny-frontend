import BigNumber from "bignumber.js";
import React, { useCallback, useState } from "react";
import useModal from "../../services/frontend/hooks/useModal";
import DepositModal from "../../services/frontend/views/StakeXSushi/components/DepositModal";
import { contractAddresses } from "../../services/frontend/sushi/lib/constants";

import useTokenBalance from "./hooks/useTokenBalance";
import useEnter from "./hooks/useEnter";
import useAllowanceStaking from "./hooks/useAllowanceStaking";
import useApproveStaking from "./hooks/useApproveStaking";

import { Button } from "../Linker";

const StakeSushi = () => {
  const tokenName = "SUSHI";
  const [requestedApproval, setRequestedApproval] = useState(false);
  const allowance = useAllowanceStaking();
  const { onApprove } = useApproveStaking();
  const tokenBalance = useTokenBalance(contractAddresses.sushi[1]);
  const { onEnter } = useEnter();

  const [onPresentDeposit] = useModal(<DepositModal max={tokenBalance} onConfirm={onEnter} tokenName={tokenName} />);
  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true);
      const txHash = await onApprove();
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false);
      }
    } catch (e) {
      console.log(e);
    }
  }, [onApprove, setRequestedApproval]);
  return (
    <>
      {!allowance.toNumber() ? (
        <Button disabled={requestedApproval} onClick={handleApprove} title={"Approve Staking"} />
      ) : (
        <Button disabled={tokenBalance.eq(new BigNumber(0))} onClick={onPresentDeposit} title={"Stake"} />
      )}
    </>
  );
};
export default StakeSushi;
