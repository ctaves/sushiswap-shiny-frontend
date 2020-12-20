import React from "react";
import { Link } from "react-router-dom";
import { isAddress } from "../../../services/vision/utils/index.js";
import { formattedNum } from "../../../services/vision/utils";
import logoNotFound from "../../../assets/img/logoNotFound.png";

const Table = ({ positions, ethPrice, LPBalanceUSD }) => {
  return (
    <>
      <div className="flex overflow-hidden bg-white">
        {/* Title */}
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap">
              <div className="ml-4 mt-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Liquidity Positions</h3>
                <Link
                  to="/pairs"
                  class="font-medium text-orange-600 hover:text-orange-500 transition duration-150 ease-in-out"
                >
                  View all pairs
                </Link>
              </div>
              <div className="ml-4 mt-4 flex-shrink-0">
                <h3 className="text-lg text-right leading-6 font-medium text-gray-900">{LPBalanceUSD}</h3>
              </div>
            </div>
          </div>
          {/* Main content */}
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabIndex={0}>
            <div className="block">
              <div className="align-middle inline-block min-w-full border-b border-gray-200">
                <div className="align-middle inline-block min-w-full border-b border-gray-200">
                  <table className="hidden sm:block min-w-full table-fixed">
                    <TableHead />
                    <tbody className="bg-white divide-y divide-gray-100">
                      {positions &&
                        positions.map((position) => {
                          return <TableRow position={position} ethPrice={ethPrice} />;
                        })}
                    </tbody>
                  </table>
                  <div className="block sm:hidden">
                    <ul className="divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
                      {positions &&
                        positions.map((position) => {
                          return <Card position={position} ethPrice={ethPrice} />;
                        })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

const Card = ({ position, ethPrice }) => {
  const poolOwnership = position.liquidityTokenBalance / position.pair.totalSupply;
  const valueUSD = poolOwnership * position.pair.reserveUSD;
  return (
    <>
      <li>
        <a href="#" className="block px-4 py-4 bg-white hover:bg-cool-gray-50">
          <div className="flex items-center space-x-4">
            <div className="flex-1 flex space-x-2 truncate">
              <div className="flex flex-shrink-0 -space-x-1">
                <img
                  className="relative z-30 inline-block h-6 w-6 rounded-full text-white shadow-solid"
                  src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${isAddress(
                    position.pair.token0.id
                  )}/logo.png`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = logoNotFound;
                  }}
                />
                <img
                  className="relative z-20 -ml-1 inline-block h-6 w-6 rounded-full text-white shadow-solid"
                  src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${isAddress(
                    position.pair.token1.id
                  )}/logo.png`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = logoNotFound;
                  }}
                />
              </div>
              <div className="text-left text-cool-gray-500 text-sm truncate">
                <div>
                  <Link to={"/pair/" + position.pair.id} className="truncate hover:text-gray-600">
                    <span>{position.pair.token0.symbol + "-" + position.pair.token1.symbol}</span>
                  </Link>
                </div>
                <div className="mt-2">
                  <div className="text-gray-900">{formattedNum(valueUSD, true, true)}</div>
                  <div>
                    {formattedNum(poolOwnership * parseFloat(position.pair.reserve0))} {position.pair.token0.symbol}
                  </div>
                  <div>
                    {formattedNum(poolOwnership * parseFloat(position.pair.reserve1))} {position.pair.token1.symbol}
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-green-500">{formattedNum(position?.fees.sum, true, true)}</div>
                  <div>
                    {parseFloat(position.pair.token0.derivedETH)
                      ? formattedNum(
                          position?.fees.sum / (parseFloat(position.pair.token0.derivedETH) * ethPrice) / 2,
                          false,
                          true
                        )
                      : 0}{" "}
                    {position.pair.token0.symbol}
                  </div>
                  <div>
                    {parseFloat(position.pair.token1.derivedETH)
                      ? formattedNum(
                          position?.fees.sum / (parseFloat(position.pair.token1.derivedETH) * ethPrice) / 2,
                          false,
                          true
                        )
                      : 0}{" "}
                    {position.pair.token1.symbol}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 rounded-md bg-gray-100">
            <div className="p-2 flex">
              <button
                type="button"
                className="w-full mr-1 inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Add
              </button>
              <button
                type="button"
                className="w-full ml-1 inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                Remove
              </button>
            </div>
          </div>
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
          <th className="w-1/5 table-cell px-6 py-3 border-b border-gray-200 bg-white text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Fees Earned
          </th>
          <th className="w-1/5 pr-6 py-3 border-b border-gray-200 bg-white text-right text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider" />
        </tr>
      </thead>
    </>
  );
};

const TableRow = ({ position, ethPrice }) => {
  const poolOwnership = position.liquidityTokenBalance / position.pair.totalSupply;
  const valueUSD = poolOwnership * position.pair.reserveUSD;
  //console.log("POSITION:", position);
  return (
    <>
      <tr>
        <td className="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
          <div className="flex items-center space-x-2">
            <div className="flex flex-shrink-0 -space-x-1">
              <img
                className="relative z-30 inline-block h-6 w-6 rounded-full text-white shadow-solid"
                src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${isAddress(
                  position.pair.token0.id
                )}/logo.png`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = logoNotFound;
                }}
              />
              <img
                className="relative z-20 -ml-1 inline-block h-6 w-6 rounded-full text-white shadow-solid"
                src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${isAddress(
                  position.pair.token1.id
                )}/logo.png`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = logoNotFound;
                }}
              />
            </div>
            <div className="flex items-center space-x-3 lg:pl-2">
              {/* <div className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-pink-600" /> */}
              <Link to={"/pair/" + position.pair.id} className="truncate hover:text-gray-600">
                <span>{position.pair.token0.symbol + "-" + position.pair.token1.symbol}</span>
              </Link>
            </div>
          </div>
        </td>
        <td className="table-cell px-6 py-3 whitespace-no-wrap text-sm leading-5 text-gray-500 text-right">
          <div className="text-gray-900">{formattedNum(valueUSD, true, true)}</div>
          <div>
            {formattedNum(poolOwnership * parseFloat(position.pair.reserve0))} {position.pair.token0.symbol}
          </div>
          <div>
            {formattedNum(poolOwnership * parseFloat(position.pair.reserve1))} {position.pair.token1.symbol}
          </div>
        </td>
        <td className="table-cell px-6 py-3 whitespace-no-wrap text-sm leading-5 text-gray-500 text-right">
          <div className="text-green-500">{formattedNum(position?.fees.sum, true, true)}</div>
          <div>
            {parseFloat(position.pair.token0.derivedETH)
              ? formattedNum(
                  position?.fees.sum / (parseFloat(position.pair.token0.derivedETH) * ethPrice) / 2,
                  false,
                  true
                )
              : 0}{" "}
            {position.pair.token0.symbol}
          </div>
          <div>
            {parseFloat(position.pair.token1.derivedETH)
              ? formattedNum(
                  position?.fees.sum / (parseFloat(position.pair.token1.derivedETH) * ethPrice) / 2,
                  false,
                  true
                )
              : 0}{" "}
            {position.pair.token1.symbol}
          </div>
        </td>
        <td className="table-cell px-6 py-3 whitespace-no-wrap text-sm leading-5 text-gray-500 text-right">
          <div>
            <Link
              to={"/remove/"}
              class="font-medium text-orange-600 hover:text-orange-500 transition duration-150 ease-in-out"
            >
              Add
            </Link>
          </div>
          <div>
            <Link
              to={"/remove/"}
              class="font-medium text-orange-600 hover:text-orange-500 transition duration-150 ease-in-out"
            >
              Remove
            </Link>
          </div>
        </td>
        {/* <td className="pr-6">
          <div className="relative flex justify-end items-center">
            <Link
              to={"/add/" + position.pair.token0.id + "/" + position.pair.token1.id}
              class="font-medium text-orange-600 hover:text-orange-500 transition duration-150 ease-in-out"
            >
              Add
            </Link>
          </div>
        </td>
        <td className="pr-6">
          <div className="relative flex justify-end items-center">
            <Link
              to={"/remove/" + position.pair.token0.id + "/" + position.pair.token1.id}
              class="font-medium text-orange-600 hover:text-orange-500 transition duration-150 ease-in-out"
            >
              Remove
            </Link>
          </div>
        </td> */}
      </tr>
    </>
  );
};

export default Table;
