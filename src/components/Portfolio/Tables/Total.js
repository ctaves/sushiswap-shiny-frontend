import React from "react";
import { shortenAddress } from "../../../services/exchange/utils";

const Table = ({ totalBalanceUSD, account }) => {
  return (
    <>
      <div className="flex overflow-hidden bg-white">
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-8">
            <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap">
              <div className="ml-4 mt-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Total <span className="text-gray-600">({shortenAddress(account)})</span>
                </h3>
              </div>
              <div className="ml-4 mt-4 flex-shrink-0">
                <h3 className="text-lg text-right leading-6 font-medium text-gray-900">{totalBalanceUSD}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
