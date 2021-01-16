import React, { useCallback, useMemo, useState } from "react";
import { Button } from "../../Linker";
import { useActiveWeb3React } from "../../../services/exchange/hooks";

//import BigNumber from "bignumber.js";
//import useFarm from "../../../services/frontend/hooks/useFarm";
import { toChecksumAddress } from "web3-utils";
import { getContract } from "../../../services/frontend/utils/erc20";

// handle allows and approval
import useAllowance from "../hooks/useAllowance";
import useApprove from "../hooks/useApprove";

// handle staking
import useStake from "../hooks/useStake";
import useStakedBalance from "../hooks/useStakedBalance";
import useTokenBalance from "../hooks/useTokenBalance";
import useUnstake from "../hooks/useUnstake";

// handle harvesting
import useReward from "../hooks/useReward";

// modals
import useClassicModal from "../../../services/frontend/hooks/useModal";
import DepositModal from "../../../services/frontend/views/Farm/components/DepositModal";
import WithdrawModal from "../../../services/frontend/views/Farm/components/WithdrawModal";

const Actions = ({ farm }) => {
  const { account } = useActiveWeb3React();
  const { ethereum } = window;

  // set up constants
  const lpTokenAddress = toChecksumAddress(farm.pair);
  const pid = farm.id;
  const tokenName = farm.symbol;

  // fetch SLP contract
  const lpContract = useMemo(() => {
    return getContract(ethereum, lpTokenAddress);
  }, [ethereum, lpTokenAddress]);

  // handle allowance and approval
  const allowance = useAllowance(lpContract);
  const { onApprove } = useApprove(lpContract);

  const [requestedApproval, setRequestedApproval] = useState(false);
  const handleApprove = useCallback(async () => {
    //console.log("SEEKING APPROVAL");
    try {
      setRequestedApproval(true);
      const txHash = await onApprove();
      console.log(txHash);
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false);
      }
    } catch (e) {
      console.log(e);
    }
  }, [onApprove, setRequestedApproval]);

  // handle stake and unstake
  const { onStake } = useStake(pid);
  const { onUnstake } = useUnstake(pid);

  // SLP token balance and staked balance
  const tokenBalance = useTokenBalance(lpContract.options.address);
  const stakedBalance = useStakedBalance(pid);

  // handle harvesting rewards
  const [pendingTx, setPendingTx] = useState(false);
  const { onReward } = useReward(farm.id);

  // handle modals
  const [onPresentDeposit] = useClassicModal(
    <DepositModal max={tokenBalance} onConfirm={onStake} tokenName={tokenName} />
  );
  const [onPresentWithdraw] = useClassicModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={tokenName} />
  );

  const state = {
    needsApproval: !allowance.toNumber(),
    harvestable: farm.earnings > 0,
    availableSLP: tokenBalance > 0,
    stakedSLP: stakedBalance > 0,
  };

  return (
    <>
      <td className="table-cell px-6 py-3 whitespace-no-wrap text-sm leading-5 text-gray-500 text-right">
        {state.needsApproval && (
          <div>
            <Button onClick={handleApprove} title={"Approve Staking"} />
          </div>
        )}
        {!state.needsApproval && state.harvestable && (
          <div>
            <Button
              title={"Harvest"}
              disabled={!farm.earnings || pendingTx}
              onClick={async () => {
                setPendingTx(true);
                await onReward();
                setPendingTx(false);
              }}
            />
          </div>
        )}
        {!state.needsApproval && !state.availableSLP && (
          <div>
            <Button title={"Add Liquidity"} />
          </div>
        )}
        {!state.needsApproval && state.availableSLP && (
          <div>
            <Button title={"Stake"} onClick={onPresentDeposit} />
          </div>
        )}
        {!state.needsApproval && state.stakedSLP && (
          <div>
            <Button title={"Unstake"} onClick={onPresentWithdraw} />
          </div>
        )}
      </td>
    </>
  );
};

export default Actions;
