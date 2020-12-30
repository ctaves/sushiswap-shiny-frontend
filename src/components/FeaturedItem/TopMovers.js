import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAllTokenData } from "../../services/vision/contexts/TokenData";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { OVERVIEW_TOKEN_BLACKLIST } from "../../services/vision/constants";
import { formattedNum, formattedPercent } from "../../services/vision/utils";

dayjs.extend(utc);

const SORT_FIELD = {
  LIQ: "totalLiquidityUSD",
  VOL: "oneDayVolumeUSD",
  SYMBOL: "symbol",
  NAME: "name",
  PRICE: "priceUSD",
  CHANGE: "priceChangeUSD",
};

const TopMovers = () => {
  const allTokens = useAllTokenData();
  return (
    <>
      <TokenList tokens={allTokens} />
    </>
  );
};

// @TODO rework into virtualized list
function TokenList({ tokens, itemMax = 10 }) {
  // sorting
  const sortDirection = true;
  const sortedColumn = SORT_FIELD.CHANGE;

  const formattedTokens = useMemo(() => {
    return (
      tokens &&
      Object.keys(tokens)
        .filter((key) => {
          return !OVERVIEW_TOKEN_BLACKLIST.includes(key);
        })
        .map((key) => tokens[key])
    );
  }, [tokens]);

  const filteredList = useMemo(() => {
    return (
      formattedTokens &&
      formattedTokens
        .sort((a, b) => {
          if (sortedColumn === SORT_FIELD.SYMBOL || sortedColumn === SORT_FIELD.NAME) {
            return a[sortedColumn] > b[sortedColumn] ? (sortDirection ? -1 : 1) * 1 : (sortDirection ? -1 : 1) * -1;
          }
          return parseFloat(a[sortedColumn]) > parseFloat(b[sortedColumn])
            ? (sortDirection ? -1 : 1) * 1
            : (sortDirection ? -1 : 1) * -1;
        })
        .slice(0, 10) // return top 10
    );
  }, [formattedTokens, sortDirection, sortedColumn]);

  return (
    <>
      <div className="pt-6 border-b border-gray-100">
        <div className="pl-4 flex justify-between">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Top Movers</h3>
            <p className="text-sm font-medium text-gray-400">Tokens making moves today</p>
          </div>
          <a href="#" className="text-blue-600 whitespace-nowrap px-1 font-medium text-sm" aria-current="page">
            View all tokens
          </a>
          {/* <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">Personal details and application.</p> */}
        </div>
        <div className="pl-4 pt-4 pb-8 flex overflow-x-scroll">
          {filteredList.map((item) => {
            return (
              <>
                <TokenCard
                  key={"TopMovers-" + item.id}
                  id={item.id}
                  symbol={item.symbol}
                  name={item.name}
                  priceUSD={formattedNum(item.priceUSD, true)}
                  priceChangeUSD={formattedPercent(item.priceChangeUSD)}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

const TokenCard = ({ id, symbol, name, priceUSD, priceChangeUSD }) => {
  return (
    <>
      <Link to={"/token/" + id}>
        <div className="w-32 h-40 mr-4 flex flex-col justify-between border border-gray-300 hover:bg-gray-100 rounded-md p-4">
          <div>
            <div className="text-sm font-semibold uppercase">{symbol}</div>
            <div className="text-sm">{name}</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-green-400">{priceUSD}</div>
            <div className="text-sm text-green-400">{priceChangeUSD}</div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default TopMovers;
