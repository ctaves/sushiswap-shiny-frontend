import React from "react";
import { formatNumber } from "./utils";

const ColumnROI = ({ farm }) => {
  return (
    <>
      <td className="space-y-1 sushi-px-4 sushi-py-4 sushi-text-sm sushi-whitespace-no-wrap sushi-border-b sushi-border-gray-200">
        <div className="sushi-flex sushi-items-center sushi-text-xs font-medium sushi-text-gray-900">
          <span>{formatNumber(farm.roiPerYear, 2)}%</span>
          <span className="sushi-pl-1 sushi-text-xs sushi-leading-3">yearly</span>
        </div>
        <div className="sushi-flex sushi-items-center sushi-text-xs sushi-text-gray-500">
          <span>{formatNumber(farm.roiPerMonth, 2)}%</span>
          <span className="sushi-pl-1 sushi-text-xs sushi-leading-3 sushi-text-gray-500">monthly</span>
        </div>
        <div className="sushi-flex sushi-items-center sushi-text-xs sushi-text-gray-500">
          <span>{formatNumber(farm.roiPerDay, 2)}%</span>
          <span className="sushi-pl-1 sushi-text-xs sushi-leading-3">daily</span>
        </div>
      </td>
      {/* <td className="sushi-px-4 sushi-py-4 sushi-text-sm sushi-whitespace-no-wrap sushi-border-b sushi-border-gray-200">
  {formatNumber(farm.balance, 3)}
  <div className="sushi-text-sm sushi-leading-5 sushi-text-gray-500">
    {farm.sushiswapId}
  </div>
</td> */}
    </>
  );
};

export default ColumnROI;
