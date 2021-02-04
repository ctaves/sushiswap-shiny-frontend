import React from "react";
import { Link } from "react-router-dom";
import { Linker } from "../../Linker";

import { emojis } from "../../../constants/farms";

const ColumnName = ({ farm }) => {
  return (
    <>
      <td className="sushi-freeze-cell sushi-px-4 sushi-py-4 sushi-text-sm sushi-whitespace-no-wrap sushi-border-b sushi-border-gray-200 sushi-bg-white">
        <div className="sushi-flex sushi-items-center">
          {farm.icon === "Doge" ? (
            <img className="hidden sm:block shadow mr-2 h-12 w-12 rounded-full" src={emojis[farm.icon]} alt="" />
          ) : (
            <img className="hidden sm:block shadow mr-2 p-2 h-10 w-10 rounded-full" src={emojis[farm.icon]} alt="" />
          )}
          {/* <div className="hidden sm:block sushi-flex-shrink-0 sushi-w-8 sushi-h-8 sushi-text-2xl">{farm.icon}</div> */}
          <div className="sushi-ml-0 sm:sushi-ml-2">
            <div className="sushi-flex sushi-items-center">
              <div className="sushi-flex sushi-items-center text-sm font-medium sushi-leading-5 sushi-text-gray-900 hover:sushi-underline">
                {farm.name}
              </div>
              {farm.new ? (
                <span className="sushi-ml-2 sushi-inline-flex sushi-items-center sushi-px-2.5 sushi-py-0.5 sushi-rounded-full sushi-text-xs sushi-font-medium sushi-leading-4 sushi-bg-teal-100 sushi-text-teal-800">
                  New
                </span>
              ) : null}
            </div>
            <div className="text-xs sushi-leading-5 sushi-text-gray-500">
              {farm.liquidityPair.token0.symbol + "-" + farm.liquidityPair.token1.symbol}
            </div>
            <div className="mt-1">
              <Linker to={"/pair/" + farm.liquidityPair.id}>View Pair</Linker>
            </div>
          </div>
        </div>
      </td>
    </>
  );
};

export default ColumnName;
