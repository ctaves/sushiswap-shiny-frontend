import React from "react";

import { formattedNum } from "../../../services/vision/utils";

const ColumnBalance = ({ farm }) => {
  //console.log("POOL:", farm);
  //console.log(farm.tokenBalance, farm.stakedBalance);
  return (
    <td className="sushi-pl-4 sushi-py-4 sushi-text-sm sushi-whitespace-no-wrap sushi-border-b sushi-border-gray-200">
      <div className="sushi-text-xs">
        <div className="sushi-flex sushi-items-center">
          Available: {farm.tokenBalance ? formattedNum(farm.tokenBalance) : 0.0}
        </div>
        <div className="sushi-flex sushi-items-center">
          Staked: {farm.stakedBalance ? formattedNum(farm.stakedBalance) : 0.0}
        </div>
        <div className="sushi-flex sushi-items-center">{farm.symbol}</div>
      </div>
    </td>
  );
};

export default ColumnBalance;
