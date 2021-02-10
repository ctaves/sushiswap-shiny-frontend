import React from "react";
import Sidebar from "../Sidebar";
import MobileNav from "../MobileNav";
import useMenu from "../../shared/hooks/useMenu";
import Background from "../../assets/illustrations/swap_background_1d.svg";

export const DashboardContainer = ({ children }) => {
  const mobileMenu = useMenu();
  return (
    <>
      <div id="scroller">
        <div className="h-screen flex overflow-hidden bg-white">
          <Sidebar />
          <div className="flex flex-col w-0 flex-1 overflow-hidden">
            <main
              className="overflow-x-hidden lg:p-4 bg-white rounded-b-none lg:rounded-lg flex-1 relative z-0 overflow-y-auto focus:outline-none"
              tabIndex={0}
              style={{
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
              }}
            >
              <div className="bg-white 2xl:mx-20 lg:rounded-lg pb-36 lg:pb-4 md:border md:border-grey-300 md:shadow-xl">
                {children}
              </div>
            </main>
          </div>
          <MobileNav changeMenu={mobileMenu.change} isOpen={mobileMenu.isOpen} />
        </div>
      </div>
    </>
  );
};

export const DashboardEmptyContainer = ({ children }) => {
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
            {children}
          </main>
        </div>
        <MobileNav changeMenu={mobileMenu.change} isOpen={mobileMenu.isOpen} />
      </div>
    </>
  );
};
