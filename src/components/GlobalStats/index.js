import React, { useEffect, useState } from "react";

import { Loader } from "../Loading";

import { formattedNum } from "../utils";
import sushiData from "@sushiswap/sushi-data";

const GlobalStats = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      // get sushi price in usd
      const sushiPrice = await sushiData.sushi.priceUSD();

      // get liquidity, volume, pairsCount
      const factory = await sushiData.exchange.factory();

      const state = {
        sushi: sushiPrice,
        liquidity: factory.liquidityUSD,
        volume: factory.volumeUSD,
        fees: factory.volumeUSD * 0.003,
        pairs: factory.pairCount,
      };

      sushiData.bar
        .user({ user_address: "0x6684977bbed67e101bb80fc07fccfba655c0a64f" })
        .then((user) => console.log(user));

      setStats(state);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-nowrap whitespace-nowrap space-x-4 overflow-x-auto lg:mx-auto">
        <div className="font-semibold whitespace-nowrap">
          SUSHI: <span className="font-light">{stats.sushi ? formattedNum(stats.sushi, true) : <Loader />}</span>
        </div>
        <div className="font-semibold whitespace-nowrap">
          Liquidity:{" "}
          <span className="font-light">{stats.liquidity ? formattedNum(stats.liquidity, false) : <Loader />}</span>
        </div>
        <div className="font-semibold whitespace-nowrap">
          Total Volume:{" "}
          <span className="font-light">{stats.volume ? formattedNum(stats.volume, false) : <Loader />}</span>
        </div>
        <div className="font-semibold whitespace-nowrap">
          Total Fees: <span className="font-light">{stats.fees ? formattedNum(stats.fees, false) : <Loader />}</span>
        </div>
        <div className="font-semibold whitespace-nowrap">
          Pairs: <span className="font-light">{stats.pairs ? formattedNum(stats.pairs, false) : <Loader />}</span>
        </div>
      </div>
    </>
  );
};

export default GlobalStats;
