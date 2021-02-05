import React from "react";
import { Link } from "react-router-dom";
import { Linker, Button } from "../../Linker";
import { isAddress } from "../../../services/vision/utils/index.js";
import { formattedNum } from "../../../services/vision/utils";
import { currencyFormatter, decimalFormatter } from "../../../services/analytics/core";

import FarmActions from "./FarmActions";
import { Loader } from "./Loader";

import logoNotFound from "../../../assets/img/logoNotFound.png";
import SushiLogo from "../../../assets/img/logo.png";

const Table = ({ positions, farmBalanceUSD }) => {
  //console.log("positions:", positions);
  return (
    <>
      <div className="flex overflow-hidden bg-white">
        {/* Main column */}
        {/* Title */}
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-8">
            <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap">
              <div className="ml-4 mt-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Farms</h3>
                <Linker to="/farms">View all farms</Linker>
              </div>
              <div className="ml-4 mt-4 flex-shrink-0">
                <h3 className="text-lg text-right leading-6 font-medium text-gray-900">{farmBalanceUSD}</h3>
                {/* <p className="mt-1 text-sm leading-5 text-gray-500">{totalSushiBalance} SUSHI</p> */}
              </div>
            </div>
          </div>
          {/* Main content */}
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabIndex={0}>
            <div className="block">
              <div className="align-middle inline-block min-w-full border-b border-gray-200">
                <table className="hidden sm:table min-w-full table-fixed">
                  <TableHead />
                  <tbody className="bg-white divide-y divide-gray-100">
                    {positions &&
                      positions.map((position) => {
                        return <TableRow position={position} />;
                      })}
                  </tbody>
                </table>
                <div className="block sm:hidden">
                  <ul className="divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
                    {positions &&
                      positions.map((position) => {
                        return <Card position={position} />;
                      })}
                  </ul>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

const Card = ({ position }) => {
  return (
    <>
      {/* Activity list (smallest breakopoint only) */}
      <li>
        <a href="#" className="block px-4 py-4 bg-white hover:bg-cool-gray-50">
          <div className="flex items-center space-x-4">
            <div className="flex-1 flex space-x-2 truncate">
              <div className="flex flex-shrink-0 -space-x-1">
                <img
                  className="relative z-30 inline-block h-6 w-6 rounded-full text-white shadow-solid"
                  src={`https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/${isAddress(
                    position.token0Address
                  )}/logo.png`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = logoNotFound;
                  }}
                />
                <img
                  className="relative z-20 -ml-1 inline-block h-6 w-6 rounded-full text-white shadow-solid"
                  src={`https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/${isAddress(
                    position.token1Address
                  )}/logo.png`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = logoNotFound;
                  }}
                />
              </div>
              <div className="text-left text-cool-gray-500 text-sm truncate">
                <p className="truncate text-gray-800">{position.name}</p>
                <div className="mt-2">
                  <div className="text-gray-900">{formattedNum(position.valueUSD, true)}</div>
                  <div>
                    {position.token0Balance} {position.token0Symbol}
                  </div>
                  <div>
                    {position.token1Balance} {position.token1Symbol}
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-gray-900">
                    Harvestable: {position.pendingSushi} ({position.pendingSushiUSD})
                  </div>
                  <div>
                    Rewarded: {position.harvestedSushi} ({position.harvestedSushiUSD})
                  </div>
                  <div>
                    Locked: {decimalFormatter.format(position.lockedSushi)} (
                    {formattedNum(position.lockedSushiUSD, true)})
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-gray-900">
                    Profit/Loss:{" "}
                    <span className={position.profitUSD > 0 ? "text-green-600" : "text-red-600"}>
                      {formattedNum(position.profitUSD, true)}
                    </span>
                  </div>
                  <div>Entries: {position.entriesUSD}</div>
                  <div>Exits: {position.exitsUSD}</div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="mt-4 rounded-md bg-gray-50">
            <div className="p-2 flex flex justify-around">
              <div>
                <Button title={"Harvest"} />
              </div>
              <div>
                <Button title={"Stake"} />
              </div>
              <div>
                <Button title={"Unstake"} />
              </div>
            </div>
          </div> */}
        </a>
      </li>
    </>
  );
};

