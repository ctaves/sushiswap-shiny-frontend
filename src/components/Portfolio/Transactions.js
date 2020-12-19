import React, { useState, useMemo, useEffect } from "react";

import { useActiveWeb3React } from "../../services/exchange/hooks";

import { useUserTransactions } from "../../services/vision/contexts/User";
import TxnList from "../../services/vision/components/TxnList/secondary";
import { formattedNum } from "../../services/vision/utils";

const Transactions = () => {
  const { account } = useActiveWeb3React();
  const transactions = useUserTransactions(account);
  // get data for user stats
  const transactionCount = transactions?.swaps?.length + transactions?.burns?.length + transactions?.mints?.length;
  // get derived totals
  let totalSwappedUSD = useMemo(() => {
    return transactions?.swaps
      ? transactions?.swaps.reduce((total, swap) => {
          return total + parseFloat(swap.amountUSD);
        }, 0)
      : 0;
  }, [transactions]);
  return (
    <>
      <div className="mt-4">
        <div className="max-w-6xl mx-auto">
          <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm leading-5 font-medium text-cool-gray-500 truncate">Total Value Swapped</dt>
                      <dd>
                        <div className="text-lg leading-7 font-medium text-cool-gray-900">
                          {totalSwappedUSD ? formattedNum(totalSwappedUSD, true) : "-"}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm leading-5 font-medium text-cool-gray-500 truncate">Total Fees Paid</dt>
                      <dd>
                        <div className="text-lg leading-7 font-medium text-cool-gray-900">
                          {totalSwappedUSD ? formattedNum(totalSwappedUSD * 0.003, true) : "-"}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm leading-5 font-medium text-cool-gray-500 truncate">Total Transactions</dt>
                      <dd>
                        <div className="text-lg leading-7 font-medium text-cool-gray-900">
                          {transactionCount ? transactionCount : "-"}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="bg-white">
          <div className="p-4">
            <TxnList transactions={transactions} color={"#0e0e23"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Transactions;
