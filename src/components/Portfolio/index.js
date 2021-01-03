/* eslint-disable no-unused-expressions */

import React, { useEffect, useState } from "react";
//import { Link } from "react-router-dom";

// Analytics
import {
  barUserQuery,
  blockQuery,
  currencyFormatter,
  decimalFormatter,
  ethPriceQuery,
  getApollo,
  getBarUser,
  getEthPrice,
  getLatestBlock,
  getPairs,
  getPoolUser,
  getSushiToken,
  getToken,
  getUser,
  latestBlockQuery,
  lockupUserQuery,
  pairSubsetQuery,
  pairsQuery,
  poolUserQuery,
  tokenQuery,
  useInterval,
  userIdsQuery,
  userQuery,
} from "../../services/analytics/core";
import { getUnixTime, startOfMinute, startOfSecond } from "date-fns";
import { POOL_DENY } from "../../services/analytics/core/constants";
import { toChecksumAddress } from "web3-utils";
import { useQuery } from "@apollo/client";

// Layout
import TableSushi from "./Tables/Sushi";
import TableFarms from "./Tables/Farms";
import TableTotal from "./Tables/Total";
import TableLP from "./Tables/LiquidityPositions";

// Wallet integration
import { useActiveWeb3React } from "../../services/exchange/hooks";
import { Linker, Button } from "../Linker";

// Classic dependancies
import BigNumber from "bignumber.js";
import CountUp from "react-countup";
import StakeSushi from "./StakeSushi";
import UnstakeSushi from "./UnstakeSushi";

import useTokenBalance from "./hooks/useTokenBalance";
import useAllEarnings from "./hooks/useAllEarnings";
import useAllStakedValue from "./hooks/useAllStakedValue";
import useFarms from "../../services/frontend/hooks/useFarms";

import { contractAddresses } from "../../services/frontend/sushi/lib/constants";
import { useTokenData } from "../../services/vision/contexts/TokenData";
import { formattedNum } from "../../services/vision/utils";
import { getBalanceNumber } from "../../services/frontend/utils/formatBalance";

// vision dependancies
import { useEthPrice } from "../../services/vision/contexts/GlobalData";
import { client } from "../../services/vision/apollo/client";
import { USER_POSITIONS, USER_HISTORY } from "../../services/vision/apollo/queries";
import { getLPReturnsOnPair } from "../../services/vision/utils/returns";
import { FEE_WARNING_TOKENS } from "../../services/vision/constants";

// modals
import HarvestModal from "./Harvest/Modal";
import LockedModal from "./Modals/Locked";
import useModal from "../../shared/hooks/useModal";

import _ from "lodash";

