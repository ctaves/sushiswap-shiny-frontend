import React from "react";
import { formattedNum } from "../../../services/vision/utils";
import { formatCurrency, formatDecimal } from "../../../services/analytics/core";

const ColumnStaked = ({ farm }) => {
  return (
    <>
      <td className="sushi-px-4 sushi-py-4 sushi-text-sm sushi-whitespace-no-wrap sushi-border-b sushi-border-gray-200">
        <div className="sushi-text-xs sushi-text-gray-500">
          <div className="text-sm font-medium mb-2 sushi-text-gray-900 sushi-flex sushi-items-center">
            {farm.valueUSD || farm.valueUSD !== 0 ? formattedNum(farm.valueUSD, true) : "$0.00"}
          </div>
          <div className="sushi-flex sushi-items-center">
            {farm.token0Balance ? formatDecimal(farm.token0Balance) : "0.00"} {farm.liquidityPair.token0.symbol}
          </div>
          <div className="sushi-flex sushi-items-center">
            {farm.token1Balance ? formatDecimal(farm.token1Balance) : "0.00"} {farm.liquidityPair.token1.symbol}
          </div>
        </div>
      </td>
    </>
  );
};

export default ColumnStaked;
