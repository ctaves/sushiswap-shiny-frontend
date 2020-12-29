import React from "react";

const FeaturedItems = () => {
  return (
    <>
      <div className="bg-white sm:rounded-lg">
        <PopularLists />
        <Articles />
        <TopMovers />
        <TopEarners />
      </div>
    </>
  );
};

const popularLists = [
  { title: "Onsen", image: "" },
  { title: "Daily Movers", image: "" },
  {
    title: "Stablecoins",
    image:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
  },
  {
    title: "Yearn Fam",
    image:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e/logo.png",
  },
];

const PopularLists = () => {
  return (
    <>
      <div className="pt-2 pl-4 sm:pt-6 pb-1 flex justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Popular Lists</h3>
        <a href="#" className="text-blue-600 whitespace-nowrap px-1 font-medium text-sm" aria-current="page">
          View More
        </a>
        {/* <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">Personal details and application.</p> */}
      </div>
      <div className="py-5">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
          <div className="col-span-2 sm:col-span-3 px-4">
            {popularLists.map((token) => {
              return (
                <>
                  <List title={token.title} image={token.image} />
                </>
              );
            })}
          </div>
        </dl>
      </div>
    </>
  );
};

const List = ({ title, image }) => {
  return (
    <>
      <span className="float-left border border-gray-200 rounded-full py-1 pl-1 pr-3 mr-2 mb-2">
        <a href="#" className="flex-shrink-0 group block">
          <div className="flex items-center">
            <div>
              <img className="inline-block h-9 w-9 rounded-full" src={image} alt="" />
            </div>
            <div className="ml-3">
              <p className="text-sm leading-5 font-medium text-gray-700 group-hover:text-gray-900">{title}</p>
            </div>
          </div>
        </a>
      </span>
    </>
  );
};

const articles = [
  {
    title: "COVER-ETH liquidity paused",
    image: "",
    description:
      "Repudiandae sint consequuntur vel. Amet ut nobis explicabo numquam expedita quia omnis voluptatem. Minusquidem ipsam quia iusto.",
    list: "",
  },
  {
    title: "Onsen liquidity incentives program",
    image: "",
    description:
      "Repudiandae sint consequuntur vel. Amet ut nobis explicabo numquam expedita quia omnis voluptatem. Minusquidem ipsam quia iusto.",
    list: "",
  },
  {
    title: "Experimental: Midnight Trading Interface",
    description:
      "Repudiandae sint consequuntur vel. Amet ut nobis explicabo numquam expedita quia omnis voluptatem. Minusquidem ipsam quia iusto.",
    image: "",
  },
];

const Articles = () => {
  return (
    <>
      <div className="pt-4 pb-4 pl-4 flex justify-between border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">New in SushiSwap</h3>
        <a href="#" className="text-blue-600 whitespace-nowrap px-1 font-medium text-sm" aria-current="page">
          View Forum
        </a>
        {/* <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">Personal details and application.</p> */}
      </div>
      {articles.map((article) => {
        return (
          <>
            <Article title={article.title} description={article.description} image={article.image} />
          </>
        );
      })}
    </>
  );
};

const Article = ({ title, description, image, token, list }) => {
  return (
    <>
      <div className="flex py-6 px-4 hover:bg-gray-100 border-b border-gray-100">
        <div>
          <h4 className="text-lg font-bold">{title}</h4>
          <p className="mt-1">{description}</p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <svg
            className="h-16 w-16 border border-gray-300 bg-white text-gray-300"
            preserveAspectRatio="none"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <path vectorEffect="non-scaling-stroke" strokeWidth={1} d="M0 0l200 200M0 200L200 0" />
          </svg>
        </div>
      </div>
    </>
  );
};

const TopMovers = () => {
  return (
    <>
      <div className="py-6 border-b border-gray-100">
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
        <div className="pl-4 pt-4 grid grid-cols-4 gap-x-2">
          {[1, 2, 3, 4].map((token) => {
            return (
              <>
                <TokenCard
                // symbol={token.symbol}
                // name={token.name}
                // priceUSD={token.priceUSD}
                // priceChangeUSD={token.priceChangeUSD}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

const TokenCard = ({ symbol, name, priceUSD, priceChangeUSD }) => {
  return (
    <>
      <div className="h-40 flex flex-col justify-between border border-gray-300 hover:bg-gray-100 rounded-md p-4">
        <div>
          <div className="text-sm font-semibold uppercase">BTC</div>
          <div className="text-sm">Bitcoin</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-green-400">$9.07</div>
          <div className="text-sm text-green-400">+10.00%</div>
        </div>
      </div>
    </>
  );
};

const TopEarners = () => {
  return (
    <>
      <div className="py-6">
        <div className="pl-4 flex justify-between">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Top Earners</h3>
            <p className="text-sm font-medium text-gray-400">Farms with the highest volume to liquidity ratios</p>
          </div>
          <a href="#" className="text-blue-600 whitespace-nowrap px-1 font-medium text-sm" aria-current="page">
            View all farms
          </a>
          {/* <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">Personal details and application.</p> */}
        </div>
        <div className="pl-4 pt-4 grid grid-cols-4 gap-x-2">
          {[1, 2, 3, 4].map((farm) => {
            return (
              <>
                <FarmCard
                // symbol={token.symbol}
                // name={token.name}
                // priceUSD={token.priceUSD}
                // priceChangeUSD={token.priceChangeUSD}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

const FarmCard = ({ symbol, name, priceUSD, priceChangeUSD }) => {
  return (
    <>
      <div className="h-40 flex flex-col justify-between border border-gray-300 hover:bg-gray-100 rounded-md p-4">
        <div>
          <div className="text-sm font-semibold uppercase">SUSHI-ETH</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-green-400">0.80</div>
          <div className="text-sm text-green-400">Vol: 20,000</div>
          <div className="text-sm text-green-400">Liquidity: 50,000</div>
        </div>
      </div>
    </>
  );
};

export default FeaturedItems;
