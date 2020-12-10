import React from "react";
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

import { useActiveWeb3React } from "../../services/exchange/hooks";

import CountUp from "react-countup";
import Table from "./Table";
import StakeSushi from "./StakeSushi";
import UnstakeSushi from "./UnstakeSushi";

const Account = () => {
  //   const { loading, error, data: { bundles } = {} } = useQuery(ethPriceQuery, {
  //     pollInterval: 60000,
  //   });
  //   console.log("Loading:", loading);
  //   console.log("Error:", error);
  //   console.log("Data:", bundles);

  const { account } = useActiveWeb3React();
  const id = account;

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

  console.log("token:", token);
  const { data: { pairs } = {} } = useQuery(pairsQuery);

  const sushiPrice = parseFloat(token?.derivedETH) * parseFloat(bundles?.[0].ethPrice);
  const xSushi = parseFloat(barData?.user?.xSushi);
  const barPending =
    (xSushi * parseFloat(barData?.user?.bar?.sushiStaked)) / parseFloat(barData?.user?.bar?.totalSupply);

  console.log("barPending:", barPending, xSushi, barData?.user?.bar?.sushiStaked, barData?.user?.bar?.totalSupply);
  console.log("sushiPrice:", sushiPrice, token, parseFloat(token?.derivedETH), parseFloat(bundles?.[0].ethPrice));
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

  console.log("ACCOUNTS:", account, id);
  console.log("INVESTMENTS:", investments, farmingStaked, barPendingUSD, farmingPending);

  const balances = [
    // {
    //   title: "Harvestable",
    //   sushi: (
    //     <div className="text-right">
    //       <CountUp start={start} end={end} decimals={end < 0 ? 4 : end > 1e5 ? 0 : 4} duration={1} separator="," />{" "}
    //       SUSHI
    //     </div>
    //   ),
    //   usd: (
    //     <div className="text-right text-gray-500">
    //       $
    //       <CountUp
    //         start={start * priceUSD}
    //         end={end * priceUSD}
    //         decimals={end < 0 ? 2 : end > 1e5 ? 0 : 2}
    //         duration={1}
    //         separator=","
    //       />
    //     </div>
    //   ),
    //   cta: (
    //     <Link
    //       to="/weekly"
    //       class="font-medium text-orange-600 hover:text-orange-700 transition duration-150 ease-in-out"
    //     >
    //       Harvest
    //     </Link>
    //   ),
    // },
    {
      title: "Locked (2/3)",
      sushi: "[Feature Under Construction]",
      usd: "[Feature Under Construction]",
      cta: (
        <a
          href="https://docs.sushiswap.fi"
          target="_blank"
          class="font-medium text-orange-600 hover:text-orange-700 transition duration-150 ease-in-out"
        >
          Learn more
        </a>
      ),
    },
    // {
    //   title: "Unstaked",
    //   sushi: totalNotStaked ? `${Number(getBalanceNumber(totalNotStaked)).toFixed(4)} SUSHI` : "",
    //   usd: totalNotStakedUSD,
    //   cta: <StakeSushi />,
    // },
    {
      title: "Staked",
      sushi: `${decimalFormatter.format(barStaked)} SUSHI`,
      xsushi: `${Number(xSushi.toFixed(2)).toLocaleString()} xSUSHI`,
      usd: `${currencyFormatter.format(barStakedUSD)}`,
      cta: <UnstakeSushi />,
    },
  ];
  return (
    <>
      <Table
        balances={balances}
        price={sushiPrice}
        //totalSushiBalance={totalSushiBalance}
        //totalSushiBalanceUSD={totalSushiBalanceUSD}
      />

      <div>{currencyFormatter.format(investments)}</div>
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
      </div>
    </>
  );
};

export default Account;
