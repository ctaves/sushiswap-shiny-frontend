import React from "react";

import { Linker } from "../Linker";
import SushiGlobalChart from "../../services/vision/components/GlobalChart/withoutAxis";

import { menus } from "../../constants/farms";
import { Spinner } from "../Loading";
import { usePools, usePairs, useGlobalChartData } from "../../shared/contexts/GlobalData";

import _ from "lodash";

export const CardOnsen = () => {
  const allPools = usePools();
  const allPairs = usePairs();
  const onsenPools = allPools.filter((pool) => {
    return menus.onsen.includes(pool.id);
  });
  const sorted = _.orderBy(onsenPools, ["apy"], ["desc"]).slice(0, 3);

  const farms = sorted.map((farm) => {
    const details = allPairs.find((pair) => farm.pair === pair.id);
    return {
      ...farm,
      details: details,
    };
  });

  return (
    <>
      <div
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
                        {farm.details.token0.symbol + "-" + farm.details.token1.symbol}
                      </Linker>
                      <div className="text-sm">{Number(farm.apy).toFixed(2)}%</div>
                    </div>
                  </>
                );
              })
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
