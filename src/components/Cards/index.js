import React, { useEffect, useState } from "react";

import { Linker } from "../Linker";
import SushiGlobalChart from "../../services/vision/components/GlobalChart/withoutAxis";

import OnsenBackground from "../../assets/illustrations/Onsen_Box_01b.svg";
import BentoBoxBackground from "../../assets/illustrations/Bento_Box_01b.svg";

//Card Onsen
import { menus, FARM_DETAILS } from "../../constants/farms";
import { getFarms } from "../Farms/getFarms";
import { getApollo } from "../../services/analytics/core/apollo";

import { Spinner } from "../Loading";

import _ from "lodash";

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
      <div className="w-3/4 md:w-1/2 h-48 overflow-hidden mr-4 justify-between shadow-md border-2 border-pink-brand rounded-md">
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
  const client = getApollo();
  const [farms, setFarms] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  // Fetch Farms
  useEffect(() => {
    async function fetchData() {
      setIsError(false);
      setIsLoading(true);
      try {
        const data = await getFarms(client, "onsen");
        //console.log("getFarms:", data);
        setFarms(_.orderBy(data, ["roiPerYear"], ["desc"]).slice(0, 3));
      } catch (e) {
        //console.log("getFarms error:", e);
        setIsError(true);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  console.log("farms:", farms);

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
          {/* <p className="text-2xl font-normal pt-2.5">{menus.onsen.length} Farms</p> */}
          <p className="text-base font-normal font-gray-300 pt-4">Highest Yields:</p>
          <div className="pt-4 space-y-1">
            {farms && farms.length > 0 ? (
              farms.map((farm) => {
                console.log("farm:", farm);
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
      </div>
    </>
  );
};

export const CardBentoBox = () => {
  return (
    <>
      <div
        className="w-60 h-80 mr-4 flex flex-col justify-between shadow border border-gray-100 hover:bg-gray-100 rounded-md p-4"
        style={{
          background: `linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5) ), url(${BentoBoxBackground})`,
          backgroundColor: "#0c0e20",
          backgroundPosition: "top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div>
          <p
            className="text-lg font-semibold pt-4 px-2 text-white"
            style={{ textShadow: "0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)" }}
          >
            BentoBox
          </p>
          <p className="text-base font-normal pt-2 px-2 text-white">Lending at SushiSwap.</p>
        </div>
      </div>
    </>
  );
};
