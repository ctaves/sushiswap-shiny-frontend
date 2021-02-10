import React, { useState, useCallback, useEffect } from "react";
import sushiData from "@sushiswap/sushi-data";

// import { client } from "../../apollo/client";
// import {
//   TOKEN_DATA,
//   FILTERED_TRANSACTIONS,
//   TOKEN_CHART,
//   TOKENS_CURRENT,
//   TOKENS_DYNAMIC,
//   PRICES_BY_BLOCK,
// } from "../../apollo/queries";

const Portfolio = () => {
  const userAddress = String("0x8867eF1593F6A72DbbB941D4D96b746A4da691B2").toLowerCase();

  const [data, setData] = useState();

  const fetchData = useCallback(async () => {
    const results = await Promise.all([
      sushiData.exchange_v1.userPositions({ user_address: userAddress }),
      //sushiData.masterchef.user({ user_address: userAddress }),
      // client.query({
      //   query: PAIRS_BULK,
      //   variables: {
      //     allPairs: pairList,
      //   },
      //   fetchPolicy: "cache-first",
      // }),
      sushiData.bar.user({ user_address: userAddress }), //sushiData.masterchef.pools(),
    ]);
    console.log("Global Results:", results);
    setData({ positions: results[0], farms: results[1], sushiBar: results[2] });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  console.log("data:", data);
  return <></>;
};

export default Portfolio;
