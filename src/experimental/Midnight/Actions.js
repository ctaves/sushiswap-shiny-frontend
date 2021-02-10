import React, { useState } from "react";
import ClassicSwap from "../../services/exchange/pages/Swap/secondary";
import ClassicPool from "../../services/exchange/pages/AddLiquidity/secondary";
import ClassicRemove from "../../services/exchange/pages/RemoveLiquidity/secondary";
//import Stakes from "./Stakes";
//import Migrate from "../Migrate";
//import { MigrateNotice } from "../Overview/MigrateNotice";
//import { LimitNotice } from "../Overview/LimitNotice";
//import LiquidityBalances from "./LiquidityBalances";
//import Stake from "../../../services/frontend/views/Farm/components/Stake";
//import TokenSwap from "../TokenSwap";

const Tabs = ({ selected, setSelected }) => {
  const tabs = [
    {
      title: "Swap",
      id: "swap",
    },
    {
      title: "Limit",
      id: "limit",
    },
    {
      title: "Migrate",
      id: "migrate",
    },
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
                    ? "whitespace-no-wrap pb-1 px-1 border-b-2 border-blue-500 text-sm leading-5 text-blue-500 focus:outline-none focus:text-blue-500 focus:border-blue-500"
                    : "whitespace-no-wrap pb-1 px-1 border-b-2 border-transparent text-sm leading-5 text-gray-400 hover:text-blue-500 focus:outline-none focus:text-gray-400 focus:border-gray-300"
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

const TokenActionsCard = ({ initialSection, title, currencyIdA, currencyIdB }) => {
  const [section, setSection] = useState(initialSection);
  const [removeView, setRemoveView] = useState("account");
  title = "Actions";
  return (
    <div
      className="mb-4 flex flex-col md:border border-gray-800 overflow-hidden"
      style={{ minHeight: "20rem", backgroundColor: "#121722" }}
    >
      <div className="flex-1 py-3 mx-4 flex flex-col justify-between">
        <div className="relative border-b border-gray-700 space-y-3 pb-0">
          {title ? (
            <div className="space-y-3 flex items-center justify-between space-y-0">
              <h3 className="text-base leading-6 font-medium text-gray-400">{title}</h3>
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
            migrate: <>{/* <Migrate /> */}</>,
            limit: <>{/* <LimitNotice /> */}</>,
            pool: (
              <div className="mt-6 flex-1">
                <ClassicPool currencyIdA={currencyIdA} currencyIdB={currencyIdB} />
              </div>
            ),
            remove: (
              <>
                {
                  {
                    account: <div className="mt-6 flex-1">{/* <LiquidityBalances /> */}</div>,
                    action: (
                      <div className="mt-6 flex-1">
                        <ClassicRemove currencyIdA={currencyIdA} currencyIdB={currencyIdB} />
                      </div>
                    ),
                  }[removeView]
                }
              </>
            ),
          }[section]
        }
      </div>
    </div>
  );
};

export default TokenActionsCard;
