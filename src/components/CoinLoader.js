import React from "react";
//import "../assets/css/loading.css";
import SushiAnimation from "../assets/animations/intro.svg";

const CoinLoader = ({ size }) => {
  const key = String(size);
  return (
    <>
      {
        {
          xs: <img className="h-20 w-20 block mx-auto" src={SushiAnimation} alt="" />,
          sm: <img className="h-40 w-40 block mx-auto" src={SushiAnimation} alt="" />,
          md: <img className="h-44 w-44 block mx-auto" src={SushiAnimation} alt="" />,
          lg: <img className="h-52 w-52 block mx-auto" src={SushiAnimation} alt="" />,
          undefined: <img className="h-52 w-52 block mx-auto" src={SushiAnimation} alt="" />,
        }[key]
      }
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
