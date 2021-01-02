import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { isAddress } from "../services/vision/utils";
import logoNotFound from "../assets/img/logoNotFound.png";
import Search from "../services/vision/components/Search/secondary";
import CardTokenActions from "../components/Cards/TokenActions/Layout";

import TokenChart from "../services/vision/components/TokenChart/secondary";
import { formattedNum, formattedPercent, localNumber } from "../services/vision/utils";
import { useTokenData, useTokenTransactions } from "../services/vision/contexts/TokenData";
import { useColor } from "../services/vision/hooks";
import TxnList from "../services/vision/components/TxnList/secondary";
import CoinLoader from "../components/CoinLoader";
import { tokenInfo } from "../constants/tokenInfo.json";
//import Loader from "../services/vision/components/LocalLoader";

const Token = ({ address, history }) => {
  const {
    id,
    name,
    symbol,
    priceUSD,
    oneDayVolumeUSD,
    totalLiquidityUSD,
    volumeChangeUSD,
    oneDayVolumeUT,
    volumeChangeUT,
    priceChangeUSD,
    liquidityChangeUSD,
    oneDayTxns,
    txnChange,
  } = useTokenData(address);
  // all transactions with this token
  const transactions = useTokenTransactions(address);
  const backgroundColor = useColor(id, symbol);
  // price
  const price = priceUSD ? formattedNum(priceUSD, true) : "";
  const priceChange = priceChangeUSD ? formattedPercent(priceChangeUSD) : "";
  // liquidity
  const liquidity = totalLiquidityUSD ? formattedNum(totalLiquidityUSD, true) : totalLiquidityUSD === 0 ? "$0" : "-";
  const liquidityChange = formattedPercent(liquidityChangeUSD);
  // volume
  const volume =
    oneDayVolumeUSD || oneDayVolumeUSD === 0
      ? formattedNum(oneDayVolumeUSD === 0 ? oneDayVolumeUT : oneDayVolumeUSD, true)
      : oneDayVolumeUSD === 0
      ? "$0"
      : "-";
  // mark if using untracked volume
  const [usingUtVolume, setUsingUtVolume] = useState(false);
  useEffect(() => {
    setUsingUtVolume(oneDayVolumeUSD === 0 ? true : false);
  }, [oneDayVolumeUSD]);
  const volumeChange = formattedPercent(!usingUtVolume ? volumeChangeUSD : volumeChangeUT);
  // transactions
  const txnChangeFormatted = formattedPercent(txnChange);
  const txns = oneDayTxns ? localNumber(oneDayTxns) : oneDayTxns === 0 ? 0 : "-";

  // More Information
  const additionalTokenInfo = tokenInfo.find((token) => token.address === String(address).toLowerCase());
  const about = additionalTokenInfo?.about;

  return (
    <>
      <div className="md:flex">
        <div className="relative w-full mx-auto sm:px-6 lg:px-6">
          <div className="grid gap-2 mx-auto lg:grid-cols-5 lg:max-w-none">
            <div className="lg:col-span-3">
              <TokenPageTitle name={name} price={price} priceChange={priceChange} symbol={symbol} id={id} />
              <div className="py-2 px-4">
                <TokenChart address={address} color={"#fa7815"} base={priceUSD} />
              </div>
              <Details
                liquidity={liquidity}
                liquidityChange={liquidityChange}
                volume={volume}
                volumeChange={volumeChange}
                transactions={txns}
                transactionsChange={txnChangeFormatted}
                about={about}
              />
            </div>
            <div className="pt-6 lg:col-span-2">
              <div className="lg:sticky top-0">
                <div className="hidden lg:block">
                  <Search />
                </div>
                <div className="pt-4">
                  <CardTokenActions
                    initialSection={"swap"}
                    title={"What would you like to do?"}
                    symbol={symbol}
                    currencyIdA={id}
                    currencyIdB={"ETH"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {transactions ? (
        <div className="py-10 px-10 inline-block min-w-full overflow-hidden align-middle">
          <div
            style={{
              position: "relative",
              overflow: "auto",
              whiteSpace: "nowrap",
            }}
          >
            <TxnList transactions={transactions} color={"#d03801"} />
          </div>
        </div>
      ) : (
        <CoinLoader size={"sm"} />
      )}
    </>
  );
};

const TokenPageTitle = ({ name, price, priceChange, symbol, id }) => {
  const history = useHistory();
  return (
    <>
      <div className="py-6 px-8">
        <div>
          <nav className="sm:hidden">
            <button
              onClick={() => {
                history.goBack();
              }}
              className="flex items-center text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
            >
              <svg className="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Back
            </button>
          </nav>
          <nav className="hidden sm:flex items-center text-sm leading-5 font-medium">
            <Link to="/tokens" className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out">
              Tokens
            </Link>
            <svg className="flex-shrink-0 mx-2 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <a
              href={"https://etherscan.io/address/" + id}
              target="_blank"
              className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
            >
              {symbol} ({id})
            </a>
          </nav>
        </div>
        <div className="mt-2 md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center text-2xl font-semibold leading-8 text-gray-900">
              <div
                className="mr-4 flex items-center justify-center flex-shrink-0 w-10 h-10 text-2xl rounded-full shadow-md"
                //style={{ border: "solid 1px #ee6d48" }}
              >
                <img
                  class="rounded-full text-white shadow-solid"
                  src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${isAddress(
                    id
                  )}/logo.png`}
                  alt={name + " Logo"}
                />
              </div>
              {name}
              {/* <div className="ml-8 font-normal">{price}</div> */}
              <div className="ml-2 font-normal text-base text-green-500">{priceChange}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Details = ({ liquidity, liquidityChange, volume, volumeChange, transactions, transactionsChange, about }) => {
  const history = useHistory();
  return (
    <>
      <div className="bg-white overflow-hidden sm:rounded-lg">
        <div className="px-4 pt-2 sm:pt-6 pb-1 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Token Details</h3>
          {/* <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">Personal details and application.</p> */}
        </div>
        <div className="px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
            <div className="sm:col-span-1">
              <dt className="text-sm leading-5 font-medium text-gray-500">Total Liquidity</dt>
              {/* <dd className="mt-1 text-sm leading-5 text-gray-900">Liquidity</dd> */}
              <dd className="flex items-baseline mt-1">
                <div>
                  <div className="flex items-center text-sm leading-5 text-gray-900">
                    {liquidity}
                    <div className="ml-1 font-normal text-xs text-green-500">{liquidityChange}</div>
                  </div>
                </div>
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm leading-5 font-medium text-gray-500">Volume (24hrs)</dt>
              <dd className="flex items-baseline mt-1">
                <div>
                  <div className="flex items-center text-sm leading-5 text-gray-900">
                    {volume}
                    <div className="ml-1 font-normal text-xs text-green-500">{volumeChange}</div>
                  </div>
                </div>
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm leading-5 font-medium text-gray-500">Transactions (24hrs)</dt>
              <dd className="flex items-baseline mt-1">
                <div>
                  <div className="flex items-center text-sm leading-5 text-gray-900">
                    {transactions}
                    <div className="ml-1 font-normal text-xs text-green-500">{transactionsChange}</div>
                  </div>
                </div>
              </dd>
            </div>
            {about && (
              <div className="col-span-2 sm:col-span-3">
                <dt className="text-sm leading-5 font-medium text-gray-500">About</dt>
                <dd className="mt-1 text-sm leading-5 text-gray-900">{about}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </>
  );
};

export default Token;
