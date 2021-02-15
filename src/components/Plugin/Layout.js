import React, { useState } from "react";
import Tabs from "./Tabs";
import ClassicSwap from "../../services/exchange/pages/Swap/secondary";
import ClassicPool from "../../services/exchange/pages/AddLiquidity/secondary";
import ClassicRemove from "../../services/exchange/pages/RemoveLiquidity/secondary";
import QuickStake from "./QuickStake";
//import Stakes from "./Stakes";
//import Stake from "../../services/frontend/views/Farm/components/Stake";
//import TokenSwap from "../TokenSwap";

const TokenActionsCard = ({ initialSection, title, symbol, currencyIdA, currencyIdB, showWallets }) => {
  const [section, setSection] = useState(initialSection);
  return (
    <div className="lg:border-2 lg:border-gray-900 flex flex-col rounded-lg overflow-hidden">
      <div className="flex-1 bg-white lg:p-6 flex flex-col justify-between">
        <div className="relative border-b border-gray-200 space-y-4 pb-0">
          {/* <div className="space-y-3 flex items-center justify-between space-y-0">
            <h3 className="pt-2 text-lg leading-6 font-medium text-gray-900">{title}</h3>
          </div> */}
          <Tabs selected={section} setSelected={setSection} />
        </div>
        {
          {
            swap: (
              <div className="mt-6 flex-1">
                <ClassicSwap outputCurrency={currencyIdA} />
              </div>
            ),
            pool: (
              <div className="mt-6 flex-1">
                <ClassicPool currencyIdA={currencyIdA} currencyIdB={currencyIdB} />
              </div>
            ),
            remove: (
              <div className="mt-6 flex-1">
                <ClassicRemove currencyIdA={currencyIdA} currencyIdB={currencyIdB} />
              </div>
            ),
            stake: (
              <div className="flex-1">
                <QuickStake symbol={symbol} />
                {/* <Stakes symbol={symbol} setSelected={setSection} showWallets={showWallets} /> */}
              </div>
            ),
          }[section]
        }
      </div>
    </div>
  );
};

export default TokenActionsCard;
