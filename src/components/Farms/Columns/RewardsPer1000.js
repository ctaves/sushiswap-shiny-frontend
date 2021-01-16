import React from "react";
import SushiLogo from "../../../assets/img/logo.png";

const ColumnRewardsPer1000 = ({ farm }) => {
  return (
    <>
      <td className="sushi-px-4 sushi-py-4 sushi-text-sm sushi-whitespace-no-wrap sushi-border-b sushi-border-gray-200">
        <div className="sushi-inline-flex sushi-flex-col">
          <div className="sushi-flex sushi-items-center">
            <div
              className="sushi-p-1 sushi-mr-2 sushi-text-xl sushi-transition-colors sushi-duration-300 sushi-rounded sushi-shadow-md sushi-cursor-default hover:sushi-bg-orange-50"
              style={{ border: "solid 1px #d163ad" }}
            >
              <img src={SushiLogo} className="inline-block h-6 w-6 mb-1" alt="" />
            </div>
            <div>
              <div>{Number(farm.rewardPerThousand).toFixed(3)}</div>
              <div className="sushi-text-xs sushi-text-gray-500">SUSHI/day</div>
            </div>
          </div>
          <div className="w-full sushi-self-center sushi-mt-2 sushi-text-xs sushi-font-medium sushi-leading-4 sushi-text-gray-800 sushi-bg-gray-100 sushi-rounded-md sushi-select-none sushi-has-tooltip">
            <div className="sushi-inline-flex sushi-items-center sushi-px-2.5 sushi-py-0.5">
              {farm.allocPoint} allocPoint
            </div>
          </div>
        </div>
      </td>
    </>
  );
};

export default ColumnRewardsPer1000;