const Account = () => {
  const { account } = useActiveWeb3React();
  const { ethereum } = window;
  console.log("ethereum:", ethereum, account);
  //const { account } = useActiveWeb3React();
  const id = account;

  // GET USER SNAPSHOTS
  const [snapshots, setSnapshots] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        let skip = 0;
        let allResults = [];
        let found = false;
        while (!found) {
          let result = await client.query({
            query: USER_HISTORY,
            variables: {
              skip: skip,
              user: account.toLowerCase(),
            },
            fetchPolicy: "cache-first",
          });

          //console.log("LP SNAPSHOT:", result.data.liquidityPositionSnapshots);

          allResults = allResults.concat(result.data.liquidityPositionSnapshots);
          if (result.data.liquidityPositionSnapshots.length < 1000) {
            found = true;
          } else {
            skip += 1000;
          }
        }
        if (allResults) {
          setSnapshots(allResults);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [account]);

  // Get Unstaked Liquidity Positions
  const [ethPrice] = useEthPrice();
  const [positions, setPositions] = useState();
  useEffect(() => {
    async function fetchData(account) {
      try {
        let result = await client.query({
          query: USER_POSITIONS,
          variables: {
            user: account.toLowerCase(),
          },
          fetchPolicy: "no-cache",
        });
        if (result?.data?.liquidityPositions) {
          let formattedPositions = await Promise.all(
            result?.data?.liquidityPositions.map(async (positionData) => {
              const returnData = await getLPReturnsOnPair(account, positionData.pair, ethPrice, snapshots);
              return {
                ...positionData,
                ...returnData,
              };
            })
          );
          setPositions(formattedPositions);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData(account);
  }, [account, snapshots]);

  //console.log("POSITIONS:", positions);
  //console.log("SNAPSHOTS:", snapshots);

  // Get Sushi Price in USD
  const { priceUSD } = useTokenData("0x6b3595068778dd592e39a122f4f5a5cf09c90fe2");

  // Get users # of Sushi not staked
  const totalNotStaked = useTokenBalance(contractAddresses.sushi[1]);
  const totalNotStakedUSD = priceUSD ? formattedNum(getBalanceNumber(totalNotStaked) * priceUSD, true) : "";
  console.log("totalNotStaked", totalNotStaked);

  // Get all pending Sushi from farms
  const allEarnings = useAllEarnings();
  let sumEarning = 0;
  for (let earning of allEarnings) {
    sumEarning += new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber();
  }
  const [farms] = useFarms();
  const allStakedValue = useAllStakedValue();
  if (allStakedValue && allStakedValue.length) {
    const sumWeth = farms.reduce((c, { id }, i) => c + (allStakedValue[i].totalWethValue.toNumber() || 0), 0);
  }

  // Initialize Analytics Queries -------------------------------------------//

  const { data: { bundles } = {} } = useQuery(ethPriceQuery, {
    pollInterval: 60000,
  });
  const { data: barData } = useQuery(barUserQuery, {
    variables: {
      id: id.toLowerCase(),
    },
    context: {
      clientName: "bar",
    },
  });
  const { data: poolData } = useQuery(poolUserQuery, {
    variables: {
      address: id.toLowerCase(),
    },
    context: {
      clientName: "masterchef",
    },
  });
  const { data: lockupData } = useQuery(lockupUserQuery, {
    variables: {
      address: id.toLowerCase(),
    },
    context: {
      clientName: "lockup",
    },
  });
  const poolUsers = poolData?.users.filter(
    (user) => user.pool && !POOL_DENY.includes(user.pool.id) && user.pool.allocPoint !== "0"
  );
  const { data: { token } = {} } = useQuery(tokenQuery, {
    variables: {
      id: "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2",
    },
  });

  //console.log("token:", token);
  const { data: { pairs } = {} } = useQuery(pairsQuery);

  // Sushi Price
  const sushiPrice = parseFloat(token?.derivedETH) * parseFloat(bundles?.[0].ethPrice);
  // Amount of Staked Sushi (xSUSHI)
  const xSushi = parseFloat(barData?.user?.xSushi);
  //
  const barPending =
    (xSushi * parseFloat(barData?.user?.bar?.sushiStaked)) / parseFloat(barData?.user?.bar?.totalSupply);

  //console.log("barPending:", barPending, xSushi, barData?.user?.bar?.sushiStaked, barData?.user?.bar?.totalSupply);
  //console.log("sushiPrice:", sushiPrice, token, parseFloat(token?.derivedETH), parseFloat(bundles?.[0].ethPrice));
  const xSushiTransfered =
    barData?.user?.xSushiIn > barData?.user?.xSushiOut
      ? parseFloat(barData?.user?.xSushiIn) - parseFloat(barData?.user?.xSushiOut)
      : parseFloat(barData?.user?.xSushiOut) - parseFloat(barData?.user?.xSushiIn);

  const stakedTransferProportion = parseFloat(
    (barData?.user?.sushiStaked / (xSushi + xSushiTransfered)) * xSushiTransfered
  );
  const stakedUSDTransferProportion = parseFloat(
    (barData?.user?.sushiStakedUSD / (xSushi + xSushiTransfered)) * xSushiTransfered
  );
  const barStaked = barData?.user?.sushiStaked;
  const barStakedUSD = barData?.user?.sushiStakedUSD;
  const farmingStaked = poolUsers?.reduce((previousValue, currentValue) => {
    // console.log(currentValue);
    const pair = pairs?.find((pair) => pair?.id == currentValue?.pool?.pair);
    if (!pair) {
      return previousValue;
    }
    // console.log(currentValue?.pool?.pair);
    const share = currentValue.amount / currentValue?.pool?.balance;
    return previousValue + pair?.reserveUSD * share;
  }, 0);
  const farmingPending =
    poolUsers?.reduce((previousValue, currentValue) => {
      return (
        previousValue +
        ((currentValue.amount * currentValue.pool.accSushiPerShare) / 1e12 - currentValue.rewardDebt) / 1e18
      );
    }, 0) * sushiPrice;
  const poolInvestments = poolData?.users.reduce((previousValue, currentValue) => {
    return parseFloat(previousValue) + parseFloat(currentValue.entryUSD);
  }, 0);
  const originalInvestments = parseFloat(barData?.user?.sushiStakedUSD) + parseFloat(poolInvestments);
  const barPendingUSD = barPending > 0 ? barPending * sushiPrice : 0;

  console.log("barPendingUSD:", barPendingUSD, barPending, sushiPrice);
  const barRoiSushi =
    parseFloat(barData?.user?.sushiHarvested) -
    parseFloat(barData?.user?.sushiStaked) -
    parseFloat(barData?.user?.sushiOut) +
    // parseFloat(barData?.user?.sushiIn) +
    barPending;
  const barRoiUSD =
    barData?.user?.sushiHarvestedUSD - barData?.user?.sushiStakedUSD - barData?.user?.usdOut + barPendingUSD;
  const { data: blocksData } = useQuery(latestBlockQuery, {
    context: {
      clientName: "blocklytics",
    },
  });
  const blockDifference = parseInt(blocksData?.blocks[0].number) - parseInt(barData?.user?.createdAtBlock);
  const barRoiDailySushi = ((barPending + barRoiSushi - barStaked) / blockDifference) * 6440;
  const investments = farmingStaked + barPendingUSD + farmingPending;

  //console.log("ACCOUNTS:", account, id);
  //console.log("INVESTMENTS:", investments, farmingStaked, barPendingUSD, farmingPending);

  let farmBalances = [];

  // causes no-used-expression warning, see eslint disabling at top of file
  poolUsers?.map((user) => {
    const pair = pairs?.find((pair) => pair?.id == user.pool.pair);
    const slp = Number(user.amount / 1e18);
    const share = user.amount / user.pool.balance;
    const token0 = pair?.reserve0 * share;
    const token1 = pair?.reserve1 * share;
    const pendingSushi = ((user.amount * user.pool.accSushiPerShare) / 1e12 - user.rewardDebt) / 1e18;
    const lockupUser = lockupData?.users.find((u) => u.pool.id === user.pool.id);
    const sushiAtLockup = lockupUser
      ? ((lockupUser.amount * lockupUser.pool.accSushiPerShare) / 1e12 - lockupUser.rewardDebt) / 1e18
      : 0;
    const sushiLocked = (parseFloat(user.sushiHarvestedSinceLockup) + pendingSushi - sushiAtLockup) * 2;
    const sushiLockedUSD = sushiLocked * sushiPrice;

    //console.log("USER:", user);
    //console.log("PAIR:", pair);

    farmBalances.push({
      name: pair?.token0.symbol + "-" + pair?.token1.symbol,
      slp: decimalFormatter.format(slp),
      token0Address: pair?.token0.id,
      token0Symbol: pair?.token0.symbol,
      token0Balance: decimalFormatter.format(token0),
      token1Address: pair?.token1.id,
      token1Symbol: pair?.token1.symbol,
      token1Balance: decimalFormatter.format(token1),
      valueUSD: pair?.reserveUSD * share,
      pendingSushi: decimalFormatter.format(pendingSushi),
      pendingSushiUSD: currencyFormatter.format(pendingSushi * sushiPrice),
      harvestedSushi: decimalFormatter.format(user.sushiHarvested),
      harvestedSushiUSD: currencyFormatter.format(user.sushiHarvestedUSD),
      lockedSushi: sushiLocked,
      lockedSushiUSD: sushiLockedUSD,
      entriesUSD: currencyFormatter.format(user.entryUSD),
      exitsUSD: currencyFormatter.format(user.exitUSD),
      profitUSD:
        parseFloat(pair?.reserveUSD * share) +
        parseFloat(user.exitUSD) +
        parseFloat(user.sushiHarvestedUSD) +
        parseFloat(pendingSushi * sushiPrice) -
        parseFloat(user.entryUSD),
    });
  });

  //console.log("FARM BALANCES:", farmBalances);
  //console.log("FARM VALUE: ", _.sumBy(farmBalances, "valueUSD"));

  const totalSushiBalance =
    Number(sumEarning) +
    Number(_.sumBy(farmBalances, "lockedSushi")) +
    Number(getBalanceNumber(totalNotStaked)) +
    Number(barStaked);

  // console.log("BALANCES:", {
  //   totalSushiBalance: totalSushiBalance,
  //   sumEarning: sumEarning,
  //   lockedSushi: _.sumBy(farmBalances, "lockedSushi"),
  //   notStaked: getBalanceNumber(totalNotStaked),
  //   staked: Number(barStaked),
  // });

  // initialize modals
  const [onPresentHarvest] = useModal(<HarvestModal />, null, null, null);
  const [onPresentLocked] = useModal(<LockedModal />, null, null, null);

  const balances = [
    {
      title: "Harvestable",
      sushi: formattedNum(sumEarning, false),
      usd: formattedNum(sumEarning * priceUSD, true),
      cta: <Button title="Harvest" onClick={onPresentHarvest} />,
    },
    {
      title: "Locked (2/3)",
      sushi: decimalFormatter.format(_.sumBy(farmBalances, "lockedSushi")) + " SUSHI",
      usd: currencyFormatter.format(_.sumBy(farmBalances, "lockedSushiUSD")),
      cta: <Button title="Learn more" onClick={onPresentLocked} />, //<Linker title="Learn more" to="https://docs.sushiswap.fi" external />,
    },
    {
      title: "Unstaked",
      sushi: totalNotStaked ? `${Number(getBalanceNumber(totalNotStaked)).toFixed(4)} SUSHI` : "",
      usd: totalNotStakedUSD,
      cta: <StakeSushi />,
    },
    {
      title: "Staked",
      sushi: `${decimalFormatter.format(barStaked)} SUSHI`,
      xsushi: `${Number(xSushi.toFixed(2)).toLocaleString()} xSUSHI`,
      usd: `${currencyFormatter.format(barStakedUSD)}`,
      cta: <UnstakeSushi />,
    },
  ];

  // console.log("formatted:", totalSushiBalance, formattedNum(totalSushiBalance), formattedNum(totalSushiBalance, true));
  // console.log(
  //   "formatted:",
  //   totalSushiBalance * sushiPrice,
  //   formattedNum(totalSushiBalance * sushiPrice),
  //   formattedNum(totalSushiBalance * sushiPrice, true)
  // );

  let LPBalance = 0;
  positions?.forEach((position) => {
    const poolOwnership = position.liquidityTokenBalance / position.pair.totalSupply;
    const valueUSD = poolOwnership * position.pair.reserveUSD;
    LPBalance = LPBalance + valueUSD;
  });

  const totalBalanceUSD = formattedNum(
    totalSushiBalance * sushiPrice + _.sumBy(farmBalances, "valueUSD") + LPBalance,
    true
  );

  // if any position has token from fee warning list, show warning
  const [showWarning, setShowWarning] = useState(false);
  useEffect(() => {
    if (positions) {
      for (let i = 0; i < positions.length; i++) {
        if (
          FEE_WARNING_TOKENS.includes(positions[i].pair.token0.id) ||
          FEE_WARNING_TOKENS.includes(positions[i].pair.token1.id)
        ) {
          setShowWarning(true);
        }
      }
    }
  }, [positions]);

  return (
    <>
      <TableTotal totalBalanceUSD={totalBalanceUSD} account={account} />
      <TableSushi
        balances={balances}
        price={currencyFormatter.format(sushiPrice)}
        totalSushiBalance={formattedNum(totalSushiBalance)}
        totalSushiBalanceUSD={formattedNum(totalSushiBalance * sushiPrice, true)}
      />
      <TableLP positions={positions} ethPrice={ethPrice} LPBalanceUSD={formattedNum(LPBalance, true)} />
      <TableFarms positions={farmBalances} farmBalanceUSD={formattedNum(_.sumBy(farmBalances, "valueUSD"), true)} />

      {/* <div>{currencyFormatter.format(investments)}</div>
      <div>
        {decimalFormatter.format(barStaked)} SUSHI ({currencyFormatter.format(barStakedUSD)})
      </div>
      <div>{Number(xSushi.toFixed(2)).toLocaleString()} XSUSHI</div>
      <div>
        {Number(barPending.toFixed(2)).toLocaleString()} ({currencyFormatter.format(sushiPrice * barPending)})
      </div>
      <div>
        {decimalFormatter.format(barRoiDailySushi)} ({currencyFormatter.format(barRoiDailySushi * sushiPrice)})
      </div>
      <div>
        {decimalFormatter.format(barRoiDailySushi * 365)} (
        {currencyFormatter.format(barRoiDailySushi * 365 * sushiPrice)})
      </div>
      <div>
        {decimalFormatter.format(barRoiSushi)} ({currencyFormatter.format(barRoiSushi * sushiPrice)})
      </div>
      <div>{currencyFormatter.format(barRoiUSD)}</div>
      <div>
        {poolUsers?.map((user) => {
          const pair = pairs?.find((pair) => pair?.id == user.pool.pair);
          const slp = Number(user.amount / 1e18);

          const share = user.amount / user.pool.balance;

          const token0 = pair?.reserve0 * share;
          const token1 = pair?.reserve1 * share;

          const pendingSushi = ((user.amount * user.pool.accSushiPerShare) / 1e12 - user.rewardDebt) / 1e18;
          const lockupUser = lockupData?.users.find((u) => u.pool.id === user.pool.id);

          const sushiAtLockup = lockupUser
            ? ((lockupUser.amount * lockupUser.pool.accSushiPerShare) / 1e12 - lockupUser.rewardDebt) / 1e18
            : 0;

          const sushiLocked = (parseFloat(user.sushiHarvestedSinceLockup) + pendingSushi - sushiAtLockup) * 2;
          const sushiLockedUSD = sushiLocked * sushiPrice;

          return (
            <>
              <div>
                {pair?.token0.symbol}-{pair?.token1.symbol}
              </div>
              <div>{decimalFormatter.format(slp)} SLP</div>
              <div>
                {decimalFormatter.format(token0)} {pair?.token0.symbol} + {decimalFormatter.format(token1)}{" "}
                {pair?.token1.symbol}
              </div>
              <div>{currencyFormatter.format(pair?.reserveUSD * share)}</div>
              <div>
                {decimalFormatter.format(pendingSushi)} ({currencyFormatter.format(pendingSushi * sushiPrice)})
              </div>
              <div>
                {decimalFormatter.format(user.sushiHarvested)} ({currencyFormatter.format(user.sushiHarvestedUSD)})
              </div>
              <div>
                {decimalFormatter.format(sushiLocked)} ({currencyFormatter.format(sushiLockedUSD)})
              </div>
              <div>{currencyFormatter.format(user.entryUSD)}</div>
              <div>{currencyFormatter.format(user.exitUSD)}</div>
              <div>
                {currencyFormatter.format(
                  parseFloat(pair?.reserveUSD * share) +
                    parseFloat(user.exitUSD) +
                    parseFloat(user.sushiHarvestedUSD) +
                    parseFloat(pendingSushi * sushiPrice) -
                    parseFloat(user.entryUSD)
                )}
              </div>
            </>
          );
        })}
      </div> */}
    </>
  );
};

export default Account;
