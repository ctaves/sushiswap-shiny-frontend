/* eslint-disable no-unused-expressions */

import { Button, Linker } from "../Linker";
import React, { useEffect, useRef, useState } from "react";
// Overview Stats
import {
  barHistoriesQuery,
  barQuery,
  barUserQuery,
  currencyFormatter,
  dayDatasQuery,
  decimalFormatter,
  ethPriceQuery,
  factoryQuery,
  latestBlockQuery,
  tokenQuery,
} from "../../core";

// charts
import AreaChart from "./AreaChart";
import BigNumber from "bignumber.js";
// modals
import HarvestModal from "../Portfolio/Harvest/Modal";
import { Loader } from "../Portfolio/Tables/Loader";
import StakeSushi from "../Portfolio/StakeSushi";
import TableSushi from "./Table";
import Title from "./Title";
import UnstakeSushi from "../Portfolio/UnstakeSushi";
import { contractAddresses } from "../../services/frontend/sushi/lib/constants";
import { formattedNum } from "../../services/vision/utils";
import { getBalanceNumber } from "../../services/frontend/utils/formatBalance";
import { getFactory } from "./getFactory";
// Additional Dep
import sushiData from "@sushiswap/sushi-data";
import { useActiveWeb3React } from "../../services/exchange/hooks";
import useAllEarnings from "../Portfolio/hooks/useAllEarnings";
import useAllStakedValue from "../Portfolio/hooks/useAllStakedValue";
import useFarms from "../../services/frontend/hooks/useFarms";
import useModal from "../../shared/hooks/useModal";
import { useQuery } from "@apollo/client";
import useTokenBalance from "../Portfolio/hooks/useTokenBalance";
import { useTokenData } from "../../services/vision/contexts/TokenData";
import useTotalSushiStakedInBar from "../Portfolio/hooks/useTotalSushiStakedInBar";
import useTotalXSushiSupply from "../Portfolio/hooks/useTotalXSushiSupply";

// User Stats








