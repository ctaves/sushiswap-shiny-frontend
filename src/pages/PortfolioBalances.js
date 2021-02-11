import React, { useCallback, useEffect, useState } from "react";
import { DashboardContainer } from "../components/Dashboard";

//import Portfolio from "../components/Portfolio";

import sushiData from "@sushiswap/sushi-data";

//web3 methods
import useAllEarnings from "../sushi-hooks/useAllEarnings";
import useAllEarningsAccount from "../sushi-hooks/useAllEarningsAccount";

// subgraph methods
import { masterchef } from "../apollo/client";
import { poolUserQuery } from "../apollo/queries";

// import SushiTable from "../components/Table/Sushi";

const PortfolioBalances = () => {
  const account = String("0xb900Ee43397Bc2829e565DECe3518A02F712Ec33").toLowerCase();
  const [data, setData] = useState();
  const fetchData = useCallback(async () => {
    const results = await Promise.all([
      sushiData.exchange_v1.userPositions({ user_address: account }),
      //sushiData.masterchef.user({ user_address: userAddress }), // has an undefined issue
      masterchef.query({
        query: poolUserQuery,
        variables: { address: account.toLowerCase() },
        fetchPolicy: "cache-first",
      }),
      sushiData.bar.user({ user_address: account }), //sushiData.masterchef.pools(),
      sushiData.sushi.priceUSD(),
    ]);
    console.log("Global Results:", results);
    setData({ positions: results[0], farms: results[1]?.data?.users, sushiBar: results[2], sushiPrice: results[3] });
  }, []);

  const earnings = useAllEarnings();
  const earnings2 = useAllEarningsAccount("0xb900Ee43397Bc2829e565DECe3518A02F712Ec33");

  useEffect(() => {
    fetchData();
  }, []);

  console.log("portfolio_data:", data, earnings);

  return (
    <>
      <DashboardContainer></DashboardContainer>
    </>
  );
};

export default PortfolioBalances;
