import React from "react";

import FeaturedList from "../FeaturedList";
import Articles from "./Articles";
import TopMovers from "./TopMovers";
import TopEarners from "./TopEarners";

const FeaturedItems = () => {
  return (
    <>
      <div className="bg-white sm:rounded-lg">
        <FeaturedList />
        <Articles />
        <TopMovers />
        <TopEarners />
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
