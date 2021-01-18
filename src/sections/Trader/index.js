import React, { useEffect } from "react";
import $ from "jquery";
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import Transactions from "./Transactions";
import CardTokenActions from "./Actions";
import Account from "./Account";

import TradingThemeProvider from "./theme";
import logo from "../../assets/img/logo.png";

import useScript from "../../shared/hooks/useScript";

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
  useScript("https://sushipro.io/js/jquery.js");
  useScript("https://sushipro.io/js/manager_wallet.js");
  return (
    <>
      <div className="tradingview-layout h-screen flex overflow-hidden" style={{ backgroundColor: "#1f222d" }}>
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabIndex={0}>
            <div className="px-2 py-2 sm:flex sm:items-center sm:justify-between sm:px-2 lg:px-2">
              <div className="flex items-center flex-shrink-0 px-5">
                <img className="h-8 w-auto" src={logo} alt="Sushiswap" />
                <p className="text-lg font-bold leading-6 text-white sm:truncate ml-2">SushiTrader</p>
              </div>
              <div className="mt-4 flex sm:mt-0 sm:ml-4">
                <Account />
              </div>
            </div>
            <div
              className="px-2 py-2 sm:flex sm:items-center sm:justify-between sm:px-2 lg:px-2"
              style={{ backgroundColor: "#1f222d" }}
            >
              <div className="flex justify-start space-x-4">
                <div>
                  <div className="text-white" id="CONF_LANG_LIQ_USD">
                    Liquidity (USD)
                  </div>
                  <div style={{ color: "#1976d3" }} id="LIQ_USD">
                    $0.000000
                  </div>
                </div>
                <div>
                  <div className="text-white" id="CONF_LANG_LIQ_ETH">
                    Liquidity (USD)
                  </div>
                  <div style={{ color: "#1976d3" }} id="LIQ_ETH">
                    $0.000000
                  </div>
                </div>
                <div>
                  <div className="text-white" id="CONF_LANG_LIQ_NB_PAIR">
                    Liquidity (USD)
                  </div>
                  <div style={{ color: "#1976d3" }} id="NB_PAIRS"></div>
                </div>
              </div>
              <div className="flex justify-start space-x-4">
                <div>
                  <div className="text-white">SUSHI</div>
                  <div style={{ color: "#1976d3" }}>$0.000000</div>
                </div>
                <div>
                  <div className="text-white">WETH</div>
                  <div style={{ color: "#1976d3" }}>$0.000000</div>
                </div>
              </div>
              <div className="flex justify-start space-x-4">
                <div>
                  <div className="text-white">Select a token</div>
                  <div style={{ color: "#1976d3" }}>$0.000000</div>
                </div>
                <div>
                  <div className="text-white">Direct pair available</div>
                  <div style={{ color: "#1976d3" }}>$0.000000</div>
                </div>
                <div>
                  <div className="text-white">Pair liquidity</div>
                  <div style={{ color: "#1976d3" }}>$0.000000</div>
                </div>
              </div>
            </div>
            <div className="block">
              <div className="align-middle inline-block min-w-full">
                <div className="grid grid-cols-12">
                  <div className="h-full col-span-9" style={{ height: "600", backgroundColor: "#1f222d" }}>
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
                      height={600}
                      watchlist={["BINANCE:ETHUSDT", "BINANCE:BTCUSDT", "BINANCE:SUSHIUSDT", "HITBTC:CELUSD"]}
                    />
                  </div>
                  <div className="-ml-12 z-10 col-span-3 h-full" style={{ backgroundColor: "#1f222d" }}>
                    {/* Swap */}
                    <div
                      className="flex flex-col md:border border-gray-800 overflow-hidden"
                      style={{ backgroundColor: "#121722" }}
                    >
                      <div className="flex-1 py-3 mx-4 flex flex-col justify-between">
                        <div className="relative border-b border-gray-700 space-y-3 pb-0">
                          <div className="space-y-3 flex items-center justify-between space-y-0">
                            <h3 className="text-base leading-6 font-medium text-gray-400">Swap</h3>
                          </div>
                        </div>
                        <div className="flex space-x-4 mt-4">
                          {/* From */}
                          <div>
                            <label htmlFor="price" className="block text-sm leading-5 font-medium text-gray-700">
                              From
                            </label>
                            <div className="mt-1 relative rounded-sm shadow-sm">
                              <input
                                id="price"
                                className="form-input block w-full pl-2 pr-12 sm:text-sm sm:leading-5"
                                placeholder={0.0}
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center">
                                <select
                                  aria-label="Currency"
                                  className="form-select h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm sm:leading-5"
                                >
                                  <option>USD</option>
                                  <option>CAD</option>
                                  <option>EUR</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          {/* To */}
                          <div>
                            <label htmlFor="price" className="block text-sm leading-5 font-medium text-gray-700">
                              To
                            </label>
                            <div className="mt-1 relative rounded-sm shadow-sm">
                              <input
                                id="price"
                                className="form-input block w-full pl-2 pr-12 sm:text-sm sm:leading-5"
                                placeholder={0.0}
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center">
                                <select
                                  aria-label="Currency"
                                  className="form-select h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm sm:leading-5"
                                >
                                  <option>USD</option>
                                  <option>CAD</option>
                                  <option>EUR</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Swap Button */}
                        <div className="mt-4 grid grid-cols-2 gap-x-4">
                          <div className="flex-col col-span-1">
                            <div className="flex justify-between text-white">
                              <div className="text-xs">Minimum</div>
                              <div className="text-xs">$0.000</div>
                            </div>
                            <div className="flex justify-between text-white">
                              <div className="text-xs">Minimum</div>
                              <div className="text-xs">$0.000</div>
                            </div>
                            <div className="flex justify-between text-white">
                              <div className="text-xs">Minimum</div>
                              <div className="text-xs">$0.000</div>
                            </div>
                          </div>
                          <button className="inline-flex col-span-1 items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-sm shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Swap Now
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Market */}
                    <div
                      className="flex flex-col md:border border-gray-800 overflow-hidden"
                      style={{ backgroundColor: "#121722" }}
                    >
                      <div className="flex-1 py-3 mx-4 flex flex-col justify-between">
                        <div className="relative border-b border-gray-700 space-y-3 pb-0">
                          <div className="space-y-3 flex items-center justify-between space-y-0">
                            <h3 className="text-base leading-6 font-medium text-gray-400">Market</h3>
                          </div>
                        </div>
                        <div className="flex-col mt-4">
                          <div className="flex justify-between">
                            <div className="text-xs text-white">23:00:12</div>
                            <div className="text-xs text-white">10000 DAI</div>
                            <div className="text-xs text-white">50000 ETH</div>
                            <div className="text-xs text-white">$60,000</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="text-xs text-white">23:00:12</div>
                            <div className="text-xs text-white">10000 DAI</div>
                            <div className="text-xs text-white">50000 ETH</div>
                            <div className="text-xs text-white">$60,000</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="text-xs text-white">23:00:12</div>
                            <div className="text-xs text-white">10000 DAI</div>
                            <div className="text-xs text-white">50000 ETH</div>
                            <div className="text-xs text-white">$60,000</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Wallet */}
                    <div
                      className="flex flex-col md:border border-gray-800 overflow-hidden"
                      style={{ backgroundColor: "#121722" }}
                    >
                      <div className="flex-1 py-3 mx-4 flex flex-col justify-between">
                        <div className="relative border-b border-gray-700 space-y-3 pb-0">
                          <div className="space-y-3 flex items-center justify-between space-y-0">
                            <h3 className="text-base leading-6 font-medium text-gray-400">Wallet</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Quant Section */}
            <div className="pt-4">
              <div className="px-2 py-2 sm:flex sm:items-center sm:justify-between sm:px-2 lg:px-2">
                <div className="flex items-center flex-shrink-0 px-5">
                  <img className="h-8 w-auto" src={logo} alt="Sushiswap" />
                  <p className="text-lg font-bold leading-6 text-white sm:truncate ml-2">Farming Analytics</p>
                </div>
                <div className="mt-4 flex sm:mt-0 sm:ml-4">{/* <Account /> */}</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
