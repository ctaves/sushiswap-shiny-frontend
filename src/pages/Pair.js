import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { isAddress } from "../services/vision/utils";

import Search from "../services/vision/components/Search/secondary";
import CardTokenActions from "../components/Plugin/Layout";

import PairChart from "../services/vision/components/PairChart/secondary";
import TxnList from "../services/vision/components/TxnList/secondary";
import { TokenActionsButtons } from '../components/MobileNavigation/TokenActionsButtons';

import { formattedNum, formattedPercent } from "../services/vision/utils";
import { usePairData, usePairTransactions } from "../services/vision/contexts/PairData";
import { useEthPrice } from "../services/vision/contexts/GlobalData";

import CoinLoader from "../components/CoinLoader";
import logoNotFound from "../assets/img/logoNotFound.png";

import { Loader, Spinner } from "../components/Loading";
import { CardTokenActionsModal } from '../components/Modals/CardTokenActionsModal';
import useModal from "../shared/hooks/useModal";

const Pair = ({ pairAddress, history }) => {
  const {
    token0,
    token1,
    reserve0,
    reserve1,
    reserveUSD,
    trackedReserveUSD,
    oneDayVolumeUSD,
    volumeChangeUSD,
    oneDayVolumeUntracked,
    volumeChangeUntracked,
    liquidityChangeUSD,
  } = usePairData(pairAddress);
  const transactions = usePairTransactions(pairAddress);
  //const backgroundColor = useColor(pairAddress);
  // liquidity
  const liquidity = trackedReserveUSD
    ? formattedNum(trackedReserveUSD, true)
    : reserveUSD
    ? formattedNum(reserveUSD, true)
    : "-";
  const liquidityChange = formattedPercent(liquidityChangeUSD);
  // mark if using untracked liquidity
  // const [usingTracked, setUsingTracked] = useState(true);
  // useEffect(() => {
  //   setUsingTracked(!trackedReserveUSD ? false : true);
  // }, [trackedReserveUSD]);
  // volume
  const volume =
    oneDayVolumeUSD || oneDayVolumeUSD === 0
      ? formattedNum(oneDayVolumeUSD === 0 ? oneDayVolumeUntracked : oneDayVolumeUSD, true)
      : oneDayVolumeUSD === 0
      ? "$0"
      : "-";
  // mark if using untracked volume
  const [usingUtVolume, setUsingUtVolume] = useState(false);
  useEffect(() => {
    setUsingUtVolume(oneDayVolumeUSD === 0 ? true : false);
  }, [oneDayVolumeUSD]);

  const volumeChange = formattedPercent(!usingUtVolume ? volumeChangeUSD : volumeChangeUntracked);
  // get fees
  const fees =
    oneDayVolumeUSD || oneDayVolumeUSD === 0
      ? usingUtVolume
        ? formattedNum(oneDayVolumeUntracked * 0.003, true)
        : formattedNum(oneDayVolumeUSD * 0.003, true)
      : "-";
  // token data for usd
  const [ethPrice] = useEthPrice();
  const token0USD =
    token0?.derivedETH && ethPrice ? formattedNum(parseFloat(token0.derivedETH) * parseFloat(ethPrice), true) : "";
  const token1USD =
    token1?.derivedETH && ethPrice ? formattedNum(parseFloat(token1.derivedETH) * parseFloat(ethPrice), true) : "";
  const reserve0USD =
    token0?.derivedETH && ethPrice
      ? formattedNum(parseFloat(token0.derivedETH) * parseFloat(ethPrice) * parseFloat(reserve0), true)
      : "";
  const reserve1USD =
    token1?.derivedETH && ethPrice
      ? formattedNum(parseFloat(token1.derivedETH) * parseFloat(ethPrice) * parseFloat(reserve1), true)
      : "";

  // rates
  const token0Rate = reserve0 && reserve1 ? formattedNum(reserve1 / reserve0) : "-";
  const token1Rate = reserve0 && reserve1 ? formattedNum(reserve0 / reserve1) : "-";
  // formatted symbols for overflow
  const formattedSymbol0 = token0?.symbol.length > 6 ? token0?.symbol.slice(0, 5) + "..." : token0?.symbol;
  const formattedSymbol1 = token1?.symbol.length > 6 ? token1?.symbol.slice(0, 5) + "..." : token1?.symbol;

  // transactions
  //const txnChangeFormatted = formattedPercent(txnChange);
  //console.log("TXNCHANGE", oneDayTxns, txnChangeFormatted);

  const [onPresentCardTokenSwapActions] = useModal(
    <CardTokenActionsModal
      symbol={token0 && token0.symbol}
      currencyIdA={token0 && token0.id}
      currencyIdB={token1 && token1.id}
      isLoading={token0 && token1} />,
    null,
    null,
    null
  );
  const [onPresentCardTokenLiquidityActions] = useModal(
    <CardTokenActionsModal
      symbol={token0 && token0.symbol}
      currencyIdA={token0 && token0.id}
      currencyIdB={token1 && token1.id}
      isLoading={token0 && token1}
      initialTab="pool" />,
    null,
    null,
    null
  );

  console.log("pair_diagnosis:", token0, token1);

  return (
    <>
      <div className="md:flex">
        <div className="relative w-full mx-auto sm:px-6 lg:px-6">
          <div className="grid gap-2 mx-auto lg:grid-cols-5 lg:max-w-none">
            <div className="lg:col-span-3">
              {token0 && token1 ? (
                <PairPageTitle
                  name={token0.symbol + "-" + token1.symbol + " Pair"}
                  price={token0USD}
                  price2={token1USD}
                  // priceChange={priceChange}
                  symbol={token0.symbol}
                  symbol2={token1.symbol}
                  id={token0.id}
                  id2={token1.id}
                />
              ) : (
                <PairPageTitleLoading />
              )}
              <div className="py-2 px-4">
                <PairChart
                  address={pairAddress}
                  color={liquidityChange < 0 ? "#ff5001" : "#04c806"}
                  base0={reserve1 / reserve0}
                  base1={reserve0 / reserve1}
                />
              </div>
              {token0 && token1 ? (
                <Details
                  token0={token0}
                  token1={token1}
                  token0Rate={token0Rate}
                  token1Rate={token1Rate}
                  formattedSymbol0={formattedSymbol0}
                  formattedSymbol1={formattedSymbol1}
                  token0USD={token0USD}
                  token1USD={token1USD}
                  reserve0={formattedNum(reserve0)}
                  reserve1={formattedNum(reserve1)}
                  reserve0USD={reserve0USD}
                  reserve1USD={reserve1USD}
                  liquidity={liquidity}
                  liquidityChange={liquidityChange}
                  volume={volume}
                  volumeChange={volumeChange}
                  fees={fees}
                  feesChange={volumeChange}
                />
              ) : (
                <DetailsLoading />
              )}
            </div>
            <div className="pt-6 lg:col-span-2">
              <div className="lg:sticky top-0">
                <div className="hidden lg:block">
                  <Search />
                </div>
                <div className="hidden lg:block pt-4">
                  {token0 && token1 ? (
                    <>
                      <CardTokenActions
                        initialSection={"pool"}
                        title={"What would you like to do?"}
                        symbol={token0.symbol}
                        currencyIdA={token0.id}
                        currencyIdB={token1.id}
                      />
                    </>
                  ) : (
                    <div className="rounded-lg border-2 border-gray-900 h-80">
                      <Spinner height={"full"} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {transactions ? (
        <div className="py-5 px-4 md:py-10 md:px-10 inline-block min-w-full overflow-hidden align-middle">
          <div
            style={{
              position: "relative",
              overflow: "auto",
              whiteSpace: "nowrap",
            }}
          >
            <TxnList transactions={transactions} color={"#0090a6"} />
          </div>
        </div>
      ) : (
        <CoinLoader size={"sm"} />
      )}
      <TokenActionsButtons 
        onTradeClick={onPresentCardTokenSwapActions}
        onLiquidityClick={onPresentCardTokenLiquidityActions}
      />
    </>
  );
};

const PairPageTitleLoading = () => {
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
            <Link to="/pairs" className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out">
              Pairs
            </Link>
            <svg className="flex-shrink-0 mx-2 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <Loader />
          </nav>
        </div>
        <div className="mt-2 md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center leading-8">
              <div className="mr-4 flex items-center flex-shrink-0">
                <div className="w-10 h-10 relative z-30 inline-block rounded-full text-white shadow-solid bg-gray-100 border border-white" />
                <div className="w-10 h-10 relative z-20 -ml-4 inline-block rounded-full text-white shadow-solid bg-gray-100 border border-white" />
              </div>
              <Loader height={6} width={24} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const PairPageTitle = ({ name, price, price2, priceChange, symbol, symbol2, id, id2 }) => {
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
            <Link to="/pairs" className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out">
              Pairs
            </Link>
            <svg className="flex-shrink-0 mx-2 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {symbol && symbol2 ? symbol + "-" + symbol2 : <Loader />}
          </nav>
        </div>
        <div className="mt-2 md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center text-2xl font-semibold leading-8 text-gray-900">
              <div className="mr-8 flex items-center flex-shrink-0 w-10 h-10 text-2xl">
                <img
                  className="relative z-30 inline-block rounded-full text-white shadow-solid"
                  src={`https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/${isAddress(
                    id
                  )}/logo.png`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = logoNotFound;
                    e.preventDefault();
                  }}
                  alt=""
                />
                <img
                  className="relative z-20 -ml-4 inline-block rounded-full text-white shadow-solid"
                  src={`https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/${isAddress(
                    id2
                  )}/logo.png`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = logoNotFound;
                    e.preventDefault();
                  }}
                  alt=""
                />
              </div>
              {name}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const DetailsLoading = () => {
  const history = useHistory();
  return (
    <>
      <div className="bg-white overflow-hidden sm:rounded-lg">
        <div className="px-4 pt-2 sm:pt-6 pb-1 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Pair Details</h3>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
            <div className="sm:col-span-1">
              <dt className="text-sm leading-5 font-medium text-gray-500">Total Liquidity</dt>
              <dd className="flex items-baseline mt-1">
                <div>
                  <div className="flex items-center text-sm leading-5 text-gray-900">
                    <Loader />
                  </div>
                </div>
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm leading-5 font-medium text-gray-500">Volume (24hrs)</dt>
              <dd className="flex items-baseline mt-1">
                <div>
                  <div className="flex items-center text-sm leading-5 text-gray-900">
                    <Loader />
                  </div>
                </div>
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm leading-5 font-medium text-gray-500">Fees (24hrs)</dt>
              <dd className="flex items-baseline mt-1">
                <div>
                  <div className="flex items-center text-sm leading-5 text-gray-900">
                    <Loader />
                  </div>
                </div>
              </dd>
            </div>
            <div className="col-span-2 lg:col-span-3">
              <dt className="text-sm leading-5 font-medium text-gray-500">Tokens</dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900">
                <ul className="border border-gray-200 rounded-md">
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5">
                    <div className="w-0 flex-1 flex items-center">
                      <div
                        className="mr-2 rounded-full text-white shadow-solid bg-gray-100 border border-white"
                        style={{ width: "1.125rem", height: "1.125rem" }}
                        alt=""
                      />
                      <span className="ml-2 flex-1 w-0 truncate">
                        <Loader width={16} />
                      </span>
                    </div>
                  </li>
                  <li className="border-t border-gray-200 pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5">
                    <div className="w-0 flex-1 flex items-center">
                      <div
                        className="mr-2 rounded-full text-white shadow-solid bg-gray-100 border border-white"
                        style={{ width: "1.125rem", height: "1.125rem" }}
                        alt=""
                      />
                      <span className="ml-2 flex-1 w-0 truncate">
                        <Loader width={16} />
                      </span>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
            <div className="col-span-2 sm:col-span-3">
              <dt className="text-sm leading-5 font-medium text-gray-500">Underlying Liquidity</dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900">
                <ul className="border border-gray-200 rounded-md">
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5">
                    <div className="w-0 flex-1 flex items-center">
                      {/* Heroicon name: paper-clip */}
                      <div
                        className="mr-2 rounded-full text-white shadow-solid bg-gray-100 border border-white"
                        style={{ width: "1.125rem", height: "1.125rem" }}
                        alt=""
                      />
                      <span className="ml-2 flex-1 w-0 truncate">
                        <Loader />
                      </span>
                    </div>
                  </li>
                  <li className="border-t border-gray-200 pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5">
                    <div className="w-0 flex-1 flex items-center">
                      {/* Heroicon name: paper-clip */}
                      <div
                        className="mr-2 rounded-full text-white shadow-solid bg-gray-100 border border-white"
                        style={{ width: "1.125rem", height: "1.125rem" }}
                        alt=""
                      />
                      <span className="ml-2 flex-1 w-0 truncate">
                        <Loader />
                      </span>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

const Details = ({
  token0,
  token1,
  token0Rate,
  token1Rate,
  formattedSymbol0,
  formattedSymbol1,
  token0USD,
  token1USD,
  reserve0,
  reserve1,
  reserve0USD,
  reserve1USD,
  liquidity,
  liquidityChange,
  volume,
  volumeChange,
  fees,
  feesChange,
}) => {
  const history = useHistory();
  return (
    <>
      <div className="bg-white overflow-hidden sm:rounded-lg">
        <div className="px-4 pt-2 sm:pt-6 pb-1 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Pair Details</h3>
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
              <dt className="text-sm leading-5 font-medium text-gray-500">Fees (24hrs)</dt>
              <dd className="flex items-baseline mt-1">
                <div>
                  <div className="flex items-center text-sm leading-5 text-gray-900">
                    {fees}
                    <div className="ml-1 font-normal text-xs text-green-500">{feesChange}</div>
                  </div>
                </div>
              </dd>
            </div>
            <div className="col-span-2 lg:col-span-3">
              <dt className="text-sm leading-5 font-medium text-gray-500">Tokens</dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900">
                <ul className="border border-gray-200 rounded-md">
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5">
                    <div className="w-0 flex-1 flex items-center">
                      <img
                        src={`https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/${isAddress(
                          token0.id
                        )}/logo.png`}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = logoNotFound;
                          e.preventDefault();
                        }}
                        className="mr-2"
                        style={{ width: "1.125rem", height: "1.125rem" }}
                        alt=""
                      />
                      <span className="ml-2 flex-1 w-0 truncate">
                        {token0 && token1
                          ? `1 ${formattedSymbol0} = ${String(token0Rate)} ${formattedSymbol1} ${
                              parseFloat(token0?.derivedETH) ? "(" + token0USD + ")" : ""
                            }`
                          : "-"}
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => {
                          history.push("/token/" + token0.id);
                        }}
                        className="font-medium text-blue-brand hover:text-blue-brand-dark transition duration-150 ease-in-out"
                      >
                        View Token
                      </button>
                    </div>
                  </li>
                  <li className="border-t border-gray-200 pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5">
                    <div className="w-0 flex-1 flex items-center">
                      <img
                        src={`https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/${isAddress(
                          token1.id
                        )}/logo.png`}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = logoNotFound;
                          e.preventDefault();
                        }}
                        className="mr-2"
                        style={{ width: "1.125rem", height: "1.125rem" }}
                        alt=""
                      />
                      <span className="ml-2 flex-1 w-0 truncate">
                        {token0 && token1
                          ? `1 ${formattedSymbol1} = ${String(token1Rate)} ${formattedSymbol0} ${
                              parseFloat(token1?.derivedETH) ? "(" + token1USD + ")" : ""
                            }`
                          : "-"}
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => {
                          history.push("/token/" + token1.id);
                        }}
                        className="font-medium text-blue-brand hover:text-blue-brand-dark transition duration-150 ease-in-out"
                      >
                        View Token
                      </button>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
            <div className="col-span-2 sm:col-span-3">
              <dt className="text-sm leading-5 font-medium text-gray-500">Underlying Liquidity</dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900">
                <ul className="border border-gray-200 rounded-md">
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5">
                    <div className="w-0 flex-1 flex items-center">
                      {/* Heroicon name: paper-clip */}
                      <img
                        src={`https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/${isAddress(
                          token0.id
                        )}/logo.png`}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = logoNotFound;
                          e.preventDefault();
                        }}
                        className="mr-2"
                        style={{ width: "1.125rem", height: "1.125rem" }}
                        alt=""
                      />
                      <span className="ml-2 flex-1 w-0 truncate">
                        {reserve0} {formattedSymbol0} ({reserve0USD})
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => {
                          history.push("/token/" + token0.id);
                        }}
                        className="font-medium text-blue-brand hover:text-blue-brand-dark transition duration-150 ease-in-out"
                      >
                        View Token
                      </button>
                    </div>
                  </li>
                  <li className="border-t border-gray-200 pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5">
                    <div className="w-0 flex-1 flex items-center">
                      {/* Heroicon name: paper-clip */}
                      <img
                        src={`https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/${isAddress(
                          token1.id
                        )}/logo.png`}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = logoNotFound;
                          e.preventDefault();
                        }}
                        className="mr-2"
                        style={{ width: "1.125rem", height: "1.125rem" }}
                        alt=""
                      />
                      <span className="ml-2 flex-1 w-0 truncate">
                        {reserve1} {formattedSymbol1} ({reserve1USD})
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <button
                        onClick={() => {
                          history.push("/token/" + token1.id);
                        }}
                        className="font-medium text-blue-brand hover:text-blue-brand-dark transition duration-150 ease-in-out"
                      >
                        View Token
                      </button>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
            {/* <div className="sm:col-span-3">
              <dt className="text-sm leading-5 font-medium text-gray-500">About</dt>
              <dd className="mt-1 text-sm leading-5 text-gray-900">
                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure
                nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
              </dd>
            </div> */}
          </dl>
        </div>
      </div>
    </>
  );
};

export default Pair;
