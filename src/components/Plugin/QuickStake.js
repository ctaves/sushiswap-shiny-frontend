import React, { useEffect } from "react";
import { Linker } from "../Linker";
import { useActiveWeb3React } from "../../services/exchange/hooks";

import ActionsStacked from "../Farms/Columns/ActionsStacked";

import sushiData from "@sushiswap/sushi-data";
import { FARM_DETAILS } from "../../constants/farms";

const QuickStake = ({ symbol }) => {
  const { account } = useActiveWeb3React();
  const filtered = FARM_DETAILS.filter(function(e) {
    return new RegExp(symbol.toUpperCase()).test(e.symbol);
  });

  console.log("symbol:", symbol, filtered);

  if (filtered.length == 0) {
    return (
      <div className="w-full h-20 flex justify-center items-center">
        <div>
          This pair is not available for staking. See <Linker to="/farms">Farms</Linker> for all pairs available for
          staking.
        </div>
      </div>
    );
  }
  if (!account) {
    return (
      <div className="w-full h-20 flex justify-center items-center">
        <div>Please connect wallet.</div>
      </div>
    );
  }
  return (
    <div className="w-full h-20 flex justify-center items-center">
      <div>
        This interface is undergoing maintenance. See <Linker to="/farms">Farms</Linker> for all pairs available for
        staking.
      </div>
    </div>
  );
};

export default QuickStake;
