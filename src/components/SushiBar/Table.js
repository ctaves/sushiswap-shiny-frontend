import React from "react";
import SushiLogo from "../../assets/img/logo.png";
import xSushiLogo from "../../assets/icons/xsushi.svg";

const Table = ({ balances, price }) => {
  return (
    <>
      <div className="flex overflow-hidden bg-white">
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          {/* Main content */}
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabIndex={0}>
            <div className="block">
              <div className="align-middle inline-block min-w-full border-b border-gray-200">
                <table className="hidden sm:table min-w-full table-fixed">
                  {/* <TableHead /> */}
                  <tbody className="bg-white divide-y divide-gray-100">
                    {balances &&
                      balances.map((balance) => {
                        return <TableRow balance={balance} />;
                      })}
                  </tbody>
                </table>
                <div className="block sm:hidden">
                  <ul className="divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
                    {balances &&
                      balances.map((balance) => {
                        return <Card balance={balance} />;
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

const Card = ({ balance }) => {
  return (
    <>
      {/* Activity list (smallest breakopoint only) */}
      <li>
        <a href="#" className="block px-4 py-4 bg-white hover:bg-cool-gray-50">
          <div className="flex items-center space-x-4">
            <div className="flex-1 flex space-x-2 truncate">
              <img
                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                src={balance.xsushi ? xSushiLogo : SushiLogo}
                alt="SUSHI"
              />
              <div className="text-left text-cool-gray-500 text-sm truncate">
                <p className="truncate text-gray-800">{balance.title}</p>
                <p>{balance.sushi}</p>
                {balance.xsushi ? <p>{balance.xsushi}</p> : null}
                <p>{balance.usd}</p>
              </div>
            </div>
            <div className="flex">
              {/* Heroicon name: chevron-right */}
              <div>{balance.cta}</div>
              <div>
                <svg
                  className="flex-shrink-0 h-5 w-5 text-cool-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </a>
      </li>
    </>
  );
};

const TableRow = ({ balance }) => {
  return (
    <>
      <tr>
        <td className="px-6 py-3 text-sm leading-5 text-gray-500 font-medium">
          <div className="flex items-center space-x-2">
            <div className="flex flex-shrink-0 -space-x-1">
              <img
                className="max-w-none h-6 w-6 rounded-full text-white shadow-solid"
                src={balance.xsushi ? xSushiLogo : SushiLogo}
                alt="SUSHI"
              />
            </div>
            <div className="flex items-center space-x-3 lg:pl-2">
              {/* <div className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-pink-600" /> */}
              <a href="#" className="truncate hover:text-gray-600">
                <span>
                  {balance.title}
                  {/* <span className="text-gray-500 font-normal">{balance.description}</span> */}
                </span>
              </a>
            </div>
          </div>
        </td>
        <td className="table-cell px-6 py-3 whitespace-no-wrap text-sm leading-5 text-gray-900 text-right">
          <div>{balance.sushi}</div>
          {balance.xsushi ? <div>{balance.xsushi}</div> : null}
        </td>
        <td className="table-cell px-6 py-3 whitespace-no-wrap text-sm leading-5 text-gray-500 text-right">
          {balance.usd}
        </td>
        <td className="pr-6">
          <div className="relative flex justify-end items-center">{balance.cta}</div>
        </td>
      </tr>
    </>
  );
};

export default Table;
