/* eslint-disable no-unused-expressions */

import React, { useEffect, useState } from "react";

// Overview Stats
import {
  barHistoriesQuery,
  barQuery,
  dayDatasQuery,
  ethPriceQuery,
  factoryQuery,
  tokenQuery,
  currencyFormatter,
  decimalFormatter,
} from "../../services/analytics/core";

import { useQuery } from "@apollo/client";
import { getFactory } from "./getFactory";

// User Stats

import BigNumber from "bignumber.js";
import StakeSushi from "../Portfolio/StakeSushi";
import UnstakeSushi from "../Portfolio/UnstakeSushi";

import useTokenBalance from "../Portfolio/hooks/useTokenBalance";
import useTotalSushiStakedInBar from "../Portfolio/hooks/useTotalSushiStakedInBar";
import useTotalXSushiSupply from "../Portfolio/hooks/useTotalXSushiSupply";
import useAllEarnings from "../Portfolio/hooks/useAllEarnings";
import useAllStakedValue from "../Portfolio/hooks/useAllStakedValue";
import useFarms from "../../services/frontend/hooks/useFarms";

import { contractAddresses } from "../../services/frontend/sushi/lib/constants";
import { useTokenData } from "../../services/vision/contexts/TokenData";
import { formattedNum } from "../../services/vision/utils";
import { getBalanceNumber } from "../../services/frontend/utils/formatBalance";

import TableSushi from "./Table";

// modals
import HarvestModal from "../Portfolio/Harvest/Modal";
import useModal from "../../shared/hooks/useModal";

// Additional Dep
import sushiData from "@sushiswap/sushi-data";
import { useActiveWeb3React } from "../../services/exchange/hooks";
import { Linker, Button } from "../Linker";
import { Loader } from "../Portfolio/Tables/Loader";

