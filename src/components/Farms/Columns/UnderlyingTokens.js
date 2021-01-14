import React from "react";
import { formatNumber } from "./utils";
import { isAddress } from "../../../services/vision/utils/";
import logoNotFound from "../../../assets/img/logoNotFound.png";

const ColumnUnderlyingTokens = ({ farm }) => {
  return (
    <>
      <td className="sushi-px-4 sushi-py-4 sushi-text-sm sushi-whitespace-no-wrap sushi-border-b sushi-border-gray-200">
        <div className="sushi-text-xs">
          <div className="sushi-flex sushi-items-center">
            <img
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
            />
            {formatNumber((farm.balance / farm.liquidityPair.totalSupply) * farm.liquidityPair.reserve0, 2)}{" "}
            {farm.liquidityPair.token0.symbol}
          </div>
          <div className="sushi-flex sushi-items-center sushi-mt-1.5">
            <img
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
            />
            {formatNumber((farm.balance / farm.liquidityPair.totalSupply) * farm.liquidityPair.reserve1, 2)}{" "}
            {farm.liquidityPair.token1.symbol}
          </div>
          <div className="sushi-flex sushi-items-center sushi-mt-1.5">
            <span className="ml-1 w-2.5 h-2.5 mr-2 rounded-md" />${formatNumber(farm.tvl, 0)} TVL{" "}
          </div>
        </div>
      </td>
    </>
  );
};

export default ColumnUnderlyingTokens;
