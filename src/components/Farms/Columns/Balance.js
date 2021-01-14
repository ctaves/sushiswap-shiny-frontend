import React from "react";

const ColumnBalance = ({ farm }) => {
  //console.log("POOL:", farm);
  //console.log(farm.tokenBalance, farm.stakedBalance);
  return (
    <td className="sushi-pl-4 sushi-py-4 sushi-text-sm sushi-whitespace-no-wrap sushi-border-b sushi-border-gray-200">
      <div className="sushi-text-xs">
        <div className="sushi-flex sushi-items-center">
          Available: {farm.tokenBalance && Number(farm.tokenBalance).toFixed(4)}
        </div>
        <div className="sushi-flex sushi-items-center sushi-mt-1.5">
          Staked: {farm.stakedBalance && Number(farm.stakedBalance).toFixed(4)}
        </div>
        <div className="sushi-flex sushi-items-center sushi-mt-1.5">{farm.sushiswapId}</div>
      </div>
    </td>
  );
};

export default ColumnBalance;