function formatPercent(rawPercent) {
  if (rawPercent < 0.01) {
    return "<1%";
  } else return parseFloat(rawPercent * 100).toFixed(2) + "%";
}

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

  const { data: barData } = useQuery(barUserQuery, {
    variables: {
      id: account.toLowerCase(),
    },
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

  // user bar subgraph
  const userXSushi = parseFloat(barData?.user?.xSushi);

  const barPending =
    (userXSushi * parseFloat(barData?.user?.bar?.sushiStaked)) / parseFloat(barData?.user?.bar?.totalSupply);

  const xSushiTransfered =
    barData?.user?.xSushiIn > barData?.user?.xSushiOut
      ? parseFloat(barData?.user?.xSushiIn) - parseFloat(barData?.user?.xSushiOut)
      : parseFloat(barData?.user?.xSushiOut) - parseFloat(barData?.user?.xSushiIn);

  const barStaked = barData?.user?.sushiStaked;

  const barStakedUSD = barData?.user?.sushiStakedUSD;

  const barHarvested = barData?.user?.sushiHarvested;
  const barHarvestedUSD = barData?.user?.sushiHarvestedUSD;

  const barPendingUSD = barPending > 0 ? barPending * sushiPrice : 0;

  const barRoiSushi =
    barPending -
    (parseFloat(barData?.user?.sushiStaked) -
      parseFloat(barData?.user?.sushiHarvested) +
      parseFloat(barData?.user?.sushiIn) -
      parseFloat(barData?.user?.sushiOut));

  const barRoiUSD =
    barPendingUSD -
    (parseFloat(barData?.user?.sushiStakedUSD) -
      parseFloat(barData?.user?.sushiHarvestedUSD) +
      parseFloat(barData?.user?.usdIn) -
      parseFloat(barData?.user?.usdOut));

  const { data: blocksData } = useQuery(latestBlockQuery, {
    context: {
      clientName: "blocklytics",
    },
  });

  const blockDifference = parseInt(blocksData?.blocks[0].number) - parseInt(barData?.user?.createdAtBlock);

  const barRoiDailySushi = (barRoiSushi / blockDifference) * 6440;

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

  const stats = [
    {
      title: "Deposited (All-time)",
      sushi: Number(barStaked) ? `${decimalFormatter.format(Number(barStaked))} SUSHI` : <Loader />,
      usd: Number(barStakedUSD) ? `${currencyFormatter.format(Number(barStakedUSD))}` : <Loader />,
      cta:
        Number(barStaked) && Number(barStakedUSD) ? (
          `~ ${currencyFormatter.format(Number(barStakedUSD) / Number(barStaked))}`
        ) : (
          <Loader />
        ),
    },
    {
      title: "Withdrawn (All-time)",
      sushi: Number(barHarvested) ? `${decimalFormatter.format(Number(barHarvested))} SUSHI` : <Loader />,
      usd: Number(barHarvestedUSD) ? `${currencyFormatter.format(Number(barHarvestedUSD))}` : <Loader />,
      cta:
        Number(barHarvested) && Number(barHarvestedUSD) ? (
          `~ ${currencyFormatter.format(Number(barHarvestedUSD) / Number(barHarvested))}`
        ) : (
          <Loader />
        ),
    },
    // {
    //   title: "ROI (All-time)",
    //   sushi: Number(barRoiSushi) ? `${decimalFormatter.format(Number(barRoiSushi))}` : <Loader />,
    //   usd: Number(barRoiSushi) && priceUSD ? `${currencyFormatter.format(Number(barRoiSushi) * priceUSD)}` : <Loader />,
    //   //cta: <UnstakeSushi />,
    // },
    {
      title: "ROI (1y)",
      sushi: Number(barRoiDailySushi) ? `${decimalFormatter.format(Number(barRoiDailySushi) * 365)}` : <Loader />,
      usd:
        Number(barRoiDailySushi) && priceUSD ? (
          `${currencyFormatter.format(Number(barRoiDailySushi) * 365 * priceUSD)}`
        ) : (
          <Loader />
        ),
    },
    {
      title: "ROI (1m)",
      sushi: Number(barRoiDailySushi) ? `${decimalFormatter.format(Number(barRoiDailySushi) * 30)}` : <Loader />,
      usd:
        Number(barRoiDailySushi) && priceUSD ? (
          `${currencyFormatter.format(Number(barRoiDailySushi) * 30 * priceUSD)}`
        ) : (
          <Loader />
        ),
    },
    {
      title: "ROI (1d)",
      sushi: Number(barRoiDailySushi) ? `${decimalFormatter.format(Number(barRoiDailySushi))}` : <Loader />,
      usd:
        Number(barRoiDailySushi) && priceUSD ? (
          `${currencyFormatter.format(Number(barRoiDailySushi) * priceUSD)}`
        ) : (
          <Loader />
        ),
    },
  ];

  const state = {
    APY: APY,
    APR: APR,
    apy: apy,
    apr: apr,
    averageAPY: averageApy,
    //sushiStakedUSD: sushiStakedUSD,
    //sushiHarvestedUSD: sushiHarvestedUSD,
    //xSushiMinted: xSushiMinted,
    //xSushiBurned: xSushiBurned,
    //xSushi: xSushi,
    bar: bar,
    user: user,
  };

  console.log("sushibar_state:", state);

  // update the width on a window resize
  const ref = useRef();
  const isClient = typeof window === "object";
  const [width, setWidth] = useState(ref?.current?.container?.clientWidth);
  useEffect(() => {
    if (!isClient) {
      return false;
    }
    function handleResize() {
      setWidth(ref?.current?.container?.clientWidth ?? width);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isClient, width]);

  return (
    <>
      {/* {apy && apr && apy.length > 0 && apr.length > 0 ? (
        <div className="h-80">
          <ParentSize>
            {({ width, height }) => (
              <Curves
                width={width}
                height={height}
                margin={{ top: 64, right: 32, bottom: 0, left: 64 }}
                data={[apy, apr]}
                labels={["APY", "APR"]}
              />
            )}
          </ParentSize>
        </div>
      ) : null} */}
      {/* <LineChart data={apy} /> */}
      {/* {apy && apy.length > 0 && (
        <ResponsiveContainer aspect={60 / 28} ref={ref}>
          <TradingViewChart
            data={apy.slice(apy.length - 31, apy.length - 1)} // get last 30 days
            base={apy[apy.length - 1].value}
            // baseChange={
            //   ((apy?.[apy?.length - 1].value - apy?.[apy?.length - 2].value) / apy?.[apy?.length - 2].value) * 100
            // }
            title="xSushi APY"
            field="value"
            width={width}
            type={"AREA"}
          />
        </ResponsiveContainer>
      )} */}
      {/* {apy && apy.length > 0 && (
        <ResponsiveContainer aspect={60 / 28} ref={ref}>
          <TradingViewChart
            data={apy.slice(apy.length - 31, apy.length - 1)} // get last 30 days
            base={apy[apy.length - 1].value}
            // baseChange={
            //   ((apy?.[apy?.length - 1].value - apy?.[apy?.length - 2].value) / apy?.[apy?.length - 2].value) * 100
            // }
            title="xSushi APY"
            field="value"
            width={width}
            type={"AREA"}
          />
        </ResponsiveContainer>
      )} */}
      <div className="py-4 px-4 bg-gray-100">
        <div className="lg:grid lg:grid-cols-5 lg:gap-x-4">
          <div className="col-span-2 rounded-md bg-white overflow-hidden border border-gray-100 shadow">
            <Title title={"APY (24hr)"} metric={state.APY ? formatPercent(state.APY) : <Loader />} />
            {/* <div className="absolute p-4 z-2">
              <div className="font-semibold text-md text-gray-400">APY (24hr)</div>
              <div className="font-semibold text-3xl" style={{ color: "#fead28" }}>
                {state.APY ? formatPercent(state.APY) : <Loader />}
              </div>
            </div> */}
            {apy && apy.length > 0 && (
              <AreaChart
                field={"value"}
                data={apy.slice(apy.length - 31, apy.length - 1)} // get last 30 days
              />
            )}
            <div className="border border-t border-gray-100"></div>
            <Title
              title={"APY (Avg.)"}
              metric={state?.averageAPY ? `${Number(state?.averageAPY).toFixed(2)}%` : <Loader />}
            />
            <Title
              title={"xSushi Supply"}
              metric={state?.bar?.totalSupply ? Number(state?.bar?.totalSupply).toFixed(0) : <Loader />}
            />
            <Title
              title={"xSushi:Sushi"}
              metric={state?.bar?.ratio ? Number(state?.bar?.ratio).toFixed(2) : <Loader />}
            />
          </div>
          <div className="col-span-3 rounded-md bg-white overflow-hidden border border-gray-100 shadow">
            <Title
              title={"Balance"}
              metric={sushiPrice ? `1 SUSHI = ${currencyFormatter.format(sushiPrice)}` : <Loader />}
            />
            <TableSushi balances={balances ? balances : <Loader />} />
            <Title title={"Stats"} />
            <TableSushi balances={stats ? stats : <Loader />} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SushiBar;
