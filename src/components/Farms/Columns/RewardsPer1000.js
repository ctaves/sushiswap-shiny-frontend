import React from "react";
import { formatNumber } from "./utils";

import SushiLogo from "../../../assets/img/logo.png";

const ColumnRewardsPer1000 = ({ farm }) => {
  //console.log("POOL COLUMN:", farm);
  return (
    <>
      <td className="sushi-px-4 sushi-py-4 sushi-text-sm sushi-whitespace-no-wrap sushi-border-b sushi-border-gray-200">
        <div className="sushi-inline-flex sushi-flex-col">
          <div className="sushi-flex sushi-items-center">
            <div
              className="sushi-p-1 sushi-mr-2 sushi-text-xl sushi-transition-colors sushi-duration-300 sushi-rounded sushi-shadow-md sushi-cursor-default hover:sushi-bg-orange-50"
              style={{ border: "solid 1px #d163ad" }}
            >
              <img src={SushiLogo} className="inline-block h-6 w-6 mb-1" />
            </div>
            <div>
              <div>
                {formatNumber(farm.rewardPerThousand, 3)}
                {/* {formatNumber(
                  (1e3 / ((farm.balance / farm.uniswapPair.totalSupply) * farm.uniswapPair.reserveUSD)) *
                    ((3600 / 13.115837104072398) * farm.rewards.rewardPerBlock) *
                    24,
                  3
                )} */}
              </div>
              <div className="sushi-text-xs sushi-text-gray-500">SUSHI/day</div>
            </div>
          </div>
          {/* {farm.rewards.multiplier && farm.rewards.multiplier > 1 ? (
            <div
              className="sushi-self-center sushi-mt-2 sushi-text-xs sushi-font-medium sushi-leading-4 sushi-text-gray-800 sushi-bg-gray-100 sushi-rounded-md sushi-select-none sushi-text-green-800 sushi-bg-green-100 sushi-has-tooltip"
              data-original-title="null"
            >
              <div className="sushi-inline-flex sushi-items-center sushi-px-2.5 sushi-py-0.5">
                {formatNumber(farm.rewards.multiplier, 2)}x Reward
              </div>
            </div>
          ) : farm.rewards.multiplier && farm.rewards.multiplier !== 1 ? (
            <div
              className="sushi-self-center sushi-mt-2 sushi-text-xs sushi-font-medium sushi-leading-4 sushi-text-gray-800 sushi-bg-gray-100 sushi-rounded-md sushi-select-none sushi-has-tooltip"
              data-original-title="null"
            >
              <div className="sushi-inline-flex sushi-items-center sushi-px-2.5 sushi-py-0.5">
                {formatNumber(farm.rewards.multiplier, 2)}x Reward
              </div>
            </div>
          ) : null} */}
        </div>
      </td>
    </>
  );
};

export default ColumnRewardsPer1000;
