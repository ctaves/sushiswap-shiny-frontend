import React, { useState } from "react";
import SwapWithState from "../../services/exchange/pages/Swap/secondaryWithState";
import PoolWithState from "../../services/exchange/pages/AddLiquidity/secondaryWithState";
//import ClassicRemove from "../../services/exchange/pages/RemoveLiquidity/secondary";

const Tabs = ({ selectedView, setSelectedView }) => {
  const tabs = [
    {
      title: "Swap",
      id: "swap",
      chartView: "Rate 0",
    },
    {
      title: "+ Liquidity",
      id: "pool",
      chartView: "Liquidity",
    },
    {
      title: "- Liquidity",
      id: "remove",
      chartView: "Liquidity",
    },
  ];
  return (
    <div>
      <div className="sushi-block">
        <nav className="sushi--mb-px sushi-flex space-x-4">
          {tabs.map((tab) => {
            return (
              <button
                onClick={() => {
                  setSelectedView({ tab: tab.id, chartView: tab.chartView });
                }}
                className={
                  selectedView.tab === tab.id
                    ? "sushi-whitespace-no-wrap sushi-pb-4 sushi-px-1 sushi-border-b-2 border-gray-900 sushi-font-medium sushi-text-sm sushi-leading-5 text-gray-900 focus:sushi-outline-none focus:text-gray-900 focus:border-gray-700"
                    : "sushi-whitespace-no-wrap sushi-pb-4 sushi-px-1 sushi-border-b-2 sushi-border-transparent sushi-font-medium sushi-text-sm sushi-leading-5 sushi-text-gray-500 hover:sushi-text-gray-700 hover:sushi-border-gray-300 focus:sushi-outline-none focus:sushi-text-gray-700 focus:sushi-border-gray-300"
                }
              >
                {tab.title}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

const TokenActionsCard = ({ tokens, setTokens, title, selectedView, setSelectedView }) => {
  console.log("tokens:", tokens);
  return (
    <div
      className="mb-4 md:shadow-2xl sushi-flex sushi-flex-col md:rounded-lg md:border-2 border-gray-500 sushi-overflow-hidden"
      style={{ minHeight: "20rem" }}
    >
      <div className="sushi-flex-1 sushi-bg-white sushi-p-6 sushi-flex sushi-flex-col sushi-justify-between">
        <div className="sushi-relative sushi-border-b sushi-border-gray-200 sushi-space-y-4 sushi-pb-0">
          {title ? (
            <div className="sushi-space-y-3 sushi-flex sushi-items-center sushi-justify-between sushi-space-y-0">
              <h3 className="sushi-pt-2 sushi-text-lg sushi-leading-6 sushi-font-medium sushi-text-gray-900">
                {title}
              </h3>
            </div>
          ) : null}
          <Tabs selectedView={selectedView} setSelectedView={setSelectedView} />
        </div>
        {
          {
            swap: (
              <div className="sushi-mt-6 sushi-flex-1">
                <SwapWithState tokens={tokens} setTokens={setTokens} />
              </div>
            ),
            pool: (
              <div className="sushi-mt-6 sushi-flex-1">
                <PoolWithState tokens={tokens} setTokens={setTokens} />
              </div>
            ),
          }[selectedView.tab]
        }
      </div>
    </div>
  );
};

export default TokenActionsCard;
