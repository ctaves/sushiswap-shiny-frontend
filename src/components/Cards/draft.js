import React, { useEffect, useState } from "react";

import { Linker } from "../Linker";
import SushiGlobalChart from "../../services/vision/components/GlobalChart/withoutAxis";

import { menus } from "../../constants/farms";
import { Spinner } from "../Loading";

import { usePools, usePairs } from "../../shared/contexts/GlobalData";

import _ from "lodash";
import sushiData from "@sushiswap/sushi-data";

export const CardLiquidity = () => {
  return (
    <>
      <div className="w-3/4 md:w-1/2 h-48 overflow-hidden mr-4 justify-between shadow-md border-2 border-blue-brand-light rounded-md">
        <div>
          <div className="text-lg font-base pt-8 px-4">Liquidity</div>
        </div>
        <div className="-mb-6 relative">
          <div className="w-full">
            <SushiGlobalChart display="liquidity" />
          </div>
        </div>
      </div>
    </>
  );
};

export const CardVolume = () => {
  return (
    <>
      <div className="w-3/4 md:w-1/2 h-48 overflow-hidden justify-between shadow-md border-2 border-pink-brand rounded-md">
        <div>
          <div className="text-lg font-base pt-8 px-4">Volume</div>
        </div>
        <div className="-mb-6 relative">
          <div className="absolute w-full">
            <SushiGlobalChart display="volume" />
          </div>
        </div>
      </div>
    </>
  );
};

export const CardOnsen = () => {
  const allPools = usePools();
  const allPairs = usePairs();
  const onsenPools = allPools.filter((pool) => {
    return menus.onsen.includes(pool.id);
  });
  //console.log("data:", allPools, allPairs, onsenPools);
  useEffect(() => {
    const fetchData = async () => {
      const lockup = await sushiData.lockup.user({
        user_address: String("0xb900Ee43397Bc2829e565DECe3518A02F712Ec33").toLowerCase(),
      });
      const derivedETH = await sushiData.sushi.price();
      const masterchef = await sushiData.masterchef.info();
      const totalAllocPoint = masterchef.totalAllocPoint;
      const stakedValues = await Promise.all(
        onsenPools.map((pool) => {
          return sushiData.masterchef.stakedValue({ token_address: pool.pair }).then((results) => {
            return { id: pool.pair, details: results };
          });
        })
      );
      console.log("lockup:", lockup);
      const onsen = onsenPools.map((pool) => {
        const pair = allPairs.find((pair) => pair.id === pool.pair);
        const pricing = stakedValues.find((value) => value.id === pool.pair);

        const blocksPerDay = 6500;
        const sushiPerBlock = 50;
        const allocPoint = pool.allocPoint;
        const totalValueETH = pricing.details.totalValueETH;
        const slpBalance = pricing.details.liquidityTokenBalance;
        const totalSupply = pricing.details.totalSupply;

        const apyYear =
          (derivedETH * blocksPerDay * sushiPerBlock * 365 * (allocPoint / totalAllocPoint)) /
          (totalValueETH * (slpBalance / totalSupply));

        console.log("onsen:", apyYear, masterchef, pool, pair, pricing);

        // const balance = Number(pool.balance / 1e18) > 0 ? Number(pool.balance / 1e18) : 0.1;
        // const totalSupply = pair.totalSupply > 0 ? pair.totalSupply : 0.1;
        // const reserveUSD = pair.reserveUSD > 0 ? pair.reserveUSD : 0.1;
        // const balanceUSD = (balance / Number(totalSupply)) * Number(reserveUSD);
        // const rewardPerBlock = ((pool.allocPoint / pool.owner.totalAllocPoint) * pool.owner.sushiPerBlock) / 1e18;
        // const roiPerBlock = (rewardPerBlock * 3 * sushiPrice) / balanceUSD;
        // const roiPerHour = roiPerBlock * blocksPerHour;
        // const roiPerDay = roiPerHour * 24;
        // const roiPerMonth = roiPerDay * 30;
        // const roiPerYear = roiPerMonth * 12;
      });

      console.log("totalAllocPoint:", totalAllocPoint);
      console.log("stakedValues:", stakedValues);
    };
    fetchData();
  }, []);

  // const onsen = onsenPools.map((pool) => {
  //   const pair = allPairs.find((pair) => pair.id === pool.pair);
  //   console.log("pair:", pair);
  //   // const blocksPerHour = 6500 / 24;
  //   // const balance = Number(pool.balance / 1e18) > 0 ? Number(pool.balance / 1e18) : 0.1;
  //   // const totalSupply = pair.totalSupply > 0 ? pair.totalSupply : 0.1;
  //   // const reserveUSD = pair.reserveUSD > 0 ? pair.reserveUSD : 0.1;
  //   // const balanceUSD = (balance / Number(totalSupply)) * Number(reserveUSD);
  //   // const rewardPerBlock = ((pool.allocPoint / pool.owner.totalAllocPoint) * pool.owner.sushiPerBlock) / 1e18;
  //   // const roiPerBlock = (rewardPerBlock * 3 * sushiPrice) / balanceUSD;
  //   // const roiPerHour = roiPerBlock * blocksPerHour;
  //   // const roiPerDay = roiPerHour * 24;
  //   // const roiPerMonth = roiPerDay * 30;
  //   // const roiPerYear = roiPerMonth * 12;
  // });

  return (
    <>
      {/* <div
        className=" w-1/2 md:w-full h-48 flex flex-col justify-between shadow border-2 rounded-md p-4"
        style={{ border: "2px solid #0091a7" }}
      >
        <div className="pt-4 px-2">
          <p className="text-lg font-base">
            Onsen <Linker to={"/onsen"}>({menus.onsen.length} Farms)</Linker>
          </p>
          <p className="text-base font-normal font-gray-300 pt-4">Highest Yields:</p>
          <div className="pt-4 space-y-1">
            {farms && farms.length > 0 ? (
              farms.map((farm) => {
                return (
                  <>
                    <div className="flex justify-between overflow-hidden">
                      <Linker to={"/pair/" + farm.pair}>
                        {farm.liquidityPair.token0.symbol + "-" + farm.liquidityPair.token1.symbol}
                      </Linker>
                      <div className="text-sm">{Number(farm.roiPerYear * 100).toFixed(2)}%</div>
                    </div>
                  </>
                );
              })
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </div> */}
    </>
  );
};
