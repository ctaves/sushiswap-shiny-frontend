import React from "react";
import { DashboardEmptyContainer } from "../components/Dashboard";

import GlobalStats from "../components/GlobalStats";
import Plugin from "../components/Plugin/Wrapper";

const Pairs = () => {
  return (
    <>
      <DashboardEmptyContainer>
        <div className="block sm:hidden py-2 pl-2 bg-gray-100">
          <GlobalStats />
        </div>
        <div className="z-10 max-w-lg mx-auto p-2 md:p-10 lg:mx-0 lg:px-12 md:py-6 pb-16">
          <Plugin initial={"swap"} currencyIdB={"ETH"} />
        </div>
      </DashboardEmptyContainer>
    </>
  );
};

export default Pairs;
