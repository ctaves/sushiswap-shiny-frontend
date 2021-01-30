import React from "react";

import FeaturedList from "../../components/FeaturedList";
import Articles from "../../components/FeaturedItem/Articles";
import TopMovers from "../../components/FeaturedItem/TopMovers";
import TopEarners from "../../components/FeaturedItem/TopEarners";

const NobleFishermanInterface = () => {
  return (
    <>
      <div className="relative px-12 bg-white min-h-screen ">
        <div className="flex">
          <div className="pr-12">
            <div className="py-2 flex justify-between">
              <div className="flex space-x-6 justify-start">
                <div className="items-center">Logo</div>
              </div>
            </div>
          </div>
          <div>
            {/* Navbar */}
            <div className="py-2 flex justify-between">
              {/* <div className="flex space-x-6 justify-start items-center">
                <div>Logo</div>
              </div> */}
              <div className="mx-4">
                <div className="mt-1 relative shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {/* Heroicon name: mail */}
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    id="email"
                    className="py-2 pr-3 rounded-sm border border-gray-300 block w-80 pl-14 sm:text-sm sm:leading-5"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-6 font-semibold">
                <div>Yield</div>
                <div>Portfolio</div>
                <div>Ethereum</div>
                <div>Messages</div>
                <div>Account</div>
              </div>
            </div>
            <div className="py-10 grid grid-cols-12 gap-16">
              <div className="col-span-8">
                <div></div>
                <FeaturedList key={"featuredList"} />
                <Articles key={"articles"} />
                <TopMovers />
                <TopEarners />
              </div>
              <div className="col-span-4">
                <div className="h-80 overflow-y-scroll border border-gray-300 rounded rounded-md w-80">
                  {/* Section Title */}
                  <div className="py-4 px-6 flex justify-between items-center border-b border-gray-300">
                    <div className="font-semibold">Tokens</div>
                    <div>
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  {[1, 2, 3, 4, 5].map(() => {
                    return (
                      <div className="py-2 px-6 flex justify-between items-center">
                        <div>
                          <div className="font-semibold">TSM</div>
                          <div className="">12.32</div>
                        </div>
                        <div>
                          <div className="text-right">$125.70</div>
                          <div className="text-right">+3.25%</div>
                        </div>
                      </div>
                    );
                  })}
                  {/* Section Title */}
                  <div className="py-4 px-6 flex justify-between items-center border-b border-t border-gray-300">
                    <div className="font-semibold">Liquidity Positions</div>
                    <div>
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  {[1, 2, 3, 4, 5].map(() => {
                    return (
                      <div className="py-2 px-6 flex justify-between items-center">
                        <div>
                          <div className="font-semibold">TSM</div>
                          <div className="">12.32</div>
                        </div>
                        <div>
                          <div className="text-right">$125.70</div>
                          <div className="text-right">+3.25%</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NobleFishermanInterface;
