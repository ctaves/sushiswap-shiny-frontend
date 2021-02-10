import React, { useState, useEffect } from "react";

import { getFarms } from "./getFarms";
import { getUserFarms } from "./getUserFarms";
import { useActiveWeb3React } from "../../services/exchange/hooks";
import { getApollo } from "../../services/analytics/core/apollo";

import useFuse from "../../shared/hooks/useFuse";
import useSortableData from "../../shared/hooks/useSortableData";

import Filter from "./Filter";
import TableLoading from "./Table/Loading";
import TableAccountWrapper from "./Table/AccountWrapper";
import TableFarms from "./Table";

import ColumnName from "./Columns/Name";
import ColumnPID from "./Columns/PID";
import ColumnRewardsPer1000 from "./Columns/RewardsPer1000";
import ColumnROI from "./Columns/ROI";
import ColumnLiquidity from "./Columns/Liquidity";
import ColumnBalanceSLP from "./Columns/BalanceSLP";
import ColumnStaked from "./Columns/Staked";
import ColumnEarnings from "./Columns/Earnings";
import ColumnActions from "./Columns/ActionsStacked";

// group: "all", "onsen", "upcoming", "previous", "active"

const Farms = ({ group }) => {
  const initialColumns = [
    {
      name: "Farm",
      account: false,
      sortId: "symbol",
      selected: true,
      component: <ColumnName />,
    },
    {
      name: "PID",
      account: false,
      sortId: "id",
      selected: false,
      component: <ColumnPID />,
    },
    {
      name: "Yield per $1,000",
      account: false,
      sortId: "roiPerYear",
      selected: true,
      component: <ColumnRewardsPer1000 />,
    },
    {
      name: "ROI",
      account: false,
      sortId: "roiPerYear",
      selected: true,
      component: <ColumnROI />,
    },
    {
      name: "Liquidity",
      account: false,
      sortId: "tvl",
      selected: true,
      component: <ColumnLiquidity />,
    },
    // {
    //   name: "Balance",
    //   account: true,
    //   sortId: "balance",
    //   selected: true,
    //   component: <ColumnBalance />,
    // },
    {
      name: "Staked",
      account: true,
      sortId: "valueUSD",
      selected: true,
      component: <ColumnStaked />,
    },
    {
      name: "Earnings",
      account: true,
      sortId: "earnings",
      selected: true,
      component: <ColumnEarnings />,
    },
    {
      name: undefined,
      account: true,
      sortId: "",
      selected: true,
      component: <ColumnActions />,
    },
  ];

  const [columns, setColumns] = useState(initialColumns);
  const [farms, setFarms] = useState();
  const [farmsWithUser, setFarmsWithUser] = useState();
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
        const data = await getFarms(client, group);
        console.log("getFarms:", data.length, group, data);
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
        //console.log("getUserFarms:", data);
        setFarmsWithUser(data);
      } catch (e) {
        //console.log("getUserFarms error:", e);
      }
    }
    if (account) {
      fetchData();
    }
  }, [account, farms]);

  // Table Search
  const options = { keys: ["symbol", "name"] };
  const { result, search, term, reset } = useFuse({
    data: farmsWithUser ? farmsWithUser : farms ? farms : [],
    options,
  });
  const flattenSearchResults = result.map((a) => (a.item ? a.item : a));

  // Table Sorting
  const { items, requestSort, sortConfig } = useSortableData(flattenSearchResults);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  //console.log("ITEMS:", items);

  return (
    <>
      {isError && (
        <>
          <Filter search={search} term={term} columns={columns} setColumns={setColumns} />
          <TableAccountWrapper>
            <TableLoading />
          </TableAccountWrapper>
        </>
      )}
      {isLoading ? (
        <>
          <Filter search={search} term={term} columns={columns} setColumns={setColumns} />
          <TableAccountWrapper>
            <TableLoading />
          </TableAccountWrapper>
        </>
      ) : (
        <>
          <Filter search={search} term={term} columns={columns} setColumns={setColumns} />
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
