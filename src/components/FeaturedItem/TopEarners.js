import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Linker } from "../Linker";
import { useAllPairData } from "../../services/vision/contexts/PairData";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { OVERVIEW_TOKEN_BLACKLIST } from "../../services/vision/constants";
import { formattedNum, formattedPercent } from "../../services/vision/utils";
import FormattedName from "../../services/vision/components/FormattedName";
import { useMedia } from "react-use";

dayjs.extend(utc);

const SORT_FIELD = {
  LIQ: 0,
  VOL: 1,
  VOL_7DAYS: 3,
  FEES: 4,
  APY: 5,
};

const FIELD_TO_VALUE = {
  [SORT_FIELD.LIQ]: "trackedReserveUSD", // sort with tracked volume only
  [SORT_FIELD.VOL]: "oneDayVolumeUSD",
  [SORT_FIELD.VOL_7DAYS]: "oneWeekVolumeUSD",
  [SORT_FIELD.FEES]: "oneDayVolumeUSD",
};

const TopEarners = () => {
  const allPairs = useAllPairData();
  return (
    <>
      <PairList pairs={allPairs} key={"pairList"} />
    </>
  );
};

// @TODO rework into virtualized list
function PairList({ pairs, itemMax = 10 }) {
  // sorting
  const sortDirection = true;
  const sortedColumn = SORT_FIELD.APY;

  const pairList =
    pairs &&
    Object.keys(pairs)
      .sort((addressA, addressB) => {
        const pairA = pairs[addressA];
        const pairB = pairs[addressB];
        if (sortedColumn === SORT_FIELD.APY) {
          const apy0 = parseFloat(pairA.oneDayVolumeUSD * 0.003 * 356 * 100) / parseFloat(pairA.reserveUSD);
          const apy1 = parseFloat(pairB.oneDayVolumeUSD * 0.003 * 356 * 100) / parseFloat(pairB.reserveUSD);
          return apy0 > apy1 ? (sortDirection ? -1 : 1) * 1 : (sortDirection ? -1 : 1) * -1;
        }
        return parseFloat(pairA[FIELD_TO_VALUE[sortedColumn]]) > parseFloat(pairB[FIELD_TO_VALUE[sortedColumn]])
          ? (sortDirection ? -1 : 1) * 1
          : (sortDirection ? -1 : 1) * -1;
      })
      .slice(0, 10);
  //   .map((pairAddress, index) => {
  //     const pairData = pairs[pairAddress];

  //     if (pairData && pairData.token0 && pairData.token1) {
  //       const liquidity = formattedNum(pairData.reserveUSD, true);
  //       const volume = formattedNum(pairData.oneDayVolumeUSD, true);
  //       const apy = formattedPercent((pairData.oneDayVolumeUSD * 0.003 * 365 * 100) / pairData.reserveUSD);
  //     }
  //     return (
  //       pairAddress && (
  //         <div key={index}>
  //           <ListItem key={index} index={(page - 1) * ITEMS_PER_PAGE + index + 1} pairAddress={pairAddress} />
  //           <Divider />
  //         </div>
  //       )
  //     );
  //   });

  return (
    <>
      <div className="pt-6">
        <div className="mx-4 flex justify-between">
          <div>
            <h3 className="text-xl leading-6 font-medium text-gray-900">Top Earners</h3>
            <p className="mt-1 text-sm font-medium text-gray-400">Pairs with the highest APY today</p>
            {/* <p className="text-sm font-medium text-gray-400">(24hr volume annualized)</p> */}
          </div>
          <Linker to="/pairs">View all pairs</Linker>
          {/* <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">Personal details and application.</p> */}
        </div>
        <div className="pl-4 pt-4 pb-8 flex overflow-x-scroll">
          {pairList.map((item) => {
            const pairData = pairs[item];
            const apy = formattedPercent((pairData?.oneDayVolumeUSD * 0.003 * 365 * 100) / pairData?.reserveUSD);
            //console.log("pairData:", pairData);
            return (
              <>
                <PairCard
                  key={"TopEarners-" + pairData.id}
                  id={pairData.id}
                  token0={pairData.token0}
                  token1={pairData.token1}
                  apy={apy}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

const PairCard = ({ id, token0, token1, apy }) => {
  const below600 = useMedia("(max-width: 600px)");
  return (
    <Link to={"/pair/" + id}>
      <div className="w-32 h-44 mr-4 flex flex-col justify-between border border-gray-300 hover:bg-gray-100 rounded-md p-4">
        <div>
          <div className="text-sm font-semibold">
            <FormattedName
              text={token0?.symbol + "-" + token1?.symbol}
              maxCharacters={below600 ? 8 : 16}
              adjustSize={true}
            />
          </div>
        </div>
        <div>
          <div className="text-2xl font-semibold text-green-finance">{apy}</div>
          {/* <div className="text-sm text-green-finance">APY</div> */}
        </div>
      </div>
    </Link>
  );
};

export default TopEarners;