const SushiBar = () => {
  const { account } = useActiveWeb3React();

  // initialize modals
  const [onPresentHarvest] = useModal(<HarvestModal />, null, null, null);

  const [user, setUser] = useState();
  const [factory, setFactory] = useState();

  useEffect(() => {
    const fetchData = async () => {
      //const barInfo = await sushiData.bar.info();
      //const makerInfo = await sushiData.maker.info();
      //const servings = await sushiData.maker.servings();
      //const servers = await sushiData.maker.servers();
      if (account) {
        const user = await sushiData.bar.user({ user_address: account });
        setUser(user);
      }
      const factory = await getFactory();
      setFactory(factory);
      //   console.log("barData:", {
      //     user: user,
      //     barInfo: barInfo,
      //     makerInfo: makerInfo,
      //     servings: servings,
      //     servers: servers,
      //     factory: factory,
      //   });
    };
    fetchData();
  }, [getFactory, account]);

  const { data: { bar } = {} } = useQuery(barQuery, {
    context: {
      clientName: "bar",
    },
  });

  const { data: { histories } = {} } = useQuery(barHistoriesQuery, {
    context: {
      clientName: "bar",
    },
  });

  //const { data: { factory } = {} } = useQuery(factoryQuery);

  const { data: { token } = {} } = useQuery(tokenQuery, {
    variables: {
      id: "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2",
    },
  });

  const { data: { bundles } = {} } = useQuery(ethPriceQuery);

  const { data: { dayDatas } = {} } = useQuery(dayDatasQuery);

  const sushiPrice = parseFloat(token?.derivedETH) * parseFloat(bundles?.[0].ethPrice);

  const { sushiStakedUSD, sushiHarvestedUSD, xSushiMinted, xSushiBurned, xSushi, apr, apy, fees } =
    histories?.reduce(
      (previousValue, currentValue) => {
        const date = currentValue?.date * 1000;
        const dayData = dayDatas?.find((d) => d.date === currentValue?.date);
        // previousValue?.["sushiStakedUSD"].push({
        //   date,
        //   value: parseFloat(currentValue?.sushiStakedUSD),
        // });
        // previousValue?.["sushiHarvestedUSD"].push({
        //   date,
        //   value: parseFloat(currentValue?.sushiHarvestedUSD),
        // });
        // previousValue?.["xSushiMinted"].push({
        //   date,
        //   value: parseFloat(currentValue?.xSushiMinted),
        // });
        // previousValue?.["xSushiBurned"].push({
        //   date,
        //   value: parseFloat(currentValue?.xSushiBurned),
        // });
        // previousValue?.["xSushi"].push({
        //   date,
        //   value: parseFloat(currentValue?.xSushiSupply),
        // });
        const apr =
          (((dayData?.volumeUSD * 0.05 * 0.01) / currentValue?.xSushiSupply) * 365) /
          (currentValue?.ratio * sushiPrice);
        previousValue?.["apr"].push({
          date,
          value: parseFloat(apr * 100),
        });
        previousValue?.["apy"].push({
          date,
          value: parseFloat((Math.pow(1 + apr / 365, 365) - 1) * 100),
        });
        previousValue?.["fees"].push({
          date,
          value: parseFloat(dayData?.volumeUSD * 0.05 * 0.01),
        });
        return previousValue;
      },
      {
        //sushiStakedUSD: [],
        //sushiHarvestedUSD: [],
        //xSushiMinted: [],
        //xSushiBurned: [],
        //xSushi: [],
        apr: [],
        apy: [],
        fees: [],
      }
    ) || {};

  const averageApy =
    apy?.reduce((previousValue, currentValue) => {
      return previousValue + currentValue?.value;
    }, 0) / apy?.length;

  const oneDayVolume = factory?.volumeUSD - factory?.oneDay?.volumeUSD;
  const APR = (((oneDayVolume * 0.05 * 0.01) / bar?.totalSupply) * 365) / (bar?.ratio * sushiPrice);
  const APY = Math.pow(1 + APR / 365, 365) - 1;

  console.log("APR:", {
    factoryVolume: factory?.volumeUSD,
    factoryOneDayVolumeUSD: factory?.oneDay?.volumeUSD,
    oneDayVolume: oneDayVolume,
    barTotalSupply: bar?.totalSupply,
    barRatio: bar?.ratio,
    sushiPrice: sushiPrice,
  });

  // Get Sushi Price in USD
  const { priceUSD } = useTokenData("0x6b3595068778dd592e39a122f4f5a5cf09c90fe2");

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

  // Get users # of Sushi not staked
  const totalNotStaked = useTokenBalance(contractAddresses.sushi[1]);
  const totalNotStakedUSD = priceUSD ? formattedNum(getBalanceNumber(totalNotStaked) * priceUSD, true) : "";
  console.log("totalNotStaked:", totalNotStaked);

  // Get Sushi staked, issue with analytics query:
  const xSushiBalance = useTokenBalance(contractAddresses.xSushi[1]);
  const xSushiFormatted = new BigNumber(xSushiBalance).div(new BigNumber(1000000000000000000));
  const totalSupply = useTotalXSushiSupply();
  const totalStaked = useTotalSushiStakedInBar();
  const poolShare = new BigNumber(xSushiBalance).div(new BigNumber(totalSupply));
  const poolStaked = new BigNumber(poolShare).times(new BigNumber(totalStaked));
  const sushiStaked = new BigNumber(poolStaked).div(new BigNumber(1000000000000000000));

  const balances = [
    {
      title: "Harvestable",
      sushi: sumEarning ? formattedNum(sumEarning, false) : <Loader />,
      usd: sumEarning && priceUSD ? formattedNum(sumEarning * priceUSD, true) : <Loader />,
      cta: <Button title="Harvest" onClick={onPresentHarvest} />,
    },
    {
      title: "Unstaked",
      sushi: totalNotStaked ? `${Number(getBalanceNumber(totalNotStaked)).toFixed(4)} SUSHI` : <Loader />,
      usd: totalNotStakedUSD ? totalNotStakedUSD : <Loader />,
      cta: <StakeSushi />,
    },
    {
      title: "Staked",
      sushi: Number(sushiStaked) ? `${decimalFormatter.format(Number(sushiStaked))} SUSHI` : <Loader />,
      //sushi: barStaked ? `${decimalFormatter.format(barStaked)} SUSHI` : <Loader />,
      xsushi: Number(xSushiFormatted) ? `(${Number(xSushiFormatted.toFixed(2)).toLocaleString()} xSUSHI)` : <Loader />,
      //usd: `${currencyFormatter.format(barStakedUSD)}`, // incorrect for some reason
      //usd: barStaked && priceUSD ? `${currencyFormatter.format(barStaked * priceUSD)}` : <Loader />,
      usd: Number(sushiStaked) && priceUSD ? `${currencyFormatter.format(Number(sushiStaked) * priceUSD)}` : <Loader />,
      cta: <UnstakeSushi />,
    },
  ];

  const state = {
    APY: APY,
    APR: APR,
    averageAPY: averageApy,
    //sushiStakedUSD: sushiStakedUSD,
    //sushiHarvestedUSD: sushiHarvestedUSD,
    //xSushiMinted: xSushiMinted,
    //xSushiBurned: xSushiBurned,
    //xSushi: xSushi,
    bar: bar,
    user: user,
  };

  console.log("xsushi_state:", state);

  return (
    <>
      <TableSushi
        balances={balances ? balances : <Loader />}
        price={sushiPrice ? currencyFormatter.format(sushiPrice) : <Loader />}
      />
    </>
  );
};

export default SushiBar;
