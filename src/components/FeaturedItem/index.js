import React from "react";
import { Link } from "react-router-dom";
import { Linker } from "../Linker";

import TopMovers from "./TopMovers";
import TopEarners from "./TopEarners";
import { useTokenData } from "../../services/vision/contexts/TokenData";
import { formattedNum, formattedPercent, formattedPercentArrow } from "../../services/vision/utils";

import StablecoinList from "../../assets/icons/stablecoin-list.jpg";
import RocketIcon from "../../assets/icons/rocket.png";
import OnsenIllustration from "../../assets/illustrations/onsen.jpg";
import CoverWarningLogo from "../../assets/logos/cover-warning.jpg";
import MidnightTrading from "../../assets/img/midnight-trading.jpg";

const popularLists = [
  { title: "Onsen", image: OnsenIllustration },
  { title: "Daily Movers", image: RocketIcon },
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

const articles = [
  {
    title: "Introducing the Stablecoin List",
    description:
      "Stablecoins are back with a new twist - algorithmic stablecoins. Browse stablecoins in our new list. Add liquidity to MIS-USDT only on SushiSwap.",
    image: StablecoinList,
    token: "0x368b3a58b5f49392e5c9e4c998cb0bb966752e51", // MIC
  },
  {
    title: "Warning: COVER Verified Exploit",
    description:
      "COVER has experienced a verified exploit and a warning message has been placed on COVER and related pairs. Proceed with caution. Read more about the exploit here.",
    image: CoverWarningLogo,
    token: "0x5d8d9f5b96f4438195be9b99eee6118ed4304286", // COVER
  },
  {
    title: "Onsen Liquidity Incentives Program",
    image: OnsenIllustration,
    description:
      "New farms, new SUSHI rewards. Check out the Onsen list or head over to Special Farms to provide liquidity to selected projects. Earn accelerated SUSHI rewards on top of trading fees.",
    list: "",
  },
  {
    title: "Experimental: Midnight Trading Interface",
    description:
      "Check out the new experimental interface built using Sushi Plugin. Midnight is an interface tailored to traders full with live pricing and helpful stats.",
    image: MidnightTrading,
    token: "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2", // SUSHI
  },
];

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

const PopularLists = () => {
  return (
    <>
      <div className="pt-2 px-4 sm:pt-6 pb-1 flex justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Popular Lists</h3>
        <Linker to="/tokens">View More</Linker>
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
      <span className="hover:bg-gray-100 float-left border border-gray-200 rounded-full py-1 pl-1 pr-3 mr-2 mb-2">
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

const Articles = () => {
  return (
    <>
      <div className="pt-4 pb-4 px-4 flex justify-between border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">New in SushiSwap</h3>
        <Linker to="https://forum.sushiswapclassic.org/" external>
          View More
        </Linker>
        {/* <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">Personal details and application.</p> */}
      </div>
      {articles.map((article) => {
        return (
          <>
            <Article
              title={article.title}
              description={article.description}
              image={article.image}
              token={article.token}
            />
          </>
        );
      })}
    </>
  );
};

const Article = ({ title, description, image, token, list }) => {
  const tokenData = useTokenData(token);
  //console.log("tokenData:", tokenData);
  return (
    <>
      <div className="py-6 px-4 hover:bg-gray-100 border-b border-gray-100">
        <div className="flex">
          <div>
            <h4 className="text-base font-bold">{title}</h4>
            <p className="mt-1">{description}</p>
          </div>
          <div className="ml-4 flex-shrink-0">
            {image && <img src={image} className="h-16 w-16 rounded" />}
            {/* <svg
            className="h-16 w-16 border border-gray-300 bg-white text-gray-300"
            preserveAspectRatio="none"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <path vectorEffect="non-scaling-stroke" strokeWidth={1} d="M0 0l200 200M0 200L200 0" />
          </svg> */}
          </div>
        </div>
        {tokenData && Object.keys(tokenData).length > 0 && (
          <Link to={"/token/" + tokenData.id}>
            <div className="flex mt-4">
              <div className="font-semibold mr-2">{tokenData?.symbol}</div>
              {/* <div> {formattedNum(tokenData.priceUSD, true)}</div> */}
              <div> {formattedPercentArrow(tokenData?.priceChangeUSD)}</div>
            </div>
          </Link>
        )}
      </div>
    </>
  );
};

// const TopEarners = () => {
//   return (
//     <>
//       <div className="py-6">
//         <div className="pl-4 flex justify-between">
//           <div>
//             <h3 className="text-lg leading-6 font-medium text-gray-900">Top Earners</h3>
//             <p className="text-sm font-medium text-gray-400">Farms with the highest volume to liquidity ratios</p>
//           </div>
//           <a href="#" className="text-blue-600 whitespace-nowrap px-1 font-medium text-sm" aria-current="page">
//             View all farms
//           </a>
//           {/* <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">Personal details and application.</p> */}
//         </div>
//         <div className="pl-4 pt-4 grid grid-cols-4 gap-x-2">
//           {[1, 2, 3, 4].map((farm) => {
//             return (
//               <>
//                 <FarmCard
//                 // symbol={token.symbol}
//                 // name={token.name}
//                 // priceUSD={token.priceUSD}
//                 // priceChangeUSD={token.priceChangeUSD}
//                 />
//               </>
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// };

// const FarmCard = ({ symbol, name, priceUSD, priceChangeUSD }) => {
//   return (
//     <>
//       <div className="h-40 flex flex-col justify-between border border-gray-300 hover:bg-gray-100 rounded-md p-4">
//         <div>
//           <div className="text-sm font-semibold uppercase">SUSHI-ETH</div>
//         </div>
//         <div>
//           <div className="text-lg font-semibold text-green-400">0.80</div>
//           <div className="text-sm text-green-400">Vol: 20,000</div>
//           <div className="text-sm text-green-400">Liquidity: 50,000</div>
//         </div>
//       </div>
//     </>
//   );
// };

export default FeaturedItems;
