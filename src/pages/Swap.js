import React from "react";
import SearchHeader from "../components/MobileMenu";
import Sidebar from "../components/Sidebar/Layout";
import CardTokenActions from "../components/Cards/TokenActions/Standalone";
import Background from "../assets/illustrations/02a.png";
import MobileNavigation from "../components/MobileNavigation";

// import WalletsModal from "../components/Modals/Wallets";
// import ShareModal from "../components/Modals/Share";
// import useModal from "../shared/hooks/useModal";
import useMenu from "../shared/hooks/useMenu";

const Swap = () => {
  const mobileMenu = useMenu();
  return (
    <>
      {/* <div className="h-screen flex overflow-hidden bg-white">
        <Sidebar selected={"swap"} />
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <SearchHeader changeMenu={mobileMenu.change} isOpen={mobileMenu.isOpen} selected={"swap"} />
          <main
            className="flex-1 relative z-0 overflow-y-auto focus:outline-none"
            tabIndex={0}
            style={{
              background: `url(${Background})`,
              backgroundSize: "cover",
            }}
          >
            <div className="max-w-lg mx-auto md:p-10 lg:mx-0 lg:p-12">
              <CardTokenActions initialSection={"swap"} title={"What would you like to do?"} currencyIdB={"ETH"} />
            </div>
          </main>
        </div>
      </div> */}
      <div className="h-screen flex overflow-hidden bg-white">
        <Sidebar />
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          {/* <SearchHeader changeMenu={mobileMenu.change} isOpen={mobileMenu.isOpen} /> */}
          <main
            className="lg:mt-4 lg:mr-4 lg:p-4 lg:bg-gray-200 lg:rounded-lg flex-1 relative z-0 overflow-y-auto focus:outline-none"
            tabIndex={0}
            style={{
              background: `url(${Background})`,
              backgroundSize: "cover",
            }}
          >
            <div className="max-w-lg mx-auto md:p-10 lg:mx-0 lg:px-12 md:py-6 pb-16">
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
