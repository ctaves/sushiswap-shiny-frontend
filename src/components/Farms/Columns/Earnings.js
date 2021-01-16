import React, { useState } from "react";
import { useActiveWeb3React } from "../../../services/exchange/hooks";

// handle harvesting
import useReward from "../hooks/useReward";
import Value from "../../Cards/Balance/Value";

import SushiLogo from "../../../assets/img/logo.png";

const ColumnEarnings = ({ farm }) => {
  const { account } = useActiveWeb3React();

  const [pendingTx, setPendingTx] = useState(false);
  const { onReward } = useReward(farm.id); //useReward(farm.pid);

  return (
    <td className="sushi-pl-4 sushi-py-4 sushi-text-sm sushi-whitespace-no-wrap sushi-border-b sushi-border-gray-200">
      <div className="sushi-inline-flex sushi-flex-col">
        {farm.earnings > 0 ? (
          <>
            <div className="sushi-flex sushi-items-center">
              <button
                disabled={!farm.earnings || pendingTx}
                onClick={async () => {
                  setPendingTx(true);
                  await onReward();
                  setPendingTx(false);
                }}
                className="sushi-p-1 sushi-mr-2 sushi-text-xl sushi-transition-colors sushi-duration-300 sushi-rounded sushi-shadow-md sushi-cursor-default"
                style={{ border: "1px solid #0090a6" }}
              >
                <span role="img">
                  <img src={SushiLogo} className="inline-block h-6 w-6 mb-1" alt="" />
                </span>
              </button>
              <div>
                <div>
                  <Value value={!!account ? farm.earnings : "Locked"} />{" "}
                </div>
                <div className="sushi-text-xs sushi-text-gray-500">SUSHI</div>
              </div>
            </div>
            <div
              className="text-blue-brand bg-blue-100 sushi-self-center mt-1 sushi-text-xs sushi-font-medium sushi-leading-4 sushi-rounded-md sushi-select-none"
              data-original-title="null"
            >
              <button
                disabled={!farm.earnings || pendingTx}
                onClick={async () => {
                  setPendingTx(true);
                  await onReward();
                  setPendingTx(false);
                }}
                className="sushi-inline-flex sushi-items-center sushi-px-2.5 sushi-py-0.5"
              >
                Harvest now
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="sushi-flex sushi-items-center">
              <div className="sushi-p-1 sushi-mr-2 sushi-text-xl sushi-transition-colors sushi-duration-300 sushi-rounded sushi-shadow-md sushi-cursor-default hover:sushi-bg-orange-50">
                <span role="img">
                  <img
                    src={SushiLogo}
                    className="inline-block h-6 w-6 mb-1"
                    alt=""
                    style={{ filter: "grayscale(1)" }}
                  />
                </span>
              </div>
              <div>
                <div>
                  <Value value={!!account ? farm.earnings : "Locked"} />
                </div>
                <div className="sushi-text-xs sushi-text-gray-500">SUSHI</div>
              </div>
            </div>
            <div
              className="sushi-self-center mt-1 sushi-text-xs sushi-font-medium sushi-leading-4 sushi-text-gray-800 sushi-bg-gray-100 sushi-rounded-md sushi-select-none sushi-has-tooltip"
              data-original-title="null"
            >
              <div className="sushi-inline-flex sushi-items-center sushi-px-2.5 sushi-py-0.5">No rewards</div>
            </div>
          </>
        )}
      </div>
    </td>
  );
};

export default ColumnEarnings;
