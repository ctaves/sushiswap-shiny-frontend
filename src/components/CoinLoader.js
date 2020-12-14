import React from "react";
//import "../assets/css/loading.css";
import SushiAnimation from "../assets/animations/intro.svg";

const CoinLoader = ({ small }) => {
  return (
    <>
      {small && small == true ? (
        <img className="h-40 w-40 block mx-auto" src={SushiAnimation} />
      ) : (
        <img className="h-52 w-52 block mx-auto" src={SushiAnimation} />
      )}
    </>
  );
};

// const CoinLoader = ({ small }) => {
//   return (
//     <>
//       {small && small == true ? (
//         <div className="scale-small">
//           <div className="loader">
//             <div className="coin">
//               <div className="oval">
//                 <div className="inner-oval"></div>
//               </div>
//               <div className="coin__edge">
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//                 <div></div>
//               </div>
//               <div className="oval-back">
//                 <div className="inner-oval"></div>
//               </div>
//               <div className="oval-shadow"></div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="loader">
//           <div className="coin">
//             <div className="oval">
//               <div className="inner-oval"></div>
//             </div>

//             <div className="coin__edge">
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//               <div></div>
//             </div>
//             <div className="oval-back">
//               <div className="inner-oval"></div>
//             </div>
//             <div className="oval-shadow"></div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

export default CoinLoader;
