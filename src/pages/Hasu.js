import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Layout";
import CardTokenActions from "../components/Plugin/Standalone";
import Background from "../assets/illustrations/swap_background_1d.svg";
import MobileNavigation from "../components/MobileNavigation";

import PairChart from "../services/vision/components/PairChart/secondary";

import TopMovers from "../services/vision/components/TokenList/TopMovers";
import { useAllTokenData } from "../services/vision/contexts/TokenData";

import axios from "axios";
//import $ from "jquery";

//import Snowfall from "../components/Snowfall";

import useMenu from "../shared/hooks/useMenu";

const Swap = () => {
  const mobileMenu = useMenu();
  const [selectedPairs, setSelectedPairs] = useState({ token0: undefined, token1: "ETH" });
  const allTokens = useAllTokenData();

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
              <div className="w-full grid gap-8 grid-cols-10">
                <div className="col-span-4">
                  <CardTokenActions initialSection={"swap"} currencyIdB={"ETH"} />
                </div>
                <div className="col-span-6">
                  <div className="bg-white rounded-md border-2 border-gray-900 pt-20 pb-8 px-8">
                    <PairChart address={"0x795065dcc9f64b5614c407a6efdc400da6221fb0"} color={"#27B0E6"} />
                  </div>
                </div>
              </div>
              <div className="w-full grid gap-8 grid-cols-10">
                <div className="col-span-4">
                  <div className="bg-white rounded-md border-2 border-gray-900 py-4 px-2">
                    <TopMovers tokens={allTokens} itemMax={5} />
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="bg-white rounded-md border-2 border-gray-900 py-2 px-2">
                    <TxFeed />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <MobileNavigation changeMenu={mobileMenu.change} isOpen={mobileMenu.isOpen} />
      </div>
    </>
  );
};

const TxFeed = () => {
  useEffect(() => {
    async function fetchData() {
      const feedData = await axios.get("https://sushipro.io/inc/load.php?data=9");
      console.log("feedData:", feedData);
    }
    fetchData();
  }, []);
  return (
    <>
      <div className="flex-1 py-3 flex flex-col justify-between">
        <div className="px-4 pb-2 relative border-b border-gray-700 space-y-3 pb-0">
          <div className="space-y-3 flex items-center justify-between space-y-0">
            <h3 className="text-base leading-6 font-medium text-gray-400">Market - Last trades on SushiSwap</h3>
          </div>
        </div>
        {/* <table id="all_last_transactions" border="0" style="width:100%;font-size:11px;"></table> */}
        {/* <div className="px-4 flex-col mt-4" id="all_last_transactions">
          <div className="flex justify-between">
            <div className="text-xs text-white">23:00:12</div>
            <div className="text-xs text-white">10000 DAI</div>
            <div className="text-xs text-white">50000 ETH</div>
            <div className="text-xs text-blue-trader">$60,000</div>
          </div>
          <div className="flex justify-between">
            <div className="text-xs text-white">23:00:12</div>
            <div className="text-xs text-white">10000 DAI</div>
            <div className="text-xs text-white">50000 ETH</div>
            <div className="text-xs text-blue-trader">$60,000</div>
          </div>
          <div className="flex justify-between">
            <div className="text-xs text-white">23:00:12</div>
            <div className="text-xs text-white">10000 DAI</div>
            <div className="text-xs text-white">50000 ETH</div>
            <div className="text-xs text-blue-trader">$60,000</div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Swap;
