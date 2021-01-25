import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Layout";
import Plugin from "../components/Plugin/StandaloneWithState";
import Background from "../assets/illustrations/swap_background_1d.svg";
import MobileNavigation from "../components/MobileNavigation";

import PairChart from "../services/vision/components/PairChart/secondaryWithState";

import TopMovers from "../services/vision/components/TokenList/TopMovers";
import { useAllTokenData } from "../services/vision/contexts/TokenData";
import { useAllPairData } from "../services/vision/contexts/PairData";

import TxnList from "../services/vision/components/TxnList/allTransactions";
import { getAllPairTransactions } from "../services/vision/contexts/PairData";
import { useInterval } from "../shared/hooks/useInterval";

import useMenu from "../shared/hooks/useMenu";

const Initialize = () => {
  const allTokens = useAllTokenData();
  const allPairs = useAllPairData();

  return <Page allTokens={allTokens} allPairs={allPairs} />;
};

const Page = ({ allTokens, allPairs }) => {
  const mobileMenu = useMenu();
  const [selectedTokens, setSelectedTokens] = useState({ tokenA: undefined, tokenB: "ETH" });
  const [selectedView, setSelectedView] = useState({ tab: "swap", chartView: "Rate 0" });
  //console.log("selectedTokens:", selectedTokens);

  return (
    <>
      <div className="h-screen flex overflow-hidden bg-white">
        <Sidebar />
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main
            className="lg:mt-4 lg:mr-4 lg:p-4 lg:bg-gray-200 lg:rounded-lg flex-1 relative z-0 overflow-y-auto focus:outline-none"
            tabIndex={0}
            style={{
              background: `url(${Background})`,
              backgroundSize: "cover",
            }}
          >
            <div className="z-10 mx-auto md:p-10 lg:mx-0 lg:px-12 md:py-6 pb-16">
              <div className="w-full grid gap-6 grid-col-1 md:grid-cols-10">
                <div className="col-span-1 md:col-span-4">
                  <Plugin
                    currencyIdB={"ETH"}
                    setTokens={setSelectedTokens}
                    tokens={selectedTokens}
                    selectedView={selectedView}
                    setSelectedView={setSelectedView}
                  />
                  <div className="mt-4 bg-white rounded-md border-2 border-gray-900 py-4 px-2">
                    <TopMovers tokens={allTokens} itemMax={5} />
                  </div>
                </div>
                <div className="col-span-1 md:col-span-6">
                  <div className="relative bg-white rounded-md border-2 border-gray-900 pt-20 pb-8 px-8">
                    <FindPairWrapper
                      tokens={selectedTokens}
                      allPairs={allPairs}
                      selectedView={selectedView}
                      setSelectedView={setSelectedView}
                    />
                  </div>
                  <div className="mt-4 bg-white rounded-md border-2 border-gray-900 py-4 px-8">
                    <TransactionsInterval />
                  </div>
                </div>
              </div>
              {/* <div className="w-full grid gap-6 grid-cols-10">
                <div className="col-span-4">
                  <div className="bg-white rounded-md border-2 border-gray-900 py-4 px-2">
                    <TopMovers tokens={allTokens} itemMax={5} />
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="bg-white rounded-md border-2 border-gray-900 py-4 px-8">
                    <TransactionsInterval />
                  </div>
                </div>
              </div> */}
            </div>
          </main>
        </div>
        <MobileNavigation changeMenu={mobileMenu.change} isOpen={mobileMenu.isOpen} />
      </div>
    </>
  );
};

const FindPairWrapper = ({ tokens, allPairs, selectedView, setSelectedView }) => {
  //console.log("allPairs:", allPairs);

  // could be more efficient
  // find if valid pair exists

  const pair = Object.keys(allPairs).filter((pairAddress) => {
    const tokenA =
      tokens.tokenA === "ETH"
        ? String("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2").toLowerCase()
        : String(tokens.tokenA).toLowerCase();
    const tokenB =
      tokens.tokenB === "ETH"
        ? String("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2").toLowerCase()
        : String(tokens.tokenB).toLowerCase();
    const combinations = [allPairs[pairAddress]?.token0?.id, allPairs[pairAddress]?.token1?.id];
    //console.log("pairing:", pairAddress, tokenA, tokenB, combinations);
    return combinations.includes(tokenA) && combinations.includes(tokenB);
  });

  //console.log("selectedView:", selectedView);
  console.log("pair:", allPairs[pair[0]]);

  const base0 = pair && pair.length > 0 ? allPairs?.[pair[0]]?.reserve1 / allPairs?.[pair[0]]?.reserve0 : undefined;
  const base1 = pair && pair.length > 0 ? allPairs?.[pair[0]]?.reserve0 / allPairs?.[pair[0]]?.reserve1 : undefined;
  return (
    <>
      <PairChart
        address={pair[0]}
        color={"#27B0E6"}
        chartFilter={selectedView}
        setchartFilter={setSelectedView}
        base0={base0}
        base1={base1}
      />
      ,
    </>
  );
};

const TransactionsInterval = () => {
  const [transactions, setTransactions] = useState();
  useInterval(() => {
    async function checkForTxns() {
      let txns = await getAllPairTransactions();
      setTransactions(txns);
    }
    checkForTxns();
  }, 3000);

  console.log("transactions:", transactions);

  return <> {transactions && <TxnList transactions={transactions} color={"#0090a6"} />}</>;
};

// const TxFeed = () => {
//   useEffect(() => {
//     async function fetchData() {
//       const feedData = await axios.get("https://sushipro.io/inc/load.php?data=9");
//       console.log("feedData:", feedData);
//     }
//     fetchData();
//   }, []);
//   return (
//     <>
//       <div className="flex-1 py-3 flex flex-col justify-between">
//         <div className="px-4 pb-2 relative border-b border-gray-700 space-y-3 pb-0">
//           <div className="space-y-3 flex items-center justify-between space-y-0">
//             <h3 className="text-base leading-6 font-medium text-gray-400">Market - Last trades on SushiSwap</h3>
//           </div>
//         </div>
//         {/* <table id="all_last_transactions" border="0" style="width:100%;font-size:11px;"></table> */}
//         {/* <div className="px-4 flex-col mt-4" id="all_last_transactions">
//           <div className="flex justify-between">
//             <div className="text-xs text-white">23:00:12</div>
//             <div className="text-xs text-white">10000 DAI</div>
//             <div className="text-xs text-white">50000 ETH</div>
//             <div className="text-xs text-blue-trader">$60,000</div>
//           </div>
//           <div className="flex justify-between">
//             <div className="text-xs text-white">23:00:12</div>
//             <div className="text-xs text-white">10000 DAI</div>
//             <div className="text-xs text-white">50000 ETH</div>
//             <div className="text-xs text-blue-trader">$60,000</div>
//           </div>
//           <div className="flex justify-between">
//             <div className="text-xs text-white">23:00:12</div>
//             <div className="text-xs text-white">10000 DAI</div>
//             <div className="text-xs text-white">50000 ETH</div>
//             <div className="text-xs text-blue-trader">$60,000</div>
//           </div>
//         </div> */}
//       </div>
//     </>
//   );
// };

export default Initialize;
