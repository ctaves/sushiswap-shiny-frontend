import React from "react";
import { DashboardContainer } from "../components/Dashboard";

import GlobalStats from "../components/GlobalStats";
//import Search from "../components/Search";
//import { CardLiquidity, CardVolume, CardOnsen } from "../components/Cards";

import Lists from "../components/Lists";
import Articles from "../components/Articles";
import TopMovers from "../components/TopMovers";
import TopEarners from "../components/TopEarners";

import AreaChart from "../components/Chart/Area";
import BarChart from "../components/Chart/Bar";
import { useGlobalChartData } from "../shared/contexts/GlobalData";

import Plugin from "../components/Plugin/Wrapper";

//import Plugin from "../components/Plugin";

const Home = () => {
  const globalChartData = useGlobalChartData("year");
  console.log("globalChartData:", globalChartData);

  return (
    <>
      <DashboardContainer>
        <div className="md:flex" id={"overview-page"}>
          <div className="relative w-full mx-auto sm:px-6 lg:px-6">
            <div className="pt-4 pb-1">
              <GlobalStats />
            </div>

            {/* Grid: Cards */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {globalChartData && globalChartData.length > 0 && (
                <div className="rounded border border-gray-300 shadow p-4">
                  <BarChart height={120} data={globalChartData[0]} timeKey={"date"} valueKey={"dailyVolumeUSD"} />
                </div>
              )}
              {globalChartData && globalChartData.length > 0 && (
                <div className="rounded border border-gray-300 shadow p-4">
                  <AreaChart height={120} data={globalChartData[0]} timeKey={"date"} valueKey={"totalLiquidityUSD"} />
                </div>
              )}
            </div>
            {/* Grid: News and Swap */}
            <div className="grid gap-0 mx-auto lg:grid-cols-5 lg:max-w-none">
              <div className="pt-4 pb-8 lg:pb-20 lg:col-span-3 overflow-x-hidden lg:overflow-visible">
                <div className="lg:mr-4">
                  <div className="pt-4">
                    <Lists />
                    <Articles />
                    <TopMovers />
                    <TopEarners />
                  </div>
                </div>
              </div>
              <div className="hidden 2xl:px-16 lg:block lg:col-span-2">
                <div className="lg:sticky pt-4 top-0">
                  <div className="pt-4">
                    <Plugin initial={"swap"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardContainer>
    </>
  );
};

export default Home;
