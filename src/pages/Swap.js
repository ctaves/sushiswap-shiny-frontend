import React from "react";
import Sidebar from "../components/Sidebar/Layout";
import CardTokenActions from "../components/Plugin/Standalone";
import Background from "../assets/illustrations/swap_background_1d.svg";
import MobileNavigation from "../components/MobileNavigation";
import GlobalStats from "../services/vision/components/GlobalStats/secondary";

//import Snowfall from "../components/Snowfall";

import useMenu from "../shared/hooks/useMenu";

const Swap = () => {
  const mobileMenu = useMenu();
  return (
    <>
      <div className="h-screen flex overflow-hidden bg-white">
        <Sidebar />
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main
            className="lg:mt-4 lg:mr-4 lg:p-4 lg:bg-gray-200 lg:rounded-lg flex-1 relative z-0 overflow-y-auto focus:outline-none"
            tabIndex={0}
            style={{
              background: `url(${Background})`,
              backgroundSize: "cover",
            }}
          >
            {/* <Snowfall /> */}
            <div className="block sm:hidden py-2 pl-2 bg-gray-100">
              <GlobalStats />
            </div>
            <div className="z-10 max-w-lg mx-auto p-2 md:p-10 lg:mx-0 lg:px-12 md:py-6 pb-16">
              <CardTokenActions initialSection={"swap"} currencyIdB={"ETH"} />
            </div>
          </main>
        </div>
        <MobileNavigation changeMenu={mobileMenu.change} isOpen={mobileMenu.isOpen} />
      </div>
    </>
  );
};

export default Swap;
