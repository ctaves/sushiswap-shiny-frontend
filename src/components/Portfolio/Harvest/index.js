import React, { useCallback, useEffect, useState } from "react";
import { useActiveWeb3React } from "../../../services/exchange/hooks";
import { getEarnedWithProps, getMasterChefContract, getFarms } from "../../../services/frontend/sushi/utils";
import useSushi from "../../../services/frontend/hooks/useSushi";
import useBlock from "../hooks/useBlock";
import useReward from "../hooks/useReward";

import { client } from "../../../apollo/client";
import { SUSHI_PAIRS } from "../../../apollo/queries";

import CoinLoader from "../../CoinLoader";
import DoubleToken from "../../DoubleToken";
import { Chevron } from "../../Loading";
import { formattedNum } from "../../../services/vision/utils";

//import sushiData from "@sushiswap/sushi-data";
import _ from "lodash";

//import { contractAddresses } from "../../../services/frontend/sushi/lib/constants";
//import { useTokenData } from "../../../services/vision/contexts/TokenData";
//import { formattedNum } from "../../../services/vision/utils";
//import { getBalanceNumber } from "../../../services/frontend/utils/formatBalance";

const Harvest = () => {
  //const [pools, setPools] = useState(undefined);
  const [balances, setBalance] = useState(undefined);
  const { account } = useActiveWeb3React();
  const sushi = useSushi();
  const farms = getFarms(sushi);
  const masterChefContract = getMasterChefContract(sushi);
  const block = useBlock();

  const fetchAllBalances = useCallback(async () => {
    // get balances for all farms
    const results = await Promise.all(farms.map((farm) => getEarnedWithProps(masterChefContract, farm, account)));
    //console.log("BALANCES_:", balances);

    // remove farms with no pending balance
    const hasBalance = _.filter(results, function(farm) {
      return Number(farm.pending) > 0;
    });
    console.log("HAS_BALANCE:", hasBalance);
    //setBalance(hasBalance);

    // fetch pair details like token address, etc
    const lpTokens = _.map(hasBalance, function(farm) {
      return farm.lpTokenAddress.toLowerCase();
    });
    console.log("LPTOKENS_:", lpTokens);
    const chefAddress = "0xc2edad668740f1aa35e4d8f227fb8e17dca888cd";
    const poolDetails = await client.query({
      query: SUSHI_PAIRS(lpTokens, chefAddress),
      fetchPolicy: "cache-first",
    });
    const details = poolDetails?.data?.pairs;
    console.log("DETAILS:", details);

    // combine details with farms
    const mergeDetails = _.map(hasBalance, function(farm) {
      return _.merge(farm, _.find(details, { id: farm.lpTokenAddress.toLowerCase() }));
    });
    console.log("MERGED:", mergeDetails);
    setBalance(mergeDetails);
  }, [account, masterChefContract, sushi]);

  useEffect(() => {
    // const fetchPools = async () => {
    //   const result = await sushiData.masterchef.pools();
    //   setPools(result);
    // };
    // fetchPools();
    if (account && masterChefContract && sushi) {
      fetchAllBalances();
    }
  }, [account, block, masterChefContract, setBalance, sushi]);
  return (
    <>
      <fieldset>
        <ul className="mt-4 space-y-4" role="radiogroup" aria-labelledby="radiogroup-label">
          {balances ? (
            balances.map((balance) => {
              //console.log("token:", state?.selectedLPToken.address, token?.address);
              return <LPTokenItem key={balance.lpTokenAddress} balance={balance} />;
            })
          ) : (
            <CoinLoader size={"xs"} />
          )}
        </ul>
      </fieldset>
    </>
  );
};

const LPTokenItem = ({ balance, selected, onSelectToken }) => {
  const { account } = useActiveWeb3React();
  const [pendingTx, setPendingTx] = useState(false);
  const { onReward } = useReward(balance.pid);
  // console.log("TOKEN:", token, token.balance.toNumber(), selected);
  // const balance = formatBalance(token.balance, token.decimals, 6);
  // const onClick = useCallback(() => {
  //   onSelectToken(token);
  // }, [onSelectToken, token]);
  return (
    <>
      <li
        // selected={selected}
        disabled={!balance.pending || pendingTx}
        onClick={async () => {
          setPendingTx(true);
          await onReward();
          setPendingTx(false);
        }}
        role="radio"
        className="group relative rounded-md shadow-sm cursor-pointer focus:outline-none focus:shadow-outline-blue"
      >
        <div className="rounded-md border border-gray-300 bg-white px-4 py-4 hover:border-gray-400 group-focus:border-blue-300 sm:flex sm:justify-between sm:space-x-4">
          <div className="flex flex-shrink-0 -space-x-1">
            <DoubleToken tokenA={balance.token0.id} tokenB={balance.token1.id} />
          </div>
          <div className="flex-1 min-w-0 mt-2 sm:m-0">
            <a href="#" className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <div className="flex">
                <p className="text-base font-medium text-gray-900">
                  {balance.token0.symbol}-{balance.token1.symbol}
                </p>
                <p className="text-base text-gray-800 truncate ml-auto">
                  {formattedNum(balance.pending, false, false)} SUSHI
                </p>
                <Chevron loading={pendingTx} />
              </div>
            </a>
          </div>
        </div>
        {/* selected: "border-indigo-500", not-selected: "border-transparent" */}
        <div
          className={
            (selected ? "border-indigo-500" : "border-transparent") +
            " absolute inset-0 rounded-lg border-2 pointer-events-none"
          }
        />
      </li>
    </>
  );
};

export default Harvest;