const TableHead = () => {
  return (
    <>
      <thead>
        <tr>
          <th className="w-2/5 px-6 py-3 border-b border-gray-200 bg-white text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            <span className="lg:pl-2">Name</span>
          </th>
          <th className="w-1/5 table-cell px-6 py-3 border-b border-gray-200 bg-white text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Balance
          </th>
          {/* <th className="w-1/5 table-cell px-6 py-3 border-b border-gray-200 bg-white text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Rewards
          </th> */}
          <th className="w-1/5 table-cell px-6 py-3 border-b border-gray-200 bg-white text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Profit
          </th>
          <th className="w-1/5 pr-6 py-3 border-b border-gray-200 bg-white text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider" />
        </tr>
      </thead>
    </>
  );
};

const TableRow = ({ position }) => {
  return (
    <>
      <tr>
        <td className="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
          <div className="flex items-center space-x-2">
            <div className="flex flex-shrink-0 -space-x-1">
              <img
                className="relative z-30 inline-block h-6 w-6 rounded-full text-white shadow-solid"
                src={`https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/${isAddress(
                  position.token0Address
                )}/logo.png`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = logoNotFound;
                }}
              />
              <img
                className="relative z-20 -ml-1 inline-block h-6 w-6 rounded-full text-white shadow-solid"
                src={`https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/${isAddress(
                  position.token1Address
                )}/logo.png`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = logoNotFound;
                }}
              />
            </div>
            <div className="flex items-center space-x-3 lg:pl-2">
              {/* <div className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-pink-600" /> */}
              <div>
                <div>{position.name ? position.name : <Loader />}</div>
                <div>
                  Harvest: {position.pendingSushi} ({position.pendingSushiUSD})
                </div>
                <div>
                  Locked: {decimalFormatter.format(position.lockedSushi)} ({formattedNum(position.lockedSushiUSD, true)}
                  )
                </div>
              </div>
            </div>
          </div>
        </td>
        <td className="table-cell px-6 py-3 whitespace-no-wrap text-sm leading-5 text-gray-500 text-right">
          <div className="text-gray-900">{formattedNum(position.valueUSD, true)}</div>
          <div>
            {position.token0Balance} {position.token0Symbol}
          </div>
          <div>
            {position.token1Balance} {position.token1Symbol}
          </div>
        </td>
        {/* <td className="table-cell px-6 py-3 whitespace-no-wrap text-sm leading-5 text-gray-500 text-right">
          <div className="text-gray-900">
            Harvest: {position.pendingSushi} ({position.pendingSushiUSD})
          </div>
          <div>
            Claimed: {position.harvestedSushi} ({position.harvestedSushiUSD})
          </div>
          <div>
            Locked: {decimalFormatter.format(position.lockedSushi)} ({formattedNum(position.lockedSushiUSD, true)})
          </div>
        </td> */}
        <td className="table-cell px-6 py-3 whitespace-no-wrap text-sm leading-5 text-gray-500 text-right">
          <div className="text-gray-900">
            Profit:{" "}
            <span className={position.profitUSD > 0 ? "text-green-600" : "text-red-600"}>
              {formattedNum(position.profitUSD, true)}
            </span>
          </div>
          <div>Entries: {position.entriesUSD}</div>
          <div>Exits: {position.exitsUSD}</div>
        </td>
        <FarmActions farm={position} />
        {/* <td className="table-cell px-6 py-3 whitespace-no-wrap text-sm leading-5 text-gray-900 text-right">
          <div>{position.sushi}</div>
          {position.xsushi ? <div>({position.xsushi})</div> : null}
        </td>
        <td className="table-cell px-6 py-3 whitespace-no-wrap text-sm leading-5 text-gray-500 text-right">
          {position.usd}
        </td>
        <td className="pr-6">
          <div className="relative flex justify-end items-center">{position.cta}</div>
        </td> */}
      </tr>
    </>
  );
};

export default Table;
