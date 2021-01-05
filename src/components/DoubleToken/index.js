import React from "react";
import { isAddress } from "../../services/vision/utils";
import logoNotFound from "../../assets/img/logoNotFound.png";

const DoubleToken = ({ tokenA, tokenB }) => {
  return (
    <>
      <img
        className="relative z-30 inline-block h-6 w-6 rounded-full text-white shadow-solid"
        src={`https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/${isAddress(
          tokenA
        )}/logo.png`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = logoNotFound;
          e.preventDefault();
        }}
      />
      <img
        className="relative z-20 -ml-1 inline-block h-6 w-6 rounded-full text-white shadow-solid"
        src={`https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/${isAddress(
          tokenB
        )}/logo.png`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = logoNotFound;
          e.preventDefault();
        }}
      />
    </>
  );
};

export default DoubleToken;
