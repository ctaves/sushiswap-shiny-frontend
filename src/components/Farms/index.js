import React, { useState, useEffect } from "react";

import { getFarms } from "./getFarms";
import { getUserFarms } from "./getUserFarms";
import { useActiveWeb3React } from "../../services/exchange/hooks";
import { getApollo } from "../../services/analytics/core/apollo";

import useFuse from "../../shared/hooks/useFuse";
import useSortableData from "../../shared/hooks/useSortableData";

import TableFilter from "./Table/Filter";
import TableLoading from "./Table/Loading";
import TableAccountWrapper from "./Table/AccountWrapper";
import TableFarms from "./Table";

import ColumnName from "./Columns/Name";
import ColumnRewardsPer1000 from "./Columns/RewardsPer1000";
import ColumnROI from "./Columns/ROI";
import ColumnUnderlyingTokens from "./Columns/UnderlyingTokens";
import ColumnBalance from "./Columns/Balance";
import ColumnEarnings from "./Columns/Earnings";
import ColumnActions from "./Columns/Actions";

const Farms = () => {
  const initialColumns = [
    {
      name: "Pool",
      account: false,
      sortId: "uniswapPair.name",
      selected: true,
      component: <ColumnName />,
    },
    {
      name: "Yield per $1,000",
      account: false,
      sortId: "rewards.hourlyROI",
      selected: true,
      component: <ColumnRewardsPer1000 />,
    },
    {
      name: "ROI",
      account: false,
      sortId: "rewards.hourlyROI",
      selected: true,
      component: <ColumnROI />,
    },
    {
      name: "Underlying Tokens",
      account: false,
      sortId: "balanceUSD",
      selected: true,
      component: <ColumnUnderlyingTokens />,
    },
    {
      name: "Balance",
      account: true,
      sortId: "tokenBalance",
      selected: true,
      component: <ColumnBalance />,
    },
    {
      name: "Earnings",
      account: true,
      sortId: "earnings",
      selected: true,
      component: <ColumnEarnings />,
    },
    {
      name: "",
      account: true,
      sortId: "",
      selected: false,
      component: <ColumnActions />,
    },
  ];

  const [columns, setColumns] = useState(initialColumns);
  const [farms, setFarms] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { account } = useActiveWeb3React();
  const { ethereum } = window;
  const client = getApollo();

  // Fetch Farms
  useEffect(() => {
    async function fetchData() {
      setIsError(false);
      setIsLoading(true);
      try {
        const data = await getFarms(client);
        setFarms(data);
      } catch (e) {
        console.log("getFarms error:", e);
        setIsError(true);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  // If Account, Fetch Farms with User Data
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUserFarms(String(account).toLowerCase(), farms, client);
        console.log("getUserFarms:", data);
        setFarms(data);
      } catch (e) {
        console.log("getUserFarms error:", e);
      }
    }
    if (account) {
      fetchData();
    }
  }, [account]);

  // Table Search
  const options = { keys: ["sushiswapId", "name", "id"] };
  const { result, search, term, reset } = useFuse({ data: farms ? farms : [], options });
  const flattenSearchResults = result.map((a) => (a.item ? a.item : a));

  // Table Sorting
  const { items, requestSort, sortConfig } = useSortableData(flattenSearchResults);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  console.log("ITEMS:", items);

  return (
    <>
      {isError && (
        <>
          <TableFilter search={search} term={term} columns={columns} setColumns={setColumns} />
          <TableAccountWrapper>
            <TableLoading />
          </TableAccountWrapper>
        </>
      )}
      {isLoading ? (
        <>
          <TableFilter search={search} term={term} columns={columns} setColumns={setColumns} />
          <TableAccountWrapper>
            <TableLoading />
          </TableAccountWrapper>
        </>
      ) : (
        <>
          <TableFilter search={search} term={term} columns={columns} setColumns={setColumns} />
          <TableAccountWrapper>
            <TableFarms
              title={"Active Pools on Sushiswap"}
              farms={items}
              columns={columns}
              getClassNamesFor={getClassNamesFor}
              requestSort={requestSort}
            />
          </TableAccountWrapper>
        </>
      )}
    </>
  );
};

export default Farms;
