import React from "react";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import Transactions from "./Transactions";
import CardTokenActions from "./Actions";
import Account from "./Account";

import TradingThemeProvider from "./theme";
import logo from "../../assets/img/logo.png";
// import Portfolio from "../../components/Portfolio";

const Layout = () => {
  return (
    <>
      <TradingThemeProvider>
        <TradingView />
      </TradingThemeProvider>
    </>
  );
};

const TradingView = () => {
  return (
    <>
      <div className="tradingview-layout h-screen flex overflow-hidden" style={{ backgroundColor: "#1f222d" }}>
        {/* Static sidebar for desktop */}
        {/* <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64 border-r border-gray-200 pt-5 pb-4 bg-gray-100">
            <div className="h-0 flex-1 flex flex-col overflow-y-auto"></div>
          </div>
        </div> */}
        {/* Main column */}
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabIndex={0}>
            {/* Page title & actions */}
            <div className="px-2 py-2 sm:flex sm:items-center sm:justify-between sm:px-2 lg:px-2">
              <div className="flex items-center flex-shrink-0 px-5">
                <img className="h-8 w-auto" src={logo} alt="Sushiswap" />
                <p className="text-lg font-bold leading-6 text-white sm:truncate ml-2">SushiSwap</p>
              </div>
              <div className="mt-4 flex sm:mt-0 sm:ml-4">
                <Account />
                {/* <span className="order-1 ml-3 shadow-sm rounded-md sm:order-0 sm:ml-0">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
                  >
                    Share
                  </button>
                </span>
                <span className="order-0 sm:order-1 sm:ml-3 shadow-sm rounded-md">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-500 focus:outline-none focus:shadow-outline-purple focus:border-purple-700 active:bg-indigo-700 transition duration-150 ease-in-out"
                  >
                    Create
                  </button>
                </span> */}
              </div>
            </div>
            {/* Pinned projects */}
            {/* <div className="px-4 mt-6 sm:px-6 lg:px-8"></div> */}
            {/* Projects table (small breakpoint and up) */}
            <div className="block">
              <div className="align-middle inline-block min-w-full">
                <div className="grid grid-cols-12">
                  <div className="h-full col-span-9" style={{ height: "503px", backgroundColor: "#1f222d" }}>
                    <TradingViewWidget
                      symbol="BINANCE:SUSHIUSDT"
                      theme={Themes.DARK}
                      locale="en"
                      autosize={false}
                      range={"5D"}
                      withdateranges
                      details={true}
                      hide_side_toolbar={false}
                      width={"100%"}
                      height={503}
                      watchlist={["BINANCE:ETHUSDT", "BINANCE:BTCUSDT", "BINANCE:SUSHIUSDT", "HITBTC:CELUSD"]}
                    />
                    <div className="mt-2 mr-12">
                      <Transactions />
                    </div>
                  </div>
                  <div className="-ml-12 z-10 col-span-3 h-full" style={{ backgroundColor: "#1f222d" }}>
                    <CardTokenActions initialSection={"swap"} currencyIdB={"ETH"} />
                    <div className="h-32 overflow-y:scroll">{/* <Portfolio /> */}</div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
