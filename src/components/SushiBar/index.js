/* eslint-disable no-unused-expressions */

import React, { useEffect, useState } from "react";
import {
  barHistoriesQuery,
  barQuery,
  dayDatasQuery,
  ethPriceQuery,
  factoryQuery,
  tokenQuery,
} from "../../services/analytics/core";

import { useQuery } from "@apollo/client";
import { getFactory } from "./getFactory";

import sushiData from "@sushiswap/sushi-data";
import { useActiveWeb3React } from "../../services/exchange/hooks";

const SushiBar = () => {
  const { account } = useActiveWeb3React();

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

  return <></>;
};

export default SushiBar;
