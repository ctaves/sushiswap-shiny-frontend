import React, { useState } from "react";
import ClassicSwap from "../../services/exchange/pages/Swap/secondary";
import ClassicPool from "../../services/exchange/pages/AddLiquidity/secondary";
import ClassicRemove from "../../services/exchange/pages/RemoveLiquidity/secondary";

//import Stakes from "./Stakes";
//import Migrate from "../../Migrate";
//import LiquidityBalances from "./LiquidityBalances";
//import Stake from "../../services/frontend/views/Farm/components/Stake";
//import TokenSwap from "../TokenSwap";

const Tabs = ({ selected, setSelected }) => {
  const tabs = [
    {
      title: "Swap",
      id: "swap",
    },
    // {
    //   title: "Migrate",
    //   id: "migrate",
    // },
    {
      title: "+ Liquidity",
      id: "pool",
    },
    {
      title: "- Liquidity",
      id: "remove",
    },
  ];
  return (
    <div>
      <div className="block">
        <nav className="-mb-px flex space-x-4">
          {tabs.map((tab) => {
            return (
              <button
                onClick={() => {
                  setSelected(tab.id);
                }}
                className={
                  selected === tab.id
                    ? "whitespace-no-wrap pb-4 px-1 border-b-2 border-gray-900 font-medium text-sm leading-5 text-gray-900 focus:outline-none focus:text-gray-900 focus:border-gray-700"
                    : "whitespace-no-wrap pb-4 px-1 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300"
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

const Wrapper = ({ initial, title, currencyIdA, currencyIdB }) => {
  const [section, setSection] = useState(initial);
  return (
    <div
      className="mb-4 shadow-md flex flex-col rounded-lg border-2 border-gray-900 overflow-hidden"
      style={{ minHeight: "20rem" }}
    >
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="relative border-b border-gray-200 space-y-4 pb-0">
          {title ? (
            <div className="space-y-3 flex items-center justify-between space-y-0">
              <h3 className="pt-2 text-lg leading-6 font-medium text-gray-900">{title}</h3>
            </div>
          ) : null}
          <Tabs selected={section} setSelected={setSection} />
        </div>
        {
          {
            swap: (
              <div className="mt-6 flex-1">
                <ClassicSwap />
              </div>
            ),
            pool: (
              <div className="mt-6 flex-1">
                <ClassicPool currencyIdA={currencyIdA} currencyIdB={currencyIdB} />
              </div>
            ),
            remove: (
              <>
                <div className="mt-6 flex-1">
                  <ClassicRemove currencyIdA={currencyIdA} currencyIdB={currencyIdB} />
                </div>
              </>
            ),
          }[section]
        }
      </div>
    </div>
  );
};

export default Wrapper;
