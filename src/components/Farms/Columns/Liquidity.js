import React from "react";
import { formatNumber } from "./utils";
import { formatCurrency, formatDecimal } from "../../../services/analytics/core";
//import { isAddress } from "../../../services/vision/utils/";
//import logoNotFound from "../../../assets/img/logoNotFound.png";

const ColumnLiquidity = ({ farm }) => {
  return (
    <>
      <td className="sushi-px-4 sushi-py-4 sushi-text-sm sushi-whitespace-no-wrap sushi-border-b sushi-border-gray-200">
        <div className="sushi-text-xs sushi-text-gray-500">
          <div className="text-sm font-medium mb-2 sushi-text-gray-900 sushi-flex sushi-items-center">
            ${formatNumber(farm.tvl, 0)}
          </div>
          <div className="sushi-flex sushi-items-center">
            {/* <img
              src={`https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/${isAddress(
                farm.liquidityPair.token0.id
              )}/logo.png`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = logoNotFound;
                e.preventDefault();
              }}
              alt=""
              className="sushi-mr-2 rounded-full"
              style={{
                width: "1.125rem",
                height: "1.125rem",
              }}
            /> */}
            {formatDecimal(farm.liquidityPair?.reserve0)} {farm.liquidityPair.token0.symbol}
          </div>
          <div className="sushi-flex sushi-items-center">
            {/* <img
              src={`https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/${isAddress(
                farm.liquidityPair.token1.id
              )}/logo.png`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = logoNotFound;
                e.preventDefault();
              }}
              alt=""
              className="sushi-mr-2 rounded-full"
              style={{
                width: "1.125rem",
                height: "1.125rem",
              }}
            /> */}
            {formatDecimal(farm.liquidityPair?.reserve1)} {farm.liquidityPair.token1.symbol}
          </div>
        </div>
      </td>
    </>
  );
};

export default ColumnLiquidity;
