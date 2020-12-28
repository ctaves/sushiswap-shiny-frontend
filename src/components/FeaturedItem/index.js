import React from "react";

const FeaturedItem = () => {
  return (
    <>
      <div className="bg-white sm:rounded-lg">
        <div className="pt-2 sm:pt-6 pb-1 flex justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Popular Lists</h3>
          <a href="#" class="text-blue-600 whitespace-nowrap px-1 font-medium text-sm" aria-current="page">
            View More
          </a>
          {/* <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">Personal details and application.</p> */}
        </div>
        <div className="py-5">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
            <div className="col-span-2 sm:col-span-3">
              <span className="float-left border border-gray-200 rounded-full py-1 pl-1 pr-3 mr-2 mb-2">
                <a href="#" className="flex-shrink-0 group block">
                  <div className="flex items-center">
                    <div>
                      <img className="inline-block h-9 w-9 rounded-full bg-blue-200" src="" alt="" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm leading-5 font-medium text-gray-700 group-hover:text-gray-900">Onsen</p>
                    </div>
                  </div>
                </a>
              </span>
              <span className="float-left border border-gray-200 rounded-full py-1 pl-1 pr-3 mr-2 mb-2">
                <a href="#" className="flex-shrink-0 group block">
                  <div className="flex items-center">
                    <div>
                      <img className="inline-block h-9 w-9 rounded-full bg-red-300" src="" alt="" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm leading-5 font-medium text-gray-700 group-hover:text-gray-900">
                        Daily Movers
                      </p>
                    </div>
                  </div>
                </a>
              </span>
              <span className="float-left border border-gray-200 rounded-full py-1 pl-1 pr-3 mr-2 mb-2">
                <a href="#" className="flex-shrink-0 group block">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="inline-block h-9 w-9 rounded-full"
                        src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm leading-5 font-medium text-gray-700 group-hover:text-gray-900">
                        Stablecoins
                      </p>
                    </div>
                  </div>
                </a>
              </span>
              <span className="float-left border border-gray-200 rounded-full py-1 pl-1 pr-3 mr-2 mb-2">
                <a href="#" className="flex-shrink-0 group block">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="inline-block h-9 w-9 rounded-full"
                        src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e/logo.png"
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm leading-5 font-medium text-gray-700 group-hover:text-gray-900">Yearn Fam</p>
                    </div>
                  </div>
                </a>
              </span>
            </div>
          </dl>
        </div>
        <div className="pt-4 pb-3 flex justify-between border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">New in SushiSwap</h3>
          <a href="#" class="text-blue-600 whitespace-nowrap px-1 font-medium text-sm" aria-current="page">
            View Forum
          </a>
          {/* <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">Personal details and application.</p> */}
        </div>
        <div className="pt-2 sm:pt-6 pb-1 flex justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Top Movers</h3>
          {/* <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">Personal details and application.</p> */}
        </div>
      </div>
    </>
  );
};

export default FeaturedItem;
